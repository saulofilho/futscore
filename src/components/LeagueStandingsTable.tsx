import React, { useState } from 'react';
import { LeagueTable } from '../types';
import { Trophy, RefreshCw } from 'lucide-react';

interface LeagueStandingsTableProps {
  standings: LeagueTable[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const LeagueStandingsTable: React.FC<LeagueStandingsTableProps> = ({
  standings,
  onRefresh,
  isRefreshing = false,
}) => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(
    standings[0]?.id || 'bra.1'
  );

  const activeLeague = standings.find((l) => l.id === selectedLeagueId) || standings[0];

  if (!activeLeague) {
    return (
      <div className="bg-[#141618] border border-white/10 p-8 text-center">
        <p className="font-mono text-xs text-[#ececed]/60">Nenhuma tabela carregada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header & League selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#00ff88]" />
          <h2 className="font-['Syne'] font-extrabold text-lg uppercase tracking-tight text-[#ececed]">
            Tabela de Classificação Oficial (Dados Reais)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1.5 bg-[#141618] border border-white/10 hover:border-[#00ff88] text-[#ececed] transition cursor-pointer text-xs font-mono flex items-center gap-1.5"
              title="Atualizar tabela de classificação"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#00ff88]' : ''}`} />
              <span className="hidden sm:inline">ATUALIZAR</span>
            </button>
          )}

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {standings.map((league) => (
              <button
                key={league.id}
                onClick={() => setSelectedLeagueId(league.id)}
                className={`font-mono text-xs px-2.5 py-1 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedLeagueId === league.id
                    ? 'bg-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-white/5 border border-white/5 text-[#ececed]/70 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{league.icon}</span>
                <span>{league.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected League Banner */}
      <div className="bg-[#0b0c0d] p-3 border border-white/10 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">{activeLeague.icon}</span>
          <span className="font-bold text-[#ececed] uppercase">{activeLeague.name}</span>
          <span className="label opacity-60">Temporada {activeLeague.season}</span>
        </div>
        <span className="label text-[#00ff88] opacity-100 font-bold">
          {activeLeague.entries.length} CLUBES
        </span>
      </div>

      {/* Standings Table */}
      <div className="bg-[#141618] border border-white/10 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 font-mono text-[10px] text-[#ececed]/50 uppercase bg-[#0b0c0d]/60">
              <th className="py-2.5 px-3 text-center w-10">POS</th>
              <th className="py-2.5 px-3">CLUBE</th>
              <th className="py-2.5 px-2 text-center font-bold text-[#00ff88]">PTS</th>
              <th className="py-2.5 px-2 text-center">J</th>
              <th className="py-2.5 px-2 text-center">V</th>
              <th className="py-2.5 px-2 text-center">E</th>
              <th className="py-2.5 px-2 text-center">D</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">GP</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">GC</th>
              <th className="py-2.5 px-2 text-center">SG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {activeLeague.entries.map((entry) => {
              // Highlight zones
              const isG4 = entry.rank <= 4;
              const isG6 = entry.rank > 4 && entry.rank <= 6;
              const isZ4 = activeLeague.id === 'bra.1' && entry.rank >= 17;

              return (
                <tr
                  key={entry.teamId || entry.rank}
                  className="hover:bg-white/5 transition group"
                >
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold ${
                        isG4
                          ? 'bg-[#00ff88] text-[#0b0c0d]'
                          : isG6
                          ? 'bg-blue-500 text-white'
                          : isZ4
                          ? 'bg-red-500 text-white'
                          : 'text-[#ececed]/60'
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <div className="flex items-center gap-2.5">
                      {entry.logoUrl ? (
                        <img
                          src={entry.logoUrl}
                          alt={entry.teamName}
                          className="w-5 h-5 object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-sm shrink-0">⚽</span>
                      )}
                      <span className="font-bold text-[#ececed] group-hover:text-[#00ff88] transition truncate max-w-[150px] sm:max-w-none">
                        {entry.teamName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center font-bold text-sm text-[#00ff88]">
                    {entry.points}
                  </td>
                  <td className="py-2.5 px-2 text-center text-[#ececed]/80">{entry.played}</td>
                  <td className="py-2.5 px-2 text-center text-[#ececed]/80">{entry.wins}</td>
                  <td className="py-2.5 px-2 text-center text-[#ececed]/80">{entry.draws}</td>
                  <td className="py-2.5 px-2 text-center text-[#ececed]/80">{entry.losses}</td>
                  <td className="py-2.5 px-2 text-center text-[#ececed]/50 hidden sm:table-cell">
                    {entry.goalsFor}
                  </td>
                  <td className="py-2.5 px-2 text-center text-[#ececed]/50 hidden sm:table-cell">
                    {entry.goalsAgainst}
                  </td>
                  <td
                    className={`py-2.5 px-2 text-center font-bold ${
                      entry.goalDiff > 0
                        ? 'text-[#00ff88]'
                        : entry.goalDiff < 0
                        ? 'text-red-400'
                        : 'text-[#ececed]/50'
                    }`}
                  >
                    {entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#ececed]/50 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#00ff88] inline-block"></span>
          <span>Fase de Grupos / Libertadores / Champions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-blue-500 inline-block"></span>
          <span>Pré-Libertadores / Europa League</span>
        </div>
        {activeLeague.id === 'bra.1' && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-500 inline-block"></span>
            <span>Zona de Rebaixamento (Z-4)</span>
          </div>
        )}
      </div>
    </div>
  );
};
