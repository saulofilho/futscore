import React, { useState } from 'react';
import { TEAMS_DATA } from '../data/teamsData';
import { X, Trophy, Users, Shield, BookOpen, Sparkles, MapPin, ExternalLink, Award } from 'lucide-react';

interface TeamHistoryModalProps {
  teamId: string | null;
  onClose: () => void;
}

export const TeamHistoryModal: React.FC<TeamHistoryModalProps> = ({ teamId, onClose }) => {
  const [activeSection, setActiveSection] = useState<'history' | 'trophies' | 'legends' | 'rivalries' | 'stadium_trivia'>('history');

  if (!teamId) return null;

  const team = TEAMS_DATA[teamId] || Object.values(TEAMS_DATA).find(t => t.id === teamId || t.name.toLowerCase() === teamId.toLowerCase());

  if (!team) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-[#141618] border border-white/20 p-6 max-w-md w-full text-center text-[#ececed]">
          <p className="label opacity-70 mb-4">História do clube não encontrada no acervo.</p>
          <button
            onClick={onClose}
            className="btn-primary cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#141618] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#ececed]"
      >
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
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#0b0c0d] border-2 border-white/20 flex items-center justify-center text-5xl sm:text-6xl shadow-2xl shrink-0">
              {team.badgeEmoji}
            </div>

            {/* Title & Metadata */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#00ff88] text-[#0b0c0d] uppercase">
                  FUNDADO EM {team.foundationYear}
                </span>
                <span className="label opacity-70 border border-white/20 px-2 py-0.5 bg-black/40">
                  {team.originCity} • {team.country}
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
        <div className="flex items-center gap-1 px-4 sm:px-6 bg-[#0b0c0d] border-b border-white/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSection('history')}
            id="team-tab-history"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === 'history'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ORIGEM &amp; TRAJETÓRIA</span>
          </button>

          <button
            onClick={() => setActiveSection('trophies')}
            id="team-tab-trophies"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === 'trophies'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>SALA DE TROFÉUS</span>
          </button>

          <button
            onClick={() => setActiveSection('legends')}
            id="team-tab-legends"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === 'legends'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ÍDOLOS ETERNOS</span>
          </button>

          <button
            onClick={() => setActiveSection('rivalries')}
            id="team-tab-rivalries"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === 'rivalries'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>GRANDES CLÁSSICOS</span>
          </button>

          <button
            onClick={() => setActiveSection('stadium_trivia')}
            id="team-tab-trivia"
            className={`font-mono text-xs py-3 px-4 uppercase transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === 'stadium_trivia'
                ? 'border-b-2 border-[#00ff88] text-[#00ff88] font-bold'
                : 'text-[#ececed]/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>ESTÁDIO &amp; FATOS</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
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

          {/* SECTION 2: SALA DE TROFÉUS */}
          {activeSection === 'trophies' && (
            <div className="space-y-4">
              <div className="label opacity-60 mb-2">
                Conquistas oficiais mais prestigiadas registradas na galeria histórica do clube:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.trophies.map((trophy, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0b0c0d] border border-white/10 hover:border-[#00ff88]/40 p-4 sm:p-5 transition group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#141618] border border-[#00ff88] flex items-center justify-center text-[#00ff88] shrink-0">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-['Syne'] font-extrabold text-sm text-[#ececed] group-hover:text-[#00ff88] transition uppercase">
                            {trophy.title}
                          </h4>
                          <span className="font-mono text-xs font-bold text-[#00ff88]">
                            {trophy.count} {trophy.count === 1 ? 'TÍTULO' : 'TÍTULOS'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="label opacity-60 mb-1.5 font-medium">Anos das Conquistas:</p>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                        {trophy.years.map((year, yIdx) => (
                          <span
                            key={yIdx}
                            className="bg-[#141618] border border-white/10 text-[#ececed] font-mono text-[11px] px-2 py-0.5"
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

          {/* SECTION 3: ÍDOLOS ETERNOS */}
          {activeSection === 'legends' && (
            <div className="space-y-4">
              <div className="label opacity-60 mb-2">
                As maiores lendas que imortalizaram a camisa e forjaram a glória deste clube:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.legends.map((legend, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0b0c0d] border border-white/10 p-4 sm:p-5 flex flex-col justify-between hover:border-white/20 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 border border-[#00ff88]/30 font-bold">
                          {legend.era}
                        </span>
                        <span className="label opacity-60">
                          {legend.position}
                        </span>
                      </div>

                      <h4 className="font-['Syne'] font-extrabold text-base text-[#ececed] uppercase">
                        {legend.name}
                      </h4>

                      <p className="font-mono text-xs text-[#00ff88] font-bold mt-1">
                        📊 {legend.goalsOrMatches}
                      </p>

                      <p className="text-xs text-[#ececed]/80 mt-2.5 leading-relaxed">
                        {legend.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 label opacity-70">
                      <strong>Conquistas:</strong> {legend.achievements}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: GRANDES RIVALIDADES */}
          {activeSection === 'rivalries' && (
            <div className="space-y-4">
              <div className="label opacity-60 mb-2">
                Os confrontos que paralisam cidades e países inteiros:
              </div>

              <div className="space-y-3.5">
                {team.rivalries.map((rivalry, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0b0c0d] border border-white/10 p-4 sm:p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">⚔️</span>
                        <h4 className="font-['Syne'] font-extrabold text-sm text-[#ececed] uppercase">
                          {rivalry.derbyName} <span className="label opacity-60">vs {rivalry.rivalName}</span>
                        </h4>
                      </div>
                      <span className="font-mono text-[11px] text-[#00ff88] bg-[#141618] px-2.5 py-1 border border-white/10">
                        {rivalry.historicalRecord}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#ececed]/80 leading-relaxed mt-2">
                      {rivalry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: ESTÁDIO, HINO & CURIOSIDADES */}
          {activeSection === 'stadium_trivia' && (
            <div className="space-y-6">
              {/* Stadium Card */}
              <div className="bg-[#0b0c0d] border border-white/10 p-5">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
                  <MapPin className="w-4 h-4 text-[#00ff88]" />
                  <span className="font-mono uppercase">Estádio Oficial: {team.stadium.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center my-3 font-mono">
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="text-xs text-[#ececed]/50 uppercase">Capacidade</p>
                    <p className="text-sm font-bold text-[#00ff88] mt-0.5">{team.stadium.capacity}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="text-xs text-[#ececed]/50 uppercase">Inauguração</p>
                    <p className="text-sm font-bold text-[#ececed] mt-0.5">{team.stadium.opened}</p>
                  </div>
                  <div className="bg-[#141618] p-3 border border-white/10">
                    <p className="text-xs text-[#ececed]/50 uppercase">Alcunha</p>
                    <p className="text-sm font-bold text-[#ececed] mt-0.5">{team.stadium.popularNickname || 'Alçapão'}</p>
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
