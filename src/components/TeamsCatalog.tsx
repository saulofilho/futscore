import React, { useState } from 'react';
import { TEAMS_DATA } from '../data/teamsData';
import { Search, Trophy, ChevronRight, MapPin, Heart, Star, Crown, Sliders, Sparkles } from 'lucide-react';

interface TeamsCatalogProps {
  onSelectTeam: (teamId: string) => void;
  favoriteTeamIds?: string[];
  primaryFavoriteTeamId?: string;
  onToggleFavoriteTeam?: (teamId: string) => void;
  onSetPrimaryFavoriteTeam?: (teamId: string) => void;
  onOpenFavoriteTeamSelector?: () => void;
}

export const TeamsCatalog: React.FC<TeamsCatalogProps> = ({ 
  onSelectTeam,
  favoriteTeamIds = [],
  primaryFavoriteTeamId,
  onToggleFavoriteTeam,
  onSetPrimaryFavoriteTeam,
  onOpenFavoriteTeamSelector,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'ALL' | 'FAVORITES' | 'Brasil' | 'Espanha' | 'Inglaterra' | 'Alemanha'>('ALL');

  const teamsList = Object.values(TEAMS_DATA);

  const primaryTeam = primaryFavoriteTeamId && TEAMS_DATA[primaryFavoriteTeamId]
    ? TEAMS_DATA[primaryFavoriteTeamId]
    : favoriteTeamIds.length > 0 && TEAMS_DATA[favoriteTeamIds[0]]
    ? TEAMS_DATA[favoriteTeamIds[0]]
    : null;

  const filteredTeams = teamsList.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.popularName && team.popularName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      team.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.nickname.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCountry = true;
    if (selectedCountry === 'FAVORITES') {
      matchesCountry = favoriteTeamIds.includes(team.id) || team.id === primaryFavoriteTeamId;
    } else if (selectedCountry !== 'ALL') {
      matchesCountry = team.country === selectedCountry;
    }

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="mb-6">
        <div className="label text-[#00ff88] opacity-100 font-bold mb-2">
          [02] ENCICLOPÉDIA DOS CLUBES
        </div>
        <h1 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#ececed] leading-none mb-3">
          História de Cada Time
        </h1>
        <p className="text-sm text-[#ececed]/60 max-w-2xl leading-relaxed">
          Clique no card de qualquer time para abrir a sua biografia detalhada: fundação, galeria completa de troféus, maiores ídolos, rivalidades e feitos históricos.
        </p>

        {/* Favorite Team Promo Bar */}
        {onOpenFavoriteTeamSelector && (
          <div className="mt-4 bg-gradient-to-r from-[#141618] via-[#1a1c1e] to-[#141618] border border-amber-500/30 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white uppercase text-xs">
                    {primaryTeam ? `Seu Clube do Coração: ${primaryTeam.popularName || primaryTeam.name}` : 'Escolha Seu Time do Coração'}
                  </span>
                  {primaryTeam && (
                    <span className="text-sm">{primaryTeam.badgeEmoji}</span>
                  )}
                </div>
                <span className="text-[11px] text-[#ececed]/60 font-sans">
                  {primaryTeam 
                    ? `Notificações sonoras e filtros de jogos ativos para o ${primaryTeam.name}. Clique para gerenciar seus clubes favoritos.`
                    : 'Defina seu time favorito para receber alertas imediatos de gols e placares personalizados.'}
                </span>
              </div>
            </div>

            <button
              id="btn-catalog-open-fav-modal"
              onClick={onOpenFavoriteTeamSelector}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>{primaryTeam ? 'Trocar Time Favorito' : 'Escolher Time Favorito'}</span>
            </button>
          </div>
        )}

        {/* Search & Country Filter Controls */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          {/* Search input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#ececed]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-search-teams"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por clube, cidade ou apelido..."
              className="w-full bg-[#141618] border border-white/15 focus:border-[#00ff88] pl-10 pr-4 py-2 font-mono text-xs text-[#ececed] placeholder-[#ececed]/30 focus:outline-hidden transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 shrink-0">
            {(['ALL', 'FAVORITES', 'Brasil', 'Espanha', 'Inglaterra', 'Alemanha'] as const).map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                id={`filter-country-${country}`}
                className={`cursor-pointer transition shrink-0 whitespace-nowrap text-[10px] sm:text-xs ${
                  selectedCountry === country ? 'status-pill' : 'status-pill-muted'
                }`}
              >
                {country === 'ALL' 
                  ? 'TODOS OS PAÍSES' 
                  : country === 'FAVORITES' 
                  ? `⭐ MEUS FAVORITOS (${favoriteTeamIds.length})` 
                  : country.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeams.map((team) => {
          const isPrimary = team.id === primaryFavoriteTeamId;
          const isFav = favoriteTeamIds.includes(team.id);

          return (
            <article
              key={team.id}
              id={`team-card-${team.id}`}
              onClick={() => onSelectTeam(team.id)}
              className={`group bg-[#141618] hover:bg-[#1a1c1e] border p-5 transition-all cursor-pointer flex flex-col justify-between relative ${
                isPrimary
                  ? 'border-amber-400 bg-gradient-to-b from-amber-950/20 to-[#141618]'
                  : isFav
                  ? 'border-[#00ff88]/60 bg-gradient-to-b from-emerald-950/15 to-[#141618]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div>
                {/* Header inside card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-[#0b0c0d] border border-white/10 shrink-0">
                      {team.badgeEmoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-['Syne'] font-extrabold text-lg text-[#ececed] group-hover:text-[#00ff88] transition uppercase">
                          {team.name}
                        </h3>
                        {isPrimary && (
                          <span className="text-[9px] bg-amber-400 text-black font-extrabold px-1 rounded-2xs">
                            MEU TIME
                          </span>
                        )}
                      </div>
                      <span className="label opacity-60 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {team.originCity} • {team.foundationYear}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {onToggleFavoriteTeam && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavoriteTeam(team.id);
                        }}
                        title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                        className={`p-1.5 border transition cursor-pointer ${
                          isFav
                            ? 'bg-[#00ff88] text-black border-[#00ff88]'
                            : 'bg-[#0b0c0d] text-white/40 border-white/10 hover:text-white'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-black' : ''}`} />
                      </button>
                    )}
                    <span className="label text-[#00ff88] opacity-100 font-bold ml-1">
                      {team.country.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Summary Snippet */}
                <p className="text-xs text-[#ececed]/70 line-clamp-3 leading-relaxed mt-2 mb-4">
                  {team.summary}
                </p>

                {/* Trophies Mini Bar */}
                <div className="bg-[#0b0c0d] p-3 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Trophy className="w-3.5 h-3.5" />
                    <span className="uppercase text-[11px] tracking-wider">Troféus Principais</span>
                  </div>
                  <span className="text-[#ececed] font-bold">
                    {team.trophies.reduce((acc, t) => acc + t.count, 0)} títulos
                  </span>
                </div>
              </div>

              {/* Bottom action trigger */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs gap-2">
                <span className="label opacity-60 truncate min-w-0">
                  {team.stadium.name.split('(')[0]}
                </span>
                <span className="font-mono text-xs font-bold text-[#00ff88] group-hover:underline flex items-center gap-1 uppercase tracking-wider shrink-0">
                  <span>História Completa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {filteredTeams.length === 0 && (
        <div className="bg-[#141618] border border-white/10 p-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#ececed]/60">
            Nenhum clube encontrado para a busca "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('ALL');
            }}
            className="mt-4 label text-[#00ff88] opacity-100 font-bold hover:underline cursor-pointer"
          >
            [LIMPAR FILTROS DE BUSCA]
          </button>
        </div>
      )}
    </div>
  );
};
