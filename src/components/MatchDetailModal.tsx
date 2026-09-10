import React, { useState } from 'react';
import { Match, MatchEvent } from '../types';
import { X, Radio, BarChart3, Clock, Users, History, Info, Sparkles, Star } from 'lucide-react';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onOpenTeamHistory: (teamId: string) => void;
  onToggleFavorite: (matchId: string) => void;
  isFavorite: boolean;
  onAddSimulatedGoal: (matchId: string) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onOpenTeamHistory,
  onToggleFavorite,
  isFavorite,
  onAddSimulatedGoal,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'timeline' | 'lineups' | 'h2h'>('stats');

  if (!match) return null;

  const isLive = match.status === 'LIVE';

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

  const getEventIcon = (event: MatchEvent) => {
    switch (event.type) {
      case 'goal':
        return <span className="text-sm">⚽</span>;
      case 'yellow_card':
        return <span className="w-3 h-4 bg-amber-400 inline-block"></span>;
      case 'red_card':
        return <span className="w-3 h-4 bg-red-500 inline-block"></span>;
      case 'var':
        return <span className="text-[10px] bg-purple-600 text-white font-mono px-1">VAR</span>;
      case 'sub':
        return <span className="text-xs text-[#00ff88] font-mono">⇄</span>;
      default:
        return <span>•</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#141618] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#ececed]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#0b0c0d] border-b border-white/10">
          <div className="flex items-center justify-between text-xs mb-4">
            <div className="flex items-center gap-2">
              <span>{match.leagueIcon || '🏆'}</span>
              <span className="font-mono font-bold uppercase tracking-wider text-[#ececed]">{match.league}</span>
              <span className="opacity-40">•</span>
              <span className="label opacity-70">{match.round}</span>
            </div>

            <div className="flex items-center gap-2">
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

          {/* Teams and Big Scoreboard */}
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-4 my-2">
            {/* Home Team */}
            <div className="col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl p-2 bg-[#141618] border border-white/10">
                  {match.homeTeam.badgeEmoji}
                </span>
                <div>
                  <h3 className="font-['Syne'] font-extrabold text-base sm:text-2xl uppercase tracking-tight text-[#ececed]">
                    {match.homeTeam.name}
                  </h3>
                  <button
                    onClick={() => onOpenTeamHistory(match.homeTeam.id)}
                    className="mt-1 label text-[#00ff88] opacity-100 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>[HISTÓRIA DO CLUBE]</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Score & Match Status */}
            <div className="col-span-2 flex flex-col items-center justify-center">
              {match.status === 'SCHEDULED' ? (
                <div className="text-center">
                  <span className="status-pill text-xs">
                    {match.time}
                  </span>
                  <p className="label opacity-60 mt-1">PRÉ-JOGO</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 bg-[#141618] px-4 py-2 border border-white/20 font-mono text-3xl sm:text-5xl font-extrabold text-[#ececed]">
                    <span className={match.homeScore > match.awayScore ? 'text-[#00ff88]' : ''}>
                      {match.homeScore}
                    </span>
                    <span className="opacity-40">-</span>
                    <span className={match.awayScore > match.homeScore ? 'text-[#00ff88]' : ''}>
                      {match.awayScore}
                    </span>
                  </div>
                  {isLive && (
                    <div className="mt-2 status-pill flex items-center gap-1.5">
                      <Radio className="w-3 h-3 animate-ping" />
                      <span>{match.minute}' AO VIVO</span>
                    </div>
                  )}
                  {match.status === 'FINISHED' && (
                    <span className="label opacity-60 mt-2 px-2 py-0.5 border border-white/10">
                      ENCERRADO
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="col-span-5 flex flex-col items-center sm:items-end text-center sm:text-right">
              <div className="flex items-center gap-3 flex-row-reverse sm:flex-row">
                <div>
                  <h3 className="font-['Syne'] font-extrabold text-base sm:text-2xl uppercase tracking-tight text-[#ececed]">
                    {match.awayTeam.name}
                  </h3>
                  <button
                    onClick={() => onOpenTeamHistory(match.awayTeam.id)}
                    className="mt-1 label text-[#00ff88] opacity-100 font-bold hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>[HISTÓRIA DO CLUBE]</span>
                  </button>
                </div>
                <span className="text-4xl sm:text-5xl p-2 bg-[#141618] border border-white/10">
                  {match.awayTeam.badgeEmoji}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info Strip */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
            <span className="label opacity-70">🏟️ ESTÁDIO: {match.stadium}</span>
            <span className="label opacity-70">⚖️ ÁRBITRO: {match.referee}</span>
            {isLive && (
              <button
                onClick={() => onAddSimulatedGoal(match.id)}
                className="btn-primary flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIMULAR GOL NESTA PARTIDA</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 bg-[#0b0c0d] border-b border-white/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('stats')}
            id="tab-btn-stats"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>ESTATÍSTICAS DETALHADAS</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            id="tab-btn-timeline"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>LINHA DO TEMPO ({match.events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lineups')}
            id="tab-btn-lineups"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'lineups'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ESCALAÇÕES &amp; TÁTICA</span>
          </button>

          <button
            onClick={() => setActiveTab('h2h')}
            id="tab-btn-h2h"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'h2h'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>CONFRONTO DIRETO (H2H)</span>
          </button>
        </div>

        {/* Modal Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: ESTATÍSTICAS DETALHADAS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
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
            </div>
          )}

          {/* TAB 2: LINHA DO TEMPO (LANCES) */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {match.events.length === 0 ? (
                <div className="text-center py-12 label opacity-40">
                  Nenhum lance importante registrado ainda nesta partida.
                </div>
              ) : (
                <div className="relative pl-6 sm:pl-8 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 space-y-4">
                  {match.events.map((event) => {
                    const isHome = event.team === 'home';
                    return (
                      <div key={event.id} className="relative flex items-start gap-3">
                        {/* Timeline dot */}
                        <div className="absolute -left-6 sm:-left-8 w-6 h-6 bg-[#0b0c0d] border border-white/20 flex items-center justify-center text-xs">
                          {getEventIcon(event)}
                        </div>

                        {/* Event Card */}
                        <div
                          className={`flex-1 p-3.5 border ${
                            event.type === 'goal'
                              ? 'bg-[#00ff88]/10 border-[#00ff88]'
                              : event.type === 'red_card'
                              ? 'bg-red-950/40 border-red-500'
                              : 'bg-[#0b0c0d] border-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1 font-mono">
                            <span className="font-bold text-[#00ff88]">
                              {event.minute}'
                            </span>
                            <span className="label opacity-60 uppercase">
                              {isHome ? match.homeTeam.name : match.awayTeam.name}
                            </span>
                          </div>

                          <p className="text-sm font-bold text-[#ececed] flex items-center gap-2">
                            <span>{event.player}</span>
                            {event.type === 'goal' && (
                              <span className="font-mono text-[10px] font-bold text-[#0b0c0d] bg-[#00ff88] px-1.5 py-0.5 uppercase">
                                GOL!
                              </span>
                            )}
                          </p>

                          {event.assist && (
                            <p className="text-xs text-[#ececed]/60 mt-0.5">
                              Assistência: <span className="text-[#ececed] font-medium">{event.assist}</span>
                            </p>
                          )}

                          {event.detail && (
                            <p className="text-xs text-[#ececed]/50 mt-1 italic">
                              "{event.detail}"
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CAMPO TÁTICO 2D & ESCALAÇÕES */}
          {activeTab === 'lineups' && (
            <div className="space-y-6">
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
                          className="flex items-center justify-between py-1 px-2 bg-[#0b0c0d] border border-white/5 text-[#ececed]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 text-center font-bold text-[#00ff88] text-[11px]">
                              {player.number}
                            </span>
                            <span className="truncate font-medium">{player.name}</span>
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

                    <p className="label opacity-70 pt-2 border-t border-white/10">
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
                          className="flex items-center justify-between py-1 px-2 bg-[#0b0c0d] border border-white/5 text-[#ececed]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 text-center font-bold text-[#ececed]/70 text-[11px]">
                              {player.number}
                            </span>
                            <span className="truncate font-medium">{player.name}</span>
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

                    <p className="label opacity-70 pt-2 border-t border-white/10">
                      TÉCNICO: <strong className="text-[#ececed]">{match.lineupAway.coach}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Substitutes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <h5 className="label opacity-80 mb-2">
                    RESERVAS ({match.homeTeam.shortName}):
                  </h5>
                  <p className="text-xs text-[#ececed]/70 leading-relaxed font-mono">
                    {match.lineupHome.substitutes.join(', ')}
                  </p>
                </div>

                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <h5 className="label opacity-80 mb-2">
                    RESERVAS ({match.awayTeam.shortName}):
                  </h5>
                  <p className="text-xs text-[#ececed]/70 leading-relaxed font-mono">
                    {match.lineupAway.substitutes.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONFRONTO DIRETO (H2H) */}
          {activeTab === 'h2h' && (
            <div className="space-y-4">
              {match.h2h ? (
                <div className="space-y-4">
                  <div className="bg-[#0b0c0d] p-5 border border-white/10">
                    <h4 className="label opacity-80 mb-4 text-center">
                      RETROSPECTO HISTÓRICO DOS CONFRONTOS
                    </h4>

                    <div className="grid grid-cols-3 gap-3 text-center font-mono">
                      <div className="bg-[#141618] p-4 border border-white/10">
                        <p className="text-3xl font-black text-[#00ff88]">{match.h2h.homeWins}</p>
                        <p className="label opacity-60 mt-1 uppercase">Vitórias {match.homeTeam.shortName}</p>
                      </div>

                      <div className="bg-[#141618] p-4 border border-white/10">
                        <p className="text-3xl font-black text-[#ececed]">{match.h2h.draws}</p>
                        <p className="label opacity-60 mt-1 uppercase">Empates</p>
                      </div>

                      <div className="bg-[#141618] p-4 border border-white/10">
                        <p className="text-3xl font-black text-[#ececed]">{match.h2h.awayWins}</p>
                        <p className="label opacity-60 mt-1 uppercase">Vitórias {match.awayTeam.shortName}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <h5 className="label opacity-80 mb-3">ÚLTIMOS RESULTADOS:</h5>
                      <div className="flex flex-wrap gap-2">
                        {match.h2h.lastMatches.map((res, i) => (
                          <span
                            key={i}
                            className="bg-[#141618] border border-white/10 text-[#ececed] text-xs font-mono px-3 py-1.5"
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 label opacity-40">
                  Dados de confronto direto em processamento.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
