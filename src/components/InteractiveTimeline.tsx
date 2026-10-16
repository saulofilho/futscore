import React, { useState, useMemo } from 'react';
import { Match, MatchEvent } from '../types';
import {
  Clock, Filter, ArrowDownUp, Search, X, User,
  ArrowRight, Shield, Sparkles, AlertTriangle, Check
} from 'lucide-react';

interface InteractiveTimelineProps {
  match: Match;
  onSelectAthlete?: (athleteNameOrId: string) => void;
  className?: string;
}

export type EventCategory = 'ALL' | 'goal' | 'card' | 'sub' | 'var';
export type TeamFilter = 'ALL' | 'home' | 'away';
export type SortOrder = 'asc' | 'desc'; // asc: 1' -> 90', desc: 90' -> 1'

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  match,
  onSelectAthlete,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('ALL');
  const [selectedTeam, setSelectedTeam] = useState<TeamFilter>('ALL');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const events = match.events || [];

  // Counts for each category
  const counts = useMemo(() => {
    const goals = events.filter((e) => e.type === 'goal').length;
    const cards = events.filter((e) => e.type === 'yellow_card' || e.type === 'red_card').length;
    const subs = events.filter((e) => e.type === 'sub').length;
    const vars = events.filter((e) => e.type === 'var' || e.type === 'penalty_miss').length;
    return {
      all: events.length,
      goal: goals,
      card: cards,
      sub: subs,
      var: vars,
    };
  }, [events]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let list = [...events];

    // Filter by category
    if (selectedCategory === 'goal') {
      list = list.filter((e) => e.type === 'goal');
    } else if (selectedCategory === 'card') {
      list = list.filter((e) => e.type === 'yellow_card' || e.type === 'red_card');
    } else if (selectedCategory === 'sub') {
      list = list.filter((e) => e.type === 'sub');
    } else if (selectedCategory === 'var') {
      list = list.filter((e) => e.type === 'var' || e.type === 'penalty_miss');
    }

    // Filter by team
    if (selectedTeam !== 'ALL') {
      list = list.filter((e) => e.team === selectedTeam);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((e) => {
        const inPlayer = e.player?.toLowerCase().includes(q);
        const inAssist = e.assist?.toLowerCase().includes(q);
        const inSubOut = e.subOut?.toLowerCase().includes(q);
        const inDetail = e.detail?.toLowerCase().includes(q);
        return inPlayer || inAssist || inSubOut || inDetail;
      });
    }

    // Sort order
    list.sort((a, b) => {
      return sortOrder === 'asc' ? a.minute - b.minute : b.minute - a.minute;
    });

    return list;
  }, [events, selectedCategory, selectedTeam, searchQuery, sortOrder]);

  const hasActiveFilters = selectedCategory !== 'ALL' || selectedTeam !== 'ALL' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedTeam('ALL');
    setSearchQuery('');
  };

  const getEventBadge = (event: MatchEvent) => {
    switch (event.type) {
      case 'goal':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 shadow-sm">
            <span>⚽</span> GOL!
          </span>
        );
      case 'yellow_card':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
            <span className="w-2.5 h-3.5 bg-amber-400 inline-block rounded-[1px]"></span> CARTÃO AMARELO
          </span>
        );
      case 'red_card':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-red-600/20 text-red-400 border border-red-600/40 shadow-sm animate-pulse">
            <span className="w-2.5 h-3.5 bg-red-500 inline-block rounded-[1px]"></span> CARTÃO VERMELHO
          </span>
        );
      case 'sub':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-500/20 text-sky-300 border border-sky-500/40 shadow-sm">
            <span className="text-xs">⇄</span> SUBSTITUIÇÃO
          </span>
        );
      case 'var':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm">
            <span>📺</span> VAR
          </span>
        );
      case 'penalty_miss':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 bg-rose-600/20 text-rose-300 border border-rose-500/40 shadow-sm">
            <span>❌</span> PÊNALTI PERDIDO
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-4 font-mono text-[#ececed] ${className}`}>
      {/* Category Filter Toolbar */}
      <div className="bg-[#0b0c0d] p-3.5 sm:p-4 border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#00ff88]" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-tight flex items-center gap-2">
                <span>Linha do Tempo Interativa</span>
                <span className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 px-1.5 py-0.2 border border-[#00ff88]/20">
                  {filteredEvents.length} de {events.length} lances
                </span>
              </h4>
              <p className="text-[10px] text-[#ececed]/60 font-sans">
                Filtre instantaneamente por gols, cartões e substituições para analisar os momentos decisivos.
              </p>
            </div>
          </div>

          {/* Sort order toggle button */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="self-start sm:self-auto px-2.5 py-1 bg-[#141618] hover:bg-white/10 border border-white/15 text-xs text-[#ececed] transition cursor-pointer flex items-center gap-1.5 shrink-0"
            title="Alternar ordem de exibição cronológica dos lances"
          >
            <ArrowDownUp className="w-3 h-3 text-[#00ff88]" />
            <span className="text-[11px]">
              {sortOrder === 'asc' ? "Cronológico (1' → 90')" : "Mais Recentes (90' → 1')"}
            </span>
          </button>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-white/50 mr-1 flex items-center gap-1">
            <Filter className="w-2.5 h-2.5 text-[#00ff88]" />
            Categorias:
          </span>

          {/* All events */}
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
              selectedCategory === 'ALL'
                ? 'bg-[#00ff88] text-[#0b0c0d] border-[#00ff88] shadow-sm'
                : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            <span>Todos</span>
            <span
              className={`text-[10px] px-1 py-0.2 ${
                selectedCategory === 'ALL' ? 'bg-[#0b0c0d]/20 text-[#0b0c0d]' : 'bg-[#0b0c0d] text-[#00ff88]'
              }`}
            >
              {counts.all}
            </span>
          </button>

          {/* Goals */}
          <button
            onClick={() => setSelectedCategory('goal')}
            className={`px-3 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
              selectedCategory === 'goal'
                ? 'bg-[#00ff88] text-[#0b0c0d] border-[#00ff88] shadow-sm'
                : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            <span>⚽ Gols</span>
            <span
              className={`text-[10px] px-1 py-0.2 ${
                selectedCategory === 'goal' ? 'bg-[#0b0c0d]/20 text-[#0b0c0d]' : 'bg-[#0b0c0d] text-[#00ff88]'
              }`}
            >
              {counts.goal}
            </span>
          </button>

          {/* Cards (Yellow and Red) */}
          <button
            onClick={() => setSelectedCategory('card')}
            className={`px-3 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
              selectedCategory === 'card'
                ? 'bg-amber-400 text-[#0b0c0d] border-amber-400 shadow-sm'
                : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            <span className="flex items-center gap-0.5">
              <span className="w-2 h-3 bg-amber-400 inline-block rounded-[1px]"></span>
              <span className="w-2 h-3 bg-red-500 inline-block rounded-[1px]"></span>
            </span>
            <span>Cartões</span>
            <span
              className={`text-[10px] px-1 py-0.2 ${
                selectedCategory === 'card' ? 'bg-[#0b0c0d]/20 text-[#0b0c0d]' : 'bg-[#0b0c0d] text-amber-400'
              }`}
            >
              {counts.card}
            </span>
          </button>

          {/* Substitutions */}
          <button
            onClick={() => setSelectedCategory('sub')}
            className={`px-3 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
              selectedCategory === 'sub'
                ? 'bg-sky-400 text-[#0b0c0d] border-sky-400 shadow-sm'
                : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            <span>⇄ Substituições</span>
            <span
              className={`text-[10px] px-1 py-0.2 ${
                selectedCategory === 'sub' ? 'bg-[#0b0c0d]/20 text-[#0b0c0d]' : 'bg-[#0b0c0d] text-sky-400'
              }`}
            >
              {counts.sub}
            </span>
          </button>

          {/* VAR / Penalties */}
          {counts.var > 0 && (
            <button
              onClick={() => setSelectedCategory('var')}
              className={`px-3 py-1 text-xs font-bold uppercase transition cursor-pointer flex items-center gap-1.5 border ${
                selectedCategory === 'var'
                  ? 'bg-purple-500 text-white border-purple-500 shadow-sm'
                  : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <span>📺 VAR ({counts.var})</span>
            </button>
          )}
        </div>

        {/* Secondary Filter Row: Team selection & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-white/5 text-xs">
          {/* Team filter segmented buttons */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-white/50 mr-1">Clube:</span>

            <button
              onClick={() => setSelectedTeam('ALL')}
              className={`px-2 py-0.5 text-[11px] font-bold uppercase transition cursor-pointer border ${
                selectedTeam === 'ALL'
                  ? 'bg-white/20 text-white border-white/40'
                  : 'bg-[#141618] text-[#ececed]/60 border-white/10 hover:text-white'
              }`}
            >
              Ambos
            </button>

            <button
              onClick={() => setSelectedTeam('home')}
              className={`px-2 py-0.5 text-[11px] font-bold uppercase transition cursor-pointer flex items-center gap-1 border ${
                selectedTeam === 'home'
                  ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]'
                  : 'bg-[#141618] text-[#ececed]/60 border-white/10 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-[#00ff88]"></span>
              <span>{match.homeTeam.shortName || match.homeTeam.name.split(' ')[0]}</span>
            </button>

            <button
              onClick={() => setSelectedTeam('away')}
              className={`px-2 py-0.5 text-[11px] font-bold uppercase transition cursor-pointer flex items-center gap-1 border ${
                selectedTeam === 'away'
                  ? 'bg-sky-500/20 text-sky-400 border-sky-400'
                  : 'bg-[#141618] text-[#ececed]/60 border-white/10 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-sky-400"></span>
              <span>{match.awayTeam.shortName || match.awayTeam.name.split(' ')[0]}</span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar por jogador ou lance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141618] border border-white/15 pl-8 pr-7 py-1 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00ff88]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[10px] text-[#00ff88] hover:underline cursor-pointer shrink-0"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Vertical Timeline Display */}
      {filteredEvents.length === 0 ? (
        <div className="bg-[#0b0c0d] p-8 sm:p-12 border border-white/10 text-center space-y-3">
          <div className="w-10 h-10 mx-auto bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
            <Filter className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-white text-sm uppercase">Nenhum lance encontrado</h5>
          <p className="text-xs text-[#ececed]/60 max-w-md mx-auto font-sans">
            Não há lances que correspondam aos filtros selecionados (
            {selectedCategory !== 'ALL' && `Categoria: ${selectedCategory.toUpperCase()}`}
            {selectedTeam !== 'ALL' && ` · Clube: ${selectedTeam === 'home' ? match.homeTeam.name : match.awayTeam.name}`}
            {searchQuery && ` · Busca: "${searchQuery}"`}).
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-primary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 cursor-pointer mt-2"
          >
            <span>Ver Todos os Lances ({events.length})</span>
          </button>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-10 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#00ff88] before:via-white/20 before:to-[#00ff88]/40 space-y-4">
          {filteredEvents.map((event, index) => {
            const isHome = event.team === 'home';
            const team = isHome ? match.homeTeam : match.awayTeam;

            // Check if this event crossed the 45-minute mark from previous (for half-time divider)
            const prevEvent = index > 0 ? filteredEvents[index - 1] : null;
            const isAfterHalfTime =
              sortOrder === 'asc'
                ? prevEvent && prevEvent.minute <= 45 && event.minute > 45
                : prevEvent && prevEvent.minute > 45 && event.minute <= 45;

            return (
              <React.Fragment key={event.id}>
                {/* Half-Time Period Marker */}
                {isAfterHalfTime && (
                  <div className="relative -left-6 sm:-left-10 my-4 flex items-center justify-center">
                    <div className="bg-[#141618] border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ececed]/80 shadow-md flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#00ff88]" />
                      <span>{sortOrder === 'asc' ? 'Início do 2º Tempo (45\'+)' : 'Intervalo / Fim do 1º Tempo'}</span>
                    </div>
                  </div>
                )}

                <div className="relative flex items-start gap-3 sm:gap-4 group">
                  {/* Timeline Node Dot on Vertical Line */}
                  <div
                    className={`absolute -left-6 sm:-left-10 w-6 h-6 sm:w-7 sm:h-7 bg-[#0b0c0d] border flex items-center justify-center text-xs transition shadow-md z-10 ${
                      event.type === 'goal'
                        ? 'border-[#00ff88] text-[#00ff88] ring-2 ring-[#00ff88]/30'
                        : event.type === 'yellow_card'
                        ? 'border-amber-400 text-amber-400'
                        : event.type === 'red_card'
                        ? 'border-red-500 text-red-500 ring-2 ring-red-500/30'
                        : event.type === 'sub'
                        ? 'border-sky-400 text-sky-400'
                        : 'border-white/20 text-[#ececed]'
                    }`}
                  >
                    {event.type === 'goal' ? (
                      <span className="text-xs">⚽</span>
                    ) : event.type === 'yellow_card' ? (
                      <span className="w-2.5 h-3.5 bg-amber-400 inline-block rounded-[1px]"></span>
                    ) : event.type === 'red_card' ? (
                      <span className="w-2.5 h-3.5 bg-red-500 inline-block rounded-[1px]"></span>
                    ) : event.type === 'sub' ? (
                      <span className="text-xs font-bold text-sky-400">⇄</span>
                    ) : (
                      <span className="text-[9px] font-bold text-purple-400">VAR</span>
                    )}
                  </div>

                  {/* Event Detail Card */}
                  <div
                    className={`flex-1 p-3.5 sm:p-4 border transition ${
                      event.type === 'goal'
                        ? 'bg-[#00ff88]/10 border-[#00ff88]/60 hover:border-[#00ff88]'
                        : event.type === 'red_card'
                        ? 'bg-red-950/40 border-red-500/60 hover:border-red-500'
                        : event.type === 'sub'
                        ? 'bg-sky-950/20 border-sky-500/30 hover:border-sky-500/60'
                        : event.type === 'yellow_card'
                        ? 'bg-amber-950/15 border-amber-500/30 hover:border-amber-500/60'
                        : 'bg-[#0b0c0d] border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Event Header: Minute, Category Badge & Team */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#00ff88] bg-[#0b0c0d] px-2 py-0.5 border border-white/10">
                          {event.minute}'
                        </span>
                        {getEventBadge(event)}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="w-2 h-2 rounded-none" style={{ backgroundColor: team.primaryColor || (isHome ? '#00ff88' : '#38bdf8') }}></span>
                        <span className={`font-bold uppercase text-[11px] ${isHome ? 'text-[#00ff88]' : 'text-sky-300'}`}>
                          {team.name}
                        </span>
                      </div>
                    </div>

                    {/* Event Body depending on Type */}
                    {event.type === 'sub' ? (
                      /* Substitution Detailed Layout */
                      <div className="space-y-2 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Player In */}
                          <div className="flex items-center gap-2 bg-[#141618] p-2 border border-emerald-500/30">
                            <span className="w-5 h-5 bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                              ▲
                            </span>
                            <div className="truncate">
                              <span className="text-[9px] text-emerald-400 uppercase font-bold block">Entrou</span>
                              <button
                                onClick={() => onSelectAthlete && onSelectAthlete(event.player)}
                                className="font-bold text-white hover:text-[#00ff88] transition cursor-pointer text-left truncate block"
                              >
                                {event.player}
                              </button>
                            </div>
                          </div>

                          {/* Player Out */}
                          {event.subOut && (
                            <div className="flex items-center gap-2 bg-[#141618] p-2 border border-red-500/20">
                              <span className="w-5 h-5 bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0">
                                ▼
                              </span>
                              <div className="truncate">
                                <span className="text-[9px] text-red-400 uppercase font-bold block">Saiu</span>
                                <button
                                  onClick={() => onSelectAthlete && onSelectAthlete(event.subOut!)}
                                  className="font-bold text-[#ececed]/80 hover:text-white transition cursor-pointer text-left truncate block"
                                >
                                  {event.subOut}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {event.detail && (
                          <p className="text-xs text-[#ececed]/70 italic pt-1 border-t border-white/5 font-sans">
                            "{event.detail}"
                          </p>
                        )}
                      </div>
                    ) : event.type === 'goal' ? (
                      /* Goal Detailed Layout */
                      <div className="space-y-2 pt-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <button
                            onClick={() => onSelectAthlete && onSelectAthlete(event.player)}
                            className="font-['Syne'] font-extrabold text-base sm:text-lg text-white hover:text-[#00ff88] transition cursor-pointer text-left flex items-center gap-2"
                          >
                            <span>{event.player}</span>
                            {onSelectAthlete && (
                              <span className="text-[10px] font-mono text-[#00ff88]/80 font-normal hover:underline">
                                [Ver Perfil]
                              </span>
                            )}
                          </button>

                          {event.scoreAfter && (
                            <span className="px-2 py-0.5 bg-[#0b0c0d] border border-[#00ff88]/40 text-[#00ff88] font-bold text-xs">
                              Placar: {event.scoreAfter[0]} x {event.scoreAfter[1]}
                            </span>
                          )}
                        </div>

                        {event.assist && (
                          <p className="text-xs text-[#ececed]/80 flex items-center gap-1.5">
                            <span className="text-[10px] text-white/50 uppercase font-bold">Passe para gol:</span>
                            <button
                              onClick={() => onSelectAthlete && onSelectAthlete(event.assist!)}
                              className="text-[#00ff88] font-bold hover:underline cursor-pointer"
                            >
                              {event.assist}
                            </button>
                          </p>
                        )}

                        {event.detail && (
                          <p className="text-xs text-[#ececed]/80 bg-[#0b0c0d] p-2.5 border border-white/10 italic font-sans leading-relaxed">
                            "{event.detail}"
                          </p>
                        )}
                      </div>
                    ) : (
                      /* Card or VAR Detailed Layout */
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => onSelectAthlete && onSelectAthlete(event.player)}
                            className="font-bold text-sm sm:text-base text-white hover:text-[#00ff88] transition cursor-pointer text-left"
                          >
                            {event.player}
                          </button>

                          {onSelectAthlete && event.type !== 'var' && (
                            <span
                              onClick={() => onSelectAthlete && onSelectAthlete(event.player)}
                              className="text-[10px] text-[#00ff88]/70 hover:underline cursor-pointer"
                            >
                              [Ficha]
                            </span>
                          )}
                        </div>

                        {event.detail && (
                          <p className="text-xs text-[#ececed]/70 bg-[#0b0c0d] p-2 border border-white/5 font-sans leading-relaxed">
                            {event.detail}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Footer Helper Note */}
      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-[#ececed]/50 gap-2">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#00ff88]" />
          <span>Súmula de lances sincronizada com a arbitragem oficial em tempo real.</span>
        </span>
        <span>{filteredEvents.length} eventos exibidos</span>
      </div>
    </div>
  );
};
