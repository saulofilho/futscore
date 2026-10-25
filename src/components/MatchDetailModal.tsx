import React, { useState } from 'react';
import { Match, MatchEvent, GoalCelebrationData } from '../types';
import { getMatchBroadcast, getMatchMissingPlayers, getMatchReferees, getMatchStadiumInfo, getMatchWeather } from '../utils/footballMatchEnhancers';
import { LiveWinProbabilityChart, calculateWinProbability } from './LiveWinProbabilityChart';
import { MatchMinuteProgressBar } from './MatchMinuteProgressBar';
import { PitchHeatmap } from './PitchHeatmap';
import { WhereToWatchSection } from './WhereToWatchSection';
import { TeamRadarChart } from './TeamRadarChart';
import { InteractiveTimeline } from './InteractiveTimeline';
import { ModalGoalBanner } from './GoalCelebrationEffect';
import { MatchMomentumChart } from './MatchMomentumChart';
import { HeadToHeadHistorySection } from './HeadToHeadHistorySection';
import { SportDetailBreakdown } from './SportDetailBreakdown';
import { getMatchBroadcastersDetailed } from '../utils/broadcastersData';
import { soundFx } from '../utils/audio';
import {
  X, Radio, BarChart3, Clock, Users, History, Info, Sparkles, Star, Tv,
  AlertTriangle, Shield, CheckCircle2, User, Activity, TrendingUp,
  Search, Stethoscope, UserMinus, FileText, AlertCircle, Flame,
  Thermometer, CloudSun, Wind, Droplets, MapPin, Users2, Compass, Sliders
} from 'lucide-react';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onOpenTeamHistory: (teamId: string) => void;
  onToggleFavorite: (matchId: string) => void;
  isFavorite: boolean;
  onAddSimulatedGoal: (matchId: string) => void;
  onSelectAthlete?: (athleteNameOrId: string) => void;
  currentCelebration?: GoalCelebrationData | null;
  onOpenPredictions?: (match: Match) => void;
  onOpenCoachMode?: (match: Match) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onOpenTeamHistory,
  onToggleFavorite,
  isFavorite,
  onAddSimulatedGoal,
  onSelectAthlete,
  currentCelebration,
  onOpenPredictions,
  onOpenCoachMode,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'momentum' | 'timeline' | 'lineups' | 'injuries' | 'heatmap' | 'radar' | 'broadcast' | 'h2h'>('stats');
  const [injuryFilter, setInjuryFilter] = useState<'ALL' | 'injury' | 'suspension' | 'doubt'>('ALL');
  const [injurySearch, setInjurySearch] = useState('');

  if (!match) return null;

  const isLive = match.status === 'LIVE';
  const broadcasts = getMatchBroadcast(match);
  const detailedBroadcasters = getMatchBroadcastersDetailed(match);
  const missingPlayers = getMatchMissingPlayers(match);
  const referees = getMatchReferees(match);
  const stadiumInfo = getMatchStadiumInfo(match);
  const weather = getMatchWeather(match);

  const homeMissing = missingPlayers.home || [];
  const awayMissing = missingPlayers.away || [];
  const totalMissing = homeMissing.length + awayMissing.length;
  const allMissingList = [...homeMissing, ...awayMissing];
  const countInjuries = allMissingList.filter(p => p.type === 'injury').length;
  const countSuspensions = allMissingList.filter(p => p.type === 'suspension').length;
  const countDoubts = allMissingList.filter(p => p.type === 'doubt').length;

  const filterMissingPlayer = (p: { name: string; position?: string; reason: string; type: string }) => {
    if (injuryFilter !== 'ALL' && p.type !== injuryFilter) return false;
    if (injurySearch.trim()) {
      const q = injurySearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchReason = p.reason.toLowerCase().includes(q);
      const matchPos = (p.position || '').toLowerCase().includes(q);
      return matchName || matchReason || matchPos;
    }
    return true;
  };

  const filteredHomeMissing = homeMissing.filter(filterMissingPlayer);
  const filteredAwayMissing = awayMissing.filter(filterMissingPlayer);

  // Stat comparison bar helper
  const renderStatBar = (label: string, homeVal: number, awayVal: number, isPercentage = false, unit = '') => {
    const total = homeVal + awayVal || 1;
    const homePct = (homeVal / total) * 100;
    const awayPct = (awayVal / total) * 100;

    return (
      <div className="py-2.5 border-b border-white/10 last:border-0 font-mono">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className={`text-sm ${homeVal > awayVal ? 'text-[#00ff88] font-bold' : 'text-[#ececed]'}`}>
            {homeVal}{unit}
          </span>
          <span className="label opacity-70 uppercase tracking-wider">{label}</span>
          <span className={`text-sm ${awayVal > homeVal ? 'text-[#00ff88] font-bold' : 'text-[#ececed]'}`}>
            {awayVal}{unit}
          </span>
        </div>
        <div className="flex h-1.5 w-full bg-[#0b0c0d] border border-white/10 overflow-hidden">
          <div
            className="bg-[#00ff88] transition-all duration-500"
            style={{ width: `${isPercentage ? homeVal : homePct}%` }}
          />
          <div
            className="bg-white/30 transition-all duration-500"
            style={{ width: `${isPercentage ? awayVal : awayPct}%` }}
          />
        </div>
      </div>
    );
  };

  const isCelebrating = Boolean(currentCelebration && currentCelebration.matchId === match.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-4xl bg-[#141618] border transition-all duration-500 overflow-hidden my-auto max-h-[94vh] sm:max-h-[92vh] flex flex-col text-[#ececed] ${
        isCelebrating
          ? 'border-[#00ff88] shadow-[0_0_60px_rgba(0,255,136,0.45),0_0_25px_rgba(255,215,0,0.3)] ring-2 ring-[#00ff88]/60'
          : 'border-white/20 shadow-2xl'
      }`}>
        {/* Modal Header */}
        <div className="p-3.5 sm:p-6 bg-[#0b0c0d] border-b border-white/10">
          <div className="flex items-center justify-between gap-2 text-xs mb-3 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0">{match.leagueIcon || '🏆'}</span>
              <span className="font-mono font-bold uppercase tracking-wider text-[#ececed] truncate">{match.league}</span>
              <span className="opacity-40 hidden sm:inline">•</span>
              <span className="label opacity-70 hidden sm:inline">{match.round}</span>
            </div>

            <div className="flex items-center gap-2">
              {onOpenPredictions && (
                <button
                  onClick={() => {
                    onOpenPredictions(match);
                    onClose();
                  }}
                  id="btn-modal-open-predictions"
                  className="px-2.5 sm:px-3 py-1.5 bg-[#00ff88]/15 border border-[#00ff88] text-[#00ff88] font-mono text-xs uppercase font-bold transition hover:bg-[#00ff88] hover:text-[#0b0c0d] cursor-pointer flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,136,0.2)]"
                  title="Ver prognóstico detalhado da IA com Gemini"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PREVISÃO IA</span>
                </button>
              )}

              {onOpenCoachMode && (
                <button
                  onClick={() => {
                    onOpenCoachMode(match);
                    onClose();
                  }}
                  id="btn-modal-open-coach"
                  className="px-2.5 sm:px-3 py-1.5 bg-[#38bdf8]/15 border border-[#38bdf8] text-[#38bdf8] font-mono text-xs uppercase font-bold transition hover:bg-[#38bdf8] hover:text-[#0b0c0d] cursor-pointer flex items-center gap-1.5 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                  title="Assumir prancheta e comandar esta partida no Modo Treinador"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">TREINADOR</span>
                </button>
              )}

              <button
                onClick={() => onToggleFavorite(match.id)}
                className={`px-3 py-1.5 border font-mono text-xs uppercase transition cursor-pointer flex items-center gap-1.5 ${
                  isFavorite
                    ? 'bg-[#00ff88] border-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-[#141618] border-white/10 text-[#ececed]/60 hover:text-white'
                }`}
                title="Favoritar jogo"
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'NOTIFICANDO' : 'FAVORITAR'}</span>
              </button>

              <button
                onClick={onClose}
                id="btn-close-match-modal"
                className="p-1.5 bg-[#141618] border border-white/10 text-[#ececed]/60 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Goal Celebration Banner if goal was just simulated */}
          <ModalGoalBanner celebration={currentCelebration || null} currentMatchId={match.id} />

          {/* Quick "Where to Watch" header banner with platform icons */}
          <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-3 bg-[#141618] border border-white/10 text-[11px] font-mono mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tv className="w-3.5 h-3.5 text-[#00ff88]" />
              <span className="label opacity-75 uppercase font-bold text-[10px]">Onde Assistir:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {detailedBroadcasters.map((b) => (
                  <span
                    key={b.id}
                    className="bg-[#0b0c0d] border border-white/15 px-2 py-0.5 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm"
                    title={`${b.name} (${b.type}) - ${b.resolution}`}
                  >
                    <span>{b.logoIcon}</span>
                    <span>{b.shortName}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('broadcast')}
              id="btn-goto-broadcast-tab"
              className="text-[#00ff88] hover:underline text-[10px] font-bold cursor-pointer flex items-center gap-1"
            >
              <span>[Guia Completo &amp; Canais →]</span>
            </button>
          </div>

          {/* Teams and Big Scoreboard */}
          <div className="grid grid-cols-12 items-center gap-1.5 sm:gap-4 my-2">
            {/* Home Team */}
            <div className="col-span-4 sm:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
                {match.homeTeam.logoUrl ? (
                  <div className="w-10 h-10 sm:w-16 sm:h-16 p-1.5 sm:p-2 bg-[#141618] border border-white/10 flex items-center justify-center shrink-0">
                    <img
                      src={match.homeTeam.logoUrl}
                      alt={match.homeTeam.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-2xl sm:text-5xl p-1.5 sm:p-2 bg-[#141618] border border-white/10 shrink-0">
                    {match.homeTeam.badgeEmoji}
                  </span>
                )}
                <div className="min-w-0 truncate w-full">
                  <h3 className="font-['Syne'] font-extrabold text-xs sm:text-xl lg:text-2xl uppercase tracking-tight text-[#ececed] truncate">
                    {match.homeTeam.name}
                  </h3>
                  <button
                    onClick={() => onOpenTeamHistory(match.homeTeam.id)}
                    className="mt-0.5 sm:mt-1 label text-[#00ff88] opacity-100 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer text-[9px] sm:text-[10px]"
                  >
                    <Info className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">[HISTÓRIA &amp; PLANTEL]</span>
                    <span className="sm:hidden">Clube</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Score & Match Status */}
            <div className="col-span-4 sm:col-span-2 flex flex-col items-center justify-center shrink-0 px-1">
              {match.status === 'SCHEDULED' ? (
                <div className="text-center">
                  <span className="status-pill text-[10px] sm:text-xs">
                    {match.time}
                  </span>
                  <p className="label opacity-60 mt-1 text-[9px]">PRÉ-JOGO</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 sm:gap-3 text-3xl sm:text-5xl lg:text-6xl font-['Syne'] font-extrabold tracking-tighter">
                    <span
                      className={`transition-all duration-300 ${
                        isCelebrating && currentCelebration?.isHome
                          ? 'text-[#00ff88] scale-125 drop-shadow-[0_0_20px_rgba(0,255,136,0.9)] animate-pulse'
                          : match.homeScore > match.awayScore
                          ? 'text-[#00ff88]'
                          : 'text-white'
                      }`}
                    >
                      {match.homeScore}
                    </span>
                    <span className="opacity-30 text-2xl sm:text-4xl">-</span>
                    <span
                      className={`transition-all duration-300 ${
                        isCelebrating && !currentCelebration?.isHome
                          ? 'text-[#00ff88] scale-125 drop-shadow-[0_0_20px_rgba(0,255,136,0.9)] animate-pulse'
                          : match.awayScore > match.homeScore
                          ? 'text-[#00ff88]'
                          : 'text-white'
                      }`}
                    >
                      {match.awayScore}
                    </span>
                  </div>

                  {isLive ? (
                    <div className="flex flex-col items-center gap-1 mt-1 sm:mt-2 w-full max-w-[180px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping"></span>
                        <span className="status-pill text-[9px] sm:text-[10px] px-2 py-0.5">
                          {match.sport && match.sport !== 'futebol' ? (match.time || 'AO VIVO') : `${match.minute}' AO VIVO`}
                        </span>
                      </div>
                      {/* Progress bar only for football */}
                      {(!match.sport || match.sport === 'futebol') && (
                        <MatchMinuteProgressBar minute={match.minute} status={match.status} variant="compact" />
                      )}
                    </div>
                  ) : (
                    <span className="status-pill-muted text-[9px] sm:text-[10px] mt-1 sm:mt-2 px-2 py-0.5">
                      {match.sport === 'jiujitsu' || match.sport === 'judo' ? 'LUTA ENCERRADA' : 'FIM DE JOGO'}
                    </span>
                  )}

                  {/* Period / Sets summary pill */}
                  {match.periodScores && match.periodScores.length > 0 && (
                    <div className="mt-1.5 text-[10px] font-mono text-[#00ff88] bg-black/40 px-2 py-0.5 border border-white/10 rounded-xs text-center">
                      <span className="text-white/50 mr-1 text-[9px]">PARCIAIS:</span>
                      <span className="font-bold">{match.periodScores.slice(0, 3).join(' | ')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="col-span-4 sm:col-span-5 flex flex-col items-center sm:items-end text-center sm:text-right min-w-0">
              <div className="flex flex-col sm:flex-row-reverse items-center gap-2 sm:gap-3 w-full">
                {match.awayTeam.logoUrl ? (
                  <div className="w-10 h-10 sm:w-16 sm:h-16 p-1.5 sm:p-2 bg-[#141618] border border-white/10 flex items-center justify-center shrink-0">
                    <img
                      src={match.awayTeam.logoUrl}
                      alt={match.awayTeam.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-2xl sm:text-5xl p-1.5 sm:p-2 bg-[#141618] border border-white/10 shrink-0">
                    {match.awayTeam.badgeEmoji}
                  </span>
                )}
                <div className="min-w-0 truncate w-full">
                  <h3 className="font-['Syne'] font-extrabold text-xs sm:text-xl lg:text-2xl uppercase tracking-tight text-[#ececed] truncate">
                    {match.awayTeam.name}
                  </h3>
                  <button
                    onClick={() => onOpenTeamHistory(match.awayTeam.id)}
                    className="mt-0.5 sm:mt-1 label text-[#00ff88] opacity-100 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer text-[9px] sm:text-[10px]"
                  >
                    <Info className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">[HISTÓRIA &amp; PLANTEL]</span>
                    <span className="sm:hidden">Clube</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Extended Match Venue, Capacity & Current Weather Conditions Header */}
          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 font-mono text-xs text-[#ececed]">
            {/* Primary Venue & Weather Row */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              {/* Stadium Name & Official Capacity */}
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <div className="flex items-center gap-1.5 text-white font-bold bg-[#141618] px-2.5 py-1 border border-white/15 shadow-sm">
                  <span className="text-sm">🏟️</span>
                  <span className="truncate max-w-[210px] sm:max-w-[320px] text-xs" title={`${stadiumInfo.name} - ${stadiumInfo.city}`}>
                    {stadiumInfo.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 bg-[#0b0c0d] border border-white/10 text-[11px] text-[#00ff88]" title={`Capacidade máxima do estádio: ${stadiumInfo.capacityFormatted}`}>
                  <Users2 className="w-3 h-3 text-[#00ff88] shrink-0" />
                  <span className="opacity-75 uppercase text-[10px] hidden sm:inline">Capacidade:</span>
                  <span className="font-bold">{stadiumInfo.capacityFormatted}</span>
                </div>

                {stadiumInfo.surface && (
                  <span className="hidden md:inline-flex items-center text-[10px] text-[#ececed]/60 bg-[#141618] border border-white/10 px-2 py-1" title="Tipo de gramado">
                    🌱 {stadiumInfo.surface}
                  </span>
                )}
              </div>

              {/* Current Weather Conditions */}
              <div className="flex items-center gap-1.5 bg-[#141618] border border-white/15 px-2.5 py-1 text-xs shadow-sm">
                <Thermometer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-bold text-white text-[12px]">{weather.temp}°C</span>
                <span className="text-sm" title={weather.condition}>{weather.icon}</span>
                <span className="text-white font-semibold text-[11px]">{weather.condition}</span>
                {weather.skyState && (
                  <span className="hidden lg:inline text-[10px] text-[#ececed]/50 pl-1 border-l border-white/10" title="Condição climática detalhada">
                    {weather.skyState}
                  </span>
                )}
                {weather.humidity && (
                  <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-1.5 py-0.5 ml-1" title="Umidade Relativa do Ar">
                    <Droplets className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{weather.humidity}%</span>
                  </span>
                )}
                {weather.windSpeed && (
                  <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-white/70 bg-white/5 border border-white/10 px-1.5 py-0.5" title="Velocidade do Vento">
                    <Wind className="w-2.5 h-2.5 text-white/50" />
                    <span>{weather.windSpeed}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Venue City & Kickoff / Referee details */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#ececed]/60 pt-1 border-t border-white/5 gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#00ff88]/80" />
                <span>{stadiumInfo.city}</span>
                {stadiumInfo.openedYear && (
                  <span className="opacity-40 hidden sm:inline">• Inauguração: {stadiumInfo.openedYear}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span>📅 {match.date} • {match.time}</span>
                <span className="hidden sm:inline opacity-30">•</span>
                <span className="hidden sm:inline">⚖️ {referees.main}</span>
              </div>
            </div>
          </div>

          {/* Animated 90-Minute Match Progress Bar */}
          {isLive && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <MatchMinuteProgressBar minute={match.minute} status={match.status} variant="detailed" />
            </div>
          )}

          {/* Live Win Probability strip & simulation button */}
          {isLive && (
            <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
                <span className="label opacity-75 uppercase text-[10px] flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#00ff88]" />
                  Probabilidade (D3):
                </span>
                <span className="text-[#00ff88] font-bold">
                  {match.homeTeam.shortName || match.homeTeam.name.split(' ')[0]} {calculateWinProbability(match).homeWin}%
                </span>
                <span className="opacity-40">•</span>
                <span className="text-white font-bold">
                  Empate {calculateWinProbability(match).draw}%
                </span>
                <span className="opacity-40">•</span>
                <span className="text-[#38bdf8] font-bold">
                  {match.awayTeam.shortName || match.awayTeam.name.split(' ')[0]} {calculateWinProbability(match).awayWin}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('stats')}
                  className="text-[#00ff88] hover:underline text-[10px] cursor-pointer"
                >
                  [Gráfico D3 Detalhado ↓]
                </button>
                <button
                  onClick={() => onAddSimulatedGoal(match.id)}
                  className="btn-primary text-[11px] py-1 px-2.5 flex items-center gap-1.5 cursor-pointer"
                  title="Simular novo gol para testar probabilidades e notificações instantâneas"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Simular Gol</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-3 sm:px-6 bg-[#0b0c0d] border-b border-white/10 overflow-x-auto scrollbar-none touch-pan-x shrink-0">
          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('stats');
            }}
            id="tab-btn-stats"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ESTATÍSTICAS</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('momentum');
            }}
            id="tab-btn-momentum"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'momentum'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold bg-[#00ff88]/5'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>MOMENTUM (xG)</span>
            <span className="text-[9px] bg-[#00ff88]/20 text-[#00ff88] px-1 py-0.2 rounded-xs font-bold">
              RECHARTS
            </span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('timeline');
            }}
            id="tab-btn-timeline"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>LANCES ({match.events.length})</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('lineups');
            }}
            id="tab-btn-lineups"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'lineups'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>ESCALAÇÕES</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('injuries');
            }}
            id="tab-btn-injuries"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'injuries'
                ? 'border-b-2 border-amber-400 text-amber-400 font-bold bg-amber-400/5'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>INJURIES &amp; SUSPENSIONS ({totalMissing})</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('heatmap');
            }}
            id="tab-btn-heatmap"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'heatmap'
                ? 'border-b-2 border-orange-500 text-orange-400 font-bold bg-orange-500/5'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>MAPA DE CALOR</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('radar');
            }}
            id="tab-btn-radar"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'radar'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold bg-[#00ff88]/5'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>RADAR COMPETÊNCIAS</span>
            <span className="text-[9px] bg-[#00ff88]/20 text-[#00ff88] px-1 py-0.2 rounded-xs font-bold">
              RECHARTS
            </span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('broadcast');
            }}
            id="tab-btn-broadcast"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'broadcast'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>ONDE ASSISTIR</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTap();
              setActiveTab('h2h');
            }}
            id="tab-btn-h2h"
            className={`font-mono text-xs py-3 px-3 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'h2h'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold bg-[#00ff88]/5'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>CONFRONTOS DIRETOS (H2H)</span>
            <span className="text-[9px] bg-[#00ff88]/20 text-[#00ff88] px-1 py-0.2 rounded-xs font-bold">
              ÚLTIMOS 5
            </span>
          </button>
        </div>

        {/* Modal Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: ESTATÍSTICAS DETALHADAS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              {/* Specialized Multi-Sport Breakdown (Basquete, Hockey, Vôlei, Natação, Jiu-Jitsu, Judô, MMA, Tênis) */}
              <SportDetailBreakdown match={match} />

              {/* Win Probability Indicator with D3 */}
              <LiveWinProbabilityChart match={match} />

              {/* Match Momentum & Pressure Chart */}
              {(!match.sport || match.sport === 'futebol' || match.sport === 'hockey') && (
                <div className="space-y-2 pt-1">
                  <MatchMomentumChart match={match} />
                </div>
              )}

              {/* Visual Heatmap & Pressure Zones for football pitch */}
              {(!match.sport || match.sport === 'futebol') && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ececed]/80 pb-0.5">
                    <span className="flex items-center gap-1.5 font-bold text-white uppercase text-[11px]">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>Mapa de Calor &amp; Zonas de Pressão no Gramado</span>
                      <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 border border-orange-500/40">
                        SVG / D3
                      </span>
                    </span>
                    <button
                      onClick={() => setActiveTab('heatmap')}
                      id="btn-goto-heatmap-tab"
                      className="text-orange-400 hover:underline cursor-pointer text-[10px] font-bold"
                    >
                      [Aba Completa com Setores →]
                    </button>
                  </div>
                  <PitchHeatmap match={match} onSelectAthlete={onSelectAthlete} compact={true} />
                </div>
              )}

              <div className="bg-[#0b0c0d] p-4 sm:p-5 border border-white/10">
                <h4 className="label opacity-80 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#00ff88]">
                    <span className="w-2 h-2 bg-[#00ff88]"></span>
                    {match.homeTeam.name}
                  </span>
                  <span>MÉTRICAS OFICIAIS</span>
                  <span className="flex items-center gap-2 text-white">
                    {match.awayTeam.name}
                    <span className="w-2 h-2 bg-white/40"></span>
                  </span>
                </h4>

                <div className="space-y-1">
                  {renderStatBar('Posse de Bola', match.stats.possession[0], match.stats.possession[1], true, '%')}
                  {renderStatBar('Gols Esperados (xG)', match.stats.xG[0], match.stats.xG[1])}
                  {renderStatBar('Finalizações Totais', match.stats.shotsTotal[0], match.stats.shotsTotal[1])}
                  {renderStatBar('Finalizações no Alvo', match.stats.shotsOnTarget[0], match.stats.shotsOnTarget[1])}
                  {renderStatBar('Grandes Chances Criadas', match.stats.bigChances[0], match.stats.bigChances[1])}
                  {renderStatBar('Escanteios', match.stats.corners[0], match.stats.corners[1])}
                  {renderStatBar('Faltas Cometidas', match.stats.fouls[0], match.stats.fouls[1])}
                  {renderStatBar('Cartões Amarelos', match.stats.yellowCards[0], match.stats.yellowCards[1])}
                  {renderStatBar('Cartões Vermelhos', match.stats.redCards[0], match.stats.redCards[1])}
                  {renderStatBar('Total de Passes', match.stats.passesTotal[0], match.stats.passesTotal[1])}
                  {renderStatBar('Precisão dos Passes', match.stats.passAccuracy[0], match.stats.passAccuracy[1], true, '%')}
                  {renderStatBar('Defesas do Goleiro', match.stats.goalkeeperSaves[0], match.stats.goalkeeperSaves[1])}
                </div>
              </div>

              {/* Radar Chart comparing Ataque, Defesa, Disciplina, Criação with Recharts */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#ececed]/80 pb-1">
                  <span className="flex items-center gap-1.5 font-bold text-white uppercase text-[11px]">
                    <Compass className="w-4 h-4 text-[#00ff88]" />
                    <span>Radar de Competências (Recharts): Ataque, Defesa, Disciplina e Criação</span>
                    <span className="text-[9px] bg-[#00ff88]/20 text-[#00ff88] px-1.5 py-0.5 border border-[#00ff88]/40">
                      RECHARTS
                    </span>
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setActiveTab('radar');
                    }}
                    id="btn-goto-radar-tab"
                    className="text-[#00ff88] hover:underline cursor-pointer text-[10px] font-bold"
                  >
                    [Aba Radar Completa →]
                  </button>
                </div>
                <TeamRadarChart match={match} />
              </div>

              {/* Quick Head-to-Head 5 Matches Teaser */}
              <div className="bg-[#0b0c0d] p-3.5 sm:p-4 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[#ececed]/80">
                  <span className="flex items-center gap-1.5 font-bold text-white uppercase text-[11px]">
                    <History className="w-4 h-4 text-[#00ff88]" />
                    <span>Confrontos Diretos Recentes (Últimos 5 Jogos)</span>
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playTap();
                      setActiveTab('h2h');
                    }}
                    id="btn-goto-h2h-tab-from-stats"
                    className="text-[#00ff88] hover:underline cursor-pointer text-[10px] font-bold"
                  >
                    [Ver Histórico dos 5 Jogos →]
                  </button>
                </div>
                <p className="text-[11px] text-[#ececed]/60 font-sans">
                  Retrospecto direto entre {match.homeTeam.name} e {match.awayTeam.name} nas últimas 5 partidas oficiais com placares, autores dos gols e estatísticas.
                </p>
              </div>
            </div>
          )}

          {/* TAB: MOMENTUM E GOLS ESPERADOS (RECHARTS) */}
          {activeTab === 'momentum' && (
            <div className="space-y-4">
              <MatchMomentumChart match={match} />

              {/* In-depth tactical Momentum Analysis Card */}
              <div className="bg-[#0b0c0d] border border-white/10 p-4 sm:p-5 font-mono space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                    <span className="font-['Syne'] font-extrabold text-sm uppercase text-white">
                      Análise de Eficiência xG &amp; Padrões de Pressão
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50 uppercase">Métricas Analíticas</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#141618] border border-white/10 p-3 space-y-1">
                    <span className="text-[10px] text-white/50 uppercase block">Eficiência por Finalização</span>
                    <div className="text-sm font-bold text-white">
                      {(match.stats.xG[0] / Math.max(match.stats.shotsTotal[0], 1)).toFixed(2)} xG/chute ({match.homeTeam.shortName})
                    </div>
                    <div className="text-sm font-bold text-[#38bdf8]">
                      {(match.stats.xG[1] / Math.max(match.stats.shotsTotal[1], 1)).toFixed(2)} xG/chute ({match.awayTeam.shortName})
                    </div>
                  </div>

                  <div className="bg-[#141618] border border-white/10 p-3 space-y-1">
                    <span className="text-[10px] text-white/50 uppercase block">Grandes Chances Criadas</span>
                    <div className="text-sm font-bold text-white">
                      {match.homeScore} gols em {match.stats.bigChances[0]} chances ({match.homeTeam.shortName})
                    </div>
                    <div className="text-sm font-bold text-[#38bdf8]">
                      {match.awayScore} gols em {match.stats.bigChances[1]} chances ({match.awayTeam.shortName})
                    </div>
                  </div>

                  <div className="bg-[#141618] border border-white/10 p-3 space-y-1">
                    <span className="text-[10px] text-white/50 uppercase block">Período de Maior Risco</span>
                    <div className="text-xs text-[#00ff88] font-bold">
                      {match.stats.xG[0] >= match.stats.xG[1] ? `${match.homeTeam.shortName} dominou o volume ofensivo` : `${match.awayTeam.shortName} criou chances mais agudas`}
                    </div>
                    <div className="text-[10px] text-white/60">
                      Calculado através da densidade de xG gerado na partida
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LINHA DO TEMPO (LANCES) INTERATIVA COM FILTROS */}
          {activeTab === 'timeline' && (
            <InteractiveTimeline match={match} onSelectAthlete={onSelectAthlete} />
          )}

          {/* TAB 3: ESCALAÇÕES, CAMPO TÁTICO & DESFALQUES */}
          {activeTab === 'lineups' && (
            <div className="space-y-6">
              <div className="bg-[#0b0c0d] p-3 border border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#00ff88] font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Dica: Clique no nome de qualquer atleta para ver perfil e estatísticas completas</span>
                </span>
              </div>

              {/* Tactical Pitch 2D */}
              <div className="bg-[#0b0c0d] border border-white/20 p-4 relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[380px]">
                  {/* Home Team Side */}
                  <div className="bg-[#141618] p-3 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{match.homeTeam.badgeEmoji}</span>
                        <span className="font-bold text-[#ececed] text-xs uppercase">{match.homeTeam.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#00ff88] bg-[#0b0c0d] px-2 py-0.5 border border-white/10">
                        {match.lineupHome.formation}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 py-3 text-xs font-mono">
                      {match.lineupHome.starters.map((player) => (
                        <div
                          key={player.number}
                          onClick={() => onSelectAthlete && onSelectAthlete(player.name)}
                          className="flex items-center justify-between py-1.5 px-2 bg-[#0b0c0d] hover:bg-[#1a1e22] border border-white/5 hover:border-[#00ff88]/50 text-[#ececed] transition cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 text-center font-bold text-[#00ff88] text-[11px]">
                              {player.number}
                            </span>
                            <span className="truncate font-medium group-hover:text-[#00ff88] transition">{player.name}</span>
                            {player.captain && (
                              <span className="text-[9px] bg-amber-500 text-black font-bold px-1">C</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#ececed]/40">{player.position}</span>
                            {player.rating && (
                              <span className="text-xs font-bold text-[#00ff88]">
                                {player.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="label opacity-70 pt-2 border-t border-white/10 font-mono text-xs">
                      TÉCNICO: <strong className="text-[#ececed]">{match.lineupHome.coach}</strong>
                    </p>
                  </div>

                  {/* Away Team Side */}
                  <div className="bg-[#141618] p-3 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{match.awayTeam.badgeEmoji}</span>
                        <span className="font-bold text-[#ececed] text-xs uppercase">{match.awayTeam.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#ececed] bg-[#0b0c0d] px-2 py-0.5 border border-white/10">
                        {match.lineupAway.formation}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 py-3 text-xs font-mono">
                      {match.lineupAway.starters.map((player) => (
                        <div
                          key={player.number}
                          onClick={() => onSelectAthlete && onSelectAthlete(player.name)}
                          className="flex items-center justify-between py-1.5 px-2 bg-[#0b0c0d] hover:bg-[#1a1e22] border border-white/5 hover:border-[#00ff88]/50 text-[#ececed] transition cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 text-center font-bold text-[#ececed]/70 text-[11px]">
                              {player.number}
                            </span>
                            <span className="truncate font-medium group-hover:text-[#00ff88] transition">{player.name}</span>
                            {player.captain && (
                              <span className="text-[9px] bg-amber-500 text-black font-bold px-1">C</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#ececed]/40">{player.position}</span>
                            {player.rating && (
                              <span className="text-xs font-bold text-[#ececed]">
                                {player.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="label opacity-70 pt-2 border-t border-white/10 font-mono text-xs">
                      TÉCNICO: <strong className="text-[#ececed]">{match.lineupAway.coach}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Substitutes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <h5 className="label opacity-80 mb-2 font-bold text-xs uppercase">
                    BANCO DE RESERVAS ({match.homeTeam.shortName}):
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {match.lineupHome.substitutes.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectAthlete && onSelectAthlete(sub.split('(')[0].trim())}
                        className="bg-[#141618] hover:bg-[#1a1e22] hover:border-[#00ff88]/50 border border-white/10 px-2 py-1 text-xs text-[#ececed] font-mono cursor-pointer transition text-left"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <h5 className="label opacity-80 mb-2 font-bold text-xs uppercase">
                    BANCO DE RESERVAS ({match.awayTeam.shortName}):
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {match.lineupAway.substitutes.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectAthlete && onSelectAthlete(sub.split('(')[0].trim())}
                        className="bg-[#141618] hover:bg-[#1a1e22] hover:border-[#00ff88]/50 border border-white/10 px-2 py-1 text-xs text-[#ececed] font-mono cursor-pointer transition text-left"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Link to Injuries & Suspensions Tab */}
              <div className="bg-[#0b0c0d] p-4 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2.5 text-amber-400">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-bold uppercase tracking-tight text-white">
                      {totalMissing} Jogadores Indisponíveis para este confronto
                    </p>
                    <p className="text-[11px] text-[#ececed]/70 font-sans">
                      {homeMissing.length} do {match.homeTeam.name} e {awayMissing.length} do {match.awayTeam.name} (lesões, suspensões e dúvidas).
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('injuries')}
                  className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 text-amber-300 font-bold text-xs uppercase transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  <span>Abrir Boletim de Desfalques →</span>
                </button>
              </div>

              {/* Equipe de Arbitragem Completa */}
              <div className="bg-[#0b0c0d] p-4 border border-white/10 space-y-2 font-mono text-xs">
                <h5 className="label opacity-80 uppercase font-bold text-[10px] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>EQUIPE DE ARBITRAGEM OFICIAL (FIFA / CBF)</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="bg-[#141618] p-2 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Árbitro Central:</span>
                    <p className="text-white font-bold">{referees.main}</p>
                  </div>
                  <div className="bg-[#141618] p-2 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Assistente 1:</span>
                    <p className="text-[#ececed]">{referees.assistant1}</p>
                  </div>
                  <div className="bg-[#141618] p-2 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Assistente 2:</span>
                    <p className="text-[#ececed]">{referees.assistant2}</p>
                  </div>
                  <div className="bg-[#141618] p-2 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Quarto Árbitro:</span>
                    <p className="text-[#ececed]">{referees.fourthOfficial}</p>
                  </div>
                  <div className="bg-[#141618] p-2 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Árbitro de Vídeo (VAR):</span>
                    <p className="text-[#00ff88] font-bold">{referees.varReferee}</p>
                  </div>
                  <div className="bg-[#141618] p-2 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Assistente VAR (AVAR):</span>
                    <p className="text-[#ececed]">{referees.avar}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INJURIES & SUSPENSIONS */}
          {activeTab === 'injuries' && (
            <div className="space-y-6 font-mono text-xs">
              {/* Header card with summary counts */}
              <div className="bg-[#0b0c0d] p-4 sm:p-5 border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-amber-950/60 border border-amber-500/40 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-['Syne'] font-extrabold text-sm sm:text-base text-white uppercase tracking-tight">
                        Injuries &amp; Suspensions (Boletim Médico)
                      </h4>
                      <p className="text-[11px] text-[#ececed]/60 font-sans">
                        Relatório detalhado de atletas vetados e suspensos para {match.homeTeam.name} vs {match.awayTeam.name}
                      </p>
                    </div>
                  </div>

                  <span className="status-pill text-[10px] self-start sm:self-auto border-amber-500/30 text-amber-400 bg-amber-950/30">
                    {totalMissing} ATLETAS INDISPONÍVEIS
                  </span>
                </div>

                {/* 4 Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-60 text-[9px] uppercase">Total Indisponíveis</span>
                    <p className="text-xl font-bold text-white mt-0.5">{totalMissing}</p>
                    <span className="text-[10px] text-[#ececed]/50">ambas as equipes</span>
                  </div>

                  <div className="bg-[#141618] p-3 border border-red-500/20 bg-red-950/10">
                    <span className="label text-red-400 opacity-90 text-[9px] uppercase flex items-center gap-1">
                      <Stethoscope className="w-3 h-3" />
                      Lesões Confirmadas
                    </span>
                    <p className="text-xl font-bold text-red-400 mt-0.5">{countInjuries}</p>
                    <span className="text-[10px] text-red-400/60">em tratamento clínico</span>
                  </div>

                  <div className="bg-[#141618] p-3 border border-amber-500/20 bg-amber-950/10">
                    <span className="label text-amber-400 opacity-90 text-[9px] uppercase flex items-center gap-1">
                      <UserMinus className="w-3 h-3" />
                      Suspensões
                    </span>
                    <p className="text-xl font-bold text-amber-400 mt-0.5">{countSuspensions}</p>
                    <span className="text-[10px] text-amber-400/60">por cartões / súmula</span>
                  </div>

                  <div className="bg-[#141618] p-3 border border-blue-500/20 bg-blue-950/10">
                    <span className="label text-sky-400 opacity-90 text-[9px] uppercase flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Dúvidas / Transição
                    </span>
                    <p className="text-xl font-bold text-sky-400 mt-0.5">{countDoubts}</p>
                    <span className="text-[10px] text-sky-400/60">teste no vestiário</span>
                  </div>
                </div>

                {/* Absence Balance Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
                    <span className="text-[#00ff88] flex items-center gap-1.5">
                      {match.homeTeam.badgeEmoji} {match.homeTeam.name}: {homeMissing.length} ausências
                    </span>
                    <span className="text-white flex items-center gap-1.5">
                      {match.awayTeam.name}: {awayMissing.length} ausências {match.awayTeam.badgeEmoji}
                    </span>
                  </div>
                  <div className="flex h-2 w-full bg-[#141618] border border-white/10 overflow-hidden">
                    <div
                      className="bg-[#00ff88] transition-all duration-500"
                      style={{ width: `${totalMissing > 0 ? (homeMissing.length / totalMissing) * 100 : 50}%` }}
                    />
                    <div
                      className="bg-white/40 transition-all duration-500"
                      style={{ width: `${totalMissing > 0 ? (awayMissing.length / totalMissing) * 100 : 50}%` }}
                    />
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                    <button
                      onClick={() => setInjuryFilter('ALL')}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                        injuryFilter === 'ALL'
                          ? 'bg-white text-black border-white'
                          : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white'
                      }`}
                    >
                      Todos ({totalMissing})
                    </button>
                    <button
                      onClick={() => setInjuryFilter('injury')}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                        injuryFilter === 'injury'
                          ? 'bg-red-900 text-red-200 border-red-500'
                          : 'bg-[#141618] text-red-400/80 border-red-900/40 hover:text-red-300'
                      }`}
                    >
                      🩹 Lesões ({countInjuries})
                    </button>
                    <button
                      onClick={() => setInjuryFilter('suspension')}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                        injuryFilter === 'suspension'
                          ? 'bg-amber-900 text-amber-200 border-amber-500'
                          : 'bg-[#141618] text-amber-400/80 border-amber-900/40 hover:text-amber-300'
                      }`}
                    >
                      🟨 Suspensões ({countSuspensions})
                    </button>
                    <button
                      onClick={() => setInjuryFilter('doubt')}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                        injuryFilter === 'doubt'
                          ? 'bg-sky-900 text-sky-200 border-sky-500'
                          : 'bg-[#141618] text-sky-400/80 border-sky-900/40 hover:text-sky-300'
                      }`}
                    >
                      ❓ Dúvidas ({countDoubts})
                    </button>
                  </div>

                  <div className="relative min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={injurySearch}
                      onChange={(e) => setInjurySearch(e.target.value)}
                      placeholder="Buscar atleta ou lesão..."
                      className="w-full bg-[#141618] border border-white/10 pl-8 pr-3 py-1 text-[11px] text-white focus:outline-none focus:border-[#00ff88]"
                    />
                  </div>
                </div>
              </div>

              {/* Two Column Team Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Home Team Card */}
                <div className="bg-[#0b0c0d] border border-white/15 flex flex-col">
                  {/* Home Team Header */}
                  <div className="p-3.5 bg-[#141618] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 truncate">
                      {match.homeTeam.logoUrl ? (
                        <img
                          src={match.homeTeam.logoUrl}
                          alt={match.homeTeam.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-lg">{match.homeTeam.badgeEmoji}</span>
                      )}
                      <div className="truncate">
                        <h5 className="font-bold text-white text-xs uppercase truncate">
                          {match.homeTeam.name}
                        </h5>
                        <span className="text-[10px] text-[#00ff88]">MANDANTE</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#0b0c0d] border border-white/10 text-[10px] text-white font-mono font-bold shrink-0">
                      {filteredHomeMissing.length} listados
                    </span>
                  </div>

                  {/* List of unavailable home players */}
                  <div className="p-3.5 space-y-2.5 flex-1">
                    {filteredHomeMissing.length === 0 ? (
                      <div className="py-8 text-center text-[#ececed]/40 text-xs">
                        Nenhum jogador encontrado com os filtros atuais para o {match.homeTeam.name}.
                      </div>
                    ) : (
                      filteredHomeMissing.map((player, idx) => (
                        <div
                          key={idx}
                          className="bg-[#141618] p-3 border border-white/10 hover:border-white/25 transition space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {player.number ? (
                                <span className="w-6 h-6 bg-[#0b0c0d] border border-white/10 text-[#00ff88] font-bold text-[11px] flex items-center justify-center shrink-0">
                                  {player.number}
                                </span>
                              ) : null}
                              <div>
                                <button
                                  onClick={() => onSelectAthlete && onSelectAthlete(player.name)}
                                  className="font-bold text-white hover:text-[#00ff88] text-xs transition cursor-pointer text-left flex items-center gap-1.5"
                                >
                                  <span>{player.name}</span>
                                  {onSelectAthlete && (
                                    <span className="text-[9px] text-[#00ff88]/70 hover:underline">[Ficha]</span>
                                  )}
                                </button>
                                <span className="text-[10px] text-[#ececed]/50 font-mono">
                                  Posição: {player.position || 'Não informada'}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <span
                                className={`text-[9px] px-2 py-0.5 uppercase font-bold border ${
                                  player.type === 'injury'
                                    ? 'bg-red-950/80 text-red-400 border-red-800'
                                    : player.type === 'suspension'
                                    ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                    : 'bg-blue-950/80 text-blue-400 border-blue-800'
                                }`}
                              >
                                {player.type === 'injury' ? '🩹 Lesão' : player.type === 'suspension' ? '🟨 Suspensão' : '❓ Dúvida'}
                              </span>
                              {player.importance && (
                                <span className={`text-[8px] font-bold uppercase ${
                                  player.importance === 'Crucial' ? 'text-amber-400' : 'text-[#ececed]/60'
                                }`}>
                                  {player.importance === 'Crucial' ? '★ Peça Chave' : player.importance}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="bg-[#0b0c0d] p-2 border border-white/5 space-y-1 text-[11px]">
                            <div className="flex items-start gap-1.5 text-[#ececed]/80">
                              <Stethoscope className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                              <p className="leading-tight">{player.reason}</p>
                            </div>
                            {player.expectedReturn && (
                              <div className="flex items-center gap-1.5 text-[10px] text-amber-300/80 pt-0.5">
                                <span>📅 Previsão:</span>
                                <strong>{player.expectedReturn}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Away Team Card */}
                <div className="bg-[#0b0c0d] border border-white/15 flex flex-col">
                  {/* Away Team Header */}
                  <div className="p-3.5 bg-[#141618] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 truncate">
                      {match.awayTeam.logoUrl ? (
                        <img
                          src={match.awayTeam.logoUrl}
                          alt={match.awayTeam.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-lg">{match.awayTeam.badgeEmoji}</span>
                      )}
                      <div className="truncate">
                        <h5 className="font-bold text-white text-xs uppercase truncate">
                          {match.awayTeam.name}
                        </h5>
                        <span className="text-[10px] text-[#38bdf8]">VISITANTE</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#0b0c0d] border border-white/10 text-[10px] text-white font-mono font-bold shrink-0">
                      {filteredAwayMissing.length} listados
                    </span>
                  </div>

                  {/* List of unavailable away players */}
                  <div className="p-3.5 space-y-2.5 flex-1">
                    {filteredAwayMissing.length === 0 ? (
                      <div className="py-8 text-center text-[#ececed]/40 text-xs">
                        Nenhum jogador encontrado com os filtros atuais para o {match.awayTeam.name}.
                      </div>
                    ) : (
                      filteredAwayMissing.map((player, idx) => (
                        <div
                          key={idx}
                          className="bg-[#141618] p-3 border border-white/10 hover:border-white/25 transition space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {player.number ? (
                                <span className="w-6 h-6 bg-[#0b0c0d] border border-white/10 text-[#38bdf8] font-bold text-[11px] flex items-center justify-center shrink-0">
                                  {player.number}
                                </span>
                              ) : null}
                              <div>
                                <button
                                  onClick={() => onSelectAthlete && onSelectAthlete(player.name)}
                                  className="font-bold text-white hover:text-[#00ff88] text-xs transition cursor-pointer text-left flex items-center gap-1.5"
                                >
                                  <span>{player.name}</span>
                                  {onSelectAthlete && (
                                    <span className="text-[9px] text-[#00ff88]/70 hover:underline">[Ficha]</span>
                                  )}
                                </button>
                                <span className="text-[10px] text-[#ececed]/50 font-mono">
                                  Posição: {player.position || 'Não informada'}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <span
                                className={`text-[9px] px-2 py-0.5 uppercase font-bold border ${
                                  player.type === 'injury'
                                    ? 'bg-red-950/80 text-red-400 border-red-800'
                                    : player.type === 'suspension'
                                    ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                    : 'bg-blue-950/80 text-blue-400 border-blue-800'
                                }`}
                              >
                                {player.type === 'injury' ? '🩹 Lesão' : player.type === 'suspension' ? '🟨 Suspensão' : '❓ Dúvida'}
                              </span>
                              {player.importance && (
                                <span className={`text-[8px] font-bold uppercase ${
                                  player.importance === 'Crucial' ? 'text-amber-400' : 'text-[#ececed]/60'
                                }`}>
                                  {player.importance === 'Crucial' ? '★ Peça Chave' : player.importance}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="bg-[#0b0c0d] p-2 border border-white/5 space-y-1 text-[11px]">
                            <div className="flex items-start gap-1.5 text-[#ececed]/80">
                              <Stethoscope className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                              <p className="leading-tight">{player.reason}</p>
                            </div>
                            {player.expectedReturn && (
                              <div className="flex items-center gap-1.5 text-[10px] text-amber-300/80 pt-0.5">
                                <span>📅 Previsão:</span>
                                <strong>{player.expectedReturn}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Official Source & Disclaimer Card */}
              <div className="bg-[#0b0c0d] p-3.5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#ececed]/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00ff88] shrink-0" />
                  <span>
                    Fonte: Boletins médicos oficiais dos clubes, súmulas de arbitragem e comunicados das federações.
                  </span>
                </div>
                <span className="text-[10px] opacity-50 shrink-0">
                  Atualizado em tempo real para a rodada
                </span>
              </div>
            </div>
          )}

          {/* TAB: MAPA DE CALOR & ZONAS DE AÇÃO (PITCH HEATMAP) */}
          {activeTab === 'heatmap' && (
            <PitchHeatmap match={match} onSelectAthlete={onSelectAthlete} />
          )}

          {/* TAB: RADAR TÁTICO COMPARATIVO (SPIDER / RADAR CHART) */}
          {activeTab === 'radar' && (
            <div className="space-y-4">
              <TeamRadarChart match={match} />
            </div>
          )}

          {/* TAB: ONDE ASSISTIR (WHERE TO WATCH SECTION) */}
          {activeTab === 'broadcast' && (
            <WhereToWatchSection match={match} />
          )}

          {/* TAB 5: HISTÓRICO DE CONFRONTOS DIRETOS (H2H - ÚLTIMAS 5 PARTIDAS) */}
          {activeTab === 'h2h' && (
            <HeadToHeadHistorySection match={match} onSelectAthlete={onSelectAthlete} />
          )}
        </div>
      </div>
    </div>
  );
};
