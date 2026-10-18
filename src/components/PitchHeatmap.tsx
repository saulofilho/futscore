import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Match, MatchEvent } from '../types';
import { 
  Flame, 
  Compass, 
  Layers, 
  Activity, 
  Sparkles, 
  Filter, 
  Info, 
  Eye, 
  ArrowRight, 
  Shield, 
  Zap, 
  Trophy, 
  Target, 
  Gauge, 
  Maximize2, 
  BarChart3,
  TrendingUp,
  CircleDot
} from 'lucide-react';

interface PitchHeatmapProps {
  match: Match;
  onSelectAthlete?: (athleteNameOrId: string) => void;
  compact?: boolean;
}

export interface HeatPoint {
  x: number; // 0 to 100 (% of pitch length)
  y: number; // 0 to 100 (% of pitch width)
  weight: number; // 0.1 to 1.0 (intensity)
  type: 'attack' | 'midfield' | 'defense';
  label?: string;
  athlete?: string;
  isSimulatedEvent?: boolean;
  eventType?: 'goal' | 'card' | 'sub' | 'penalty';
  minute?: number;
}

export interface TacticalPressureZone {
  id: string;
  name: string;
  shortName: string;
  x: number; // %
  y: number; // %
  width: number; // %
  height: number; // %
  homePressure: number; // %
  awayPressure: number; // %
  dominantTeam: 'home' | 'away' | 'even';
  description: string;
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
  pressureIndex: number; // 0-100
}

/**
 * Generates calibrated heatmap activity points based on match stats,
 * team characteristics, score state, attacking tendencies, and simulated match events.
 */
