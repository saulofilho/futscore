import React, { useState } from 'react';
import { Bell, Trophy, Shield, Newspaper, Flame, Activity, Sparkles, Volume2, VolumeX, Share2, Check, User, BrainCircuit } from 'lucide-react';
import { UserNotificationPreferences } from '../types';

export type TabType = 'matches' | 'predictions' | 'teams' | 'athletes' | 'rankings' | 'market';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onSimulateEvent: () => void;
  userPrefs: UserNotificationPreferences;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  onOpenNotifications,
  onSimulateEvent,
  userPrefs,
  onToggleSound
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'FutScore - Futebol em Tempo Real',
      text: 'Acompanhe placares ao vivo, estatísticas de partidas e classificação no FutScore!',
      url: window.location.href,
    };
    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if cancelled or not supported
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };
  return (
    <header className="sticky top-0 z-40 bg-[#0b0c0d]/95 backdrop-blur-md border-b-2 border-[#ececed]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => onSelectTab('matches')}
              className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group shrink-0"
              id="brand-logo-btn"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00ff88] text-[#0b0c0d] flex items-center justify-center font-['Syne'] font-black text-base sm:text-lg tracking-tighter shrink-0 transition group-hover:brightness-110">
                FS
              </div>
              <div className="truncate">
                <div className="label text-[#00ff88] opacity-100 font-bold tracking-widest text-[9px] sm:text-[10px]">
                  FutScore PRO
                </div>
                <div className="font-['Syne'] font-extrabold text-xs sm:text-base text-[#ececed] tracking-tight uppercase leading-none truncate">
                  TEMPO REAL
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            <button
              id="nav-tab-matches"
              onClick={() => onSelectTab('matches')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 ${
                activeTab === 'matches'
                  ? 'opacity-100 border-[#00ff88] text-[#ececed]'
                  : 'opacity-60 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <span>JOGOS</span>
            </button>

            <button
              id="nav-tab-predictions"
              onClick={() => onSelectTab('predictions')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 ${
                activeTab === 'predictions'
                  ? 'opacity-100 border-[#00ff88] text-[#00ff88]'
                  : 'opacity-70 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>PREVISÕES IA</span>
              <span className="text-[9px] bg-gradient-to-r from-[#00ff88] to-[#38bdf8] text-[#0b0c0d] font-black px-1.5 py-0.2 rounded-xs shadow-sm">
                GEMINI
              </span>
            </button>

            <button
              id="nav-tab-teams"
              onClick={() => onSelectTab('teams')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 ${
                activeTab === 'teams'
                  ? 'opacity-100 border-[#00ff88] text-[#ececed]'
                  : 'opacity-60 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <span>TIMES</span>
            </button>

            <button
              id="nav-tab-athletes"
              onClick={() => onSelectTab('athletes')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 ${
                activeTab === 'athletes'
                  ? 'opacity-100 border-[#00ff88] text-[#ececed]'
                  : 'opacity-60 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <span>ATLETAS</span>
              <span className="text-[9px] bg-[#00ff88] text-[#0b0c0d] font-bold px-1 rounded-sm">NOVO</span>
            </button>

            <button
              id="nav-tab-rankings"
              onClick={() => onSelectTab('rankings')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 ${
                activeTab === 'rankings'
                  ? 'opacity-100 border-[#00ff88] text-[#ececed]'
                  : 'opacity-60 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <span>RANKINGS</span>
            </button>

            <button
              id="nav-tab-market"
              onClick={() => onSelectTab('market')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 relative ${
                activeTab === 'market'
                  ? 'opacity-100 border-[#00ff88] text-[#ececed]'
                  : 'opacity-60 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <span>MERCADO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping absolute -top-0.5 -right-2"></span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Simulation trigger */}
            <button
              id="btn-simulate-event"
              onClick={onSimulateEvent}
              title="Simular lance/gol em tempo real para testar alertas"
              className="btn-primary text-xs py-1.5 sm:py-2 px-2 sm:px-3 flex items-center gap-1 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simular Lance</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              title={userPrefs.soundEnabled ? 'Silenciar alertas sonoros' : 'Ativar som de alertas (apito e gol)'}
              className={`p-1.5 sm:p-2 border transition cursor-pointer shrink-0 ${
                userPrefs.soundEnabled
                  ? 'bg-white/5 border-[#00ff88]/40 text-[#00ff88] hover:border-[#00ff88]'
                  : 'bg-transparent border-white/15 text-[#ececed]/40 hover:text-[#ececed]'
              }`}
              aria-label={userPrefs.soundEnabled ? 'Silenciar som' : 'Ativar som'}
            >
              {userPrefs.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Share / Compartilhar Button */}
            <button
              id="btn-share-app"
              onClick={handleShare}
              title={copied ? 'Link copiado para a área de transferência!' : 'Compartilhar link do FutScore (com miniatura/thumb)'}
              className={`p-1.5 sm:p-2 border transition cursor-pointer shrink-0 flex items-center gap-1 font-mono text-[11px] ${
                copied
                  ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]'
                  : 'bg-transparent border-white/15 text-[#ececed]/60 hover:text-[#00ff88] hover:border-[#00ff88]/50'
              }`}
              aria-label="Compartilhar link"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#00ff88]" />
                  <span className="hidden sm:inline text-[#00ff88] font-bold">COPIADO!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden xl:inline uppercase font-bold tracking-wider">COMPARTILHAR</span>
                </>
              )}
            </button>

            {/* Notification Center button */}
            <button
              id="btn-notification-center"
              onClick={onOpenNotifications}
              className="relative bg-transparent border border-[#ececed]/40 text-[#ececed] p-1.5 sm:px-3 sm:py-2 hover:border-[#00ff88] hover:text-[#00ff88] transition cursor-pointer flex items-center gap-1.5 shrink-0 font-mono text-[11px]"
              title="Notificações personalizadas"
              aria-label="Abrir central de notificações"
            >
              <Bell className="w-4 h-4 text-[#ececed]" />
              <span className="hidden lg:inline uppercase font-bold tracking-wider">
                NOTIFICAÇÕES
              </span>
              {unreadCount > 0 ? (
                <span className="bg-[#00ff88] text-[#0b0c0d] font-black text-[10px] px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {unreadCount}
                </span>
              ) : (
                <span className="hidden sm:inline text-white/50 text-[10px]">(0)</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom/Sub-Navbar */}
      <div className="flex md:hidden border-t border-white/10 bg-[#0b0c0d] px-2 py-2 justify-around">
        <button
          onClick={() => onSelectTab('matches')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2.5 text-[10px] font-bold uppercase transition ${
            activeTab === 'matches' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Jogos</span>
        </button>

        <button
          onClick={() => onSelectTab('predictions')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold uppercase transition ${
            activeTab === 'predictions' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#00ff88]" />
          <span>Previsões</span>
        </button>

        <button
          onClick={() => onSelectTab('teams')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold uppercase transition ${
            activeTab === 'teams' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Times</span>
        </button>

        <button
          onClick={() => onSelectTab('athletes')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold uppercase transition ${
            activeTab === 'athletes' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Atletas</span>
        </button>

        <button
          onClick={() => onSelectTab('rankings')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2.5 text-[10px] font-bold uppercase transition ${
            activeTab === 'rankings' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Rankings</span>
        </button>

        <button
          onClick={() => onSelectTab('market')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2.5 text-[10px] font-bold uppercase transition relative ${
            activeTab === 'market' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <Flame className="w-4 h-4 text-[#00ff88]" />
          <span>Mercado</span>
        </button>
      </div>
    </header>
  );
};
