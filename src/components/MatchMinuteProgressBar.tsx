import React from 'react';
import { MatchStatus } from '../types';
import { Timer, Clock, Activity, Flag } from 'lucide-react';

interface MatchMinuteProgressBarProps {
  minute?: number;
  status: MatchStatus;
  variant?: 'detailed' | 'card' | 'compact';
  className?: string;
}

export const MatchMinuteProgressBar: React.FC<MatchMinuteProgressBarProps> = ({
  minute = 0,
  status,
  variant = 'detailed',
  className = '',
}) => {
  const isLive = status === 'LIVE';
  const isFinished = status === 'FINISHED';
  const isScheduled = status === 'SCHEDULED';
  const isHalfTime = isLive && minute === 45;

  // Clamped percentage relative to 90 minutes full-time
  const clampedMinute = Math.max(0, minute);
  const regularTimePercent = Math.min(100, (clampedMinute / 90) * 100);
  const extraMinutes = clampedMinute > 90 ? clampedMinute - 90 : 0;
  const remainingMinutes = Math.max(0, 90 - Math.min(clampedMinute, 90));

  // Determine current match phase
  let phaseText = 'PRÉ-JOGO';
  let phaseColor = 'text-[#ececed]/60';
  let phaseBg = 'bg-white/10';

  if (isFinished) {
    phaseText = 'FIM DE JOGO';
    phaseColor = 'text-white/70';
    phaseBg = 'bg-white/10';
  } else if (isLive) {
    if (extraMinutes > 0) {
      phaseText = `ACRÉSCIMOS (+${extraMinutes}')`;
      phaseColor = 'text-amber-400';
      phaseBg = 'bg-amber-950/60 border-amber-500/40';
    } else if (isHalfTime) {
      phaseText = 'INTERVALO (HT)';
      phaseColor = 'text-sky-400';
      phaseBg = 'bg-sky-950/60 border-sky-500/40';
    } else if (clampedMinute <= 45) {
      phaseText = '1º TEMPO';
      phaseColor = 'text-[#00ff88]';
      phaseBg = 'bg-[#00ff88]/15 border-[#00ff88]/40';
    } else {
      phaseText = '2º TEMPO';
      phaseColor = 'text-[#00ff88]';
      phaseBg = 'bg-[#00ff88]/15 border-[#00ff88]/40';
    }
  }

  // COMPACT VARIANT (for small spaces or lists)
  if (variant === 'compact') {
    return (
      <div className={`w-full font-mono text-[10px] ${className}`} title={`Progresso: ${clampedMinute}' de 90' regulamentares`}>
        <div className="flex items-center justify-between text-[#ececed]/60 mb-1">
          <span className="flex items-center gap-1 font-bold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
            {clampedMinute}'
          </span>
          <span>90'</span>
        </div>
        <div className="relative h-1.5 w-full bg-[#0b0c0d] border border-white/10 overflow-hidden">
          {/* Half time notch */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20 z-10" />
          {/* Animated fill */}
          <div
            className="h-full bg-[#00ff88] transition-all duration-700 ease-out"
            style={{ width: `${isFinished ? 100 : regularTimePercent}%` }}
          />
        </div>
      </div>
    );
  }

  // CARD VARIANT (specifically optimized for MatchCard.tsx)
  if (variant === 'card') {
    return (
      <div
        className={`w-full bg-[#0b0c0d] border border-white/10 p-2.5 font-mono text-xs space-y-1.5 ${className}`}
        title={`Tempo de jogo: ${clampedMinute} minutos jogados de 90 minutos regulamentares`}
      >
        {/* Phase and minute header */}
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            {isLive ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
              </span>
            ) : (
              <Clock className="w-3 h-3 text-[#ececed]/40" />
            )}
            <span className={`px-1.5 py-0.2 border text-[9px] font-bold uppercase tracking-wider ${phaseBg} ${phaseColor}`}>
              {phaseText}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#ececed]/80 text-[10px]">
            <span className="font-bold text-white">
              {clampedMinute}'
              <span className="text-[#ececed]/40 font-normal"> / 90'</span>
            </span>
            {isLive && extraMinutes === 0 && (
              <span className="text-[#00ff88]/80 text-[9px] hidden sm:inline">
                (~{remainingMinutes}m rest.)
              </span>
            )}
          </div>
        </div>

        {/* Animated Progress Track */}
        <div className="relative h-2 w-full bg-[#141618] border border-white/15 overflow-hidden">
          {/* Half-Time (45') Marker */}
          <div
            className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30 z-10"
            title="Intervalo (45')"
          />

          {/* Animated Progress Fill */}
          <div
            className={`h-full transition-all duration-700 ease-out relative ${
              isFinished
                ? 'bg-white/40'
                : extraMinutes > 0
                ? 'bg-gradient-to-r from-emerald-500 via-[#00ff88] to-amber-400'
                : 'bg-gradient-to-r from-emerald-600 via-[#00ff88] to-[#00ff88]'
            }`}
            style={{ width: `${isFinished ? 100 : regularTimePercent}%` }}
          >
            {/* Pulsing leading edge */}
            {isLive && (
              <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/90 shadow-[0_0_8px_#00ff88] animate-pulse" />
            )}
          </div>
        </div>

        {/* Subtle sub-labels */}
        <div className="flex items-center justify-between text-[9px] text-[#ececed]/40 font-mono">
          <span>0'</span>
          <span className="opacity-80">45' (HT)</span>
          <span>90'{extraMinutes > 0 ? ` +${extraMinutes}'` : ''}</span>
        </div>
      </div>
    );
  }

  // DETAILED VARIANT (Hero display in MatchDetailModal)
  return (
    <div className={`bg-[#0b0c0d] border border-white/10 p-3.5 sm:p-4 font-mono text-xs space-y-2.5 ${className}`}>
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#141618] border border-white/10 flex items-center justify-center shrink-0">
            <Timer className="w-3.5 h-3.5 text-[#00ff88]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="label text-[#00ff88] font-bold uppercase tracking-wider text-[11px]">
                TEMPO DE JOGO RELATIVO (90 MINUTOS)
              </span>
              <span className={`px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider ${phaseBg} ${phaseColor}`}>
                {phaseText}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {isLive && (
            <div className="flex items-center gap-1.5 text-[#ececed]/70 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span>Minuto Oficial:</span>
              <strong className="text-white text-sm bg-[#141618] px-2 py-0.5 border border-white/15 text-[#00ff88]">
                {clampedMinute}'
              </strong>
            </div>
          )}

          {isLive && extraMinutes === 0 && (
            <span className="text-[11px] text-[#ececed]/50 hidden sm:inline">
              Faltam aprox. <strong className="text-white">{remainingMinutes} minutos</strong> de tempo regulamentar
            </span>
          )}

          {isLive && extraMinutes > 0 && (
            <span className="text-[11px] text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 border border-amber-500/30">
              +{extraMinutes}' de Acréscimos em andamento
            </span>
          )}

          {isFinished && (
            <span className="text-[11px] text-[#ececed]/60">
              90 minutos de tempo regulamentar completados
            </span>
          )}

          {isScheduled && (
            <span className="text-[11px] text-[#ececed]/60">
              Partida não iniciada • 90 minutos previstos
            </span>
          )}
        </div>
      </div>

      {/* Main Visual Progress Bar Track with Segment Ticks */}
      <div className="space-y-1 pt-1">
        <div className="relative h-4 sm:h-5 w-full bg-[#141618] border border-white/20 overflow-hidden shadow-inner">
          {/* Segment Tick Marks (15', 30', 45', 60', 75') */}
          {[15, 30, 45, 60, 75].map((tickMinute) => {
            const leftPct = (tickMinute / 90) * 100;
            const isHalf = tickMinute === 45;
            return (
              <div
                key={tickMinute}
                className={`absolute top-0 bottom-0 pointer-events-none z-10 flex flex-col items-center justify-between ${
                  isHalf ? 'w-0.5 bg-white/40' : 'w-px bg-white/15'
                }`}
                style={{ left: `${leftPct}%` }}
              >
                <span className="w-full h-1 bg-white/40" />
                <span className="w-full h-1 bg-white/40" />
              </div>
            );
          })}

          {/* Animated Progress Fill */}
          <div
            className={`h-full transition-all duration-700 ease-out relative ${
              isFinished
                ? 'bg-gradient-to-r from-zinc-600 to-zinc-400'
                : extraMinutes > 0
                ? 'bg-gradient-to-r from-emerald-600 via-[#00ff88] to-amber-400'
                : 'bg-gradient-to-r from-emerald-600 via-[#00ff88] to-[#00ff88]'
            }`}
            style={{ width: `${isFinished ? 100 : regularTimePercent}%` }}
          >
            {/* Glowing Leading Pip */}
            {isLive && (
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
                <span className="w-3 h-full bg-white/70 shadow-[0_0_12px_#00ff88] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-white absolute shadow-[0_0_8px_#ffffff]" />
              </div>
            )}
          </div>
        </div>

        {/* Detailed Timeline Labels */}
        <div className="relative flex items-center justify-between text-[10px] text-[#ececed]/60 font-mono pt-1">
          <span className="text-left">
            <strong className="text-white">0'</strong>
            <span className="hidden sm:inline opacity-60"> Início</span>
          </span>

          <span className="absolute left-[16.6%] -translate-x-1/2 hidden md:inline opacity-40">
            15'
          </span>

          <span className="absolute left-[33.3%] -translate-x-1/2 hidden md:inline opacity-40">
            30'
          </span>

          <span
            className="absolute left-1/2 -translate-x-1/2 text-center flex items-center gap-1 font-bold text-[#ececed]"
            title="Intervalo (45 minutos)"
          >
            <span className="w-1.5 h-1.5 bg-white/60 inline-block" />
            <span>45' Intervalo</span>
          </span>

          <span className="absolute left-[66.6%] -translate-x-1/2 hidden md:inline opacity-40">
            60'
          </span>

          <span className="absolute left-[83.3%] -translate-x-1/2 hidden md:inline opacity-40">
            75'
          </span>

          <span className="text-right">
            <strong className="text-white">90'</strong>
            <span className="hidden sm:inline opacity-60"> Fim do Tempo Regulamentar</span>
            {extraMinutes > 0 && (
              <span className="text-amber-400 font-bold ml-1">+{extraMinutes}'</span>
            )}
          </span>
        </div>
      </div>

      {/* Match Status Summary Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-[#ececed]/70">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#00ff88]" />
          <span>
            {isLive ? (
              <>
                Partida em andamento: <strong className="text-white">{regularTimePercent.toFixed(0)}%</strong> do tempo regulamentar decorrido.
              </>
            ) : isFinished ? (
              <>Partida finalizada: 100% dos 90 minutos concluídos.</>
            ) : (
              <>Partida agendada para o horário oficial.</>
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ececed]/50">
          <Flag className="w-3 h-3 text-[#00ff88]" />
          <span>Tempo total: 2 tempos de 45 min + acréscimos da arbitragem</span>
        </div>
      </div>
    </div>
  );
};
