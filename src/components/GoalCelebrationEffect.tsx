import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoalCelebrationData } from '../types';
import { X, Sparkles, Trophy, Radio, ArrowRight } from 'lucide-react';

interface GoalCelebrationEffectProps {
  celebration: GoalCelebrationData | null;
  onDismiss: () => void;
  onViewMatch?: (matchId: string) => void;
  duration?: number; // ms, default 5500
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle' | 'star' | 'ribbon';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

export const GoalCelebrationEffect: React.FC<GoalCelebrationEffectProps> = ({
  celebration,
  onDismiss,
  onViewMatch,
  duration = 5200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(100);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Confetti canvas animation
  useEffect(() => {
    if (!celebration) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = [
      '#00ff88', // FutScore neon green
      '#ffd700', // Gold
      '#ffffff', // Pure white
      '#38bdf8', // Cyan
      '#f43f5e', // Rose/red
      '#a855f7', // Electric purple
      '#fbbf24', // Amber
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(180, Math.floor(width / 7));

    // Spawn burst across top and upper screen
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.random() * Math.PI) - Math.PI / 2; // outward burst
      const speed = Math.random() * 8 + 4;
      const shapes: Particle['shape'][] = ['rect', 'circle', 'star', 'ribbon'];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.25) - 30, // start from near top
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        opacity: 1,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.08 + 0.04,
      });
    }

    const drawStar = (c: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.fill();
    };

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // physics
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 1.5;
        p.y += p.vy;
        p.vy += 0.04; // gentle gravity
        p.rotation += p.rotationSpeed;

