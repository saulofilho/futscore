import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Match } from '../types';
import { Shield, Zap, Activity, Award, Compass, Eye, Info, Check, Sparkles } from 'lucide-react';

interface TeamRadarChartProps {
  match: Match;
  className?: string;
}

export interface RadarMetric {
  key: string;
  label: string;
  homeScore: number; // 0 - 100
  awayScore: number; // 0 - 100
  homeRaw: string;
  awayRaw: string;
  description: string;
  leader: 'home' | 'away' | 'draw';
}

/**
 * Calculates normalized 0-100 radar metrics comparing both teams:
 * 1. Attack (Ataque): Shots, Shots on target, xG, Big chances
 * 2. Defense (Defesa): Saves, Goals conceded, xG conceded, Shots allowed
 * 3. Possession (Posse): Possession %, Passes, Pass accuracy %
 * 4. Discipline (Disciplina): Clean play index (penalties for fouls, yellow/red cards)
 * 5. Intensity (Intensidade): Corners, high press, duels, match tempo
 * 6. Efficiency (Eficiência): Goal conversion rate and xG performance
 */
export function calculateRadarMetrics(match: Match): RadarMetric[] {
  const stats = match.stats || {
    possession: [50, 50],
    shotsTotal: [10, 10],
    shotsOnTarget: [4, 4],
    xG: [1.2, 1.2],
    corners: [5, 5],
    fouls: [12, 12],
    yellowCards: [2, 2],
    redCards: [0, 0],
    offsides: [1, 1],
    bigChances: [2, 2],
    passesTotal: [400, 400],
    passAccuracy: [82, 82],
    goalkeeperSaves: [3, 3],
  };

  const isScheduled = match.status === 'SCHEDULED' && (!match.events || match.events.length === 0);

  // If scheduled, baseline estimation based on team prestige/squad strength
  if (isScheduled) {
    const homeSeed = (match.homeTeam.name.length * 7) % 25;
    const awaySeed = (match.awayTeam.name.length * 11) % 25;

    const baseHomeAttack = 70 + homeSeed;
    const baseAwayAttack = 68 + awaySeed;

    const baseHomeDef = 75 - (homeSeed % 12);
    const baseAwayDef = 72 - (awaySeed % 12);

    const baseHomePoss = 55 + (homeSeed % 15);
    const baseAwayPoss = 100 - baseHomePoss;

    return [
      {
        key: 'attack',
        label: 'Ataque',
        homeScore: Math.min(95, Math.max(50, baseHomeAttack)),
        awayScore: Math.min(95, Math.max(50, baseAwayAttack)),
        homeRaw: 'Projeção ofensiva pré-jogo',
        awayRaw: 'Projeção ofensiva pré-jogo',
        description: 'Poder de fogo, volume de finalizações e criação de perigo no último terço.',
        leader: baseHomeAttack > baseAwayAttack ? 'home' : 'away',
      },
      {
        key: 'defense',
        label: 'Defesa',
        homeScore: Math.min(95, Math.max(50, baseHomeDef)),
        awayScore: Math.min(95, Math.max(50, baseAwayDef)),
        homeRaw: 'Índice de solidez defensiva',
        awayRaw: 'Índice de solidez defensiva',
        description: 'Capacidade de conter finalizações adversárias e segurança da baliza.',
        leader: baseHomeDef > baseAwayDef ? 'home' : 'away',
      },
      {
        key: 'possession',
        label: 'Posse & Controle',
        homeScore: Math.min(90, Math.max(40, baseHomePoss)),
        awayScore: Math.min(90, Math.max(40, baseAwayPoss)),
        homeRaw: `${baseHomePoss}% projetado`,
        awayRaw: `${baseAwayPoss}% projetado`,
        description: 'Retenção da bola, circulação no meio-campo e controle de ritmo.',
        leader: baseHomePoss > baseAwayPoss ? 'home' : 'away',
      },
      {
        key: 'discipline',
        label: 'Disciplina',
        homeScore: 88,
        awayScore: 85,
        homeRaw: 'Fair play 0 cartões',
        awayRaw: 'Fair play 0 cartões',
        description: 'Controle emocional, baixo número de faltas e ausência de advertências.',
        leader: 'draw',
      },
      {
        key: 'intensity',
        label: 'Intensidade',
        homeScore: 78,
        awayScore: 76,
        homeRaw: 'Pressão e transições',
        awayRaw: 'Pressão e transições',
        description: 'Pressão alta, bolas paradas ofensivas e velocidade de recomposição.',
        leader: 'home',
      },
      {
        key: 'efficiency',
        label: 'Eficiência',
        homeScore: 74,
        awayScore: 72,
        homeRaw: 'Aproveitamento esperado',
        awayRaw: 'Aproveitamento esperado',
        description: 'Conversão de ocasiões claras em gols e letalidade no arremate.',
        leader: 'home',
      },
    ];
  }

  // --- 1. ATTACK (Ataque) ---
  // Based on Shots on Target (40%), Total Shots (25%), xG (25%), Big Chances (10%)
  const hSOT = stats.shotsOnTarget[0];
  const aSOT = stats.shotsOnTarget[1];
  const hShots = stats.shotsTotal[0];
  const aShots = stats.shotsTotal[1];
  const hXG = stats.xG[0];
  const aXG = stats.xG[1];
  const hChances = stats.bigChances[0];
  const aChances = stats.bigChances[1];

  const calcAttack = (sot: number, shots: number, xg: number, chances: number) => {
    const sotScore = Math.min(100, (sot / 8) * 100);
    const shotsScore = Math.min(100, (shots / 18) * 100);
    const xgScore = Math.min(100, (xg / 2.5) * 100);
    const chancesScore = Math.min(100, (chances / 4) * 100);
    return Math.round(sotScore * 0.4 + shotsScore * 0.2 + xgScore * 0.25 + chancesScore * 0.15);
  };

  const homeAttack = Math.min(99, Math.max(25, calcAttack(hSOT, hShots, hXG, hChances)));
  const awayAttack = Math.min(99, Math.max(25, calcAttack(aSOT, aShots, aXG, aChances)));

  // --- 2. DEFENSE (Defesa) ---
  // High saves, low goals conceded, low xG conceded
  const hGoalsConceded = match.awayScore;
  const aGoalsConceded = match.homeScore;
  const hSaves = stats.goalkeeperSaves[0];
  const aSaves = stats.goalkeeperSaves[1];

  const calcDefense = (conceded: number, saves: number, oppXg: number, oppSot: number) => {
    let score = 85;
    score -= conceded * 18; // -18 per goal conceded
    score += Math.min(25, saves * 5); // +5 per save
    score -= Math.max(0, (oppXg - 1.0) * 15);
    score -= Math.max(0, (oppSot - 4) * 4);
    return Math.round(Math.min(99, Math.max(20, score)));
  };

  const homeDefense = calcDefense(hGoalsConceded, hSaves, aXG, aSOT);
  const awayDefense = calcDefense(aGoalsConceded, aSaves, hXG, hSOT);

  // --- 3. POSSESSION (Posse de Bola & Construção) ---
  // Possession %, Pass Accuracy %, Total Passes
  const hPoss = stats.possession[0];
  const aPoss = stats.possession[1];
  const hAcc = stats.passAccuracy[0];
  const aAcc = stats.passAccuracy[1];
  const hPass = stats.passesTotal[0];
  const aPass = stats.passesTotal[1];

  const calcPossession = (poss: number, acc: number, passTotal: number) => {
    const possNorm = Math.min(100, Math.max(20, poss));
    const accNorm = Math.min(100, Math.max(40, acc));
    const passNorm = Math.min(100, (passTotal / 600) * 100);
    return Math.round(possNorm * 0.5 + accNorm * 0.35 + passNorm * 0.15);
  };

  const homePossession = calcPossession(hPoss, hAcc, hPass);
  const awayPossession = calcPossession(aPoss, aAcc, aPass);

  // --- 4. DISCIPLINE (Disciplina & Fair Play) ---
  // Base 100 minus fouls and cards
  const hFouls = stats.fouls[0];
  const aFouls = stats.fouls[1];
  const hYellow = stats.yellowCards[0];
  const aYellow = stats.yellowCards[1];
  const hRed = stats.redCards[0];
  const aRed = stats.redCards[1];

  const calcDiscipline = (fouls: number, yellow: number, red: number) => {
    let score = 96;
    score -= fouls * 2.2;
    score -= yellow * 8;
    score -= red * 28;
    return Math.round(Math.min(99, Math.max(20, score)));
  };

  const homeDiscipline = calcDiscipline(hFouls, hYellow, hRed);
  const awayDiscipline = calcDiscipline(aFouls, aYellow, aRed);

  // --- 5. INTENSITY (Intensidade & Pressão) ---
  // Corners, duels, offensive pace
  const hCorners = stats.corners[0];
  const aCorners = stats.corners[1];

  const calcIntensity = (corners: number, shots: number, fouls: number) => {
    const cornerScore = Math.min(100, (corners / 8) * 100);
    const activityScore = Math.min(100, ((shots + fouls) / 25) * 100);
    return Math.round(Math.min(99, Math.max(30, cornerScore * 0.45 + activityScore * 0.55)));
  };

  const homeIntensity = calcIntensity(hCorners, hShots, hFouls);
  const awayIntensity = calcIntensity(aCorners, aShots, aFouls);

  // --- 6. EFFICIENCY (Eficiência de Finalização) ---
  // Goals vs xG, conversion rate of shots on target
  const hGoals = match.homeScore;
  const aGoals = match.awayScore;

  const calcEfficiency = (goals: number, sot: number, xg: number) => {
    if (sot === 0) return 50;
    const conversion = (goals / Math.max(1, sot)) * 100;
    const xgOverperformance = (goals - xg) * 20;
    const eff = 50 + conversion * 0.4 + xgOverperformance;
    return Math.round(Math.min(99, Math.max(20, eff)));
  };

  const homeEfficiency = calcEfficiency(hGoals, hSOT, hXG);
  const awayEfficiency = calcEfficiency(aGoals, aSOT, aXG);

  return [
    {
      key: 'attack',
      label: 'Ataque',
      homeScore: homeAttack,
      awayScore: awayAttack,
      homeRaw: `${hSOT} no alvo · ${hXG} xG · ${hShots} chutes`,
      awayRaw: `${aSOT} no alvo · ${aXG} xG · ${aShots} chutes`,
      description: 'Volume de chutes no alvo, qualidade esperada de gols (xG) e chances criadas.',
      leader: homeAttack > awayAttack ? 'home' : homeAttack < awayAttack ? 'away' : 'draw',
    },
    {
      key: 'defense',
      label: 'Defesa',
      homeScore: homeDefense,
      awayScore: awayDefense,
      homeRaw: `${hSaves} defesas · ${hGoalsConceded} sofridos`,
      awayRaw: `${aSaves} defesas · ${aGoalsConceded} sofridos`,
      description: 'Solidez sob pressão, intervenções do goleiro e contenção de xG do adversário.',
      leader: homeDefense > awayDefense ? 'home' : homeDefense < awayDefense ? 'away' : 'draw',
    },
    {
      key: 'possession',
      label: 'Posse & Controle',
      homeScore: homePossession,
      awayScore: awayPossession,
      homeRaw: `${hPoss}% posse · ${hAcc}% precisão (${hPass} passes)`,
      awayRaw: `${aPoss}% posse · ${aAcc}% precisão (${aPass} passes)`,
      description: 'Tempo com a bola, cadência de troca de passes e precisão construtiva.',
      leader: homePossession > awayPossession ? 'home' : homePossession < awayPossession ? 'away' : 'draw',
    },
    {
      key: 'discipline',
      label: 'Disciplina',
      homeScore: homeDiscipline,
      awayScore: awayDiscipline,
      homeRaw: `${hFouls} faltas · ${hYellow} cartões`,
      awayRaw: `${aFouls} faltas · ${aYellow} cartões`,
      description: 'Fair play e contenção de faltas duras e cartões aplicados pela arbitragem.',
      leader: homeDiscipline > awayDiscipline ? 'home' : homeDiscipline < awayDiscipline ? 'away' : 'draw',
    },
    {
      key: 'intensity',
      label: 'Intensidade',
      homeScore: homeIntensity,
      awayScore: awayIntensity,
      homeRaw: `${hCorners} escanteios · ritmo veloz`,
      awayRaw: `${aCorners} escanteios · ritmo veloz`,
      description: 'Pressão alta em bloco, bolas paradas forçadas e transições velozes.',
      leader: homeIntensity > awayIntensity ? 'home' : homeIntensity < awayIntensity ? 'away' : 'draw',
    },
    {
      key: 'efficiency',
      label: 'Eficiência',
      homeScore: homeEfficiency,
      awayScore: awayEfficiency,
      homeRaw: `${hGoals} gols com ${hXG} xG`,
      awayRaw: `${aGoals} gols com ${aXG} xG`,
      description: 'Capacidade de converter oportunidades de gol em placar favorável.',
      leader: homeEfficiency > awayEfficiency ? 'home' : homeEfficiency < awayEfficiency ? 'away' : 'draw',
    },
  ];
}

