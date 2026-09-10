import React, { useState } from 'react';
import { TEAMS_DATA } from '../data/teamsData';
import { Search, Trophy, ChevronRight, MapPin } from 'lucide-react';

interface TeamsCatalogProps {
  onSelectTeam: (teamId: string) => void;
}

export const TeamsCatalog: React.FC<TeamsCatalogProps> = ({ onSelectTeam }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'ALL' | 'Brasil' | 'Espanha' | 'Inglaterra' | 'Alemanha'>('ALL');

  const teamsList = Object.values(TEAMS_DATA);

  const filteredTeams = teamsList.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.nickname.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry === 'ALL' || team.country === selectedCountry;

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

        {/* Search & Country Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
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
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {(['ALL', 'Brasil', 'Espanha', 'Inglaterra', 'Alemanha'] as const).map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                id={`filter-country-${country}`}
                className={`cursor-pointer transition ${
                  selectedCountry === country ? 'status-pill' : 'status-pill-muted'
                }`}
              >
                {country === 'ALL' ? 'TODOS OS PAÍSES' : country.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeams.map((team) => (
          <article
            key={team.id}
            id={`team-card-${team.id}`}
            onClick={() => onSelectTeam(team.id)}
            className="group bg-[#141618] hover:bg-[#1a1c1e] border border-white/10 p-5 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-[#0b0c0d] border border-white/10 shrink-0">
                    {team.badgeEmoji}
                  </span>
                  <div>
                    <h3 className="font-['Syne'] font-extrabold text-lg text-[#ececed] group-hover:text-[#00ff88] transition uppercase">
                      {team.name}
                    </h3>
                    <span className="label opacity-60 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {team.originCity} • {team.foundationYear}
                    </span>
                  </div>
                </div>

                <span className="label text-[#00ff88] opacity-100 font-bold">
                  {team.country.toUpperCase()}
                </span>
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
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="label opacity-60 truncate max-w-[190px]">
                {team.stadium.name.split('(')[0]}
              </span>
              <span className="font-mono text-xs font-bold text-[#00ff88] group-hover:underline flex items-center gap-1 uppercase tracking-wider">
                <span>História Completa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
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
