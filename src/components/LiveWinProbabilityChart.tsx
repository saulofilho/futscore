import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Match } from '../types';
import { Activity, TrendingUp, Info, Sparkles } from 'lucide-react';

interface LiveWinProbabilityChartProps {
  match: Match;
}

export interface WinProbabilityResult {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeXG: number;
  awayXG: number;
  favorite: 'home' | 'away' | 'draw';
}

/**
 * Calculates win/draw/loss probability based on:
 * - Current Score (homeScore vs awayScore)
 * - Match Status & Minute (remaining time decay)
 * - xG (Expected Goals) for each team
 */
export function calculateWinProbability(match: Match): WinProbabilityResult {
  const homeScore = match.homeScore ?? 0;
  const awayScore = match.awayScore ?? 0;
  const xGHome = match.stats?.xG?.[0] ?? 1.2;
  const xGAway = match.stats?.xG?.[1] ?? 1.0;
  const status = match.status;
  const minute = match.minute ?? 0;

  // If match has already finished:
  if (status === 'FINISHED') {
    if (homeScore > awayScore) {
      return { homeWin: 100, draw: 0, awayWin: 0, homeXG: xGHome, awayXG: xGAway, favorite: 'home' };
    }
    if (awayScore > homeScore) {
      return { homeWin: 0, draw: 0, awayWin: 100, homeXG: xGHome, awayXG: xGAway, favorite: 'away' };
    }
    return { homeWin: 0, draw: 100, awayWin: 0, homeXG: xGHome, awayXG: xGAway, favorite: 'draw' };
  }

  // Pre-game estimation based primarily on xG and home advantage
  if (status === 'SCHEDULED') {
    const totalXg = xGHome + xGAway + 0.6; // baseline
    const homeAdvantage = 0.15;
    const rawHome = (xGHome / totalXg) + homeAdvantage;
    const rawAway = (xGAway / totalXg);
    const rawDraw = Math.max(0.18, 1 - (rawHome + rawAway));

    const total = rawHome + rawAway + rawDraw;
    const h = Math.round((rawHome / total) * 100);
    const a = Math.round((rawAway / total) * 100);
    const d = 100 - h - a;
    return {
      homeWin: h,
      draw: d,
      awayWin: a,
      homeXG: xGHome,
      awayXG: xGAway,
      favorite: h > a ? 'home' : a > h ? 'away' : 'draw',
    };
  }

  // In-play Live calculation (status === 'LIVE' or 'HT')
  // Remaining time factor (from 1.0 at min 0 down to ~0.05 at 90+)
  const elapsed = status === 'HT' ? 45 : Math.min(92, Math.max(1, minute));
  const timeRemainingFraction = Math.max(0.04, (90 - elapsed) / 90);

  // Expected remaining goals per team based on xG production rate
  const lambdaHome = Math.max(0.05, (xGHome * 0.95 + 0.25) * timeRemainingFraction);
  const lambdaAway = Math.max(0.05, (xGAway * 0.95 + 0.15) * timeRemainingFraction);

  // Poisson probability function
  const poisson = (k: number, lambda: number) => {
    let p = Math.exp(-lambda);
    for (let i = 1; i <= k; i++) {
      p *= lambda / i;
    }
    return p;
  };

  // Sum joint probabilities over possible remaining goals (0 to 6 goals)
  let pHomeWin = 0;
  let pDraw = 0;
  let pAwayWin = 0;

  for (let gH = 0; gH <= 6; gH++) {
    const probGH = poisson(gH, lambdaHome);
    for (let gA = 0; gA <= 6; gA++) {
      const probGA = poisson(gA, lambdaAway);
      const jointProb = probGH * probGA;
      const finalHome = homeScore + gH;
      const finalAway = awayScore + gA;

      if (finalHome > finalAway) {
        pHomeWin += jointProb;
      } else if (finalHome === finalAway) {
        pDraw += jointProb;
      } else {
        pAwayWin += jointProb;
      }
    }
  }

  const sum = pHomeWin + pDraw + pAwayWin || 1;
  let homePct = Math.round((pHomeWin / sum) * 100);
  let awayPct = Math.round((pAwayWin / sum) * 100);
  let drawPct = 100 - homePct - awayPct;

  // Clamp values so each segment has valid positive percentage
  if (drawPct < 0) {
    if (homePct > awayPct) homePct += drawPct;
    else awayPct += drawPct;
    drawPct = 0;
  }

  let favorite: 'home' | 'away' | 'draw' = 'draw';
  if (homePct > drawPct && homePct > awayPct) favorite = 'home';
  else if (awayPct > drawPct && awayPct > homePct) favorite = 'away';

  return {
    homeWin: Math.max(1, homePct),
    draw: Math.max(1, drawPct),
    awayWin: Math.max(1, awayPct),
    homeXG: xGHome,
    awayXG: xGAway,
    favorite,
  };
}

