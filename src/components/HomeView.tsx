import React, { useState, useMemo } from 'react';
import { Match, LeagueTable } from '../types';
import { TEAMS_DATA } from '../data/teamsData';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Activity, 
  BrainCircuit, 
  Sliders, 
  Tv, 
  Flame, 
  Trophy, 
  Check, 
  CheckCircle2, 
  Heart, 
  Search, 
  Users, 
  MapPin, 
  Compass, 
  Radio,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { AdSenseBanner } from './AdSenseBanner';

interface HomeViewProps {
  onEnterApp: () => void;
  selectedTeamId: string;
  onSelectFavoriteTeam: (teamId: string) => void;
  standings?: LeagueTable[];
  matches?: Match[];
}

interface TeamChoice {
  id: string;
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
}

function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

export const HomeView: React.FC<HomeViewProps> = ({
  onEnterApp,
  selectedTeamId,
  onSelectFavoriteTeam,
  standings = [],
  matches = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeagueFilter, setSelectedLeagueFilter] = useState<string>('ALL');
  const [justPickedId, setJustPickedId] = useState<string | null>(null);

  // Extract all 100% real football clubs
  const realTeams = useMemo(() => {
    const teamsMap = new Map<string, TeamChoice>();

    if (Array.isArray(standings)) {
      standings.forEach(league => {
        if (!league.entries) return;
        league.entries.forEach(entry => {
          const normId = normalizeKey(entry.teamName);
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
          });
        });
      });
    }

    // Ingest TEAMS_DATA prominent clubs
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
        });
      }
    });

    return Array.from(teamsMap.values()).sort((a, b) => {
      if (a.country === 'Brasil' && b.country !== 'Brasil') return -1;
      if (a.country !== 'Brasil' && b.country === 'Brasil') return 1;
      if (a.rank && b.rank && a.league === b.league) return a.rank - b.rank;
      return a.name.localeCompare(b.name);
    });
  }, [standings, matches]);

  // Current chosen team object
  const activeTeam = useMemo(() => {
    if (!selectedTeamId) return realTeams[0] || null;
    const clean = selectedTeamId.toLowerCase();
    return realTeams.find(t => 
      t.id.toLowerCase() === clean || 
      t.name.toLowerCase() === clean ||
      (t.popularName && t.popularName.toLowerCase() === clean)
    ) || realTeams[0] || null;
  }, [selectedTeamId, realTeams]);

  // Filtered teams list
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

  const handlePickClub = (team: TeamChoice) => {
    onSelectFavoriteTeam(team.id);
    setJustPickedId(team.id);
    soundFx.playAlertPing();

    setTimeout(() => {
      setJustPickedId(null);
    }, 1500);
  };

  const handleEnterClick = () => {
    soundFx.playGoalHorn();
    onEnterApp();
  };

  const liveMatchesCount = matches.filter(m => m.status === 'LIVE').length;

  return (
    <div className="space-y-10 sm:space-y-14 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#141618] via-[#0e1712] to-[#0b0c0d] border border-white/15 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-0 text-white/5 font-['Syne'] font-black text-9xl select-none pointer-events-none hidden lg:block">
          OMNI
        </div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="label text-[#00ff88] font-bold opacity-100 flex items-center gap-1.5 text-xs bg-[#00ff88]/10 border border-[#00ff88]/30 px-3 py-1">
              <Radio className="w-3.5 h-3.5 text-[#00ff88] animate-pulse" />
              <span>OMNISCORE PRO • TEMPO REAL</span>
            </span>
            {liveMatchesCount > 0 && (
              <span className="font-mono text-xs bg-red-950/60 text-red-400 border border-red-500/40 px-2.5 py-1 font-bold animate-pulse">
                🔴 {liveMatchesCount} {liveMatchesCount === 1 ? 'JOGO AO VIVO' : 'JOGOS AO VIVO AGORA'}
              </span>
            )}
          </div>

          <h1 className="font-['Syne'] font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05]">
            Todos os Esportes como Você <span className="text-[#00ff88]">Nunca Viu</span>.
          </h1>

          <p className="text-sm sm:text-base text-[#ececed]/75 font-sans leading-relaxed max-w-2xl">
            Acompanhe resultados ao vivo de futebol, basquete (NBA/NBB), hóquei (NHL), vôlei (Superliga), natação, jiu-jitsu, judô, MMA e tênis. Gráficos de radar Recharts, probabilidades D3, previsões IA Gemini e alertas instantâneos de pontuação.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
            <div className="bg-[#0b0c0d]/80 border border-white/10 p-3">
              <div className="text-xl sm:text-2xl font-black text-[#00ff88] font-['Syne']">{matches.length}+</div>
              <div className="text-[10px] text-white/60 uppercase">Jogos &amp; Lutas na Semana</div>
            </div>
            <div className="bg-[#0b0c0d]/80 border border-white/10 p-3">
              <div className="text-xl sm:text-2xl font-black text-white font-['Syne']">8 Modalidades</div>
              <div className="text-[10px] text-white/60 uppercase">Nacionais &amp; Mundiais</div>
            </div>
            <div className="bg-[#0b0c0d]/80 border border-white/10 p-3">
              <div className="text-xl sm:text-2xl font-black text-[#38bdf8] font-['Syne']">Gemini 3.8</div>
              <div className="text-[10px] text-white/60 uppercase">Inteligência Tática</div>
            </div>
            <div className="bg-[#0b0c0d]/80 border border-white/10 p-3">
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-['Syne']">100% Real</div>
              <div className="text-[10px] text-white/60 uppercase">Dados Oficiais &amp; ESPN</div>
            </div>
          </div>

          {/* Direct CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleEnterClick}
              id="btn-hero-enter-app"
              className="px-8 py-3.5 bg-[#00ff88] hover:bg-[#00e57a] text-black font-['Syne'] font-extrabold text-sm uppercase tracking-wider cursor-pointer transition shadow-[0_0_25px_rgba(0,255,136,0.35)] flex items-center justify-center gap-2"
            >
              <span>Entrar no OmniScore PRO</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('section-choose-team');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3.5 bg-[#141618] hover:bg-white/10 border border-white/20 text-[#ececed] font-mono text-xs uppercase font-bold text-center transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500/40" />
              <span>Escolher Meu Time ({activeTeam?.name})</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR FAVORITE TEAM SECTION */}
      <section id="section-choose-team" className="space-y-5 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="label text-[#00ff88] font-bold opacity-100 mb-1">
              [PASSO 1 • PERSONALIZAÇÃO EXCLUSIVA]
            </div>
            <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Escolha Seu Time do Coração
            </h2>
            <p className="text-xs sm:text-sm text-[#ececed]/60 font-sans mt-0.5">
              Escolha apenas 1 clube para receber placares prioritários, alertas sonoros de gol e notícias do seu time.
            </p>
          </div>

          {activeTeam && (
            <div className="bg-[#141618] border border-[#00ff88]/40 px-3.5 py-2 flex items-center gap-2.5 shrink-0 self-start sm:self-auto font-mono text-xs">
              <span className="text-xl">{activeTeam.badgeEmoji}</span>
              <div>
                <span className="text-[10px] text-white/50 block uppercase">SEU TIME ATUAL:</span>
                <strong className="text-[#00ff88] uppercase">{activeTeam.name}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Selected Team Hero Card */}
        {activeTeam && (
          <div className="bg-gradient-to-r from-[#141618] via-[#0d1a12] to-[#141618] border border-[#00ff88]/40 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0b0c0d] border border-white/20 flex items-center justify-center shrink-0 p-1.5 shadow-md">
                {activeTeam.logoUrl ? (
                  <img
                    src={activeTeam.logoUrl}
                    alt={activeTeam.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-3xl">{activeTeam.badgeEmoji}</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Syne'] font-extrabold text-xl sm:text-2xl text-white uppercase">
                    {activeTeam.name}
                  </h3>
                  <span className="text-base">{activeTeam.leagueIcon}</span>
                  <span className="px-2 py-0.5 bg-[#00ff88] text-black text-[9px] font-black font-mono uppercase">
                    1 TIME ESCOLHIDO
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#ececed]/65 font-mono mt-1 flex-wrap">
                  <span>{activeTeam.league}</span>
                  {activeTeam.rank && (
                    <span className="text-[#00ff88] font-bold">
                      • {activeTeam.rank}º lugar ({activeTeam.points} pontos)
                    </span>
                  )}
                  {activeTeam.stadium && (
                    <span className="hidden sm:inline">• 🏟️ {activeTeam.stadium}</span>
                  )}
                  {activeTeam.coach && (
                    <span className="hidden md:inline">• Téc: {activeTeam.coach}</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleEnterClick}
              id="btn-confirm-team-and-enter"
              className="px-6 py-2.5 bg-[#00ff88] hover:bg-[#00e57a] text-black font-['Syne'] font-extrabold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shrink-0 self-start md:self-auto shadow-md"
            >
              <span>Continuar com o {activeTeam.popularName || activeTeam.name}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* Search & League Filter Bar */}
        <div className="bg-[#141618] border border-white/10 p-3.5 sm:p-4 space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#ececed]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="home-team-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar clube real (ex: Flamengo, Palmeiras, Real Madrid, Arsenal)..."
                className="w-full bg-[#0b0c0d] border border-white/15 focus:border-[#00ff88] pl-10 pr-4 py-2 text-xs text-[#ececed] placeholder-[#ececed]/30 focus:outline-hidden transition"
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

            <div className="text-[11px] text-[#ececed]/60 shrink-0">
              Disponíveis: <strong className="text-[#00ff88]">{filteredTeams.length} clubes reais</strong>
            </div>
          </div>

          {/* League Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-[10px] touch-pan-x">
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
                    : 'bg-[#0b0c0d] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Single-Selection Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto p-1 font-mono">
          {filteredTeams.map((team) => {
            const isSelected = activeTeam?.id === team.id;
            const isJustPicked = justPickedId === team.id;

            return (
              <button
                key={team.id}
                id={`home-team-card-${team.id}`}
                onClick={() => handlePickClub(team)}
                className={`w-full text-left p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 group relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#00ff88]/20 via-[#0b1710] to-[#0b0c0d] border-[#00ff88] shadow-md shadow-[#00ff88]/10 ring-1 ring-[#00ff88]/50'
                    : 'bg-[#141618] border-white/10 hover:border-white/30 hover:bg-[#1a1c1e]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-[#0b0c0d] border border-white/10 flex items-center justify-center shrink-0 p-1">
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

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-['Syne'] font-extrabold text-sm text-white truncate uppercase group-hover:text-[#00ff88] transition">
                        {team.name}
                      </h4>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                      )}
                    </div>
                    <div className="text-[10px] text-[#ececed]/50 truncate">
                      <span>{team.leagueIcon} {team.league.split(' ')[0]}</span>
                      {team.rank && (
                        <span className="text-[#00ff88] font-bold ml-1">
                          • {team.rank}º lugar
                        </span>
                      )}
                    </div>
                  </div>
                </div>

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
      </section>

      {/* BANNER PUBLICITÁRIO RESPONSIVO (GOOGLE ADSENSE) */}
      <AdSenseBanner 
        slotId={import.meta.env.VITE_ADSENSE_SLOT_TOP_BANNER}
        format="horizontal"
        label="Destaque Patrocinado"
        className="my-6 shadow-md"
      />

      {/* 3. APP SHOWCASE & FEATURE OVERVIEW */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <div className="label text-[#00ff88] font-bold opacity-100 mb-1 flex items-center gap-2">
            <span>[COBERTURA MULTIESPORTIVA &amp; RECURSOS PRO]</span>
            <span className="text-[10px] bg-[#00ff88]/20 text-[#00ff88] px-2 py-0.5 border border-[#00ff88]/30">
              EXPANDIDO
            </span>
          </div>
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
            Futebol, Basquete, Hóquei, Vôlei, Lutas e Mais
          </h2>
          <p className="text-xs sm:text-sm text-[#ececed]/60 font-sans mt-0.5">
            Placares minuto a minuto, pontuações parciais, métricas avançadas e análises em tempo real para múltiplos esportes.
          </p>
        </div>

        {/* Multi-sport quick showcase grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-center">
          {[
            { icon: '⚽', label: 'Futebol', league: 'Brasileirão / Champions' },
            { icon: '🏀', label: 'Basquete', league: 'NBA & NBB Brasil' },
            { icon: '🏒', label: 'Hóquei', league: 'NHL Stanley Cup' },
            { icon: '🏐', label: 'Vôlei', league: 'Superliga & VNL' },
            { icon: '🏊', label: 'Natação', league: 'Mundial Aquatics' },
            { icon: '🥋', label: 'Jiu-Jitsu', league: 'IBJJF & ADCC' },
            { icon: '🥋', label: 'Judô', league: 'Grand Slam IJF' },
            { icon: '🥊', label: 'MMA / Tênis', league: 'UFC & ATP/WTA' },
          ].map((sp, idx) => (
            <button
              key={idx}
              onClick={handleEnterClick}
              className="bg-[#141618] hover:bg-[#1a1c1e] border border-white/10 hover:border-[#00ff88]/50 p-2.5 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{sp.icon}</span>
              <span className="font-bold text-xs text-white group-hover:text-[#00ff88] transition">{sp.label}</span>
              <span className="text-[9px] text-[#ececed]/50 truncate w-full">{sp.league}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
          {/* Card 1: Placares Ao Vivo */}
          <div className="bg-[#141618] border border-white/10 p-5 space-y-3 hover:border-[#00ff88]/40 transition group">
            <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] font-extrabold text-base text-white uppercase group-hover:text-[#00ff88] transition">
              Placares em Tempo Real
            </h3>
            <p className="text-xs text-[#ececed]/60 font-sans leading-relaxed">
              Lances minuto a minuto, pontuações parciais por quarto/set/período, probabilidade de vitória D3.js e placares ao vivo de futebol, basquete (NBA/NBB), hóquei (NHL), vôlei, lutas e natação.
            </p>
          </div>

          {/* Card 2: Previsões com IA Gemini */}
          <div className="bg-[#141618] border border-white/10 p-5 space-y-3 hover:border-[#38bdf8]/40 transition group">
            <div className="w-10 h-10 bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] font-extrabold text-base text-white uppercase group-hover:text-[#38bdf8] transition">
              Previsões IA Gemini 3.8
            </h3>
            <p className="text-xs text-[#ececed]/60 font-sans leading-relaxed">
              Análise tática e prognósticos aprofundados para todas as modalidades esportivas: probabilidades de vitória, confronto direto histórico, atletas decisivos e peso da camisa.
            </p>
          </div>

          {/* Card 3: Modo Treinador & Prancheta */}
          <div className="bg-[#141618] border border-white/10 p-5 space-y-3 hover:border-amber-400/40 transition group">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] font-extrabold text-base text-white uppercase group-hover:text-amber-400 transition">
              Modo Treinador Interativo
            </h3>
            <p className="text-xs text-[#ececed]/60 font-sans leading-relaxed">
              Assuma a prancheta de qualquer partida: altere formações táticas, faça substituições com atletas reservas oficiais e veja o impacto instantâneo no placar e no momentum.
            </p>
          </div>

          {/* Card 4: Radar de Competências Recharts */}
          <div className="bg-[#141618] border border-white/10 p-5 space-y-3 hover:border-orange-500/40 transition group">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] font-extrabold text-base text-white uppercase group-hover:text-orange-400 transition">
              Radar de Competências (Recharts)
            </h3>
            <p className="text-xs text-[#ececed]/60 font-sans leading-relaxed">
              Gráficos de radar comparando posse de bola, chutes/arremessos, passes e ataques perigosos entre os times, além de mapas de calor e zonas de pressão territorial.
            </p>
          </div>

          {/* Card 5: Onde Assistir (Guia de TV) */}
          <div className="bg-[#141618] border border-white/10 p-5 space-y-3 hover:border-[#00ff88]/40 transition group">
            <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] group-hover:scale-110 transition-transform">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] font-extrabold text-base text-white uppercase group-hover:text-[#00ff88] transition">
              Guia Onde Assistir
            </h3>
            <p className="text-xs text-[#ececed]/60 font-sans leading-relaxed">
              Mapeamento completo dos canais de transmissão de cada partida e combate: TV Globo, SporTV, Premiere, CazéTV, ESPN, Disney+, Band e Max/TNT.
            </p>
          </div>

          {/* Card 6: Enciclopédia & Atletas */}
          <div className="bg-[#141618] border border-white/10 p-5 space-y-3 hover:border-purple-400/40 transition group">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne'] font-extrabold text-base text-white uppercase group-hover:text-purple-400 transition">
              Enciclopédia de Clubes &amp; Atletas
            </h3>
            <p className="text-xs text-[#ececed]/60 font-sans leading-relaxed">
              Biografias históricas, fundação, sala de troféus, arenas/estádios icônicos e fichas técnicas completas dos maiores atletas e equipes do esporte mundial.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="bg-gradient-to-r from-[#00ff88] via-[#00e57a] to-[#38bdf8] p-6 sm:p-10 text-black flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-black uppercase tracking-wider text-black/80">
            TUDO PRONTO PARA O INÍCIO DA RODADA
          </div>
          <h2 className="font-['Syne'] font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight">
            Acompanhe Todos os Jogos e Lutas Agora
          </h2>
          <p className="text-xs sm:text-sm font-sans text-black/80 max-w-xl">
            Clique abaixo para acessar o painel ao vivo com os jogos e disputas de todos os esportes, estatísticas oficiais, calendário e simulações.
          </p>
        </div>

        <button
          onClick={handleEnterClick}
          id="btn-footer-enter-app"
          className="px-8 py-4 bg-black hover:bg-black/90 text-[#00ff88] font-['Syne'] font-black text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-xl"
        >
          <span>Entrar no Painel de Jogos &amp; Lutas</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </section>
    </div>
  );
};
