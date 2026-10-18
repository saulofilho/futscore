import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Match, MatchEvent, CoachFormation, CoachMentality, CoachPressure, CoachPassingStyle, CoachPlayer, CoachTacticalState, GoalCelebrationData } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Sparkles, 
  BrainCircuit, 
  Shield, 
  Zap, 
  Users, 
  Flame, 
  ArrowRight, 
  ArrowLeftRight, 
  Activity, 
  AlertCircle, 
  Volume2, 
  Award, 
  MessageSquare, 
  Check, 
  ChevronRight,
  Sliders,
  TrendingUp,
  Gauge
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface CoachSimulationViewProps {
  matches: Match[];
  initialMatchId?: string;
  onUpdateMatchScore?: (matchId: string, homeScore: number, awayScore: number, newEvent?: MatchEvent) => void;
  onTriggerGoalCelebration?: (celebration: GoalCelebrationData) => void;
  onSelectMatchDetails?: (match: Match) => void;
}

// Coordinate formations for pitch rendering (11 starter positions)
const FORMATION_COORDINATES: Record<CoachFormation, Array<{ x: number; y: number; defaultPos: 'GOL' | 'ZAG' | 'LAT' | 'VOL' | 'MEI' | 'ATA' }>> = {
  '4-3-3': [
    { x: 50, y: 88, defaultPos: 'GOL' },
    { x: 15, y: 72, defaultPos: 'LAT' },
    { x: 38, y: 75, defaultPos: 'ZAG' },
    { x: 62, y: 75, defaultPos: 'ZAG' },
    { x: 85, y: 72, defaultPos: 'LAT' },
    { x: 30, y: 52, defaultPos: 'VOL' },
    { x: 50, y: 48, defaultPos: 'MEI' },
    { x: 70, y: 52, defaultPos: 'MEI' },
    { x: 18, y: 24, defaultPos: 'ATA' },
    { x: 50, y: 18, defaultPos: 'ATA' },
    { x: 82, y: 24, defaultPos: 'ATA' },
  ],
  '4-2-3-1': [
    { x: 50, y: 88, defaultPos: 'GOL' },
    { x: 15, y: 72, defaultPos: 'LAT' },
    { x: 38, y: 75, defaultPos: 'ZAG' },
    { x: 62, y: 75, defaultPos: 'ZAG' },
    { x: 85, y: 72, defaultPos: 'LAT' },
    { x: 35, y: 56, defaultPos: 'VOL' },
    { x: 65, y: 56, defaultPos: 'VOL' },
    { x: 20, y: 35, defaultPos: 'MEI' },
    { x: 50, y: 32, defaultPos: 'MEI' },
    { x: 80, y: 35, defaultPos: 'MEI' },
    { x: 50, y: 16, defaultPos: 'ATA' },
  ],
  '4-4-2': [
    { x: 50, y: 88, defaultPos: 'GOL' },
    { x: 15, y: 72, defaultPos: 'LAT' },
    { x: 38, y: 75, defaultPos: 'ZAG' },
    { x: 62, y: 75, defaultPos: 'ZAG' },
    { x: 85, y: 72, defaultPos: 'LAT' },
    { x: 18, y: 48, defaultPos: 'MEI' },
    { x: 40, y: 50, defaultPos: 'VOL' },
    { x: 60, y: 50, defaultPos: 'VOL' },
    { x: 82, y: 48, defaultPos: 'MEI' },
    { x: 38, y: 20, defaultPos: 'ATA' },
    { x: 62, y: 20, defaultPos: 'ATA' },
  ],
  '3-5-2': [
    { x: 50, y: 88, defaultPos: 'GOL' },
    { x: 25, y: 74, defaultPos: 'ZAG' },
    { x: 50, y: 76, defaultPos: 'ZAG' },
    { x: 75, y: 74, defaultPos: 'ZAG' },
    { x: 12, y: 46, defaultPos: 'LAT' },
    { x: 36, y: 52, defaultPos: 'VOL' },
    { x: 50, y: 42, defaultPos: 'MEI' },
    { x: 64, y: 52, defaultPos: 'VOL' },
    { x: 88, y: 46, defaultPos: 'LAT' },
    { x: 38, y: 20, defaultPos: 'ATA' },
    { x: 62, y: 20, defaultPos: 'ATA' },
  ],
  '5-4-1': [
    { x: 50, y: 88, defaultPos: 'GOL' },
    { x: 12, y: 72, defaultPos: 'LAT' },
    { x: 30, y: 76, defaultPos: 'ZAG' },
    { x: 50, y: 78, defaultPos: 'ZAG' },
    { x: 70, y: 76, defaultPos: 'ZAG' },
    { x: 88, y: 72, defaultPos: 'LAT' },
    { x: 22, y: 48, defaultPos: 'MEI' },
    { x: 42, y: 52, defaultPos: 'VOL' },
    { x: 58, y: 52, defaultPos: 'VOL' },
    { x: 78, y: 48, defaultPos: 'MEI' },
    { x: 50, y: 20, defaultPos: 'ATA' },
  ],
  '3-4-3': [
    { x: 50, y: 88, defaultPos: 'GOL' },
    { x: 25, y: 74, defaultPos: 'ZAG' },
    { x: 50, y: 76, defaultPos: 'ZAG' },
    { x: 75, y: 74, defaultPos: 'ZAG' },
    { x: 15, y: 50, defaultPos: 'LAT' },
    { x: 40, y: 52, defaultPos: 'VOL' },
    { x: 60, y: 52, defaultPos: 'VOL' },
    { x: 85, y: 50, defaultPos: 'LAT' },
    { x: 20, y: 22, defaultPos: 'ATA' },
    { x: 50, y: 16, defaultPos: 'ATA' },
    { x: 80, y: 22, defaultPos: 'ATA' },
  ],
};

