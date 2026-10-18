import React, { useState, useMemo, useEffect } from 'react';
import { Match, LeagueTable } from '../types';
import { TEAMS_DATA } from '../data/teamsData';
import { 
  Heart, 
  Search, 
  X, 
  Check, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Trophy
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export interface FavoriteTeamOption {
  id: string; // unique identifier
  name: string;
  popularName?: string;
  shortName: string;
  logoUrl?: string;
  badgeEmoji: string;
  league: string;
  leagueIcon: string;
  country: string;
  rank?: number;
  points?: number;
  stadium?: string;
  coach?: string;
  primaryColor?: string;
  summary?: string;
}

export interface FavoriteTeamSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeamId: string; // Exactly 1 favorite team
  onSelectFavoriteTeam: (teamId: string) => void;
  standings?: LeagueTable[];
  matches?: Match[];
}

/**
 * Normalizes string for reliable team identification
 */
function normalizeTeamKey(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Extracts 100% real football clubs from official league standings,
 * real live matches, and historical encyclopedia. Zero mock data.
 */
function extractRealTeams(standings: LeagueTable[] = [], matches: Match[] = []): FavoriteTeamOption[] {
  const teamsMap = new Map<string, FavoriteTeamOption>();

  // 1. Ingest real clubs from official league standings (Brasileirão Série A, Champions, Premier, La Liga)
  if (Array.isArray(standings)) {
    standings.forEach(league => {
      if (!league.entries) return;
      league.entries.forEach(entry => {
        const normId = normalizeTeamKey(entry.teamName);

        // Find rich historical match in TEAMS_DATA
        const histData = TEAMS_DATA[normId] || Object.values(TEAMS_DATA).find(t => 
          t.id.toLowerCase() === normId ||
          t.name.toLowerCase() === entry.teamName.toLowerCase() ||
          (t.popularName && t.popularName.toLowerCase() === entry.teamName.toLowerCase())
        );

        let country = 'Brasil';
        let icon = '🇧🇷';
        if (league.name.includes('Premier') || league.id.includes('eng')) {
          country = 'Inglaterra';
          icon = '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
        } else if (league.name.includes('La Liga') || league.id.includes('esp')) {
          country = 'Espanha';
          icon = '🇪🇸';
        } else if (league.name.includes('Champions') || league.id.includes('uefa')) {
          country = 'Europa';
          icon = '🇪🇺';
        }

        teamsMap.set(normId, {
          id: histData?.id || normId,
          name: entry.teamName,
          popularName: histData?.popularName || entry.teamName,
          shortName: entry.shortName || entry.teamName.slice(0, 3).toUpperCase(),
          logoUrl: entry.logoUrl,
          badgeEmoji: histData?.badgeEmoji || icon,
          league: league.name,
          leagueIcon: league.icon || icon,
          country: country,
          rank: entry.rank,
          points: entry.points,
          stadium: histData?.stadium?.name,
          coach: histData?.coach,
          primaryColor: histData?.primaryColor || '#00ff88',
          summary: histData?.summary,
        });
      });
    });
  }

  // 2. Also ingest active clubs from real live matches
  if (Array.isArray(matches)) {
    matches.forEach(m => {
      [m.homeTeam, m.awayTeam].forEach(t => {
        if (!t || !t.name) return;
        const normId = normalizeTeamKey(t.name);

        if (!teamsMap.has(normId)) {
          const histData = TEAMS_DATA[normId] || Object.values(TEAMS_DATA).find(td => 
            td.name.toLowerCase() === t.name.toLowerCase()
          );

          teamsMap.set(normId, {
            id: histData?.id || normId,
            name: t.name,
            popularName: histData?.popularName || t.name,
            shortName: t.shortName || t.name.slice(0, 3).toUpperCase(),
            logoUrl: t.logoUrl,
            badgeEmoji: t.badgeEmoji || histData?.badgeEmoji || '⚽',
            league: m.league || 'Futebol Profissional',
            leagueIcon: m.leagueIcon || '⚽',
            country: m.league?.includes('Brasileir') ? 'Brasil' : 'Internacional',
            stadium: m.stadium || histData?.stadium?.name,
            coach: histData?.coach,
            primaryColor: t.primaryColor || histData?.primaryColor || '#00ff88',
            summary: histData?.summary,
          });
        }
      });
    });
  }

  // 3. Complete with any major clubs from TEAMS_DATA not yet in standings
  Object.values(TEAMS_DATA).forEach(t => {
    if (!teamsMap.has(t.id)) {
      teamsMap.set(t.id, {
        id: t.id,
        name: t.name,
        popularName: t.popularName || t.name,
        shortName: t.popularName || t.name.slice(0, 3).toUpperCase(),
        badgeEmoji: t.badgeEmoji,
        league: t.country === 'Brasil' ? 'Brasileirão Série A' : 'Futebol Europeu',
        leagueIcon: t.country === 'Brasil' ? '🇧🇷' : '🇪🇺',
        country: t.country,
        stadium: t.stadium.name,
        coach: t.coach,
        primaryColor: t.primaryColor,
        summary: t.summary,
      });
    }
  });

  return Array.from(teamsMap.values()).sort((a, b) => {
    // Brasileirão clubs first, then by rank or name
    if (a.country === 'Brasil' && b.country !== 'Brasil') return -1;
    if (a.country !== 'Brasil' && b.country === 'Brasil') return 1;
    if (a.rank && b.rank && a.league === b.league) return a.rank - b.rank;
    return a.name.localeCompare(b.name);
  });
}

export const FavoriteTeamSelector: React.FC<FavoriteTeamSelectorProps> = ({
  isOpen,
  onClose,
  selectedTeamId,
  onSelectFavoriteTeam,
  standings = [],
  matches = [],
}) => {
  // ALL HOOKS UNCONDITIONALLY AT THE TOP
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeagueFilter, setSelectedLeagueFilter] = useState<string>('ALL');
  const [justSelectedId, setJustSelectedId] = useState<string | null>(null);

  // 100% Real teams list
  const realTeams = useMemo(() => extractRealTeams(standings, matches), [standings, matches]);

  // Find the single chosen favorite team
  const currentFavoriteTeam = useMemo(() => {
    if (!selectedTeamId) return realTeams[0] || null;
    const cleanId = selectedTeamId.toLowerCase();
    return realTeams.find(t => 
      t.id.toLowerCase() === cleanId ||
      t.name.toLowerCase() === cleanId ||
      (t.popularName && t.popularName.toLowerCase() === cleanId) ||
      t.shortName.toLowerCase() === cleanId
    ) || realTeams[0] || null;
  }, [selectedTeamId, realTeams]);

  // Filtered list based on search and league
  const filteredTeams = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return realTeams.filter(team => {
      const matchesSearch = !q ||
        team.name.toLowerCase().includes(q) ||
        (team.popularName && team.popularName.toLowerCase().includes(q)) ||
        team.shortName.toLowerCase().includes(q) ||
        team.country.toLowerCase().includes(q) ||
        team.league.toLowerCase().includes(q) ||
        (team.stadium && team.stadium.toLowerCase().includes(q)) ||
        (team.coach && team.coach.toLowerCase().includes(q));

      let matchesLeague = true;
      if (selectedLeagueFilter === 'BRASIL') {
        matchesLeague = team.country === 'Brasil' || team.league.includes('Brasileir');
      } else if (selectedLeagueFilter === 'EUROPA') {
        matchesLeague = team.country !== 'Brasil';
      } else if (selectedLeagueFilter === 'PREMIER') {
        matchesLeague = team.league.includes('Premier') || team.country === 'Inglaterra';
      } else if (selectedLeagueFilter === 'LALIGA') {
        matchesLeague = team.league.includes('La Liga') || team.country === 'Espanha';
      } else if (selectedLeagueFilter === 'CHAMPIONS') {
        matchesLeague = team.league.includes('Champions');
      }

      return matchesSearch && matchesLeague;
    });
  }, [realTeams, searchQuery, selectedLeagueFilter]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Single team selection handler
  const handlePickTeam = (team: FavoriteTeamOption) => {
    onSelectFavoriteTeam(team.id);
    setJustSelectedId(team.id);
    soundFx.playAlertPing();

    setTimeout(() => {
      setJustSelectedId(null);
    }, 1500);
  };

  // Safe early return ONLY AFTER all hooks have executed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#141618] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col font-mono text-[#ececed]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0b0c0d] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-950/60 border border-red-500/40 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#00ff88] font-bold uppercase tracking-wider">
                  [PERSONALIZAÇÃO EXCLUSIVA]
                </span>
                <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 font-bold uppercase">
                  APENAS 1 TIME FAVORITO
                </span>
              </div>
              <h2 className="font-['Syne'] font-extrabold text-lg sm:text-2xl uppercase tracking-tight text-white leading-tight">
                Escolha Seu Time Favorito
              </h2>
              <p className="text-[11px] text-[#ececed]/60 font-sans hidden sm:block">
                Selecione apenas 1 clube para receber placares prioritários, histórico tático e alertas de gol ao vivo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-favorite-team-modal"
            className="p-2 bg-[#141618] border border-white/10 hover:border-[#00ff88] text-[#ececed]/60 hover:text-white transition cursor-pointer shrink-0"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active 1 Favorite Team Hero */}
        {currentFavoriteTeam && (
          <div className="bg-[#0e120f] border-b border-[#00ff88]/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#141618] border border-white/15 flex items-center justify-center shrink-0 p-1">
                {currentFavoriteTeam.logoUrl ? (
                  <img
                    src={currentFavoriteTeam.logoUrl}
                    alt={currentFavoriteTeam.name}
                    className="w-9 h-9 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-2xl">{currentFavoriteTeam.badgeEmoji}</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#00ff88] font-bold uppercase">SEU TIME ATIVO:</span>
                  <span className="font-['Syne'] font-extrabold text-base sm:text-lg text-white uppercase">
                    {currentFavoriteTeam.name}
                  </span>
                  <span className="text-sm">{currentFavoriteTeam.leagueIcon}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#ececed]/60 flex-wrap">
                  <span>{currentFavoriteTeam.league}</span>
                  {currentFavoriteTeam.rank && (
                    <span className="text-[#00ff88] font-bold">
                      {currentFavoriteTeam.rank}º lugar ({currentFavoriteTeam.points} pts)
                    </span>
                  )}
                  {currentFavoriteTeam.stadium && (
                    <span className="hidden md:inline">🏟️ {currentFavoriteTeam.stadium}</span>
                  )}
                  {currentFavoriteTeam.coach && (
                    <span className="hidden md:inline">Téc: {currentFavoriteTeam.coach}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="px-3 py-1 bg-[#00ff88]/15 border border-[#00ff88]/50 text-[#00ff88] text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>SELECIONADO (1 DE 1)</span>
              </span>
            </div>
          </div>
        )}

        {/* Search & Real League Filter Bar */}
        <div className="p-4 bg-[#0b0c0d] border-b border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#ececed]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="input-search-real-teams"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar clube real (ex: Flamengo, Palmeiras, Real Madrid, Arsenal)..."
                className="w-full bg-[#141618] border border-white/15 focus:border-[#00ff88] pl-10 pr-4 py-2 text-xs text-[#ececed] placeholder-[#ececed]/30 focus:outline-hidden transition font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#ececed]/40 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="text-[11px] text-[#ececed]/60 font-mono shrink-0">
              <span>Disponíveis: </span>
              <strong className="text-[#00ff88]">{filteredTeams.length} clubes reais</strong>
            </div>
          </div>

          {/* League Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-[10px]">
            {[
              { id: 'ALL', label: 'TODOS OS CLUBES' },
              { id: 'BRASIL', label: '🇧🇷 Brasileirão Série A' },
              { id: 'EUROPA', label: '🇪🇺 Futebol Europeu' },
              { id: 'PREMIER', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
              { id: 'LALIGA', label: '🇪🇸 La Liga' },
              { id: 'CHAMPIONS', label: '🏆 Champions League' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLeagueFilter(tab.id)}
                className={`px-3 py-1 font-bold uppercase transition cursor-pointer border whitespace-nowrap ${
                  selectedLeagueFilter === tab.id
                    ? 'bg-white text-black border-white'
                    : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Teams Single-Choice Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredTeams.map((team) => {
              const isSelected = currentFavoriteTeam?.id === team.id;
              const isJustPicked = justSelectedId === team.id;

              return (
                <button
                  key={team.id}
                  id={`option-team-${team.id}`}
                  onClick={() => handlePickTeam(team)}
                  className={`w-full text-left p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-3 group relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00ff88]/20 via-[#0b1710] to-[#0b0c0d] border-[#00ff88] shadow-lg shadow-[#00ff88]/10'
                      : 'bg-[#0b0c0d] border-white/10 hover:border-white/30 hover:bg-[#141618]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Club Logo */}
                    <div className="w-10 h-10 bg-[#141618] border border-white/10 flex items-center justify-center shrink-0 p-1">
                      {team.logoUrl ? (
                        <img
                          src={team.logoUrl}
                          alt={team.name}
                          className="w-7 h-7 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xl">{team.badgeEmoji}</span>
                      )}
                    </div>

                    {/* Club Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-['Syne'] font-extrabold text-sm text-white truncate uppercase group-hover:text-[#00ff88] transition">
                          {team.name}
                        </h4>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-[#ececed]/50 font-mono truncate">
                        <span>{team.leagueIcon} {team.league.split(' ')[0]}</span>
                        {team.rank && (
                          <span className="text-[#00ff88] font-bold">
                            • {team.rank}º lugar
                          </span>
                        )}
                      </div>

                      {team.stadium && (
                        <span className="text-[9px] text-[#ececed]/40 truncate block mt-0.5">
                          🏟️ {team.stadium.split('(')[0].trim()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Radio / Single Choice Selection Indicator */}
                  <div className="shrink-0 flex items-center">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-[#00ff88] text-black flex items-center justify-center font-bold shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-[#00ff88]/50 flex items-center justify-center text-transparent group-hover:text-[#00ff88]/50 text-xs">
                        ✓
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredTeams.length === 0 && (
            <div className="py-12 text-center text-[#ececed]/40 bg-[#0b0c0d] border border-white/10 space-y-2">
              <Shield className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-xs font-mono">
                Nenhum clube real encontrado para "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLeagueFilter('ALL');
                }}
                className="text-[#00ff88] underline text-xs font-bold cursor-pointer font-mono"
              >
                Limpar busca e filtros
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#0b0c0d] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#ececed]/60 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" />
            <span>
              Time favorito ativo: <strong className="text-white">{currentFavoriteTeam?.name}</strong>. Apenas 1 clube é selecionado por vez.
            </span>
          </div>

          <button
            onClick={onClose}
            id="btn-confirm-favorite-team"
            className="w-full sm:w-auto px-6 py-2 bg-[#00ff88] hover:bg-[#00e57a] text-black font-extrabold uppercase font-mono text-xs cursor-pointer transition shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Confirmar Escolha</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
