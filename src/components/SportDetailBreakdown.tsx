import React from 'react';
import { Match, SportType } from '../types';
import { 
  Trophy, 
  Flame, 
  Activity, 
  Target, 
  Shield, 
  Zap, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Swords,
  Timer
} from 'lucide-react';

interface SportDetailBreakdownProps {
  match: Match;
}

export const SportDetailBreakdown: React.FC<SportDetailBreakdownProps> = ({ match }) => {
  const sport = match.sport || 'futebol';
  const detail = match.sportStatsDetail;

  if (!detail && !match.combatDetail && !match.aquaticDetail && !match.periodScores) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Sport Category Header Pill */}
      <div className="flex items-center justify-between bg-[#0b0c0d] border border-white/10 px-4 py-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">
            {sport === 'basquete' && '🏀'}
            {sport === 'hockey' && '🏒'}
            {sport === 'volei' && '🏐'}
            {sport === 'natacao' && '🏊'}
            {sport === 'jiujitsu' && '🥋'}
            {sport === 'judo' && '🥋'}
            {sport === 'mma' && '🥊'}
            {sport === 'tenis' && '🎾'}
            {sport === 'futebol' && '⚽'}
          </span>
          <div>
            <div className="font-mono text-xs font-bold text-[#00ff88] uppercase tracking-wider">
              {match.sportCategory || `${sport.toUpperCase()} PROFISSIONAL`}
            </div>
            <div className="text-[11px] text-[#ececed]/60">
              {match.league} • {match.round}
            </div>
          </div>
        </div>

        {match.periodScores && match.periodScores.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-[#ececed]/50 uppercase">Parciais:</span>
            {match.periodScores.map((score, idx) => (
              <span
                key={idx}
                className="font-mono text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 text-[#00ff88] font-bold"
              >
                {score}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. BASQUETE DETALHADO */}
      {/* ======================================================== */}
      {sport === 'basquete' && detail?.basketball && (
        <div className="space-y-3">
          <div className="bg-[#0b0c0d] border border-white/10 p-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-3">
              <span className="flex items-center gap-1.5 text-[#ff8c00]">
                <span>🏀</span>
                <span>PONTUAÇÃO POR QUARTO (BOX SCORE)</span>
              </span>
              <span className="text-[11px] text-[#ececed]/60">NBA / NBB Stats</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#ececed]/50 text-[10px]">
                    <th className="text-left py-1.5 px-2">TIME</th>
                    <th className="py-1.5 px-2">Q1</th>
                    <th className="py-1.5 px-2">Q2</th>
                    <th className="py-1.5 px-2">Q3</th>
                    <th className="py-1.5 px-2">Q4</th>
                    <th className="py-1.5 px-2 text-[#00ff88] font-bold">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="text-left py-2 px-2 font-bold text-white flex items-center gap-1.5">
                      <span>{match.homeTeam.badgeEmoji}</span>
                      <span>{match.homeTeam.shortName}</span>
                    </td>
                    <td className="py-2 px-2">{detail.basketball.quarters[0][0] || '-'}</td>
                    <td className="py-2 px-2">{detail.basketball.quarters[0][1] || '-'}</td>
                    <td className="py-2 px-2">{detail.basketball.quarters[0][2] || '-'}</td>
                    <td className="py-2 px-2">{detail.basketball.quarters[0][3] || '-'}</td>
                    <td className="py-2 px-2 font-bold text-[#00ff88] text-sm">{match.homeScore}</td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-2 font-bold text-white flex items-center gap-1.5">
                      <span>{match.awayTeam.badgeEmoji}</span>
                      <span>{match.awayTeam.shortName}</span>
                    </td>
                    <td className="py-2 px-2">{detail.basketball.quarters[1][0] || '-'}</td>
                    <td className="py-2 px-2">{detail.basketball.quarters[1][1] || '-'}</td>
                    <td className="py-2 px-2">{detail.basketball.quarters[1][2] || '-'}</td>
                    <td className="py-2 px-2">{detail.basketball.quarters[1][3] || '-'}</td>
                    <td className="py-2 px-2 font-bold text-[#00ff88] text-sm">{match.awayScore}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shooting & Fundamentals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Arremessos de Quadra (FG%)</span>
              <div className="flex items-center justify-between text-xs font-bold mt-1">
                <span className="text-[#ff8c00]">{detail.basketball.fieldGoalPct[0]}</span>
                <span className="text-[10px] text-[#ececed]/40">FG</span>
                <span className="text-white">{detail.basketball.fieldGoalPct[1]}</span>
              </div>
            </div>

            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Bolas de 3 Pontos (3PT%)</span>
              <div className="flex items-center justify-between text-xs font-bold mt-1">
                <span className="text-[#00ff88]">{detail.basketball.threePointPct[0]}</span>
                <span className="text-[10px] text-[#ececed]/40">3PT</span>
                <span className="text-white">{detail.basketball.threePointPct[1]}</span>
              </div>
            </div>

            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Lances Livres (FT%)</span>
              <div className="flex items-center justify-between text-xs font-bold mt-1">
                <span className="text-white">{detail.basketball.freeThrowPct[0]}</span>
                <span className="text-[10px] text-[#ececed]/40">FT</span>
                <span className="text-[#00ff88]">{detail.basketball.freeThrowPct[1]}</span>
              </div>
            </div>
          </div>

          {/* Leaders */}
          <div className="bg-[#0b0c0d] border border-white/10 p-3 font-mono text-xs space-y-1.5">
            <div className="text-[10px] text-[#00ff88] uppercase font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Destaques Individuais / Maiores Pontuadores:</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between text-[11px] gap-1 text-[#ececed]">
              <div><strong>{match.homeTeam.shortName}:</strong> {detail.basketball.topScorers.home}</div>
              <div><strong>{match.awayTeam.shortName}:</strong> {detail.basketball.topScorers.away}</div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. HÓQUEI NO GELO DETALHADO */}
      {/* ======================================================== */}
      {sport === 'hockey' && detail?.hockey && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Disparos no Gol (SOG)</span>
              <span className="text-sm font-bold text-[#00d2ff]">
                {detail.hockey.shotsOnGoal[0]} - {detail.hockey.shotsOnGoal[1]}
              </span>
            </div>
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Power Play Eficácia</span>
              <span className="text-xs font-bold text-white">
                {detail.hockey.powerPlay[0]} vs {detail.hockey.powerPlay[1]}
              </span>
            </div>
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Faceoffs Vencidos</span>
              <span className="text-xs font-bold text-[#00ff88]">
                {detail.hockey.faceoffWinPct[0]} - {detail.hockey.faceoffWinPct[1]}
              </span>
            </div>
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Defesas dos Goleiros</span>
              <span className="text-sm font-bold text-white">
                {detail.hockey.saves[0]} / {detail.hockey.saves[1]}
              </span>
            </div>
          </div>

          <div className="bg-[#0b0c0d] border border-white/10 p-3.5 font-mono text-xs">
            <div className="text-[10px] text-[#00d2ff] uppercase font-bold mb-2">Gols por Período:</div>
            <div className="grid grid-cols-4 text-center border-t border-white/10 pt-2 text-[11px]">
              <div><span className="text-white/40 block text-[9px]">1º PERÍODO</span>{detail.hockey.periods[0][0]} - {detail.hockey.periods[1][0]}</div>
              <div><span className="text-white/40 block text-[9px]">2º PERÍODO</span>{detail.hockey.periods[0][1]} - {detail.hockey.periods[1][1]}</div>
              <div><span className="text-white/40 block text-[9px]">3º PERÍODO</span>{detail.hockey.periods[0][2]} - {detail.hockey.periods[1][2]}</div>
              <div className="font-bold text-[#00ff88]"><span className="text-white/40 block text-[9px]">PLACAR</span>{match.homeScore} - {match.awayScore}</div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. VÔLEI DETALHADO */}
      {/* ======================================================== */}
      {sport === 'volei' && detail?.volleyball && (
        <div className="space-y-3">
          <div className="bg-[#0b0c0d] border border-white/10 p-4">
            <div className="text-[10px] text-[#ffc107] uppercase font-mono font-bold mb-3 flex items-center gap-1.5">
              <span>🏐</span>
              <span>PONTUAÇÃO DE CADA SET (SUPERLIGA / VNL)</span>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {detail.volleyball.sets.map((st, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 flex items-center gap-2">
                  <span className="text-[10px] text-white/50">{idx + 1}º SET:</span>
                  <span className="text-[#00ff88] font-bold">{st}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Pontos de Ataque</span>
              <span className="text-sm font-bold text-white">
                {detail.volleyball.attackPoints[0]} vs {detail.volleyball.attackPoints[1]}
              </span>
            </div>
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Pontos de Bloqueio (Toco)</span>
              <span className="text-sm font-bold text-[#00ff88]">
                {detail.volleyball.blockPoints[0]} - {detail.volleyball.blockPoints[1]}
              </span>
            </div>
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Aces de Saque</span>
              <span className="text-sm font-bold text-[#ffc107]">
                {detail.volleyball.acePoints[0]} - {detail.volleyball.acePoints[1]}
              </span>
            </div>
            <div className="bg-[#0b0c0d] border border-white/10 p-3 text-center font-mono">
              <span className="text-[10px] text-[#ececed]/50 uppercase block">Recepção Positiva</span>
              <span className="text-xs font-bold text-white">
                {detail.volleyball.receptionEfficiency[0]} vs {detail.volleyball.receptionEfficiency[1]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. NATAÇÃO DETALHADO (RAIA A RAIA) */}
      {/* ======================================================== */}
      {sport === 'natacao' && detail?.swimming && (
        <div className="space-y-3">
          <div className="bg-[#0b0c0d] border border-white/10 p-4">
            <div className="flex items-center justify-between text-xs font-mono mb-3 flex-wrap gap-2">
              <span className="text-[#00b4d8] font-bold uppercase flex items-center gap-1.5">
                <span>🏊</span>
                <span>{detail.swimming.eventDistance} • {detail.swimming.poolType}</span>
              </span>
              <span className="text-[10px] bg-[#00b4d8]/20 text-[#00b4d8] px-2 py-0.5 border border-[#00b4d8]/40">
                Recorde Mundial: {detail.swimming.worldRecord}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#ececed]/50 text-[10px]">
                    <th className="py-2 px-2">RAIA</th>
                    <th className="py-2 px-2">POS</th>
                    <th className="py-2 px-2">NADADOR</th>
                    <th className="py-2 px-2">PAÍS / CLUBE</th>
                    <th className="py-2 px-2 text-right">TEMPO FINAL</th>
                    <th className="py-2 px-2 text-right">DIFERENÇA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {detail.swimming.laneResults.map((r) => (
                    <tr
                      key={r.lane}
                      className={`hover:bg-white/5 transition ${
                        r.rank === 1 ? 'bg-[#00b4d8]/10 font-bold' : ''
                      }`}
                    >
                      <td className="py-2 px-2 font-bold text-white/70">
                        Raia {r.lane}
                      </td>
                      <td className="py-2 px-2">
                        {r.rank === 1 && <span className="text-amber-400">🥇 1º</span>}
                        {r.rank === 2 && <span className="text-slate-300">🥈 2º</span>}
                        {r.rank === 3 && <span className="text-amber-600">🥉 3º</span>}
                        {r.rank > 3 && <span className="text-white/60">{r.rank}º</span>}
                      </td>
                      <td className="py-2 px-2 text-white">
                        <span className="font-bold">{r.swimmer}</span>
                        {r.badge === 'RECORD' && (
                          <span className="ml-1.5 text-[9px] bg-red-500/20 text-red-400 border border-red-500/40 px-1 py-0.2">
                            NOVO RECORDE!
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2 text-[#ececed]/70 flex items-center gap-1.5">
                        <span>{r.flag}</span>
                        <span>{r.country}</span>
                        {r.club && <span className="text-[10px] text-white/40">({r.club})</span>}
                      </td>
                      <td className="py-2 px-2 text-right font-bold text-[#00ff88]">
                        {r.finalTime}
                      </td>
                      <td className="py-2 px-2 text-right text-white/50 text-[11px]">
                        {r.diff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. JIU-JITSU & JUDÔ (COMBATE / ARTES MARCIAIS) */}
      {/* ======================================================== */}
      {(sport === 'jiujitsu' || sport === 'judo') && (
        <div className="space-y-3">
          {/* Combat overview banner */}
          <div className="bg-[#0b0c0d] border border-white/10 p-4">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-[#a855f7] font-bold flex items-center gap-1.5 uppercase">
                <Swords className="w-4 h-4 text-[#a855f7]" />
                <span>{match.combatDetail?.weightClass || 'Categoria Oficial'}</span>
              </span>
              <span className="text-[11px] text-[#00ff88] font-bold">
                {match.combatDetail?.tatameOrRing || 'Tatame Central'}
              </span>
            </div>

            {match.combatDetail?.decisionType && (
              <div className="p-2.5 bg-[#a855f7]/10 border border-[#a855f7]/30 text-xs font-mono text-[#ececed] mb-3">
                <strong className="text-[#a855f7] uppercase mr-1">Decisão / Final:</strong>
                {match.combatDetail.decisionType}
              </div>
            )}

            {/* IBJJF specific scores */}
            {sport === 'jiujitsu' && detail?.combat?.bjjScores && (
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-white/5 border border-white/10 p-3">
                  <span className="text-[10px] text-white/50 uppercase block">PONTOS</span>
                  <div className="text-xl font-bold text-[#00ff88] mt-1">
                    {detail.combat.bjjScores.homePoints} x {detail.combat.bjjScores.awayPoints}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3">
                  <span className="text-[10px] text-white/50 uppercase block">VANTAGENS</span>
                  <div className="text-lg font-bold text-amber-400 mt-1">
                    {detail.combat.bjjScores.homeAdvantages} x {detail.combat.bjjScores.awayAdvantages}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3">
                  <span className="text-[10px] text-white/50 uppercase block">PUNIÇÕES</span>
                  <div className="text-lg font-bold text-red-400 mt-1">
                    {detail.combat.bjjScores.homePenalties} x {detail.combat.bjjScores.awayPenalties}
                  </div>
                </div>
              </div>
            )}

            {/* Judô specific scores (Ippon, Waza-ari, Shido) */}
            {sport === 'judo' && detail?.combat?.judokaScores && (
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-white/5 border border-white/10 p-3">
                  <span className="text-[10px] text-white/50 uppercase block">IPPON (10 PTS)</span>
                  <div className="text-xl font-bold text-[#00ff88] mt-1">
                    {detail.combat.judokaScores.homeIppon} x {detail.combat.judokaScores.awayIppon}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3">
                  <span className="text-[10px] text-white/50 uppercase block">WAZA-ARI (1 PT)</span>
                  <div className="text-lg font-bold text-amber-400 mt-1">
                    {detail.combat.judokaScores.homeWazaari} x {detail.combat.judokaScores.awayWazaari}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3">
                  <span className="text-[10px] text-white/50 uppercase block">SHIDOS (PENALIDADES)</span>
                  <div className="text-lg font-bold text-red-400 mt-1">
                    {detail.combat.judokaScores.homeShido} x {detail.combat.judokaScores.awayShido}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. MMA & LUTAS (UFC) */}
      {/* ======================================================== */}
      {sport === 'mma' && detail?.combat?.mmaScores && (
        <div className="space-y-3">
          <div className="bg-[#0b0c0d] border border-white/10 p-4 font-mono text-xs">
            <div className="text-[10px] text-[#e11d48] uppercase font-bold mb-3 flex items-center gap-1.5">
              <span>🥊</span>
              <span>ESTATÍSTICAS DO COMBATE (GOLPES SIGNIFICATIVOS &amp; QUEDAS)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">GOLPES SIGNIFICATIVOS</span>
                <span className="text-sm font-bold text-[#00ff88]">
                  {detail.combat.mmaScores.significantStrikes[0]} vs {detail.combat.mmaScores.significantStrikes[1]}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">QUEDAS CONECTADAS</span>
                <span className="text-sm font-bold text-white">
                  {detail.combat.mmaScores.takedowns[0]} vs {detail.combat.mmaScores.takedowns[1]}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">KNOCKDOWNS</span>
                <span className="text-sm font-bold text-amber-400">
                  {detail.combat.mmaScores.knockdowns[0]} vs {detail.combat.mmaScores.knockdowns[1]}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">TEMPO DE CONTROLE</span>
                <span className="text-xs font-bold text-white">
                  {detail.combat.mmaScores.controlTime[0]} vs {detail.combat.mmaScores.controlTime[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. TÊNIS DETALHADO */}
      {/* ======================================================== */}
      {sport === 'tenis' && detail?.tennis && (
        <div className="space-y-3">
          <div className="bg-[#0b0c0d] border border-white/10 p-4 font-mono text-xs">
            <div className="text-[10px] text-[#84cc16] uppercase font-bold mb-3 flex items-center gap-1.5">
              <span>🎾</span>
              <span>PLACAR DOS SETS (MATCH SCORE)</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {detail.tennis.sets.map((st, i) => (
                <div key={i} className="bg-white/5 border border-white/10 px-3 py-1 font-bold text-[#84cc16]">
                  SET {i + 1}: {st}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">ACES</span>
                <span className="text-sm font-bold text-[#00ff88]">
                  {detail.tennis.aces[0]} vs {detail.tennis.aces[1]}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">WINNERS</span>
                <span className="text-sm font-bold text-white">
                  {detail.tennis.winners[0]} vs {detail.tennis.winners[1]}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">1º SERVIÇO (%)</span>
                <span className="text-xs font-bold text-white">
                  {detail.tennis.firstServePct[0]} vs {detail.tennis.firstServePct[1]}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5">
                <span className="text-[9px] text-white/50 block">BREAK POINTS</span>
                <span className="text-xs font-bold text-amber-400">
                  {detail.tennis.breakPointsConverted[0]} vs {detail.tennis.breakPointsConverted[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