// Generates initial realistic squad from match lineup or defaults
function generateInitialSquad(teamName: string, isHome: boolean, match?: Match): { starters: CoachPlayer[]; bench: CoachPlayer[] } {
  const lineup = isHome ? match?.lineupHome : match?.lineupAway;
  
  if (lineup && lineup.starters && lineup.starters.length === 11) {
    const starters: CoachPlayer[] = lineup.starters.map((s, idx) => ({
      id: `p-${idx + 1}`,
      name: s.name,
      number: s.number || idx + 1,
      position: (s.position as any) || (idx === 0 ? 'GOL' : idx < 5 ? 'ZAG' : idx < 8 ? 'MEI' : 'ATA'),
      rating: s.rating || 7.2,
      stamina: 88 + Math.floor(Math.random() * 10),
      yellowCards: 0,
      isCaptain: s.captain || idx === 1,
      goals: 0,
      assists: 0,
      formStatus: 'NORMAL',
    }));

    const bench: CoachPlayer[] = (lineup.substitutes || []).slice(0, 8).map((subName, idx) => {
      const cleanName = subName.replace(/\(.*?\)/g, '').trim();
      const pos: 'GOL' | 'ZAG' | 'LAT' | 'VOL' | 'MEI' | 'ATA' = 
        idx === 0 ? 'GOL' : idx < 3 ? 'ZAG' : idx < 6 ? 'MEI' : 'ATA';
      return {
        id: `bench-${idx + 1}`,
        name: cleanName || `Reserva ${idx + 1}`,
        number: 12 + idx,
        position: pos,
        rating: 6.8 + Number((Math.random() * 0.8).toFixed(1)),
        stamina: 100,
        yellowCards: 0,
        goals: 0,
        assists: 0,
        formStatus: 'EM_ALTA',
      };
    });

    return { starters, bench };
  }

  // Fallback realistic squad
  const defaultStartersNames = [
    { name: 'Rossi', num: 1, pos: 'GOL' as const },
    { name: 'Varela', num: 2, pos: 'LAT' as const },
    { name: 'Fabrício Bruno', num: 15, pos: 'ZAG' as const },
    { name: 'Léo Pereira', num: 4, pos: 'ZAG' as const },
    { name: 'Ayrton Lucas', num: 6, pos: 'LAT' as const },
    { name: 'Erick Pulgar', num: 5, pos: 'VOL' as const },
    { name: 'Gerson', num: 8, pos: 'MEI' as const },
    { name: 'De Arrascaeta', num: 14, pos: 'MEI' as const },
    { name: 'Luiz Araújo', num: 7, pos: 'ATA' as const },
    { name: 'Gabigol', num: 99, pos: 'ATA' as const },
    { name: 'Bruno Henrique', num: 27, pos: 'ATA' as const },
  ];

  const defaultBenchNames = [
    { name: 'Matheus Cunha', num: 25, pos: 'GOL' as const },
    { name: 'David Luiz', num: 23, pos: 'ZAG' as const },
    { name: 'Cleiton', num: 33, pos: 'ZAG' as const },
    { name: 'Allan', num: 21, pos: 'VOL' as const },
    { name: 'Alcaraz', num: 37, pos: 'MEI' as const },
    { name: 'Lorran', num: 19, pos: 'MEI' as const },
    { name: 'Carlinhos', num: 22, pos: 'ATA' as const },
    { name: 'Michael', num: 30, pos: 'ATA' as const },
  ];

  return {
    starters: defaultStartersNames.map((p, idx) => ({
      id: `p-${idx + 1}`,
      name: p.name,
      number: p.num,
      position: p.pos,
      rating: 7.3,
      stamina: 92,
      yellowCards: 0,
      isCaptain: idx === 6,
      goals: 0,
      assists: 0,
      formStatus: 'NORMAL',
    })),
    bench: defaultBenchNames.map((p, idx) => ({
      id: `bench-${idx + 1}`,
      name: p.name,
      number: p.num,
      position: p.pos,
      rating: 7.0,
      stamina: 100,
      yellowCards: 0,
      goals: 0,
      assists: 0,
      formStatus: 'EM_ALTA',
    })),
  };
}

