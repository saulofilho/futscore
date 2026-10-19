import React, { useMemo } from 'react';
import { Sparkles, Sliders, Heart, Crown, ArrowRight, Shield } from 'lucide-react';
import { Match, LeagueTable } from '../types';
import { TEAMS_DATA } from '../data/teamsData';

interface FeaturedBottomBlocksProps {
  onNavigateToPredictions: () => void;
  onNavigateToCoach: () => void;
  onOpenFavoriteTeamSelector: () => void;
  favoriteTeamId?: string;
  primaryFavoriteTeamId?: string;
  favoriteTeamIds?: string[];
  matches?: Match[];
  standings?: LeagueTable[];
}

export const FeaturedBottomBlocks: React.FC<FeaturedBottomBlocksProps> = ({
  onNavigateToPredictions,
  onNavigateToCoach,
  onOpenFavoriteTeamSelector,
  favoriteTeamId,
  primaryFavoriteTeamId,
  favoriteTeamIds = [],
  matches = [],
  standings = [],
}) => {
  // Resolve current favorite team details
  const currentTeam = useMemo(() => {
    const targetId = favoriteTeamId || primaryFavoriteTeamId || (favoriteTeamIds && favoriteTeamIds[0]);
    if (!targetId) return null;
    const cleanId = targetId.toLowerCase();

    // Check TEAMS_DATA
    if (TEAMS_DATA[cleanId]) return TEAMS_DATA[cleanId];
    const foundInTeams = Object.values(TEAMS_DATA).find(t =>
      t.id.toLowerCase() === cleanId ||
      t.name.toLowerCase() === cleanId ||
      (t.popularName && t.popularName.toLowerCase() === cleanId)
    );
    if (foundInTeams) return foundInTeams;

    // Check standings
    if (standings) {
      for (const lg of standings) {
        if (!lg.entries) continue;
        const entry = lg.entries.find(e =>
          e.teamName.toLowerCase().includes(cleanId) ||
          (e.shortName && e.shortName.toLowerCase() === cleanId)
        );
        if (entry) {
          return {
            id: targetId,
            name: entry.teamName,
            popularName: entry.shortName || entry.teamName,
            badgeEmoji: lg.name.includes('Premier') ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' : lg.name.includes('La Liga') ? '🇪🇸' : '🇧🇷',
            country: lg.name.includes('Premier') ? 'Inglaterra' : lg.name.includes('La Liga') ? 'Espanha' : 'Brasil',
            stadium: { name: 'Estádio Oficial' },
            coach: 'Comissão Técnica',
          } as any;
        }
      }
    }

    // Check matches
    for (const m of matches) {
      if ((m.homeTeam.id || '').toLowerCase() === cleanId || m.homeTeam.name.toLowerCase().includes(cleanId)) {
        return {
          id: targetId,
          name: m.homeTeam.name,
          popularName: m.homeTeam.shortName,
          badgeEmoji: m.homeTeam.badgeEmoji || '⚽',
          stadium: { name: m.stadium || 'Estádio Principal' },
        } as any;
      }
      if ((m.awayTeam.id || '').toLowerCase() === cleanId || m.awayTeam.name.toLowerCase().includes(cleanId)) {
        return {
          id: targetId,
          name: m.awayTeam.name,
          popularName: m.awayTeam.shortName,
          badgeEmoji: m.awayTeam.badgeEmoji || '⚽',
          stadium: { name: m.stadium || 'Estádio Principal' },
        } as any;
      }
    }

    return {
      id: targetId,
      name: targetId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      popularName: targetId.split('_')[0].toUpperCase(),
      badgeEmoji: '⚽',
    } as any;
  }, [favoriteTeamId, primaryFavoriteTeamId, favoriteTeamIds, matches, standings]);

  return (
    <section 
      id="featured-bottom-blocks"
      className="w-full mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 space-y-4 font-mono"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#ececed]/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse shrink-0"></span>
          <span className="label text-[#00ff88] font-bold opacity-100 text-[11px] tracking-wider uppercase">
            [RECURSOS PRINCIPAIS DO FUTSCORE]
          </span>
        </div>
        <span className="text-[11px] text-white/50 hidden sm:inline">
          Acesse IA tática, simulação de partidas e o seu clube do coração antes do encerramento
        </span>
      </div>

      {/* 3 Interactive Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Bloco 1: Previsões IA Gemini */}
        <div className="bg-gradient-to-br from-[#141618] via-[#0d1d14] to-[#141618] border border-[#00ff88]/30 hover:border-[#00ff88]/70 p-4 sm:p-5 flex flex-col justify-between gap-4 transition shadow-lg relative group">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 bg-[#00ff88]/15 border border-[#00ff88] text-[#00ff88] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="bg-[#00ff88] text-[#0b0c0d] text-[9px] font-black px-2 py-0.5 rounded-xs font-mono uppercase tracking-wider">
                IA GEMINI 3.8
              </span>
            </div>

            <div>
              <h3 className="font-['Syne'] font-extrabold text-base sm:text-lg uppercase text-[#ececed] tracking-tight group-hover:text-[#00ff88] transition">
                Previsões IA Gemini
              </h3>
              <p className="text-xs text-white/65 font-sans leading-relaxed mt-1">
                Prognósticos táticos pré-jogo, chances de vitória em tempo real e probabilidades calculadas com inteligência artificial.
              </p>
            </div>
          </div>

          <button
            id="btn-bottom-block-predictions"
            onClick={onNavigateToPredictions}
            className="w-full py-2.5 px-3 bg-[#00ff88] hover:bg-[#00e57a] text-[#0b0c0d] font-['Syne'] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md shrink-0"
          >
            <span>Ver Previsões IA</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Bloco 2: Modo Treinador */}
        <div className="bg-gradient-to-br from-[#141618] via-[#0f1f28] to-[#141618] border border-[#38bdf8]/30 hover:border-[#38bdf8]/70 p-4 sm:p-5 flex flex-col justify-between gap-4 transition shadow-lg relative group">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 bg-[#38bdf8]/15 border border-[#38bdf8] text-[#38bdf8] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Sliders className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <span className="bg-[#38bdf8] text-[#0b0c0d] text-[9px] font-black px-2 py-0.5 rounded-xs font-mono uppercase tracking-wider">
                SIMULAÇÃO AO VIVO
              </span>
            </div>

            <div>
              <h3 className="font-['Syne'] font-extrabold text-base sm:text-lg uppercase text-[#ececed] tracking-tight group-hover:text-[#38bdf8] transition">
                Modo Treinador
              </h3>
              <p className="text-xs text-white/65 font-sans leading-relaxed mt-1">
                Mude formações (4-3-3, 3-5-2), comande substituições com reservas oficiais e veja o impacto instantâneo no placar.
              </p>
            </div>
          </div>

          <button
            id="btn-bottom-block-coach"
            onClick={onNavigateToCoach}
            className="w-full py-2.5 px-3 bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-[#0b0c0d] font-['Syne'] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md shrink-0"
          >
            <span>Assumir Prancheta</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Bloco 3: O Time (Time do Coração) */}
        <div className="bg-gradient-to-br from-[#141618] via-[#241c10] to-[#141618] border border-amber-500/40 hover:border-amber-400 p-4 sm:p-5 flex flex-col justify-between gap-4 transition shadow-lg relative group md:col-span-2 lg:col-span-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 bg-amber-500/15 border border-amber-500/50 text-amber-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <span className="bg-amber-400 text-[#0b0c0d] text-[9px] font-black px-2 py-0.5 rounded-xs font-mono uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-2.5 h-2.5 fill-black" />
                <span>1 TIME FAVORITO</span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Syne'] font-extrabold text-base sm:text-lg uppercase text-[#ececed] tracking-tight group-hover:text-amber-400 transition truncate">
                  {currentTeam ? (currentTeam.popularName || currentTeam.name) : 'O Meu Time'}
                </h3>
                {currentTeam?.badgeEmoji && (
                  <span className="text-base shrink-0">{currentTeam.badgeEmoji}</span>
                )}
              </div>
              <p className="text-xs text-white/65 font-sans leading-relaxed mt-1">
                {currentTeam
                  ? `Seu clube ativo para notificações sonoras de gol, placares prioritários e estatísticas personalizadas.`
                  : 'Escolha 1 time favorito com dados 100% reais para receber alertas e destaque no placar.'}
              </p>
            </div>
          </div>

          <button
            id="btn-bottom-block-fav-team"
            onClick={onOpenFavoriteTeamSelector}
            className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-[#0b0c0d] font-['Syne'] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md shrink-0"
          >
            <span>{currentTeam ? 'Mudar Meu Time' : 'Escolher Time Favorito'}</span>
            <Crown className="w-3.5 h-3.5 fill-black" />
          </button>
        </div>
      </div>
    </section>
  );
};
