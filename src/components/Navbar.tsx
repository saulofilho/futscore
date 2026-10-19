import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Trophy, 
  Shield, 
  Flame, 
  Activity, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Share2, 
  Check, 
  User, 
  BrainCircuit, 
  Sliders, 
  Heart, 
  Menu, 
  X,
  ChevronRight,
  Home
} from 'lucide-react';
import { UserNotificationPreferences } from '../types';
import { TEAMS_DATA } from '../data/teamsData';

export type TabType = 'home' | 'matches' | 'predictions' | 'coach' | 'teams' | 'athletes' | 'rankings' | 'market';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onSimulateEvent: () => void;
  userPrefs: UserNotificationPreferences;
  onToggleSound: () => void;
  onOpenFavoriteTeamSelector?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  onOpenNotifications,
  onSimulateEvent,
  userPrefs,
  onToggleSound,
  onOpenFavoriteTeamSelector,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Retrieve current single favorite team
  const primaryTeam = useMemo(() => {
    const favId = userPrefs.favoriteTeamId || userPrefs.primaryFavoriteTeamId || (userPrefs.favoriteTeamIds && userPrefs.favoriteTeamIds[0]);
    if (!favId) return null;
    const cleanId = favId.toLowerCase();
    if (TEAMS_DATA[cleanId]) return TEAMS_DATA[cleanId];
    const found = Object.values(TEAMS_DATA).find(t => 
      t.id.toLowerCase() === cleanId || 
      t.name.toLowerCase() === cleanId
    );
    if (found) return found;
    return {
      id: favId,
      name: favId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      badgeEmoji: '⚽',
      popularName: favId.split('_')[0].toUpperCase(),
    } as any;
  }, [userPrefs.favoriteTeamId, userPrefs.primaryFavoriteTeamId, userPrefs.favoriteTeamIds]);

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
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  const navItems = [
    { id: 'home' as TabType, label: 'Início', icon: Home, badge: null },
    { id: 'matches' as TabType, label: 'Jogos', icon: Activity, badge: null },
    { id: 'predictions' as TabType, label: 'Previsões IA', icon: BrainCircuit, badge: 'GEMINI' },
    { id: 'coach' as TabType, label: 'Treinador', icon: Sliders, badge: 'SIM' },
    { id: 'teams' as TabType, label: 'Times', icon: Shield, badge: null },
    { id: 'athletes' as TabType, label: 'Atletas', icon: User, badge: 'NOVO' },
    { id: 'rankings' as TabType, label: 'Rankings', icon: Trophy, badge: null },
    { id: 'market' as TabType, label: 'Mercado', icon: Flame, badge: 'HOT' },
  ];

  const handleSelectNavTab = (tab: TabType) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c0d]/95 backdrop-blur-md border-b border-white/10 w-full">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
            <button
              onClick={() => handleSelectNavTab('home')}
              className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group shrink-0"
              id="brand-logo-btn"
              aria-label="FutScore Início"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00ff88] text-[#0b0c0d] flex items-center justify-center font-['Syne'] font-black text-sm sm:text-lg tracking-tighter shrink-0 transition group-hover:brightness-110 shadow-sm">
                FS
              </div>
              <div className="min-w-0">
                <div className="label text-[#00ff88] opacity-100 font-bold tracking-widest text-[9px] sm:text-[10px] leading-tight">
                  FutScore PRO
                </div>
                <div className="font-['Syne'] font-extrabold text-xs sm:text-base text-[#ececed] tracking-tight uppercase leading-none truncate">
                  TEMPO REAL
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs (Visible on screens >= 1150px) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`font-mono text-xs uppercase tracking-wider py-2 px-2.5 transition cursor-pointer border-b-2 font-bold flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'border-[#00ff88] text-[#00ff88]'
                      : 'border-transparent text-[#ececed]/70 hover:text-white hover:border-white/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 px-1 py-0.2 rounded-xs font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Quick Simulation Trigger */}
            <button
              id="btn-simulate-event"
              onClick={onSimulateEvent}
              title="Simular lance/gol em tempo real"
              className="hidden sm:flex items-center gap-1.5 bg-[#00ff88] hover:bg-[#00e57a] text-[#0b0c0d] font-['Syne'] font-extrabold text-[11px] sm:text-xs py-1.5 sm:py-2 px-2.5 sm:px-3 uppercase transition cursor-pointer shadow-sm shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">Simular Lance</span>
            </button>

            {/* Favorite Team Selector Quick Button */}
            {onOpenFavoriteTeamSelector && (
              <button
                id="btn-open-favorite-team"
                onClick={onOpenFavoriteTeamSelector}
                className="bg-[#141618] border border-white/20 hover:border-amber-400 text-[#ececed] p-1.5 sm:px-2.5 sm:py-2 transition cursor-pointer flex items-center gap-1.5 shrink-0 font-mono text-[11px] group"
                title="Meu Time Favorito"
                aria-label="Meu Time Favorito"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500/50 group-hover:fill-red-500 transition-transform shrink-0" />
                <span className="hidden lg:inline font-bold uppercase text-[11px] text-[#ececed] max-w-[85px] truncate">
                  {primaryTeam ? (primaryTeam.popularName || primaryTeam.name) : 'MEU TIME'}
                </span>
                {primaryTeam ? (
                  <span className="text-xs shrink-0">{primaryTeam.badgeEmoji}</span>
                ) : (
                  <span className="text-[9px] bg-amber-400 text-black font-extrabold px-1 py-0.2 hidden sm:inline">
                    ESCOLHER
                  </span>
                )}
              </button>
            )}

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              title={userPrefs.soundEnabled ? 'Silenciar alertas sonoros' : 'Ativar som de alertas (apito e gol)'}
              className={`p-1.5 sm:p-2 border transition cursor-pointer shrink-0 ${
                userPrefs.soundEnabled
                  ? 'bg-white/5 border-[#00ff88]/50 text-[#00ff88]'
                  : 'bg-transparent border-white/15 text-[#ececed]/40 hover:text-white'
              }`}
              aria-label={userPrefs.soundEnabled ? 'Silenciar som' : 'Ativar som'}
            >
              {userPrefs.soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Share Button (Desktop/Tablet) */}
            <button
              id="btn-share-app"
              onClick={handleShare}
              title={copied ? 'Link copiado!' : 'Compartilhar aplicativo'}
              className={`hidden sm:flex p-1.5 sm:p-2 border transition cursor-pointer shrink-0 items-center gap-1 font-mono text-[11px] ${
                copied
                  ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]'
                  : 'bg-transparent border-white/15 text-[#ececed]/60 hover:text-white hover:border-white/30'
              }`}
              aria-label="Compartilhar"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00ff88]" />
              ) : (
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Notification Center */}
            <button
              id="btn-notification-center"
              onClick={onOpenNotifications}
              className="relative bg-transparent border border-white/20 text-[#ececed] p-1.5 sm:px-2.5 sm:py-2 hover:border-[#00ff88] hover:text-[#00ff88] transition cursor-pointer flex items-center gap-1.5 shrink-0 font-mono text-[11px]"
              title="Notificações"
              aria-label="Abrir central de notificações"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ececed]" />
              {unreadCount > 0 && (
                <span className="bg-[#00ff88] text-[#0b0c0d] font-black text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full min-w-[16px] text-center shrink-0">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              id="btn-mobile-menu-toggle"
              className="xl:hidden p-1.5 sm:p-2 bg-[#141618] border border-white/20 text-[#ececed] hover:border-[#00ff88] hover:text-[#00ff88] transition cursor-pointer shrink-0"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Sub-Bar for Mobile & Tablet (Always fits cleanly, never wraps or breaks) */}
      <div className="xl:hidden border-t border-white/10 bg-[#08090a] px-2 py-1.5 overflow-x-auto scrollbar-none touch-pan-x">
        <div className="flex items-center gap-1.5 w-max min-w-full justify-start px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectNavTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase transition shrink-0 whitespace-nowrap cursor-pointer rounded-none border ${
                  isActive
                    ? 'bg-[#00ff88] text-[#0b0c0d] border-[#00ff88] shadow-sm'
                    : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/25'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0b0c0d]' : 'text-[#ececed]/60'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[8px] font-black px-1 py-0.2 uppercase ${
                    isActive ? 'bg-[#0b0c0d] text-[#00ff88]' : 'bg-[#00ff88]/20 text-[#00ff88]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu (Opened when tapping hamburger) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0b0c0d] px-4 py-4 space-y-3 animate-fadeIn shadow-2xl">
          {/* Quick Favorite Team Card */}
          {primaryTeam && onOpenFavoriteTeamSelector && (
            <div 
              onClick={() => {
                onOpenFavoriteTeamSelector();
                setIsMobileMenuOpen(false);
              }}
              className="bg-[#141618] border border-amber-500/40 p-3 flex items-center justify-between cursor-pointer hover:border-amber-400 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{primaryTeam.badgeEmoji}</span>
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase font-mono">SEU TIME DO CORAÇÃO</div>
                  <div className="text-sm font-['Syne'] font-bold text-white uppercase">{primaryTeam.name}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </div>
          )}

          {/* Mobile Quick Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => {
                onSimulateEvent();
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#141618] border border-[#00ff88]/40 hover:border-[#00ff88] text-[#00ff88] flex items-center justify-center gap-1.5 font-bold uppercase transition"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Simular Lance</span>
            </button>

            <button
              onClick={() => {
                handleShare();
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#141618] border border-white/15 hover:border-white/40 text-white flex items-center justify-center gap-1.5 font-bold uppercase transition"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>Compartilhar</span>
            </button>

            <button
              onClick={() => {
                onOpenNotifications();
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#141618] border border-white/15 hover:border-white/40 text-white flex items-center justify-center gap-1.5 font-bold uppercase transition"
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>Alertas ({unreadCount})</span>
            </button>

            {onOpenFavoriteTeamSelector && (
              <button
                onClick={() => {
                  onOpenFavoriteTeamSelector();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 bg-[#141618] border border-amber-500/30 hover:border-amber-400 text-amber-400 flex items-center justify-center gap-1.5 font-bold uppercase transition"
              >
                <Heart className="w-4 h-4 shrink-0 fill-amber-400/30" />
                <span>Mudar Time</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
