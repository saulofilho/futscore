import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Match } from '../types';
import { Flame, Compass, Layers, Activity, Sparkles, Filter, Info, Eye, ArrowRight, Shield, Zap } from 'lucide-react';

interface PitchHeatmapProps {
  match: Match;
  onSelectAthlete?: (athleteNameOrId: string) => void;
}

interface HeatPoint {
  x: number; // 0 to 100 (% of pitch length)
  y: number; // 0 to 100 (% of pitch width)
  weight: number; // 0.1 to 1.0 (intensity)
  type: 'attack' | 'midfield' | 'defense';
  label?: string;
  athlete?: string;
}

interface TeamHeatmapData {
  points: HeatPoint[];
  leftFlankPct: number;
  centerFlankPct: number;
  rightFlankPct: number;
  defensiveThirdPct: number;
  midfieldThirdPct: number;
  attackingThirdPct: number;
  totalTouches: number;
  dominantZone: string;
  keyPlayer: string;
}

/**
 * Generates calibrated heatmap activity points based on match stats,
 * team characteristics, score state, and attacking tendencies.
 */
function generateTeamHeatmap(match: Match, team: 'home' | 'away'): TeamHeatmapData {
  const isHome = team === 'home';
  const teamObj = isHome ? match.homeTeam : match.awayTeam;
  const oppObj = isHome ? match.awayTeam : match.homeTeam;
  const score = isHome ? match.homeScore : match.awayScore;
  const oppScore = isHome ? match.awayScore : match.homeScore;
  const possession = match.stats?.possession ? (isHome ? match.stats.possession[0] : match.stats.possession[1]) : 50;
  const xG = match.stats?.xG ? (isHome ? match.stats.xG[0] : match.stats.xG[1]) : 1.2;
  const shots = match.stats?.shotsTotal ? (isHome ? match.stats.shotsTotal[0] : match.stats.shotsTotal[1]) : 12;

  // Starters from lineup for hotspot attribution
  const lineup = isHome ? match.lineupHome : match.lineupAway;
  const starPlayer = lineup.starters.find(p => p.position === 'ATA' || p.position === 'MEI')?.name || (isHome ? 'Camisa 10' : 'Artilheiro');
  const wingerLeft = lineup.starters.find(p => p.position === 'LAT' || p.position === 'ATA')?.name || 'Ala Esquerdo';
  const midfielder = lineup.starters.find(p => p.position === 'MEI' || p.position === 'VOL')?.name || 'Armador';

  // Biases based on possession and attacking performance
  const attackBias = (possession / 100) * 0.4 + (xG / 3) * 0.3 + 0.3; // 0.3 to 0.8
  const seed = (teamObj.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + (match.minute || 45)) % 100;

  // Pseudo-random deterministic distribution based on seed
  const leftFlankPct = Math.round(30 + ((seed * 7) % 15));
  const rightFlankPct = Math.round(28 + ((seed * 11) % 16));
  const centerFlankPct = 100 - leftFlankPct - rightFlankPct;

  const attackingThirdPct = Math.min(50, Math.round(22 + attackBias * 25));
  const defensiveThirdPct = Math.max(18, Math.round(35 - attackBias * 15));
  const midfieldThirdPct = 100 - attackingThirdPct - defensiveThirdPct;

  const totalTouches = Math.round(380 + possession * 3.8 + shots * 8);

  const points: HeatPoint[] = [];

  // Home attacks from Left to Right (X: 0 -> 100)
  // Away attacks from Right to Left (X: 100 -> 0)
  const dirX = (pct: number) => isHome ? pct : 100 - pct;

  // 1. Build-up and Defense Clusters
  points.push(
    { x: dirX(14), y: 50, weight: 0.85, type: 'defense', label: 'Saída de Bola Baixa / Goleiro' },
    { x: dirX(22), y: 32, weight: 0.7, type: 'defense', label: 'Início de jogada pela zaga esquerda' },
    { x: dirX(22), y: 68, weight: 0.72, type: 'defense', label: 'Início de jogada pela zaga direita' },
    { x: dirX(28), y: 50, weight: 0.9, type: 'defense', label: 'Primeiro volante / Distribuição', athlete: midfielder },
    { x: dirX(18), y: 18, weight: 0.65, type: 'defense', label: 'Cobertura lateral esquerda' },
    { x: dirX(18), y: 82, weight: 0.62, type: 'defense', label: 'Cobertura lateral direita' }
  );

  // 2. Midfield control & transition clusters
  points.push(
    { x: dirX(42), y: 50, weight: 0.95, type: 'midfield', label: 'Círculo central / Troca de passes', athlete: midfielder },
    { x: dirX(46), y: 28, weight: 0.82, type: 'midfield', label: 'Apoio na meia-esquerda' },
    { x: dirX(46), y: 72, weight: 0.84, type: 'midfield', label: 'Apoio na meia-direita' },
    { x: dirX(52), y: 48, weight: 0.92, type: 'midfield', label: 'Armação de jogadas no terço médio', athlete: starPlayer },
    { x: dirX(38), y: 38, weight: 0.75, type: 'midfield', label: 'Retomada de posse de bola' },
    { x: dirX(38), y: 62, weight: 0.78, type: 'midfield', label: 'Circulação e inversão de jogo' },
    { x: dirX(50), y: 16, weight: 0.88, type: 'midfield', label: 'Subida do lateral esquerdo', athlete: wingerLeft },
    { x: dirX(50), y: 84, weight: 0.86, type: 'midfield', label: 'Subida do lateral direito' }
  );

  // 3. Attacking Third & Box Incursions
  points.push(
    { x: dirX(68), y: 22, weight: 0.94, type: 'attack', label: 'Triangulação no corredor esquerdo ofensivo', athlete: wingerLeft },
    { x: dirX(68), y: 78, weight: 0.88, type: 'attack', label: 'Triangulação no corredor direito ofensivo' },
    { x: dirX(72), y: 50, weight: 0.98, type: 'attack', label: 'Entrada da área adversária / Chute de média distância', athlete: starPlayer },
    { x: dirX(78), y: 36, weight: 0.96, type: 'attack', label: 'Infiltração no flanco esquerdo da grande área' },
    { x: dirX(78), y: 64, weight: 0.9, type: 'attack', label: 'Cruzamento da ponta direita' },
    { x: dirX(86), y: 50, weight: 0.92, type: 'attack', label: 'Marca do pênalti / Finalização na área', athlete: starPlayer },
    { x: dirX(88), y: 42, weight: 0.82, type: 'attack', label: 'Presença no primeiro pau' },
    { x: dirX(88), y: 58, weight: 0.8, type: 'attack', label: 'Fechamento de jogada na segunda trave' },
    { x: dirX(94), y: 10, weight: 0.75, type: 'attack', label: 'Cobrança de escanteio / Linha de fundo' },
    { x: dirX(94), y: 90, weight: 0.72, type: 'attack', label: 'Cobrança de escanteio / Linha de fundo' }
  );

  // Add micro-points for realistic density scatter
  for (let i = 0; i < 20; i++) {
    const rx = dirX(15 + ((seed * (i + 3) * 7) % 75));
    const ry = 10 + ((seed * (i + 5) * 13) % 80);
    const w = 0.45 + (((seed + i) % 4) * 0.12);
    const type = rx < 35 ? 'defense' : rx < 65 ? 'midfield' : 'attack';
    points.push({ x: rx, y: ry, weight: w, type });
  }

  const dominantZone = leftFlankPct > rightFlankPct && leftFlankPct > centerFlankPct
    ? 'Corredor Esquerdo Ofensivo'
    : rightFlankPct > centerFlankPct
    ? 'Corredor Direito Ofensivo'
    : 'Eixo Central & Entrada da Área';

  return {
    points,
    leftFlankPct,
    centerFlankPct,
    rightFlankPct,
    defensiveThirdPct,
    midfieldThirdPct,
    attackingThirdPct,
    totalTouches,
    dominantZone,
    keyPlayer: starPlayer,
  };
}

