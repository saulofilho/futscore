import React, { useState, useMemo } from 'react';
import { Match, SportType } from '../types';
import { MatchCard } from './MatchCard';
import { MatchCalendar } from './MatchCalendar';
import { getMatchBroadcast } from '../utils/footballMatchEnhancers';
import { SPORTS_CATEGORIES } from '../data/multiSportsData';
import { Star, Sparkles, Tv, Filter, Sliders, Heart, Crown, Globe } from 'lucide-react';
import { TEAMS_DATA } from '../data/teamsData';

interface MatchesViewProps {
  matches: Match[];
  favoriteMatchIds: string[];
  onToggleFavorite: (matchId: string) => void;
  onSelectMatch: (match: Match) => void;
  onOpenTeamHistory: (teamId: string) => void;
  onSimulateEvent: () => void;
  onNavigateToPredictions?: () => void;
  onNavigateToCoach?: (match?: Match) => void;
  primaryFavoriteTeamId?: string;
  favoriteTeamIds?: string[];
  onOpenFavoriteTeamSelector?: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  favoriteMatchIds,
  onToggleFavorite,
  onSelectMatch,
  onOpenTeamHistory,
  onSimulateEvent,
  onNavigateToPredictions,
  onNavigateToCoach,
  primaryFavoriteTeamId,
  favoriteTeamIds = [],
  onOpenFavoriteTeamSelector,
}) => {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [selectedSport, setSelectedSport] = useState<SportType | 'todos'>('todos');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'FINISHED' | 'SCHEDULED' | 'FAVORITES'>('ALL');
  const [leagueFilter, setLeagueFilter] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [broadcastFilter, setBroadcastFilter] = useState<string>('ALL');

  const primaryFavoriteTeam = useMemo(() => {
    const targetId = primaryFavoriteTeamId || (favoriteTeamIds && favoriteTeamIds[0]);
    if (!targetId) return null;
    const cleanId = targetId.toLowerCase();
    if (TEAMS_DATA[cleanId]) return TEAMS_DATA[cleanId];
    const found = Object.values(TEAMS_DATA).find(t => 
      t.id.toLowerCase() === cleanId || 
      t.name.toLowerCase() === cleanId
    );
    if (found) return found;
    for (const m of matches) {
      if ((m.homeTeam.id || '').toLowerCase() === cleanId || m.homeTeam.name.toLowerCase().includes(cleanId)) {
        return {
          id: targetId,
          name: m.homeTeam.name,
          popularName: m.homeTeam.shortName,
          badgeEmoji: m.homeTeam.badgeEmoji || '⚽',
        } as any;
      }
      if ((m.awayTeam.id || '').toLowerCase() === cleanId || m.awayTeam.name.toLowerCase().includes(cleanId)) {
        return {
          id: targetId,
          name: m.awayTeam.name,
          popularName: m.awayTeam.shortName,
          badgeEmoji: m.awayTeam.badgeEmoji || '⚽',
        } as any;
      }
    }
    return {
      id: targetId,
      name: targetId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      popularName: targetId.split('_')[0].toUpperCase(),
      badgeEmoji: '⚽',
    } as any;
  }, [primaryFavoriteTeamId, favoriteTeamIds, matches]);

  const filteredMatches = matches.filter(match => {
    // Sport Filter
    if (selectedSport !== 'todos') {
      const matchSport = match.sport || 'futebol';
      if (matchSport !== selectedSport) return false;
    }

    // Date Filter
    if (selectedDate !== 'ALL') {
      const matchDateIso = match.dateIso || (match.date === 'Hoje' ? todayIso : match.date);
      if (matchDateIso !== selectedDate) return false;
    }

    // Status Filter
    if (statusFilter === 'LIVE' && match.status !== 'LIVE') return false;
    if (statusFilter === 'FINISHED' && match.status !== 'FINISHED') return false;
    if (statusFilter === 'SCHEDULED' && match.status !== 'SCHEDULED') return false;
    if (statusFilter === 'FAVORITES') {
      const isFavMatch = favoriteMatchIds.includes(match.id);
      const isFavTeam = (favoriteTeamIds && favoriteTeamIds.some(tId => {
        const homeM = (match.homeTeam.id || '').toLowerCase() === tId.toLowerCase() || match.homeTeam.name.toLowerCase().includes(tId.toLowerCase());
        const awayM = (match.awayTeam.id || '').toLowerCase() === tId.toLowerCase() || match.awayTeam.name.toLowerCase().includes(tId.toLowerCase());
        return homeM || awayM;
      })) || (primaryFavoriteTeamId && (
        (match.homeTeam.id || '').toLowerCase() === primaryFavoriteTeamId.toLowerCase() || 
        (match.awayTeam.id || '').toLowerCase() === primaryFavoriteTeamId.toLowerCase() ||
        match.homeTeam.name.toLowerCase().includes(primaryFavoriteTeamId.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(primaryFavoriteTeamId.toLowerCase())
      ));
      if (!isFavMatch && !isFavTeam) return false;
    }

    // League Filter
    if (leagueFilter !== 'ALL' && !match.league.toLowerCase().includes(leagueFilter.toLowerCase())) {
      return false;
    }

    // Broadcast Filter
    if (broadcastFilter !== 'ALL') {
      const bcasts = getMatchBroadcast(match).map(b => b.toLowerCase());
      const target = broadcastFilter.toLowerCase();
      const hasChannel = bcasts.some(b => b.includes(target));
      if (!hasChannel) return false;
    }

    return true;
  });

  const sportCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: matches.length };
    const liveCounts: Record<string, number> = { todos: 0 };
    SPORTS_CATEGORIES.forEach(c => {
      counts[c.id] = 0;
      liveCounts[c.id] = 0;
    });

    matches.forEach(m => {
      const s = m.sport || 'futebol';
      counts[s] = (counts[s] || 0) + 1;
      if (m.status === 'LIVE') {
        liveCounts[s] = (liveCounts[s] || 0) + 1;
        liveCounts.todos++;
      }
    });

    return { counts, liveCounts };
  }, [matches]);

  const getSportLeagues = (sport: SportType | 'todos') => {
    switch (sport) {
      case 'basquete':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'NBA', val: 'NBA' },
          { label: 'NBB BRASIL', val: 'NBB' },
          { label: 'EUROLEAGUE', val: 'EuroLeague' },
        ];
      case 'hockey':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'NHL STANLEY CUP', val: 'NHL' },
          { label: 'MUNDIAL IIHF', val: 'IIHF' },
        ];
      case 'volei':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'SUPERLIGA MASC.', val: 'Superliga Bet7k' },
          { label: 'SUPERLIGA FEM.', val: 'Superliga Feminina' },
          { label: 'VNL / LIGA DAS NAÇÕES', val: 'VNL' },
        ];
      case 'natacao':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'MUNDIAL AQUATICS', val: 'Mundial' },
          { label: '50M LIVRE', val: '50m' },
          { label: '400M MEDLEY', val: '400m' },
        ];
      case 'jiujitsu':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'IBJJF WORLD', val: 'IBJJF' },
          { label: 'ADCC SUBMISSION', val: 'ADCC' },
        ];
      case 'judo':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'GRAND SLAM PARIS', val: 'Paris' },
          { label: 'MUNDIAL IJF', val: 'Mundial' },
        ];
      case 'mma':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'UFC 315', val: 'UFC' },
          { label: 'PFL', val: 'PFL' },
        ];
      case 'tenis':
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'ROLAND GARROS', val: 'Roland' },
          { label: 'ATP / WTA', val: 'ATP' },
        ];
      default:
        return [
          { label: 'TODAS', val: 'ALL' },
          { label: 'BRASILEIRÃO', val: 'Brasileirão' },
          { label: 'CHAMPIONS', val: 'Champions' },
          { label: 'PREMIER LEAGUE', val: 'Premier' },
          { label: 'LA LIGA', val: 'La Liga' },
          { label: 'LIBERTADORES', val: 'Libertadores' },
        ];
    }
  };

  const liveCount = matches.filter(m => m.status === 'LIVE').length;
  const finishedCount = matches.filter(m => m.status === 'FINISHED').length;
  const scheduledCount = matches.filter(m => m.status === 'SCHEDULED').length;
  const favCount = favoriteMatchIds.length;

  const recentFinishedMatches = matches.filter(m => m.status === 'FINISHED').slice(0, 3);
  const availableDates = Array.from(new Set(matches.map(m => m.dateIso).filter(Boolean))).sort();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
      {/* Main Section */}
      <section className="min-w-0 w-full">
        <div className="mb-4 sm:mb-6">
          <div className="label text-[#00ff88] opacity-100 font-bold mb-1.5 flex items-center gap-1.5">
            <span>[01] COBERTURA MULTIESPORTIVA</span>
            <span className="text-[10px] bg-[#00ff88]/20 text-[#00ff88] px-1.5 py-0.2 border border-[#00ff88]/40">
              NOVO
            </span>
          </div>
          <h1 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#ececed] leading-none mb-2 sm:mb-3">
            Placares &amp; Estatísticas Ao Vivo
          </h1>
          <p className="text-xs sm:text-sm text-[#ececed]/60 max-w-xl leading-relaxed">
            Navegue entre futebol, basquete (NBA/NBB), hóquei no gelo (NHL), vôlei (Superliga), natação, jiu-jitsu, judô, MMA e tênis em tempo real.
          </p>
        </div>

        {/* Multi-Sports Horizontal Category Bar */}
        <div className="mb-5 bg-[#0b0c0d] border border-white/10 p-2 sm:p-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#ececed]/60 mb-2 px-1">
            <span className="uppercase font-bold text-white flex items-center gap-1.5">
              <span>⚡</span>
              <span>Escolha a Modalidade Esportiva:</span>
            </span>
            <span className="text-[10px] text-[#00ff88]">
              {selectedSport === 'todos' ? 'Todas as modalidades' : SPORTS_CATEGORIES.find(s => s.id === selectedSport)?.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none touch-pan-x pb-1 shrink-0">
            {SPORTS_CATEGORIES.map(cat => {
              const count = sportCounts.counts[cat.id] ?? 0;
              const liveInSport = sportCounts.liveCounts[cat.id] ?? 0;
              const isSelected = selectedSport === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedSport(cat.id);
                    setLeagueFilter('ALL');
                  }}
                  id={`btn-sport-${cat.id}`}
                  className={`px-3 py-2 border transition font-mono text-xs flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                      : 'bg-white/5 border-white/10 text-[#ececed]/80 hover:text-white hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-base">{cat.iconEmoji}</span>
                  <span className="uppercase font-bold tracking-tight">{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-xs font-bold ${
                      isSelected ? 'bg-black/20 text-[#0b0c0d]' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {count}
                  </span>

                  {liveInSport > 0 && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 font-black uppercase animate-pulse flex items-center gap-1 ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      {liveInSport} AO VIVO
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Match Calendar Component */}
        <MatchCalendar
          matches={filteredMatches.length > 0 ? matches : matches}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Mobile Filter Bars */}
        <div className="lg:hidden space-y-2.5 mb-5">
          {/* Mobile Sports Filter Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none touch-pan-x pb-1 shrink-0">
            <span className="label opacity-70 text-[9px] flex items-center gap-1 mr-1 shrink-0 text-[#00ff88]">
              <span>🏆</span>
              <span>ESPORTE:</span>
            </span>
            {SPORTS_CATEGORIES.map(cat => {
              const isSelected = selectedSport === cat.id;
              const count = sportCounts.counts[cat.id] ?? 0;
              const liveInSport = sportCounts.liveCounts[cat.id] ?? 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedSport(cat.id);
                    setLeagueFilter('ALL');
                  }}
                  className={`font-mono text-[10px] px-2.5 py-1.5 transition cursor-pointer uppercase shrink-0 whitespace-nowrap flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
                      : 'bg-[#141618] border-white/10 text-[#ececed]/70 hover:text-white'
                  }`}
                >
                  <span>{cat.iconEmoji}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[9px] px-1 rounded-xs ${isSelected ? 'bg-black/20 text-[#0b0c0d]' : 'bg-white/10'}`}>
                    {count}
                  </span>
                  {liveInSport > 0 && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-red-600' : 'bg-red-400 animate-ping'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none touch-pan-x pb-1 shrink-0">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`cursor-pointer transition shrink-0 whitespace-nowrap ${statusFilter === 'ALL' ? 'status-pill' : 'status-pill-muted'}`}
            >
              TODOS ({matches.length})
            </button>
            <button
              onClick={() => setStatusFilter('LIVE')}
              className={`cursor-pointer transition shrink-0 whitespace-nowrap ${statusFilter === 'LIVE' ? 'status-pill' : 'status-pill-muted'}`}
            >
              AO VIVO ({liveCount})
            </button>
            <button
              onClick={() => setStatusFilter('FINISHED')}
              className={`cursor-pointer transition shrink-0 whitespace-nowrap ${statusFilter === 'FINISHED' ? 'status-pill' : 'status-pill-muted'}`}
            >
              ENCERRADOS ({finishedCount})
            </button>
            <button
              onClick={() => setStatusFilter('SCHEDULED')}
              className={`cursor-pointer transition shrink-0 whitespace-nowrap ${statusFilter === 'SCHEDULED' ? 'status-pill' : 'status-pill-muted'}`}
            >
              PRÓXIMOS ({scheduledCount})
            </button>
            <button
              onClick={() => setStatusFilter('FAVORITES')}
              className={`cursor-pointer transition shrink-0 whitespace-nowrap ${statusFilter === 'FAVORITES' ? 'status-pill' : 'status-pill-muted'}`}
            >
              ★ FAVORITOS ({favCount})
            </button>
          </div>

          {/* Dynamic League filters for mobile according to selectedSport */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none touch-pan-x pb-1 shrink-0">
            <span className="label opacity-60 text-[9px] flex items-center gap-1 mr-1 shrink-0">
              <span>LIGAS:</span>
            </span>
            {getSportLeagues(selectedSport).map(lg => (
              <button
                key={lg.val}
                onClick={() => setLeagueFilter(lg.val)}
                className={`font-mono text-[10px] px-2.5 py-1.5 transition cursor-pointer uppercase shrink-0 whitespace-nowrap ${
                  leagueFilter === lg.val
                    ? 'bg-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-white/5 border border-white/5 text-[#ececed]/60 hover:text-[#ececed]'
                }`}
              >
                {lg.label}
              </button>
            ))}
          </div>

          {/* Broadcast channel filters for mobile */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none touch-pan-x pb-1 shrink-0">
            <span className="label opacity-60 text-[9px] flex items-center gap-1 mr-1 shrink-0">
              <Tv className="w-2.5 h-2.5 text-[#00ff88]" />
              <span>TV:</span>
            </span>
            {[
              { label: 'TODOS', val: 'ALL' },
              { label: 'GLOBO', val: 'Globo' },
              { label: 'SPOR TV', val: 'SporTV' },
              { label: 'PREMIERE', val: 'Premiere' },
              { label: 'CAZÉ TV', val: 'CazéTV' },
              { label: 'ESPN / DISNEY+', val: 'ESPN' },
              { label: 'MAX / TNT', val: 'Max' },
            ].map(bc => (
              <button
                key={bc.val}
                onClick={() => setBroadcastFilter(bc.val)}
                className={`font-mono text-[9px] px-2 py-1 transition cursor-pointer uppercase shrink-0 whitespace-nowrap ${
                  broadcastFilter === bc.val
                    ? 'bg-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-white/5 border border-white/5 text-[#ececed]/60 hover:text-[#ececed]'
                }`}
              >
                {bc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Sport Filter Indicator & Quick Reset Banner */}
        {selectedSport !== 'todos' && (
          <div className="bg-[#141618] border border-[#00ff88]/40 px-3.5 py-2.5 flex items-center justify-between text-xs font-mono mb-4 text-[#ececed] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {SPORTS_CATEGORIES.find(s => s.id === selectedSport)?.iconEmoji}
              </span>
              <div>
                <span className="text-white/60 text-[10px] uppercase block">Filtro Ativo:</span>
                <span className="text-white font-bold text-xs uppercase">
                  {SPORTS_CATEGORIES.find(s => s.id === selectedSport)?.label}
                </span>
                <span className="text-[#00ff88] ml-2 text-[11px] font-bold">
                  ({filteredMatches.length} {filteredMatches.length === 1 ? 'partida encontrada' : 'partidas encontradas'})
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSport('todos');
                setLeagueFilter('ALL');
              }}
              className="text-[11px] bg-[#00ff88]/15 hover:bg-[#00ff88] text-[#00ff88] hover:text-[#0b0c0d] border border-[#00ff88]/40 px-2.5 py-1 transition flex items-center gap-1 cursor-pointer font-bold uppercase"
            >
              <span>✕ Ver Todos</span>
            </button>
          </div>
        )}

        {/* Match Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {filteredMatches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              isFavorite={favoriteMatchIds.includes(match.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectMatch={onSelectMatch}
              onOpenTeamHistory={onOpenTeamHistory}
            />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="bg-[#141618] border border-white/10 p-8 sm:p-12 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-[#ececed]/60 mb-2">
              Nenhuma partida encontrada para os filtros selecionados.
            </p>
            <p className="text-xs text-[#ececed]/40 max-w-md mx-auto mb-5">
              Escolha uma data com partidas na barra de calendário ou selecione um dos atalhos abaixo:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {selectedSport !== 'todos' && (
                <button
                  onClick={() => {
                    setSelectedSport('todos');
                    setSelectedDate('ALL');
                    setStatusFilter('ALL');
                    setLeagueFilter('ALL');
                  }}
                  className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>VER TODAS AS MODALIDADES ({matches.length})</span>
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedDate('ALL');
                  setStatusFilter('ALL');
                  setLeagueFilter('ALL');
                }}
                className="font-mono text-xs px-3 py-2 bg-[#0b0c0d] border border-white/20 text-[#ececed] hover:border-[#00ff88] cursor-pointer"
              >
                <span>VER TODAS AS DATAS</span>
              </button>
              <button
                onClick={() => {
                  setSelectedDate(todayIso);
                  setStatusFilter('ALL');
                  setLeagueFilter('ALL');
                }}
                className="font-mono text-xs px-3 py-2 bg-[#0b0c0d] border border-white/20 text-[#ececed] hover:border-[#00ff88] cursor-pointer"
              >
                JOGOS DE HOJE
              </button>
            </div>

            {/* Quick jump to dates that have matches */}
            {availableDates.length > 0 && (
              <div className="pt-4 border-t border-white/10 max-w-lg mx-auto">
                <p className="label opacity-60 mb-2">Datas com jogos nesta semana:</p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {availableDates.map(iso => {
                    const count = matches.filter(m => m.dateIso === iso).length;
                    const d = new Date(iso + 'T12:00:00');
                    const dayMonth = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
                    return (
                      <button
                        key={iso}
                        onClick={() => {
                          setSelectedDate(iso);
                          setStatusFilter('ALL');
                          setLeagueFilter('ALL');
                        }}
                        className="font-mono text-[10px] px-2 py-1 bg-white/5 border border-white/10 text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0b0c0d] transition cursor-pointer"
                      >
                        {dayMonth} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sidebar Elements */}
      <aside className="space-y-6">
        {/* Primary Action Button */}
        <div>
          <button
            onClick={onSimulateEvent}
            id="btn-simulate-match-action"
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 shadow-lg shadow-[#00ff88]/10"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simular Gol / Lance</span>
          </button>
        </div>

        {/* Sport Filters (Desktop Sidebar) */}
        <div className="hidden lg:block border border-white/10 p-5 bg-[#141618]">
          <div className="label mb-3 text-[#ececed] opacity-80 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <span>⚡</span>
              <span>Modalidade Esportiva</span>
            </span>
            {selectedSport !== 'todos' && (
              <button
                onClick={() => {
                  setSelectedSport('todos');
                  setLeagueFilter('ALL');
                }}
                className="text-[10px] text-[#00ff88] hover:underline cursor-pointer uppercase font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-5">
            {SPORTS_CATEGORIES.map(cat => {
              const count = sportCounts.counts[cat.id] ?? 0;
              const liveInSport = sportCounts.liveCounts[cat.id] ?? 0;
              const isSelected = selectedSport === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedSport(cat.id);
                    setLeagueFilter('ALL');
                  }}
                  id={`sidebar-sport-${cat.id}`}
                  className={`font-mono text-[11px] p-2 text-left border transition cursor-pointer flex items-center justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88] shadow-sm'
                      : 'bg-white/5 border-white/5 text-[#ececed]/75 hover:text-white hover:border-white/20 hover:bg-white/10'
                  } ${cat.id === 'todos' ? 'col-span-2' : ''}`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">{cat.iconEmoji}</span>
                    <span className="truncate">{cat.label}</span>
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {liveInSport > 0 && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-red-600' : 'bg-red-400 animate-ping'}`} />
                    )}
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-xs ${isSelected ? 'bg-black/20 text-[#0b0c0d]' : 'bg-white/10'}`}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Status Filters */}
          <div className="label mb-3 text-[#ececed] opacity-80 pt-3 border-t border-white/10">
            Filtros de Status
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`cursor-pointer transition ${statusFilter === 'ALL' ? 'status-pill' : 'status-pill-muted'}`}
            >
              TODOS ({matches.length})
            </button>
            <button
              onClick={() => setStatusFilter('LIVE')}
              className={`cursor-pointer transition ${statusFilter === 'LIVE' ? 'status-pill' : 'status-pill-muted'}`}
            >
              AO VIVO ({liveCount})
            </button>
            <button
              onClick={() => setStatusFilter('FINISHED')}
              className={`cursor-pointer transition ${statusFilter === 'FINISHED' ? 'status-pill' : 'status-pill-muted'}`}
            >
              ENCERRADOS ({finishedCount})
            </button>
            <button
              onClick={() => setStatusFilter('SCHEDULED')}
              className={`cursor-pointer transition ${statusFilter === 'SCHEDULED' ? 'status-pill' : 'status-pill-muted'}`}
            >
              PRÓXIMOS ({scheduledCount})
            </button>
            <button
              onClick={() => setStatusFilter('FAVORITES')}
              className={`cursor-pointer transition ${statusFilter === 'FAVORITES' ? 'status-pill' : 'status-pill-muted'}`}
            >
              <Star className="w-3 h-3 fill-current inline mr-1" />
              FAVORITOS ({favCount})
            </button>
          </div>

          <div className="label mt-6 mb-2 text-[#ececed] opacity-80">
            Filtrar por Data
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setSelectedDate('ALL')}
              className={`font-mono text-[10px] px-2 py-1.5 text-left border transition cursor-pointer uppercase col-span-2 ${
                selectedDate === 'ALL'
                  ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
                  : 'bg-white/5 border-white/5 text-[#ececed]/70 hover:text-white hover:border-white/20'
              }`}
            >
              ★ Todas as Datas ({matches.length})
            </button>
            {Array.from(new Set(matches.map(m => m.dateIso).filter(Boolean)))
              .sort()
              .map(iso => {
                const count = matches.filter(m => m.dateIso === iso).length;
                const d = new Date(iso + 'T12:00:00');
                const today = new Date().toISOString().slice(0, 10);
                const isToday = iso === today;
                const dayMonth = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
                const label = isToday ? `Hoje (${dayMonth})` : `${dayMonth}`;

                return (
                  <button
                    key={iso}
                    onClick={() => setSelectedDate(iso)}
                    className={`font-mono text-[10px] px-2 py-1.5 text-left border transition cursor-pointer uppercase truncate ${
                      selectedDate === iso
                        ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
                        : 'bg-white/5 border-white/5 text-[#ececed]/70 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {label} <span className="opacity-60">({count})</span>
                  </button>
                );
              })}
          </div>

          <div className="label mt-6 mb-2 text-[#ececed] opacity-80 flex items-center justify-between">
            <span>Competições / Ligas</span>
            <span className="text-[10px] text-[#00ff88] uppercase">
              {selectedSport === 'todos' ? 'Multiesporte' : selectedSport}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {getSportLeagues(selectedSport).map(lg => (
              <button
                key={lg.val}
                onClick={() => setLeagueFilter(lg.val)}
                className={`font-mono text-[11px] px-2 py-1 transition cursor-pointer uppercase ${
                  leagueFilter === lg.val
                    ? 'bg-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-white/5 text-[#ececed]/60 hover:text-[#ececed] hover:bg-white/10'
                }`}
              >
                {lg.label}
              </button>
            ))}
          </div>

          <div className="label mt-6 mb-2 text-[#ececed] opacity-80 flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>Onde Assistir (Canais / TV)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'TODOS', val: 'ALL' },
              { label: 'GLOBO', val: 'Globo' },
              { label: 'SPOR TV', val: 'SporTV' },
              { label: 'PREMIERE', val: 'Premiere' },
              { label: 'CAZÉ TV', val: 'CazéTV' },
              { label: 'ESPN', val: 'ESPN' },
              { label: 'DISNEY+', val: 'Disney+' },
              { label: 'MAX / TNT', val: 'Max' },
            ].map(bc => (
              <button
                key={bc.val}
                onClick={() => setBroadcastFilter(bc.val)}
                className={`font-mono text-[10px] px-2 py-1 transition cursor-pointer uppercase ${
                  broadcastFilter === bc.val
                    ? 'bg-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-white/5 text-[#ececed]/60 hover:text-[#ececed] hover:bg-white/10'
                }`}
              >
                {bc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guia de Transmissão de Hoje / Onde Assistir Widget */}
        <div className="border border-white/10 p-5 bg-[#141618] space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <div className="label text-[#00ff88] font-bold flex items-center gap-1.5 text-xs">
              <Tv className="w-3.5 h-3.5" />
              <span>GUIA: ONDE ASSISTIR</span>
            </div>
            <span className="text-[10px] opacity-60">Hoje</span>
          </div>

          <div className="space-y-2 text-xs">
            {matches.slice(0, 5).map(m => {
              const bcasts = getMatchBroadcast(m);
              return (
                <div
                  key={m.id}
                  onClick={() => onSelectMatch(m)}
                  className="bg-[#0b0c0d] p-2.5 border border-white/5 hover:border-[#00ff88]/40 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-white group-hover:text-[#00ff88]">
                    <span className="truncate">{m.homeTeam.shortName} x {m.awayTeam.shortName}</span>
                    <span className="text-[#00ff88] font-mono text-[10px]">{m.status === 'LIVE' ? `${m.minute}' AO VIVO` : m.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#ececed]/60">
                    <span>📺</span>
                    <span className="truncate">{bcasts.join(' • ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent History Box */}
        <div className="border border-white/10 p-5 bg-[#141618]">
          <div className="label mb-3 text-[#ececed] opacity-80">
            Histórico Recente
          </div>
          <div className="space-y-3">
            {recentFinishedMatches.map(m => (
              <div
                key={m.id}
                onClick={() => onSelectMatch(m)}
                className="cursor-pointer group pb-2.5 border-b border-white/5 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#ececed] group-hover:text-[#00ff88] transition">
                  <span className="truncate">{m.homeTeam.shortName} v {m.awayTeam.shortName}</span>
                  <span className="font-mono text-sm font-bold bg-[#0b0c0d] px-2 py-0.5 border border-white/10">
                    {m.homeScore}-{m.awayScore}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px]">
                  <span className="label opacity-50">{m.league}</span>
                  <span className="label text-[#00ff88] opacity-100 font-bold">Encerrado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
);
};
