import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
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
  TrendingUp,
  Maximize2,
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export type RadarMode = 'metrics4' | 'tactical4' | 'expanded6' | 'core4';

export interface TeamRadarChartProps {
  match: Match;
  className?: string;
  compact?: boolean;
  initialMode?: 'metrics4' | 'tactical4' | 'expanded6';
  onExpand?: () => void;
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
  iconName: 'possession' | 'shots' | 'passes' | 'attacks' | 'attack' | 'defense' | 'discipline' | 'creation' | 'efficiency';
  leader: 'home' | 'away' | 'draw';
}

/**
 * Calculates normalized (0 - 100) scores for the Radar Chart using real match statistics.
 *
 * Supported modes:
 * 1. 'metrics4' (DEFAULT): Posse de Bola, Chutes, Passes, Ataques Perigosos.
 * 2. 'tactical4' (or 'core4'): Ataque, Defesa, Disciplina, Criação.
 * 3. 'expanded6': Posse, Chutes, Passes, Ataques Perigosos, Defesa, Disciplina.
 */
export function calculateCompetencies(
  match: Match,
  mode: RadarMode = 'metrics4'
): CompetencyData[] {
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

  const getLeader = (h: number, a: number): 'home' | 'away' | 'draw' => {
    if (Math.abs(h - a) < 2) return 'draw';
    return h > a ? 'home' : 'away';
  };

  const isScheduled = match.status === 'SCHEDULED' && (!match.events || match.events.length === 0);

  // Scheduled match projection baseline
  if (isScheduled) {
    const seedH = (match.homeTeam.name.length * 7) % 18;
    const seedA = (match.awayTeam.name.length * 11) % 18;

    if (mode === 'tactical4' || mode === 'core4') {
      const hAtk = 72 + seedH;
      const aAtk = 70 + seedA;
      const hDef = 76 - (seedH % 8);
      const aDef = 74 - (seedA % 8);
      const hDisc = 88;
      const aDisc = 85;
      const hCri = 75 + (seedH % 10);
      const aCri = 73 + (seedA % 10);

      return [
        {
          key: 'attack',
          subject: 'Ataque',
          home: hAtk,
          away: aAtk,
          fullMark: 100,
          homeRaw: 'Projeção de volume ofensivo',
          awayRaw: 'Projeção de volume ofensivo',
          description: 'Poder de fogo ofensivo, finalizações e capacidade de infiltração no terço final.',
          iconName: 'attack',
          leader: getLeader(hAtk, aAtk),
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
          leader: getLeader(hDef, aDef),
        },
        {
          key: 'discipline',
          subject: 'Disciplina',
          home: hDisc,
          away: aDisc,
          fullMark: 100,
          homeRaw: 'Fair play 100% projetado',
          awayRaw: 'Fair play 100% projetado',
          description: 'Controle tático e temperamental: ausência de advertências graves.',
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
          description: 'Capacidade de criação, circulação de bola e inversões de jogo.',
          iconName: 'creation',
          leader: getLeader(hCri, aCri),
        },
      ];
    }

    // Default 4 metrics projected
    const hPoss = 52 + (seedH % 8);
    const aPoss = 100 - hPoss;
    const hShots = 74 + (seedH % 14);
    const aShots = 70 + (seedA % 14);
    const hPass = 78 + (seedH % 10);
    const aPass = 75 + (seedA % 10);
    const hDanger = 72 + (seedH % 12);
    const aDanger = 68 + (seedA % 12);

    return [
      {
        key: 'possession',
        subject: 'Posse de Bola',
        home: hPoss,
        away: aPoss,
        fullMark: 100,
        homeRaw: `${hPoss}% posse projetada`,
        awayRaw: `${aPoss}% posse projetada`,
        description: 'Percentual de retenção e tempo de posse de bola projetado para a partida.',
        iconName: 'possession',
        leader: getLeader(hPoss, aPoss),
      },
      {
        key: 'shots',
        subject: 'Chutes',
        home: hShots,
        away: aShots,
        fullMark: 100,
        homeRaw: '13 chutes médios (5 no alvo)',
        awayRaw: '11 chutes médios (4 no alvo)',
        description: 'Volume total de arremates e pontaria direcionada ao gol adversário.',
        iconName: 'shots',
        leader: getLeader(hShots, aShots),
      },
      {
        key: 'passes',
        subject: 'Passes',
        home: hPass,
        away: aPass,
        fullMark: 100,
        homeRaw: '480 passes (84% acerto)',
        awayRaw: '420 passes (81% acerto)',
        description: 'Circulação da bola, volume de passes trocados e índice de acerto na distribuição.',
        iconName: 'passes',
        leader: getLeader(hPass, aPass),
      },
      {
        key: 'dangerous_attacks',
        subject: 'Ataques Perigosos',
        home: hDanger,
        away: aDanger,
        fullMark: 100,
        homeRaw: 'Projeção de 2.5 grandes chances e 5 escanteios',
        awayRaw: 'Projeção de 2.0 grandes chances e 4 escanteios',
        description: 'Ataques agudos no terço final, chances claras criadas, escanteios e pressão ofensiva.',
        iconName: 'attacks',
        leader: getLeader(hDanger, aDanger),
      },
    ];
  }

  // Real In-Game or Finished Calculations

  // 1. POSSE DE BOLA
  const hPoss = stats.possession[0] || 50;
  const aPoss = stats.possession[1] || 50;

  // 2. CHUTES (Volume total e pontaria no alvo)
  const calcShots = (idx: 0 | 1) => {
    const total = stats.shotsTotal[idx] || 0;
    const onTarget = stats.shotsOnTarget[idx] || 0;
    const goals = idx === 0 ? match.homeScore : match.awayScore;

    // Volume contribution (up to 45 pts based on 16 shots benchmark)
    const volPts = Math.min(45, (total / 16) * 45);
    // Accuracy contribution (up to 35 pts based on target ratio)
    const accuracyRatio = total > 0 ? onTarget / total : 0;
    const accPts = Math.min(35, accuracyRatio * 45);
    // Goals & on-target bonus (up to 20 pts)
    const targetBonus = Math.min(20, (onTarget / 6) * 15 + goals * 3);

    const score = Math.round(volPts + accPts + targetBonus);
    return Math.max(15, Math.min(98, score));
  };
  const hShots = calcShots(0);
  const aShots = calcShots(1);

  // 3. PASSES (Volume de passes e precisão percentual)
  const calcPasses = (idx: 0 | 1) => {
    const passes = stats.passesTotal[idx] || 380;
    const acc = stats.passAccuracy[idx] || 78;

    // Accuracy scale (50% to 95% mapped to 0-55 pts)
    const accPts = Math.max(0, Math.min(55, ((acc - 50) / 45) * 55));
    // Volume scale (up to 550 passes mapped to 45 pts)
    const volPts = Math.min(45, (passes / 550) * 45);

    const score = Math.round(accPts + volPts);
    return Math.max(20, Math.min(98, score));
  };
  const hPass = calcPasses(0);
  const aPass = calcPasses(1);

  // 4. ATAQUES PERIGOSOS (xG, grandes chances, escanteios)
  const calcDangerousAttacks = (idx: 0 | 1) => {
    const xg = stats.xG[idx] || 0;
    const bigChances = stats.bigChances[idx] || 0;
    const corners = stats.corners[idx] || 0;
    const goals = idx === 0 ? match.homeScore : match.awayScore;

    const xgPts = Math.min(40, (xg / 2.2) * 40);
    const chancePts = Math.min(35, (bigChances / 3) * 35);
    const cornerPts = Math.min(15, (corners / 8) * 15);
    const goalBonus = Math.min(10, goals * 5);

    const score = Math.round(xgPts + chancePts + cornerPts + goalBonus);
    return Math.max(15, Math.min(98, score));
  };
  const hDangerous = calcDangerousAttacks(0);
  const aDangerous = calcDangerousAttacks(1);

  // Tactical / Core 4 competencies
  const calcAttack = (idx: 0 | 1) => {
    const goals = idx === 0 ? match.homeScore : match.awayScore;
    const sot = stats.shotsOnTarget[idx] || 0;
    const shots = stats.shotsTotal[idx] || 0;
    const xg = stats.xG[idx] || 0;
    const bigChances = stats.bigChances[idx] || 0;

    const goalScore = Math.min(30, goals * 12);
    const sotScore = Math.min(25, (sot / 7) * 25);
    const xgScore = Math.min(25, (xg / 2.2) * 25);
    const shotVolume = Math.min(12, (shots / 16) * 12);
    const chanceScore = Math.min(8, (bigChances / 3) * 8);

    const total = Math.round(goalScore + sotScore + xgScore + shotVolume + chanceScore);
    return Math.max(18, Math.min(98, total));
  };

  const calcDefense = (idx: 0 | 1) => {
    const oppIdx: 0 | 1 = idx === 0 ? 1 : 0;
    const goalsConceded = idx === 0 ? match.awayScore : match.homeScore;
    const saves = stats.goalkeeperSaves[idx] || 0;
    const xgConceded = stats.xG[oppIdx] || 0;

    const cleanSheetPts = Math.max(0, 35 - goalsConceded * 12);
    const savePts = Math.min(30, (saves / 5) * 30);
    const xgContainPts = Math.max(5, Math.min(35, (1 - xgConceded / 2.8) * 35));

    const total = Math.round(cleanSheetPts + savePts + xgContainPts);
    return Math.max(20, Math.min(98, total));
  };

  const calcDiscipline = (idx: 0 | 1) => {
    const fouls = stats.fouls[idx] || 0;
    const yellows = stats.yellowCards[idx] || 0;
    const reds = stats.redCards[idx] || 0;

    let score = 96;
    score -= Math.max(0, fouls - 6) * 2.2;
    score -= yellows * 9;
    score -= reds * 28;

    return Math.max(15, Math.min(98, Math.round(score)));
  };

  const calcCreation = (idx: 0 | 1) => {
    const poss = stats.possession[idx] || 50;
    const passes = stats.passesTotal[idx] || 400;
    const acc = stats.passAccuracy[idx] || 80;
    const corners = stats.corners[idx] || 4;
    const chances = stats.bigChances[idx] || 2;

    const possPts = (poss / 100) * 32;
    const accPts = Math.max(0, (acc - 55) / 40) * 28;
    const passVolPts = Math.min(22, (passes / 550) * 22);
    const cornerPts = Math.min(10, (corners / 8) * 10);
    const chancePts = Math.min(8, (chances / 3) * 8);

    const total = Math.round(possPts + accPts + passVolPts + cornerPts + chancePts);
    return Math.max(20, Math.min(98, total));
  };

  if (mode === 'tactical4' || mode === 'core4') {
    const hAtk = calcAttack(0);
    const aAtk = calcAttack(1);
    const hDef = calcDefense(0);
    const aDef = calcDefense(1);
    const hDisc = calcDiscipline(0);
    const aDisc = calcDiscipline(1);
    const hCri = calcCreation(0);
    const aCri = calcCreation(1);

    return [
      {
        key: 'attack',
        subject: 'Ataque',
        home: hAtk,
        away: aAtk,
        fullMark: 100,
        homeRaw: `${match.homeScore} gols • ${stats.xG[0].toFixed(2)} xG • ${stats.shotsOnTarget[0]}/${stats.shotsTotal[0]} no alvo`,
        awayRaw: `${match.awayScore} gols • ${stats.xG[1].toFixed(2)} xG • ${stats.shotsOnTarget[1]}/${stats.shotsTotal[1]} no alvo`,
        description: 'Volume ofensivo, finalizações no alvo, gols esperados (xG) e chances claras criadas.',
        iconName: 'attack',
        leader: getLeader(hAtk, aAtk),
      },
      {
        key: 'defense',
        subject: 'Defesa',
        home: hDef,
        away: aDef,
        fullMark: 100,
        homeRaw: `${stats.goalkeeperSaves[0]} defesas • ${match.awayScore} gols sofridos (${stats.xG[1].toFixed(2)} xG adversário)`,
        awayRaw: `${stats.goalkeeperSaves[1]} defesas • ${match.homeScore} gols sofridos (${stats.xG[0].toFixed(2)} xG adversário)`,
        description: 'Solidez defensiva, defesas do goleiro e contenção do xG rival.',
        iconName: 'defense',
        leader: getLeader(hDef, aDef),
      },
      {
        key: 'discipline',
        subject: 'Disciplina',
        home: hDisc,
        away: aDisc,
        fullMark: 100,
        homeRaw: `${stats.fouls[0]} faltas • ${stats.yellowCards[0]} amarelo(s) • ${stats.redCards[0]} vermelho(s)`,
        awayRaw: `${stats.fouls[1]} faltas • ${stats.yellowCards[1]} amarelo(s) • ${stats.redCards[1]} vermelho(s)`,
        description: 'Índice de Fair Play baseado no controle de faltas, ausência de cartões amarelos e vermelhos.',
        iconName: 'discipline',
        leader: getLeader(hDisc, aDisc),
      },
      {
        key: 'creation',
        subject: 'Criação',
        home: hCri,
        away: aCri,
        fullMark: 100,
        homeRaw: `${stats.possession[0]}% posse • ${stats.passesTotal[0]} passes (${stats.passAccuracy[0]}%)`,
        awayRaw: `${stats.possession[1]}% posse • ${stats.passesTotal[1]} passes (${stats.passAccuracy[1]}%)`,
        description: 'Articulação de jogadas, distribuição e precisão de passes, posse construtiva e escanteios.',
        iconName: 'creation',
        leader: getLeader(hCri, aCri),
      },
    ];
  }

  // 4 Primary Requested Metrics: Posse de bola, Chutes, Passes, Ataques perigosos
  const metrics4: CompetencyData[] = [
    {
      key: 'possession',
      subject: 'Posse de Bola',
      home: hPoss,
      away: aPoss,
      fullMark: 100,
      homeRaw: `${hPoss}% posse de bola`,
      awayRaw: `${aPoss}% posse de bola`,
      description: 'Percentual de retenção e tempo de posse de bola sob domínio ao longo da partida.',
      iconName: 'possession',
      leader: getLeader(hPoss, aPoss),
    },
    {
      key: 'shots',
      subject: 'Chutes',
      home: hShots,
      away: aShots,
      fullMark: 100,
      homeRaw: `${stats.shotsTotal[0]} finalizações (${stats.shotsOnTarget[0]} no alvo)`,
      awayRaw: `${stats.shotsTotal[1]} finalizações (${stats.shotsOnTarget[1]} no alvo)`,
      description: 'Volume total de finalizações executadas e pontaria com arremates na direção do gol.',
      iconName: 'shots',
      leader: getLeader(hShots, aShots),
    },
    {
      key: 'passes',
      subject: 'Passes',
      home: hPass,
      away: aPass,
      fullMark: 100,
      homeRaw: `${stats.passesTotal[0]} passes (${stats.passAccuracy[0]}% precisão)`,
      awayRaw: `${stats.passesTotal[1]} passes (${stats.passAccuracy[1]}% precisão)`,
      description: 'Circulação da bola, volume de passes trocados e índice de acerto na distribuição.',
      iconName: 'passes',
      leader: getLeader(hPass, aPass),
    },
    {
      key: 'dangerous_attacks',
      subject: 'Ataques Perigosos',
      home: hDangerous,
      away: aDangerous,
      fullMark: 100,
      homeRaw: `${stats.bigChances[0]} grandes chances • ${stats.xG[0].toFixed(2)} xG • ${stats.corners[0]} escanteios`,
      awayRaw: `${stats.bigChances[1]} grandes chances • ${stats.xG[1].toFixed(2)} xG • ${stats.corners[1]} escanteios`,
      description: 'Ataques no terço final que resultaram em grandes chances criadas, escanteios e ameaça real (xG).',
      iconName: 'attacks',
      leader: getLeader(hDangerous, aDangerous),
    },
  ];

  if (mode === 'expanded6') {
    const hDef = calcDefense(0);
    const aDef = calcDefense(1);
    const hDisc = calcDiscipline(0);
    const aDisc = calcDiscipline(1);

    metrics4.push(
      {
        key: 'defense',
        subject: 'Defesa',
        home: hDef,
        away: aDef,
        fullMark: 100,
        homeRaw: `${stats.goalkeeperSaves[0]} defesas • ${match.awayScore} sofridos`,
        awayRaw: `${stats.goalkeeperSaves[1]} defesas • ${match.homeScore} sofridos`,
        description: 'Solidez defensiva, defesas do goleiro e contenção do ataque rival.',
        iconName: 'defense',
        leader: getLeader(hDef, aDef),
      },
      {
        key: 'discipline',
        subject: 'Disciplina',
        home: hDisc,
        away: aDisc,
        fullMark: 100,
        homeRaw: `${stats.fouls[0]} faltas • ${stats.yellowCards[0]} amarelo(s)`,
        awayRaw: `${stats.fouls[1]} faltas • ${stats.yellowCards[1]} amarelo(s)`,
        description: 'Índice de Fair Play baseado no controle disciplinar e ausência de cartões.',
        iconName: 'discipline',
        leader: getLeader(hDisc, aDisc),
      }
    );
  }

  return metrics4;
}

