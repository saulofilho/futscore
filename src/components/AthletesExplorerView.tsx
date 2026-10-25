import React, { useState } from 'react';
import { AthleteProfile } from '../types';
import { ATHLETES_DATABASE } from '../data/athletesData';
import { Search, Trophy, Filter, ArrowUpDown, Star, Activity, Sparkles, User, ExternalLink } from 'lucide-react';

interface AthletesExplorerViewProps {
  onSelectAthlete: (athlete: AthleteProfile) => void;
  onOpenTeamHistory: (teamId: string) => void;
}

export const AthletesExplorerView: React.FC<AthletesExplorerViewProps> = ({
  onSelectAthlete,
  onOpenTeamHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [selectedNationality, setSelectedNationality] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'rating' | 'goals' | 'assists' | 'value' | 'matches'>('rating');

  // Filter athletes
  const filteredAthletes = ATHLETES_DATABASE.filter((athlete) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = athlete.name.toLowerCase().includes(q);
      const matchFullName = athlete.fullName.toLowerCase().includes(q);
      const matchNick = (athlete.nickname || '').toLowerCase().includes(q);
      const matchTeam = athlete.teamName.toLowerCase().includes(q);
      const matchNation = athlete.nationality.toLowerCase().includes(q);
      if (!matchName && !matchFullName && !matchNick && !matchTeam && !matchNation) {
        return false;
      }
    }

    // Position filter
    if (selectedPosition !== 'ALL') {
      if (selectedPosition === 'Goleiro' && athlete.position !== 'Goleiro') return false;
      if (selectedPosition === 'Defensor' && athlete.position !== 'Zagueiro' && athlete.position !== 'Lateral') return false;
      if (selectedPosition === 'Meio-Campista' && athlete.position !== 'Meio-Campista' && athlete.position !== 'Volante') return false;
      if (selectedPosition === 'Atacante' && athlete.position !== 'Atacante' && athlete.position !== 'Ponta') return false;
    }

    // Nationality filter
    if (selectedNationality !== 'ALL') {
      if (athlete.nationality !== selectedNationality) return false;
    }

    return true;
  });

  // Sort athletes
  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.seasonStats.rating - a.seasonStats.rating;
    }
    if (sortBy === 'goals') {
      return (b.seasonStats.goals || 0) - (a.seasonStats.goals || 0);
    }
    if (sortBy === 'assists') {
      return (b.seasonStats.assists || 0) - (a.seasonStats.assists || 0);
    }
    if (sortBy === 'matches') {
      return b.seasonStats.matches - a.seasonStats.matches;
    }
    if (sortBy === 'value') {
      const getVal = (v: string) => {
        const num = parseFloat(v.replace(/[^0-9.]/g, ''));
        return num || 0;
      };
      return getVal(b.marketValue) - getVal(a.marketValue);
    }
    return 0;
  });

  const nationalities = Array.from(new Set(ATHLETES_DATABASE.map(a => a.nationality))).sort();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="label text-[#00ff88] opacity-100 font-bold mb-1.5">
            [03] PERFIS &amp; ESTATÍSTICAS • ATLETAS MULTIESPORTIVOS
          </div>
          <h1 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#ececed] leading-none mb-2">
            Central de Atletas &amp; Craques
          </h1>
          <p className="text-xs sm:text-sm text-[#ececed]/60 max-w-2xl leading-relaxed">
            Consulte fichas técnicas aprofundadas, estatísticas oficiais da temporada, histórico de clubes, características táticas e valores de mercado dos maiores atletas do futebol, basquete, lutas e esportes internacionais.
          </p>
        </div>

        {/* Total Count Badge */}
        <div className="flex items-center gap-2 bg-[#0b0c0d] p-3 border border-white/10 shrink-0">
          <User className="w-4 h-4 text-[#00ff88]" />
          <div className="font-mono text-xs">
            <span className="text-[#00ff88] font-bold text-sm">{sortedAthletes.length}</span>
            <span className="text-[#ececed]/60 ml-1.5 uppercase">Atletas listados</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141618] p-4 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#ececed]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar atleta pelo nome, apelido, clube ou país..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0b0c0d] border border-white/15 pl-9 pr-4 py-2 text-xs sm:text-sm text-[#ececed] placeholder:text-[#ececed]/40 focus:outline-none focus:border-[#00ff88]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-white/50 hover:text-white"
              >
                LIMPAR
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#00ff88]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0b0c0d] border border-white/15 px-3 py-2 text-xs font-mono text-[#ececed] focus:outline-none focus:border-[#00ff88] cursor-pointer"
            >
              <option value="rating">Ordenar: Melhor Nota Média</option>
              <option value="goals">Ordenar: Mais Gols</option>
              <option value="assists">Ordenar: Mais Assistências</option>
              <option value="value">Ordenar: Maior Valor (€)</option>
              <option value="matches">Ordenar: Mais Partidas</option>
            </select>
          </div>
        </div>

        {/* Position Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
          <span className="label opacity-60 text-[10px] mr-1 uppercase">Posição:</span>
          {[
            { label: 'TODAS', val: 'ALL' },
            { label: 'ATACANTES', val: 'Atacante' },
            { label: 'MEIO-CAMPISTAS', val: 'Meio-Campista' },
            { label: 'DEFENSORES', val: 'Defensor' },
            { label: 'GOLEIROS', val: 'Goleiro' },
          ].map((pos) => (
            <button
              key={pos.val}
              onClick={() => setSelectedPosition(pos.val)}
              className={`font-mono text-[10px] sm:text-xs px-2.5 py-1 border transition cursor-pointer uppercase ${
                selectedPosition === pos.val
                  ? 'bg-[#00ff88] border-[#00ff88] text-[#0b0c0d] font-bold'
                  : 'bg-[#0b0c0d] border-white/10 text-[#ececed]/70 hover:text-white'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>

        {/* Nationality Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
          <span className="label opacity-60 text-[10px] mr-1 uppercase">País:</span>
          <button
            onClick={() => setSelectedNationality('ALL')}
            className={`font-mono text-[10px] px-2 py-0.5 border transition cursor-pointer uppercase ${
              selectedNationality === 'ALL'
                ? 'bg-[#00ff88] border-[#00ff88] text-[#0b0c0d] font-bold'
                : 'bg-[#0b0c0d] border-white/10 text-[#ececed]/60 hover:text-white'
            }`}
          >
            Todos
          </button>
          {nationalities.map((nat) => (
            <button
              key={nat}
              onClick={() => setSelectedNationality(nat)}
              className={`font-mono text-[10px] px-2 py-0.5 border transition cursor-pointer uppercase ${
                selectedNationality === nat
                  ? 'bg-[#00ff88] border-[#00ff88] text-[#0b0c0d] font-bold'
                  : 'bg-[#0b0c0d] border-white/10 text-[#ececed]/60 hover:text-white'
              }`}
            >
              {nat}
            </button>
          ))}
        </div>
      </div>

      {/* Athletes Cards Grid */}
      {sortedAthletes.length === 0 ? (
        <div className="bg-[#141618] border border-white/10 p-12 text-center">
          <User className="w-10 h-10 text-white/30 mx-auto mb-3" />
          <h3 className="font-['Syne'] font-bold text-lg text-white">Nenhum atleta encontrado</h3>
          <p className="text-xs text-[#ececed]/60 mt-1 max-w-sm mx-auto">
            Tente buscar com outro termo ou redefinir os filtros de posição e país.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPosition('ALL');
              setSelectedNationality('ALL');
            }}
            className="mt-4 px-4 py-1.5 bg-[#00ff88] text-[#0b0c0d] font-mono text-xs font-bold uppercase cursor-pointer"
          >
            Redefinir Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAthletes.map((athlete) => (
            <article
              key={athlete.id}
              onClick={() => onSelectAthlete(athlete)}
              className="bg-[#141618] hover:bg-[#1a1e22] border border-white/10 hover:border-[#00ff88]/50 p-4 flex flex-col justify-between transition cursor-pointer group shadow-md"
            >
              <div>
                {/* Top Badge: Position & Nation & Rating */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#0b0c0d] border border-white/10 text-[#00ff88] font-bold uppercase">
                      {athlete.position}
                    </span>
                    <span className="text-xs" title={athlete.nationality}>
                      {athlete.flagEmoji}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs text-[#00ff88] font-bold bg-[#0b0c0d] px-2 py-0.5 border border-white/10">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{athlete.seasonStats.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Player Profile Header */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="relative w-14 h-14 bg-[#0b0c0d] border border-white/15 flex items-center justify-center text-2xl shrink-0 group-hover:border-[#00ff88] transition overflow-hidden">
                    {athlete.photoUrl ? (
                      <img
                        src={athlete.photoUrl}
                        alt={athlete.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{athlete.photoEmoji || '⚽'}</span>
                    )}
                    <span className="absolute bottom-0 right-0 bg-[#00ff88] text-[#0b0c0d] font-mono text-[9px] font-black px-1">
                      #{athlete.number}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-['Syne'] font-extrabold text-base text-white group-hover:text-[#00ff88] transition leading-tight truncate">
                      {athlete.name}
                    </h3>
                    <p className="text-[11px] text-[#ececed]/60 font-mono truncate mt-0.5">
                      {athlete.teamBadgeEmoji} {athlete.teamName}
                    </p>
                    <p className="text-[10px] text-[#00ff88] font-mono mt-1 font-bold">
                      {athlete.marketValue} <span className="text-[#ececed]/50 font-normal">({athlete.marketValueBrl})</span>
                    </p>
                  </div>
                </div>

                {/* Stats Summary Bar */}
                <div className="grid grid-cols-4 gap-1.5 py-2.5 px-2 bg-[#0b0c0d] border border-white/5 font-mono text-center mb-3">
                  <div>
                    <p className="text-xs font-bold text-white">{athlete.seasonStats.matches}</p>
                    <p className="label opacity-50 text-[8px]">JOGOS</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#00ff88]">
                      {athlete.position === 'Goleiro' ? athlete.seasonStats.cleanSheets ?? 0 : athlete.seasonStats.goals}
                    </p>
                    <p className="label opacity-50 text-[8px]">
                      {athlete.position === 'Goleiro' ? 'SG' : 'GOLS'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      {athlete.position === 'Goleiro' ? athlete.seasonStats.saves ?? 0 : athlete.seasonStats.assists}
                    </p>
                    <p className="label opacity-50 text-[8px]">
                      {athlete.position === 'Goleiro' ? 'DEFESAS' : 'ASSISTS'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{athlete.age}a</p>
                    <p className="label opacity-50 text-[8px]">IDADE</p>
                  </div>
                </div>

                {/* Strengths Pills */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {athlete.strengths.slice(0, 2).map((str, idx) => (
                    <span
                      key={idx}
                      className="bg-[#141618] border border-white/10 text-[9px] font-mono px-2 py-0.5 text-[#ececed]/70 truncate max-w-full"
                    >
                      • {str}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#ececed]/50">
                  {athlete.preferredFoot} • {athlete.height}
                </span>

                <span className="text-[11px] text-[#00ff88] font-bold group-hover:underline flex items-center gap-1">
                  Ver Ficha Completa →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
