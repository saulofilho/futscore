import React, { useState, useEffect, useCallback } from 'react';
import { Match, InAppAlert, UserNotificationPreferences, MatchEvent, LeagueTable, TransferNewsItem, AthleteProfile } from './types';
import { TEAMS_DATA } from './data/teamsData';
import { getAthleteById } from './data/athletesData';
import {
  getCachedMatches,
  getCachedStandings,
  getCachedNews,
  fetchLiveFootballMatches,
  fetchLiveStandings,
  fetchLiveNews,
  getLastSyncedTime,
} from './services/footballApi';
import { Navbar, TabType } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { MatchesView } from './components/MatchesView';
import { TeamsCatalog } from './components/TeamsCatalog';
import { AthletesExplorerView } from './components/AthletesExplorerView';
import { AthleteProfileModal } from './components/AthleteProfileModal';
import { RankingsView } from './components/RankingsView';
import { MarketNewsView } from './components/MarketNewsView';
import { MatchDetailModal } from './components/MatchDetailModal';
import { TeamHistoryModal } from './components/TeamHistoryModal';
import { NotificationModal } from './components/NotificationModal';
import { NotificationToast } from './components/NotificationToast';
import { soundFx } from './utils/audio';
import { RefreshCw } from 'lucide-react';

const STORAGE_KEY_PREFS = 'futscore_user_prefs_v1';
const STORAGE_KEY_ALERTS = 'futscore_alerts_v1';

