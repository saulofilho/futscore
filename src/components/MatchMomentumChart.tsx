import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { Match, MatchEvent } from '../types';
import { Activity, TrendingUp, Zap, Target, Flame, Shield, ArrowUpRight, Clock } from 'lucide-react';

interface MatchMomentumChartProps {
  match: Match;
  compact?: boolean;
}

interface MomentumDataPoint {
  minute: number;
  label: string;
  homePressure: number;
  awayPressure: number;
  netMomentum: number; // positive = home pressure, negative = away pressure
  homeXgCumulative: number;
  awayXgCumulative: number;
  homeXgDelta: number;
  awayXgDelta: number;
  eventText?: string;
  eventType?: string;
  eventTeam?: 'home' | 'away';
}

export const MatchMomentumChart: React.FC<MatchMomentumChartProps> = ({ match, compact = false }) => {
  const [viewMode, setViewMode] = useState<'momentum' | 'xg' | 'dual'>('momentum');

  const homeColor = match.homeTeam.primaryColor || '#00ff88';
  const awayColor = match.awayTeam.primaryColor || '#38bdf8';

  // Compute momentum and cumulative xG throughout the 90 minutes
  const chartData = useMemo(() => {
    const totalMinutes = match.status === 'LIVE' ? Math.max(match.minute || 45, 15) : 90;
    const finalHomeXg = match.stats.xG[0] || 1.4;
    const finalAwayXg = match.stats.xG[1] || 1.1;
    const homePossession = (match.stats.possession[0] || 50) / 100;
    const awayPossession = (match.stats.possession[1] || 50) / 100;
    const homeShots = match.stats.shotsTotal[0] || 10;
    const awayShots = match.stats.shotsTotal[1] || 8;

    // Collect events mapped to minutes
    const eventsByMinute = new Map<number, MatchEvent>();
    if (match.events && match.events.length > 0) {
      match.events.forEach(ev => {
        eventsByMinute.set(ev.minute, ev);
      });
    }

    const points: MomentumDataPoint[] = [];
    let runningHomeXg = 0;
    let runningAwayXg = 0;

    // We generate points every 3 minutes up to totalMinutes
    const step = 3;
    const totalSteps = Math.ceil(totalMinutes / step);

    // Distribute remaining xG baseline over steps
    const baseHomeStepXg = (finalHomeXg * 0.4) / (totalSteps || 1);
    const baseAwayStepXg = (finalAwayXg * 0.4) / (totalSteps || 1);

    for (let m = 0; m <= totalMinutes; m += step) {
      const minVal = m === 0 ? 1 : m;

      // Check if an event happened near this minute
      let eventText: string | undefined;
      let eventType: string | undefined;
      let eventTeam: 'home' | 'away' | undefined;
      let xgBoostHome = 0;
      let xgBoostAway = 0;

      for (let checkMin = Math.max(1, m - 1); checkMin <= Math.min(totalMinutes, m + 1); checkMin++) {
        const ev = eventsByMinute.get(checkMin);
        if (ev) {
          eventType = ev.type;
          eventTeam = ev.team;
          if (ev.type === 'goal') {
            eventText = `⚽ Gol: ${ev.player}`;
            if (ev.team === 'home') xgBoostHome += 0.45;
            else xgBoostAway += 0.45;
          } else if (ev.type === 'yellow_card') {
            eventText = `🟨 Cartão: ${ev.player}`;
          } else if (ev.type === 'red_card') {
            eventText = `🟥 Expulsão: ${ev.player}`;
          } else if (ev.type === 'penalty_miss') {
            eventText = `❌ Pênalti Perdido: ${ev.player}`;
            if (ev.team === 'home') xgBoostHome += 0.76;
            else xgBoostAway += 0.76;
          }
          break;
        }
      }

      // Sine wave phase oscillation for football dynamics + possession weight
      const phaseA = Math.sin((minVal / 90) * Math.PI * 4);
      const phaseB = Math.cos((minVal / 45) * Math.PI * 3);

      // Home & away raw pressure values
      let homeP = Math.round(
        35 +
          homePossession * 35 +
          phaseA * 22 +
          (xgBoostHome > 0 ? 35 : 0) +
          (minVal <= 15 ? 8 : 0) // initial home burst
      );

      let awayP = Math.round(
        35 +
          awayPossession * 35 -
          phaseA * 22 +
          phaseB * 15 +
          (xgBoostAway > 0 ? 35 : 0)
      );

      // Clamp between 10 and 95
      homeP = Math.max(12, Math.min(95, homeP));
      awayP = Math.max(12, Math.min(95, awayP));

      // Net momentum: positive is home advantage, negative is away advantage
      const net = homeP - awayP;

      // xG progression: smooth accumulated curves
      const stepHomeXg = baseHomeStepXg + (homeP / 100) * 0.04 + xgBoostHome;
      const stepAwayXg = baseAwayStepXg + (awayP / 100) * 0.04 + xgBoostAway;

      runningHomeXg = Math.min(finalHomeXg, runningHomeXg + stepHomeXg);
      runningAwayXg = Math.min(finalAwayXg, runningAwayXg + stepAwayXg);

      // If at end of match, cap to exact stat values
      if (m >= totalMinutes) {
        runningHomeXg = finalHomeXg;
        runningAwayXg = finalAwayXg;
      }

      points.push({
        minute: minVal,
        label: `${minVal}'`,
        homePressure: homeP,
        awayPressure: awayP,
        netMomentum: net,
        homeXgCumulative: Number(runningHomeXg.toFixed(2)),
        awayXgCumulative: Number(runningAwayXg.toFixed(2)),
        homeXgDelta: Number(stepHomeXg.toFixed(2)),
        awayXgDelta: Number(stepAwayXg.toFixed(2)),
        eventText,
        eventType,
        eventTeam,
      });
    }

    return points;
  }, [match]);

  // Derived key moments (peaks and events)
  const keyEvents = useMemo(() => {
    return chartData.filter(d => Boolean(d.eventText));
  }, [chartData]);

  const homeXg = match.stats.xG[0];
  const awayXg = match.stats.xG[1];
  const xgDiff = Number((homeXg - awayXg).toFixed(2));

  // Max peak minutes
  const maxHomePressurePoint = useMemo(() => {
    return [...chartData].sort((a, b) => b.netMomentum - a.netMomentum)[0];
  }, [chartData]);

  const maxAwayPressurePoint = useMemo(() => {
    return [...chartData].sort((a, b) => a.netMomentum - b.netMomentum)[0];
  }, [chartData]);

  return (
    <div className="bg-[#0b0c0d] border border-white/10 p-3 sm:p-5 font-mono space-y-4 shadow-lg">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-none bg-[#00ff88]/15 border border-[#00ff88] text-[#00ff88] flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Syne'] font-extrabold text-sm sm:text-base uppercase tracking-tight text-white flex items-center gap-1.5">
                <span>Momentum da Partida &amp; Pressão xG</span>
              </h3>
              <span className="text-[9px] bg-[#00ff88] text-[#0b0c0d] px-1.5 py-0.2 font-black rounded-xs">
                RECHARTS
              </span>
            </div>
            <p className="text-[11px] text-[#ececed]/60 font-sans mt-0.5">
              Comparação do volume ofensivo e geração de gols esperados minuto a minuto.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#141618] p-1 border border-white/10 shrink-0 self-start sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('momentum')}
            className={`px-2.5 py-1 uppercase font-bold transition cursor-pointer text-[10px] sm:text-[11px] ${
              viewMode === 'momentum'
                ? 'bg-[#00ff88] text-[#0b0c0d]'
                : 'text-[#ececed]/70 hover:text-white'
            }`}
          >
            Oscilação de Pressão
          </button>
          <button
            onClick={() => setViewMode('xg')}
            className={`px-2.5 py-1 uppercase font-bold transition cursor-pointer text-[10px] sm:text-[11px] ${
              viewMode === 'xg'
                ? 'bg-[#00ff88] text-[#0b0c0d]'
                : 'text-[#ececed]/70 hover:text-white'
            }`}
          >
            xG Acumulado
          </button>
          <button
            onClick={() => setViewMode('dual')}
            className={`px-2.5 py-1 uppercase font-bold transition cursor-pointer text-[10px] sm:text-[11px] ${
              viewMode === 'dual'
                ? 'bg-[#00ff88] text-[#0b0c0d]'
                : 'text-[#ececed]/70 hover:text-white'
            }`}
          >
            Volume Duplo
          </button>
        </div>
      </div>

      {/* Quick Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
        <div className="bg-[#141618] border border-white/10 p-2.5">
          <div className="text-[10px] text-white/50 uppercase">xG Total Mandante</div>
          <div className="text-base sm:text-lg font-black text-[#00ff88] font-['Syne'] mt-0.5">
            {homeXg.toFixed(2)}
          </div>
          <div className="text-[10px] text-white/60 truncate">{match.homeTeam.shortName}</div>
        </div>

        <div className="bg-[#141618] border border-white/10 p-2.5">
          <div className="text-[10px] text-white/50 uppercase">xG Total Visitante</div>
          <div className="text-base sm:text-lg font-black text-[#38bdf8] font-['Syne'] mt-0.5">
            {awayXg.toFixed(2)}
          </div>
          <div className="text-[10px] text-white/60 truncate">{match.awayTeam.shortName}</div>
        </div>

        <div className="bg-[#141618] border border-white/10 p-2.5">
          <div className="text-[10px] text-white/50 uppercase">Diferença de Perigo</div>
          <div className={`text-base sm:text-lg font-black font-['Syne'] mt-0.5 ${
            xgDiff > 0 ? 'text-[#00ff88]' : xgDiff < 0 ? 'text-[#38bdf8]' : 'text-white'
          }`}>
            {xgDiff > 0 ? `+${xgDiff}` : xgDiff} xG
          </div>
          <div className="text-[10px] text-white/60">
            {xgDiff > 0 ? `Vantagem ${match.homeTeam.shortName}` : xgDiff < 0 ? `Vantagem ${match.awayTeam.shortName}` : 'Equilíbrio Total'}
          </div>
        </div>

        <div className="bg-[#141618] border border-white/10 p-2.5">
          <div className="text-[10px] text-white/50 uppercase">Pico de Pressão</div>
          <div className="text-base sm:text-lg font-black text-amber-400 font-['Syne'] mt-0.5">
            {maxHomePressurePoint ? `${maxHomePressurePoint.minute}'` : '42\''}
          </div>
          <div className="text-[10px] text-white/60">Maior pressão na partida</div>
        </div>
      </div>

      {/* Main Recharts Area Container */}
      <div className="w-full h-[240px] sm:h-[300px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'momentum' ? (
            /* Mode 1: Net Momentum Oscillation (Positive Home, Negative Away) */
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="homeMomentumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="awayMomentumGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis
                dataKey="minute"
                tickFormatter={(v) => `${v}'`}
                stroke="#ffffff40"
                tick={{ fill: '#ececed', fontSize: 10 }}
              />
              <YAxis
                domain={[-60, 60]}
                stroke="#ffffff40"
                tick={{ fill: '#ececed', fontSize: 10 }}
                tickFormatter={(v) => (v === 0 ? '0' : v > 0 ? `+${v}` : `${v}`)}
              />
              <Tooltip content={<CustomMomentumTooltip homeTeam={match.homeTeam} awayTeam={match.awayTeam} />} />

              {/* Zero-Line baseline */}
              <ReferenceLine y={0} stroke="#ffffff50" strokeWidth={1.5} />

              {/* Half-time line if >= 45 */}
              <ReferenceLine x={45} stroke="#ffffff30" strokeDasharray="4 4" label={{ value: 'HT 45\'', fill: '#ffffff60', fontSize: 10, position: 'top' }} />

              {/* Event points */}
              {keyEvents.map((ev) => (
                <ReferenceDot
                  key={`dot-${ev.minute}`}
                  x={ev.minute}
                  y={ev.netMomentum}
                  r={5}
                  fill={ev.eventType === 'goal' ? '#ffd700' : '#ff4444'}
                  stroke="#0b0c0d"
                  strokeWidth={2}
                />
              ))}

              <Area
                type="monotone"
                dataKey="netMomentum"
                stroke="#00ff88"
                strokeWidth={2}
                fill="url(#homeMomentumGrad)"
                name="Pressão Relativa"
              />
            </AreaChart>
          ) : viewMode === 'xg' ? (
            /* Mode 2: Cumulative xG Step Lines */
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis
                dataKey="minute"
                tickFormatter={(v) => `${v}'`}
                stroke="#ffffff40"
                tick={{ fill: '#ececed', fontSize: 10 }}
              />
              <YAxis
                stroke="#ffffff40"
                tick={{ fill: '#ececed', fontSize: 10 }}
                tickFormatter={(v) => `${v} xG`}
              />
              <Tooltip content={<CustomXgTooltip homeTeam={match.homeTeam} awayTeam={match.awayTeam} />} />

              <ReferenceLine x={45} stroke="#ffffff30" strokeDasharray="4 4" label={{ value: 'HT', fill: '#ffffff60', fontSize: 10 }} />

              <Line
                type="monotone"
                dataKey="homeXgCumulative"
                stroke="#00ff88"
                strokeWidth={3}
                dot={false}
                name={match.homeTeam.name}
              />
              <Line
                type="monotone"
                dataKey="awayXgCumulative"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={false}
                name={match.awayTeam.name}
              />
            </LineChart>
          ) : (
            /* Mode 3: Dual Area Comparative Pressure */
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="dualHomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="dualAwayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis
                dataKey="minute"
                tickFormatter={(v) => `${v}'`}
                stroke="#ffffff40"
                tick={{ fill: '#ececed', fontSize: 10 }}
              />
              <YAxis stroke="#ffffff40" tick={{ fill: '#ececed', fontSize: 10 }} />
              <Tooltip content={<CustomDualTooltip homeTeam={match.homeTeam} awayTeam={match.awayTeam} />} />

              <Area
                type="monotone"
                dataKey="homePressure"
                stroke="#00ff88"
                strokeWidth={2}
                fill="url(#dualHomeGrad)"
                name={match.homeTeam.name}
              />
              <Area
                type="monotone"
                dataKey="awayPressure"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="url(#dualAwayGrad)"
                name={match.awayTeam.name}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend & Guide */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] pt-2 border-t border-white/10 text-white/70">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#00ff88] inline-block"></span>
            <span className="text-white font-bold">{match.homeTeam.name}</span>
            <span className="text-white/50">({homeXg.toFixed(2)} xG)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#38bdf8] inline-block"></span>
            <span className="text-white font-bold">{match.awayTeam.name}</span>
            <span className="text-white/50">({awayXg.toFixed(2)} xG)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-white/50">
          <span>🟡 Gols e Pênaltis</span>
          <span>•</span>
          <span>Linha central = Equilíbrio</span>
        </div>
      </div>

      {/* Events Marker Timeline List */}
      {keyEvents.length > 0 && (
        <div className="bg-[#141618] border border-white/10 p-3 space-y-1.5">
          <div className="text-[10px] uppercase text-white/50 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#00ff88]" />
            <span>Lances de Maior Impacto no Momentum:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {keyEvents.map((ev) => (
              <span
                key={`ev-${ev.minute}`}
                className={`text-[10px] px-2 py-0.5 border font-bold flex items-center gap-1 ${
                  ev.eventType === 'goal'
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                    : ev.eventType === 'red_card'
                    ? 'bg-red-950/40 text-red-400 border-red-500/50'
                    : 'bg-white/5 text-white/80 border-white/15'
                }`}
              >
                <span>{ev.minute}'</span>
                <span>{ev.eventText}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Tooltip for Mode 1: Net Momentum
function CustomMomentumTooltip({ active, payload, label, homeTeam, awayTeam }: any) {
  if (!active || !payload || !payload.length) return null;
  const data: MomentumDataPoint = payload[0].payload;
  const isHomeDominant = data.netMomentum >= 0;

  return (
    <div className="bg-[#0b0c0d]/95 backdrop-blur-md border border-white/20 p-3 shadow-2xl font-mono text-xs max-w-[240px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <span className="font-bold text-[#00ff88] text-sm">{data.minute}' Minuto</span>
        <span className="text-[10px] text-white/50 uppercase">Momentum</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Dominância:</span>
          <span className={`font-bold uppercase ${isHomeDominant ? 'text-[#00ff88]' : 'text-[#38bdf8]'}`}>
            {isHomeDominant ? homeTeam.shortName : awayTeam.shortName} ({Math.abs(data.netMomentum)} pts)
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#00ff88]">Pressão {homeTeam.shortName}:</span>
          <span className="font-bold text-white">{data.homePressure}%</span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#38bdf8]">Pressão {awayTeam.shortName}:</span>
          <span className="font-bold text-white">{data.awayPressure}%</span>
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
          <span className="text-white/50">xG Acumulado:</span>
          <span className="font-bold text-white">
            {data.homeXgCumulative} x {data.awayXgCumulative}
          </span>
        </div>

        {data.eventText && (
          <div className="mt-2 pt-1.5 border-t border-amber-400/40 text-amber-300 text-[11px] font-bold">
            {data.eventText}
          </div>
        )}
      </div>
    </div>
  );
}

// Custom Tooltip for Mode 2: xG Progression
function CustomXgTooltip({ active, payload, homeTeam, awayTeam }: any) {
  if (!active || !payload || !payload.length) return null;
  const data: MomentumDataPoint = payload[0].payload;

  return (
    <div className="bg-[#0b0c0d]/95 backdrop-blur-md border border-white/20 p-3 shadow-2xl font-mono text-xs max-w-[240px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <span className="font-bold text-[#00ff88] text-sm">{data.minute}' Minuto</span>
        <span className="text-[10px] text-white/50 uppercase">xG Acumulado</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[#00ff88]">{homeTeam.name}:</span>
          <span className="font-bold text-white">{data.homeXgCumulative.toFixed(2)} xG</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#38bdf8]">{awayTeam.name}:</span>
          <span className="font-bold text-white">{data.awayXgCumulative.toFixed(2)} xG</span>
        </div>

        {data.eventText && (
          <div className="mt-1 pt-1.5 border-t border-amber-400/40 text-amber-300 text-[11px] font-bold">
            {data.eventText}
          </div>
        )}
      </div>
    </div>
  );
}

// Custom Tooltip for Mode 3: Dual Area
function CustomDualTooltip({ active, payload, homeTeam, awayTeam }: any) {
  if (!active || !payload || !payload.length) return null;
  const data: MomentumDataPoint = payload[0].payload;

  return (
    <div className="bg-[#0b0c0d]/95 backdrop-blur-md border border-white/20 p-3 shadow-2xl font-mono text-xs max-w-[240px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <span className="font-bold text-[#00ff88] text-sm">{data.minute}' Minuto</span>
        <span className="text-[10px] text-white/50 uppercase">Pressão em Campo</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[#00ff88]">{homeTeam.shortName}:</span>
          <span className="font-bold text-white">{data.homePressure}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#38bdf8]">{awayTeam.shortName}:</span>
          <span className="font-bold text-white">{data.awayPressure}%</span>
        </div>

        {data.eventText && (
          <div className="mt-1 pt-1.5 border-t border-amber-400/40 text-amber-300 text-[11px] font-bold">
            {data.eventText}
          </div>
        )}
      </div>
    </div>
  );
}