export const PitchHeatmap: React.FC<PitchHeatmapProps> = ({ match, onSelectAthlete }) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away' | 'comparison'>('home');
  const [actionFilter, setActionFilter] = useState<'all' | 'attack' | 'midfield' | 'defense'>('all');
  const [showGridAnalytics, setShowGridAnalytics] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<HeatPoint | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const homeData = useMemo(() => generateTeamHeatmap(match, 'home'), [match]);
  const awayData = useMemo(() => generateTeamHeatmap(match, 'away'), [match]);

  const activeData = selectedTeam === 'home' ? homeData : selectedTeam === 'away' ? awayData : null;

  // D3 Rendering of the pitch lines and heatmap glow
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = 760;
    const height = 480;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // Pitch dimensions & margins
    const m = { top: 24, right: 24, bottom: 24, left: 24 };
    const pW = width - m.left - m.right;
    const pH = height - m.top - m.bottom;

    // Define Defs (Filters and Gradients)
    const defs = svg.append('defs');

    // Gaussian Blur Filter for authentic thermal heatmap blending
    const blur = defs.append('filter')
      .attr('id', 'heat-blur')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    blur.append('feGaussianBlur')
      .attr('stdDeviation', 14)
      .attr('result', 'blur');

    // Radial Gradients for Heat Nodes (Intense Red Core -> Orange -> Yellow -> Green -> Transparent)
    const hotGrad = defs.append('radialGradient')
      .attr('id', 'hot-glow')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    hotGrad.append('stop').attr('offset', '0%').attr('stop-color', '#ef4444').attr('stop-opacity', 0.95);
    hotGrad.append('stop').attr('offset', '35%').attr('stop-color', '#f97316').attr('stop-opacity', 0.85);
    hotGrad.append('stop').attr('offset', '65%').attr('stop-color', '#eab308').attr('stop-opacity', 0.55);
    hotGrad.append('stop').attr('offset', '85%').attr('stop-color', '#00ff88').attr('stop-opacity', 0.25);
    hotGrad.append('stop').attr('offset', '100%').attr('stop-color', '#00ff88').attr('stop-opacity', 0);

    // Away Team Alternate Gradient (Cyan/Blue Core -> Yellow -> Green)
    const awayGrad = defs.append('radialGradient')
      .attr('id', 'away-glow')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    awayGrad.append('stop').attr('offset', '0%').attr('stop-color', '#06b6d4').attr('stop-opacity', 0.95);
    awayGrad.append('stop').attr('offset', '35%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0.85);
    awayGrad.append('stop').attr('offset', '65%').attr('stop-color', '#a855f7').attr('stop-opacity', 0.55);
    awayGrad.append('stop').attr('offset', '85%').attr('stop-color', '#00ff88').attr('stop-opacity', 0.25);
    awayGrad.append('stop').attr('offset', '100%').attr('stop-color', '#00ff88').attr('stop-opacity', 0);

    // Main Group
    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    // 1. PITCH GRASS BASE & MOWING STRIPES (Dark tactical turf)
    g.append('rect')
      .attr('width', pW)
      .attr('height', pH)
      .attr('fill', '#0c120e')
      .attr('stroke', '#1f2e24')
      .attr('stroke-width', 2);

    // 10 Subtle mowing stripes
    const numStripes = 10;
    const stripeW = pW / numStripes;
    for (let i = 0; i < numStripes; i += 2) {
      g.append('rect')
        .attr('x', i * stripeW)
        .attr('y', 0)
        .attr('width', stripeW)
        .attr('height', pH)
        .attr('fill', '#0f1712')
        .attr('opacity', 0.65);
    }

    // 2. FOOTBALL PITCH LINES & MARKINGS (crisp white/30 lines)
    const pitchLines = g.append('g').attr('class', 'pitch-lines').attr('stroke', '#ffffff').attr('stroke-opacity', 0.45).attr('fill', 'none').attr('stroke-width', 1.5);

    // Boundary Line
    pitchLines.append('rect').attr('x', 0).attr('y', 0).attr('width', pW).attr('height', pH);

    // Halfway Line
    pitchLines.append('line').attr('x1', pW / 2).attr('y1', 0).attr('x2', pW / 2).attr('y2', pH);

    // Center Circle (Radius ~ 15% of height)
    const centerRadius = pH * 0.18;
    pitchLines.append('circle').attr('cx', pW / 2).attr('cy', pH / 2).attr('r', centerRadius);
    pitchLines.append('circle').attr('cx', pW / 2).attr('cy', pH / 2).attr('r', 2.5).attr('fill', '#ffffff').attr('fill-opacity', 0.6);

    // Penalty Areas (16.5m equivalent ~ 16.5% width, 55% height)
    const penW = pW * 0.165;
    const penH = pH * 0.58;
    const penY = (pH - penH) / 2;

    // Left Penalty Area
    pitchLines.append('rect').attr('x', 0).attr('y', penY).attr('width', penW).attr('height', penH);
    // Left Goal Area (5.5m equivalent)
    const goalW = pW * 0.055;
    const goalH = pH * 0.32;
    const goalY = (pH - goalH) / 2;
    pitchLines.append('rect').attr('x', 0).attr('y', goalY).attr('width', goalW).attr('height', goalH);
    // Left Penalty Spot
    const penSpotX = pW * 0.11;
    pitchLines.append('circle').attr('cx', penSpotX).attr('cy', pH / 2).attr('r', 2).attr('fill', '#ffffff').attr('fill-opacity', 0.6);
    // Left Penalty Arc
    const leftArc = d3.arc()
      .innerRadius(centerRadius * 0.95)
      .outerRadius(centerRadius * 0.95)
      .startAngle(Math.PI * 0.22)
      .endAngle(Math.PI * 0.78);
    pitchLines.append('path')
      .attr('d', leftArc as any)
      .attr('transform', `translate(${penSpotX}, ${pH / 2})`);

    // Right Penalty Area
    pitchLines.append('rect').attr('x', pW - penW).attr('y', penY).attr('width', penW).attr('height', penH);
    // Right Goal Area
    pitchLines.append('rect').attr('x', pW - goalW).attr('y', goalY).attr('width', goalW).attr('height', goalH);
    // Right Penalty Spot
    const rightPenSpotX = pW - (pW * 0.11);
    pitchLines.append('circle').attr('cx', rightPenSpotX).attr('cy', pH / 2).attr('r', 2).attr('fill', '#ffffff').attr('fill-opacity', 0.6);
    // Right Penalty Arc
    const rightArc = d3.arc()
      .innerRadius(centerRadius * 0.95)
      .outerRadius(centerRadius * 0.95)
      .startAngle(-Math.PI * 0.78)
      .endAngle(-Math.PI * 0.22);
    pitchLines.append('path')
      .attr('d', rightArc as any)
      .attr('transform', `translate(${rightPenSpotX}, ${pH / 2})`);

    // Corner Arcs
    const cornerRadius = 12;
    pitchLines.append('path').attr('d', `M 0,${cornerRadius} A ${cornerRadius},${cornerRadius} 0 0,0 ${cornerRadius},0`);
    pitchLines.append('path').attr('d', `M 0,${pH - cornerRadius} A ${cornerRadius},${cornerRadius} 0 0,1 ${cornerRadius},${pH}`);
    pitchLines.append('path').attr('d', `M ${pW - cornerRadius},0 A ${cornerRadius},${cornerRadius} 0 0,0 ${pW},${cornerRadius}`);
    pitchLines.append('path').attr('d', `M ${pW},${pH - cornerRadius} A ${cornerRadius},${cornerRadius} 0 0,0 ${pW - cornerRadius},${pH}`);

    // Goal Nets outside the boundary
    pitchLines.append('rect').attr('x', -8).attr('y', (pH - goalH * 0.6) / 2).attr('width', 8).attr('height', goalH * 0.6).attr('stroke-dasharray', '2,2');
    pitchLines.append('rect').attr('x', pW).attr('y', (pH - goalH * 0.6) / 2).attr('width', 8).attr('height', goalH * 0.6).attr('stroke-dasharray', '2,2');

    // 3. HEATMAP CLUSTERS & POINTS RENDERING
    const heatGroup = g.append('g').attr('class', 'heat-layer').attr('filter', 'url(#heat-blur)');

    const scaleX = d3.scaleLinear().domain([0, 100]).range([0, pW]);
    const scaleY = d3.scaleLinear().domain([0, 100]).range([0, pH]);

    // Determine which datasets to display
    const renderSets: { team: 'home' | 'away'; data: TeamHeatmapData; gradId: string }[] = [];
    if (selectedTeam === 'home' || selectedTeam === 'comparison') {
      renderSets.push({ team: 'home', data: homeData, gradId: 'url(#hot-glow)' });
    }
    if (selectedTeam === 'away' || selectedTeam === 'comparison') {
      renderSets.push({ team: 'away', data: awayData, gradId: 'url(#away-glow)' });
    }

    renderSets.forEach(({ team, data, gradId }) => {
      const filtered = data.points.filter(p => actionFilter === 'all' || p.type === actionFilter);

      heatGroup.selectAll<SVGCircleElement, HeatPoint>(`.heat-node-${team}`)
        .data(filtered)
        .enter()
        .append('circle')
        .attr('class', `heat-node-${team}`)
        .attr('cx', (d: HeatPoint) => scaleX(d.x))
        .attr('cy', (d: HeatPoint) => scaleY(d.y))
        .attr('r', 0) // start at 0 for transition
        .attr('fill', gradId)
        .attr('opacity', 0.88)
        .transition()
        .duration(650)
        .ease(d3.easeCubicOut)
        .attr('r', (d: HeatPoint) => 28 + d.weight * 36);
    });

    // 4. INTERACTIVE HOVER HOTSPOTS (Unblurred layer for tooltips)
    const interactiveLayer = g.append('g').attr('class', 'interactive-layer');

    const allActivePoints: HeatPoint[] = (selectedTeam === 'home' ? homeData.points : selectedTeam === 'away' ? awayData.points : [...homeData.points, ...awayData.points])
      .filter(p => actionFilter === 'all' || p.type === actionFilter);

    interactiveLayer.selectAll<SVGCircleElement, HeatPoint>('.hotspot-target')
      .data(allActivePoints)
      .enter()
      .append('circle')
      .attr('class', 'hotspot-target')
      .attr('cx', (d: HeatPoint) => scaleX(d.x))
      .attr('cy', (d: HeatPoint) => scaleY(d.y))
      .attr('r', 16)
      .attr('fill', 'transparent')
      .style('cursor', 'pointer')
      .on('mouseenter', (_, d: HeatPoint) => setHoveredPoint(d))
      .on('mouseleave', () => setHoveredPoint(null))
      .on('click', (_, d: HeatPoint) => {
        if (d.athlete && onSelectAthlete) {
          onSelectAthlete(d.athlete);
        }
      });

    // 5. DIRECTION OF ATTACK ARROW & LABELS
    const attackDirY = pH + 16;
    if (selectedTeam === 'home' || selectedTeam === 'comparison') {
      // Home: Attacks Left -> Right
      const homeAttack = svg.append('g').attr('transform', `translate(${m.left}, ${attackDirY})`).attr('class', 'font-mono text-[9px]');
      homeAttack.append('text').attr('x', 0).attr('y', 0).attr('fill', '#00ff88').attr('font-weight', 'bold').text(`ATAQUE ${match.homeTeam.shortName} →`);
      homeAttack.append('line').attr('x1', 110).attr('y1', -3).attr('x2', pW / 2 - 20).attr('y2', -3).attr('stroke', '#00ff88').attr('stroke-width', 1.5).attr('stroke-dasharray', '3,3');
    }
    if (selectedTeam === 'away' || selectedTeam === 'comparison') {
      // Away: Attacks Right -> Left
      const awayAttack = svg.append('g').attr('transform', `translate(${m.left}, ${attackDirY})`).attr('class', 'font-mono text-[9px]');
      awayAttack.append('text').attr('x', pW).attr('y', 0).attr('text-anchor', 'end').attr('fill', '#38bdf8').attr('font-weight', 'bold').text(`← ATAQUE ${match.awayTeam.shortName}`);
      awayAttack.append('line').attr('x1', pW - 110).attr('y1', -3).attr('x2', pW / 2 + 20).attr('y2', -3).attr('stroke', '#38bdf8').attr('stroke-width', 1.5).attr('stroke-dasharray', '3,3');
    }

  }, [selectedTeam, actionFilter, homeData, awayData, match.homeTeam.shortName, match.awayTeam.shortName, onSelectAthlete]);

  return (
    <div className="space-y-5 font-mono text-xs">
      {/* Top Header Card */}
      <div className="bg-[#0b0c0d] p-4 sm:p-5 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange-950/60 border border-orange-500/40 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="font-['Syne'] font-extrabold text-sm sm:text-base text-white uppercase tracking-tight flex items-center gap-2">
                <span>Mapa de Calor &amp; Zonas de Ação</span>
                <span className="text-[10px] font-mono text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 border border-[#00ff88]/30 font-bold">
                  D3 TACTICAL ENGINE
                </span>
              </h4>
              <p className="text-[11px] text-[#ececed]/60 font-sans">
                Áreas de maior volume de toques, pressão ofensiva e densidade de posicionamento no gramado
              </p>
            </div>
          </div>

          {/* Team Switcher Tabs */}
          <div className="flex items-center gap-1 bg-[#141618] p-1 border border-white/15 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setSelectedTeam('home')}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase transition cursor-pointer flex items-center gap-1.5 ${
                selectedTeam === 'home'
                  ? 'bg-[#00ff88] text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              <span>{match.homeTeam.badgeEmoji}</span>
              <span>{match.homeTeam.shortName}</span>
            </button>

            <button
              onClick={() => setSelectedTeam('away')}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase transition cursor-pointer flex items-center gap-1.5 ${
                selectedTeam === 'away'
                  ? 'bg-[#38bdf8] text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              <span>{match.awayTeam.badgeEmoji}</span>
              <span>{match.awayTeam.shortName}</span>
            </button>

            <button
              onClick={() => setSelectedTeam('comparison')}
              className={`px-2.5 py-1.5 text-[11px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
                selectedTeam === 'comparison'
                  ? 'bg-amber-400 text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
              title="Comparar ambos os times no mesmo gramado"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Comparar</span>
            </button>
          </div>
        </div>

        {/* Action Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="label opacity-60 text-[10px] uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-[#00ff88]" />
              Filtrar Ações:
            </span>

            <button
              onClick={() => setActionFilter('all')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white'
              }`}
            >
              Todos os Toques
            </button>

            <button
              onClick={() => setActionFilter('attack')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'attack'
                  ? 'bg-red-950 text-red-200 border-red-500'
                  : 'bg-[#141618] text-red-400/80 border-red-900/40 hover:text-red-300'
              }`}
            >
              🔥 Terço Ofensivo
            </button>

            <button
              onClick={() => setActionFilter('midfield')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'midfield'
                  ? 'bg-yellow-950 text-yellow-200 border-yellow-500'
                  : 'bg-[#141618] text-yellow-400/80 border-yellow-900/40 hover:text-yellow-300'
              }`}
            >
              ⚡ Construção &amp; Meio
            </button>

            <button
              onClick={() => setActionFilter('defense')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'defense'
                  ? 'bg-blue-950 text-blue-200 border-blue-500'
                  : 'bg-[#141618] text-blue-400/80 border-blue-900/40 hover:text-blue-300'
              }`}
            >
              🛡️ Saída &amp; Defesa
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGridAnalytics(!showGridAnalytics)}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border flex items-center gap-1.5 ${
                showGridAnalytics
                  ? 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/40'
                  : 'bg-[#141618] text-[#ececed]/50 border-white/10 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{showGridAnalytics ? 'Ocultar Setores' : 'Mostrar Setores %'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Pitch Visualization Canvas */}
      <div className="relative bg-[#070b08] border border-white/20 p-2 sm:p-4 overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full relative">
          <svg ref={svgRef} className="w-full block select-none" />

          {/* Hovered Point Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute z-30 pointer-events-none bg-[#0b0c0d]/95 backdrop-blur border border-white/20 p-2 text-[10px] text-white shadow-xl min-w-[160px]"
              style={{
                left: `${Math.min(75, Math.max(5, hoveredPoint.x))}%`,
                top: `${Math.min(75, Math.max(10, hoveredPoint.y))}%`,
                transform: 'translate(-50%, -120%)',
              }}
            >
              <div className="flex items-center gap-1 text-[#00ff88] font-bold mb-0.5 uppercase text-[9px]">
                <Zap className="w-3 h-3" />
                <span>Ponto de Intensidade Alta</span>
              </div>
              <p className="font-bold text-white leading-tight">{hoveredPoint.label || 'Zona de Circulação'}</p>
              {hoveredPoint.athlete && (
                <p className="text-[#ececed]/70 mt-1">
                  Atleta de destaque: <strong className="text-[#00ff88]">{hoveredPoint.athlete}</strong>
                </p>
              )}
              <div className="flex items-center justify-between text-[9px] text-[#ececed]/50 mt-1 pt-1 border-t border-white/10">
                <span>Concentração: {Math.round(hoveredPoint.weight * 100)}%</span>
                <span>Setor: {hoveredPoint.type.toUpperCase()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Legend of Heat Intensity */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-white/10 text-[10px] text-[#ececed]/70">
          <div className="flex items-center gap-2">
            <span className="opacity-60 uppercase text-[9px]">Intensidade Térmica:</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] opacity-50">Baixa</span>
              <div className="w-24 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-red-600 border border-white/20" />
              <span className="text-[9px] font-bold text-red-400">Muito Alta</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span>{match.homeTeam.name}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              <span>{match.awayTeam.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sector Analytics & Flank Distribution Cards */}
      {showGridAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Home Team Flank Analysis */}
          <div className="bg-[#0b0c0d] p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span>{match.homeTeam.badgeEmoji}</span>
                <span className="font-bold text-white text-xs uppercase">{match.homeTeam.name}</span>
              </div>
              <span className="text-[10px] text-[#00ff88] font-bold">{homeData.totalTouches} TOQUES REGISTRADOS</span>
            </div>

            {/* Lateral Flanks breakdown */}
            <div className="space-y-1.5 text-[11px]">
              <span className="label opacity-60 text-[9px] uppercase">Distribuição por Corredores Laterais:</span>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-[#141618] p-2 border border-white/5">
                  <span className="text-[9px] opacity-60">Esquerda</span>
                  <p className="text-sm font-bold text-[#00ff88]">{homeData.leftFlankPct}%</p>
                </div>
                <div className="bg-[#141618] p-2 border border-white/5">
                  <span className="text-[9px] opacity-60">Centro</span>
                  <p className="text-sm font-bold text-white">{homeData.centerFlankPct}%</p>
                </div>
                <div className="bg-[#141618] p-2 border border-white/5">
                  <span className="text-[9px] opacity-60">Direita</span>
                  <p className="text-sm font-bold text-[#00ff88]">{homeData.rightFlankPct}%</p>
                </div>
              </div>
            </div>

            {/* Longitudinal Thirds breakdown */}
            <div className="space-y-1.5 text-[11px]">
              <span className="label opacity-60 text-[9px] uppercase">Ocupação do Campo por Terços:</span>
              <div className="flex h-3 w-full bg-[#141618] border border-white/10 overflow-hidden text-[9px] font-bold">
                <div
                  className="bg-blue-600/70 flex items-center justify-center text-white"
                  style={{ width: `${homeData.defensiveThirdPct}%` }}
                  title={`Defesa: ${homeData.defensiveThirdPct}%`}
                >
                  {homeData.defensiveThirdPct}%
                </div>
                <div
                  className="bg-yellow-500/80 flex items-center justify-center text-black"
                  style={{ width: `${homeData.midfieldThirdPct}%` }}
                  title={`Meio: ${homeData.midfieldThirdPct}%`}
                >
                  {homeData.midfieldThirdPct}%
                </div>
                <div
                  className="bg-red-500/80 flex items-center justify-center text-white"
                  style={{ width: `${homeData.attackingThirdPct}%` }}
                  title={`Ataque: ${homeData.attackingThirdPct}%`}
                >
                  {homeData.attackingThirdPct}%
                </div>
              </div>
              <div className="flex justify-between text-[9px] opacity-50 font-mono">
                <span>Defesa ({homeData.defensiveThirdPct}%)</span>
                <span>Meio ({homeData.midfieldThirdPct}%)</span>
                <span>Ataque ({homeData.attackingThirdPct}%)</span>
              </div>
            </div>

            <div className="bg-[#141618] p-2.5 border border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-[#ececed]/70">Zona Mais Ativa:</span>
              <strong className="text-[#00ff88]">{homeData.dominantZone}</strong>
            </div>
          </div>

          {/* Away Team Flank Analysis */}
          <div className="bg-[#0b0c0d] p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span>{match.awayTeam.badgeEmoji}</span>
                <span className="font-bold text-white text-xs uppercase">{match.awayTeam.name}</span>
              </div>
              <span className="text-[10px] text-[#38bdf8] font-bold">{awayData.totalTouches} TOQUES REGISTRADOS</span>
            </div>

            {/* Lateral Flanks breakdown */}
            <div className="space-y-1.5 text-[11px]">
              <span className="label opacity-60 text-[9px] uppercase">Distribuição por Corredores Laterais:</span>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-[#141618] p-2 border border-white/5">
                  <span className="text-[9px] opacity-60">Esquerda</span>
                  <p className="text-sm font-bold text-[#38bdf8]">{awayData.leftFlankPct}%</p>
                </div>
                <div className="bg-[#141618] p-2 border border-white/5">
                  <span className="text-[9px] opacity-60">Centro</span>
                  <p className="text-sm font-bold text-white">{awayData.centerFlankPct}%</p>
                </div>
                <div className="bg-[#141618] p-2 border border-white/5">
                  <span className="text-[9px] opacity-60">Direita</span>
                  <p className="text-sm font-bold text-[#38bdf8]">{awayData.rightFlankPct}%</p>
                </div>
              </div>
            </div>

            {/* Longitudinal Thirds breakdown */}
            <div className="space-y-1.5 text-[11px]">
              <span className="label opacity-60 text-[9px] uppercase">Ocupação do Campo por Terços:</span>
              <div className="flex h-3 w-full bg-[#141618] border border-white/10 overflow-hidden text-[9px] font-bold">
                <div
                  className="bg-blue-600/70 flex items-center justify-center text-white"
                  style={{ width: `${awayData.defensiveThirdPct}%` }}
                  title={`Defesa: ${awayData.defensiveThirdPct}%`}
                >
                  {awayData.defensiveThirdPct}%
                </div>
                <div
                  className="bg-yellow-500/80 flex items-center justify-center text-black"
                  style={{ width: `${awayData.midfieldThirdPct}%` }}
                  title={`Meio: ${awayData.midfieldThirdPct}%`}
                >
                  {awayData.midfieldThirdPct}%
                </div>
                <div
                  className="bg-red-500/80 flex items-center justify-center text-white"
                  style={{ width: `${awayData.attackingThirdPct}%` }}
                  title={`Ataque: ${awayData.attackingThirdPct}%`}
                >
                  {awayData.attackingThirdPct}%
                </div>
              </div>
              <div className="flex justify-between text-[9px] opacity-50 font-mono">
                <span>Defesa ({awayData.defensiveThirdPct}%)</span>
                <span>Meio ({awayData.midfieldThirdPct}%)</span>
                <span>Ataque ({awayData.attackingThirdPct}%)</span>
              </div>
            </div>

            <div className="bg-[#141618] p-2.5 border border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-[#ececed]/70">Zona Mais Ativa:</span>
              <strong className="text-[#38bdf8]">{awayData.dominantZone}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tactical Insights Box */}
      <div className="bg-[#0b0c0d] p-3.5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#ececed]/70">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#00ff88] shrink-0" />
          <span>
            Dica tática: Toques no terço final acima de 40% indicam controle territorial contínuo e criação de volume de finalizações.
          </span>
        </div>
        <span className="text-[10px] opacity-50 shrink-0 font-mono">
          Modelagem posicional GPS &amp; Opta Stats
        </span>
      </div>
    </div>
  );
};