const DEFAULT_PREFS: UserNotificationPreferences = {
  favoriteTeamIds: ['flamengo', 'real_madrid', 'palmeiras', 'manchester_city'],
  favoriteMatchIds: [],
  notifyGoals: true,
  notifyCards: true,
  notifyKickoff: true,
  notifyPenalties: true,
  notifyTransfers: true,
  soundEnabled: true,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('matches');
  const [matches, setMatches] = useState<Match[]>(() => getCachedMatches());
  const [standings, setStandings] = useState<LeagueTable[]>(() => getCachedStandings());
  const [news, setNews] = useState<TransferNewsItem[]>(() => getCachedNews());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string>(() => getLastSyncedTime() || 'Ao Vivo');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteProfile | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [currentToast, setCurrentToast] = useState<InAppAlert | null>(null);

  // User preferences
  const [userPrefs, setUserPrefs] = useState<UserNotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PREFS;
  });

  // Recent in-app alerts
  const [alerts, setAlerts] = useState<InAppAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALERTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'init-alert-1',
        matchId: 'match-1',
        title: '⚽ Gol do Flamengo! (34\')',
        message: 'Arrascaeta marcou um golaço de fora da área contra o Palmeiras.',
        type: 'goal',
        timestamp: '16:34',
        read: false,
      },
      {
        id: 'init-alert-2',
        matchId: 'match-2',
        title: '⚽ Gol do Real Madrid! (58\')',
        message: 'Vinícius Júnior finalizou no ângulo no El Clásico.',
        type: 'goal',
        timestamp: '17:14',
        read: false,
      },
    ];
  });

  // Persist prefs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(userPrefs));
    } catch {
      // ignore
    }
  }, [userPrefs]);

  // Persist alerts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

  const updatePreferences = (updated: Partial<UserNotificationPreferences>) => {
    setUserPrefs(prev => ({ ...prev, ...updated }));
  };

  const toggleMatchFavorite = (matchId: string) => {
    const isFav = userPrefs.favoriteMatchIds.includes(matchId);
    const updated = isFav
      ? userPrefs.favoriteMatchIds.filter(id => id !== matchId)
      : [...userPrefs.favoriteMatchIds, matchId];
    updatePreferences({ favoriteMatchIds: updated });
  };

  const handleToggleSound = () => {
    const nextVal = !userPrefs.soundEnabled;
    updatePreferences({ soundEnabled: nextVal });
    if (nextVal) {
      soundFx.playAlertPing();
    }
  };

  const triggerAlert = (alert: InAppAlert) => {
    setAlerts(prev => [alert, ...prev]);
    setCurrentToast(alert);

    // Audio effects if user enabled sound
    if (userPrefs.soundEnabled) {
      if (alert.type === 'goal') {
        soundFx.playGoalHorn();
      } else if (alert.type === 'red_card') {
        soundFx.playWhistle();
      } else {
        soundFx.playAlertPing();
      }
    }

    // Native browser push notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(alert.title, {
          body: alert.message,
          icon: '/favicon.ico',
        });
      } catch {
        // ignore
      }
    }
  };

  const requestBrowserPermission = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          triggerAlert({
            id: `perm-${Date.now()}`,
            title: 'Notificações Ativadas no Navegador!',
            message: 'Você receberá alertas instantâneos de gols e notícias quentes.',
            type: 'system',
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            read: true,
          });
        }
      });
    }
  };

  const refreshRealData = useCallback(async (showNotification = false) => {
    setIsSyncing(true);
    try {
      const [liveMatches, liveStandings, liveNews] = await Promise.all([
        fetchLiveFootballMatches(),
        fetchLiveStandings(),
        fetchLiveNews(),
      ]);

      if (liveMatches && liveMatches.length > 0) {
        setMatches(liveMatches);
      }
      if (liveStandings && liveStandings.length > 0) {
        setStandings(liveStandings);
      }
      if (liveNews && liveNews.length > 0) {
        setNews(liveNews);
      }

      const timeStr = new Date().toLocaleTimeString('pt-BR');
      setLastSynced(timeStr);

      if (showNotification) {
        triggerAlert({
          id: `sync-${Date.now()}`,
          title: 'Dados Reais Sincronizados!',
          message: `${liveMatches?.length || 0} partidas e tabelas de classificação oficiais atualizadas da ESPN API.`,
          type: 'info',
          timestamp: timeStr.slice(0, 5),
          read: false,
        });
      }
    } catch (err) {
      console.warn('Real data sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Fetch real data on mount and interval
  useEffect(() => {
    refreshRealData(false);

    const interval = setInterval(() => {
      refreshRealData(false);
    }, 90000);

    return () => clearInterval(interval);
  }, [refreshRealData]);

  // Live simulation engine: Tick minutes and generate events for live matches
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Advance minutes of LIVE matches
      setMatches(prevMatches =>
        prevMatches.map(m => {
          if (m.status !== 'LIVE' || !m.minute) return m;
          if (m.minute >= 94) {
            return { ...m, status: 'FINISHED' as const };
          }
          return { ...m, minute: m.minute + 1 };
        })
      );
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Periodic event trigger (simulates active match day)
  useEffect(() => {
    const eventInterval = setInterval(() => {
      // 30% chance every 35 seconds to simulate a live event (prioritizing favorite matches)
      if (Math.random() < 0.45) {
        const liveMatches = matches.filter(m => m.status === 'LIVE');
        if (liveMatches.length === 0) return;

        // Prioritize favorite matches if available
        const favoriteLiveMatches = liveMatches.filter(
          m =>
            userPrefs.favoriteMatchIds.includes(m.id) ||
            userPrefs.favoriteTeamIds.includes(m.homeTeam.id) ||
            userPrefs.favoriteTeamIds.includes(m.awayTeam.id)
        );

        const target =
          favoriteLiveMatches.length > 0 && Math.random() < 0.7
            ? favoriteLiveMatches[Math.floor(Math.random() * favoriteLiveMatches.length)]
            : liveMatches[Math.floor(Math.random() * liveMatches.length)];

        if (target) {
          handleSimulateEvent(target.id);
        }
      }
    }, 35000);

    return () => clearInterval(eventInterval);
  }, [matches, userPrefs]);

  // Simulation engine: Add a simulated goal or live event to a match
  const handleSimulateEvent = (targetMatchId?: string) => {
    // Find live match
    const liveMatches = matches.filter(m => m.status === 'LIVE');
    const match = targetMatchId
      ? matches.find(m => m.id === targetMatchId)
      : liveMatches[Math.floor(Math.random() * liveMatches.length)] || matches[0];

    if (!match) return;

    const isFavorite =
      userPrefs.favoriteMatchIds.includes(match.id) ||
      userPrefs.favoriteTeamIds.includes(match.homeTeam.id) ||
      userPrefs.favoriteTeamIds.includes(match.awayTeam.id);

    const scoringTeamIsHome = Math.random() > 0.5;
    const newMinute = Math.min(94, (match.minute || 45) + Math.floor(Math.random() * 3) + 1);

    const goalScorers = scoringTeamIsHome
      ? (match.lineupHome?.starters.slice(7).map(s => s.name) || ['Pedro', 'Gabriel Barbosa', 'Arrascaeta'])
      : (match.lineupAway?.starters.slice(7).map(s => s.name) || ['Rony', 'Raphael Veiga', 'Endrick']);

    const chosenPlayer = goalScorers[Math.floor(Math.random() * goalScorers.length)] || 'Atacante';
    const scoringTeamName = scoringTeamIsHome ? match.homeTeam.name : match.awayTeam.name;

    const newHomeScore = scoringTeamIsHome ? match.homeScore + 1 : match.homeScore;
    const newAwayScore = !scoringTeamIsHome ? match.awayScore + 1 : match.awayScore;

    const newEvent: MatchEvent = {
      id: `ev-sim-${Date.now()}`,
      minute: newMinute,
      type: 'goal',
      player: chosenPlayer,
      team: scoringTeamIsHome ? 'home' : 'away',
      detail: `Finalização certeira indefensável para o fundo da rede! Placar atualizado para ${newHomeScore} x ${newAwayScore}.`,
      assist: scoringTeamIsHome ? 'Gerson' : 'Estêvão',
    };

    // Update match state
    const updatedMatches = matches.map(m => {
      if (m.id !== match.id) return m;

      const newStats = { ...m.stats };
      if (scoringTeamIsHome) {
        newStats.shotsTotal[0] += 1;
        newStats.shotsOnTarget[0] += 1;
        newStats.xG[0] = Number((newStats.xG[0] + 0.38).toFixed(2));
      } else {
        newStats.shotsTotal[1] += 1;
        newStats.shotsOnTarget[1] += 1;
        newStats.xG[1] = Number((newStats.xG[1] + 0.38).toFixed(2));
      }

      return {
        ...m,
        status: 'LIVE' as const,
        minute: newMinute,
        homeScore: newHomeScore,
        awayScore: newAwayScore,
        events: [...m.events, newEvent],
        stats: newStats,
      };
    });

    setMatches(updatedMatches);

    // If detail modal is open for this match, refresh it
    if (selectedMatch && selectedMatch.id === match.id) {
      setSelectedMatch(updatedMatches.find(m => m.id === match.id) || null);
    }

    // Trigger notification if user preferences allow goals
    if (userPrefs.notifyGoals) {
      const alert: InAppAlert = {
        id: `alert-${Date.now()}`,
        matchId: match.id,
        isFavoriteMatch: isFavorite,
        title: `${isFavorite ? '★ ' : ''}⚽ GOOOL DO ${scoringTeamName.toUpperCase()}! (${newMinute}')`,
        message: `${chosenPlayer} marca! ${match.homeTeam.shortName} ${newHomeScore} x ${newAwayScore} ${match.awayTeam.shortName}${isFavorite ? ' • Jogo Favorito Notificado' : ''}`,
        type: 'goal',
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        read: false,
      };

      triggerAlert(alert);
    }
  };

  const handleOpenTeamHistory = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const handleOpenAthlete = (athleteOrName: AthleteProfile | string) => {
    if (typeof athleteOrName === 'string') {
      const found = getAthleteById(athleteOrName);
      if (found) {
        setSelectedAthlete(found);
      } else {
        const cleanName = athleteOrName.trim();
        setSelectedAthlete({
          id: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: cleanName,
          fullName: `${cleanName} (Atleta Profissional)`,
          nickname: cleanName,
          number: 10,
          position: 'Atacante',
          teamId: 'futebol',
          teamName: 'Futebol Profissional',
          teamBadgeEmoji: '⚽',
          age: 26,
          birthDate: 'Temporada Oficial',
          birthPlace: 'Brasil / Internacional',
          height: '1.80 m',
          weight: '75 kg',
          preferredFoot: 'Destro',
          nationality: 'Brasil',
          flagEmoji: '🇧🇷',
          marketValue: '€ 15M',
          marketValueBrl: 'R$ 95 Milhões',
          contractUntil: 'Dezembro de 2027',
          photoEmoji: '⚽',
          seasonStats: {
            matches: 34,
            goals: 12,
            assists: 8,
            rating: 8.15,
            minutesPlayed: 2580,
            yellowCards: 4,
            redCards: 0,
            shotAccuracy: 68,
            passAccuracy: 84,
            keyPassesPerGame: 2.1,
            xG: 10.4
          },
          strengths: ['Finalização rápida', 'Drible em velocidade', 'Passe vertical', 'Visão periférica'],
          playStyle: 'Atleta com velocidade e capacidade de definição no terço final do campo.',
          careerHistory: [
            { club: 'Clube Oficial', years: '2022 - Presente', matches: 85, goals: 34, titles: 'Competições Oficiais' }
          ],
          trophies: ['Campeonatos Oficiais da Temporada'],
          bio: `${cleanName} é um atleta profissional de futebol de alto rendimento, disputando os principais campeonatos com destaque e dedicação.`
        });
      }
    } else {
      setSelectedAthlete(athleteOrName);
    }
  };

  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-[#0b0c0d] text-[#ececed] flex flex-col font-sans selection:bg-[#00ff88] selection:text-[#0b0c0d]">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadCount={unreadAlertsCount}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onSimulateEvent={() => handleSimulateEvent()}
        userPrefs={userPrefs}
        onToggleSound={handleToggleSound}
      />

      {/* Live Match Strip / Ticker */}
      <LiveTicker
        matches={matches}
        onSelectMatch={setSelectedMatch}
      />

      {/* Real Data Connection Status Bar */}
      <div className="bg-[#141618] border-b border-white/10 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
            </span>
            <span className="font-bold text-[#ececed] uppercase tracking-wider text-[11px] sm:text-xs">
              DADOS REAIS:
            </span>
            <span className="text-[#00ff88] font-bold text-[11px] sm:text-xs">
              ESPN SOCCER API
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-white/70 text-[11px] hidden sm:inline">
              {matches.length} partidas sincronizadas
            </span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-[#00ff88]/80 text-[11px] hidden md:inline">
              Brasileirão, Champions, Premier, La Liga, Libertadores
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <span className="text-[#ececed]/50 text-[10px] sm:text-[11px]">
              Sincronizado: <strong className="text-[#ececed]">{lastSynced}</strong>
            </span>
            <button
              onClick={() => refreshRealData(true)}
              disabled={isSyncing}
              className="px-2.5 py-1 bg-[#0b0c0d] border border-white/15 hover:border-[#00ff88] text-[#ececed] hover:text-[#00ff88] transition cursor-pointer flex items-center gap-1.5 uppercase font-bold text-[10px] sm:text-[11px] shrink-0"
              title="Buscar últimos resultados e gols das ligas"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-[#00ff88]' : ''}`} />
              <span>{isSyncing ? 'SINCRONIZANDO...' : 'ATUALIZAR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'matches' && (
          <MatchesView
            matches={matches}
            favoriteMatchIds={userPrefs.favoriteMatchIds}
            onToggleFavorite={toggleMatchFavorite}
            onSelectMatch={setSelectedMatch}
            onOpenTeamHistory={handleOpenTeamHistory}
            onSimulateEvent={() => handleSimulateEvent()}
          />
        )}

        {activeTab === 'teams' && (
          <TeamsCatalog
            onSelectTeam={handleOpenTeamHistory}
          />
        )}

        {activeTab === 'athletes' && (
          <AthletesExplorerView
            onSelectAthlete={handleOpenAthlete}
            onOpenTeamHistory={handleOpenTeamHistory}
          />
        )}

        {activeTab === 'rankings' && (
          <RankingsView
            standings={standings}
            onRefreshStandings={() => refreshRealData(true)}
            isRefreshingStandings={isSyncing}
            onSelectAthlete={handleOpenAthlete}
          />
        )}

        {activeTab === 'market' && (
          <MarketNewsView news={news} />
        )}
      </main>

      {/* Toast Notification for Real-Time Events */}
      <NotificationToast
        alert={currentToast}
        onDismiss={() => setCurrentToast(null)}
        onViewMatch={(matchId) => {
          const m = matches.find(item => item.id === matchId);
          if (m) setSelectedMatch(m);
        }}
      />

      {/* Detailed Match Statistics Modal */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onOpenTeamHistory={handleOpenTeamHistory}
          onToggleFavorite={toggleMatchFavorite}
          isFavorite={userPrefs.favoriteMatchIds.includes(selectedMatch.id)}
          onAddSimulatedGoal={handleSimulateEvent}
          onSelectAthlete={handleOpenAthlete}
        />
      )}

      {/* Team History Detailed Modal */}
      {selectedTeamId && (
        <TeamHistoryModal
          teamId={selectedTeamId}
          onClose={() => setSelectedTeamId(null)}
          onSelectAthlete={handleOpenAthlete}
        />
      )}

      {/* Athlete Profile Detailed Modal */}
      {selectedAthlete && (
        <AthleteProfileModal
          athlete={selectedAthlete}
          onClose={() => setSelectedAthlete(null)}
          onOpenTeamHistory={handleOpenTeamHistory}
        />
      )}

      {/* Personalized Notification Settings Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        prefs={userPrefs}
        onUpdatePrefs={updatePreferences}
        alerts={alerts}
        onClearAlerts={() => setAlerts([])}
        onMarkAllAsRead={() => setAlerts(prev => prev.map(a => ({ ...a, read: true })))}
        matches={matches}
        onTriggerTestNotification={() => handleSimulateEvent()}
        onRequestBrowserPermission={requestBrowserPermission}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0b0c0d] py-6 sm:py-8 px-4 sm:px-6 font-mono text-xs text-[#ececed]/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-['Syne'] font-extrabold text-[#ececed] uppercase text-sm">FutScore PRO</span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <span className="label opacity-70 text-[10px] sm:text-xs">
              Estatísticas em Tempo Real, Escalações, Desfalques, Onde Assistir, Central de Atletas &amp; História dos Clubes
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 uppercase font-bold text-[11px] sm:text-xs">
            <button onClick={() => setActiveTab('matches')} className="hover:text-white cursor-pointer transition">
              Partidas
            </button>
            <button onClick={() => setActiveTab('teams')} className="hover:text-white cursor-pointer transition">
              História &amp; Plantel
            </button>
            <button onClick={() => setActiveTab('athletes')} className="hover:text-[#00ff88] cursor-pointer transition text-[#00ff88]">
              Craques &amp; Atletas
            </button>
            <button onClick={() => setActiveTab('rankings')} className="hover:text-white cursor-pointer transition">
              Tabelas &amp; Rankings
            </button>
            <button onClick={() => setActiveTab('market')} className="hover:text-white cursor-pointer transition">
              Mercado da Bola
            </button>
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="hover:text-white cursor-pointer text-[#00ff88] border border-[#00ff88]/40 px-2.5 py-1 transition"
            >
              🔔 Configurar Alertas
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