export const LiveWinProbabilityChart: React.FC<LiveWinProbabilityChartProps> = ({ match }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<'home' | 'draw' | 'away' | null>(null);

  const stats = useMemo(() => calculateWinProbability(match), [
    match.homeScore,
    match.awayScore,
    match.minute,
    match.status,
    match.stats?.xG?.[0],
    match.stats?.xG?.[1],
  ]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const renderChart = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth || 360;
      const height = 28;
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };
      const width = containerWidth - margin.left - margin.right;

      // D3 Selection
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      svg
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${containerWidth} ${height}`);

      const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

      // Data segments: Home, Draw, Away
      const segmentsData = [
        {
          id: 'home',
          label: match.homeTeam.shortName || match.homeTeam.name || 'Mandante',
          value: stats.homeWin,
          color: '#00ff88',
          textColor: '#0b0c0d',
        },
        {
          id: 'draw',
          label: 'Empate',
          value: stats.draw,
          color: '#475569',
          textColor: '#ffffff',
        },
        {
          id: 'away',
          label: match.awayTeam.shortName || match.awayTeam.name || 'Visitante',
          value: stats.awayWin,
          color: '#38bdf8',
          textColor: '#0b0c0d',
        },
      ];

      // Compute cumulative offsets
      let cumulative = 0;
      const computedSegments = segmentsData.map(d => {
        const start = cumulative;
        cumulative += d.value;
        return {
          ...d,
          start,
          end: cumulative,
        };
      });

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      // Draw background track
      g.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#0b0c0d')
        .attr('rx', 2);

      // Segment groups
      const segmentGroups = g
        .selectAll('.prob-segment')
        .data(computedSegments)
        .enter()
        .append('g')
        .attr('class', 'prob-segment')
        .style('cursor', 'pointer')
        .on('mouseenter', (_, d) => setHoveredSegment(d.id as any))
        .on('mouseleave', () => setHoveredSegment(null));

      // Animated Rectangles
      segmentGroups
        .append('rect')
        .attr('x', d => xScale(d.start))
        .attr('y', 0)
        .attr('height', height)
        .attr('width', 0)
        .attr('fill', d => d.color)
        .attr('stroke', '#0b0c0d')
        .attr('stroke-width', 1.5)
        .transition()
        .duration(700)
        .ease(d3.easeCubicOut)
        .attr('width', d => Math.max(0, xScale(d.value)));

      // Labels inside segments (if segment width is large enough)
      segmentGroups
        .append('text')
        .attr('x', d => xScale(d.start) + xScale(d.value) / 2)
        .attr('y', height / 2 + 4)
        .attr('text-anchor', 'middle')
        .attr('fill', d => d.textColor)
        .attr('font-size', '10px')
        .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, monospace')
        .attr('font-weight', 'bold')
        .style('opacity', 0)
        .text(d => (d.value >= 12 ? `${d.value}%` : ''))
        .transition()
        .delay(250)
        .duration(400)
        .style('opacity', d => (d.value >= 12 ? 1 : 0));
    };

    renderChart();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        renderChart();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [stats, match.homeTeam.shortName, match.awayTeam.shortName, match.homeTeam.name, match.awayTeam.name]);

  return (
    <div className="bg-[#0b0c0d] border border-white/10 p-3 sm:p-4 font-mono text-xs space-y-2.5">
      {/* Title & Live indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#00ff88]" />
          <span className="label text-[#00ff88] font-bold uppercase tracking-wider text-[11px]">
            PROBABILIDADE DE VITÓRIA AO VIVO (D3 ENGINE)
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[#ececed]/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
            Placar &amp; xG em Tempo Real
          </span>
        </div>
      </div>

      {/* D3 Bar Chart Canvas */}
      <div ref={containerRef} className="w-full overflow-hidden border border-white/15">
        <svg ref={svgRef} className="w-full block" />
      </div>

      {/* Legend & Key Percentage Stats */}
      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        {/* Home Team */}
        <div
          onMouseEnter={() => setHoveredSegment('home')}
          onMouseLeave={() => setHoveredSegment(null)}
          className={`p-2 border transition cursor-pointer ${
            hoveredSegment === 'home'
              ? 'bg-[#00ff88]/15 border-[#00ff88]'
              : 'bg-[#141618] border-white/5'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-[11px]">
            <span className="w-2.5 h-2.5 bg-[#00ff88] shrink-0"></span>
            <span className="font-bold text-white truncate">{match.homeTeam.shortName}</span>
          </div>
          <p className="text-base sm:text-lg font-black text-[#00ff88] mt-0.5">
            {stats.homeWin}%
          </p>
          <span className="label text-[9px] opacity-60">xG: {stats.homeXG.toFixed(2)}</span>
        </div>

        {/* Draw */}
        <div
          onMouseEnter={() => setHoveredSegment('draw')}
          onMouseLeave={() => setHoveredSegment(null)}
          className={`p-2 border transition cursor-pointer ${
            hoveredSegment === 'draw'
              ? 'bg-slate-700/30 border-slate-400'
              : 'bg-[#141618] border-white/5'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-[11px]">
            <span className="w-2.5 h-2.5 bg-[#475569] shrink-0"></span>
            <span className="font-bold text-white">Empate</span>
          </div>
          <p className="text-base sm:text-lg font-black text-white mt-0.5">
            {stats.draw}%
          </p>
          <span className="label text-[9px] opacity-60">Equilíbrio</span>
        </div>

        {/* Away Team */}
        <div
          onMouseEnter={() => setHoveredSegment('away')}
          onMouseLeave={() => setHoveredSegment(null)}
          className={`p-2 border transition cursor-pointer ${
            hoveredSegment === 'away'
              ? 'bg-sky-500/15 border-sky-400'
              : 'bg-[#141618] border-white/5'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-[11px]">
            <span className="w-2.5 h-2.5 bg-[#38bdf8] shrink-0"></span>
            <span className="font-bold text-white truncate">{match.awayTeam.shortName}</span>
          </div>
          <p className="text-base sm:text-lg font-black text-[#38bdf8] mt-0.5">
            {stats.awayWin}%
          </p>
          <span className="label text-[9px] opacity-60">xG: {stats.awayXG.toFixed(2)}</span>
        </div>
      </div>

      {/* Model Insight Footer */}
      <div className="flex items-center justify-between text-[10px] text-[#ececed]/50 pt-1 border-t border-white/5">
        <span className="truncate">
          Cenário: {match.status === 'LIVE' ? `${match.minute}' com placar ${match.homeScore}x${match.awayScore}` : match.status === 'FINISHED' ? 'Resultado final encerrado' : 'Pré-jogo'}
        </span>
        <span className="font-bold text-[#ececed]/80 shrink-0">
          Favorito:{' '}
          <strong className={stats.favorite === 'home' ? 'text-[#00ff88]' : stats.favorite === 'away' ? 'text-[#38bdf8]' : 'text-white'}>
            {stats.favorite === 'home' ? match.homeTeam.name : stats.favorite === 'away' ? match.awayTeam.name : 'Empate'}
          </strong>
        </span>
      </div>
    </div>
  );
};