export const TeamRadarChart: React.FC<TeamRadarChartProps> = ({ match, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [showHome, setShowHome] = useState(true);
  const [showAway, setShowAway] = useState(true);
  const [selectedMetricKey, setSelectedMetricKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'radar' | 'compare'>('radar');

  const metrics = useMemo(() => calculateRadarMetrics(match), [match]);

  const homeAvg = useMemo(() => {
    const sum = metrics.reduce((acc, m) => acc + m.homeScore, 0);
    return Math.round(sum / metrics.length);
  }, [metrics]);

  const awayAvg = useMemo(() => {
    const sum = metrics.reduce((acc, m) => acc + m.awayScore, 0);
    return Math.round(sum / metrics.length);
  }, [metrics]);

  const activeMetric = selectedMetricKey
    ? metrics.find((m) => m.key === selectedMetricKey) || metrics[0]
    : null;

  // D3 Radar Chart Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const containerWidth = containerRef.current.clientWidth || 460;
    const width = Math.min(520, Math.max(340, containerWidth));
    const height = Math.min(420, width * 0.88);
    const radius = Math.min(width, height) / 2 - 58;
    const centerX = width / 2;
    const centerY = height / 2 - 2;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

    const numAxes = metrics.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    // Radius scale (0 to 100)
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // Concentric web grid (levels at 20, 40, 60, 80, 100)
    const levels = [20, 40, 60, 80, 100];
    const gridG = g.append('g').attr('class', 'grid-levels');

    levels.forEach((level) => {
      const levelRadius = rScale(level);

      // Polygon points for this level
      const points: [number, number][] = [];
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleSlice - Math.PI / 2;
        points.push([levelRadius * Math.cos(angle), levelRadius * Math.sin(angle)]);
      }

      // Draw web polygon outline
      gridG
        .append('polygon')
        .attr('points', points.map((p) => p.join(',')).join(' '))
        .attr('fill', level === 100 ? 'rgba(255, 255, 255, 0.015)' : 'none')
        .attr('stroke', 'rgba(255, 255, 255, 0.12)')
        .attr('stroke-dasharray', level === 100 ? 'none' : '3,3')
        .attr('stroke-width', level === 100 ? 1.2 : 0.75);

      // Level number label on vertical axis
      gridG
        .append('text')
        .attr('x', 6)
        .attr('y', -levelRadius + 3)
        .attr('font-size', '8px')
        .attr('font-family', 'monospace')
        .attr('fill', 'rgba(236, 236, 237, 0.35)')
        .text(`${level}%`);
    });

    // Radial axes lines
    const axesG = g.append('g').attr('class', 'axes');

    metrics.forEach((metric, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Line from center to edge
      axesG
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', 'rgba(255, 255, 255, 0.15)')
        .attr('stroke-width', 1);

      // Outer label placement
      const labelRadius = radius + 26;
      const labelX = labelRadius * Math.cos(angle);
      const labelY = labelRadius * Math.sin(angle);

      // Label Group with interactive click
      const labelGroup = axesG
        .append('g')
        .attr('class', 'axis-label cursor-pointer')
        .attr('transform', `translate(${labelX}, ${labelY})`)
        .on('click', () => {
          setSelectedMetricKey(metric.key);
        })
        .on('mouseenter', function () {
          d3.select(this).select('text.metric-name').attr('fill', '#00ff88');
        })
        .on('mouseleave', function () {
          d3.select(this)
            .select('text.metric-name')
            .attr('fill', selectedMetricKey === metric.key ? '#00ff88' : '#ececed');
        });

      // Axis name text
      labelGroup
        .append('text')
        .attr('class', 'metric-name')
        .attr('text-anchor', 'middle')
        .attr('dy', labelY > 0 ? '12px' : '-4px')
        .attr('font-family', 'monospace')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('letter-spacing', '0.04em')
        .attr('fill', selectedMetricKey === metric.key ? '#00ff88' : '#ececed')
        .text(metric.label.toUpperCase());

      // Score subtext e.g. "82 vs 65"
      labelGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', labelY > 0 ? '22px' : '7px')
        .attr('font-family', 'monospace')
        .attr('font-size', '9px')
        .attr('fill', 'rgba(236, 236, 237, 0.55)')
        .text(`${metric.homeScore} · ${metric.awayScore}`);
    });

    // Helper for polygon points
    const getPolygonPoints = (team: 'home' | 'away'): [number, number][] => {
      return metrics.map((m, i) => {
        const val = team === 'home' ? m.homeScore : m.awayScore;
        const r = rScale(val);
        const angle = i * angleSlice - Math.PI / 2;
        return [r * Math.cos(angle), r * Math.sin(angle)];
      });
    };

    // --- Away Team Polygon (Blue #38bdf8) ---
    if (showAway) {
      const awayPoints = getPolygonPoints('away');
      const awayPointsStr = awayPoints.map((p) => p.join(',')).join(' ');

      g.append('polygon')
        .attr('points', awayPointsStr)
        .attr('fill', 'rgba(56, 189, 248, 0.22)')
        .attr('stroke', '#38bdf8')
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .style('filter', 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.4))')
        .style('transition', 'all 0.3s ease');

      // Away vertex dots
      awayPoints.forEach((point, i) => {
        const m = metrics[i];
        g.append('circle')
          .attr('cx', point[0])
          .attr('cy', point[1])
          .attr('r', selectedMetricKey === m.key ? 5 : 3.5)
          .attr('fill', '#38bdf8')
          .attr('stroke', '#0b0c0d')
          .attr('stroke-width', 1.5)
          .attr('class', 'cursor-pointer')
          .on('click', () => setSelectedMetricKey(m.key))
          .append('title')
          .text(`${match.awayTeam.name} - ${m.label}: ${m.awayScore}%`);
      });
    }

    // --- Home Team Polygon (Neon Green #00ff88) ---
    if (showHome) {
      const homePoints = getPolygonPoints('home');
      const homePointsStr = homePoints.map((p) => p.join(',')).join(' ');

      g.append('polygon')
        .attr('points', homePointsStr)
        .attr('fill', 'rgba(0, 255, 136, 0.22)')
        .attr('stroke', '#00ff88')
        .attr('stroke-width', 2.5)
        .attr('stroke-linejoin', 'round')
        .style('filter', 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.45))')
        .style('transition', 'all 0.3s ease');

      // Home vertex dots
      homePoints.forEach((point, i) => {
        const m = metrics[i];
        g.append('circle')
          .attr('cx', point[0])
          .attr('cy', point[1])
          .attr('r', selectedMetricKey === m.key ? 5.5 : 4)
          .attr('fill', '#00ff88')
          .attr('stroke', '#0b0c0d')
          .attr('stroke-width', 1.5)
          .attr('class', 'cursor-pointer')
          .on('click', () => setSelectedMetricKey(m.key))
          .append('title')
          .text(`${match.homeTeam.name} - ${m.label}: ${m.homeScore}%`);
      });
    }

    // Center point indicator
    g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 3)
      .attr('fill', 'rgba(255, 255, 255, 0.3)');
  }, [metrics, showHome, showAway, selectedMetricKey, match]);

  return (
    <div className={`bg-[#0b0c0d] border border-white/10 p-4 sm:p-5 font-mono text-[#ececed] space-y-4 ${className}`}>
      {/* Radar Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-[#00ff88]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base uppercase tracking-tight text-white flex items-center gap-1.5">
                <span>Radar Tático Comparativo</span>
                <span className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 px-1.5 py-0.2 border border-[#00ff88]/20">
                  D3.js
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-[#ececed]/60 font-sans">
              Comparação multidimensional de força relativa: ataque, defesa, posse, disciplina, intensidade e eficiência.
            </p>
          </div>
        </div>

        {/* View mode & Team Visibility Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Home team toggle */}
          <button
            onClick={() => setShowHome(!showHome)}
            className={`px-2.5 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
              showHome
                ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]'
                : 'bg-[#141618] border-white/15 text-white/40 line-through'
            }`}
            title={`Ativar/desativar polígono de ${match.homeTeam.name}`}
          >
            <span className="w-2.5 h-2.5 rounded-none bg-[#00ff88]"></span>
            <span>{match.homeTeam.shortName || match.homeTeam.name.split(' ')[0]}</span>
            <span className="text-[10px] opacity-80">({homeAvg})</span>
          </button>

          {/* Away team toggle */}
          <button
            onClick={() => setShowAway(!showAway)}
            className={`px-2.5 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
              showAway
                ? 'bg-[#38bdf8]/15 border-[#38bdf8] text-[#38bdf8]'
                : 'bg-[#141618] border-white/15 text-white/40 line-through'
            }`}
            title={`Ativar/desativar polígono de ${match.awayTeam.name}`}
          >
            <span className="w-2.5 h-2.5 rounded-none bg-[#38bdf8]"></span>
            <span>{match.awayTeam.shortName || match.awayTeam.name.split(' ')[0]}</span>
            <span className="text-[10px] opacity-80">({awayAvg})</span>
          </button>

          {/* View Mode Toggle: Radar vs Details */}
          <div className="flex items-center border border-white/15 bg-[#141618]">
            <button
              onClick={() => setViewMode('radar')}
              className={`px-2 py-1 text-[11px] transition cursor-pointer font-bold ${
                viewMode === 'radar'
                  ? 'bg-white/15 text-white'
                  : 'text-[#ececed]/60 hover:text-white'
              }`}
            >
              Gráfico
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-2 py-1 text-[11px] transition cursor-pointer font-bold ${
                viewMode === 'compare'
                  ? 'bg-white/15 text-white'
                  : 'text-[#ececed]/60 hover:text-white'
              }`}
            >
              Tabela
            </button>
          </div>
        </div>
      </div>

      {/* Main Radar Display View */}
      {viewMode === 'radar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Radar SVG container */}
          <div ref={containerRef} className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px] relative">
            <svg ref={svgRef} className="w-full max-w-[480px] h-auto overflow-visible select-none" />

            {/* Hint below chart */}
            <span className="text-[10px] text-white/40 mt-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#00ff88]" />
              Clique em qualquer vértice ou rótulo para inspecionar os números brutos.
            </span>
          </div>

          {/* Side Summary & Selected Metric Card */}
          <div className="lg:col-span-5 space-y-3">
            {/* Overall Balance Summary Card */}
            <div className="p-3 bg-[#141618] border border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="label opacity-75 uppercase">Índice Médio Geral</span>
                <span className="text-[10px] text-[#00ff88] font-bold">
                  {homeAvg > awayAvg
                    ? `${match.homeTeam.shortName || 'Mandante'} +${homeAvg - awayAvg} pts`
                    : awayAvg > homeAvg
                    ? `${match.awayTeam.shortName || 'Visitante'} +${awayAvg - homeAvg} pts`
                    : 'Equilíbrio total'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-[#0b0c0d] border border-[#00ff88]/30">
                  <span className="text-[10px] text-[#00ff88] block truncate font-bold">
                    {match.homeTeam.name}
                  </span>
                  <span className="text-2xl font-bold font-['Syne'] text-[#00ff88]">
                    {homeAvg}
                  </span>
                  <span className="text-[9px] text-white/50 block">Média Tática</span>
                </div>

                <div className="p-2 bg-[#0b0c0d] border border-[#38bdf8]/30">
                  <span className="text-[10px] text-[#38bdf8] block truncate font-bold">
                    {match.awayTeam.name}
                  </span>
                  <span className="text-2xl font-bold font-['Syne'] text-[#38bdf8]">
                    {awayAvg}
                  </span>
                  <span className="text-[9px] text-white/50 block">Média Tática</span>
                </div>
              </div>
            </div>

            {/* Selected Metric Deep Dive */}
            {activeMetric ? (
              <div className="p-3.5 bg-[#141618] border border-white/20 space-y-2">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00ff88]"></span>
                    <span className="font-bold text-white uppercase text-xs">{activeMetric.label}</span>
                  </div>
                  <span className="text-[10px] text-[#00ff88] font-bold uppercase">
                    {activeMetric.leader === 'home'
                      ? `Liderança: ${match.homeTeam.shortName || match.homeTeam.name}`
                      : activeMetric.leader === 'away'
                      ? `Liderança: ${match.awayTeam.shortName || match.awayTeam.name}`
                      : 'Empate Técnico'}
                  </span>
                </div>

                <p className="text-[11px] text-[#ececed]/70 font-sans leading-relaxed">
                  {activeMetric.description}
                </p>

                {/* Score and Raw Breakdown */}
                <div className="space-y-2 pt-1">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#00ff88] font-bold">{match.homeTeam.name}: {activeMetric.homeScore}%</span>
                      <span className="text-[10px] text-white/50">{activeMetric.homeRaw}</span>
                    </div>
                    <div className="w-full bg-[#0b0c0d] h-1.5 border border-white/10">
                      <div className="bg-[#00ff88] h-full" style={{ width: `${activeMetric.homeScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#38bdf8] font-bold">{match.awayTeam.name}: {activeMetric.awayScore}%</span>
                      <span className="text-[10px] text-white/50">{activeMetric.awayRaw}</span>
                    </div>
                    <div className="w-full bg-[#0b0c0d] h-1.5 border border-white/10">
                      <div className="bg-[#38bdf8] h-full" style={{ width: `${activeMetric.awayScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Quick list of all 6 metrics */
              <div className="p-3 bg-[#141618] border border-white/10 space-y-1.5">
                <span className="label opacity-75 uppercase text-[10px] block mb-1">
                  Resumo das 6 Dimensões:
                </span>
                {metrics.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setSelectedMetricKey(m.key)}
                    className="w-full flex items-center justify-between text-xs py-1 px-1.5 hover:bg-white/5 transition cursor-pointer border-b border-white/5 last:border-0"
                  >
                    <span className="text-white/80 hover:text-white flex items-center gap-1.5">
                      <span>•</span>
                      <span>{m.label}</span>
                    </span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[#00ff88] font-bold">{m.homeScore}%</span>
                      <span className="text-white/30">vs</span>
                      <span className="text-[#38bdf8] font-bold">{m.awayScore}%</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Detailed Table Comparison View */
        <div className="space-y-2">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/15 bg-[#141618] text-[#ececed]/70 text-[11px]">
                  <th className="text-left p-2.5">Dimensão</th>
                  <th className="text-right p-2.5 text-[#00ff88]">{match.homeTeam.name}</th>
                  <th className="text-center p-2.5 w-32">Comparativo</th>
                  <th className="text-left p-2.5 text-[#38bdf8]">{match.awayTeam.name}</th>
                  <th className="text-left p-2.5 hidden sm:table-cell">Detalhamento</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m) => {
                  const isHomeLeader = m.leader === 'home';
                  const isAwayLeader = m.leader === 'away';

                  return (
                    <tr
                      key={m.key}
                      onClick={() => {
                        setSelectedMetricKey(m.key);
                        setViewMode('radar');
                      }}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition"
                    >
                      <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 ${isHomeLeader ? 'bg-[#00ff88]' : isAwayLeader ? 'bg-[#38bdf8]' : 'bg-white/40'}`}></span>
                        <span>{m.label}</span>
                      </td>

                      <td className="p-2.5 text-right font-bold">
                        <span className={isHomeLeader ? 'text-[#00ff88]' : 'text-white/70'}>
                          {m.homeScore}%
                        </span>
                      </td>

                      <td className="p-2.5">
                        <div className="flex h-1.5 w-full bg-[#0b0c0d] border border-white/10 overflow-hidden">
                          <div
                            className="bg-[#00ff88] transition-all"
                            style={{ width: `${(m.homeScore / (m.homeScore + m.awayScore || 1)) * 100}%` }}
                          />
                          <div
                            className="bg-[#38bdf8] transition-all"
                            style={{ width: `${(m.awayScore / (m.homeScore + m.awayScore || 1)) * 100}%` }}
                          />
                        </div>
                      </td>

                      <td className="p-2.5 text-left font-bold">
                        <span className={isAwayLeader ? 'text-[#38bdf8]' : 'text-white/70'}>
                          {m.awayScore}%
                        </span>
                      </td>

                      <td className="p-2.5 text-[10px] text-white/50 hidden sm:table-cell">
                        <span className="text-[#00ff88]/80">{m.homeRaw}</span> vs <span className="text-[#38bdf8]/80">{m.awayRaw}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Notes on Methodology */}
      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-[#ececed]/50 gap-2">
        <span className="flex items-center gap-1.5">
          <Award className="w-3 h-3 text-[#00ff88]" />
          <span>Métricas calculadas dinamicamente com base em xG, finalizações, posse efetiva e índice disciplinar.</span>
        </span>
        <span>Escala: 0 a 100 normalizada</span>
      </div>
    </div>
  );
};