        // fade out toward end of celebration
        if (elapsed > duration - 1200) {
          p.opacity = Math.max(0, 1 - (elapsed - (duration - 1200)) / 1200);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 4, p.size, p.size / 2.5);
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.size / 2, -p.size * 1.5, p.size * 0.6, p.size * 2);
        } else {
          // rect
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.2);
        }

        ctx.restore();
      });

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [celebration, duration]);

  // Timer countdown progress bar and auto-dismiss
  useEffect(() => {
    if (!celebration) {
      setProgress(100);
      setIsFadingOut(false);
      return;
    }

    setProgress(100);
    setIsFadingOut(false);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPct);

      if (elapsed >= duration - 400 && !isFadingOut) {
        setIsFadingOut(true);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        onDismiss();
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [celebration, duration, onDismiss, isFadingOut]);

  if (!celebration) return null;

  return (
    <>
      {/* Canvas Confetti Explosion (covers full screen) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9990]"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Full-Screen Ambient Glow Flash Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[9980] transition-opacity duration-700 animate-pulse"
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(0, 255, 136, 0.18) 0%, rgba(255, 215, 0, 0.08) 35%, transparent 70%)',
          boxShadow: 'inset 0 0 100px rgba(0, 255, 136, 0.25)',
        }}
      />

      {/* TOP OF THE SCREEN CELEBRATION BANNER ("topo da tela") */}
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-auto transition-all duration-300 ${
          isFadingOut ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="relative bg-[#0b0c0d]/95 backdrop-blur-xl border-b-2 border-[#00ff88] shadow-[0_10px_35px_rgba(0,255,136,0.35),0_0_15px_rgba(255,215,0,0.2)] text-[#ececed] overflow-hidden">
          {/* Animated golden & neon flare bar running underneath */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent animate-pulse" />

          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3">
            {/* Left section: Animated ball & big GOOOL banner */}
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
              <div className="relative flex items-center justify-center shrink-0">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#141618] border-2 border-[#00ff88] flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-[#00ff88]/30 animate-bounce">
                  {celebration.scoringTeamBadge || '⚽'}
                </span>
                <span className="absolute inset-0 rounded-full border border-[#00ff88] animate-ping opacity-60 pointer-events-none" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-['Syne'] font-black text-xl sm:text-3xl uppercase tracking-tighter text-[#00ff88] drop-shadow-[0_0_12px_rgba(0,255,136,0.6)]">
                    {celebration.scoringTeamBadge === '🏀' || celebration.league?.includes('NBA') || celebration.league?.includes('NBB')
                      ? 'CESTA!'
                      : celebration.scoringTeamBadge === '🥋' || celebration.scoringTeamBadge === '🥊'
                      ? 'PONTO / GOLPE!'
                      : celebration.scoringTeamBadge === '🏐'
                      ? 'PONTO!'
                      : 'GOOOOOL!'}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-extrabold text-[#0b0c0d] bg-[#00ff88] px-2 py-0.5 rounded-none uppercase tracking-wider shadow-sm">
                    {celebration.minute}' AO VIVO
                  </span>
                  <span className="label text-amber-400 font-bold hidden md:inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SIMULAÇÃO AO VIVO</span>
                  </span>
                </div>

                {/* Team and Scorer details */}
                <div className="flex items-center gap-2 mt-0.5 text-xs sm:text-sm truncate">
                  <span className="font-bold text-white uppercase truncate flex items-center gap-1.5">
                    {celebration.scoringTeamBadge && <span>{celebration.scoringTeamBadge}</span>}
                    <span className="text-white font-extrabold">{celebration.scoringTeamName}</span>
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="text-amber-300 font-semibold truncate flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{celebration.scorerName}</span>
                  </span>
                  {celebration.assistName && (
                    <span className="text-[#ececed]/60 text-xs hidden lg:inline truncate">
                      (Assist: {celebration.assistName})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Center / Right: Updated scoreboard pill & action buttons */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Scoreboard pill */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#141618] border border-white/20 shadow-inner font-mono text-sm sm:text-base">
                <span className={celebration.isHome ? 'text-[#00ff88] font-black' : 'text-white font-bold'}>
                  {celebration.scoringTeamShortName || celebration.scoringTeamName.slice(0, 3).toUpperCase()} {celebration.homeScore}
                </span>
                <span className="opacity-40">x</span>
                <span className={!celebration.isHome ? 'text-[#00ff88] font-black' : 'text-white font-bold'}>
                  {celebration.awayScore} {celebration.opponentTeamShortName || celebration.opponentTeamName.slice(0, 3).toUpperCase()}
                </span>
              </div>

              {/* View Match Button */}
              {onViewMatch && (
                <button
                  onClick={() => {
                    onViewMatch(celebration.matchId);
                    onDismiss();
                  }}
                  id="btn-celebration-view-match"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00ff88] text-[#0b0c0d] font-mono text-xs font-black uppercase tracking-wider hover:bg-[#00ff88]/90 transition cursor-pointer shadow-md shadow-[#00ff88]/20"
                >
                  <span>Ver Partida</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onDismiss}
                id="btn-celebration-dismiss"
                className="p-1.5 sm:p-2 bg-[#141618] hover:bg-white/10 border border-white/20 text-[#ececed] hover:text-white transition cursor-pointer"
                title="Fechar comemoração (ESC)"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Countdown Progress Bar */}
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-[#00ff88] to-cyan-400 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Modal-specific celebratory badge & particle trigger for MatchDetailModal
 */
interface ModalGoalBannerProps {
  celebration: GoalCelebrationData | null;
  currentMatchId: string;
}

export const ModalGoalBanner: React.FC<ModalGoalBannerProps> = ({ celebration, currentMatchId }) => {
  if (!celebration || celebration.matchId !== currentMatchId) return null;

  return (
    <div className="relative overflow-hidden mb-3 p-3 bg-gradient-to-r from-[#00ff88]/20 via-[#ffd700]/15 to-[#00ff88]/20 border-2 border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.4)] animate-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl animate-bounce">⚽</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Syne'] font-black text-sm sm:text-base uppercase tracking-tight text-[#00ff88]">
                GOOOOOL DO {celebration.scoringTeamName.toUpperCase()}!
              </span>
              <span className="font-mono text-[10px] font-bold bg-[#00ff88] text-[#0b0c0d] px-1.5 py-0.5">
                {celebration.minute}'
              </span>
            </div>
            <p className="text-xs text-white/90 font-mono mt-0.5">
              Autor do gol: <strong className="text-amber-300">{celebration.scorerName}</strong>
              {celebration.assistName && <span className="opacity-70"> (Passe de {celebration.assistName})</span>}
            </p>
          </div>
        </div>

        <div className="font-mono text-xs font-bold text-[#00ff88] bg-[#0b0c0d] px-2.5 py-1 border border-[#00ff88]/50 flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>PLACAR ATUALIZADO</span>
        </div>
      </div>
    </div>
  );
};
