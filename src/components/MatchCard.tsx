import React from 'react';
import { Match } from '../types';
import { Star, ChevronRight, Info } from 'lucide-react';

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
            <div className="flex items-center gap-2">
              <span className="text-lg shrink-0">{match.homeTeam.badgeEmoji}</span>
              <span className="font-bold text-sm sm:text-base text-[#ececed] truncate group-hover:text-[#00ff88] transition">
                {match.homeTeam.name}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenTeamHistory(match.homeTeam.id);
              }}
              className="label text-[#00ff88] opacity-75 hover:opacity-100 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
            >
              <Info className="w-2.5 h-2.5" />
              <span>História</span>
            </button>
          </div>

          {/* Score Badge */}
          <div>
            {match.status === 'SCHEDULED' ? (
              <div className="score-badge border-dashed opacity-50 text-sm py-1 px-3">
                VS
              </div>
            ) : (
              <div className="score-badge text-lg sm:text-xl">
                <span>{match.homeScore}</span>
                <span className="opacity-40 mx-1">-</span>
                <span>{match.awayScore}</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-start text-left min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-[#ececed] truncate group-hover:text-[#00ff88] transition">
                {match.awayTeam.name}
              </span>
              <span className="text-lg shrink-0">{match.awayTeam.badgeEmoji}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenTeamHistory(match.awayTeam.id);
              }}
              className="label text-[#00ff88] opacity-75 hover:opacity-100 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
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
      </div>

      {/* Footer Details & Action Button */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="label opacity-60 truncate">
          {match.stadium.split(',')[0]}
        </span>
        <button
          onClick={() => onSelectMatch(match)}
          id={`btn-open-match-${match.id}`}
          className="font-mono text-xs font-bold text-[#00ff88] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer"
        >
          <span>Estatísticas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
