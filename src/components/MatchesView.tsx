import React, { useState } from 'react';
import { Match } from '../types';
import { MatchCard } from './MatchCard';
import { MatchCalendar } from './MatchCalendar';
import { getMatchBroadcast } from '../utils/footballMatchEnhancers';
import { Star, Sparkles, Tv, Filter } from 'lucide-react';

interface MatchesViewProps {
  matches: Match[];
  favoriteMatchIds: string[];
  onToggleFavorite: (matchId: string) => void;
  onSelectMatch: (match: Match) => void;
  onOpenTeamHistory: (teamId: string) => void;
  onSimulateEvent: () => void;
  onNavigateToPredictions?: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  favoriteMatchIds,
  onToggleFavorite,
  onSelectMatch,
  onOpenTeamHistory,
  onSimulateEvent,
  onNavigateToPredictions,
}) => {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'FINISHED' | 'SCHEDULED' | 'FAVORITES'>('ALL');
  const [leagueFilter, setLeagueFilter] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [broadcastFilter, setBroadcastFilter] = useState<string>('ALL');

  const filteredMatches = matches.filter(match => {
    // Date Filter
    if (selectedDate !== 'ALL') {
      const matchDateIso = match.dateIso || (match.date === 'Hoje' ? todayIso : match.date);
      if (matchDateIso !== selectedDate) return false;
    }

    // Status Filter
    if (statusFilter === 'LIVE' && match.status !== 'LIVE') return false;
    if (statusFilter === 'FINISHED' && match.status !== 'FINISHED') return false;
    if (statusFilter === 'SCHEDULED' && match.status !== 'SCHEDULED') return false;
    if (statusFilter === 'FAVORITES' && !favoriteMatchIds.includes(match.id)) return false;

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

  const liveCount = matches.filter(m => m.status === 'LIVE').length;
  const finishedCount = matches.filter(m => m.status === 'FINISHED').length;
  const scheduledCount = matches.filter(m => m.status === 'SCHEDULED').length;
  const favCount = favoriteMatchIds.length;

  const recentFinishedMatches = matches.filter(m => m.status === 'FINISHED').slice(0, 3);
  const availableDates = Array.from(new Set(matches.map(m => m.dateIso).filter(Boolean))).sort();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
      {/* Main Section */}
      <section className="min-w-0 w-full">
        <div className="mb-6">
          <div className="label text-[#00ff88] opacity-100 font-bold mb-1.5">
            [01] DASHBOARD
          </div>
          <h1 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#ececed] leading-none mb-2 sm:mb-3">
            Painel de Jogos &amp; Estatísticas
          </h1>
          <p className="text-xs sm:text-sm text-[#ececed]/60 max-w-xl leading-relaxed">
            Acompanhe resultados ao vivo, navegue pelo calendário em jogos passados ou futuros, acerte notificações e analise estatísticas detalhadas.
          </p>
        </div>

        {/* Interactive Match Calendar Component */}
        <MatchCalendar
          matches={matches}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Mobile Filter Bars */}
        <div className="lg:hidden space-y-2 mb-5">
          {/* Status filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 shrink-0">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`cursor-pointer transition shrink-0 ${statusFilter === 'ALL' ? 'status-pill' : 'status-pill-muted'}`}
            >
              TODOS ({matches.length})
            </button>
            <button
              onClick={() => setStatusFilter('LIVE')}
              className={`cursor-pointer transition shrink-0 ${statusFilter === 'LIVE' ? 'status-pill' : 'status-pill-muted'}`}
            >
              AO VIVO ({liveCount})
            </button>
            <button
              onClick={() => setStatusFilter('FINISHED')}
              className={`cursor-pointer transition shrink-0 ${statusFilter === 'FINISHED' ? 'status-pill' : 'status-pill-muted'}`}
            >
              ENCERRADOS ({finishedCount})
            </button>
            <button
              onClick={() => setStatusFilter('SCHEDULED')}
              className={`cursor-pointer transition shrink-0 ${statusFilter === 'SCHEDULED' ? 'status-pill' : 'status-pill-muted'}`}
            >
              PRÓXIMOS ({scheduledCount})
            </button>
            <button
              onClick={() => setStatusFilter('FAVORITES')}
              className={`cursor-pointer transition shrink-0 ${statusFilter === 'FAVORITES' ? 'status-pill' : 'status-pill-muted'}`}
            >
              ★ FAVORITOS ({favCount})
            </button>
          </div>

          {/* League filters for mobile */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 shrink-0">
            {[
              { label: 'TODAS', val: 'ALL' },
              { label: 'BRASILEIRÃO', val: 'Brasileirão' },
              { label: 'CHAMPIONS', val: 'Champions' },
              { label: 'PREMIER', val: 'Premier' },
              { label: 'LA LIGA', val: 'La Liga' },
              { label: 'LIBERTADORES', val: 'Libertadores' },
            ].map(lg => (
              <button
                key={lg.val}
                onClick={() => setLeagueFilter(lg.val)}
                className={`font-mono text-[10px] px-2 py-1 transition cursor-pointer uppercase shrink-0 whitespace-nowrap ${
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
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 shrink-0">
            <span className="label opacity-60 text-[9px] flex items-center gap-1 mr-1">
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
                className={`font-mono text-[9px] px-2 py-0.5 transition cursor-pointer uppercase shrink-0 whitespace-nowrap ${
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

        {/* AI Predictions Promo Banner */}
        {onNavigateToPredictions && (
          <div className="bg-gradient-to-r from-[#141618] via-[#0f2218] to-[#141618] border border-[#00ff88]/30 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#00ff88]/15 border border-[#00ff88] text-[#00ff88] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Syne'] font-extrabold text-sm uppercase text-[#ececed]">Previsões IA Gemini 3.8</span>
                  <span className="bg-[#00ff88] text-[#0b0c0d] text-[9px] font-black px-1.5 py-0.2 rounded-xs font-mono">NOVO</span>
                </div>
                <p className="text-xs text-white/60 font-mono">
                  Prognósticos táticos pré-jogo, placares esperados e probabilidades calculadas com IA.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToPredictions}
              className="btn-primary text-xs py-2 px-3 flex items-center justify-center gap-1.5 shrink-0 uppercase font-bold cursor-pointer"
            >
              <span>Explorar Previsões</span>
              <Sparkles className="w-3.5 h-3.5" />
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
              <button
                onClick={() => {
                  setSelectedDate('ALL');
                  setStatusFilter('ALL');
                  setLeagueFilter('ALL');
                }}
                className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
              >
                <span>VER TODAS AS {matches.length} PARTIDAS</span>
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

        {/* Status Filters (Desktop) */}
        <div className="hidden lg:block border border-white/10 p-5 bg-[#141618]">
          <div className="label mb-3 text-[#ececed] opacity-80">
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

          <div className="label mt-6 mb-2 text-[#ececed] opacity-80">
            Competições
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'TODAS', val: 'ALL' },
              { label: 'BRASILEIRÃO', val: 'Brasileirão' },
              { label: 'CHAMPIONS', val: 'Champions' },
              { label: 'PREMIER LEAGUE', val: 'Premier' },
              { label: 'LA LIGA', val: 'La Liga' },
              { label: 'LIBERTADORES', val: 'Libertadores' },
            ].map(lg => (
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
  );
};