function generateTeamHeatmap(match: Match, team: 'home' | 'away'): TeamHeatmapData {
  const isHome = team === 'home';
  const teamObj = isHome ? match.homeTeam : match.awayTeam;
  const oppObj = isHome ? match.awayTeam : match.homeTeam;
  const possession = match.stats?.possession ? (isHome ? match.stats.possession[0] : match.stats.possession[1]) : 50;
  const xG = match.stats?.xG ? (isHome ? match.stats.xG[0] : match.stats.xG[1]) : 1.2;
  const shots = match.stats?.shotsTotal ? (isHome ? match.stats.shotsTotal[0] : match.stats.shotsTotal[1]) : 12;
  const shotsOnTarget = match.stats?.shotsOnTarget ? (isHome ? match.stats.shotsOnTarget[0] : match.stats.shotsOnTarget[1]) : 5;
  const corners = match.stats?.corners ? (isHome ? match.stats.corners[0] : match.stats.corners[1]) : 4;

  // Starters from lineup for hotspot attribution
  const lineup = isHome ? match.lineupHome : match.lineupAway;
  const starPlayer = lineup.starters.find(p => p.position === 'ATA' || p.position === 'MEI')?.name || (isHome ? 'Camisa 10' : 'Artilheiro');
  const wingerLeft = lineup.starters.find(p => p.position === 'LAT' || p.position === 'ATA')?.name || 'Ala Esquerdo';
  const wingerRight = lineup.starters.find(p => p.position === 'LAT' || p.position === 'ATA' && p.name !== wingerLeft)?.name || 'Ala Direito';
  const midfielder = lineup.starters.find(p => p.position === 'MEI' || p.position === 'VOL')?.name || 'Armador Central';
  const defender = lineup.starters.find(p => p.position === 'ZAG')?.name || 'Zagueiro Líder';

  // Biases based on possession, attacking performance and events
  const attackBias = Math.min(0.9, Math.max(0.2, (possession / 100) * 0.45 + (xG / 3.5) * 0.35 + (shots / 25) * 0.2));
  const seed = (teamObj.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + (match.minute || 45)) % 100;

  // Flank distribution
  const leftFlankPct = Math.round(30 + ((seed * 7) % 15));
  const rightFlankPct = Math.round(28 + ((seed * 11) % 16));
  const centerFlankPct = 100 - leftFlankPct - rightFlankPct;

  const attackingThirdPct = Math.min(54, Math.round(20 + attackBias * 32));
  const defensiveThirdPct = Math.max(16, Math.round(38 - attackBias * 18));
  const midfieldThirdPct = 100 - attackingThirdPct - defensiveThirdPct;

  // Dynamic touch calculation reacting to match minute and stats
  const totalTouches = Math.round(350 + (possession * 4.2) + (shots * 7) + ((match.minute || 45) * 1.8));
  const pressureIndex = Math.round(Math.min(98, Math.max(25, (possession * 0.5) + (xG * 12) + (shotsOnTarget * 3))));

  const points: HeatPoint[] = [];

  // Home attacks from Left to Right (X: 0 -> 100)
  // Away attacks from Right to Left (X: 100 -> 0)
  const dirX = (pct: number) => isHome ? pct : 100 - pct;

  // 1. Build-up and Defense Clusters
  points.push(
    { x: dirX(14), y: 50, weight: 0.85, type: 'defense', label: 'Saída de Bola Baixa / Goleiro', athlete: defender },
    { x: dirX(22), y: 32, weight: 0.72, type: 'defense', label: 'Início de jogada pela zaga esquerda', athlete: defender },
    { x: dirX(22), y: 68, weight: 0.74, type: 'defense', label: 'Início de jogada pela zaga direita' },
    { x: dirX(28), y: 50, weight: 0.9, type: 'defense', label: 'Primeiro volante / Distribuição', athlete: midfielder },
    { x: dirX(18), y: 18, weight: 0.68, type: 'defense', label: 'Cobertura lateral esquerda' },
    { x: dirX(18), y: 82, weight: 0.65, type: 'defense', label: 'Cobertura lateral direita' }
  );

  // 2. Midfield control & transition clusters
  points.push(
    { x: dirX(42), y: 50, weight: 0.95, type: 'midfield', label: 'Círculo central / Troca de passes', athlete: midfielder },
    { x: dirX(46), y: 28, weight: 0.84, type: 'midfield', label: 'Apoio na meia-esquerda' },
    { x: dirX(46), y: 72, weight: 0.86, type: 'midfield', label: 'Apoio na meia-direita' },
    { x: dirX(52), y: 48, weight: 0.94, type: 'midfield', label: 'Armação de jogadas no terço médio', athlete: starPlayer },
    { x: dirX(38), y: 38, weight: 0.78, type: 'midfield', label: 'Retomada e combate de posse de bola' },
    { x: dirX(38), y: 62, weight: 0.8, type: 'midfield', label: 'Circulação e inversão de jogo rápida' },
    { x: dirX(50), y: 16, weight: 0.88, type: 'midfield', label: 'Subida do lateral esquerdo', athlete: wingerLeft },
    { x: dirX(50), y: 84, weight: 0.86, type: 'midfield', label: 'Subida do lateral direito', athlete: wingerRight }
  );

  // 3. Attacking Third & Box Incursions
  points.push(
    { x: dirX(68), y: 22, weight: 0.94, type: 'attack', label: 'Triangulação no corredor esquerdo ofensivo', athlete: wingerLeft },
    { x: dirX(68), y: 78, weight: 0.89, type: 'attack', label: 'Triangulação no corredor direito ofensivo', athlete: wingerRight },
    { x: dirX(72), y: 50, weight: 0.98, type: 'attack', label: 'Entrada da grande área / Chute perigoso', athlete: starPlayer },
    { x: dirX(78), y: 36, weight: 0.96, type: 'attack', label: 'Infiltração no flanco esquerdo da área' },
    { x: dirX(78), y: 64, weight: 0.92, type: 'attack', label: 'Cruzamento na área adversária' },
    { x: dirX(86), y: 50, weight: 0.95, type: 'attack', label: 'Marca do pênalti / Finalização a gol', athlete: starPlayer },
    { x: dirX(88), y: 42, weight: 0.84, type: 'attack', label: 'Presença no primeiro pau' },
    { x: dirX(88), y: 58, weight: 0.82, type: 'attack', label: 'Fechamento de jogada na segunda trave' },
    { x: dirX(94), y: 12, weight: 0.76, type: 'attack', label: 'Cobrança de escanteio / Linha de fundo' },
    { x: dirX(94), y: 88, weight: 0.74, type: 'attack', label: 'Cruzamento rasteiro de linha de fundo' }
  );

  // 4. INTEGRATE SIMULATED MATCH EVENTS (Goals, Cards, Subs, Penalties)
  if (match.events && match.events.length > 0) {
    match.events.forEach((ev, idx) => {
      // Check if this event relates to this team
      const isEventForThisTeam = ev.team === team;
      if (!isEventForThisTeam) return;

      if (ev.type === 'goal') {
        // High-intensity goalmouth and penalty box strike hotspot
        const goalSpotX = dirX(87 + ((ev.minute % 7) * 0.8));
        const goalSpotY = 44 + ((idx * 8) % 16);
        points.push({
          x: goalSpotX,
          y: goalSpotY,
          weight: 1.0,
          type: 'attack',
          label: `⚽ GOL (${ev.minute}') - ${ev.player}`,
          athlete: ev.player,
          isSimulatedEvent: true,
          eventType: 'goal',
          minute: ev.minute
        });
      } else if (ev.type === 'yellow_card' || ev.type === 'red_card') {
        // Defensive / tactical foul hotspot
        const cardX = dirX(32 + ((ev.minute * 3) % 40));
        const cardY = 25 + ((ev.minute * 5) % 50);
        points.push({
          x: cardX,
          y: cardY,
          weight: 0.88,
          type: 'defense',
          label: `${ev.type === 'red_card' ? '🟥 Cartão Vermelho' : '🟨 Cartão Amarelo'} (${ev.minute}') - ${ev.player}`,
          athlete: ev.player,
          isSimulatedEvent: true,
          eventType: 'card',
          minute: ev.minute
        });
      } else if (ev.type === 'sub') {
        // Sideline substitution hotspot
        points.push({
          x: dirX(50),
          y: 7,
          weight: 0.75,
          type: 'midfield',
          label: `🔄 Substituição (${ev.minute}') - Entra ${ev.player}${ev.subOut ? ` (sai ${ev.subOut})` : ''}`,
          athlete: ev.player,
          isSimulatedEvent: true,
          eventType: 'sub',
          minute: ev.minute
        });
      }
    });
  }

  // Micro-points for realistic thermal density scatter
  for (let i = 0; i < 22; i++) {
    const rx = dirX(15 + ((seed * (i + 3) * 7) % 76));
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
    pressureIndex,
  };
}

