import React, { useState, useEffect } from 'react';
import { Match, MatchAiPrediction } from '../types';
import { TEAMS_DATA } from '../data/teamsData';
import { 
  Sparkles, 
  BrainCircuit, 
  Trophy, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  Calendar, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle,
  ChevronRight,
  Flame,
  Target,
  Clock,
  Compass
} from 'lucide-react';

interface AiPredictionsSectionProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  onOpenTeamHistory: (teamName: string) => void;
}

export const AiPredictionsSection: React.FC<AiPredictionsSectionProps> = ({
  matches,
  onSelectMatch,
  onOpenTeamHistory,
}) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(matches[0]?.id || '');
  const [prediction, setPrediction] = useState<MatchAiPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'live' | 'classicos' | 'brasileirao'>('all');
  const [focusMode, setFocusMode] = useState<string>('Tática e Histórico Completo');
  const [activeTab, setActiveTab] = useState<'overview' | 'matchups' | 'players' | 'history' | 'scenarios'>('overview');

  // Find currently selected match
  const currentMatch = matches.find((m) => m.id === selectedMatchId) || matches[0];

  // Filter matches based on activeCategory
  const filteredMatches = matches.filter((m) => {
    if (activeCategory === 'live') return m.status === 'LIVE';
    if (activeCategory === 'brasileirao') {
      const leg = (m.league || '').toLowerCase();
      return leg.includes('brasileir') || leg.includes('série a') || leg.includes('serie a');
    }
    if (activeCategory === 'classicos') {
      const derbies = ['flamengo', 'palmeiras', 'corinthians', 'são paulo', 'real madrid', 'barcelona', 'manchester'];
      const h = m.homeTeam.name.toLowerCase();
      const a = m.awayTeam.name.toLowerCase();
      return derbies.some(d => h.includes(d)) || derbies.some(d => a.includes(d));
    }
    return true;
  });

  // Fetch prediction from backend API
  const handleGeneratePrediction = async (matchToPredict = currentMatch, customFocus = focusMode) => {
    if (!matchToPredict) return;
    setLoading(true);
    setError(null);

    const steps = [
      'Cruzando estatísticas recentes e dados da partida...',
      'Recuperando histórico de confrontos e títulos dos clubes...',
      'Solicitando inferência tática ao Gemini 3.8 Flash...',
      'Consolidando probabilidades e cenários de jogo...',
    ];

    let stepIndex = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 900);

    try {
      // Find team history if available in TEAMS_DATA
      const findHistory = (name: string) => {
        const lower = name.toLowerCase();
        for (const [key, data] of Object.entries(TEAMS_DATA)) {
          if (lower.includes(key) || data.name.toLowerCase().includes(lower) || data.popularName?.toLowerCase().includes(lower)) {
            return {
              summary: data.summary,
              coach: data.coach,
              trophiesCount: data.trophies?.reduce((acc, t) => acc + t.count, 0),
              stadiumName: data.stadium?.name,
              goldenEra: data.goldenEra,
            };
          }
        }
        return undefined;
      };

      const homeHistory = findHistory(matchToPredict.homeTeam.name);
      const awayHistory = findHistory(matchToPredict.awayTeam.name);

      const res = await fetch('/api/ai/predict-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match: {
            id: matchToPredict.id,
            homeTeam: matchToPredict.homeTeam,
            awayTeam: matchToPredict.awayTeam,
            league: matchToPredict.league,
            stadium: matchToPredict.stadium,
            time: matchToPredict.time,
            status: matchToPredict.status,
            stats: matchToPredict.stats,
          },
          homeHistory,
          awayHistory,
          focusMode: customFocus,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro na chamada do servidor: ${res.statusText}`);
      }

      const data: MatchAiPrediction = await res.json();
      setPrediction(data);
    } catch (err: any) {
      console.error('Falha ao gerar previsão:', err);
      setError('Não foi possível gerar a previsão em tempo real. Tente novamente.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Auto-generate initial prediction on mount or match change if not yet generated
  useEffect(() => {
    if (currentMatch && (!prediction || prediction.matchId !== currentMatch.id)) {
      handleGeneratePrediction(currentMatch);
    }
  }, [selectedMatchId]);

  const handleCopy = () => {
    if (!prediction || !currentMatch) return;
    const text = `🔮 Previsão FutScore IA (${prediction.modelUsed})\n` +
      `⚽ ${currentMatch.homeTeam.name} ${prediction.predictedScore.home} x ${prediction.predictedScore.away} ${currentMatch.awayTeam.name}\n` +
      `📊 Probabilidades: ${prediction.winProbabilities.home}% ${currentMatch.homeTeam.name} | ${prediction.winProbabilities.draw}% Empate | ${prediction.winProbabilities.away}% ${currentMatch.awayTeam.name}\n` +
      `💡 Vantagem Tática: ${prediction.tacticalAdvantage}\n` +
      `🎯 Dica: ${prediction.matchScenario?.tip || 'Partida eletrizante!'}\n` +
      `Acompanhe em tempo real no FutScore PRO.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#141618] via-[#111c16] to-[#141618] border border-[#00ff88]/30 p-5 sm:p-7 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00ff88]/15 border border-[#00ff88]/50 text-[#00ff88]">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Gemini 3.8 Flash
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/70">
                <BrainCircuit className="w-3 h-3 text-[#38bdf8]" />
                Inferência Server-Side
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">•</span>
              <span className="text-white/60 text-xs font-mono">IA Tática & Machine Learning</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-['Syne'] font-extrabold uppercase tracking-tight text-[#ececed]">
              Previsões IA <span className="text-[#00ff88]">FutScore</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
              Análise pré-jogo de ponta gerada pela API do Gemini. Cruzamos momento tático, modelos de pressão, estatísticas xG, desfalques e toda a história centenária dos clubes para projetar o desfecho das partidas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleGeneratePrediction()}
              disabled={loading}
              className="px-4 py-2.5 bg-[#00ff88] text-[#0b0c0d] font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.25)] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'ANALISANDO...' : 'ATUALIZAR PREVISÃO'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Match Selector Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-white/50 uppercase font-bold shrink-0">Filtrar Jogos:</span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 text-xs uppercase font-bold transition cursor-pointer border ${
                activeCategory === 'all'
                  ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              Todos ({matches.length})
            </button>
            <button
              onClick={() => setActiveCategory('live')}
              className={`px-3 py-1 text-xs uppercase font-bold transition cursor-pointer border flex items-center gap-1.5 ${
                activeCategory === 'live'
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              Ao Vivo ({matches.filter(m => m.status === 'LIVE').length})
            </button>
            <button
              onClick={() => setActiveCategory('brasileirao')}
              className={`px-3 py-1 text-xs uppercase font-bold transition cursor-pointer border ${
                activeCategory === 'brasileirao'
                  ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              Brasileirão
            </button>
            <button
              onClick={() => setActiveCategory('classicos')}
              className={`px-3 py-1 text-xs uppercase font-bold transition cursor-pointer border ${
                activeCategory === 'classicos'
                  ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
              }`}
            >
              Clássicos
            </button>
          </div>

          <span className="text-white/40 text-xs font-mono">
            {filteredMatches.length} confrontos disponíveis
          </span>
        </div>

        {/* Horizontal Match Cards Scroller */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {filteredMatches.map((m) => {
            const isSelected = m.id === (currentMatch?.id);
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMatchId(m.id);
                }}
                className={`flex-shrink-0 text-left p-3 border transition cursor-pointer w-64 relative group ${
                  isSelected
                    ? 'bg-[#18241c] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                    : 'bg-[#141618] border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1.5">
                  <span className="truncate max-w-[130px]">{m.league || 'Partida'}</span>
                  {m.status === 'LIVE' ? (
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {m.time}'
                    </span>
                  ) : (
                    <span>{m.time}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#ececed]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{m.homeTeam.badgeEmoji || '⚽'}</span>
                      <span className="truncate">{m.homeTeam.name}</span>
                    </div>
                    <span>{m.homeTeam.score}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#ececed]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{m.awayTeam.badgeEmoji || '⚽'}</span>
                      <span className="truncate">{m.awayTeam.name}</span>
                    </div>
                    <span>{m.awayTeam.score}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-2 pt-1.5 border-t border-[#00ff88]/30 flex items-center justify-between text-[10px] font-mono text-[#00ff88]">
                    <span>SELECIONADO</span>
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Focus & Context Controls */}
      <div className="bg-[#141618] border border-white/10 p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono uppercase text-white/50 font-bold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#00ff88]" />
            Modo de Foco da IA:
          </span>
          {[
            'Tática e Histórico Completo',
            'Finalizações & Probabilidade de Gols',
            'Duelo de Atletas Decisivos',
            'Rivalidade e Peso da Camisa',
          ].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setFocusMode(mode);
                handleGeneratePrediction(currentMatch, mode);
              }}
              className={`px-2.5 py-1 text-xs font-mono transition cursor-pointer border ${
                focusMode === mode
                  ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {currentMatch && (
            <button
              onClick={() => onSelectMatch(currentMatch)}
              className="text-xs font-mono font-bold text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Radar & Timeline</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Loading Overlay or Error State */}
      {loading && (
        <div className="bg-[#141618] border border-[#00ff88]/40 p-10 text-center space-y-4 shadow-xl">
          <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff88]/20 border-t-[#00ff88] animate-spin" />
            <BrainCircuit className="w-8 h-8 text-[#00ff88] animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-mono font-bold text-[#00ff88] uppercase tracking-wider">
              {loadingStep || 'Processando raciocínio tático...'}
            </div>
            <p className="text-xs text-white/50 font-mono">
              Integrado com Gemini 3.8 Flash • FutScore Tactical Deep Engine
            </p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-950/40 border border-red-500/50 p-4 text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-xs text-red-300 font-mono">{error}</p>
          <button
            onClick={() => handleGeneratePrediction()}
            className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-white text-xs font-mono font-bold uppercase"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Main Interactive Prediction Card */}
      {!loading && currentMatch && prediction && (
        <div className="bg-[#141618] border border-white/15 shadow-2xl overflow-hidden space-y-0">
          {/* Card Match Header */}
          <div className="bg-gradient-to-b from-[#1c2420] to-[#141618] p-5 sm:p-7 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <span className="text-[#00ff88] font-bold">{currentMatch.league}</span>
                  <span>•</span>
                  <span>{currentMatch.stadium || 'Estádio Principal'}</span>
                  <span>•</span>
                  <span>Status: <strong className="text-[#ececed]">{currentMatch.status === 'LIVE' ? `AO VIVO (${currentMatch.time}')` : currentMatch.time}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-['Syne'] font-extrabold uppercase tracking-tight text-[#ececed]">
                    {currentMatch.homeTeam.name} <span className="text-[#00ff88] font-normal lowercase">vs</span> {currentMatch.awayTeam.name}
                  </h2>
                </div>
              </div>

              {/* Confidence Badge & Quick Action */}
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Nível de Confiança</div>
                  <div className={`font-mono text-xs font-bold uppercase px-2.5 py-0.5 border ${
                    prediction.confidenceLevel === 'ALTA'
                      ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]'
                      : 'bg-amber-500/15 border-amber-500 text-amber-400'
                  }`}>
                    {prediction.confidenceLevel}
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  title="Copiar previsão formatada"
                  className="p-2 bg-white/5 border border-white/15 hover:border-[#00ff88] text-white/70 hover:text-[#00ff88] transition cursor-pointer flex items-center gap-1.5 font-mono text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#00ff88]" />
                      <span className="hidden sm:inline text-[#00ff88] font-bold">COPIADO!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline uppercase">COPIAR</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Placar Projetado & Probabilidades */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#0b0c0d]/80 border border-white/10 p-4 sm:p-5">
              {/* Home Team */}
              <div className="md:col-span-4 flex items-center gap-3">
                <button
                  onClick={() => onOpenTeamHistory(currentMatch.homeTeam.name)}
                  className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-2xl hover:border-[#00ff88] transition cursor-pointer"
                  title="Ver história do clube"
                >
                  {currentMatch.homeTeam.badgeEmoji || '⚽'}
                </button>
                <div className="min-w-0">
                  <button
                    onClick={() => onOpenTeamHistory(currentMatch.homeTeam.name)}
                    className="font-['Syne'] font-extrabold text-base sm:text-lg text-[#ececed] truncate hover:text-[#00ff88] transition text-left cursor-pointer"
                  >
                    {currentMatch.homeTeam.name}
                  </button>
                  <div className="text-[11px] font-mono text-white/50">Mandante • Chance {prediction.winProbabilities.home}%</div>
                </div>
              </div>

              {/* Center Predicted Score Box */}
              <div className="md:col-span-4 flex flex-col items-center justify-center py-2 border-y md:border-y-0 md:border-x border-white/10 px-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#00ff88] font-bold mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  PLACAR PROJETADO PELA IA
                </div>
                <div className="flex items-center gap-3 text-4xl sm:text-5xl font-['Syne'] font-black tracking-tight text-[#ececed]">
                  <span className="text-[#00ff88]">{prediction.predictedScore.home}</span>
                  <span className="text-white/30 text-2xl">:</span>
                  <span className="text-[#38bdf8]">{prediction.predictedScore.away}</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1">
                  Modelo: {prediction.modelUsed}
                </div>
              </div>

              {/* Away Team */}
              <div className="md:col-span-4 flex items-center justify-end gap-3 text-right">
                <div className="min-w-0">
                  <button
                    onClick={() => onOpenTeamHistory(currentMatch.awayTeam.name)}
                    className="font-['Syne'] font-extrabold text-base sm:text-lg text-[#ececed] truncate hover:text-[#00ff88] transition text-right cursor-pointer"
                  >
                    {currentMatch.awayTeam.name}
                  </button>
                  <div className="text-[11px] font-mono text-white/50">Visitante • Chance {prediction.winProbabilities.away}%</div>
                </div>
                <button
                  onClick={() => onOpenTeamHistory(currentMatch.awayTeam.name)}
                  className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-2xl hover:border-[#00ff88] transition cursor-pointer"
                  title="Ver história do clube"
                >
                  {currentMatch.awayTeam.badgeEmoji || '⚽'}
                </button>
              </div>
            </div>

            {/* Win Probability Bar Visualizer */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#00ff88] font-bold">
                  {currentMatch.homeTeam.name}: {prediction.winProbabilities.home}%
                </span>
                <span className="text-white/60 font-bold">
                  Empate: {prediction.winProbabilities.draw}%
                </span>
                <span className="text-[#38bdf8] font-bold">
                  {currentMatch.awayTeam.name}: {prediction.winProbabilities.away}%
                </span>
              </div>
              <div className="h-3 w-full bg-white/10 flex overflow-hidden rounded-xs">
                <div
                  style={{ width: `${prediction.winProbabilities.home}%` }}
                  className="h-full bg-[#00ff88] transition-all duration-700"
                  title={`${currentMatch.homeTeam.name}: ${prediction.winProbabilities.home}%`}
                />
                <div
                  style={{ width: `${prediction.winProbabilities.draw}%` }}
                  className="h-full bg-white/30 transition-all duration-700"
                  title={`Empate: ${prediction.winProbabilities.draw}%`}
                />
                <div
                  style={{ width: `${prediction.winProbabilities.away}%` }}
                  className="h-full bg-[#38bdf8] transition-all duration-700"
                  title={`${currentMatch.awayTeam.name}: ${prediction.winProbabilities.away}%`}
                />
              </div>
            </div>

            {/* Quick Tactical Advantage Highlight */}
            <div className="mt-4 p-3 bg-[#00ff88]/10 border-l-2 border-[#00ff88] text-xs font-mono text-white/90 flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#00ff88] uppercase">Vantagem Tática: </strong>
                {prediction.tacticalAdvantage}
              </div>
            </div>
          </div>

          {/* Card Inner Navigation Tabs */}
          <div className="bg-[#0e1012] border-b border-white/10 flex overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-bold uppercase transition cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[#00ff88] text-[#00ff88] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Visão Tática Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('matchups')}
              className={`px-4 py-3 font-bold uppercase transition cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'matchups'
                  ? 'border-[#00ff88] text-[#00ff88] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Duelos Decisivos ({prediction.keyMatchups.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('players')}
              className={`px-4 py-3 font-bold uppercase transition cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'players'
                  ? 'border-[#00ff88] text-[#00ff88] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Atletas a Observar</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 font-bold uppercase transition cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'history'
                  ? 'border-[#00ff88] text-[#00ff88] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Tradição & Peso da Camisa</span>
            </button>

            <button
              onClick={() => setActiveTab('scenarios')}
              className={`px-4 py-3 font-bold uppercase transition cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'scenarios'
                  ? 'border-[#00ff88] text-[#00ff88] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Cenários de Gols & Dica</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-5 sm:p-6 space-y-6">
            {/* 1. Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-mono uppercase text-[#00ff88] font-bold flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" />
                    Parecer Técnico do Especialista Gemini
                  </h3>
                  <div className="text-sm text-white/80 leading-relaxed font-sans bg-[#0b0c0d] p-4 border border-white/10 whitespace-pre-line">
                    {prediction.summary}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">Gols Esperados (xG)</div>
                    <div className="text-lg font-['Syne'] font-extrabold text-[#00ff88] mt-0.5">
                      {prediction.matchScenario?.expectedGoalsTotal || '2 a 3 gols'}
                    </div>
                    <div className="text-xs text-white/60 mt-1">Volume ofensivo projetado</div>
                  </div>

                  <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">Ambos Marcam</div>
                    <div className="text-lg font-['Syne'] font-extrabold text-[#38bdf8] mt-0.5">
                      {prediction.matchScenario?.bothTeamsToScoreProbability || 60}% de chance
                    </div>
                    <div className="text-xs text-white/60 mt-1">Eficiência das duas linhas de frente</div>
                  </div>

                  <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">Ritmo de Jogo</div>
                    <div className="text-lg font-['Syne'] font-extrabold text-amber-400 mt-0.5">
                      {prediction.matchScenario?.gamePace || 'INTENSO'}
                    </div>
                    <div className="text-xs text-white/60 mt-1">Velocidade de circulação da bola</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Key Matchups Tab */}
            {activeTab === 'matchups' && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-[#00ff88] font-bold flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Duelos Táticos Determinantes no Gramado
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prediction.keyMatchups.map((matchup, idx) => (
                    <div key={idx} className="bg-[#0b0c0d] p-4 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#00ff88]/20 border border-[#00ff88] text-[#00ff88] text-[10px] font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-sm text-[#ececed]">{matchup.title}</h4>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed font-mono">
                        {matchup.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Players To Watch Tab */}
            {activeTab === 'players' && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-[#00ff88] font-bold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Atletas com Maior Potencial de Decidir a Partida
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prediction.keyPlayersToWatch.map((player, idx) => (
                    <div key={idx} className="bg-[#0b0c0d] p-4 border border-white/10 flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/5 border border-[#00ff88]/40 flex items-center justify-center font-['Syne'] font-black text-sm text-[#00ff88] shrink-0">
                        #{idx + 1}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-['Syne'] font-extrabold text-sm text-[#ececed] truncate">
                            {player.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/5 text-[#00ff88] border border-[#00ff88]/30">
                            {player.role}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-white/50">{player.team}</div>
                        <p className="text-xs text-white/70 leading-relaxed pt-1">
                          {player.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Historic & Traditions Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-mono uppercase text-[#00ff88] font-bold flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Tradição e Retrospecto no Confronto
                  </h3>
                  <div className="text-sm text-white/80 leading-relaxed font-sans bg-[#0b0c0d] p-4 border border-white/10">
                    {prediction.historicContext}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#0b0c0d] p-4 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#ececed]">{currentMatch.homeTeam.name}</h4>
                      <button
                        onClick={() => onOpenTeamHistory(currentMatch.homeTeam.name)}
                        className="text-xs font-mono text-[#00ff88] hover:underline"
                      >
                        Ver Museu & Títulos →
                      </button>
                    </div>
                    <p className="text-xs text-white/60 font-mono">
                      Acesse a galeria completa de troféus, era de ouro e maiores ídolos na aba de Times.
                    </p>
                  </div>

                  <div className="bg-[#0b0c0d] p-4 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#ececed]">{currentMatch.awayTeam.name}</h4>
                      <button
                        onClick={() => onOpenTeamHistory(currentMatch.awayTeam.name)}
                        className="text-xs font-mono text-[#00ff88] hover:underline"
                      >
                        Ver Museu & Títulos →
                      </button>
                    </div>
                    <p className="text-xs text-white/60 font-mono">
                      Acesse a galeria completa de troféus, era de ouro e maiores ídolos na aba de Times.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Scenarios & Tips Tab */}
            {activeTab === 'scenarios' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-amber-500/10 via-[#0b0c0d] to-amber-500/5 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Leitura Técnica Recomendada da IA
                  </div>
                  <p className="text-sm font-sans text-white/90 leading-relaxed">
                    {prediction.matchScenario?.tip || 'Partida de ritmo elevado com tendência de gols em momentos de desorganização tática.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">Placar mais Provável</div>
                    <div className="text-xl font-['Syne'] font-black text-[#ececed] mt-1">
                      {prediction.predictedScore.home} x {prediction.predictedScore.away}
                    </div>
                  </div>

                  <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">Probabilidade de Vitória Mandante</div>
                    <div className="text-xl font-['Syne'] font-black text-[#00ff88] mt-1">
                      {prediction.winProbabilities.home}%
                    </div>
                  </div>

                  <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">Probabilidade de Vitória Visitante</div>
                    <div className="text-xl font-['Syne'] font-black text-[#38bdf8] mt-1">
                      {prediction.winProbabilities.away}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Interactive Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="text-white/40">
                Última inferência: {new Date(prediction.timestamp).toLocaleTimeString('pt-BR')} • {prediction.modelUsed}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onSelectMatch(currentMatch)}
                  className="w-full sm:w-auto px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#00ff88] text-[#ececed] font-bold uppercase transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Abrir Detalhes do Jogo</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#00ff88]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
