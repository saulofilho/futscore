import React, { useState } from 'react';
import { Match } from '../types';
import { getMatchBroadcastersDetailed, BroadcasterPlatform } from '../utils/broadcastersData';
import {
  Tv, Radio, Smartphone, Monitor, Cast, ExternalLink, ShieldCheck,
  Sparkles, Clock, Volume2, PlayCircle, CheckCircle2, Wifi, Film, ChevronRight, Info
} from 'lucide-react';

interface WhereToWatchSectionProps {
  match: Match;
  variant?: 'full' | 'compact';
}

export const WhereToWatchSection: React.FC<WhereToWatchSectionProps> = ({ match, variant = 'full' }) => {
  const [filterType, setFilterType] = useState<'all' | 'free' | 'subscription' | 'streaming'>('all');
  const broadcasters = getMatchBroadcastersDetailed(match);

  const filteredBroadcasters = broadcasters.filter(b => {
    if (filterType === 'all') return true;
    if (filterType === 'free') return b.category === 'free';
    if (filterType === 'subscription') return b.category === 'subscription' || b.category === 'pay-per-view';
    if (filterType === 'streaming') return b.type === 'Streaming' || b.type === 'YouTube / Web';
    return true;
  });

  const getPlatformBrandBadge = (platform: BroadcasterPlatform) => {
    switch (platform.iconType) {
      case 'globo':
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-white to-red-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0b0c0d] rounded-full flex items-center justify-center font-black text-white text-[10px]">
              GLOBO
            </div>
          </div>
        );
      case 'sportv':
        return (
          <div className="w-8 h-8 rounded bg-blue-600 font-black text-white text-[9px] flex items-center justify-center tracking-tighter shrink-0 border border-blue-400/50 shadow">
            STV
          </div>
        );
      case 'premiere':
        return (
          <div className="w-8 h-8 rounded bg-[#00ff88] font-black text-[#0b0c0d] text-[9px] flex items-center justify-center tracking-tighter shrink-0 border border-[#00ff88] shadow">
            PFC
          </div>
        );
      case 'cazetv':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-400 font-black text-black text-[9px] flex items-center justify-center tracking-tighter shrink-0 border border-yellow-300 shadow">
            CAZÉ
          </div>
        );
      case 'espn':
        return (
          <div className="w-8 h-8 rounded bg-red-600 font-black text-white text-[9px] flex items-center justify-center italic tracking-wider shrink-0 border border-red-400 shadow">
            ESPN
          </div>
        );
      case 'disney':
        return (
          <div className="w-8 h-8 rounded bg-[#113ccf] font-black text-white text-[8px] flex items-center justify-center shrink-0 border border-blue-400/40 shadow">
            D+
          </div>
        );
      case 'max':
        return (
          <div className="w-8 h-8 rounded bg-purple-700 font-black text-white text-[9px] flex items-center justify-center shrink-0 border border-purple-400 shadow">
            MAX
          </div>
        );
      case 'tnt':
        return (
          <div className="w-8 h-8 rounded bg-orange-600 font-black text-white text-[9px] flex items-center justify-center shrink-0 border border-orange-400 shadow">
            TNT
          </div>
        );
      case 'paramount':
        return (
          <div className="w-8 h-8 rounded bg-blue-700 font-black text-white text-[8px] flex items-center justify-center shrink-0 border border-blue-400 shadow">
            P+
          </div>
        );
      case 'sbt':
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 p-0.5 shrink-0 shadow">
            <div className="w-full h-full bg-[#0b0c0d] rounded-full flex items-center justify-center text-[9px] font-bold text-white">
              SBT
            </div>
          </div>
        );
      case 'record':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 font-bold text-white text-[8px] flex items-center justify-center shrink-0 border border-blue-300 shadow">
            REC
          </div>
        );
      case 'goat':
        return (
          <div className="w-8 h-8 rounded bg-emerald-600 font-black text-white text-[8px] flex items-center justify-center shrink-0 border border-emerald-400 shadow">
            GOAT
          </div>
        );
      case 'prime':
        return (
          <div className="w-8 h-8 rounded bg-cyan-700 font-black text-white text-[8px] flex items-center justify-center shrink-0 border border-cyan-400 shadow">
            PRIME
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded bg-[#141618] border border-white/20 text-base flex items-center justify-center shrink-0">
            {platform.logoIcon}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header Banner: League official broadcasting guide */}
      <div className="bg-[#0b0c0d] p-4 sm:p-5 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Tv className="w-5 h-5 text-[#00ff88]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-['Syne'] font-extrabold text-sm sm:text-base text-white uppercase tracking-tight">
                  Guia Oficial: Onde Assistir ao Vivo
                </h4>
                <span className="status-pill text-[9px] hidden sm:inline">
                  AO VIVO
                </span>
              </div>
              <p className="text-[11px] text-[#ececed]/70 font-sans">
                Emissoras de TV aberta, canais fechados e plataformas de streaming com direitos para <strong>{match.league}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 bg-[#141618] px-3 py-1.5 border border-white/10 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-white font-bold">{match.date} • {match.time}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="label opacity-60 text-[10px] uppercase mr-1">Filtrar:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                filterType === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#141618] text-[#ececed]/70 border-white/10 hover:text-white'
              }`}
            >
              Todos ({broadcasters.length})
            </button>
            <button
              onClick={() => setFilterType('free')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                filterType === 'free'
                  ? 'bg-[#00ff88] text-[#0b0c0d] border-[#00ff88]'
                  : 'bg-[#141618] text-[#00ff88]/80 border-[#00ff88]/30 hover:text-[#00ff88]'
              }`}
            >
              📺 Sinal Grátis / Aberto
            </button>
            <button
              onClick={() => setFilterType('subscription')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                filterType === 'subscription'
                  ? 'bg-blue-600 text-white border-blue-400'
                  : 'bg-[#141618] text-blue-400/80 border-blue-900/40 hover:text-blue-300'
              }`}
            >
              📡 TV Fechada / PPV
            </button>
            <button
              onClick={() => setFilterType('streaming')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer border ${
                filterType === 'streaming'
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-[#141618] text-purple-400/80 border-purple-900/40 hover:text-purple-300'
              }`}
            >
              ✨ Streaming &amp; Apps
            </button>
          </div>

          <span className="text-[10px] text-[#ececed]/50 hidden md:inline">
            Horário de Brasília (BRT)
          </span>
        </div>
      </div>

      {/* Grid of Broadcaster Cards with Platform Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBroadcasters.map((platform) => (
          <div
            key={platform.id}
            className={`bg-[#0b0c0d] border ${platform.borderColor} p-4 sm:p-5 flex flex-col justify-between space-y-3.5 hover:border-white/30 transition shadow-lg relative overflow-hidden`}
          >
            {/* Top brand color accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: platform.brandColor }}
            />

            <div>
              {/* Card Top: Logo icon, Platform Name, Category Badge */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  {getPlatformBrandBadge(platform)}
                  <div>
                    <h5 className="font-['Syne'] font-bold text-white text-sm sm:text-base tracking-tight leading-tight">
                      {platform.name}
                    </h5>
                    <span className="text-[10px] text-[#ececed]/60 font-mono">
                      {platform.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`text-[9px] px-2 py-0.5 uppercase font-bold border ${
                      platform.category === 'free'
                        ? 'bg-emerald-950/80 text-[#00ff88] border-emerald-500/50'
                        : platform.category === 'pay-per-view'
                        ? 'bg-amber-950/80 text-amber-400 border-amber-500/50'
                        : 'bg-blue-950/80 text-blue-400 border-blue-500/50'
                    }`}
                  >
                    {platform.category === 'free' ? 'GRÁTIS / ABERTO' : platform.category === 'pay-per-view' ? 'PAY-PER-VIEW' : 'ASSINATURA'}
                  </span>
                  <span className="text-[9px] text-[#00ff88] font-mono">
                    {platform.resolution}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-[#ececed]/70 leading-relaxed font-sans mb-3">
                {platform.description}
              </p>

              {/* Audio & Narration Crew */}
              {(platform.narrator || platform.commentator) && (
                <div className="bg-[#141618] p-2.5 border border-white/5 space-y-1 text-[11px] mb-3">
                  <div className="flex items-center gap-1.5 text-white/90">
                    <Volume2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
                    <span>
                      Narração: <strong className="text-white">{platform.narrator}</strong>
                    </span>
                  </div>
                  {platform.commentator && (
                    <div className="text-[10px] text-[#ececed]/60 pl-5">
                      Comentários: {platform.commentator}
                    </div>
                  )}
                </div>
              )}

              {/* Compatible Devices */}
              <div className="space-y-1 mb-2">
                <span className="label opacity-50 text-[9px] uppercase">Dispositivos Compatíveis:</span>
                <div className="flex flex-wrap gap-1">
                  {platform.deviceList.map((dev, i) => (
                    <span
                      key={i}
                      className="bg-[#141618] px-2 py-0.5 border border-white/10 text-[10px] text-[#ececed]/80"
                    >
                      {dev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Tune-in Link & Status */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#ececed]/50 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>{platform.officialRightsTag}</span>
              </span>

              {platform.platformUrl && (
                <a
                  href={platform.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141618] hover:bg-white hover:text-black border border-white/20 text-white font-bold text-[10px] uppercase transition cursor-pointer"
                >
                  <span>Acessar Plataforma</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Broadcasting Tips & Quality Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="bg-[#0b0c0d] p-3.5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-[#00ff88]">
            <Wifi className="w-4 h-4" />
            <h6 className="font-bold uppercase text-[11px]">Sinal &amp; Conexão</h6>
          </div>
          <p className="text-[11px] text-[#ececed]/60 font-sans leading-relaxed">
            Recomenda-se conexão de banda larga de no mínimo 25 Mbps para transmissões 4K e 10 Mbps para 1080p 60fps sem oscilações.
          </p>
        </div>

        <div className="bg-[#0b0c0d] p-3.5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400">
            <Clock className="w-4 h-4" />
            <h6 className="font-bold uppercase text-[11px]">Pré-Jogo Oficial</h6>
          </div>
          <p className="text-[11px] text-[#ececed]/60 font-sans leading-relaxed">
            A maioria dos canais abre a transmissão de 45 a 90 minutos antes do início para apresentar os vestiários e aquecimento.
          </p>
        </div>

        <div className="bg-[#0b0c0d] p-3.5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-sky-400">
            <Cast className="w-4 h-4" />
            <h6 className="font-bold uppercase text-[11px]">Transmissão sem Fio</h6>
          </div>
          <p className="text-[11px] text-[#ececed]/60 font-sans leading-relaxed">
            Suporte nativo para espelhamento via Google Cast, Apple AirPlay 2 e Smart View em todas as plataformas listadas.
          </p>
        </div>
      </div>
    </div>
  );
};