export const TeamRadarChart: React.FC<TeamRadarChartProps> = ({
  match,
  className = '',
  compact = false,
  initialMode = 'metrics4',
  onExpand,
}) => {
  const [mode, setMode] = useState<RadarMode>(initialMode);
  const [filterTeam, setFilterTeam] = useState<'both' | 'home' | 'away'>('both');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const competencies = useMemo(() => {
    return calculateCompetencies(match, mode);
  }, [match, mode]);

  // Overall averages
  const homeAvg = useMemo(() => {
    const sum = competencies.reduce((acc, c) => acc + c.home, 0);
    return Math.round(sum / competencies.length);
  }, [competencies]);

  const awayAvg = useMemo(() => {
    const sum = competencies.reduce((acc, c) => acc + c.away, 0);
    return Math.round(sum / competencies.length);
  }, [competencies]);

  const handleModeChange = (newMode: RadarMode) => {
    soundFx.playTap();
    setMode(newMode);
  };

  const handleTeamFilter = (f: 'both' | 'home' | 'away') => {
    soundFx.playTap();
    setFilterTeam(f);
  };

  // COMPACT VIEW (optimized for embedding inside Stats tab)
  if (compact) {
    return (
      <div className={`bg-[#0b0c0d] border border-white/10 p-3 sm:p-4 font-mono shadow-xl space-y-3 ${className}`}>
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00ff88]/15 border border-[#00ff88] text-[#00ff88] flex items-center justify-center shrink-0">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-['Syne'] font-extrabold text-xs sm:text-sm uppercase text-white tracking-tight">
                  Radar Comparativo dos Times
                </h4>
                <span className="text-[9px] bg-[#00ff88] text-[#0b0c0d] font-black px-1.5 py-0.2 rounded-xs">
                  RECHARTS
                </span>
              </div>
              <p className="text-[10px] text-[#ececed]/60 font-sans mt-0.5">
                Posse de bola • Chutes • Passes • Ataques perigosos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {/* Quick Mode Toggle */}
            <div className="flex items-center bg-[#141618] border border-white/10 p-0.5 text-[10px]">
              <button
                onClick={() => handleModeChange('metrics4')}
                className={`px-2 py-0.5 uppercase font-bold transition cursor-pointer ${
                  mode === 'metrics4' ? 'bg-[#00ff88] text-[#0b0c0d]' : 'text-white/60 hover:text-white'
                }`}
                title="Métricas: Posse, Chutes, Passes, Ataques Perigosos"
              >
                Métricas (4)
              </button>
              <button
                onClick={() => handleModeChange('tactical4')}
                className={`px-2 py-0.5 uppercase font-bold transition cursor-pointer ${
                  mode === 'tactical4' || mode === 'core4'
                    ? 'bg-[#00ff88] text-[#0b0c0d]'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Competências: Ataque, Defesa, Disciplina, Criação"
              >
                Táticas
              </button>
            </div>

            {onExpand && (
              <button
                onClick={() => {
                  soundFx.playTap();
                  onExpand();
                }}
                className="px-2 py-1 bg-[#141618] border border-white/10 hover:border-[#00ff88] text-white hover:text-[#00ff88] text-[10px] uppercase font-bold transition cursor-pointer flex items-center gap-1"
                title="Expandir para a aba completa de Radar com detalhamento estatístico"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Expandir</span>
              </button>
            )}
          </div>
        </div>

        {/* Team Legend Bar */}
        <div className="flex items-center justify-between text-[11px] px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00ff88]"></span>
            <span className="font-bold text-[#00ff88] truncate">{match.homeTeam.name}</span>
            <span className="text-white/50 font-normal">({homeAvg} pts)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/50 font-normal">({awayAvg} pts)</span>
            <span className="font-bold text-[#38bdf8] truncate">{match.awayTeam.name}</span>
            <span className="w-2.5 h-2.5 bg-[#38bdf8]"></span>
          </div>
        </div>

        {/* Compact Radar Chart Canvas */}
        <div className="w-full h-[240px] sm:h-[270px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={competencies}>
              <PolarGrid stroke="#ffffff18" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: '#ececed',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                stroke="#ffffff25"
                tick={{ fill: '#ececed50', fontSize: 8, fontFamily: 'monospace' }}
              />
              <Tooltip
                content={<CustomRadarTooltip homeTeam={match.homeTeam} awayTeam={match.awayTeam} />}
              />
              <Radar
                name={match.homeTeam.name}
                dataKey="home"
                stroke="#00ff88"
                fill="#00ff88"
                fillOpacity={0.4}
                strokeWidth={2}
                isAnimationActive={true}
              />
              <Radar
                name={match.awayTeam.name}
                dataKey="away"
                stroke="#38bdf8"
                fill="#38bdf8"
                fillOpacity={0.32}
                strokeWidth={2}
                isAnimationActive={true}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 4 Metric Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-white/10 text-[10px]">
          {competencies.map((c) => (
            <div
              key={c.key}
              className="bg-[#141618] border border-white/10 p-2 space-y-1 hover:border-white/25 transition"
            >
              <div className="flex items-center justify-between font-bold">
                <span className="text-white truncate">{c.subject}</span>
                <span
                  className={`text-[8px] px-1 py-0.2 rounded-xs uppercase ${
                    c.leader === 'home'
                      ? 'bg-[#00ff88]/20 text-[#00ff88]'
                      : c.leader === 'away'
                      ? 'bg-[#38bdf8]/20 text-[#38bdf8]'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {c.leader === 'home'
                    ? match.homeTeam.shortName
                    : c.leader === 'away'
                    ? match.awayTeam.shortName
                    : '='}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-[#00ff88]">{c.home}</span>
                <span className="text-white/30 text-[9px]">x</span>
                <span className="text-[#38bdf8]">{c.away}</span>
              </div>
              <div className="text-[9px] text-white/50 truncate" title={c.homeRaw}>
                {c.homeRaw.split('•')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FULL DEDICATED RADAR VIEW (for the 'radar' tab)
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
                <span>Radar Comparativo dos Times</span>
              </h3>
              <span className="text-[9px] bg-[#00ff88] text-[#0b0c0d] font-black px-1.5 py-0.2 rounded-xs">
                RECHARTS
              </span>
            </div>
            <p className="text-[11px] text-[#ececed]/60 font-sans mt-0.5">
              Comparativo direto: <strong className="text-white">Posse de Bola</strong>,{' '}
              <strong className="text-white">Chutes</strong>, <strong className="text-white">Passes</strong> e{' '}
              <strong className="text-white">Ataques Perigosos</strong>.
            </p>
          </div>
        </div>

        {/* Mode Toggle & Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#141618] border border-white/10 p-1 text-xs">
            <button
              onClick={() => handleModeChange('metrics4')}
              id="btn-radar-metrics4"
              className={`px-2.5 py-1 uppercase font-bold text-[10px] sm:text-[11px] transition cursor-pointer ${
                mode === 'metrics4'
                  ? 'bg-[#00ff88] text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              Métricas (4)
            </button>
            <button
              onClick={() => handleModeChange('tactical4')}
              id="btn-radar-tactical4"
              className={`px-2.5 py-1 uppercase font-bold text-[10px] sm:text-[11px] transition cursor-pointer ${
                mode === 'tactical4' || mode === 'core4'
                  ? 'bg-[#00ff88] text-[#0b0c0d]'
                  : 'text-[#ececed]/70 hover:text-white'
              }`}
            >
              Táticas
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
          <div className="text-[10px] text-white/50 uppercase">Vantagem Geral</div>
          <div className="text-base sm:text-lg font-black font-['Syne'] mt-1 flex items-center gap-1.5">
            {homeAvg > awayAvg ? (
              <span className="text-[#00ff88]">★ {match.homeTeam.shortName} (+{homeAvg - awayAvg} pts)</span>
            ) : awayAvg > homeAvg ? (
              <span className="text-[#38bdf8]">★ {match.awayTeam.shortName} (+{awayAvg - homeAvg} pts)</span>
            ) : (
              <span className="text-white">Equilíbrio nos Eixos</span>
            )}
          </div>
          <div className="text-[10px] text-white/60">
            Comparativo baseado nas métricas selecionadas
          </div>
        </div>
      </div>

      {/* Main Recharts Radar Container */}
      <div className="w-full h-[290px] sm:h-[360px] relative flex items-center justify-center">
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
            [DETALHAMENTO DOS EIXOS COMPARADOS]
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
    <div className="bg-[#0b0c0d]/95 backdrop-blur-md border border-white/20 p-3 shadow-2xl font-mono text-xs max-w-[280px]">
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
