import React from 'react';
import { Match } from '../types';
import { getMatchBroadcast } from '../utils/footballMatchEnhancers';
import { MatchMinuteProgressBar } from './MatchMinuteProgressBar';
import { Star, ChevronRight, Info, Tv } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
  onSelectMatch: (match: Match) => void;
  onOpenTeamHistory: (teamId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  isFavorite,
  onToggleFavorite,
  onSelectMatch,
  onOpenTeamHistory,
}) => {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const lastEvent = match.events.length > 0 ? match.events[match.events.length - 1] : null;

  return (
    <article
      id={`match-card-${match.id}`}
      className="bg-[#141618] hover:bg-[#1a1c1e] border border-white/10 p-5 flex flex-col justify-between gap-3 transition-colors group"
    >
      {/* Top Header: League & Status */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="label truncate">
          {match.league} • {match.round}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {isLive && (
            <span className="status-pill animate-pulse">
              {match.minute}' AO VIVO
            </span>
          )}

          {isFinished && (
            <span className="status-pill-muted">
              ENCERRADO
            </span>
          )}

          {!isLive && !isFinished && (
            <span className="label opacity-100 font-bold">
              {match.time}
            </span>
          )}

          {/* Favorite toggle */}
          <button
            id={`btn-fav-${match.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(match.id);
            }}
            title={isFavorite ? 'Remover dos favoritos' : 'Favoritar e receber notificações'}
            className={`p-1 border transition cursor-pointer ${
              isFavorite
                ? 'border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10'
                : 'border-white/15 text-[#ececed]/40 hover:text-[#ececed]'
            }`}
          >
            <Star className={`w-3 h-3 ${isFavorite ? 'fill-[#00ff88]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Scoreboard Row */}
      <div
        onClick={() => onSelectMatch(match)}
        className="cursor-pointer py-2 transition"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center text-center gap-2">
          {/* Home Team */}
          <div className="flex flex-col items-end text-right min-w-0">
            <div className="flex items-center justify-end gap-2 w-full min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#ececed] truncate group-hover:text-[#00ff88] transition text-right">
                {match.homeTeam.name}
              </span>
              {match.homeTeam.logoUrl ? (
                <img
                  src={match.homeTeam.logoUrl}
                  alt={match.homeTeam.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-base sm:text-lg shrink-0">{match.homeTeam.badgeEmoji}</span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenTeamHistory(match.homeTeam.id);
              }}
              className="label text-[#00ff88] opacity-75 hover:opacity-100 hover:underline flex items-center gap-1 mt-1 cursor-pointer text-[10px]"
            >
              <Info className="w-2.5 h-2.5" />
              <span>História</span>
            </button>
          </div>

          {/* Score Badge */}
          <div className="shrink-0">
            {match.status === 'SCHEDULED' ? (
              <div className="score-badge border-dashed opacity-60 text-xs sm:text-sm py-1 px-2.5">
                VS
              </div>
            ) : (
              <div className="score-badge text-base sm:text-xl py-1 px-2 sm:px-3">
                <span className={match.homeScore > match.awayScore ? 'text-[#00ff88]' : ''}>
                  {match.homeScore}
                </span>
                <span className="opacity-40 mx-1">-</span>
                <span className={match.awayScore > match.homeScore ? 'text-[#00ff88]' : ''}>
                  {match.awayScore}
                </span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-start text-left min-w-0">
            <div className="flex items-center justify-start gap-2 w-full min-w-0">
              {match.awayTeam.logoUrl ? (
                <img
                  src={match.awayTeam.logoUrl}
                  alt={match.awayTeam.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-base sm:text-lg shrink-0">{match.awayTeam.badgeEmoji}</span>
              )}
              <span className="font-bold text-xs sm:text-sm text-[#ececed] truncate group-hover:text-[#00ff88] transition text-left">
                {match.awayTeam.name}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenTeamHistory(match.awayTeam.id);
              }}
              className="label text-[#00ff88] opacity-75 hover:opacity-100 hover:underline flex items-center gap-1 mt-1 cursor-pointer text-[10px]"
            >
              <Info className="w-2.5 h-2.5" />
              <span>História</span>
            </button>
          </div>
        </div>

        {/* Latest Goal / Event snippet */}
        <div className="mt-3">
          {lastEvent ? (
            <div className="label text-center text-[#00ff88] opacity-100 font-bold truncate">
              {lastEvent.type === 'goal' ? '⚽ GOL' : '⚡ LANCE'}: {lastEvent.player.toUpperCase()} ({lastEvent.minute}')
            </div>
          ) : match.status === 'SCHEDULED' ? (
            <div className="label text-center opacity-60">
              PRÓXIMO JOGO
            </div>
          ) : (
            <div className="label text-center opacity-60">
              FIM DE JOGO
            </div>
          )}
        </div>

        {/* Animated Minute Progress Bar relative to 90 minutes */}
        {isLive && (
          <div className="mt-2.5">
            <MatchMinuteProgressBar minute={match.minute} status={match.status} variant="card" />
          </div>
        )}
      </div>

      {/* Footer Details & Action Button */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[10px] font-mono text-[#ececed]/80 bg-[#0b0c0d] px-2 py-0.5 border border-white/10 flex items-center gap-1 truncate max-w-[160px] sm:max-w-[210px]" title={getMatchBroadcast(match).join(' • ')}>
            <Tv className="w-2.5 h-2.5 text-[#00ff88] shrink-0" />
            <span className="truncate">{getMatchBroadcast(match).slice(0, 2).join(' • ')}</span>
          </span>
        </div>
        <button
          onClick={() => onSelectMatch(match)}
          id={`btn-open-match-${match.id}`}
          className="font-mono text-xs font-bold text-[#00ff88] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer shrink-0"
        >
          <span>Estatísticas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
