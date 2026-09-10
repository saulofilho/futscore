import React, { useState } from 'react';
import { PLAYERS_RANKING } from '../data/rankingsData';
import { PlayerSeasonStat } from '../types';
import { Target, Zap, Shield, Search, X, Flame, Star, ChevronRight } from 'lucide-react';

export const RankingsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'artilharia' | 'assistencias' | 'melhor_nota' | 'chuteira_ouro' | 'goleiros'>('artilharia');
  const [selectedLeague, setSelectedLeague] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerSeasonStat | null>(null);

  // Filter players
  const filteredPlayers = [...PLAYERS_RANKING]
    .filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.nationality.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLeague =
        selectedLeague === 'ALL' || player.league.toLowerCase().includes(selectedLeague.toLowerCase());

      return matchesSearch && matchesLeague;
    })
    .sort((a, b) => {
      if (selectedCategory === 'artilharia' || selectedCategory === 'chuteira_ouro') {
        return b.goals - a.goals;
      }
      if (selectedCategory === 'assistencias') {
        return b.assists - a.assists;
      }
      if (selectedCategory === 'melhor_nota') {
        return b.rating - a.rating;
      }
      if (selectedCategory === 'goleiros') {
        return (b.cleanSheets || 0) - (a.cleanSheets || 0);
      }
      return b.rating - a.rating;
    });

  const getRankBadge = (index: number) => {
    if (index === 0) return <span className="font-mono w-6 h-6 bg-[#00ff88] text-[#0b0c0d] font-black flex items-center justify-center text-xs">1</span>;
    if (index === 1) return <span className="font-mono w-6 h-6 bg-[#ececed] text-[#0b0c0d] font-black flex items-center justify-center text-xs">2</span>;
    if (index === 2) return <span className="font-mono w-6 h-6 bg-[#ececed]/60 text-[#0b0c0d] font-black flex items-center justify-center text-xs">3</span>;
    return <span className="font-mono w-6 h-6 border border-white/20 text-[#ececed]/60 font-bold flex items-center justify-center text-xs">#{index + 1}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="label text-[#00ff88] opacity-100 font-bold mb-2">
          [03] RANKING TEMPORADA
        </div>
        <h1 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#ececed] leading-none mb-3">
          Ranking dos Melhores Jogadores
        </h1>
        <p className="text-sm text-[#ececed]/60 max-w-2xl leading-relaxed">
          Acompanhe o desempenho estatístico detalhado dos atletas mais decisivos do planeta: artilharia implacável, garçons da temporada e notas médias de rendimento.
        </p>

        {/* Category switcher */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setSelectedCategory('artilharia')}
            className={`cursor-pointer transition flex items-center gap-1.5 ${
              selectedCategory === 'artilharia' ? 'status-pill' : 'status-pill-muted'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>ARTILHARIA (GOLS)</span>
          </button>

          <button
            onClick={() => setSelectedCategory('assistencias')}
            className={`cursor-pointer transition flex items-center gap-1.5 ${
              selectedCategory === 'assistencias' ? 'status-pill' : 'status-pill-muted'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>ASSISTÊNCIAS</span>
          </button>

          <button
            onClick={() => setSelectedCategory('melhor_nota')}
            className={`cursor-pointer transition flex items-center gap-1.5 ${
              selectedCategory === 'melhor_nota' ? 'status-pill' : 'status-pill-muted'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>NOTAS MÉDIAS</span>
          </button>

          <button
            onClick={() => setSelectedCategory('chuteira_ouro')}
            className={`cursor-pointer transition flex items-center gap-1.5 ${
              selectedCategory === 'chuteira_ouro' ? 'status-pill' : 'status-pill-muted'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>CHUTEIRA DE OURO</span>
          </button>

          <button
            onClick={() => setSelectedCategory('goleiros')}
            className={`cursor-pointer transition flex items-center gap-1.5 ${
              selectedCategory === 'goleiros' ? 'status-pill' : 'status-pill-muted'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>MELHORES GOLEIROS</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#ececed]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar jogador ou clube..."
              className="w-full bg-[#141618] border border-white/15 focus:border-[#00ff88] pl-9 pr-3 py-2 font-mono text-xs text-[#ececed] placeholder-[#ececed]/30 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {['ALL', 'Brasileirão', 'Champions', 'Premier', 'La Liga'].map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLeague(l)}
                className={`font-mono text-[11px] px-2.5 py-1 uppercase transition cursor-pointer ${
                  selectedLeague === l
                    ? 'bg-[#00ff88] text-[#0b0c0d] font-bold'
                    : 'bg-white/5 text-[#ececed]/60 hover:text-[#ececed] hover:bg-white/10'
                }`}
              >
                {l === 'ALL' ? 'TODAS AS LIGAS' : l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podium Cards for Top 3 */}
      {filteredPlayers.length >= 3 && !searchQuery && selectedLeague === 'ALL' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rank 2 */}
          <article
            onClick={() => setSelectedPlayer(filteredPlayers[1])}
            className="order-2 md:order-1 bg-[#141618] hover:bg-[#1a1c1e] border border-white/10 p-5 cursor-pointer transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono w-6 h-6 bg-[#ececed] text-[#0b0c0d] font-black flex items-center justify-center text-xs">2</span>
                <span className="label opacity-60">{filteredPlayers[1].teamName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-[#0b0c0d] border border-white/10">{filteredPlayers[1].photoEmoji}</span>
                <div>
                  <h3 className="font-['Syne'] font-extrabold text-[#ececed] text-base group-hover:text-[#00ff88] transition uppercase">{filteredPlayers[1].name}</h3>
                  <p className="label opacity-60 mt-0.5">{filteredPlayers[1].position} • {filteredPlayers[1].nationality}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono">
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Gols</p>
                <p className="text-base font-bold text-[#00ff88]">{filteredPlayers[1].goals}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Assists</p>
                <p className="text-base font-bold text-[#ececed]">{filteredPlayers[1].assists}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Nota Média</p>
                <p className="text-base font-bold text-[#00ff88]">{filteredPlayers[1].rating}</p>
              </div>
            </div>
          </article>

          {/* Rank 1 (Center Hero) */}
          <article
            onClick={() => setSelectedPlayer(filteredPlayers[0])}
            className="order-1 md:order-2 bg-[#141618] hover:bg-[#1a1c1e] border-2 border-[#00ff88] p-5 cursor-pointer transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono px-2 py-0.5 bg-[#00ff88] text-[#0b0c0d] font-black flex items-center gap-1 text-xs uppercase">
                  <span>👑 1º LUGAR</span>
                </span>
                <span className="label text-[#00ff88] opacity-100 font-bold">{filteredPlayers[0].teamName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-[#0b0c0d] border border-white/10">{filteredPlayers[0].photoEmoji}</span>
                <div>
                  <h3 className="font-['Syne'] font-extrabold text-lg text-[#ececed] group-hover:text-[#00ff88] transition uppercase">{filteredPlayers[0].name}</h3>
                  <p className="label opacity-60 mt-0.5">{filteredPlayers[0].position} • {filteredPlayers[0].nationality}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono">
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase font-bold">Gols</p>
                <p className="text-xl font-bold text-[#00ff88]">{filteredPlayers[0].goals}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase font-bold">Assists</p>
                <p className="text-xl font-bold text-[#ececed]">{filteredPlayers[0].assists}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase font-bold">Nota Média</p>
                <p className="text-xl font-bold text-[#00ff88]">{filteredPlayers[0].rating}</p>
              </div>
            </div>
          </article>

          {/* Rank 3 */}
          <article
            onClick={() => setSelectedPlayer(filteredPlayers[2])}
            className="order-3 bg-[#141618] hover:bg-[#1a1c1e] border border-white/10 p-5 cursor-pointer transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono w-6 h-6 bg-[#ececed]/60 text-[#0b0c0d] font-black flex items-center justify-center text-xs">3</span>
                <span className="label opacity-60">{filteredPlayers[2].teamName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-[#0b0c0d] border border-white/10">{filteredPlayers[2].photoEmoji}</span>
                <div>
                  <h3 className="font-['Syne'] font-extrabold text-[#ececed] text-base group-hover:text-[#00ff88] transition uppercase">{filteredPlayers[2].name}</h3>
                  <p className="label opacity-60 mt-0.5">{filteredPlayers[2].position} • {filteredPlayers[2].nationality}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono">
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Gols</p>
                <p className="text-base font-bold text-[#00ff88]">{filteredPlayers[2].goals}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Assists</p>
                <p className="text-base font-bold text-[#ececed]">{filteredPlayers[2].assists}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Nota Média</p>
                <p className="text-base font-bold text-[#00ff88]">{filteredPlayers[2].rating}</p>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Ranking List Table / Cards */}
      <div className="bg-[#141618] border border-white/10 overflow-hidden">
        <div className="p-4 bg-[#0b0c0d] border-b border-white/10 flex items-center justify-between text-xs">
          <span className="label text-[#ececed] opacity-80">Ranking Geral ({filteredPlayers.length} atletas)</span>
          <span className="label opacity-50 hidden sm:inline">Clique no atleta para detalhes</span>
        </div>

        <div className="divide-y divide-white/5">
          {filteredPlayers.map((player, idx) => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className="p-3.5 sm:p-4 hover:bg-[#1a1c1e] transition flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {getRankBadge(idx)}
                <span className="text-2xl p-1 bg-[#0b0c0d] border border-white/10 shrink-0">
                  {player.photoEmoji}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#ececed] group-hover:text-[#00ff88] transition truncate">
                      {player.name}
                    </p>
                    <span className="text-xs">{player.flagEmoji}</span>
                  </div>
                  <p className="label opacity-60 flex items-center gap-1.5 mt-0.5">
                    <span className="truncate">{player.teamName}</span>
                    <span>•</span>
                    <span>{player.position}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 shrink-0 font-mono">
                {selectedCategory === 'goleiros' ? (
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#00ff88]">{player.cleanSheets || 0} JOGOS SEM GOL</p>
                    <p className="text-[10px] text-[#ececed]/50">{player.saves || 0} DEFESAS</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 sm:gap-5 text-right">
                    <div>
                      <span className="text-[10px] text-[#ececed]/50 uppercase block">Gols</span>
                      <span className="text-sm font-bold text-[#00ff88]">{player.goals}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#ececed]/50 uppercase block">Assists</span>
                      <span className="text-sm font-bold text-[#ececed]">{player.assists}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#ececed]/50 uppercase block">Nota</span>
                      <span className="text-xs font-bold text-[#0b0c0d] bg-[#00ff88] px-1.5 py-0.5">
                        {player.rating}
                      </span>
                    </div>
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-[#ececed]/30 group-hover:text-[#00ff88] transition hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141618] border border-white/20 max-w-lg w-full p-6 shadow-2xl relative text-[#ececed]">
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 p-2 bg-[#0b0c0d] border border-white/10 text-[#ececed]/60 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <span className="text-4xl p-3 bg-[#0b0c0d] border border-white/10">
                {selectedPlayer.photoEmoji}
              </span>
              <div>
                <span className="label text-[#00ff88] opacity-100 font-bold">
                  {selectedPlayer.position} • {selectedPlayer.age} ANOS
                </span>
                <h3 className="font-['Syne'] font-extrabold text-xl text-[#ececed] uppercase mt-1">
                  {selectedPlayer.name} {selectedPlayer.flagEmoji}
                </h3>
                <p className="label opacity-60">
                  {selectedPlayer.teamName} ({selectedPlayer.league})
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 my-4 font-mono text-center">
              <div className="bg-[#0b0c0d] p-3 border border-white/10">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Gols</p>
                <p className="text-lg font-bold text-[#00ff88] mt-0.5">{selectedPlayer.goals}</p>
              </div>
              <div className="bg-[#0b0c0d] p-3 border border-white/10">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Assistências</p>
                <p className="text-lg font-bold text-[#ececed] mt-0.5">{selectedPlayer.assists}</p>
              </div>
              <div className="bg-[#0b0c0d] p-3 border border-white/10">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Nota Média</p>
                <p className="text-lg font-bold text-[#00ff88] mt-0.5">{selectedPlayer.rating}</p>
              </div>
              <div className="bg-[#0b0c0d] p-3 border border-white/10">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Partidas</p>
                <p className="text-sm font-bold text-[#ececed] mt-0.5">{selectedPlayer.matches}</p>
              </div>
              <div className="bg-[#0b0c0d] p-3 border border-white/10">
                <p className="text-[10px] text-[#ececed]/50 uppercase">xG</p>
                <p className="text-sm font-bold text-[#ececed] mt-0.5">{selectedPlayer.xG}</p>
              </div>
              <div className="bg-[#0b0c0d] p-3 border border-white/10">
                <p className="text-[10px] text-[#ececed]/50 uppercase">Mercado</p>
                <p className="text-sm font-bold text-[#00ff88] mt-0.5">{selectedPlayer.marketValue}</p>
              </div>
            </div>

            {/* Strengths */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="label mb-2 text-[#ececed] opacity-80">Principais Características:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlayer.strengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="font-mono bg-[#0b0c0d] text-[#ececed]/80 text-xs px-2.5 py-1 border border-white/10"
                  >
                    ⚡ {str.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
