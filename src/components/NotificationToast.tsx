import React from 'react';
import { InAppAlert } from '../types';
import { X, Radio } from 'lucide-react';

interface NotificationToastProps {
  alert: InAppAlert | null;
  onDismiss: () => void;
  onViewMatch?: (matchId: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  alert,
  onDismiss,
  onViewMatch,
}) => {
  if (!alert) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-[#141618] border-2 border-[#00ff88] p-4 shadow-2xl flex items-start gap-3 text-[#ececed]">
        <div className="w-10 h-10 bg-[#0b0c0d] border border-white/10 flex items-center justify-center text-xl shrink-0">
          {alert.type === 'goal' ? '⚽' : alert.type === 'red_card' ? '🟥' : '🔔'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="label text-[#00ff88] opacity-100 font-bold flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 animate-ping" />
              {alert.isFavoriteMatch ? '★ [SEU JOGO FAVORITO]' : '[ALERTA AO VIVO]'}
            </span>
            <button
              onClick={onDismiss}
              className="text-[#ececed]/50 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="font-['Syne'] font-extrabold text-sm text-[#ececed] uppercase mt-0.5 truncate">
            {alert.title}
          </h4>

          <p className="text-xs text-[#ececed]/80 mt-0.5 leading-snug">
            {alert.message}
          </p>

          {alert.matchId && onViewMatch && (
            <button
              onClick={() => {
                onViewMatch(alert.matchId!);
                onDismiss();
              }}
              className="mt-2.5 label text-[#00ff88] opacity-100 font-bold hover:underline cursor-pointer block"
            >
              [VER DETALHES DA PARTIDA →]
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
