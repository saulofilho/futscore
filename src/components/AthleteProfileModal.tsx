import React from 'react';
import { AthleteProfile } from '../types';
import { X, Trophy, Shield, Activity, Star, Calendar, MapPin, DollarSign, Award, Target, Footprints } from 'lucide-react';

interface AthleteProfileModalProps {
  athlete: AthleteProfile | null;
  onClose: () => void;
  onOpenTeamHistory?: (teamId: string) => void;
}

export const AthleteProfileModal: React.FC<AthleteProfileModalProps> = ({
  athlete,
  onClose,
  onOpenTeamHistory,
}) => {
  if (!athlete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141618] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#ececed]">
        {/* Header Banner */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-[#0b0c0d] via-[#1a1e22] to-[#0b0c0d] border-b border-white/10">
          <button
            onClick={onClose}
            id="btn-close-athlete-modal"
            className="absolute top-4 right-4 p-2 bg-[#0b0c0d] border border-white/20 text-[#ececed]/70 hover:text-white transition cursor-pointer z-10"
            title="Fechar perfil"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            {/* Player Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#0b0c0d] border-2 border-[#00ff88]/50 flex items-center justify-center text-4xl shrink-0 shadow-lg overflow-hidden">
              {athlete.photoUrl ? (
                <img
                  src={athlete.photoUrl}
                  alt={athlete.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{athlete.photoEmoji || '⚽'}</span>
              )}
              <span className="absolute bottom-0 right-0 bg-[#00ff88] text-[#0b0c0d] font-mono font-black text-xs px-1.5 py-0.5">
                #{athlete.number}
              </span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#00ff88] text-[#0b0c0d] uppercase">
                  {athlete.position}
                </span>
                <span className="label opacity-75 flex items-center gap-1 border border-white/10 px-2 py-0.5 bg-black/40 text-[10px]">
                  <span>{athlete.flagEmoji}</span>
                  <span>{athlete.nationality}</span>
                </span>
                <span className="label text-[#00ff88] border border-[#00ff88]/30 px-2 py-0.5 bg-[#00ff88]/10 text-[10px] font-bold">
                  ★ NOTA {athlete.seasonStats.rating.toFixed(2)}
                </span>
              </div>

              <h2 className="font-['Syne'] font-extrabold text-xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                {athlete.name}
              </h2>
              {athlete.nickname && (
                <p className="text-xs text-[#00ff88] font-mono mt-0.5">
                  "{athlete.nickname}" • <span className="text-[#ececed]/60">{athlete.fullName}</span>
                </p>
              )}

              {/* Team Pill */}
              <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#ececed]/80 bg-[#0b0c0d] px-2.5 py-1 border border-white/10">
                  <span>{athlete.teamBadgeEmoji}</span>
                  <span className="font-bold text-white">{athlete.teamName}</span>
                </div>
                {onOpenTeamHistory && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTeamHistory(athlete.teamId);
                    }}
                    className="text-[10px] font-mono text-[#00ff88] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>[Ver Clube]</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center">
            <div className="bg-[#0b0c0d] p-2.5 sm:p-3 border border-white/10">
              <span className="label opacity-60 text-[9px] uppercase">Idade / Nasc.</span>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">
                {athlete.age} anos
              </p>
              <p className="text-[9px] text-[#ececed]/50 truncate mt-0.5">{athlete.birthDate}</p>
            </div>

            <div className="bg-[#0b0c0d] p-2.5 sm:p-3 border border-white/10">
              <span className="label opacity-60 text-[9px] uppercase">Altura &amp; Pé</span>
              <p className="text-xs sm:text-sm font-bold text-white mt-1">
                {athlete.height}
              </p>
              <p className="text-[9px] text-[#ececed]/50 mt-0.5">{athlete.preferredFoot}</p>
            </div>

            <div className="bg-[#0b0c0d] p-2.5 sm:p-3 border border-white/10">
              <span className="label opacity-60 text-[9px] uppercase">Valor de Mercado</span>
              <p className="text-xs sm:text-sm font-bold text-[#00ff88] mt-1">
                {athlete.marketValue}
              </p>
              <p className="text-[9px] text-[#ececed]/50 truncate mt-0.5">{athlete.marketValueBrl}</p>
            </div>

            <div className="bg-[#0b0c0d] p-2.5 sm:p-3 border border-white/10">
              <span className="label opacity-60 text-[9px] uppercase">Contrato Até</span>
              <p className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
                {athlete.contractUntil}
              </p>
              <p className="text-[9px] text-[#ececed]/50 truncate mt-0.5">{athlete.birthPlace}</p>
            </div>
          </div>

          {/* Season Stats Spotlight */}
          <div className="bg-[#0b0c0d] p-4 border border-white/10">
            <h4 className="label text-[#00ff88] font-bold uppercase mb-3 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>ESTATÍSTICAS NA TEMPORADA OFICIAL</span>
            </h4>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center font-mono">
              <div className="bg-[#141618] p-2.5 border border-white/5">
                <p className="text-lg sm:text-xl font-black text-white">{athlete.seasonStats.matches}</p>
                <p className="label opacity-60 text-[9px]">JOGOS</p>
              </div>

              <div className="bg-[#141618] p-2.5 border border-white/5">
                <p className="text-lg sm:text-xl font-black text-[#00ff88]">
                  {athlete.position === 'Goleiro' ? athlete.seasonStats.cleanSheets ?? 0 : athlete.seasonStats.goals}
                </p>
                <p className="label opacity-60 text-[9px]">
                  {athlete.position === 'Goleiro' ? 'JOGOS SEM SOFRER GOL' : 'GOLS'}
                </p>
              </div>

              <div className="bg-[#141618] p-2.5 border border-white/5">
                <p className="text-lg sm:text-xl font-black text-white">
                  {athlete.position === 'Goleiro' ? athlete.seasonStats.saves ?? 0 : athlete.seasonStats.assists}
                </p>
                <p className="label opacity-60 text-[9px]">
                  {athlete.position === 'Goleiro' ? 'DEFESAS' : 'ASSISTÊNCIAS'}
                </p>
              </div>

              <div className="bg-[#141618] p-2.5 border border-white/5">
                <p className="text-lg sm:text-xl font-black text-white">{athlete.seasonStats.rating.toFixed(2)}</p>
                <p className="label opacity-60 text-[9px]">NOTA MÉDIA</p>
              </div>

              <div className="bg-[#141618] p-2.5 border border-white/5">
                <p className="text-lg sm:text-xl font-black text-white">{athlete.seasonStats.minutesPlayed}'</p>
                <p className="label opacity-60 text-[9px]">MINUTOS</p>
              </div>

              <div className="bg-[#141618] p-2.5 border border-white/5">
                <p className="text-lg sm:text-xl font-black text-amber-400">
                  {athlete.seasonStats.yellowCards}
                  <span className="text-xs text-red-500 font-bold ml-1">/{athlete.seasonStats.redCards}</span>
                </p>
                <p className="label opacity-60 text-[9px]">AMARELOS/VERM</p>
              </div>
            </div>

            {/* Extra Metrics if available */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/5 text-xs font-mono">
              {athlete.seasonStats.xG !== undefined && (
                <div className="flex justify-between items-center bg-[#141618] px-3 py-1.5">
                  <span className="opacity-60 text-[10px]">Gols Esp. (xG):</span>
                  <span className="font-bold text-[#00ff88]">{athlete.seasonStats.xG}</span>
                </div>
              )}
              {athlete.seasonStats.shotAccuracy !== undefined && (
                <div className="flex justify-between items-center bg-[#141618] px-3 py-1.5">
                  <span className="opacity-60 text-[10px]">Pontaria no Chute:</span>
                  <span className="font-bold text-white">{athlete.seasonStats.shotAccuracy}%</span>
                </div>
              )}
              {athlete.seasonStats.passAccuracy !== undefined && (
                <div className="flex justify-between items-center bg-[#141618] px-3 py-1.5">
                  <span className="opacity-60 text-[10px]">Precisão Passe:</span>
                  <span className="font-bold text-white">{athlete.seasonStats.passAccuracy}%</span>
                </div>
              )}
              {athlete.seasonStats.keyPassesPerGame !== undefined && (
                <div className="flex justify-between items-center bg-[#141618] px-3 py-1.5">
                  <span className="opacity-60 text-[10px]">Passes Chave/J:</span>
                  <span className="font-bold text-white">{athlete.seasonStats.keyPassesPerGame}</span>
                </div>
              )}
            </div>
          </div>

          {/* Strengths & Playstyle */}
          <div className="space-y-3">
            <h4 className="label opacity-80 uppercase flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>CARACTERÍSTICAS TÉCNICAS &amp; PONTOS FORTES</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {athlete.strengths.map((strength, i) => (
                <span
                  key={i}
                  className="bg-[#0b0c0d] border border-[#00ff88]/30 text-white text-xs px-3 py-1 font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full"></span>
                  {strength}
                </span>
              ))}
            </div>

            <div className="bg-[#0b0c0d] p-3.5 border border-white/10 text-xs sm:text-sm text-[#ececed]/80 leading-relaxed font-sans">
              <span className="font-bold text-[#00ff88] font-mono mr-1">[ESTILO DE JOGO]:</span>
              {athlete.playStyle}
            </div>
          </div>

          {/* Career Club History */}
          <div className="space-y-3">
            <h4 className="label opacity-80 uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>TRAJETÓRIA &amp; HISTÓRICO DE CLUBES</span>
            </h4>

            <div className="space-y-2">
              {athlete.careerHistory.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0c0d] p-3 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#00ff88] font-bold">▸</span>
                    <span className="font-bold text-white text-sm">{step.club}</span>
                    <span className="opacity-60 text-[11px]">({step.years})</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-[#ececed]/80">
                      <strong>{step.matches}</strong> jogos
                    </span>
                    <span className="text-[#00ff88] font-bold">
                      <strong>{step.goals}</strong> gols
                    </span>
                    {step.titles && (
                      <span className="text-amber-400 truncate max-w-[200px]" title={step.titles}>
                        🏆 {step.titles}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trophies */}
          {athlete.trophies.length > 0 && (
            <div className="space-y-3">
              <h4 className="label opacity-80 uppercase flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>PRINCIPAIS TÍTULOS CONQUISTADOS</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {athlete.trophies.map((trophy, i) => (
                  <div
                    key={i}
                    className="bg-[#0b0c0d] p-2.5 border border-white/10 flex items-center gap-2 text-xs font-mono text-[#ececed]"
                  >
                    <span className="text-amber-400 text-sm">🏆</span>
                    <span>{trophy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Biography */}
          <div className="bg-[#0b0c0d] p-4 border border-white/10 space-y-1.5">
            <h4 className="label text-[#00ff88] font-bold uppercase text-[10px]">
              BIOGRAFIA &amp; PERFIL PROFISSIONAL
            </h4>
            <p className="text-xs sm:text-sm text-[#ececed]/80 leading-relaxed font-sans">
              {athlete.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
