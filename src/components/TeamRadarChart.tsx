import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';
import { Match } from '../types';
import {
  Shield,
  Zap,
  Activity,
  Award,
  Compass,
  Flame,
  CheckCircle2,
  Sparkles,
  Sliders,
  Crosshair,
  HeartHandshake,
  Lightbulb,
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TeamRadarChartProps {
  match: Match;
  className?: string;
  compact?: boolean;
}

export interface CompetencyData {
  key: string;
  subject: string;
  home: number;
  away: number;
  fullMark: number;
  homeRaw: string;
  awayRaw: string;
  description: string;
  iconName: 'attack' | 'defense' | 'discipline' | 'creation' | 'possession' | 'efficiency';
  leader: 'home' | 'away' | 'draw';
}

/**
 * Calculates normalized (0 - 100) competency scores for the Radar Chart using real match statistics.
 * The 4 requested core competencies:
 * 1. ATAQUE (Attack): Goals, xG, shots on target, total shots, big chances
 * 2. DEFESA (Defense): Goals conceded, saves, xG conceded, defensive solidity
 * 3. DISCIPLINA (Discipline): Fair play index (fouls, yellow cards, red cards)
 * 4. CRIAÇÃO (Creation): Ball possession, total passes, pass accuracy, corners, chances created
 */
export function calculateCompetencies(match: Match, mode: 'core4' | 'expanded6' = 'core4'): CompetencyData[] {
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

  // Scheduled match projection baseline
  if (isScheduled) {
    const seedH = (match.homeTeam.name.length * 7) % 20;
    const seedA = (match.awayTeam.name.length * 11) % 20;

    const hAtk = 72 + seedH;
    const aAtk = 70 + seedA;
    const hDef = 76 - (seedH % 8);
    const aDef = 74 - (seedA % 8);
    const hDisc = 88;
    const aDisc = 85;
    const hCri = 75 + (seedH % 10);
    const aCri = 73 + (seedA % 10);

    const core: CompetencyData[] = [
      {
        key: 'attack',
        subject: 'Ataque',
        home: hAtk,
        away: aAtk,
        fullMark: 100,
        homeRaw: 'Projeção de volume e letalidade no arremate',
        awayRaw: 'Projeção de volume e letalidade no arremate',
        description: 'Poder de fogo ofensivo, finalizações e capacidade de infiltração no terço final.',
        iconName: 'attack',
        leader: hAtk > aAtk ? 'home' : 'away',
      },
      {
        key: 'defense',
        subject: 'Defesa',
        home: hDef,
        away: aDef,
        fullMark: 100,
        homeRaw: 'Índice projetado de contenção defensiva',
        awayRaw: 'Índice projetado de contenção defensiva',
        description: 'Segurança da baliza, interceptações e resistência sob pressão adversária.',
        iconName: 'defense',
        leader: hDef > aDef ? 'home' : 'away',
      },
      {
        key: 'discipline',
        subject: 'Disciplina',
        home: hDisc,
        away: aDisc,
        fullMark: 100,
        homeRaw: 'Fair play 100% projetado',
        awayRaw: 'Fair play 100% projetado',
        description: 'Controle tático e temperamental: ausência de advertências graves e faltas desnecessárias.',
        iconName: 'discipline',
        leader: 'home',
      },
      {
        key: 'creation',
        subject: 'Criação',
        home: hCri,
        away: aCri,
        fullMark: 100,
        homeRaw: 'Articulação de jogadas e passes',
        awayRaw: 'Articulação de jogadas e passes',
        description: 'Capacidade de criação, circulação de bola, inversões e quebra de linhas defensivas.',
        iconName: 'creation',
        leader: hCri > aCri ? 'home' : 'away',
      },
    ];

    if (mode === 'expanded6') {
      core.push(
        {
          key: 'possession',
          subject: 'Posse',
          home: 54,
          away: 46,
          fullMark: 100,
          homeRaw: '54% projetado',
          awayRaw: '46% projetado',
          description: 'Controle do ritmo e retenção da posse de bola.',
          iconName: 'possession',
          leader: 'home',
        },
        {
          key: 'efficiency',
          subject: 'Eficiência',
          home: 74,
          away: 70,
          fullMark: 100,
          homeRaw: 'Aproveitamento esperado',
          awayRaw: 'Aproveitamento esperado',
          description: 'Aproveitamento e conversão das oportunidades em gols reais.',
          iconName: 'efficiency',
          leader: 'home',
        }
      );
    }

    return core;
  }

  // --- 1. ATAQUE (Goals, xG, Shots on target, Shots total, Big chances) ---
  const calcAttack = (teamIdx: 0 | 1) => {
    const goals = teamIdx === 0 ? match.homeScore : match.awayScore;
    const sot = stats.shotsOnTarget[teamIdx] || 0;
    const shots = stats.shotsTotal[teamIdx] || 0;
    const xg = stats.xG[teamIdx] || 0;
    const bigChances = stats.bigChances[teamIdx] || 0;

    const goalScore = Math.min(30, goals * 12);
    const sotScore = Math.min(25, (sot / 7) * 25);
    const xgScore = Math.min(25, (xg / 2.2) * 25);
    const shotVolume = Math.min(12, (shots / 16) * 12);
    const chanceScore = Math.min(8, (bigChances / 3) * 8);

    const total = Math.round(goalScore + sotScore + xgScore + shotVolume + chanceScore);
    return Math.max(18, Math.min(98, total));
  };

  const homeAttack = calcAttack(0);
  const awayAttack = calcAttack(1);

  // --- 2. DEFESA (Goals conceded, Goalkeeper saves, xG conceded) ---
  const calcDefense = (teamIdx: 0 | 1) => {
    const oppIdx: 0 | 1 = teamIdx === 0 ? 1 : 0;
    const goalsConceded = teamIdx === 0 ? match.awayScore : match.homeScore;
    const saves = stats.goalkeeperSaves[teamIdx] || 0;
    const xgConceded = stats.xG[oppIdx] || 0;
    const oppSot = stats.shotsOnTarget[oppIdx] || 0;

    // Clean sheet or low conceded goals reward
    const cleanSheetPts = Math.max(0, 35 - goalsConceded * 12);
    // Saves bonus
    const savePts = Math.min(30, (saves / 5) * 30);
    // Suppressed opponent xG
    const xgContainPts = Math.max(5, Math.min(35, (1 - xgConceded / 2.8) * 35));

    const total = Math.round(cleanSheetPts + savePts + xgContainPts);
    return Math.max(20, Math.min(98, total));
  };

  const homeDefense = calcDefense(0);
  const awayDefense = calcDefense(1);

  // --- 3. DISCIPLINA (Fouls, Yellow cards, Red cards) ---
  const calcDiscipline = (teamIdx: 0 | 1) => {
    const fouls = stats.fouls[teamIdx] || 0;
    const yellows = stats.yellowCards[teamIdx] || 0;
    const reds = stats.redCards[teamIdx] || 0;

    let score = 96;
    score -= Math.max(0, fouls - 6) * 2.2;
    score -= yellows * 9;
    score -= reds * 28;

    return Math.max(15, Math.min(98, Math.round(score)));
  };

  const homeDiscipline = calcDiscipline(0);
  const awayDiscipline = calcDiscipline(1);

  // --- 4. CRIAÇÃO (Possession, Passes, Accuracy, Corners, Big Chances) ---
  const calcCreation = (teamIdx: 0 | 1) => {
    const poss = stats.possession[teamIdx] || 50;
    const passes = stats.passesTotal[teamIdx] || 400;
    const acc = stats.passAccuracy[teamIdx] || 80;
    const corners = stats.corners[teamIdx] || 4;
    const chances = stats.bigChances[teamIdx] || 2;

    const possPts = (poss / 100) * 32;
    const accPts = Math.max(0, (acc - 55) / 40) * 28;
    const passVolPts = Math.min(22, (passes / 550) * 22);
    const cornerPts = Math.min(10, (corners / 8) * 10);
    const chancePts = Math.min(8, (chances / 3) * 8);

    const total = Math.round(possPts + accPts + passVolPts + cornerPts + chancePts);
    return Math.max(20, Math.min(98, total));
  };

  const homeCreation = calcCreation(0);
  const awayCreation = calcCreation(1);

  const getLeader = (h: number, a: number): 'home' | 'away' | 'draw' => {
    if (Math.abs(h - a) < 2) return 'draw';
    return h > a ? 'home' : 'away';
  };

  const core: CompetencyData[] = [
    {
      key: 'attack',
      subject: 'Ataque',
      home: homeAttack,
      away: awayAttack,
      fullMark: 100,
      homeRaw: `${match.homeScore} gols • ${stats.xG[0].toFixed(2)} xG • ${stats.shotsOnTarget[0]}/${stats.shotsTotal[0]} no alvo`,
      awayRaw: `${match.awayScore} gols • ${stats.xG[1].toFixed(2)} xG • ${stats.shotsOnTarget[1]}/${stats.shotsTotal[1]} no alvo`,
      description: 'Volume ofensivo, finalizações no alvo, gols esperados (xG) e chances claras criadas.',
      iconName: 'attack',
      leader: getLeader(homeAttack, awayAttack),
    },
    {
      key: 'defense',
      subject: 'Defesa',
      home: homeDefense,
      away: awayDefense,
      fullMark: 100,
      homeRaw: `${stats.goalkeeperSaves[0]} defesas • ${match.awayScore} gols sofridos (${stats.xG[1].toFixed(2)} xG adversário)`,
      awayRaw: `${stats.goalkeeperSaves[1]} defesas • ${match.homeScore} gols sofridos (${stats.xG[0].toFixed(2)} xG adversário)`,
      description: 'Solidez defensiva, intervenções do goleiro, gols sofridos e contenção do xG rival.',
      iconName: 'defense',
      leader: getLeader(homeDefense, awayDefense),
    },
    {
      key: 'discipline',
      subject: 'Disciplina',
      home: homeDiscipline,
      away: awayDiscipline,
      fullMark: 100,
      homeRaw: `${stats.fouls[0]} faltas • ${stats.yellowCards[0]} amarelo(s) • ${stats.redCards[0]} vermelho(s)`,
      awayRaw: `${stats.fouls[1]} faltas • ${stats.yellowCards[1]} amarelo(s) • ${stats.redCards[1]} vermelho(s)`,
      description: 'Índice de Fair Play baseado no controle de faltas, ausência de cartões amarelos e expulsões.',
      iconName: 'discipline',
      leader: getLeader(homeDiscipline, awayDiscipline),
    },
    {
      key: 'creation',
      subject: 'Criação',
      home: homeCreation,
      away: awayCreation,
      fullMark: 100,
      homeRaw: `${stats.possession[0]}% posse • ${stats.passesTotal[0]} passes (${stats.passAccuracy[0]}%) • ${stats.corners[0]} escanteios`,
      awayRaw: `${stats.possession[1]}% posse • ${stats.passesTotal[1]} passes (${stats.passAccuracy[1]}%) • ${stats.corners[1]} escanteios`,
      description: 'Articulação de jogadas, distribuição e precisão de passes, posse construtiva e escanteios.',
      iconName: 'creation',
      leader: getLeader(homeCreation, awayCreation),
    },
  ];

  if (mode === 'expanded6') {
    // 5. Posse Pura
    const hPoss = stats.possession[0];
    const aPoss = stats.possession[1];
    core.push({
      key: 'possession',
      subject: 'Posse',
      home: hPoss,
      away: aPoss,
      fullMark: 100,
      homeRaw: `${hPoss}% posse de bola`,
      awayRaw: `${aPoss}% posse de bola`,
      description: 'Percentual de retenção e tempo de posse de bola na partida.',
      iconName: 'possession',
      leader: getLeader(hPoss, aPoss),
    });

    // 6. Eficiência
    const calcEff = (goals: number, xg: number, shots: number) => {
      const conversion = shots > 0 ? (goals / shots) * 100 : 0;
      const xgPerf = xg > 0 ? (goals / xg) * 50 : 50;
      return Math.max(20, Math.min(98, Math.round(conversion * 2 + xgPerf)));
    };
    const hEff = calcEff(match.homeScore, stats.xG[0], stats.shotsTotal[0]);
    const aEff = calcEff(match.awayScore, stats.xG[1], stats.shotsTotal[1]);

    core.push({
      key: 'efficiency',
      subject: 'Eficiência',
      home: hEff,
      away: aEff,
      fullMark: 100,
      homeRaw: `${match.homeScore} gols em ${stats.xG[0].toFixed(2)} xG (${stats.shotsTotal[0]} finalizações)`,
      awayRaw: `${match.awayScore} gols em ${stats.xG[1].toFixed(2)} xG (${stats.shotsTotal[1]} finalizações)`,
      description: 'Capacidade de transformar finalizações e chances criadas em gols reais na súmula.',
      iconName: 'efficiency',
      leader: getLeader(hEff, aEff),
    });
  }

  return core;
}

export const TeamRadarChart: React.FC<TeamRadarChartProps> = ({
  match,
  className = '',
  compact = false,
}) => {
  const [mode, setMode] = useState<'core4' | 'expanded6'>('core4');
  const [filterTeam, setFilterTeam] = useState<'both' | 'home' | 'away'>('both');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const competencies = useMemo(() => {
    return calculateCompetencies(match, mode);
  }, [match, mode]);

  // Overall competency averages
  const homeAvg = useMemo(() => {
    const sum = competencies.reduce((acc, c) => acc + c.home, 0);
    return Math.round(sum / competencies.length);
  }, [competencies]);

  const awayAvg = useMemo(() => {
    const sum = competencies.reduce((acc, c) => acc + c.away, 0);
    return Math.round(sum / competencies.length);
  }, [competencies]);

  const handleModeChange = (newMode: 'core4' | 'expanded6') => {
    soundFx.playTap();
    setMode(newMode);
  };

  const handleTeamFilter = (f: 'both' | 'home' | 'away') => {
    soundFx.playTap();
    setFilterTeam(f);
  };

  return (
    <div className={`bg-[#0b0c0d] border border-white/10 p-3.5 sm:p-5 font-mono space-y-4 shadow-xl ${className}`}>
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#00ff88]/15 border border-[#00ff88] text-[#00ff88] flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Syne'] font-extrabold text-sm sm:text-base uppercase text-white tracking-tight flex items-center gap-1.5">
                <span>Radar de Competências Táticas</span>
              </h3>
              <span className="text-[9px] bg-[#00ff88] text-[#0b0c0d] font-black px-1.5 py-0.2 rounded-xs">
                RECHARTS
              </span>
            </div>
            <p className="text-[11px] text-[#ececed]/60 font-sans mt-0.5">
              Comparativo direto das competências: <strong className="text-white">Ataque</strong>,{' '}
              <strong className="text-white">Defesa</strong>, <strong className="text-white">Disciplina</strong> e{' '}
              <strong className="text-white">Criação</strong>.
            </p>
          </div>
        </div>

        {/* Mode Toggle & Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#141618] border border-white/10 p-1 text-xs">
            <button
              onClick={() => handleModeChange('core4')}
              id="btn-radar-core4"
              className={`px-2.5 py-1 uppercase font-bold text-[10px] sm:text-[11px] transition cursor-pointer ${
                mode === 'core4'
                  ? 'bg-[#00ff88] text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              4 Competências
            </button>
            <button
              onClick={() => handleModeChange('expanded6')}
              id="btn-radar-expanded6"
              className={`px-2.5 py-1 uppercase font-bold text-[10px] sm:text-[11px] transition cursor-pointer ${
                mode === 'expanded6'
                  ? 'bg-[#00ff88] text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              6 Eixos
            </button>
          </div>

          <div className="flex items-center bg-[#141618] border border-white/10 p-1 text-xs">
            <button
              onClick={() => handleTeamFilter('both')}
              className={`px-2 py-1 uppercase font-bold text-[10px] transition cursor-pointer ${
                filterTeam === 'both' ? 'bg-white text-black' : 'text-[#ececed]/60 hover:text-white'
              }`}
            >
              Ambos
            </button>
            <button
              onClick={() => handleTeamFilter('home')}
              className={`px-2 py-1 uppercase font-bold text-[10px] transition cursor-pointer ${
                filterTeam === 'home'
                  ? 'bg-[#00ff88] text-[#0b0c0d]'
                  : 'text-[#00ff88]/80 hover:text-[#00ff88]'
              }`}
            >
              {match.homeTeam.shortName}
            </button>
            <button
              onClick={() => handleTeamFilter('away')}
              className={`px-2 py-1 uppercase font-bold text-[10px] transition cursor-pointer ${
                filterTeam === 'away'
                  ? 'bg-[#38bdf8] text-[#0b0c0d]'
                  : 'text-[#38bdf8]/80 hover:text-[#38bdf8]'
              }`}
            >
              {match.awayTeam.shortName}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Score Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="bg-[#141618] border border-white/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/50 uppercase">Média Geral ({match.homeTeam.shortName})</span>
            <span className="w-2.5 h-2.5 bg-[#00ff88]"></span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#00ff88] font-['Syne'] mt-1">
            {homeAvg} <span className="text-xs text-white/40 font-mono font-normal">/ 100</span>
          </div>
          <div className="text-[10px] text-white/60 truncate">{match.homeTeam.name}</div>
        </div>

        <div className="bg-[#141618] border border-white/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/50 uppercase">Média Geral ({match.awayTeam.shortName})</span>
            <span className="w-2.5 h-2.5 bg-[#38bdf8]"></span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#38bdf8] font-['Syne'] mt-1">
            {awayAvg} <span className="text-xs text-white/40 font-mono font-normal">/ 100</span>
          </div>
          <div className="text-[10px] text-white/60 truncate">{match.awayTeam.name}</div>
        </div>

        <div className="bg-[#141618] border border-white/10 p-3 col-span-2 sm:col-span-1">
          <div className="text-[10px] text-white/50 uppercase">Vantagem Tática Geral</div>
          <div className="text-base sm:text-lg font-black font-['Syne'] mt-1 flex items-center gap-1.5">
            {homeAvg > awayAvg ? (
              <span className="text-[#00ff88]">★ {match.homeTeam.shortName} (+{homeAvg - awayAvg} pts)</span>
            ) : awayAvg > homeAvg ? (
              <span className="text-[#38bdf8]">★ {match.awayTeam.shortName} (+{awayAvg - homeAvg} pts)</span>
            ) : (
              <span className="text-white">Equilíbrio Tático</span>
            )}
          </div>
          <div className="text-[10px] text-white/60">
            Baseado no equilíbrio das competências analisadas
          </div>
        </div>
      </div>

      {/* Main Recharts Radar Container */}
      <div className="w-full h-[280px] sm:h-[350px] relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={competencies}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: '#ececed',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#ffffff35"
              tick={{ fill: '#ececed60', fontSize: 9, fontFamily: 'monospace' }}
            />
            <Tooltip
              content={<CustomRadarTooltip homeTeam={match.homeTeam} awayTeam={match.awayTeam} />}
            />

            {(filterTeam === 'both' || filterTeam === 'home') && (
              <Radar
                name={match.homeTeam.name}
                dataKey="home"
                stroke="#00ff88"
                fill="#00ff88"
                fillOpacity={filterTeam === 'home' ? 0.6 : 0.42}
                strokeWidth={2.5}
                isAnimationActive={true}
              />
            )}

            {(filterTeam === 'both' || filterTeam === 'away') && (
              <Radar
                name={match.awayTeam.name}
                dataKey="away"
                stroke="#38bdf8"
                fill="#38bdf8"
                fillOpacity={filterTeam === 'away' ? 0.6 : 0.32}
                strokeWidth={2.5}
                isAnimationActive={true}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Competencies Progress Breakdown Cards */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-white/70">
          <span className="label text-[#00ff88] font-bold text-[10px] uppercase">
            [DETALHAMENTO DAS COMPETÊNCIAS OFICIAIS]
          </span>
          <span className="text-[10px] text-white/40">Clique em qualquer card para inspecionar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {competencies.map((c) => {
            const isSelected = selectedKey === c.key;
            return (
              <div
                key={c.key}
                onClick={() => {
                  soundFx.playTap();
                  setSelectedKey(isSelected ? null : c.key);
                }}
                className={`p-3 border transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#141618] border-[#00ff88] ring-1 ring-[#00ff88]/40'
                    : 'bg-[#0f1113] border-white/10 hover:border-white/25 hover:bg-[#141618]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-['Syne'] font-extrabold uppercase text-white">
                      {c.subject}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 font-mono font-bold uppercase rounded-xs ${
                        c.leader === 'home'
                          ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40'
                          : c.leader === 'away'
                          ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {c.leader === 'home'
                        ? `Líder: ${match.homeTeam.shortName}`
                        : c.leader === 'away'
                        ? `Líder: ${match.awayTeam.shortName}`
                        : 'Equilíbrio'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold font-mono">
                    <span className="text-[#00ff88]">{c.home}</span>
                    <span className="text-white/30">x</span>
                    <span className="text-[#38bdf8]">{c.away}</span>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="space-y-1 my-2">
                  <div className="h-1.5 w-full bg-[#0b0c0d] overflow-hidden flex">
                    <div
                      className="bg-[#00ff88] transition-all duration-500"
                      style={{ width: `${c.home}%` }}
                    />
                  </div>
                  <div className="h-1.5 w-full bg-[#0b0c0d] overflow-hidden flex">
                    <div
                      className="bg-[#38bdf8] transition-all duration-500"
                      style={{ width: `${c.away}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-[#ececed]/65 font-sans leading-relaxed">
                  {c.description}
                </p>

                {/* Expanded Raw Stats */}
                <div className="mt-2 pt-2 border-t border-white/5 space-y-1 text-[10px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00ff88] truncate">{match.homeTeam.shortName}:</span>
                    <span className="text-white/90 text-right truncate pl-2">{c.homeRaw}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#38bdf8] truncate">{match.awayTeam.shortName}:</span>
                    <span className="text-white/90 text-right truncate pl-2">{c.awayRaw}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Custom Tooltip for Recharts Radar
function CustomRadarTooltip({ active, payload, homeTeam, awayTeam }: any) {
  if (!active || !payload || !payload.length) return null;
  const data: CompetencyData = payload[0].payload;

  return (
    <div className="bg-[#0b0c0d]/95 backdrop-blur-md border border-white/20 p-3 shadow-2xl font-mono text-xs max-w-[270px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <span className="font-['Syne'] font-extrabold text-sm uppercase text-white">
          {data.subject}
        </span>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.2 uppercase ${
            data.leader === 'home'
              ? 'bg-[#00ff88] text-black'
              : data.leader === 'away'
              ? 'bg-[#38bdf8] text-black'
              : 'bg-white/20 text-white'
          }`}
        >
          {data.leader === 'home'
            ? homeTeam.shortName
            : data.leader === 'away'
            ? awayTeam.shortName
            : 'Empate'}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[#00ff88] font-bold">{homeTeam.name}:</span>
          <span className="font-extrabold text-white">{data.home} / 100</span>
        </div>
        <div className="text-[10px] text-white/60 truncate pb-1 border-b border-white/5">
          {data.homeRaw}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[#38bdf8] font-bold">{awayTeam.name}:</span>
          <span className="font-extrabold text-white">{data.away} / 100</span>
        </div>
        <div className="text-[10px] text-white/60 truncate pb-1">
          {data.awayRaw}
        </div>

        <p className="text-[10px] text-white/50 font-sans pt-1.5 border-t border-white/10 leading-tight">
          {data.description}
        </p>
      </div>
    </div>
  );
}