export const CoachSimulationView: React.FC<CoachSimulationViewProps> = ({
  matches,
  initialMatchId,
  onUpdateMatchScore,
  onTriggerGoalCelebration,
  onSelectMatchDetails,
}) => {
  // Current match selection
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    initialMatchId || matches[0]?.id || ''
  );
  const currentMatch = matches.find((m) => m.id === selectedMatchId) || matches[0];

  // Coach team assignment
  const [coachSide, setCoachSide] = useState<'home' | 'away'>('home');
  const myTeamName = coachSide === 'home' ? currentMatch?.homeTeam?.name : currentMatch?.awayTeam?.name;
  const oppTeamName = coachSide === 'home' ? currentMatch?.awayTeam?.name : currentMatch?.homeTeam?.name;

  // Tactical parameters
  const [formation, setFormation] = useState<CoachFormation>('4-3-3');
  const [mentality, setMentality] = useState<CoachMentality>('OFENSIVA');
  const [pressure, setPressure] = useState<CoachPressure>('ALTA');
  const [passingStyle, setPassingStyle] = useState<CoachPassingStyle>('CURTO');
  const [activeShout, setActiveShout] = useState<string | null>(null);

  // Match live simulation clock & score
  const [simMinute, setSimMinute] = useState<number>(currentMatch?.minute || 55);
  const [simHomeScore, setSimHomeScore] = useState<number>(currentMatch?.homeTeam?.score || 0);
  const [simAwayScore, setSimAwayScore] = useState<number>(currentMatch?.awayTeam?.score || 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);

  // Squad management
  const [starters, setStarters] = useState<CoachPlayer[]>([]);
  const [bench, setBench] = useState<CoachPlayer[]>([]);
  const [selectedStarterForSub, setSelectedStarterForSub] = useState<CoachPlayer | null>(null);
  const [selectedBenchForSub, setSelectedBenchForSub] = useState<CoachPlayer | null>(null);
  const [substitutionsCount, setSubstitutionsCount] = useState<number>(0);

  // Event feed and tactical logs
  const [feedLogs, setFeedLogs] = useState<Array<{
    id: string;
    minute: number;
    title: string;
    description: string;
    type: 'goal' | 'sub' | 'tactic' | 'card' | 'danger';
    team: 'home' | 'away';
    badge?: string;
  }>>([]);

  // AI Assistant Coach Feedback (Gemini)
  const [assistantAdvice, setAssistantAdvice] = useState<{
    message: string;
    rating: number;
    suggestion: string;
    threat: string;
  } | null>(null);
  const [isConsultingAi, setIsConsultingAi] = useState<boolean>(false);

  // Initialize squad when match or coach side changes
  useEffect(() => {
    if (currentMatch) {
      const initial = generateInitialSquad(myTeamName || '', coachSide === 'home', currentMatch);
      setStarters(initial.starters);
      setBench(initial.bench);
      setSimMinute(currentMatch.minute || (currentMatch.status === 'LIVE' ? 62 : 45));
      setSimHomeScore(currentMatch.homeTeam?.score || 0);
      setSimAwayScore(currentMatch.awayTeam?.score || 0);
      setSubstitutionsCount(0);
      setSelectedStarterForSub(null);
      setSelectedBenchForSub(null);

      // Initial tactical entry log
      setFeedLogs([
        {
          id: `log-init-${Date.now()}`,
          minute: currentMatch.minute || 45,
          title: `Prancheta Tática Ativada`,
          description: `Você assumiu o comando técnico do ${myTeamName} no sistema ${formation} com mentalidade ${mentality}. Suas instruções afetam o rumo da partida em tempo real.`,
          type: 'tactic',
          team: coachSide,
        },
      ]);
    }
  }, [selectedMatchId, coachSide]);

  // Average stamina of active starters
  const averageStamina = useMemo(() => {
    if (starters.length === 0) return 100;
    const sum = starters.reduce((acc, p) => acc + p.stamina, 0);
    return Math.round(sum / starters.length);
  }, [starters]);

  // Dynamic Momentum Score (-100 to +100) based on formation, mentality, stamina, and score
  const momentumScore = useMemo(() => {
    let score = 15; // base home/prepared momentum
    if (mentality === 'ULTRA_OFENSIVA') score += 35;
    else if (mentality === 'OFENSIVA') score += 20;
    else if (mentality === 'CAUTELOSA') score -= 10;
    else if (mentality === 'RETRANCA') score -= 25;

    if (pressure === 'ALTA') score += 15;
    if (averageStamina < 60) score -= 20;
    if (activeShout) score += 10;

    return Math.max(-100, Math.min(100, score));
  }, [mentality, pressure, averageStamina, activeShout]);

  // Execute a tactical substitution
  const handleConfirmSubstitution = () => {
    if (!selectedStarterForSub || !selectedBenchForSub) return;
    if (substitutionsCount >= 5) {
      alert('Limite de 5 substituições atingido.');
      return;
    }

    soundFx.playWhistle();

    // Swap players
    const updatedStarters = starters.map((p) =>
      p.id === selectedStarterForSub.id
        ? {
            ...selectedBenchForSub,
            stamina: 100,
            formStatus: 'EM_ALTA' as const,
          }
        : p
    );

    const updatedBench = bench.filter((b) => b.id !== selectedBenchForSub.id).concat({
      ...selectedStarterForSub,
      formStatus: 'CANSADO' as const,
    });

    setStarters(updatedStarters);
    setBench(updatedBench);
    setSubstitutionsCount((prev) => prev + 1);

    const newEvent: MatchEvent = {
      id: `sub-${Date.now()}`,
      minute: simMinute,
      type: 'sub',
      team: coachSide,
      player: selectedBenchForSub.name,
      subOut: selectedStarterForSub.name,
      detail: `Substituição Tática: Entra ${selectedBenchForSub.name} (#${selectedBenchForSub.number}), sai ${selectedStarterForSub.name} (#${selectedStarterForSub.number}).`,
    };

    setFeedLogs((prev) => [
      {
        id: `log-sub-${Date.now()}`,
        minute: simMinute,
        title: `Substituição no ${myTeamName}`,
        description: `Sai ${selectedStarterForSub.name} (${selectedStarterForSub.position}) e entra ${selectedBenchForSub.name} com fôlego novo no sistema ${formation}!`,
        type: 'sub',
        team: coachSide,
      },
      ...prev,
    ]);

    setSelectedStarterForSub(null);
    setSelectedBenchForSub(null);

    // Also update parent if provided
    if (onUpdateMatchScore && currentMatch) {
      onUpdateMatchScore(currentMatch.id, simHomeScore, simAwayScore, newEvent);
    }
  };

  // Step simulation forward by delta minutes
  const handleSimulateNextMoment = (minutesStep = 2) => {
    if (simMinute >= 90 + 5) {
      setIsPlaying(false);
      setFeedLogs((prev) => [
        {
          id: `log-final-${Date.now()}`,
          minute: 90,
          title: `Apito Final de Jogo!`,
          description: `Fim de partida: ${currentMatch?.homeTeam?.name} ${simHomeScore} x ${simAwayScore} ${currentMatch?.awayTeam?.name}. Excelente comando na beira do gramado!`,
          type: 'tactic',
          team: coachSide,
        },
        ...prev,
      ]);
      return;
    }

    const nextMinute = Math.min(95, simMinute + minutesStep);
    setSimMinute(nextMinute);

    // Deplete stamina gradually (pressure increases fatigue)
    const staminaDrain = pressure === 'ALTA' ? 1.8 : 1.1;
    setStarters((prev) =>
      prev.map((p) => ({
        ...p,
        stamina: Math.max(30, Math.round(p.stamina - staminaDrain * minutesStep)),
      }))
    );

    // Calculate probabilities of scoring for both sides based on coach choices
    let myGoalChance = 0.08; // base probability per roll
    let oppGoalChance = 0.07;

    // Mentality influence
    if (mentality === 'ULTRA_OFENSIVA') {
      myGoalChance += 0.16;
      oppGoalChance += 0.10; // high counter risk!
    } else if (mentality === 'OFENSIVA') {
      myGoalChance += 0.09;
      oppGoalChance += 0.04;
    } else if (mentality === 'CAUTELOSA') {
      myGoalChance -= 0.04;
      oppGoalChance -= 0.05;
    } else if (mentality === 'RETRANCA') {
      myGoalChance -= 0.06;
      oppGoalChance -= 0.065; // almost shuts down opponent!
    }

    // Formation influence
    if (formation === '4-3-3' || formation === '3-4-3') {
      myGoalChance += 0.04;
    } else if (formation === '5-4-1') {
      oppGoalChance -= 0.05;
    }

    // Pressure influence
    if (pressure === 'ALTA') {
      myGoalChance += 0.03;
      if (averageStamina < 55) {
        oppGoalChance += 0.06; // tired press gets exploited!
      }
    }

    // Active shout boost
    if (activeShout === 'Chutar de Fora') myGoalChance += 0.05;
    if (activeShout === 'Subir Linhas') myGoalChance += 0.06;
    if (activeShout === 'Acalmar o Jogo') {
      myGoalChance -= 0.03;
      oppGoalChance -= 0.05;
    }

    const rollMyTeam = Math.random();
    const rollOppTeam = Math.random();

    // 1. Check if user team scored!
    if (rollMyTeam < myGoalChance) {
      soundFx.playGoalHorn();

      const newHomeScore = coachSide === 'home' ? simHomeScore + 1 : simHomeScore;
      const newAwayScore = coachSide === 'away' ? simAwayScore + 1 : simAwayScore;
      setSimHomeScore(newHomeScore);
      setSimAwayScore(newAwayScore);

      // Pick a scorer (favor forwards/midfielders or fresh subs)
      const potentialScorers = starters.filter((p) => p.position === 'ATA' || p.position === 'MEI');
      const scorer = (potentialScorers.length > 0
        ? potentialScorers[Math.floor(Math.random() * potentialScorers.length)]
        : starters[starters.length - 1]);

      scorer.goals += 1;

      // Log goal event
      const goalEvent: MatchEvent = {
        id: `goal-${Date.now()}`,
        minute: nextMinute,
        type: 'goal',
        team: coachSide,
        player: scorer.name,
        detail: `Golaço! A postura tática ${mentality} no ${formation} encontrou brecha na área adversária!`,
        scoreAfter: [newHomeScore, newAwayScore],
      };

      setFeedLogs((prev) => [
        {
          id: `log-goal-${Date.now()}`,
          minute: nextMinute,
          title: `GOOOOL DO ${myTeamName?.toUpperCase()}!`,
          description: `${scorer.name} (#${scorer.number}) finaliza com precisão no canto! Sua decisão tática (${mentality} + ${formation}) funcionou com perfeição.`,
          type: 'goal',
          team: coachSide,
          badge: '⚽',
        },
        ...prev,
      ]);

      // Fire celebratory full screen confetti / toast
      if (onTriggerGoalCelebration && currentMatch) {
        onTriggerGoalCelebration({
          id: `celeb-${Date.now()}`,
          matchId: currentMatch.id,
          scoringTeamName: myTeamName || 'Seu Time',
          scoringTeamBadge: coachSide === 'home' ? currentMatch.homeTeam?.badgeEmoji : currentMatch.awayTeam?.badgeEmoji,
          opponentTeamName: oppTeamName || 'Adversário',
          scorerName: scorer.name,
          minute: nextMinute,
          homeScore: newHomeScore,
          awayScore: newAwayScore,
          isHome: coachSide === 'home',
          matchTitle: `${currentMatch.homeTeam.name} x ${currentMatch.awayTeam.name}`,
          league: currentMatch.league,
        });
      }

      if (onUpdateMatchScore && currentMatch) {
        onUpdateMatchScore(currentMatch.id, newHomeScore, newAwayScore, goalEvent);
      }
      return;
    }

    // 2. Check if opponent scored
    if (rollOppTeam < oppGoalChance) {
      soundFx.playWhistle();

      const newHomeScore = coachSide === 'home' ? simHomeScore : simHomeScore + 1;
      const newAwayScore = coachSide === 'away' ? simAwayScore : simAwayScore + 1;
      setSimHomeScore(newHomeScore);
      setSimAwayScore(newAwayScore);

      const oppScorer = `Atacante do ${oppTeamName}`;

      setFeedLogs((prev) => [
        {
          id: `log-opp-goal-${Date.now()}`,
          minute: nextMinute,
          title: `Gol do ${oppTeamName}!`,
          description: `O adversário explorou o espaço vazio e igualou/ampliou o marcador. Hora de rever a formação ou chamar o banco!`,
          type: 'goal',
          team: coachSide === 'home' ? 'away' : 'home',
          badge: '⚠️',
        },
        ...prev,
      ]);

      if (onUpdateMatchScore && currentMatch) {
        onUpdateMatchScore(currentMatch.id, newHomeScore, newAwayScore);
      }
      return;
    }

    // 3. Realistic match dynamic danger / yellow card / tackle
    const randomEventRoll = Math.random();
    if (randomEventRoll < 0.25) {
      // Danger shot saved
      setFeedLogs((prev) => [
        {
          id: `log-chance-${Date.now()}`,
          minute: nextMinute,
          title: `Quase o gol do ${myTeamName}!`,
          description: `Pressão com a formação ${formation}. O goleiro adversário se esticou todo e espalmou para escanteio!`,
          type: 'danger',
          team: coachSide,
        },
        ...prev,
      ]);
    } else if (randomEventRoll < 0.38) {
      // Tactical yellow card
      const bookedPlayer = starters[Math.floor(Math.random() * 5) + 1];
      if (bookedPlayer && bookedPlayer.yellowCards === 0) {
        bookedPlayer.yellowCards = 1;
        setFeedLogs((prev) => [
          {
            id: `log-card-${Date.now()}`,
            minute: nextMinute,
            title: `Cartão Amarelo para ${bookedPlayer.name}`,
            description: `Falta tática no meio-campo para conter o contra-ataque veloz do adversário.`,
            type: 'card',
            team: coachSide,
            badge: '🟨',
          },
          ...prev,
        ]);
      }
    }
  };

  // Auto-play timer loop
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      const intervalMs = playbackSpeed === 1 ? 2200 : playbackSpeed === 2 ? 1100 : 500;
      timer = setInterval(() => {
        handleSimulateNextMoment(1);
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, simMinute, starters, mentality, formation, pressure, activeShout]);

  // Consult Assistant Coach via Gemini API (/api/ai/coach-advice)
  const handleConsultAssistantCoach = async () => {
    setIsConsultingAi(true);
    try {
      const res = await fetch('/api/ai/coach-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match: {
            id: currentMatch?.id,
            homeTeam: currentMatch?.homeTeam,
            awayTeam: currentMatch?.awayTeam,
            minute: simMinute,
          },
          coachTeam: coachSide,
          formation,
          mentality,
          pressure,
          substitutionsUsed: substitutionsCount,
          staminaAvg: averageStamina,
          recentEvents: feedLogs.slice(0, 3).map((l) => `${l.minute}': ${l.title}`),
        }),
      });

      if (!res.ok) throw new Error('Falha ao consultar auxiliar.');
      const data = await res.json();
      setAssistantAdvice({
        message: data.assistantMessage,
        rating: data.tacticalRating || 88,
        suggestion: data.keySuggestion,
        threat: data.opponentCounterThreat,
      });
    } catch (err) {
      console.error(err);
      setAssistantAdvice({
        message: `Professor, com a formação ${formation} o time mantém o controle central. Considere trocar os atletas mais cansados (estamina em ${averageStamina}%) para não ceder bolas nas costas dos zagueiros.`,
        rating: 86,
        suggestion: 'Acionar ponta veloz descansado para explorar contra-ataques',
        threat: 'O adversário busca jogadas aéreas na segunda trave.',
      });
    } finally {
      setIsConsultingAi(false);
    }
  };

  // Helper for quick coach shouts
  const handleTriggerShout = (shoutName: string) => {
    soundFx.playWhistle();
    setActiveShout(shoutName);
    setFeedLogs((prev) => [
      {
        id: `shout-${Date.now()}`,
        minute: simMinute,
        title: `Grito da Beira do Campo: "${shoutName}!"`,
        description: `O técnico gesticula na área técnica! A equipe responde aumentando a dedicação nos próximos lances.`,
        type: 'tactic',
        team: coachSide,
      },
      ...prev,
    ]);

    setTimeout(() => {
      setActiveShout(null);
    }, 12000);
  };

  const coordinates = FORMATION_COORDINATES[formation] || FORMATION_COORDINATES['4-3-3'];

  return (
    <div className="space-y-6">
      {/* Top Banner & Match / Side Selector */}
      <div className="bg-[#141618] border border-[#00ff88]/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#00ff88]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00ff88]/15 border border-[#00ff88]/50 text-[#00ff88]">
                <Activity className="w-3 h-3 animate-pulse" />
                SIMULAÇÃO DE TREINADOR AO VIVO
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">•</span>
              <span className="text-white/60 text-xs font-mono">Decisões táticas afetam lances em tempo real</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-['Syne'] font-extrabold uppercase tracking-tight text-[#ececed]">
              Prancheta Tática: <span className="text-[#00ff88]">{myTeamName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl font-mono">
              Comande seu clube na beira do campo! Ajuste a formação, altere a mentalidade, faça substituições com jogadores descansados e acompanhe como o motor de simulação reage em tempo real.
            </p>
          </div>

          {/* Quick Selectors & Side Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="bg-[#0b0c0d] p-1.5 border border-white/10 flex items-center gap-1">
              <span className="text-[10px] font-mono text-white/50 px-2 uppercase font-bold">Comandar:</span>
              <button
                onClick={() => setCoachSide('home')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  coachSide === 'home'
                    ? 'bg-[#00ff88] text-[#0b0c0d]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {currentMatch?.homeTeam?.name || 'Mandante'}
              </button>
              <button
                onClick={() => setCoachSide('away')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  coachSide === 'away'
                    ? 'bg-[#00ff88] text-[#0b0c0d]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {currentMatch?.awayTeam?.name || 'Visitante'}
              </button>
            </div>

            {/* Match Picker Dropdown */}
            <select
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              className="bg-[#0b0c0d] border border-white/15 px-3 py-2 text-xs font-mono text-[#ececed] focus:border-[#00ff88] outline-none cursor-pointer"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.homeTeam.name} vs {m.awayTeam.name} ({m.league})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Cockpit Scoreboard Strip */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-[#0b0c0d]/90 p-4 border border-white/10">
          {/* Home Team */}
          <div className="md:col-span-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
              {currentMatch?.homeTeam?.badgeEmoji || '⚽'}
            </div>
            <div className="min-w-0">
              <div className="font-['Syne'] font-extrabold text-sm sm:text-base text-[#ececed] truncate">
                {currentMatch?.homeTeam?.name}
              </div>
              <div className="text-[10px] font-mono text-white/50">
                {coachSide === 'home' ? 'Seu Clube • Mandante' : 'Adversário'}
              </div>
            </div>
          </div>

          {/* Central Match Time & Score */}
          <div className="md:col-span-4 flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-white/10 py-2 px-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-red-400 tracking-wider">
                {simMinute}' MINUTOS
              </span>
              <span className="text-white/40 text-[10px] font-mono">({simMinute >= 90 ? 'Acréscimos' : 'Tempo Real'})</span>
            </div>

            <div className="text-3xl sm:text-4xl font-['Syne'] font-black tracking-tight text-[#ececed] flex items-center gap-3">
              <span className={coachSide === 'home' ? 'text-[#00ff88]' : 'text-white'}>{simHomeScore}</span>
              <span className="text-white/30 text-2xl">:</span>
              <span className={coachSide === 'away' ? 'text-[#00ff88]' : 'text-white'}>{simAwayScore}</span>
            </div>

            {/* Momentum Bar */}
            <div className="w-full mt-2 space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span className="text-[#00ff88]">Pressão {myTeamName}: {Math.max(10, 50 + Math.round(momentumScore / 2))}%</span>
                <span>Sob Ataque: {Math.max(10, 50 - Math.round(momentumScore / 2))}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 overflow-hidden rounded-xs flex">
                <div
                  style={{ width: `${Math.max(10, 50 + Math.round(momentumScore / 2))}%` }}
                  className="h-full bg-[#00ff88] transition-all duration-500"
                />
                <div
                  style={{ width: `${Math.max(10, 50 - Math.round(momentumScore / 2))}%` }}
                  className="h-full bg-amber-500 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div className="md:col-span-4 flex items-center justify-end gap-3 text-right">
            <div className="min-w-0">
              <div className="font-['Syne'] font-extrabold text-sm sm:text-base text-[#ececed] truncate">
                {currentMatch?.awayTeam?.name}
              </div>
              <div className="text-[10px] font-mono text-white/50">
                {coachSide === 'away' ? 'Seu Clube • Visitante' : 'Adversário'}
              </div>
            </div>
            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
              {currentMatch?.awayTeam?.badgeEmoji || '⚽'}
            </div>
          </div>
        </div>

        {/* Simulation Execution Controls */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Step Button */}
            <button
              onClick={() => handleSimulateNextMoment(2)}
              disabled={isPlaying || simMinute >= 95}
              className="px-3.5 py-2 bg-[#00ff88] text-[#0b0c0d] font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,136,0.2)] disabled:opacity-40"
              title="Avança 2 minutos e calcula probabilidades com suas táticas"
            >
              <Zap className="w-4 h-4" />
              <span>Simular Próximo Lance (+2')</span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={simMinute >= 95}
              className={`px-3.5 py-2 font-mono font-bold text-xs uppercase transition cursor-pointer flex items-center gap-1.5 border ${
                isPlaying
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-white/5 border-white/15 text-[#ececed] hover:border-[#00ff88]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#00ff88]" />}
              <span>{isPlaying ? 'Pausar Relógio' : 'Auto-Simulação'}</span>
            </button>

            {/* Speed Multiplier */}
            <div className="flex items-center bg-[#0b0c0d] border border-white/10 text-xs font-mono">
              <button
                onClick={() => setPlaybackSpeed(1)}
                className={`px-2.5 py-1.5 font-bold transition ${playbackSpeed === 1 ? 'bg-[#00ff88] text-[#0b0c0d]' : 'text-white/60 hover:text-white'}`}
              >
                1x
              </button>
              <button
                onClick={() => setPlaybackSpeed(2)}
                className={`px-2.5 py-1.5 font-bold transition ${playbackSpeed === 2 ? 'bg-[#00ff88] text-[#0b0c0d]' : 'text-white/60 hover:text-white'}`}
              >
                2x
              </button>
              <button
                onClick={() => setPlaybackSpeed(4)}
                className={`px-2.5 py-1.5 font-bold transition ${playbackSpeed === 4 ? 'bg-[#00ff88] text-[#0b0c0d]' : 'text-white/60 hover:text-white'}`}
              >
                4x
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setSimMinute(currentMatch?.minute || 45);
                setSimHomeScore(currentMatch?.homeTeam?.score || 0);
                setSimAwayScore(currentMatch?.awayTeam?.score || 0);
                setSubstitutionsCount(0);
                const initial = generateInitialSquad(myTeamName || '', coachSide === 'home', currentMatch);
                setStarters(initial.starters);
                setBench(initial.bench);
                setFeedLogs([
                  {
                    id: `log-reset-${Date.now()}`,
                    minute: currentMatch?.minute || 45,
                    title: 'Simulação Reiniciada',
                    description: 'Cronômetro e elenco redefinidos para os parâmetros iniciais da partida.',
                    type: 'tactic',
                    team: coachSide,
                  },
                ]);
              }}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition cursor-pointer"
              title="Reiniciar partida"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* AI Assistant Coach Trigger */}
          <button
            onClick={handleConsultAssistantCoach}
            disabled={isConsultingAi}
            className="px-3.5 py-2 bg-gradient-to-r from-[#141618] to-[#1f2d24] border border-[#00ff88]/50 hover:border-[#00ff88] text-[#00ff88] font-mono font-bold text-xs uppercase transition cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <BrainCircuit className={`w-4 h-4 ${isConsultingAi ? 'animate-spin' : 'text-[#38bdf8]'}`} />
            <span>{isConsultingAi ? 'Ouvindo Auxiliar...' : 'Opinião do Auxiliar Técnico (Gemini)'}</span>
          </button>
        </div>
      </div>

      {/* Main Tactical Simulation Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Pitch Board & Field (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tactical Pitch Container */}
          <div className="bg-[#141618] border border-white/15 p-4 sm:p-5 relative shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00ff88]" />
                <span className="font-bold uppercase text-[#ececed]">Prancheta: {formation}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/70">Fôlego do Elenco: <strong className={averageStamina < 60 ? 'text-amber-400' : 'text-[#00ff88]'}>{averageStamina}%</strong></span>
              </div>
              <span className="text-[10px] text-white/50">Clique no atleta para substituir</span>
            </div>

            {/* Tactical Pitch Surface */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-b from-[#164426] via-[#123820] to-[#0e2c19] border-2 border-white/30 rounded-xs overflow-hidden select-none shadow-inner">
              {/* Pitch Markings (Grass Stripes) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`h-full w-full ${i % 2 === 0 ? 'bg-black/15' : 'bg-transparent'}`} />
                ))}
              </div>

              {/* Pitch Center Line & Circle */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30 -translate-y-1/2 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 pointer-events-none" />

              {/* Penalty Boxes */}
              <div className="absolute left-1/2 bottom-0 w-56 h-20 -translate-x-1/2 border-t-2 border-x-2 border-white/30 pointer-events-none" />
              <div className="absolute left-1/2 bottom-0 w-28 h-9 -translate-x-1/2 border-t border-x border-white/30 pointer-events-none" />
              <div className="absolute left-1/2 top-0 w-56 h-20 -translate-x-1/2 border-b-2 border-x-2 border-white/30 pointer-events-none" />

              {/* 11 Starter Player Dots on Pitch */}
              {starters.slice(0, 11).map((player, index) => {
                const pos = coordinates[index] || { x: 50, y: 50 };
                const isSelected = selectedStarterForSub?.id === player.id;
                const staminaColor =
                  player.stamina > 70 ? 'bg-[#00ff88]' : player.stamina > 45 ? 'bg-amber-400' : 'bg-red-500';

                return (
                  <button
                    key={player.id}
                    onClick={() => {
                      setSelectedStarterForSub(isSelected ? null : player);
                    }}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute flex flex-col items-center cursor-pointer group transition-all duration-500 z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    title={`${player.name} (${player.position}) - ${player.stamina}% Fôlego. Clique para substituir.`}
                  >
                    {/* Player Jersey Circle */}
                    <div
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-['Syne'] font-black text-xs text-[#0b0c0d] shadow-lg border-2 transition ${
                        isSelected
                          ? 'bg-[#00ff88] border-white ring-4 ring-[#00ff88]/50 animate-pulse'
                          : coachSide === 'home'
                          ? 'bg-[#ececed] border-[#00ff88]'
                          : 'bg-[#38bdf8] border-white'
                      }`}
                    >
                      <span>{player.number}</span>

                      {/* Yellow Card Warning */}
                      {player.yellowCards > 0 && (
                        <span className="absolute -top-1 -right-1 w-3 h-4 bg-amber-400 border border-black rounded-xs shadow-sm" />
                      )}

                      {/* Captain Armband */}
                      {player.isCaptain && (
                        <span className="absolute -bottom-1 -left-1 text-[8px] bg-amber-400 text-black font-black px-1 rounded-full">
                          C
                        </span>
                      )}
                    </div>

                    {/* Player Name and Stamina Bar Tag */}
                    <div className="mt-1 bg-[#0b0c0d]/90 backdrop-blur-sm border border-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono text-center shadow max-w-[85px] truncate">
                      <div className="truncate text-white font-bold leading-none">{player.name.split(' ')[0]}</div>
                      {/* Mini Stamina Bar */}
                      <div className="w-full h-1 bg-white/20 rounded-full mt-0.5 overflow-hidden">
                        <div
                          style={{ width: `${player.stamina}%` }}
                          className={`h-full ${staminaColor}`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Substitution Prompt if a player is selected */}
            {selectedStarterForSub && (
              <div className="mt-3 p-3 bg-[#0b0c0d] border border-[#00ff88] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#00ff88] text-[#0b0c0d] font-bold flex items-center justify-center text-xs">
                    #{selectedStarterForSub.number}
                  </div>
                  <div>
                    <span className="text-[#00ff88] font-bold uppercase">Substituir Titular: </span>
                    <strong className="text-white">{selectedStarterForSub.name}</strong> ({selectedStarterForSub.position}) • Fôlego: {selectedStarterForSub.stamina}%
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedBenchForSub ? (
                    <button
                      onClick={handleConfirmSubstitution}
                      className="px-3 py-1.5 bg-[#00ff88] text-[#0b0c0d] font-bold uppercase hover:brightness-110 cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirmar Troca por {selectedBenchForSub.name.split(' ')[0]}</span>
                    </button>
                  ) : (
                    <span className="text-amber-400 font-bold">Selecione um reserva no banco ao lado →</span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedStarterForSub(null);
                      setSelectedBenchForSub(null);
                    }}
                    className="px-2 py-1 bg-white/10 text-white/60 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Coach Shouts (Instruções Imediatas da Beira do Campo) */}
          <div className="bg-[#141618] border border-white/10 p-4 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/60 uppercase font-bold flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#00ff88]" />
                Gritos do Treinador (Impacto Imediato de 10 min):
              </span>
              {activeShout && (
                <span className="text-[10px] bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 px-2 py-0.5 rounded font-bold animate-pulse">
                  ATIVO: "{activeShout}"
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'Subir Linhas', desc: 'Aumenta pressão e posse' },
                { name: 'Acalmar o Jogo', desc: 'Valoriza posse e gasta tempo' },
                { name: 'Chutar de Fora', desc: '+Chutes de média distância' },
                { name: 'Fechem o Meio', desc: 'Dobra marcação nos volantes' },
              ].map((shout) => (
                <button
                  key={shout.name}
                  onClick={() => handleTriggerShout(shout.name)}
                  className={`p-2 border text-left transition cursor-pointer ${
                    activeShout === shout.name
                      ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold'
                      : 'bg-[#0b0c0d] border-white/10 hover:border-white/30 text-white/80'
                  }`}
                >
                  <div className="font-bold text-xs truncate">"{shout.name}!"</div>
                  <div className="text-[10px] text-white/50 truncate">{shout.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tactical Settings, Bench & Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tactical Settings Box */}
          <div className="bg-[#141618] border border-white/15 p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase font-bold text-[#00ff88] flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              Diretrizes Táticas da Equipe
            </h3>

            {/* 1. Formation Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-white/60 uppercase font-bold">
                Esquema Tático (Mudar Formação):
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['4-3-3', '4-2-3-1', '4-4-2', '3-5-2', '5-4-1', '3-4-3'] as CoachFormation[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFormation(f);
                      soundFx.playWhistle();
                      setFeedLogs((prev) => [
                        {
                          id: `log-f-${Date.now()}`,
                          minute: simMinute,
                          title: `Mudança Tática para ${f}`,
                          description: `O técnico reestruturou o posicionamento da equipe para ${f} aos ${simMinute} minutos de jogo!`,
                          type: 'tactic',
                          team: coachSide,
                        },
                        ...prev,
                      ]);
                    }}
                    className={`py-2 px-2 text-xs font-mono font-bold uppercase transition cursor-pointer border text-center ${
                      formation === f
                        ? 'bg-[#00ff88] text-[#0b0c0d] border-[#00ff88] shadow-sm'
                        : 'bg-[#0b0c0d] border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Team Mentality */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-white/60 uppercase font-bold flex items-center justify-between">
                <span>Mentalidade da Equipe:</span>
                <span className="text-[#00ff88] font-bold">{mentality}</span>
              </label>
              <div className="grid grid-cols-5 gap-1 text-[10px] font-mono">
                {[
                  { id: 'RETRANCA', label: 'Retranca' },
                  { id: 'CAUTELOSA', label: 'Cautelosa' },
                  { id: 'EQUILIBRADA', label: 'Equilíbrio' },
                  { id: 'OFENSIVA', label: 'Ofensiva' },
                  { id: 'ULTRA_OFENSIVA', label: 'Pressão Total' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMentality(m.id as CoachMentality)}
                    className={`py-1.5 text-center transition cursor-pointer border truncate px-1 ${
                      mentality === m.id
                        ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold'
                        : 'bg-[#0b0c0d] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Pressing & Passing Style */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase font-bold">Pressão sem a Bola</label>
                <select
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value as CoachPressure)}
                  className="w-full bg-[#0b0c0d] border border-white/15 px-2.5 py-1.5 text-xs font-mono text-[#ececed] focus:border-[#00ff88] outline-none"
                >
                  <option value="ALTA">Alta no Goleiro (+Fadiga)</option>
                  <option value="MEDIA">Bloco Médio (Padrão)</option>
                  <option value="BAIXA">Linha Baixa / Ônibus</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase font-bold">Estilo de Passe</label>
                <select
                  value={passingStyle}
                  onChange={(e) => setPassingStyle(e.target.value as CoachPassingStyle)}
                  className="w-full bg-[#0b0c0d] border border-white/15 px-2.5 py-1.5 text-xs font-mono text-[#ececed] focus:border-[#00ff88] outline-none"
                >
                  <option value="CURTO">Passe Curto / Posse</option>
                  <option value="DIRETO">Ligação Direta / Longo</option>
                  <option value="EQUILIBRADO">Misto / Transições</option>
                </select>
              </div>
            </div>
          </div>

          {/* Substitutions & Bench Drawer */}
          <div className="bg-[#141618] border border-white/15 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#00ff88] font-bold uppercase">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Banco de Reservas ({bench.length})</span>
              </div>
              <span className="text-white/60">
                Substituições: <strong className="text-[#00ff88]">{substitutionsCount}/5</strong>
              </span>
            </div>

            <p className="text-[11px] font-mono text-white/50">
              {selectedStarterForSub
                ? `Agora escolha o reserva que substituirá ${selectedStarterForSub.name}:`
                : 'Selecione um jogador no campinho ou clique em um reserva abaixo para preparar a troca:'}
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {bench.map((player) => {
                const isSelected = selectedBenchForSub?.id === player.id;
                return (
                  <button
                    key={player.id}
                    onClick={() => setSelectedBenchForSub(isSelected ? null : player)}
                    className={`p-2 border text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]'
                        : 'bg-[#0b0c0d] border-white/10 hover:border-white/30 text-white/80'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <div className="text-xs font-bold truncate">
                        #{player.number} {player.name}
                      </div>
                      <div className="text-[10px] text-white/50 font-mono">
                        {player.position} • 100% Energia
                      </div>
                    </div>
                    <span className="text-[9px] bg-white/5 px-1 py-0.5 border border-white/10 font-mono">
                      Nota {player.rating}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assistant Coach Advice Modal / Box if triggered */}
          {assistantAdvice && (
            <div className="bg-gradient-to-r from-[#112419] to-[#141618] border border-[#00ff88]/60 p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#00ff88] uppercase">
                  <BrainCircuit className="w-4 h-4 text-[#38bdf8]" />
                  <span>Parecer do Auxiliar Técnico (Gemini)</span>
                </div>
                <span className="text-[10px] font-mono bg-[#00ff88]/20 text-[#00ff88] px-2 py-0.5 font-bold">
                  QI Tático: {assistantAdvice.rating}/100
                </span>
              </div>

              <p className="text-xs text-white/90 font-sans leading-relaxed italic bg-[#0b0c0d]/60 p-2.5 border border-white/10">
                "{assistantAdvice.message}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="bg-[#0b0c0d] p-2 border border-white/10">
                  <span className="text-[#00ff88] font-bold uppercase block text-[9px]">Sugestão Principal:</span>
                  <span className="text-white/80">{assistantAdvice.suggestion}</span>
                </div>
                <div className="bg-[#0b0c0d] p-2 border border-white/10">
                  <span className="text-amber-400 font-bold uppercase block text-[9px]">Alerta de Risco:</span>
                  <span className="text-white/80">{assistantAdvice.threat}</span>
                </div>
              </div>
            </div>
          )}

          {/* Real-Time Match Events Feed (Histórico de Lances) */}
          <div className="bg-[#141618] border border-white/15 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#ececed] uppercase flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#00ff88]" />
                Lances & Impactos da Simulação ({feedLogs.length})
              </span>
              <span className="text-white/40 text-[10px]">Mais recentes no topo</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              {feedLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2.5 border text-xs font-mono space-y-1 ${
                    log.type === 'goal'
                      ? 'bg-[#00ff88]/10 border-[#00ff88]'
                      : log.type === 'card'
                      ? 'bg-amber-500/10 border-amber-500/40'
                      : log.type === 'sub'
                      ? 'bg-blue-500/10 border-blue-500/40'
                      : 'bg-[#0b0c0d] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="text-[#00ff88]">{log.minute}'</span>
                      <span className="text-white">{log.title}</span>
                    </div>
                    {log.badge && <span>{log.badge}</span>}
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed font-sans">
                    {log.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
