import { SquadPlayer, TeamSeasonPerformance } from '../types';

export interface TeamExtraInfo {
  stadiumDetails?: {
    pitch: string;
    recordAttendance: string;
    address: string;
  };
  technicalStaff?: {
    assistantCoach: string;
    fitnessCoach: string;
    goalkeeperCoach: string;
  };
  uniformColors?: {
    homeKit: string;
    awayKit: string;
    thirdKit?: string;
    supplier: string;
  };
  seasonPerformance?: TeamSeasonPerformance;
  squad: SquadPlayer[];
}

export const TEAMS_EXTRA_DATA: Record<string, TeamExtraInfo> = {
  flamengo: {
    stadiumDetails: {
      pitch: 'Grama Natural Bermuda Celebration (105m x 68m)',
      recordAttendance: '194.603 torcedores (Brasil 1x2 Uruguai, Maracanazzo 1950) / 173.858 (Flamengo x Santos 1983)',
      address: 'Av. Pres. Castelo Branco, Portão 3 - Maracanã, Rio de Janeiro - RJ'
    },
    technicalStaff: {
      assistantCoach: 'Ivan Palanco & Márcio Torres',
      fitnessCoach: 'Diogo Linhares',
      goalkeeperCoach: 'Rogério Maia'
    },
    uniformColors: {
      homeKit: 'Camisa listrada rubro-negra horizontal, calção branco, meiões pretos',
      awayKit: 'Camisa branca com detalhes rubro-negros nos ombros, calção preto',
      thirdKit: 'Preta com detalhes furta-cor e escudo em dourado metálico',
      supplier: 'Adidas'
    },
    seasonPerformance: {
      currentPosition: '3º Lugar (Brasileirão Série A) • Campeão Copa do Brasil 2024',
      winRate: '68%',
      last5: ['V', 'V', 'E', 'V', 'D'],
      topScorer: { name: 'Pedro', goals: 30 },
      topAssister: { name: 'Arrascaeta', assists: 17 },
      goalsScored: 86,
      goalsConceded: 42,
      cleanSheets: 22,
      possessionAvg: 59
    },
    squad: [
      { id: 'fla-1', number: 1, name: 'Agustín Rossi', position: 'GOL', positionDetail: 'Goleiro Titular', age: 29, nationality: 'Argentina', flagEmoji: '🇦🇷', marketValue: '€ 7M', contractUntil: 'Dez/2027', photoEmoji: '🧤', seasonMatches: 44, seasonGoals: 0, seasonAssists: 0 },
      { id: 'fla-25', number: 25, name: 'Matheus Cunha', position: 'GOL', positionDetail: 'Goleiro Reserva', age: 23, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 4M', contractUntil: 'Dez/2026', photoEmoji: '🧤', seasonMatches: 12, seasonGoals: 0, seasonAssists: 0 },
      { id: 'fla-3', number: 3, name: 'Léo Ortiz', position: 'ZAG', positionDetail: 'Zagueiro Central', age: 28, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 9M', contractUntil: 'Dez/2028', photoEmoji: '🛡️', seasonMatches: 38, seasonGoals: 3, seasonAssists: 2 },
      { id: 'fla-4', number: 4, name: 'Léo Pereira', position: 'ZAG', positionDetail: 'Zagueiro Canhoto', age: 28, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 6.5M', contractUntil: 'Dez/2027', photoEmoji: '🛡️', seasonMatches: 45, seasonGoals: 4, seasonAssists: 1 },
      { id: 'fla-15', number: 15, name: 'Fabrício Bruno', position: 'ZAG', positionDetail: 'Zagueiro Rápido', age: 28, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 6M', contractUntil: 'Dez/2028', photoEmoji: '🛡️', seasonMatches: 49, seasonGoals: 2, seasonAssists: 0 },
      { id: 'fla-2', number: 2, name: 'Guillermo Varela', position: 'LAT', positionDetail: 'Lateral-Direito', age: 31, nationality: 'Uruguai', flagEmoji: '🇺🇾', marketValue: '€ 2.5M', contractUntil: 'Dez/2025', photoEmoji: '🏃', seasonMatches: 39, seasonGoals: 1, seasonAssists: 3 },
      { id: 'fla-43', number: 43, name: 'Wesley', position: 'LAT', positionDetail: 'Lateral-Direito Ofensivo', age: 21, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 12M', contractUntil: 'Dez/2028', photoEmoji: '⚡', seasonMatches: 42, seasonGoals: 2, seasonAssists: 4 },
      { id: 'fla-26', number: 26, name: 'Alex Sandro', position: 'LAT', positionDetail: 'Lateral-Esquerdo Experiente', age: 33, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 3.5M', contractUntil: 'Dez/2026', photoEmoji: '🏃', seasonMatches: 14, seasonGoals: 1, seasonAssists: 2 },
      { id: 'fla-6', number: 6, name: 'Ayrton Lucas', position: 'LAT', positionDetail: 'Lateral-Esquerdo', age: 27, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 7M', contractUntil: 'Dez/2027', photoEmoji: '⚡', seasonMatches: 48, seasonGoals: 4, seasonAssists: 6 },
      { id: 'fla-5', number: 5, name: 'Erick Pulgar', position: 'VOL', positionDetail: 'Primeiro Volante', age: 30, nationality: 'Chile', flagEmoji: '🇨🇱', marketValue: '€ 6M', contractUntil: 'Dez/2025', photoEmoji: '⚓', seasonMatches: 41, seasonGoals: 1, seasonAssists: 4 },
      { id: 'fla-8', number: 8, name: 'Gerson', position: 'VOL', positionDetail: 'Segundo Volante / Capitão', age: 27, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 18M', contractUntil: 'Dez/2027', isCaptain: true, photoEmoji: '🃏', seasonMatches: 46, seasonGoals: 6, seasonAssists: 11 },
      { id: 'fla-18', number: 18, name: 'Nicolás De La Cruz', position: 'MEI', positionDetail: 'Meia Central Box-to-Box', age: 27, nationality: 'Uruguai', flagEmoji: '🇺🇾', marketValue: '€ 18M', contractUntil: 'Dez/2028', photoEmoji: '🔥', seasonMatches: 36, seasonGoals: 3, seasonAssists: 7 },
      { id: 'fla-37', number: 37, name: 'Carlos Alcaraz', position: 'MEI', positionDetail: 'Meio-Campista Moderno', age: 21, nationality: 'Argentina', flagEmoji: '🇦🇷', marketValue: '€ 15M', contractUntil: 'Ago/2029', photoEmoji: '⭐', seasonMatches: 16, seasonGoals: 2, seasonAssists: 3 },
      { id: 'fla-14', number: 14, name: 'Giorgian de Arrascaeta', position: 'MEI', positionDetail: 'Meia Armador / Camisa 10', age: 30, nationality: 'Uruguai', flagEmoji: '🇺🇾', marketValue: '€ 15M', contractUntil: 'Dez/2026', photoEmoji: '🎩', seasonMatches: 38, seasonGoals: 12, seasonAssists: 17 },
      { id: 'fla-7', number: 7, name: 'Luiz Araújo', position: 'ATA', positionDetail: 'Ponta-Direita Canhoto', age: 28, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 8M', contractUntil: 'Dez/2027', photoEmoji: '⚡', seasonMatches: 45, seasonGoals: 7, seasonAssists: 10 },
      { id: 'fla-11', number: 11, name: 'Bruno Henrique', position: 'ATA', positionDetail: 'Atacante de Velocidade', age: 33, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 3M', contractUntil: 'Dez/2026', photoEmoji: '⚡', seasonMatches: 46, seasonGoals: 9, seasonAssists: 6 },
      { id: 'fla-30', number: 30, name: 'Michael', position: 'ATA', positionDetail: 'Ponta Driblador', age: 28, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 7M', contractUntil: 'Dez/2028', photoEmoji: '🌪️', seasonMatches: 15, seasonGoals: 4, seasonAssists: 3 },
      { id: 'fla-9', number: 9, name: 'Pedro', position: 'ATA', positionDetail: 'Centroavante / Artilheiro', age: 27, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 23M', contractUntil: 'Dez/2027', photoEmoji: '👑', seasonMatches: 43, seasonGoals: 30, seasonAssists: 8 },
      { id: 'fla-99', number: 99, name: 'Gabriel Barbosa (Gabigol)', position: 'ATA', positionDetail: 'Atacante Decisivo', age: 28, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 8M', contractUntil: 'Dez/2024', photoEmoji: '💪', seasonMatches: 35, seasonGoals: 7, seasonAssists: 2 }
    ]
  },

  palmeiras: {
    stadiumDetails: {
      pitch: 'Grama Sintética Holandesa Certificada FIFA Pro (105m x 68m)',
      recordAttendance: '41.457 torcedores (Palmeiras 2x1 São Paulo, Paulistão 2023)',
      address: 'Rua Palestra Itália, 200 - Perdizes, São Paulo - SP'
    },
    technicalStaff: {
      assistantCoach: 'João Martins & Vitor Castanheira',
      fitnessCoach: 'Carlos Martinho',
      goalkeeperCoach: 'Rogério Godoy'
    },
    uniformColors: {
      homeKit: 'Camisa verde esmeralda com grafismos geométricos, calção branco',
      awayKit: 'Camisa branca com detalhes em verde e gola clássica polo',
      thirdKit: 'Verde neon com detalhes em dourado brilhante',
      supplier: 'Puma'
    },
    seasonPerformance: {
      currentPosition: '2º Lugar (Brasileirão Série A) • Campeão Paulistão 2024',
      winRate: '66%',
      last5: ['V', 'V', 'V', 'E', 'D'],
      topScorer: { name: 'Estêvão', goals: 16 },
      topAssister: { name: 'Raphael Veiga', assists: 12 },
      goalsScored: 79,
      goalsConceded: 35,
      cleanSheets: 24,
      possessionAvg: 56
    },
    squad: [
      { id: 'pal-21', number: 21, name: 'Weverton', position: 'GOL', positionDetail: 'Goleiro / Campeão Olímpico', age: 36, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 2M', contractUntil: 'Dez/2026', photoEmoji: '🧤', seasonMatches: 50, seasonGoals: 0, seasonAssists: 0 },
      { id: 'pal-15', number: 15, name: 'Gustavo Gómez', position: 'ZAG', positionDetail: 'Zagueiro Central / Capitão', age: 31, nationality: 'Paraguai', flagEmoji: '🇵🇾', marketValue: '€ 7M', contractUntil: 'Dez/2026', isCaptain: true, photoEmoji: '🛡️', seasonMatches: 46, seasonGoals: 4, seasonAssists: 1 },
      { id: 'pal-26', number: 26, name: 'Murilo', position: 'ZAG', positionDetail: 'Zagueiro Artilheiro', age: 27, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 8M', contractUntil: 'Dez/2027', photoEmoji: '🛡️', seasonMatches: 44, seasonGoals: 5, seasonAssists: 2 },
      { id: 'pal-2', number: 2, name: 'Marcos Rocha', position: 'LAT', positionDetail: 'Lateral-Direito / Lateral Construtor', age: 35, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 1M', contractUntil: 'Dez/2025', photoEmoji: '🏃', seasonMatches: 38, seasonGoals: 1, seasonAssists: 5 },
      { id: 'pal-12', number: 12, name: 'Mayke', position: 'LAT', positionDetail: 'Lateral-Direito / Ala', age: 31, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 3M', contractUntil: 'Dez/2025', photoEmoji: '⚡', seasonMatches: 36, seasonGoals: 2, seasonAssists: 4 },
      { id: 'pal-22', number: 22, name: 'Joaquín Piquerez', position: 'LAT', positionDetail: 'Lateral-Esquerdo', age: 26, nationality: 'Uruguai', flagEmoji: '🇺🇾', marketValue: '€ 13M', contractUntil: 'Dez/2026', photoEmoji: '🚀', seasonMatches: 37, seasonGoals: 4, seasonAssists: 6 },
      { id: 'pal-5', number: 5, name: 'Aníbal Moreno', position: 'VOL', positionDetail: 'Primeiro Volante Cão de Guarda', age: 25, nationality: 'Argentina', flagEmoji: '🇦🇷', marketValue: '€ 10M', contractUntil: 'Dez/2028', photoEmoji: '⚓', seasonMatches: 49, seasonGoals: 3, seasonAssists: 2 },
      { id: 'pal-27', number: 27, name: 'Richard Ríos', position: 'VOL', positionDetail: 'Meio-Campista Driblador', age: 24, nationality: 'Colômbia', flagEmoji: '🇨🇴', marketValue: '€ 14M', contractUntil: 'Dez/2028', photoEmoji: '🌪️', seasonMatches: 47, seasonGoals: 4, seasonAssists: 4 },
      { id: 'pal-8', number: 8, name: 'Zé Rafael', position: 'VOL', positionDetail: 'Volante Box-to-Box', age: 31, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 4M', contractUntil: 'Dez/2026', photoEmoji: '💪', seasonMatches: 39, seasonGoals: 2, seasonAssists: 3 },
      { id: 'pal-23', number: 23, name: 'Raphael Veiga', position: 'MEI', positionDetail: 'Meia Armador / Cobrador de Pênalti', age: 29, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 16M', contractUntil: 'Dez/2027', photoEmoji: '🎯', seasonMatches: 44, seasonGoals: 18, seasonAssists: 12 },
      { id: 'pal-18', number: 18, name: 'Maurício', position: 'MEI', positionDetail: 'Meia Ofensivo Dinâmico', age: 23, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 12M', contractUntil: 'Dez/2029', photoEmoji: '🔥', seasonMatches: 24, seasonGoals: 5, seasonAssists: 3 },
      { id: 'pal-9', number: 9, name: 'Felipe Anderson', position: 'ATA', positionDetail: 'Ponta Criativo', age: 31, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 8M', contractUntil: 'Dez/2027', photoEmoji: '🎨', seasonMatches: 22, seasonGoals: 3, seasonAssists: 4 },
      { id: 'pal-41', number: 41, name: 'Estêvão', position: 'ATA', positionDetail: 'Ponta-Direita Fenômeno', age: 17, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 45M', contractUntil: 'Jul/2025 (Chelsea)', photoEmoji: '💎', seasonMatches: 32, seasonGoals: 14, seasonAssists: 9 },
      { id: 'pal-42', number: 42, name: 'José "Flaco" López', position: 'ATA', positionDetail: 'Centroavante Canhoto', age: 24, nationality: 'Argentina', flagEmoji: '🇦🇷', marketValue: '€ 9M', contractUntil: 'Dez/2027', photoEmoji: '🎯', seasonMatches: 46, seasonGoals: 21, seasonAssists: 7 },
      { id: 'pal-7', number: 7, name: 'Dudu', position: 'ATA', positionDetail: 'Ídolo e Camisa 7', age: 32, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 3.5M', contractUntil: 'Dez/2025', photoEmoji: '⭐', seasonMatches: 18, seasonGoals: 2, seasonAssists: 2 },
      { id: 'pal-10', number: 10, name: 'Rony', position: 'ATA', positionDetail: 'Atacante de Velocidade e Bike', age: 29, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 5M', contractUntil: 'Dez/2026', photoEmoji: '🚴', seasonMatches: 45, seasonGoals: 9, seasonAssists: 5 }
    ]
  },

  real_madrid: {
    stadiumDetails: {
      pitch: 'Grama Híbrida Retrátil Subterrânea com Luzes LED (105m x 68m)',
      recordAttendance: '85.454 espectadores (modernizado com teto retrátil)',
      address: 'Av. de Concha Espina, 1 - Chamartín, 28036 Madrid, Espanha'
    },
    technicalStaff: {
      assistantCoach: 'Davide Ancelotti',
      fitnessCoach: 'Antonio Pintus (O Sargento de Ferro)',
      goalkeeperCoach: 'Luis Llopis'
    },
    uniformColors: {
      homeKit: 'Branco imperial com sutis detalhes em padrão pied-de-poule',
      awayKit: 'Laranja brilhante com detalhes metálicos prateados',
      thirdKit: 'Cinza carvão com monograma "RMCF" em relevo',
      supplier: 'Adidas'
    },
    seasonPerformance: {
      currentPosition: '2º Lugar (La Liga) • Campeão Supercopa UEFA & Champions 2024',
      winRate: '75%',
      last5: ['V', 'V', 'V', 'E', 'V'],
      topScorer: { name: 'Kylian Mbappé', goals: 28 },
      topAssister: { name: 'Vinicius Jr', assists: 11 },
      goalsScored: 94,
      goalsConceded: 32,
      cleanSheets: 20,
      possessionAvg: 62
    },
    squad: [
      { id: 'rma-1', number: 1, name: 'Thibaut Courtois', position: 'GOL', positionDetail: 'Goleiro Paredão Belga', age: 32, nationality: 'Bélgica', flagEmoji: '🇧🇪', marketValue: '€ 28M', contractUntil: 'Jun/2026', photoEmoji: '🧤', seasonMatches: 30, seasonGoals: 0, seasonAssists: 0 },
      { id: 'rma-13', number: 13, name: 'Andriy Lunin', position: 'GOL', positionDetail: 'Goleiro Ucraniano', age: 25, nationality: 'Ucrânia', flagEmoji: '🇺🇦', marketValue: '€ 25M', contractUntil: 'Jun/2030', photoEmoji: '🧤', seasonMatches: 18, seasonGoals: 0, seasonAssists: 0 },
      { id: 'rma-22', number: 22, name: 'Antonio Rüdiger', position: 'ZAG', positionDetail: 'Zagueiro Central Agressivo', age: 31, nationality: 'Alemanha', flagEmoji: '🇩🇪', marketValue: '€ 25M', contractUntil: 'Jun/2026', photoEmoji: '🛡️', seasonMatches: 44, seasonGoals: 3, seasonAssists: 1 },
      { id: 'rma-3', number: 3, name: 'Éder Militão', position: 'ZAG', positionDetail: 'Zagueiro Rápido', age: 26, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 60M', contractUntil: 'Jun/2028', photoEmoji: '🛡️', seasonMatches: 34, seasonGoals: 2, seasonAssists: 1 },
      { id: 'rma-2', number: 2, name: 'Dani Carvajal', position: 'LAT', positionDetail: 'Lateral-Direito / Capitão', age: 32, nationality: 'Espanha', flagEmoji: '🇪🇸', marketValue: '€ 12M', contractUntil: 'Jun/2026', isCaptain: true, photoEmoji: '🏃', seasonMatches: 38, seasonGoals: 4, seasonAssists: 5 },
      { id: 'rma-23', number: 23, name: 'Ferland Mendy', position: 'LAT', positionDetail: 'Lateral-Esquerdo Defensivo', age: 29, nationality: 'França', flagEmoji: '🇫🇷', marketValue: '€ 22M', contractUntil: 'Jun/2027', photoEmoji: '🛡️', seasonMatches: 36, seasonGoals: 1, seasonAssists: 2 },
      { id: 'rma-14', number: 14, name: 'Aurélien Tchouaméni', position: 'VOL', positionDetail: 'Primeiro Volante Físico', age: 24, nationality: 'França', flagEmoji: '🇫🇷', marketValue: '€ 100M', contractUntil: 'Jun/2028', photoEmoji: '⚓', seasonMatches: 41, seasonGoals: 3, seasonAssists: 3 },
      { id: 'rma-6', number: 6, name: 'Eduardo Camavinga', position: 'VOL', positionDetail: 'Volante / Lateral Polivalente', age: 21, nationality: 'França', flagEmoji: '🇫🇷', marketValue: '€ 100M', contractUntil: 'Jun/2029', photoEmoji: '⚡', seasonMatches: 39, seasonGoals: 2, seasonAssists: 4 },
      { id: 'rma-8', number: 8, name: 'Federico Valverde', position: 'MEI', positionDetail: 'Meia Pulmão / Chute Foguete', age: 26, nationality: 'Uruguai', flagEmoji: '🇺🇾', marketValue: '€ 130M', contractUntil: 'Jun/2029', photoEmoji: '🦅', seasonMatches: 48, seasonGoals: 8, seasonAssists: 9 },
      { id: 'rma-5', number: 5, name: 'Jude Bellingham', position: 'MEI', positionDetail: 'Meia Ofensivo Box-to-Box', age: 21, nationality: 'Inglaterra', flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', marketValue: '€ 180M', contractUntil: 'Jun/2029', photoEmoji: '🌟', seasonMatches: 40, seasonGoals: 23, seasonAssists: 13 },
      { id: 'rma-10', number: 10, name: 'Luka Modrić', position: 'MEI', positionDetail: 'Maestro Croata / Bola de Ouro', age: 39, nationality: 'Croácia', flagEmoji: '🇭🇷', marketValue: '€ 6M', contractUntil: 'Jun/2025', photoEmoji: '🪄', seasonMatches: 36, seasonGoals: 3, seasonAssists: 8 },
      { id: 'rma-7', number: 7, name: 'Vinicius Jr', position: 'ATA', positionDetail: 'Ponta-Esquerda Estrela Mundial', age: 24, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 200M', contractUntil: 'Jun/2027', photoEmoji: '⚡', seasonMatches: 39, seasonGoals: 24, seasonAssists: 11 },
      { id: 'rma-9', number: 9, name: 'Kylian Mbappé', position: 'ATA', positionDetail: 'Centroavante / Artilheiro', age: 25, nationality: 'França', flagEmoji: '🇫🇷', marketValue: '€ 180M', contractUntil: 'Jun/2029', photoEmoji: '🚀', seasonMatches: 37, seasonGoals: 28, seasonAssists: 7 },
      { id: 'rma-11', number: 11, name: 'Rodrygo', position: 'ATA', positionDetail: 'Ponta Decisivo em Champions', age: 23, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 110M', contractUntil: 'Jun/2028', photoEmoji: '⭐', seasonMatches: 42, seasonGoals: 16, seasonAssists: 11 },
      { id: 'rma-15', number: 15, name: 'Arda Güler', position: 'MEI', positionDetail: 'Jóia Turca Canhota', age: 19, nationality: 'Turquia', flagEmoji: '🇹🇷', marketValue: '€ 45M', contractUntil: 'Jun/2029', photoEmoji: '💎', seasonMatches: 22, seasonGoals: 6, seasonAssists: 4 },
      { id: 'rma-16', number: 16, name: 'Endrick', position: 'ATA', positionDetail: 'Atacante Prodígio Brasileiro', age: 18, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 60M', contractUntil: 'Jun/2030', photoEmoji: '🐂', seasonMatches: 20, seasonGoals: 6, seasonAssists: 1 }
    ]
  },

  corinthians: {
    stadiumDetails: {
      pitch: 'Grama Natural Ryegrass Perene com Refrigeração Subsolo (105m x 68m)',
      recordAttendance: '49.055 torcedores (Copa do Mundo 2014) / 46.517 (Corinthians x São Paulo 2023)',
      address: 'Av. Miguel Ignácio Curi, 111 - Artur Alvim, São Paulo - SP'
    },
    technicalStaff: {
      assistantCoach: 'Emiliano Díaz',
      fitnessCoach: 'Diego Pereira',
      goalkeeperCoach: 'Luiz Fernando dos Santos'
    },
    uniformColors: {
      homeKit: 'Camisa branca clássica com degradê cinza, calção preto',
      awayKit: 'Listrada vertical alvinegra tradicional',
      thirdKit: 'Preta antirracista com frase "Uma história de luta"',
      supplier: 'Nike'
    },
    seasonPerformance: {
      currentPosition: 'Subindo na tabela do Brasileirão • Semifinalista Copa do Brasil e Sul-Americana',
      winRate: '54%',
      last5: ['V', 'V', 'V', 'E', 'V'],
      topScorer: { name: 'Yuri Alberto', goals: 26 },
      topAssister: { name: 'Rodrigo Garro', assists: 14 },
      goalsScored: 74,
      goalsConceded: 58,
      cleanSheets: 16,
      possessionAvg: 51
    },
    squad: [
      { id: 'cor-1', number: 1, name: 'Hugo Souza', position: 'GOL', positionDetail: 'Goleiro Pegador de Pênaltis', age: 25, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 4M', contractUntil: 'Dez/2028', photoEmoji: '🧤', seasonMatches: 32, seasonGoals: 0, seasonAssists: 0 },
      { id: 'cor-5', number: 5, name: 'André Ramalho', position: 'ZAG', positionDetail: 'Zagueiro Xerife Líder', age: 32, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 2.5M', contractUntil: 'Dez/2026', photoEmoji: '🛡️', seasonMatches: 26, seasonGoals: 1, seasonAssists: 1 },
      { id: 'cor-25', number: 25, name: 'Cacá', position: 'ZAG', positionDetail: 'Zagueiro Central', age: 25, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 3M', contractUntil: 'Dez/2027', photoEmoji: '🛡️', seasonMatches: 38, seasonGoals: 5, seasonAssists: 1 },
      { id: 'cor-3', number: 3, name: 'Félix Torres', position: 'ZAG', positionDetail: 'Zagueiro Seleção Equatoriana', age: 27, nationality: 'Equador', flagEmoji: '🇪🇨', marketValue: '€ 5M', contractUntil: 'Dez/2027', photoEmoji: '🛡️', seasonMatches: 44, seasonGoals: 1, seasonAssists: 0 },
      { id: 'cor-2', number: 2, name: 'Matheuzinho', position: 'LAT', positionDetail: 'Lateral-Direito Rápido', age: 24, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 4M', contractUntil: 'Dez/2028', photoEmoji: '🏃', seasonMatches: 45, seasonGoals: 2, seasonAssists: 4 },
      { id: 'cor-46', number: 46, name: 'Hugo', position: 'LAT', positionDetail: 'Lateral-Esquerdo', age: 27, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 2M', contractUntil: 'Dez/2026', photoEmoji: '🏃', seasonMatches: 40, seasonGoals: 0, seasonAssists: 2 },
      { id: 'cor-14', number: 14, name: 'Raniele', position: 'VOL', positionDetail: 'Volante Marcador Implacável', age: 27, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 4.5M', contractUntil: 'Dez/2028', photoEmoji: '⚓', seasonMatches: 47, seasonGoals: 1, seasonAssists: 1 },
      { id: 'cor-80', number: 80, name: 'Alex Santana', position: 'VOL', positionDetail: 'Segundo Volante Físico', age: 29, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 2.5M', contractUntil: 'Dez/2027', photoEmoji: '💪', seasonMatches: 18, seasonGoals: 1, seasonAssists: 1 },
      { id: 'cor-70', number: 70, name: 'José Martínez', position: 'VOL', positionDetail: 'Volante Venezuelano', age: 30, nationality: 'Venezuela', flagEmoji: '🇻🇪', marketValue: '€ 2.5M', contractUntil: 'Dez/2027', photoEmoji: '⚓', seasonMatches: 15, seasonGoals: 0, seasonAssists: 1 },
      { id: 'cor-77', number: 77, name: 'Igor Coronado', position: 'MEI', positionDetail: 'Meia Refinado Criativo', age: 32, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 4M', contractUntil: 'Dez/2026', photoEmoji: '🪄', seasonMatches: 36, seasonGoals: 4, seasonAssists: 5 },
      { id: 'cor-10', number: 10, name: 'Rodrigo Garro', position: 'MEI', positionDetail: 'Camisa 10 / Mago da Fiel', age: 26, nationality: 'Argentina', flagEmoji: '🇦🇷', marketValue: '€ 12M', contractUntil: 'Dez/2027', isCaptain: true, photoEmoji: '🦅', seasonMatches: 48, seasonGoals: 10, seasonAssists: 14 },
      { id: 'cor-19', number: 19, name: 'André Carrillo', position: 'MEI', positionDetail: 'Meia Extremo Peruano', age: 33, nationality: 'Peru', flagEmoji: '🇵🇪', marketValue: '€ 1.5M', contractUntil: 'Dez/2025', photoEmoji: '🇵🇪', seasonMatches: 16, seasonGoals: 1, seasonAssists: 3 },
      { id: 'cor-9', number: 9, name: 'Yuri Alberto', position: 'ATA', positionDetail: 'Centroavante Goleador', age: 23, nationality: 'Brasil', flagEmoji: '🇧🇷', marketValue: '€ 15M', contractUntil: 'Dez/2027', photoEmoji: '⚽', seasonMatches: 52, seasonGoals: 26, seasonAssists: 7 },
      { id: 'cor-94', number: 94, name: 'Memphis Depay', position: 'ATA', positionDetail: 'Estrela Internacional Holandesa', age: 30, nationality: 'Holanda', flagEmoji: '🇳🇱', marketValue: '€ 10M', contractUntil: 'Dez/2026', photoEmoji: '🦁', seasonMatches: 22, seasonGoals: 9, seasonAssists: 7 },
      { id: 'cor-11', number: 11, name: 'Ángel Romero', position: 'ATA', positionDetail: 'Maior Artilheiro Estrangeiro', age: 32, nationality: 'Paraguai', flagEmoji: '🇵🇾', marketValue: '€ 1.5M', contractUntil: 'Dez/2025', photoEmoji: '🇵🇾', seasonMatches: 49, seasonGoals: 14, seasonAssists: 4 }
    ]
  }
};
