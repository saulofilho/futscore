import React from 'react';
import { UserNotificationPreferences, InAppAlert, Match } from '../types';
import { TEAMS_DATA } from '../data/teamsData';
import { X, Volume2, VolumeX, CheckCircle, Star, Sparkles, Trash2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefs: UserNotificationPreferences;
  onUpdatePrefs: (updated: Partial<UserNotificationPreferences>) => void;
  alerts: InAppAlert[];
  onClearAlerts: () => void;
  onMarkAllAsRead: () => void;
  matches: Match[];
  onTriggerTestNotification: () => void;
  onRequestBrowserPermission: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  prefs,
  onUpdatePrefs,
  alerts,
  onClearAlerts,
  matches,
  onTriggerTestNotification,
  onRequestBrowserPermission,
}) => {
  if (!isOpen) return null;

  const toggleTeamFavorite = (teamId: string) => {
    const exists = prefs.favoriteTeamIds.includes(teamId);
    const updated = exists
      ? prefs.favoriteTeamIds.filter(id => id !== teamId)
      : [...prefs.favoriteTeamIds, teamId];
    onUpdatePrefs({ favoriteTeamIds: updated });
  };

  const toggleMatchFavorite = (matchId: string) => {
    const exists = prefs.favoriteMatchIds.includes(matchId);
    const updated = exists
      ? prefs.favoriteMatchIds.filter(id => id !== matchId)
      : [...prefs.favoriteMatchIds, matchId];
    onUpdatePrefs({ favoriteMatchIds: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141618] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#ececed]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0b0c0d] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="label text-[#00ff88] opacity-100 font-bold mb-1">
              [CONFIGURAÇÃO DE ALERTAS]
            </div>
            <h2 className="font-['Syne'] font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#ececed]">
              Central de Notificações
            </h2>
            <p className="label opacity-60 mt-0.5">
              Personalize alertas em tempo real para os seus jogos e clubes favoritos
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#141618] border border-white/10 text-[#ececed]/60 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Settings Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section: Test Alert Quick Button */}
          <div className="bg-[#0b0c0d] p-4 border border-[#00ff88]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="label text-[#00ff88] opacity-100 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TESTAR ALERTA SONORO DE GOL</span>
              </h4>
              <p className="text-xs text-[#ececed]/70 mt-0.5">
                Simula o disparo sonoro de gol com banner flutuante em tempo real
              </p>
            </div>

            <button
              onClick={onTriggerTestNotification}
              id="btn-test-alert-now"
              className="btn-primary flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Disparar Teste</span>
            </button>
          </div>

          {/* Section 1: Types of Events to notify */}
          <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3">
            <h3 className="label opacity-80 mb-2">
              Tipos de Alertas Ativos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              <label className="flex items-center gap-3 p-3 bg-[#141618] border border-white/10 hover:border-[#00ff88] cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={prefs.notifyGoals}
                  onChange={(e) => onUpdatePrefs({ notifyGoals: e.target.checked })}
                  className="w-4 h-4 accent-[#00ff88]"
                />
                <span className="text-xs text-[#ececed]">⚽ Gols em tempo real</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#141618] border border-white/10 hover:border-[#00ff88] cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={prefs.notifyKickoff}
                  onChange={(e) => onUpdatePrefs({ notifyKickoff: e.target.checked })}
                  className="w-4 h-4 accent-[#00ff88]"
                />
                <span className="text-xs text-[#ececed]">⏱️ Início &amp; Fim de jogo</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#141618] border border-white/10 hover:border-[#00ff88] cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={prefs.notifyCards}
                  onChange={(e) => onUpdatePrefs({ notifyCards: e.target.checked })}
                  className="w-4 h-4 accent-[#00ff88]"
                />
                <span className="text-xs text-[#ececed]">🟥 Cartões vermelhos</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#141618] border border-white/10 hover:border-[#00ff88] cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={prefs.notifyPenalties}
                  onChange={(e) => onUpdatePrefs({ notifyPenalties: e.target.checked })}
                  className="w-4 h-4 accent-[#00ff88]"
                />
                <span className="text-xs text-[#ececed]">🎯 Pênaltis &amp; Decisões VAR</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#141618] border border-white/10 hover:border-[#00ff88] cursor-pointer transition sm:col-span-2">
                <input
                  type="checkbox"
                  checked={prefs.notifyTransfers}
                  onChange={(e) => onUpdatePrefs({ notifyTransfers: e.target.checked })}
                  className="w-4 h-4 accent-[#00ff88]"
                />
                <span className="text-xs text-[#ececed]">🔥 Mercado da Bola (Contratações Oficiais)</span>
              </label>
            </div>
          </div>

          {/* Section 2: Audio & Native Notification Settings */}
          <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3">
            <h3 className="label opacity-80 mb-2">
              Sons e Notificações do Navegador
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#141618] border border-white/10">
              <div className="flex items-center gap-3">
                {prefs.soundEnabled ? <Volume2 className="w-5 h-5 text-[#00ff88]" /> : <VolumeX className="w-5 h-5 text-[#ececed]/40" />}
                <div>
                  <p className="text-xs font-bold text-[#ececed]">Efeitos Sonoros de Gol &amp; Apito</p>
                  <p className="label opacity-60">Sintetizador web de alta fidelidade ao registrar gols</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const newState = !prefs.soundEnabled;
                  onUpdatePrefs({ soundEnabled: newState });
                  if (newState) soundFx.playAlertPing();
                }}
                className={`font-mono text-xs px-3 py-1.5 uppercase font-bold cursor-pointer transition ${
                  prefs.soundEnabled
                    ? 'bg-[#00ff88] text-[#0b0c0d]'
                    : 'bg-white/10 text-[#ececed]/50'
                }`}
              >
                {prefs.soundEnabled ? 'ATIVADO' : 'DESATIVADO'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#141618] border border-white/10">
              <div>
                <p className="text-xs font-bold text-[#ececed]">Notificações Push do Navegador</p>
                <p className="label opacity-60">Receba alertas mesmo quando estiver em outra aba</p>
              </div>
              <button
                onClick={onRequestBrowserPermission}
                className="font-mono text-xs px-3 py-1.5 border border-white/20 hover:border-[#00ff88] text-[#ececed] uppercase cursor-pointer transition"
              >
                {typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
                  ? 'PERMITIDO'
                  : 'SOLICITAR PERMISSÃO'}
              </button>
            </div>
          </div>

          {/* Section 3: Favorite Teams Picker */}
          <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3">
            <h3 className="label opacity-80 flex items-center justify-between">
              <span>Seus Clubes do Coração</span>
              <span className="text-[#00ff88] font-mono font-bold">
                {prefs.favoriteTeamIds.length} SELECIONADOS
              </span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {Object.values(TEAMS_DATA).map((team) => {
                const isFav = prefs.favoriteTeamIds.includes(team.id);
                return (
                  <button
                    key={team.id}
                    onClick={() => toggleTeamFavorite(team.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition cursor-pointer border ${
                      isFav
                        ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
                        : 'bg-[#141618] border-white/10 text-[#ececed]/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{team.badgeEmoji}</span>
                    <span className="uppercase">{team.name}</span>
                    {isFav && <CheckCircle className="w-3 h-3 text-[#0b0c0d]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Favorite Matches Quick Toggle */}
          <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3">
            <h3 className="label opacity-80 mb-2">
              Partidas Marcadas para Alerta
            </h3>

            <div className="space-y-2">
              {matches.map((m) => {
                const isFav = prefs.favoriteMatchIds.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-2.5 bg-[#141618] border border-white/10 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-[#ececed] truncate uppercase">
                        {m.homeTeam.name} vs {m.awayTeam.name}
                      </span>
                      {m.status === 'LIVE' && (
                        <span className="status-pill text-[10px]">
                          {m.minute}' AO VIVO
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleMatchFavorite(m.id)}
                      className={`p-1.5 border transition cursor-pointer ${
                        isFav
                          ? 'bg-[#00ff88] border-[#00ff88] text-[#0b0c0d]'
                          : 'bg-[#0b0c0d] border-white/10 text-[#ececed]/40 hover:text-white'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Recent Alerts Log */}
          <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="label opacity-80">
                Histórico de Alertas ({alerts.length})
              </h3>
              {alerts.length > 0 && (
                <button
                  onClick={onClearAlerts}
                  className="label text-red-400 opacity-100 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>LIMPAR</span>
                </button>
              )}
            </div>

            {alerts.length === 0 ? (
              <p className="label opacity-40 py-3 text-center">
                Nenhum alerta recente registrado.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 font-mono">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-2.5 bg-[#141618] border border-white/10 text-xs flex items-start gap-2.5"
                  >
                    <span className="text-base mt-0.5">
                      {al.type === 'goal' ? '⚽' : al.type === 'red_card' ? '🟥' : '🔔'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          {al.isFavoriteMatch && (
                            <span className="font-mono text-[9px] bg-[#00ff88] text-[#0b0c0d] font-bold px-1 uppercase">
                              ★ FAVORITO
                            </span>
                          )}
                          <strong className="text-white truncate uppercase">{al.title}</strong>
                        </div>
                        <span className="text-[10px] text-[#ececed]/40 font-mono shrink-0 ml-2">{al.timestamp}</span>
                      </div>
                      <p className="text-[#ececed]/70 text-[11px] mt-0.5">{al.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0b0c0d] border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="btn-primary cursor-pointer"
          >
            Salvar e Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