/**
 * Calculates 6 distinct tactical pressure zones across the football pitch
 */
function calculateTacticalPressureZones(match: Match): TacticalPressureZone[] {
  const possessionHome = match.stats?.possession ? match.stats.possession[0] : 50;
  const possessionAway = 100 - possessionHome;
  const shotsHome = match.stats?.shotsTotal ? match.stats.shotsTotal[0] : 10;
  const shotsAway = match.stats?.shotsTotal ? match.stats.shotsTotal[1] : 8;
  const xGHome = match.stats?.xG ? match.stats.xG[0] : 1.2;
  const xGAway = match.stats?.xG ? match.stats.xG[1] : 1.0;
  
  // Tactical bias factors
  const homeAdv = (possessionHome / 100) * 0.5 + (xGHome / (xGHome + xGAway || 1)) * 0.5;

  return [
    {
      id: 'def_home',
      name: `Saída de Bola & Defesa (${match.homeTeam.shortName})`,
      shortName: 'Defesa Baixa',
      x: 0,
      y: 0,
      width: 33.3,
      height: 100,
      homePressure: Math.round(55 + (shotsAway > 12 ? -15 : 10)),
      awayPressure: Math.round(45 + (shotsAway > 12 ? 15 : -10)),
      dominantTeam: shotsAway > 12 ? 'away' : 'home',
      description: 'Zona de construção da zaga e pressão na saída de bola adversária.'
    },
    {
      id: 'mid_left',
      name: 'Corredor Esquerdo / Transição',
      shortName: 'Flanco Esquerdo',
      x: 33.3,
      y: 0,
      width: 33.4,
      height: 50,
      homePressure: Math.round(homeAdv * 60 + 20),
      awayPressure: 100 - Math.round(homeAdv * 60 + 20),
      dominantTeam: homeAdv > 0.5 ? 'home' : 'away',
      description: 'Duelos individuais, ultrapassagens dos laterais e inversão de jogo.'
    },
    {
      id: 'mid_right',
      name: 'Corredor Direito / Transição',
      shortName: 'Flanco Direito',
      x: 33.3,
      y: 50,
      width: 33.4,
      height: 50,
      homePressure: Math.round(homeAdv * 55 + 22),
      awayPressure: 100 - Math.round(homeAdv * 55 + 22),
      dominantTeam: homeAdv > 0.5 ? 'home' : 'away',
      description: 'Apoio de pontas, cruzamentos e recomposição defensiva.'
    },
    {
      id: 'mid_center',
      name: 'Círculo Central & Meio-Campo',
      shortName: 'Eixo Central',
      x: 33.3,
      y: 25,
      width: 33.4,
      height: 50,
      homePressure: Math.round(possessionHome),
      awayPressure: Math.round(possessionAway),
      dominantTeam: possessionHome >= 50 ? 'home' : 'away',
      description: 'Zona de maior densidade de passes, desarmes e controle de ritmo.'
    },
    {
      id: 'att_home',
      name: `Terço Ofensivo (${match.homeTeam.shortName}) / Blitz`,
      shortName: 'Área Ofensiva',
      x: 66.7,
      y: 0,
      width: 33.3,
      height: 100,
      homePressure: Math.round(Math.min(85, Math.max(25, 40 + (xGHome * 16)))),
      awayPressure: 100 - Math.round(Math.min(85, Math.max(25, 40 + (xGHome * 16)))),
      dominantTeam: xGHome >= xGAway ? 'home' : 'away',
      description: 'Zonas de finalização, chutes a gol e criação de grandes chances.'
    }
  ];
}

