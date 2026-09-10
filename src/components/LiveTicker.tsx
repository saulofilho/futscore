import React from 'react';
import { Match } from '../types';

interface LiveTickerProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ matches, onSelectMatch }) => {
  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const displayMatches = liveMatches.length > 0 ? liveMatches : matches.slice(0, 6);

  return (
    <div className="bg-[#ececed] text-[#0b0c0d] py-2 px-4 overflow-x-auto scrollbar-none border-b border-[#0b0c0d]">
      <div className="flex items-center gap-6 w-max min-w-full font-mono text-xs font-bold tracking-wider">
        <div className="flex items-center gap-2 shrink-0 bg-[#0b0c0d] text-[#00ff88] px-2 py-0.5 text-[11px] uppercase font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping"></span>
          <span>{liveMatches.length > 0 ? `LIVE (${liveMatches.length})` : 'JOGOS HOJE'}</span>
        </div>

        <div className="flex items-center gap-6">
          {displayMatches.map(match => (
            <button
              key={match.id}
              onClick={() => onSelectMatch(match)}
              id={`ticker-match-${match.id}`}
              className="flex items-center gap-2 hover:text-[#00ff88] transition cursor-pointer shrink-0"
              title={`Ver ${match.homeTeam.name} x ${match.awayTeam.name}`}
            >
              <span className={match.status === 'LIVE' ? 'text-[#0b0c0d] underline decoration-[#00ff88] decoration-2' : 'opacity-60'}>
                {match.status === 'LIVE' ? `${match.minute}'` : match.time}
              </span>
              <span>
                {match.homeTeam.shortName} {match.status === 'SCHEDULED' ? 'VS' : `${match.homeScore}-${match.awayScore}`} {match.awayTeam.shortName}
              </span>
              <span className="opacity-40">•</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
