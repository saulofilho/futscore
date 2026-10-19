import React, { useState } from 'react';
import { TEAMS_DATA } from '../data/teamsData';
import { TEAMS_EXTRA_DATA } from '../data/teamSquadsData';
import { SquadPlayer } from '../types';
import { X, Trophy, Users, Shield, BookOpen, Sparkles, MapPin, ExternalLink, Award, Activity, Shirt, CheckCircle2, ChevronRight } from 'lucide-react';

interface TeamHistoryModalProps {
  teamId: string | null;
  onClose: () => void;
  onSelectAthlete?: (athleteNameOrId: string) => void;
}

export const TeamHistoryModal: React.FC<TeamHistoryModalProps> = ({
  teamId,
  onClose,
  onSelectAthlete,
}) => {
  const [activeSection, setActiveSection] = useState<'history' | 'squad' | 'performance' | 'trophies' | 'legends' | 'rivalries' | 'stadium_trivia'>('history');

  if (!teamId) return null;

  let team =
    TEAMS_DATA[teamId] ||
    Object.values(TEAMS_DATA).find(
      (t) =>
        t.id === teamId ||
        t.name.toLowerCase() === teamId.toLowerCase() ||
        teamId.toLowerCase().includes(t.id) ||
        t.id.includes(teamId.toLowerCase())
    );

  if (!team && teamId) {
    const cleanName = teamId.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    team = {
      id: teamId,
      name: cleanName,
      popularName: cleanName,
      fullName: `${cleanName} Football Club`,
      nickname: 'Clube Oficial',
      badgeEmoji: '⚽',
      primaryColor: '#00ff88',
      secondaryColor: '#141618',
      accentColor: '#ffffff',
      foundationDate: 'Tradição Esportiva',
      foundationYear: 1904,
      originCity: 'Sede Oficial',
      country: 'Internacional',
      stadium: {
        name: 'Estádio Oficial do Clube',
        capacity: '50.000 torcedores',
        opened: 1952,
        city: 'Metrópole',
      },
      president: 'Diretoria Oficial',
      coach: 'Comissão Técnica',
      summary: `Clube profissional em disputa nos principais campeonatos oficiais mundiais, com histórico de confrontos acirrados e torcida vibrante.`,
      detailedHistory: `Fundado com rica tradição esportiva, o ${cleanName} disputa competições nacionais e internacionais de alto rendimento. Com uma trajetória marcada pela dedicação dos seus atletas e apoio constante dos torcedores nas arquibancadas, o clube mantém sua presença competitiva nos principais palcos do futebol.`,
      goldenEra: 'Grandes conquistas e campanhas de destaque nas competições oficiais da temporada.',
      trophies: [
        {
          title: 'Títulos Oficiais & Taças',
          count: 8,
          iconName: 'Trophy',
          years: ['2018', '2021', '2024'],
        },
      ],
      legends: [
        {
          name: 'Ídolo do Clube',
          era: 'Anos de Ouro',
          position: 'Atacante',
          goalsOrMatches: '150 gols',
          description: 'Goleador lendário e capitão emblemático reverenciado pela torcida.',
          achievements: 'Artilharias históricas e títulos memoráveis',
        },
      ],
      rivalries: [
        {
          rivalName: 'Rival Tradicional',
          derbyName: 'Clássico Regional',
          description: 'Duelo tradicional de alta rivalidade e arquibancadas lotadas.',
          historicalRecord: 'Disputas equilibradas ao longo das décadas',
        },
      ],
      curiosities: ['Mascote e hino entoados com fervor nos dias de jogos decisivos.'],
      anthemVerse: 'Com garra e tradição, pelo orgulho da torcida!',
      website: 'https://espn.com/soccer',
    };
  }

  // Merge extra data if available
  const extra = TEAMS_EXTRA_DATA[team.id] ||
    Object.entries(TEAMS_EXTRA_DATA).find(([k]) => team.id.includes(k) || k.includes(team.id))?.[1];

  const squad: SquadPlayer[] = extra?.squad || [
    { id: `${team.id}-1`, number: 1, name: 'Goleiro Titular', position: 'GOL', positionDetail: 'Goleiro', age: 28, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 4M', contractUntil: 'Dez/2026', photoEmoji: '🧤' },
    { id: `${team.id}-3`, number: 3, name: 'Zagueiro Central', position: 'ZAG', positionDetail: 'Zagueiro', age: 27, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 6M', contractUntil: 'Dez/2027', photoEmoji: '🛡️' },
    { id: `${team.id}-4`, number: 4, name: 'Zagueiro Líder', position: 'ZAG', positionDetail: 'Zagueiro', age: 29, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 5M', contractUntil: 'Dez/2026', isCaptain: true, photoEmoji: '🛡️' },
    { id: `${team.id}-2`, number: 2, name: 'Lateral Direito', position: 'LAT', positionDetail: 'Lateral-Direito', age: 26, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 4.5M', contractUntil: 'Dez/2027', photoEmoji: '🏃' },
    { id: `${team.id}-6`, number: 6, name: 'Lateral Esquerdo', position: 'LAT', positionDetail: 'Lateral-Esquerdo', age: 25, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 4M', contractUntil: 'Dez/2027', photoEmoji: '🏃' },
    { id: `${team.id}-5`, number: 5, name: 'Volante Marcador', position: 'VOL', positionDetail: 'Primeiro Volante', age: 28, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 7M', contractUntil: 'Dez/2026', photoEmoji: '⚓' },
    { id: `${team.id}-8`, number: 8, name: 'Segundo Volante', position: 'VOL', positionDetail: 'Volante Box-to-Box', age: 26, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 8M', contractUntil: 'Dez/2027', photoEmoji: '⚡' },
    { id: `${team.id}-10`, number: 10, name: 'Meia Armador', position: 'MEI', positionDetail: 'Camisa 10 / Articulador', age: 29, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 12M', contractUntil: 'Dez/2026', photoEmoji: '🎩' },
    { id: `${team.id}-7`, number: 7, name: 'Ponta Direita', position: 'ATA', positionDetail: 'Atacante de Lado', age: 24, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 9M', contractUntil: 'Dez/2028', photoEmoji: '⚡' },
    { id: `${team.id}-11`, number: 11, name: 'Ponta Esquerda', position: 'ATA', positionDetail: 'Atacante Veloz', age: 25, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 8M', contractUntil: 'Dez/2027', photoEmoji: '🌪️' },
    { id: `${team.id}-9`, number: 9, name: 'Centroavante Goleador', position: 'ATA', positionDetail: 'Camisa 9', age: 27, nationality: team.country, flagEmoji: team.badgeEmoji, marketValue: '€ 14M', contractUntil: 'Dez/2027', photoEmoji: '⚽' },
  ];

  const seasonPerformance = extra?.seasonPerformance || {
    currentPosition: 'Disputando o G-4 das competições oficiais',
    winRate: '62%',
    last5: ['V', 'V', 'E', 'D', 'V'] as ('V' | 'E' | 'D')[],
    topScorer: { name: 'Artilheiro do Time', goals: 18 },
    topAssister: { name: 'Líder em Assistências', assists: 11 },
    goalsScored: 58,
    goalsConceded: 32,
    cleanSheets: 14,
    possessionAvg: 54,
  };

  const technicalStaff = extra?.technicalStaff || {
    assistantCoach: 'Comissão Técnica Permanente',
    fitnessCoach: 'Departamento de Fisiologia e Preparação',
    goalkeeperCoach: 'Preparador Especialista de Goleiros',
  };

  const uniformColors = extra?.uniformColors || {
    homeKit: `Cores tradicionais de mandante do ${team.name}`,
    awayKit: `Uniforme reserva oficial alternativo`,
    supplier: 'Material Esportivo Oficial',
  };

  const stadiumDetails = {
    ...team.stadium,
    ...(extra?.stadiumDetails || {
      pitch: 'Grama Natural Oficial Padrão FIFA (105m x 68m)',
      recordAttendance: team.stadium.capacity,
      address: `${team.stadium.name}, ${team.originCity}`,
    }),
  };

  // Group squad by position
  const goalkeepers = squad.filter(p => p.position === 'GOL');
  const defenders = squad.filter(p => p.position === 'ZAG' || p.position === 'LAT');
  const midfielders = squad.filter(p => p.position === 'VOL' || p.position === 'MEI');
  const forwards = squad.filter(p => p.position === 'ATA');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#141618] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[94vh] sm:max-h-[92vh] flex flex-col text-[#ececed]">
        {/* Hero Header with Club Color Accent */}
        <div
          className="relative p-6 sm:p-8 overflow-hidden text-white border-b border-white/10"
          style={{
            background: `linear-gradient(135deg, ${team.primaryColor}cc 0%, #0b0c0d 100%)`
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            id="btn-close-team-history"
            className="absolute top-4 right-4 p-2 bg-[#0b0c0d] border border-white/20 text-white/80 hover:text-white transition cursor-pointer z-10"
            title="Fechar história"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-0">
            {/* Big Crest Box */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#0b0c0d] border-2 border-white/20 flex items-center justify-center text-4xl sm:text-6xl shadow-2xl shrink-0">
              {team.badgeEmoji}
            </div>

            {/* Title & Metadata */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#00ff88] text-[#0b0c0d] uppercase">
                  FUNDADO EM {team.foundationYear}
                </span>
                <span className="label opacity-75 border border-white/20 px-2 py-0.5 bg-black/40">
                  {team.originCity} • {team.country}
                </span>
                <span className="label text-[#00ff88] border border-[#00ff88]/30 px-2 py-0.5 bg-black/40 font-bold">
                  {squad.length} ATLETAS NO PLANTEL
                </span>
              </div>

              <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white">
                {team.fullName}
              </h2>

              <p className="label text-[#00ff88] opacity-100 font-bold mt-1">
                "{team.nickname}"
              </p>

              <p className="text-xs text-[#ececed]/80 mt-2 line-clamp-2 max-w-2xl leading-relaxed">
                {team.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-3 sm:px-6 bg-[#0b0c0d] border-b border-white/10 overflow-x-auto scrollbar-none touch-pan-x shrink-0">
          <button
            onClick={() => setActiveSection('history')}
            id="team-tab-history"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'history'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ORIGEM</span>
          </button>

          <button
            onClick={() => setActiveSection('squad')}
            id="team-tab-squad"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'squad'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>ELENCO &amp; PLANTEL</span>
          </button>

          <button
            onClick={() => setActiveSection('performance')}
            id="team-tab-performance"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'performance'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>TEMPORADA</span>
          </button>

          <button
            onClick={() => setActiveSection('trophies')}
            id="team-tab-trophies"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'trophies'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>TROFÉUS</span>
          </button>

          <button
            onClick={() => setActiveSection('legends')}
            id="team-tab-legends"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'legends'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>ÍDOLOS</span>
          </button>

          <button
            onClick={() => setActiveSection('rivalries')}
            id="team-tab-rivalries"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'rivalries'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>CLÁSSICOS</span>
          </button>

          <button
            onClick={() => setActiveSection('stadium_trivia')}
            id="team-tab-trivia"
            className={`font-mono text-[11px] sm:text-xs py-2.5 sm:py-3 px-2.5 sm:px-3 uppercase transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'stadium_trivia'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTÁDIO &amp; UNIFORMES</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* SECTION 1: ORIGEM & HISTÓRIA */}
          {activeSection === 'history' && (
            <div className="space-y-6">
              {/* Highlight Box: Golden Era */}
              <div className="bg-[#0b0c0d] border border-[#00ff88]/30 p-4 sm:p-5 flex items-start gap-3.5">
                <div className="p-2 bg-[#141618] border border-[#00ff88] text-[#00ff88] shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="label text-[#00ff88] opacity-100 font-bold">
                    ERAS DE OURO IMORTAIS
                  </h4>
                  <p className="text-xs sm:text-sm text-[#ececed]/80 mt-1 leading-relaxed">
                    {team.goldenEra}
                  </p>
                </div>
              </div>

              {/* Full Detailed Narrative */}
              <div className="bg-[#0b0c0d] p-5 sm:p-6 border border-white/10 space-y-4 text-[#ececed]/80 text-sm leading-relaxed">
                <h3 className="font-['Syne'] font-extrabold text-base text-[#ececed] uppercase flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00ff88]" />
                  <span>Crônica Histórica Oficial</span>
                </h3>
                {team.detailedHistory.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Club Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="text-xs text-[#ececed]/50 uppercase">Fundação</p>
                  <p className="text-sm font-bold text-[#ececed] mt-1">{team.foundationDate}</p>
                </div>
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="text-xs text-[#ececed]/50 uppercase">Presidente</p>
                  <p className="text-sm font-bold text-[#ececed] mt-1 truncate">{team.president}</p>
                </div>
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="text-xs text-[#ececed]/50 uppercase">Treinador</p>
                  <p className="text-sm font-bold text-[#00ff88] mt-1 truncate">{team.coach}</p>
                </div>
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="text-xs text-[#ececed]/50 uppercase">Estádio</p>
                  <p className="text-sm font-bold text-[#ececed] mt-1 truncate">{team.stadium.name.split('(')[0]}</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: ELENCO & PLANTEL COMPLETO */}
          {activeSection === 'squad' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#0b0c0d] p-4 border border-white/10 font-mono text-xs">
                <div>
                  <span className="label text-[#00ff88] font-bold uppercase">PLANTEL PROFISSIONAL DA TEMPORADA</span>
                  <p className="text-[#ececed]/60 text-[11px] mt-0.5">
                    Clique em qualquer atleta para abrir sua ficha técnica e estatísticas individuais.
                  </p>
                </div>
                <span className="bg-[#141618] border border-white/15 px-3 py-1 text-white font-bold shrink-0 self-start sm:self-auto">
                  {squad.length} Atletas Registrados
                </span>
              </div>

              {/* Helper renderer for position groups */}
              {[
                { title: 'GOLEIROS', icon: '🧤', players: goalkeepers },
                { title: 'DEFENSORES (ZAGUEIROS & LATERAIS)', icon: '🛡️', players: defenders },
                { title: 'MEIO-CAMPISTAS (VOLANTES & MEIAS)', icon: '🧠', players: midfielders },
                { title: 'ATACANTES (PONTAS & CENTROAVANTES)', icon: '⚽', players: forwards },
              ].map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <h4 className="label text-[#00ff88] font-bold uppercase flex items-center gap-1.5 text-xs">
                    <span>{group.icon}</span>
                    <span>{group.title} ({group.players.length})</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                    {group.players.map((player) => (
                      <div
                        key={player.id}
                        onClick={() => onSelectAthlete && onSelectAthlete(player.name)}
                        className={`bg-[#0b0c0d] hover:bg-[#1a1e22] border border-white/10 hover:border-[#00ff88]/50 p-3 flex items-center justify-between gap-2.5 transition cursor-pointer group ${
                          player.isCaptain ? 'border-amber-400/30' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Number badge */}
                          <div className="w-8 h-8 bg-[#141618] border border-white/10 group-hover:border-[#00ff88] flex items-center justify-center text-xs font-bold text-[#00ff88] shrink-0">
                            #{player.number}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-xs truncate group-hover:text-[#00ff88] transition">
                                {player.name}
                              </span>
                              {player.isCaptain && (
                                <span className="bg-amber-400 text-black font-black text-[9px] px-1 py-0.2" title="Capitão">
                                  C
                                </span>
                              )}
                              <span className="text-[11px]" title={player.nationality}>{player.flagEmoji}</span>
                            </div>
                            <p className="text-[10px] text-[#ececed]/50 truncate mt-0.5">
                              {player.positionDetail} • {player.age} anos
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-[#00ff88]">{player.marketValue}</p>
                          <p className="text-[9px] text-[#ececed]/40">{player.contractUntil}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 3: TEMPORADA ATUAL & DESEMPENHO */}
          {activeSection === 'performance' && (
            <div className="space-y-6">
              {/* Standings Banner */}
              <div className="bg-[#0b0c0d] p-4 sm:p-5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="label text-[#00ff88] font-bold uppercase text-[10px]">MOMENTO DO CLUBE</span>
                    <h3 className="font-['Syne'] font-extrabold text-lg sm:text-xl text-white uppercase mt-0.5">
                      {seasonPerformance.currentPosition}
                    </h3>
                  </div>

                  {/* Form Last 5 */}
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="label opacity-60 mr-1 uppercase">Últimos 5 Jogos:</span>
                    {seasonPerformance.last5.map((res, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 flex items-center justify-center font-bold text-xs ${
                          res === 'V'
                            ? 'bg-[#00ff88] text-[#0b0c0d]'
                            : res === 'E'
                            ? 'bg-amber-400 text-[#0b0c0d]'
                            : 'bg-red-500 text-white'
                        }`}
                        title={res === 'V' ? 'Vitória' : res === 'E' ? 'Empate' : 'Derrota'}
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="label opacity-60 text-[10px]">Aproveitamento</p>
                  <p className="text-2xl font-black text-[#00ff88] mt-1">{seasonPerformance.winRate}</p>
                </div>
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="label opacity-60 text-[10px]">Gols Marcados</p>
                  <p className="text-2xl font-black text-white mt-1">{seasonPerformance.goalsScored}</p>
                </div>
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="label opacity-60 text-[10px]">Gols Sofridos</p>
                  <p className="text-2xl font-black text-white mt-1">{seasonPerformance.goalsConceded}</p>
                </div>
                <div className="bg-[#0b0c0d] p-3.5 border border-white/10">
                  <p className="label opacity-60 text-[10px]">Jogos sem Levar Gol</p>
                  <p className="text-2xl font-black text-[#00ff88] mt-1">{seasonPerformance.cleanSheets}</p>
                </div>
              </div>

              {/* Leaders: Top Scorer & Assister */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="bg-[#0b0c0d] p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="label text-[#00ff88] text-[10px] uppercase font-bold">⚽ ARTILHEIRO DA TEMPORADA</span>
                    <p className="text-sm font-bold text-white mt-1">{seasonPerformance.topScorer.name}</p>
                  </div>
                  <span className="text-2xl font-black text-[#00ff88]">
                    {seasonPerformance.topScorer.goals} <span className="text-xs font-normal opacity-60">gols</span>
                  </span>
                </div>

                <div className="bg-[#0b0c0d] p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="label text-[#00ff88] text-[10px] uppercase font-bold">🎯 LÍDER EM ASSISTÊNCIAS</span>
                    <p className="text-sm font-bold text-white mt-1">{seasonPerformance.topAssister.name}</p>
                  </div>
                  <span className="text-2xl font-black text-white">
                    {('assists' in seasonPerformance.topAssister ? seasonPerformance.topAssister.assists : (seasonPerformance.topAssister as any).goals)} <span className="text-xs font-normal opacity-60">passes</span>
                  </span>
                </div>
              </div>

              {/* Technical Staff Card */}
              <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3 font-mono text-xs">
                <h4 className="label text-[#00ff88] font-bold uppercase text-[10px]">
                  COMISSÃO TÉCNICA OFICIAL
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Treinador Principal</span>
                    <p className="font-bold text-white mt-0.5">{team.coach}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Auxiliar Técnico</span>
                    <p className="font-bold text-white mt-0.5">{technicalStaff.assistantCoach}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Preparador Físico</span>
                    <p className="font-bold text-white mt-0.5">{technicalStaff.fitnessCoach}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SALA DE TROFÉUS */}
          {activeSection === 'trophies' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.trophies.map((trophy, tIdx) => (
                  <div
                    key={tIdx}
                    className="bg-[#0b0c0d] p-4 border border-white/10 flex flex-col justify-between gap-3 font-mono"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">🏆</span>
                        <div>
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {trophy.title}
                          </h4>
                          <span className="text-xs text-[#00ff88] font-bold">
                            {trophy.count} {trophy.count === 1 ? 'Título' : 'Títulos'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <p className="label opacity-60 text-[9px] mb-1 uppercase">Anos das Conquistas:</p>
                      <div className="flex flex-wrap gap-1">
                        {trophy.years.map((year, yIdx) => (
                          <span
                            key={yIdx}
                            className="bg-[#141618] border border-white/10 text-[10px] px-1.5 py-0.5 text-[#ececed]"
                          >
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: ÍDOLOS ETERNOS */}
          {activeSection === 'legends' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {team.legends.map((legend, lIdx) => (
                  <div
                    key={lIdx}
                    className="bg-[#0b0c0d] p-5 border border-white/10 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-12 h-12 bg-[#141618] border border-white/20 flex items-center justify-center text-xl shrink-0">
                      ⭐
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-['Syne'] font-extrabold text-base text-white uppercase">
                          {legend.name}
                        </h4>
                        <span className="font-mono text-xs text-[#00ff88]">
                          {legend.era}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs text-[#ececed]/60">
                        <span>Posição: <strong className="text-white">{legend.position}</strong></span>
                        <span>•</span>
                        <span>Marca: <strong className="text-[#00ff88]">{legend.goalsOrMatches}</strong></span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#ececed]/80 leading-relaxed pt-1">
                        {legend.description}
                      </p>

                      <div className="pt-2">
                        <span className="font-mono text-[10px] text-amber-400 font-bold bg-[#141618] px-2 py-1 border border-white/5">
                          🏆 {legend.achievements}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: GRANDES CLÁSSICOS & RIVALIDADES */}
          {activeSection === 'rivalries' && (
            <div className="space-y-4">
              {team.rivalries.map((rival, rIdx) => (
                <div
                  key={rIdx}
                  className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="font-['Syne'] font-extrabold text-base text-white uppercase flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#00ff88]" />
                      <span>{rival.derbyName}</span>
                    </h4>
                    <span className="font-mono text-xs text-[#ececed]/60">
                      vs {rival.rivalName}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#ececed]/80 leading-relaxed">
                    {rival.description}
                  </p>

                  <div className="bg-[#141618] p-3 border border-white/5 font-mono text-xs">
                    <span className="label opacity-60 text-[9px] uppercase">Retrospecto Histórico:</span>
                    <p className="text-[#00ff88] font-bold mt-0.5">{rival.historicalRecord}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 7: ESTÁDIO & UNIFORMES */}
          {activeSection === 'stadium_trivia' && (
            <div className="space-y-6">
              {/* Stadium Spotlight Card */}
              <div className="bg-[#0b0c0d] p-5 sm:p-6 border border-white/10 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="label text-[#00ff88] font-bold uppercase text-[10px]">CASA DO CLUBE</span>
                    <h3 className="font-['Syne'] font-extrabold text-lg sm:text-2xl text-white uppercase mt-0.5">
                      {stadiumDetails.name}
                    </h3>
                    <p className="text-xs text-[#ececed]/60 font-mono flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00ff88]" />
                      <span>{stadiumDetails.address}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center pt-2">
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="label opacity-50 text-[9px] uppercase">Capacidade</p>
                    <p className="text-sm font-bold text-[#00ff88] mt-0.5">{stadiumDetails.capacity}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="label opacity-50 text-[9px] uppercase">Inauguração</p>
                    <p className="text-sm font-bold text-white mt-0.5">{stadiumDetails.opened}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="label opacity-50 text-[9px] uppercase">Gramado</p>
                    <p className="text-xs font-bold text-white mt-0.5 truncate" title={stadiumDetails.pitch}>
                      {stadiumDetails.pitch?.split('(')[0] || 'Grama Natural'}
                    </p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="label opacity-50 text-[9px] uppercase">Apelido Popular</p>
                    <p className="text-xs font-bold text-white mt-0.5 truncate">{stadiumDetails.popularNickname || 'Alçapão'}</p>
                  </div>
                </div>

                {stadiumDetails.recordAttendance && (
                  <div className="bg-[#141618] p-3 border border-white/5 font-mono text-xs">
                    <span className="label opacity-50 text-[9px] uppercase">Público Recorde:</span>
                    <p className="text-[#ececed] mt-0.5">{stadiumDetails.recordAttendance}</p>
                  </div>
                )}
              </div>

              {/* Uniforms / Kits */}
              <div className="bg-[#0b0c0d] p-5 border border-white/10 space-y-3 font-mono text-xs">
                <h4 className="label text-[#00ff88] font-bold uppercase flex items-center gap-1.5 text-[10px]">
                  <Shirt className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>UNIFORMES OFICIAIS &amp; FORNECEDOR</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Uniforme 1 (Titular)</span>
                    <p className="text-white mt-1 leading-relaxed">{uniformColors.homeKit}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Uniforme 2 (Reserva)</span>
                    <p className="text-white mt-1 leading-relaxed">{uniformColors.awayKit}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/5">
                    <span className="label opacity-50 text-[9px] uppercase">Fornecedora de Material</span>
                    <p className="text-[#00ff88] font-bold mt-1 text-sm">{uniformColors.supplier}</p>
                  </div>
                </div>
              </div>

              {/* Anthem Verse */}
              <div className="bg-[#0b0c0d] border border-white/10 p-5">
                <h4 className="label text-[#00ff88] opacity-100 font-bold mb-2">
                  TRECHO DO HINO OFICIAL
                </h4>
                <p className="text-sm text-[#ececed] italic leading-relaxed bg-[#141618] p-4 border border-white/10">
                  "{team.anthemVerse}"
                </p>
              </div>

              {/* Curiosities */}
              <div className="bg-[#0b0c0d] border border-white/10 p-5">
                <h4 className="label text-[#00ff88] opacity-100 font-bold mb-3">
                  FATOS HISTÓRICOS &amp; CURIOSIDADES
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#ececed]/80">
                  {team.curiosities.map((item, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2.5">
                      <span className="text-[#00ff88] mt-0.5">●</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0b0c0d] border-t border-white/10 flex items-center justify-between text-xs">
          <a
            href={team.website}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-[#00ff88] opacity-100 font-bold hover:underline flex items-center gap-1.5"
          >
            <span>[PORTAL OFICIAL DO CLUBE]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="btn-primary cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