export const PitchHeatmap: React.FC<PitchHeatmapProps> = ({ 
  match, 
  onSelectAthlete, 
  compact = false 
}) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away' | 'comparison'>('comparison');
  const [visualMode, setVisualMode] = useState<'heatmap' | 'pressure_zones' | 'events'>('heatmap');
  const [actionFilter, setActionFilter] = useState<'all' | 'attack' | 'midfield' | 'defense'>('all');
  const [showGridAnalytics, setShowGridAnalytics] = useState(!compact);
  const [hoveredPoint, setHoveredPoint] = useState<HeatPoint | null>(null);
  const [hoveredZone, setHoveredZone] = useState<TacticalPressureZone | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const homeData = useMemo(() => generateTeamHeatmap(match, 'home'), [match]);
  const awayData = useMemo(() => generateTeamHeatmap(match, 'away'), [match]);
  const pressureZones = useMemo(() => calculateTacticalPressureZones(match), [match]);

  const activeData = selectedTeam === 'home' ? homeData : selectedTeam === 'away' ? awayData : null;

  // D3 Rendering of the pitch lines, heatmap glow, and pressure zones
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
    const m = { top: 24, right: 24, bottom: 32, left: 24 };
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

    // Away Team Alternate Gradient (Cyan/Sky Core -> Purple/Blue -> Transparent)
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

    // Main Pitch Group
    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    // 1. PITCH GRASS BASE & MOWING STRIPES (Dark tactical turf)
    g.append('rect')
      .attr('width', pW)
      .attr('height', pH)
      .attr('fill', '#09100b')
      .attr('stroke', '#1c2e22')
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
        .attr('fill', '#0c160f')
        .attr('opacity', 0.65);
    }

    // 2. FOOTBALL PITCH LINES & MARKINGS (Crisp tactical lines)
    const pitchLines = g.append('g').attr('class', 'pitch-lines').attr('stroke', '#ffffff').attr('stroke-opacity', 0.4).attr('fill', 'none').attr('stroke-width', 1.5);

    // Boundary Line
    pitchLines.append('rect').attr('x', 0).attr('y', 0).attr('width', pW).attr('height', pH);

    // Halfway Line
    pitchLines.append('line').attr('x1', pW / 2).attr('y1', 0).attr('x2', pW / 2).attr('y2', pH);

    // Center Circle (Radius ~ 18% of height)
    const centerRadius = pH * 0.18;
    pitchLines.append('circle').attr('cx', pW / 2).attr('cy', pH / 2).attr('r', centerRadius);
    pitchLines.append('circle').attr('cx', pW / 2).attr('cy', pH / 2).attr('r', 2.5).attr('fill', '#ffffff').attr('fill-opacity', 0.6);

    // Penalty Areas (16.5m equivalent ~ 16.5% width, 58% height)
    const penW = pW * 0.165;
    const penH = pH * 0.58;
    const penY = (pH - penH) / 2;

    // Left Penalty Area
    pitchLines.append('rect').attr('x', 0).attr('y', penY).attr('width', penW).attr('height', penH);
    // Left Goal Area
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

    const scaleX = d3.scaleLinear().domain([0, 100]).range([0, pW]);
    const scaleY = d3.scaleLinear().domain([0, 100]).range([0, pH]);

    // 3. TACTICAL PRESSURE ZONES OVERLAY (When in pressure_zones mode)
    if (visualMode === 'pressure_zones') {
      const zonesGroup = g.append('g').attr('class', 'pressure-zones-layer');

      pressureZones.forEach((z) => {
        const zX = (z.x / 100) * pW;
        const zY = (z.y / 100) * pH;
        const zW = (z.width / 100) * pW;
        const zH = (z.height / 100) * pH;

        const isHomeDominant = z.dominantTeam === 'home';
        const zoneColor = isHomeDominant ? '#00ff88' : '#38bdf8';
        const fillOpacity = 0.12 + (Math.abs(z.homePressure - 50) / 100) * 0.22;

        const zoneRect = zonesGroup.append('rect')
          .attr('x', zX)
          .attr('y', zY)
          .attr('width', zW)
          .attr('height', zH)
          .attr('fill', zoneColor)
          .attr('fill-opacity', fillOpacity)
          .attr('stroke', zoneColor)
          .attr('stroke-opacity', 0.4)
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '4,4')
          .style('cursor', 'pointer')
          .on('mouseenter', () => setHoveredZone(z))
          .on('mouseleave', () => setHoveredZone(null));

        // Zone label badge in SVG
        const badgeG = zonesGroup.append('g')
          .attr('transform', `translate(${zX + zW / 2}, ${zY + zH / 2})`)
          .style('pointer-events', 'none');

        badgeG.append('rect')
          .attr('x', -55)
          .attr('y', -16)
          .attr('width', 110)
          .attr('height', 32)
          .attr('fill', '#0b0c0d')
          .attr('fill-opacity', 0.88)
          .attr('stroke', zoneColor)
          .attr('stroke-width', 1);

        badgeG.append('text')
          .attr('x', 0)
          .attr('y', -3)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '10px')
          .attr('font-family', 'monospace')
          .attr('font-weight', 'bold')
          .text(z.shortName);

        badgeG.append('text')
          .attr('x', 0)
          .attr('y', 10)
          .attr('text-anchor', 'middle')
          .attr('fill', zoneColor)
          .attr('font-size', '9px')
          .attr('font-family', 'monospace')
          .attr('font-weight', 'bold')
          .text(`${isHomeDominant ? match.homeTeam.shortName : match.awayTeam.shortName}: ${isHomeDominant ? z.homePressure : z.awayPressure}%`);
      });
    }

    // 4. HEATMAP CLUSTERS & POINTS RENDERING (When in heatmap or events mode)
    if (visualMode === 'heatmap' || visualMode === 'events') {
      const heatGroup = g.append('g').attr('class', 'heat-layer').attr('filter', 'url(#heat-blur)');

      // Determine datasets to render
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
          .attr('r', 0)
          .attr('fill', gradId)
          .attr('opacity', 0.88)
          .transition()
          .duration(650)
          .ease(d3.easeCubicOut)
          .attr('r', (d: HeatPoint) => (d.isSimulatedEvent ? 45 : 28 + d.weight * 34));
      });
    }

    // 5. SIMULATED EVENT BEACONS (Pulsing circles for live simulated goals/cards)
    const eventsLayer = g.append('g').attr('class', 'simulated-events-layer');
    const allEventsPoints = [...homeData.points, ...awayData.points].filter(p => p.isSimulatedEvent);

    allEventsPoints.forEach((pt) => {
      const eX = scaleX(pt.x);
      const eY = scaleY(pt.y);
      const isGoal = pt.eventType === 'goal';
      const beaconColor = isGoal ? '#00ff88' : pt.eventType === 'card' ? '#f59e0b' : '#38bdf8';

      // Pulsing outer ring
      eventsLayer.append('circle')
        .attr('cx', eX)
        .attr('cy', eY)
        .attr('r', isGoal ? 20 : 14)
        .attr('fill', 'none')
        .attr('stroke', beaconColor)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8)
        .attr('class', 'animate-ping')
        .style('transform-origin', `${eX}px ${eY}px`);

      // Core event pin
      eventsLayer.append('circle')
        .attr('cx', eX)
        .attr('cy', eY)
        .attr('r', isGoal ? 7 : 5)
        .attr('fill', beaconColor)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1.5);

      // Event label
      eventsLayer.append('text')
        .attr('x', eX)
        .attr('y', eY - (isGoal ? 12 : 9))
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '9px')
        .attr('font-family', 'monospace')
        .attr('font-weight', 'bold')
        .attr('stroke', '#000000')
        .attr('stroke-width', 2)
        .attr('paint-order', 'stroke')
        .text(pt.minute ? `${pt.minute}'` : '!');
    });

    // 6. INTERACTIVE HOVER HOTSPOTS (Unblurred layer for precise tooltips)
    const interactiveLayer = g.append('g').attr('class', 'interactive-layer');

    const allActivePoints: HeatPoint[] = (
      selectedTeam === 'home' 
        ? homeData.points 
        : selectedTeam === 'away' 
        ? awayData.points 
        : [...homeData.points, ...awayData.points]
    ).filter(p => actionFilter === 'all' || p.type === actionFilter);

    interactiveLayer.selectAll<SVGCircleElement, HeatPoint>('.hotspot-target')
      .data(allActivePoints)
      .enter()
      .append('circle')
      .attr('class', 'hotspot-target')
      .attr('cx', (d: HeatPoint) => scaleX(d.x))
      .attr('cy', (d: HeatPoint) => scaleY(d.y))
      .attr('r', (d: HeatPoint) => (d.isSimulatedEvent ? 22 : 16))
      .attr('fill', 'transparent')
      .style('cursor', 'pointer')
      .on('mouseenter', (_, d: HeatPoint) => setHoveredPoint(d))
      .on('mouseleave', () => setHoveredPoint(null))
      .on('click', (_, d: HeatPoint) => {
        if (d.athlete && onSelectAthlete) {
          onSelectAthlete(d.athlete);
        }
      });

    // 7. DIRECTION OF ATTACK ARROW & LABELS
    const attackDirY = pH + 18;
    if (selectedTeam === 'home' || selectedTeam === 'comparison') {
      const homeAttack = svg.append('g').attr('transform', `translate(${m.left}, ${attackDirY})`).attr('class', 'font-mono text-[9px]');
      homeAttack.append('text').attr('x', 0).attr('y', 0).attr('fill', '#00ff88').attr('font-weight', 'bold').text(`ATAQUE ${match.homeTeam.shortName} →`);
      homeAttack.append('line').attr('x1', 110).attr('y1', -3).attr('x2', pW / 2 - 20).attr('y2', -3).attr('stroke', '#00ff88').attr('stroke-width', 1.5).attr('stroke-dasharray', '3,3');
    }
    if (selectedTeam === 'away' || selectedTeam === 'comparison') {
      const awayAttack = svg.append('g').attr('transform', `translate(${m.left}, ${attackDirY})`).attr('class', 'font-mono text-[9px]');
      awayAttack.append('text').attr('x', pW).attr('y', 0).attr('text-anchor', 'end').attr('fill', '#38bdf8').attr('font-weight', 'bold').text(`← ATAQUE ${match.awayTeam.shortName}`);
      awayAttack.append('line').attr('x1', pW - 110).attr('y1', -3).attr('x2', pW / 2 + 20).attr('y2', -3).attr('stroke', '#38bdf8').attr('stroke-width', 1.5).attr('stroke-dasharray', '3,3');
    }

  }, [
    selectedTeam, 
    visualMode, 
    actionFilter, 
    homeData, 
    awayData, 
    pressureZones, 
    match.homeTeam.shortName, 
    match.awayTeam.shortName, 
    onSelectAthlete
  ]);

  // Real-time Pressure Balance percentage
  const totalPressure = homeData.pressureIndex + awayData.pressureIndex || 1;
  const homePressurePct = Math.round((homeData.pressureIndex / totalPressure) * 100);
  const awayPressurePct = 100 - homePressurePct;

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Header Card */}
      <div className="bg-[#0b0c0d] p-3.5 sm:p-4 border border-white/10 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-orange-950/60 border border-orange-500/40 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-['Syne'] font-extrabold text-sm sm:text-base text-white uppercase tracking-tight">
                  Mapa de Calor &amp; Zonas de Pressão
                </h4>
                <span className="text-[9px] font-mono text-[#00ff88] bg-[#00ff88]/10 px-1.5 py-0.5 border border-[#00ff88]/30 font-bold">
                  SVG/D3 ENGINE
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#ececed]/60 font-sans">
                Concentração posicional, densidade de toques e zonas de alta pressão durante o jogo simulado
              </p>
            </div>
          </div>

          {/* Visual Mode Selector (Heatmap vs Zonas de Pressão vs Lances) */}
          <div className="flex items-center gap-1 bg-[#141618] p-1 border border-white/15 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setVisualMode('heatmap')}
              id="btn-mode-heatmap"
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
                visualMode === 'heatmap'
                  ? 'bg-orange-500 text-white'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Térmico</span>
            </button>

            <button
              onClick={() => setVisualMode('pressure_zones')}
              id="btn-mode-pressure"
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
                visualMode === 'pressure_zones'
                  ? 'bg-[#00ff88] text-black font-extrabold'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              <Target className="w-3 h-3" />
              <span>Zonas de Pressão</span>
            </button>

            <button
              onClick={() => setVisualMode('events')}
              id="btn-mode-events"
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
                visualMode === 'events'
                  ? 'bg-amber-400 text-black font-extrabold'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              <CircleDot className="w-3 h-3" />
              <span>Lances Simulados</span>
            </button>
          </div>
        </div>

        {/* Live Pressure Bar (Termômetro de Pressão da Simulação) */}
        <div className="bg-[#141618] p-2.5 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-[#00ff88] flex items-center gap-1">
              <span>{match.homeTeam.badgeEmoji}</span>
              <span>{match.homeTeam.shortName} {homePressurePct}%</span>
              <span className="text-[9px] opacity-60 font-normal">({homeData.pressureIndex} pts de pressão)</span>
            </span>

            <span className="text-white/60 text-[9px] uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#00ff88]" />
              <span>Índice de Pressão Territorial</span>
            </span>

            <span className="text-[#38bdf8] flex items-center gap-1">
              <span className="text-[9px] opacity-60 font-normal">({awayData.pressureIndex} pts)</span>
              <span>{match.awayTeam.shortName} {awayPressurePct}%</span>
              <span>{match.awayTeam.badgeEmoji}</span>
            </span>
          </div>

          <div className="flex h-2 w-full bg-[#0b0c0d] border border-white/10 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-[#00ff88] transition-all duration-700"
              style={{ width: `${homePressurePct}%` }}
              title={`Pressão ${match.homeTeam.name}: ${homePressurePct}%`}
            />
            <div
              className="bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${awayPressurePct}%` }}
              title={`Pressão ${match.awayTeam.name}: ${awayPressurePct}%`}
            />
          </div>
        </div>

        {/* Team Selector & Action Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5">
          {/* Team Switcher */}
          <div className="flex items-center gap-1 bg-[#141618] p-0.5 border border-white/15">
            <button
              onClick={() => setSelectedTeam('home')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
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
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
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
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
                selectedTeam === 'comparison'
                  ? 'bg-amber-400 text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
              title="Comparar ambos os times no mesmo gramado"
            >
              <Compass className="w-3 h-3" />
              <span>Comparar Ambos</span>
            </button>
          </div>

          {/* Action Filters */}
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setActionFilter('all')}
              className={`px-2 py-0.5 text-[9px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white'
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setActionFilter('attack')}
              className={`px-2 py-0.5 text-[9px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'attack'
                  ? 'bg-red-950 text-red-200 border-red-500'
                  : 'bg-[#141618] text-red-400/80 border-red-900/40 hover:text-red-300'
              }`}
            >
              🔥 Terço Ofensivo
            </button>

            <button
              onClick={() => setActionFilter('midfield')}
              className={`px-2 py-0.5 text-[9px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'midfield'
                  ? 'bg-yellow-950 text-yellow-200 border-yellow-500'
                  : 'bg-[#141618] text-yellow-400/80 border-yellow-900/40 hover:text-yellow-300'
              }`}
            >
              ⚡ Meio &amp; Criação
            </button>

            <button
              onClick={() => setActionFilter('defense')}
              className={`px-2 py-0.5 text-[9px] font-bold uppercase transition cursor-pointer border ${
                actionFilter === 'defense'
                  ? 'bg-blue-950 text-blue-200 border-blue-500'
                  : 'bg-[#141618] text-blue-400/80 border-blue-900/40 hover:text-blue-300'
              }`}
            >
              🛡️ Saída &amp; Defesa
            </button>

            {!compact && (
              <button
                onClick={() => setShowGridAnalytics(!showGridAnalytics)}
                className={`px-2 py-0.5 text-[9px] font-bold uppercase transition cursor-pointer border flex items-center gap-1 ml-1 ${
                  showGridAnalytics
                    ? 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/40'
                    : 'bg-[#141618] text-[#ececed]/50 border-white/10 hover:text-white'
                }`}
              >
                <Layers className="w-2.5 h-2.5" />
                <span>{showGridAnalytics ? 'Ocultar Terços' : 'Ver Terços'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Pitch Visualization Canvas (SVG with D3) */}
      <div className="relative bg-[#070b08] border border-white/20 p-2 sm:p-4 overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full relative">
          <svg ref={svgRef} className="w-full block select-none" />

          {/* Hovered Point Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute z-30 pointer-events-none bg-[#0b0c0d]/95 backdrop-blur border border-white/20 p-2.5 text-[10px] text-white shadow-2xl min-w-[170px]"
              style={{
                left: `${Math.min(75, Math.max(8, hoveredPoint.x))}%`,
                top: `${Math.min(75, Math.max(12, hoveredPoint.y))}%`,
                transform: 'translate(-50%, -120%)',
              }}
            >
              <div className="flex items-center gap-1 text-[#00ff88] font-bold mb-0.5 uppercase text-[9px]">
                <Zap className="w-3 h-3" />
                <span>{hoveredPoint.isSimulatedEvent ? '⚡ Lance em Destaque' : 'Zona de Intensidade'}</span>
              </div>
              <p className="font-bold text-white leading-tight">{hoveredPoint.label || 'Zona de Circulação'}</p>
              {hoveredPoint.athlete && (
                <p className="text-[#ececed]/80 mt-1">
                  Atleta envolvido: <strong className="text-[#00ff88]">{hoveredPoint.athlete}</strong>
                </p>
              )}
              <div className="flex items-center justify-between text-[9px] text-[#ececed]/50 mt-1.5 pt-1 border-t border-white/10">
                <span>Concentração: {Math.round(hoveredPoint.weight * 100)}%</span>
                <span>Setor: {hoveredPoint.type.toUpperCase()}</span>
              </div>
            </div>
          )}

          {/* Hovered Pressure Zone Tooltip */}
          {hoveredZone && (
            <div
              className="absolute z-30 pointer-events-none bg-[#0b0c0d]/95 backdrop-blur border border-[#00ff88]/40 p-2.5 text-[10px] text-white shadow-2xl max-w-[220px]"
              style={{
                left: `${Math.min(75, Math.max(10, hoveredZone.x + hoveredZone.width / 2))}%`,
                top: `${Math.min(75, Math.max(15, hoveredZone.y + hoveredZone.height / 2))}%`,
                transform: 'translate(-50%, -120%)',
              }}
            >
              <div className="flex items-center gap-1 text-[#00ff88] font-bold mb-1 uppercase text-[9px]">
                <Target className="w-3 h-3" />
                <span>Setor: {hoveredZone.name}</span>
              </div>
              <p className="text-[#ececed]/80 text-[10px] leading-tight mb-2">
                {hoveredZone.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono border-t border-white/10 pt-1.5">
                <div className="text-[#00ff88]">
                  {match.homeTeam.shortName}: <strong>{hoveredZone.homePressure}%</strong>
                </div>
                <div className="text-[#38bdf8] text-right">
                  {match.awayTeam.shortName}: <strong>{hoveredZone.awayPressure}%</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend of Heat & Pressure */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 mt-2 border-t border-white/10 text-[10px] text-[#ececed]/70">
          <div className="flex items-center gap-2">
            <span className="opacity-60 uppercase text-[9px]">Intensidade de Pressão:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] opacity-50">Baixa</span>
              <div className="w-20 sm:w-28 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-red-600 border border-white/20" />
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

      {/* Sector Analytics & Flank Distribution Cards (Shown when showGridAnalytics is true) */}
      {showGridAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Home Team Flank Analysis */}
          <div className="bg-[#0b0c0d] p-3.5 sm:p-4 border border-white/10 space-y-3">
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
          <div className="bg-[#0b0c0d] p-3.5 sm:p-4 border border-white/10 space-y-3">
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
      <div className="bg-[#0b0c0d] p-3 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] text-[#ececed]/70">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#00ff88] shrink-0" />
          <span>
            {visualMode === 'pressure_zones'
              ? 'Zonas de Pressão calculam a relação entre posse territorial, xG gerado e recuperações rápidas nos 6 setores do gramado.'
              : 'Dica: Clique em qualquer ponto ou atleta em destaque para ver a ficha completa de desempenho.'}
          </span>
        </div>
        <span className="text-[10px] opacity-50 shrink-0 font-mono">
          Opta &amp; GPS Match Engine
        </span>
      </div>
    </div>
  );
};
