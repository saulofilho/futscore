import React from 'react';
import { Bell, Trophy, Shield, Newspaper, Flame, Activity, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { UserNotificationPreferences } from '../types';

export type TabType = 'matches' | 'teams' | 'rankings' | 'market';

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
  return (
    <header className="sticky top-0 z-40 bg-[#0b0c0d]/95 backdrop-blur-md border-b-2 border-[#ececed]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('matches')}
              className="flex items-center gap-3 text-left cursor-pointer group"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 bg-[#00ff88] text-[#0b0c0d] flex items-center justify-center font-['Syne'] font-black text-lg tracking-tighter shrink-0 transition group-hover:brightness-110">
                FS
              </div>
              <div>
                <div className="label text-[#00ff88] opacity-100 font-bold tracking-widest">
                  FutScore PRO
                </div>
                <div className="font-['Syne'] font-extrabold text-sm sm:text-base text-[#ececed] tracking-tight uppercase leading-none">
                  TEMPO REAL
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-6">
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
              id="nav-tab-teams"
              onClick={() => onSelectTab('teams')}
              className={`font-mono text-xs uppercase tracking-widest py-2 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 ${
                activeTab === 'teams'
                  ? 'opacity-100 border-[#00ff88] text-[#ececed]'
                  : 'opacity-60 text-[#ececed] border-transparent hover:opacity-100'
              }`}
            >
              <span>HISTÓRIA</span>
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Simulation trigger */}
            <button
              id="btn-simulate-event"
              onClick={onSimulateEvent}
              title="Simular lance/gol em tempo real para testar alertas"
              className="btn-primary text-xs py-1.5 sm:py-2 px-2.5 sm:px-3 flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simular Lance</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              title={userPrefs.soundEnabled ? 'Silenciar alertas' : 'Ativar som de alertas (apito e gol)'}
              className={`p-2 border transition cursor-pointer ${
                userPrefs.soundEnabled
                  ? 'bg-white/5 border-[#00ff88]/40 text-[#00ff88] hover:border-[#00ff88]'
                  : 'bg-transparent border-white/15 text-[#ececed]/40 hover:text-[#ececed]'
              }`}
            >
              {userPrefs.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Notification Center button */}
            <button
              id="btn-notification-center"
              onClick={onOpenNotifications}
              className="label bg-transparent border border-[#ececed]/40 text-[#ececed] px-2.5 sm:px-3 py-2 hover:border-[#00ff88] hover:text-[#00ff88] transition cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Notificações personalizadas"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>NOTIFICAÇÕES ({unreadCount})</span>
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
          onClick={() => onSelectTab('teams')}
          className={`font-mono flex flex-col items-center gap-1 py-1 px-2.5 text-[10px] font-bold uppercase transition ${
            activeTab === 'teams' ? 'text-[#00ff88]' : 'text-[#ececed]/50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>História</span>
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
