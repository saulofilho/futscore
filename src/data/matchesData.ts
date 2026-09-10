import { Match } from '../types';

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-1',
    league: 'Brasileirão Betano Série A',
    leagueIcon: '🇧🇷',
    round: 'Rodada 28',
    status: 'LIVE',
    minute: 74,
    date: 'Hoje',
    dateIso: '2026-09-09',
    time: 'Ao Vivo',
    stadium: 'Maracanã, Rio de Janeiro',
    referee: 'Wilton Pereira Sampaio (FIFA)',
    homeTeam: {
      id: 'flamengo',
      name: 'Flamengo',
      shortName: 'FLA',
      badgeEmoji: '🔴⚫',
      primaryColor: '#c8102e',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'palmeiras',
      name: 'Palmeiras',
      shortName: 'PAL',
      badgeEmoji: '🟢⚪',
      primaryColor: '#006437',
      secondaryColor: '#ffffff'
    },
    homeScore: 2,
    awayScore: 1,
    events: [
      {
        id: 'ev-1',
        minute: 18,
        type: 'goal',
        team: 'home',
        player: 'Pedro',
        assist: 'Gerson',
        detail: 'Chute cruzado no ângulo direito após tabela na entrada da área'
      },
      {
        id: 'ev-2',
        minute: 34,
        type: 'yellow_card',
        team: 'away',
        player: 'Gustavo Gómez',
        detail: 'Falta tática para interromper contra-ataque promissor'
      },
      {
        id: 'ev-3',
        minute: 45,
        type: 'goal',
        team: 'away',
        player: 'Estêvão',
        assist: 'Raphael Veiga',
        detail: 'Golaço de canhota da quina da grande área após drible curto'
      },
      {
        id: 'ev-4',
        minute: 57,
        type: 'goal',
        team: 'home',
        player: 'G. Arrascaeta',
        assist: 'Luiz Araújo',
        detail: 'Cobrança magistral de falta direta por cima da barreira'
      },
      {
        id: 'ev-5',
        minute: 68,
        type: 'yellow_card',
        team: 'home',
        player: 'Erick Pulgar',
        detail: 'Entrada dura no meio de campo'
      },
      {
        id: 'ev-6',
        minute: 71,
        type: 'var',
        team: 'away',
        player: 'Árbitro de Vídeo',
        detail: 'Possível pênalti para o Palmeiras checado e não assinalado'
      }
    ],
    stats: {
      possession: [56, 44],
      shotsTotal: [14, 11],
      shotsOnTarget: [6, 4],
      xG: [1.82, 1.25],
      corners: [7, 5],
      fouls: [12, 15],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [1, 2],
      bigChances: [3, 2],
      passesTotal: [488, 382],
      passAccuracy: [88, 81],
      goalkeeperSaves: [3, 4]
    },
    lineupHome: {
      formation: '4-2-3-1',
      coach: 'Filipe Luís',
      starters: [
        { number: 1, name: 'Rossi', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.2 },
        { number: 2, name: 'Varela', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 6.8 },
        { number: 3, name: 'Léo Ortiz', position: 'ZAG', gridPos: { x: 65, y: 75 }, rating: 7.4 },
        { number: 4, name: 'Léo Pereira', position: 'ZAG', gridPos: { x: 35, y: 75 }, rating: 7.1 },
        { number: 6, name: 'Alex Sandro', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.0 },
        { number: 5, name: 'Erick Pulgar', position: 'VOL', gridPos: { x: 38, y: 55 }, rating: 6.9 },
        { number: 8, name: 'Gerson', position: 'VOL', gridPos: { x: 62, y: 55 }, rating: 8.2, captain: true },
        { number: 7, name: 'Luiz Araújo', position: 'MEI', gridPos: { x: 80, y: 35 }, rating: 7.5 },
        { number: 14, name: 'Arrascaeta', position: 'MEI', gridPos: { x: 50, y: 32 }, rating: 8.6 },
        { number: 11, name: 'Bruno Henrique', position: 'MEI', gridPos: { x: 20, y: 35 }, rating: 7.0 },
        { number: 9, name: 'Pedro', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 8.3 }
      ],
      substitutes: ['Matheus Cunha (G)', 'Fabrício Bruno', 'Ayrton Lucas', 'Allan', 'Alcaraz', 'De la Cruz', 'Michael', 'Gabigol']
    },
    lineupAway: {
      formation: '4-3-3',
      coach: 'Abel Ferreira',
      starters: [
        { number: 21, name: 'Weverton', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 7.0 },
        { number: 2, name: 'Marcos Rocha', position: 'LAT', gridPos: { x: 85, y: 25 }, rating: 6.5 },
        { number: 15, name: 'Gustavo Gómez', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 6.9, captain: true },
        { number: 26, name: 'Murilo', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 6.8 },
        { number: 22, name: 'Joaquín Piquerez', position: 'LAT', gridPos: { x: 15, y: 25 }, rating: 7.1 },
        { number: 8, name: 'Zé Rafael', position: 'VOL', gridPos: { x: 35, y: 45 }, rating: 6.7 },
        { number: 27, name: 'Richard Ríos', position: 'VOL', gridPos: { x: 65, y: 45 }, rating: 7.2 },
        { number: 23, name: 'Raphael Veiga', position: 'MEI', gridPos: { x: 50, y: 55 }, rating: 7.8 },
        { number: 41, name: 'Estêvão', position: 'ATA', gridPos: { x: 80, y: 70 }, rating: 8.1 },
        { number: 42, name: 'Flaco López', position: 'ATA', gridPos: { x: 50, y: 80 }, rating: 6.6 },
        { number: 7, name: 'Dudu', position: 'ATA', gridPos: { x: 20, y: 70 }, rating: 6.9 }
      ],
      substitutes: ['Marcelo Lomba (G)', 'Mayke', 'Vanderlan', 'Aníbal Moreno', 'Maurício', 'Felipe Anderson', 'Rony', 'Lázaro']
    },
    h2h: {
      homeWins: 44,
      draws: 36,
      awayWins: 48,
      lastMatches: ['FLA 1x1 PAL', 'PAL 0x2 FLA', 'FLA 3x0 PAL', 'PAL 2x1 FLA', 'FLA 0x0 PAL']
    }
  },

  {
    id: 'match-2',
    league: 'UEFA Champions League',
    leagueIcon: '⭐',
    round: 'Quartas de Final - Ida',
    status: 'LIVE',
    minute: 62,
    date: 'Hoje',
    dateIso: '2026-09-09',
    time: 'Ao Vivo',
    stadium: 'Santiago Bernabéu, Madri',
    referee: 'Clément Turpin (França)',
    homeTeam: {
      id: 'real_madrid',
      name: 'Real Madrid',
      shortName: 'RMA',
      badgeEmoji: '👑⚪',
      primaryColor: '#ffffff',
      secondaryColor: '#001c58'
    },
    awayTeam: {
      id: 'manchester_city',
      name: 'Manchester City',
      shortName: 'MCI',
      badgeEmoji: '🔵⚪',
      primaryColor: '#6cabdd',
      secondaryColor: '#1c2c5b'
    },
    homeScore: 2,
    awayScore: 2,
    events: [
      {
        id: 'ev-21',
        minute: 7,
        type: 'goal',
        team: 'away',
        player: 'Bernardo Silva',
        assist: 'Jack Grealish',
        detail: 'Chute rasteiro surpreendente de falta direta na gaveta inferior'
      },
      {
        id: 'ev-22',
        minute: 14,
        type: 'goal',
        team: 'home',
        player: 'Eduardo Camavinga',
        assist: 'Vinicius Jr',
        detail: 'Disparo de longa distância com desvio fatal no defensor'
      },
      {
        id: 'ev-23',
        minute: 18,
        type: 'goal',
        team: 'home',
        player: 'Rodrygo',
        assist: 'Vinicius Jr',
        detail: 'Arrancada espetacular pela meia esquerda e toque sutil na saída do goleiro'
      },
      {
        id: 'ev-24',
        minute: 54,
        type: 'goal',
        team: 'away',
        player: 'Phil Foden',
        assist: 'John Stones',
        detail: 'Bomba teleguiada de perna esquerda no ângulo sem chance para Lunin'
      },
      {
        id: 'ev-25',
        minute: 59,
        type: 'yellow_card',
        team: 'away',
        player: 'Rúben Dias',
        detail: 'Falta violenta para parar contra-golpe de Bellingham'
      }
    ],
    stats: {
      possession: [42, 58],
      shotsTotal: [16, 17],
      shotsOnTarget: [7, 8],
      xG: [1.94, 2.10],
      corners: [6, 9],
      fouls: [10, 8],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [3, 1],
      bigChances: [4, 4],
      passesTotal: [390, 620],
      passAccuracy: [85, 93],
      goalkeeperSaves: [6, 5]
    },
    lineupHome: {
      formation: '4-3-1-2',
      coach: 'Carlo Ancelotti',
      starters: [
        { number: 13, name: 'Andriy Lunin', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.1 },
        { number: 2, name: 'Dani Carvajal', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.3, captain: true },
        { number: 22, name: 'Antonio Rüdiger', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.6 },
        { number: 18, name: 'Aurélien Tchouaméni', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.0 },
        { number: 23, name: 'Ferland Mendy', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 6.9 },
        { number: 15, name: 'Fede Valverde', position: 'MC', gridPos: { x: 75, y: 55 }, rating: 8.0 },
        { number: 12, name: 'Eduardo Camavinga', position: 'MC', gridPos: { x: 50, y: 60 }, rating: 8.2 },
        { number: 8, name: 'Toni Kroos', position: 'MC', gridPos: { x: 25, y: 55 }, rating: 7.9 },
        { number: 5, name: 'Jude Bellingham', position: 'MEI', gridPos: { x: 50, y: 38 }, rating: 8.3 },
        { number: 11, name: 'Rodrygo Goes', position: 'ATA', gridPos: { x: 68, y: 18 }, rating: 8.5 },
        { number: 7, name: 'Vinicius Jr', position: 'ATA', gridPos: { x: 32, y: 18 }, rating: 8.8 }
      ],
      substitutes: ['Kepa (G)', 'Éder Militão', 'Nacho', 'Lucas Vázquez', 'Fran García', 'Modrić', 'Ceballos', 'Arda Güler', 'Brahim Díaz', 'Joselu']
    },
    lineupAway: {
      formation: '4-2-3-1',
      coach: 'Pep Guardiola',
      starters: [
        { number: 18, name: 'Stefan Ortega', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 6.9 },
        { number: 25, name: 'Manuel Akanji', position: 'LAT', gridPos: { x: 85, y: 24 }, rating: 6.8 },
        { number: 5, name: 'John Stones', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 7.5 },
        { number: 3, name: 'Rúben Dias', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 7.0, captain: true },
        { number: 24, name: 'Josko Gvardiol', position: 'LAT', gridPos: { x: 15, y: 24 }, rating: 7.8 },
        { number: 16, name: 'Rodri', position: 'VOL', gridPos: { x: 40, y: 44 }, rating: 8.1 },
        { number: 8, name: 'Mateo Kovacic', position: 'VOL', gridPos: { x: 60, y: 44 }, rating: 7.2 },
        { number: 20, name: 'Bernardo Silva', position: 'MEI', gridPos: { x: 80, y: 62 }, rating: 8.4 },
        { number: 47, name: 'Phil Foden', position: 'MEI', gridPos: { x: 50, y: 64 }, rating: 8.7 },
        { number: 10, name: 'Jack Grealish', position: 'MEI', gridPos: { x: 20, y: 62 }, rating: 7.4 },
        { number: 9, name: 'Erling Haaland', position: 'ATA', gridPos: { x: 50, y: 82 }, rating: 7.0 }
      ],
      substitutes: ['Ederson (G)', 'Carson (G)', 'Rico Lewis', 'Sergio Gómez', 'Matheus Nunes', 'Kevin De Bruyne', 'Jérémy Doku', 'Julián Álvarez']
    },
    h2h: {
      homeWins: 4,
      draws: 4,
      awayWins: 4,
      lastMatches: ['MCI 1x1 RMA (3x4 pên)', 'RMA 3x3 MCI', 'MCI 4x0 RMA', 'RMA 1x1 MCI', 'RMA 3x1 MCI']
    }
  },

  {
    id: 'match-3',
    league: 'Brasileirão Betano Série A',
    leagueIcon: '🇧🇷',
    round: 'Rodada 28 - Clássico Majestoso',
    status: 'LIVE',
    minute: 38,
    date: 'Hoje',
    dateIso: '2026-09-09',
    time: 'Ao Vivo',
    stadium: 'MorumBIS, São Paulo',
    referee: 'Rafael Rodrigo Klein (RS)',
    homeTeam: {
      id: 'sao_paulo',
      name: 'São Paulo',
      shortName: 'SAO',
      badgeEmoji: '🔴⚪⚫',
      primaryColor: '#c8102e',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'corinthians',
      name: 'Corinthians',
      shortName: 'COR',
      badgeEmoji: '⚪⚫',
      primaryColor: '#000000',
      secondaryColor: '#ffffff'
    },
    homeScore: 1,
    awayScore: 0,
    events: [
      {
        id: 'ev-31',
        minute: 22,
        type: 'goal',
        team: 'home',
        player: 'Lucas Moura',
        assist: 'Calleri',
        detail: 'Arrancada fantástica desde o meio-campo e finalização rasteira no canto esquerdo'
      },
      {
        id: 'ev-32',
        minute: 29,
        type: 'yellow_card',
        team: 'away',
        player: 'Fagner',
        detail: 'Entrada dura na lateral do campo'
      }
    ],
    stats: {
      possession: [62, 38],
      shotsTotal: [8, 3],
      shotsOnTarget: [4, 1],
      xG: [1.15, 0.35],
      corners: [5, 2],
      fouls: [7, 11],
      yellowCards: [0, 2],
      redCards: [0, 0],
      offsides: [1, 1],
      bigChances: [2, 0],
      passesTotal: [265, 155],
      passAccuracy: [87, 75],
      goalkeeperSaves: [1, 3]
    },
    lineupHome: {
      formation: '4-2-3-1',
      coach: 'Luis Zubeldía',
      starters: [
        { number: 23, name: 'Rafael', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.1 },
        { number: 13, name: 'Rafinha', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.0, captain: true },
        { number: 5, name: 'Robert Arboleda', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.5 },
        { number: 4, name: 'Alan Franco', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.2 },
        { number: 6, name: 'Welington', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.0 },
        { number: 25, name: 'Alisson', position: 'VOL', gridPos: { x: 38, y: 55 }, rating: 7.3 },
        { number: 29, name: 'Pablo Maia', position: 'VOL', gridPos: { x: 62, y: 55 }, rating: 7.4 },
        { number: 27, name: 'Wellington Rato', position: 'MEI', gridPos: { x: 80, y: 35 }, rating: 7.1 },
        { number: 7, name: 'Lucas Moura', position: 'MEI', gridPos: { x: 50, y: 32 }, rating: 8.5 },
        { number: 47, name: 'Ferreirinha', position: 'MEI', gridPos: { x: 20, y: 35 }, rating: 7.3 },
        { number: 9, name: 'Jonathan Calleri', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 7.6 }
      ],
      substitutes: ['Jandrei (G)', 'Igor Vinícius', 'Sabino', 'Luiz Gustavo', 'Bobadilla', 'Rodrigo Nestor', 'Luciano', 'André Silva']
    },
    lineupAway: {
      formation: '4-3-1-2',
      coach: 'Ramón Díaz',
      starters: [
        { number: 1, name: 'Hugo Souza', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 6.9 },
        { number: 23, name: 'Fagner', position: 'LAT', gridPos: { x: 85, y: 24 }, rating: 6.2, captain: true },
        { number: 25, name: 'Cacá', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 6.5 },
        { number: 3, name: 'Félix Torres', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 6.7 },
        { number: 46, name: 'Hugo', position: 'LAT', gridPos: { x: 15, y: 24 }, rating: 6.4 },
        { number: 14, name: 'Raniele', position: 'VOL', gridPos: { x: 50, y: 40 }, rating: 6.8 },
        { number: 7, name: 'Maycon', position: 'MC', gridPos: { x: 70, y: 46 }, rating: 6.6 },
        { number: 10, name: 'Rodrigo Garro', position: 'MEI', gridPos: { x: 50, y: 62 }, rating: 7.4 },
        { number: 70, name: 'José Martínez', position: 'MC', gridPos: { x: 30, y: 46 }, rating: 6.5 },
        { number: 9, name: 'Yuri Alberto', position: 'ATA', gridPos: { x: 38, y: 80 }, rating: 6.7 },
        { number: 94, name: 'Memphis Depay', position: 'ATA', gridPos: { x: 62, y: 80 }, rating: 7.1 }
      ],
      substitutes: ['Matheus Donelli (G)', 'Matheuzinho', 'Gustavo Henrique', 'Breno Bidon', 'Charles', 'Igor Coronado', 'Romero', 'Pedro Raul']
    },
    h2h: {
      homeWins: 112,
      draws: 133,
      awayWins: 132,
      lastMatches: ['COR 2x2 SAO', 'COR 1x2 SAO', 'SAO 2x0 COR', 'COR 2x1 SAO', 'SAO 2x1 COR']
    }
  },

  {
    id: 'match-4',
    league: 'UEFA Champions League',
    leagueIcon: '⭐',
    round: 'Fase de Liga - Rodada 6',
    status: 'SCHEDULED',
    date: 'Hoje',
    dateIso: '2026-09-09',
    time: '21:00',
    stadium: 'Spotify Camp Nou, Barcelona',
    referee: 'Anthony Taylor (Inglaterra)',
    homeTeam: {
      id: 'barcelona',
      name: 'Barcelona',
      shortName: 'BAR',
      badgeEmoji: '🔵🔴',
      primaryColor: '#004d98',
      secondaryColor: '#a50044'
    },
    awayTeam: {
      id: 'liverpool',
      name: 'Liverpool',
      shortName: 'LIV',
      badgeEmoji: '🔴⚪',
      primaryColor: '#c8102e',
      secondaryColor: '#ffffff'
    },
    homeScore: 0,
    awayScore: 0,
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xG: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [0, 0],
      passesTotal: [0, 0],
      passAccuracy: [0, 0],
      goalkeeperSaves: [0, 0]
    },
    lineupHome: {
      formation: '4-2-3-1',
      coach: 'Hansi Flick',
      starters: [
        { number: 1, name: 'Ter Stegen', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.3, captain: true },
        { number: 23, name: 'Jules Koundé', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.4 },
        { number: 2, name: 'Pau Cubarsí', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.2 },
        { number: 5, name: 'Iñigo Martínez', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.1 },
        { number: 3, name: 'Alejandro Balde', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.3 },
        { number: 17, name: 'Marc Casadó', position: 'VOL', gridPos: { x: 40, y: 55 }, rating: 7.4 },
        { number: 8, name: 'Pedri', position: 'MC', gridPos: { x: 60, y: 55 }, rating: 8.5 },
        { number: 19, name: 'Lamine Yamal', position: 'ATA', gridPos: { x: 82, y: 35 }, rating: 8.7 },
        { number: 20, name: 'Dani Olmo', position: 'MEI', gridPos: { x: 50, y: 32 }, rating: 8.1 },
        { number: 11, name: 'Raphinha', position: 'ATA', gridPos: { x: 18, y: 35 }, rating: 8.6 },
        { number: 9, name: 'Robert Lewandowski', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 8.4 }
      ],
      substitutes: ['Iñaki Peña (G)', 'Araujo', 'Christensen', 'Fort', 'Frenkie de Jong', 'Gavi', 'Fermín López', 'Ferran Torres', 'Ansu Fati']
    },
    lineupAway: {
      formation: '4-3-3',
      coach: 'Arne Slot',
      starters: [
        { number: 1, name: 'Alisson Becker', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 7.8 },
        { number: 66, name: 'Trent Alexander-Arnold', position: 'LAT', gridPos: { x: 85, y: 25 }, rating: 8.1 },
        { number: 5, name: 'Ibrahima Konaté', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 7.4 },
        { number: 4, name: 'Virgil van Dijk', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 8.2, captain: true },
        { number: 26, name: 'Andy Robertson', position: 'LAT', gridPos: { x: 15, y: 25 }, rating: 7.5 },
        { number: 38, name: 'Ryan Gravenberch', position: 'VOL', gridPos: { x: 50, y: 42 }, rating: 7.9 },
        { number: 10, name: 'Alexis Mac Allister', position: 'MC', gridPos: { x: 32, y: 50 }, rating: 8.0 },
        { number: 8, name: 'Dominik Szoboszlai', position: 'MC', gridPos: { x: 68, y: 50 }, rating: 7.7 },
        { number: 11, name: 'Mohamed Salah', position: 'ATA', gridPos: { x: 82, y: 75 }, rating: 8.8 },
        { number: 9, name: 'Darwin Núñez', position: 'ATA', gridPos: { x: 50, y: 82 }, rating: 7.3 },
        { number: 7, name: 'Luis Díaz', position: 'ATA', gridPos: { x: 18, y: 75 }, rating: 8.2 }
      ],
      substitutes: ['Kelleher (G)', 'Quansah', 'Gomez', 'Bradley', 'Tsimikas', 'Endo', 'Curtis Jones', 'Cody Gakpo', 'Federico Chiesa']
    },
    h2h: {
      homeWins: 3,
      draws: 3,
      awayWins: 4,
      lastMatches: ['LIV 4x0 BAR', 'BAR 3x0 LIV', 'LIV 0x1 BAR', 'BAR 1x2 LIV']
    }
  },

  {
    id: 'match-5',
    league: 'Campeonato Paulista',
    leagueIcon: '🏆',
    round: 'Fase de Grupos',
    status: 'FINISHED',
    date: 'Ontem',
    dateIso: '2026-09-08',
    time: 'Encerrado',
    stadium: 'Vila Belmiro, Santos',
    referee: 'Edina Alves Batista (FIFA)',
    homeTeam: {
      id: 'santos',
      name: 'Santos',
      shortName: 'SAN',
      badgeEmoji: '⚪⚫⭐',
      primaryColor: '#ffffff',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'palmeiras',
      name: 'Palmeiras',
      shortName: 'PAL',
      badgeEmoji: '🟢⚪',
      primaryColor: '#006437',
      secondaryColor: '#ffffff'
    },
    homeScore: 1,
    awayScore: 0,
    events: [
      {
        id: 'ev-51',
        minute: 48,
        type: 'goal',
        team: 'home',
        player: 'Guilherme',
        assist: 'Otero',
        detail: 'Toque de primeira após jogada individual de Otero pela direita'
      },
      {
        id: 'ev-52',
        minute: 75,
        type: 'yellow_card',
        team: 'home',
        player: 'João Schmidt',
        detail: 'Reclamação com a arbitragem'
      },
      {
        id: 'ev-53',
        minute: 89,
        type: 'red_card',
        team: 'away',
        player: 'Zé Rafael',
        detail: 'Segundo cartão amarelo por falta desnecessária'
      }
    ],
    stats: {
      possession: [45, 55],
      shotsTotal: [11, 14],
      shotsOnTarget: [5, 4],
      xG: [1.02, 1.45],
      corners: [4, 8],
      fouls: [14, 16],
      yellowCards: [3, 4],
      redCards: [0, 1],
      offsides: [2, 3],
      bigChances: [2, 2],
      passesTotal: [340, 420],
      passAccuracy: [79, 84],
      goalkeeperSaves: [4, 4]
    },
    lineupHome: {
      formation: '4-3-3',
      coach: 'Fábio Carille',
      starters: [
        { number: 1, name: 'Gabriel Brazão', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.9 },
        { number: 2, name: 'JP Chermont', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.2 },
        { number: 3, name: 'Gil', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.7, captain: true },
        { number: 4, name: 'Joaquim', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.5 },
        { number: 6, name: 'Gonzalo Escobar', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.0 },
        { number: 5, name: 'João Schmidt', position: 'VOL', gridPos: { x: 50, y: 55 }, rating: 7.4 },
        { number: 8, name: 'Diego Pituca', position: 'MC', gridPos: { x: 35, y: 45 }, rating: 7.6 },
        { number: 10, name: 'Giuliano', position: 'MEI', gridPos: { x: 65, y: 45 }, rating: 7.3 },
        { number: 22, name: 'Otero', position: 'ATA', gridPos: { x: 80, y: 25 }, rating: 8.0 },
        { number: 9, name: 'Furch', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 6.9 },
        { number: 11, name: 'Guilherme', position: 'ATA', gridPos: { x: 20, y: 25 }, rating: 8.3 }
      ],
      substitutes: ['Diógenes', 'Aderlan', 'Alex', 'Rincón', 'Sandry', 'Patrick', 'Pedrinho', 'Willian Bigode']
    },
    lineupAway: {
      formation: '4-2-3-1',
      coach: 'Abel Ferreira',
      starters: [
        { number: 21, name: 'Weverton', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 6.8 },
        { number: 2, name: 'Marcos Rocha', position: 'LAT', gridPos: { x: 85, y: 25 }, rating: 6.5 },
        { number: 15, name: 'Gustavo Gómez', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 7.0, captain: true },
        { number: 26, name: 'Murilo', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 6.9 },
        { number: 22, name: 'Piquerez', position: 'LAT', gridPos: { x: 15, y: 25 }, rating: 6.9 },
        { number: 8, name: 'Zé Rafael', position: 'VOL', gridPos: { x: 38, y: 45 }, rating: 5.8 },
        { number: 5, name: 'Aníbal Moreno', position: 'VOL', gridPos: { x: 62, y: 45 }, rating: 6.9 },
        { number: 23, name: 'Raphael Veiga', position: 'MEI', gridPos: { x: 50, y: 55 }, rating: 6.8 },
        { number: 41, name: 'Estêvão', position: 'ATA', gridPos: { x: 80, y: 70 }, rating: 7.3 },
        { number: 42, name: 'Flaco López', position: 'ATA', gridPos: { x: 50, y: 80 }, rating: 6.4 },
        { number: 11, name: 'Rony', position: 'ATA', gridPos: { x: 20, y: 70 }, rating: 6.5 }
      ],
      substitutes: ['Lomba', 'Mayke', 'Naves', 'Gabriel Menino', 'Ríos', 'Lázaro', 'Vanderlan']
    },
    h2h: {
      homeWins: 107,
      draws: 89,
      awayWins: 135,
      lastMatches: ['SAN 1x0 PAL', 'PAL 2x0 SAN', 'PAL 2x1 SAN', 'SAN 0x0 PAL']
    }
  },

  {
    id: 'match-6',
    league: 'Bundesliga',
    leagueIcon: '🇩🇪',
    round: 'Rodada 5 - Der Klassiker',
    status: 'FINISHED',
    date: '07/09/2026',
    dateIso: '2026-09-07',
    time: 'Encerrado',
    stadium: 'Allianz Arena, Munique',
    referee: 'Felix Zwayer (Alemanha)',
    homeTeam: {
      id: 'bayern',
      name: 'Bayern de Munique',
      shortName: 'BAY',
      badgeEmoji: '🔴⚪🔵',
      primaryColor: '#dc052d',
      secondaryColor: '#ffffff'
    },
    awayTeam: {
      id: 'dortmund',
      name: 'Borussia Dortmund',
      shortName: 'BVB',
      badgeEmoji: '🟡⚫',
      primaryColor: '#fde100',
      secondaryColor: '#000000'
    },
    homeScore: 3,
    awayScore: 0,
    events: [
      {
        id: 'ev-61',
        minute: 24,
        type: 'goal',
        team: 'home',
        player: 'Harry Kane',
        assist: 'Musiala',
        detail: 'Finalização de primeira no ângulo esquerdo após jogada envolvente'
      },
      {
        id: 'ev-62',
        minute: 55,
        type: 'goal',
        team: 'home',
        player: 'Jamal Musiala',
        assist: 'Sané',
        detail: 'Drible desconcertante no zagueiro e toque por cobertura'
      },
      {
        id: 'ev-63',
        minute: 82,
        type: 'goal',
        team: 'home',
        player: 'Harry Kane',
        assist: 'Kimmich',
        detail: 'Cabeceio firme no contrapé do goleiro'
      }
    ],
    stats: {
      possession: [65, 35],
      shotsTotal: [18, 6],
      shotsOnTarget: [9, 2],
      xG: [2.65, 0.48],
      corners: [8, 3],
      fouls: [9, 14],
      yellowCards: [1, 3],
      redCards: [0, 0],
      offsides: [2, 1],
      bigChances: [4, 1],
      passesTotal: [610, 310],
      passAccuracy: [91, 78],
      goalkeeperSaves: [2, 6]
    },
    lineupHome: {
      formation: '4-2-3-1',
      coach: 'Vincent Kompany',
      starters: [
        { number: 1, name: 'Neuer', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.5, captain: true },
        { number: 27, name: 'Laimer', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.3 },
        { number: 2, name: 'Upamecano', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.6 },
        { number: 3, name: 'Kim Min-jae', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.8 },
        { number: 19, name: 'Davies', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.9 },
        { number: 6, name: 'Kimmich', position: 'VOL', gridPos: { x: 40, y: 55 }, rating: 8.5 },
        { number: 16, name: 'Palhinha', position: 'VOL', gridPos: { x: 60, y: 55 }, rating: 7.4 },
        { number: 10, name: 'Sané', position: 'MEI', gridPos: { x: 80, y: 35 }, rating: 8.2 },
        { number: 42, name: 'Musiala', position: 'MEI', gridPos: { x: 50, y: 32 }, rating: 9.0 },
        { number: 7, name: 'Gnabry', position: 'MEI', gridPos: { x: 20, y: 35 }, rating: 7.3 },
        { number: 9, name: 'Harry Kane', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 9.2 }
      ],
      substitutes: ['Ulreich', 'Dier', 'Guerreiro', 'Pavlovic', 'Müller', 'Coman', 'Tel']
    },
    lineupAway: {
      formation: '4-3-3',
      coach: 'Nuri Sahin',
      starters: [
        { number: 1, name: 'Kobel', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 6.8 },
        { number: 26, name: 'Ryerson', position: 'LAT', gridPos: { x: 85, y: 24 }, rating: 6.2 },
        { number: 3, name: 'Anton', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 6.0 },
        { number: 4, name: 'Schlotterbeck', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 6.4 },
        { number: 5, name: 'Bensebaini', position: 'LAT', gridPos: { x: 15, y: 24 }, rating: 6.1 },
        { number: 23, name: 'Emre Can', position: 'VOL', gridPos: { x: 50, y: 42 }, rating: 6.5, captain: true },
        { number: 20, name: 'Sabitzer', position: 'MC', gridPos: { x: 35, y: 50 }, rating: 6.7 },
        { number: 10, name: 'Brandt', position: 'MEI', gridPos: { x: 65, y: 50 }, rating: 6.6 },
        { number: 21, name: 'Malen', position: 'ATA', gridPos: { x: 80, y: 72 }, rating: 6.3 },
        { number: 9, name: 'Guirassy', position: 'ATA', gridPos: { x: 50, y: 80 }, rating: 6.5 },
        { number: 27, name: 'Adeyemi', position: 'ATA', gridPos: { x: 20, y: 72 }, rating: 6.4 }
      ],
      substitutes: ['Meyer', 'Süle', 'Nmecha', 'Gross', 'Gittens', 'Beier']
    },
    h2h: {
      homeWins: 68,
      draws: 35,
      awayWins: 34,
      lastMatches: ['BAY 3x0 BVB', 'BVB 0x4 BAY', 'BAY 4x2 BVB', 'BVB 2x2 BAY']
    }
  },

  {
    id: 'match-7',
    league: 'Premier League',
    leagueIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    round: 'Rodada 6 - Derby de Londres',
    status: 'FINISHED',
    date: 'Ontem',
    dateIso: '2026-09-08',
    time: 'Encerrado',
    stadium: 'Emirates Stadium, Londres',
    referee: 'Michael Oliver (Inglaterra)',
    homeTeam: {
      id: 'arsenal',
      name: 'Arsenal',
      shortName: 'ARS',
      badgeEmoji: '🔴⚪',
      primaryColor: '#ef0107',
      secondaryColor: '#ffffff'
    },
    awayTeam: {
      id: 'chelsea',
      name: 'Chelsea',
      shortName: 'CHE',
      badgeEmoji: '🔵🦁',
      primaryColor: '#034694',
      secondaryColor: '#ffffff'
    },
    homeScore: 2,
    awayScore: 1,
    events: [
      {
        id: 'ev-71',
        minute: 31,
        type: 'goal',
        team: 'home',
        player: 'Bukayo Saka',
        assist: 'Ødegaard',
        detail: 'Corte rápido para dentro e finalização precisa rasteira'
      },
      {
        id: 'ev-72',
        minute: 68,
        type: 'goal',
        team: 'away',
        player: 'Cole Palmer',
        assist: 'Nicolas Jackson',
        detail: 'Chute colocado de primeira da meia-lua'
      },
      {
        id: 'ev-73',
        minute: 84,
        type: 'goal',
        team: 'home',
        player: 'Kai Havertz',
        assist: 'Declan Rice',
        detail: 'Testada fulminante no canto após escanteio milimétrico'
      }
    ],
    stats: {
      possession: [54, 46],
      shotsTotal: [15, 12],
      shotsOnTarget: [7, 5],
      xG: [1.78, 1.21],
      corners: [6, 4],
      fouls: [11, 13],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [1, 2],
      bigChances: [3, 2],
      passesTotal: [460, 390],
      passAccuracy: [86, 83],
      goalkeeperSaves: [4, 5]
    },
    lineupHome: {
      formation: '4-3-3',
      coach: 'Mikel Arteta',
      starters: [
        { number: 22, name: 'David Raya', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.4 },
        { number: 4, name: 'Ben White', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.2 },
        { number: 2, name: 'William Saliba', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.8 },
        { number: 6, name: 'Gabriel Magalhães', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.7 },
        { number: 12, name: 'Jurriën Timber', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.3 },
        { number: 5, name: 'Thomas Partey', position: 'VOL', gridPos: { x: 50, y: 55 }, rating: 7.5 },
        { number: 41, name: 'Declan Rice', position: 'MC', gridPos: { x: 32, y: 45 }, rating: 8.4 },
        { number: 8, name: 'Martin Ødegaard', position: 'MEI', gridPos: { x: 68, y: 45 }, rating: 8.6, captain: true },
        { number: 7, name: 'Bukayo Saka', position: 'ATA', gridPos: { x: 82, y: 25 }, rating: 8.8 },
        { number: 29, name: 'Kai Havertz', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 8.2 },
        { number: 11, name: 'Gabriel Martinelli', position: 'ATA', gridPos: { x: 18, y: 25 }, rating: 7.4 }
      ],
      substitutes: ['Neto', 'Calafiori', 'Zinchenko', 'Jorginho', 'Merino', 'Trossard', 'Sterling']
    },
    lineupAway: {
      formation: '4-2-3-1',
      coach: 'Enzo Maresca',
      starters: [
        { number: 1, name: 'Robert Sánchez', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 6.9 },
        { number: 27, name: 'Malo Gusto', position: 'LAT', gridPos: { x: 85, y: 24 }, rating: 6.7 },
        { number: 29, name: 'Wesley Fofana', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 6.6 },
        { number: 6, name: 'Levi Colwill', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 6.8 },
        { number: 3, name: 'Marc Cucurella', position: 'LAT', gridPos: { x: 15, y: 24 }, rating: 7.0 },
        { number: 25, name: 'Moisés Caicedo', position: 'VOL', gridPos: { x: 40, y: 42 }, rating: 7.5 },
        { number: 8, name: 'Enzo Fernández', position: 'VOL', gridPos: { x: 60, y: 42 }, rating: 7.2, captain: true },
        { number: 11, name: 'Noni Madueke', position: 'MEI', gridPos: { x: 80, y: 62 }, rating: 6.9 },
        { number: 20, name: 'Cole Palmer', position: 'MEI', gridPos: { x: 50, y: 64 }, rating: 8.5 },
        { number: 7, name: 'Pedro Neto', position: 'MEI', gridPos: { x: 20, y: 62 }, rating: 7.1 },
        { number: 15, name: 'Nicolas Jackson', position: 'ATA', gridPos: { x: 50, y: 82 }, rating: 7.2 }
      ],
      substitutes: ['Jorgensen', 'Disasi', 'Adarabioyo', 'Lavia', 'Mudryk', 'Felix', 'Nkunku']
    },
    h2h: {
      homeWins: 84,
      draws: 59,
      awayWins: 66,
      lastMatches: ['ARS 2x1 CHE', 'ARS 5x0 CHE', 'CHE 2x2 ARS', 'ARS 3x1 CHE']
    }
  },

  {
    id: 'match-8',
    league: 'Brasileirão Betano Série A',
    leagueIcon: '🇧🇷',
    round: 'Rodada 28 - Clássico Mineiro',
    status: 'SCHEDULED',
    date: 'Amanhã',
    dateIso: '2026-09-10',
    time: '20:00',
    stadium: 'Arena MRV, Belo Horizonte',
    referee: 'Ramon Abatti Abel (FIFA)',
    homeTeam: {
      id: 'atletico_mg',
      name: 'Atlético Mineiro',
      shortName: 'CAM',
      badgeEmoji: '⚪⚫🐓',
      primaryColor: '#000000',
      secondaryColor: '#ffffff'
    },
    awayTeam: {
      id: 'cruzeiro',
      name: 'Cruzeiro',
      shortName: 'CRU',
      badgeEmoji: '🔵⭐',
      primaryColor: '#003a70',
      secondaryColor: '#ffffff'
    },
    homeScore: 0,
    awayScore: 0,
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xG: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [0, 0],
      passesTotal: [0, 0],
      passAccuracy: [0, 0],
      goalkeeperSaves: [0, 0]
    },
    lineupHome: {
      formation: '4-3-3',
      coach: 'Gabriel Milito',
      starters: [
        { number: 22, name: 'Everson', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.2 },
        { number: 25, name: 'Saravia', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 6.9 },
        { number: 3, name: 'Bruno Fuchs', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.1 },
        { number: 4, name: 'Junior Alonso', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.4, captain: true },
        { number: 13, name: 'Guilherme Arana', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.8 },
        { number: 8, name: 'Otávio', position: 'VOL', gridPos: { x: 40, y: 55 }, rating: 7.1 },
        { number: 18, name: 'Fausto Vera', position: 'MC', gridPos: { x: 60, y: 55 }, rating: 7.0 },
        { number: 15, name: 'Zaracho', position: 'MEI', gridPos: { x: 50, y: 38 }, rating: 7.5 },
        { number: 7, name: 'Hulk', position: 'ATA', gridPos: { x: 80, y: 20 }, rating: 8.5 },
        { number: 9, name: 'Deyverson', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 7.3 },
        { number: 10, name: 'Paulinho', position: 'ATA', gridPos: { x: 20, y: 20 }, rating: 8.1 }
      ],
      substitutes: ['Matheus Mendes', 'Igor Rabello', 'Mariano', 'Battaglia', 'Bernard', 'Rubens', 'Alan Kardec']
    },
    lineupAway: {
      formation: '4-2-3-1',
      coach: 'Fernando Diniz',
      starters: [
        { number: 1, name: 'Cássio', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 7.4 },
        { number: 12, name: 'William', position: 'LAT', gridPos: { x: 85, y: 24 }, rating: 7.3 },
        { number: 25, name: 'Lucas Villalba', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 6.8 },
        { number: 27, name: 'Zé Ivaldo', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 6.9 },
        { number: 3, name: 'Marlon', position: 'LAT', gridPos: { x: 15, y: 24 }, rating: 7.0 },
        { number: 29, name: 'Lucas Romero', position: 'VOL', gridPos: { x: 40, y: 42 }, rating: 7.2, captain: true },
        { number: 16, name: 'Walace', position: 'VOL', gridPos: { x: 60, y: 42 }, rating: 7.0 },
        { number: 17, name: 'Álvaro Barreal', position: 'MEI', gridPos: { x: 80, y: 62 }, rating: 7.4 },
        { number: 10, name: 'Matheus Pereira', position: 'MEI', gridPos: { x: 50, y: 64 }, rating: 8.3 },
        { number: 11, name: 'Arthur Gomes', position: 'MEI', gridPos: { x: 20, y: 62 }, rating: 7.1 },
        { number: 9, name: 'Kaio Jorge', position: 'ATA', gridPos: { x: 50, y: 82 }, rating: 7.4 }
      ],
      substitutes: ['Anderson', 'Jonathan Jesus', 'Kaiki', 'Ramiro', 'Lucas Silva', 'Lautaro Díaz', 'Dinenno']
    },
    h2h: {
      homeWins: 211,
      draws: 140,
      awayWins: 173,
      lastMatches: ['CRU 0x0 CAM', 'CAM 3x0 CRU', 'CRU 1x3 CAM', 'CAM 2x2 CRU']
    }
  },

  {
    id: 'match-9',
    league: 'La Liga EA Sports',
    leagueIcon: '🇪🇸',
    round: 'Rodada 11 - El Clásico',
    status: 'SCHEDULED',
    date: '12/09/2026',
    dateIso: '2026-09-12',
    time: '16:00',
    stadium: 'Santiago Bernabéu, Madri',
    referee: 'José María Sánchez Martínez (Espanha)',
    homeTeam: {
      id: 'real_madrid',
      name: 'Real Madrid',
      shortName: 'RMA',
      badgeEmoji: '👑⚪',
      primaryColor: '#ffffff',
      secondaryColor: '#001c58'
    },
    awayTeam: {
      id: 'barcelona',
      name: 'Barcelona',
      shortName: 'BAR',
      badgeEmoji: '🔵🔴',
      primaryColor: '#004d98',
      secondaryColor: '#a50044'
    },
    homeScore: 0,
    awayScore: 0,
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xG: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [0, 0],
      passesTotal: [0, 0],
      passAccuracy: [0, 0],
      goalkeeperSaves: [0, 0]
    },
    lineupHome: {
      formation: '4-3-3',
      coach: 'Carlo Ancelotti',
      starters: [
        { number: 1, name: 'Courtois', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 8.0 },
        { number: 2, name: 'Carvajal', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.5, captain: true },
        { number: 3, name: 'Militão', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.8 },
        { number: 22, name: 'Rüdiger', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.7 },
        { number: 23, name: 'Mendy', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.2 },
        { number: 14, name: 'Tchouaméni', position: 'VOL', gridPos: { x: 50, y: 55 }, rating: 7.8 },
        { number: 8, name: 'Valverde', position: 'MC', gridPos: { x: 75, y: 48 }, rating: 8.4 },
        { number: 5, name: 'Bellingham', position: 'MC', gridPos: { x: 25, y: 48 }, rating: 8.7 },
        { number: 11, name: 'Rodrygo', position: 'ATA', gridPos: { x: 82, y: 22 }, rating: 8.3 },
        { number: 9, name: 'Kylian Mbappé', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 9.1 },
        { number: 7, name: 'Vinicius Jr', position: 'ATA', gridPos: { x: 18, y: 22 }, rating: 9.2 }
      ],
      substitutes: ['Lunin', 'Lucas Vázquez', 'Fran García', 'Modric', 'Camavinga', 'Arda Güler', 'Endrick', 'Brahim']
    },
    lineupAway: {
      formation: '4-2-3-1',
      coach: 'Hansi Flick',
      starters: [
        { number: 1, name: 'Ter Stegen', position: 'GOL', gridPos: { x: 50, y: 10 }, rating: 7.8, captain: true },
        { number: 23, name: 'Koundé', position: 'LAT', gridPos: { x: 85, y: 24 }, rating: 7.6 },
        { number: 2, name: 'Pau Cubarsí', position: 'ZAG', gridPos: { x: 65, y: 22 }, rating: 7.4 },
        { number: 5, name: 'Iñigo Martínez', position: 'ZAG', gridPos: { x: 35, y: 22 }, rating: 7.3 },
        { number: 3, name: 'Balde', position: 'LAT', gridPos: { x: 15, y: 24 }, rating: 7.5 },
        { number: 17, name: 'Marc Casadó', position: 'VOL', gridPos: { x: 40, y: 42 }, rating: 7.7 },
        { number: 8, name: 'Pedri', position: 'MC', gridPos: { x: 60, y: 42 }, rating: 8.8 },
        { number: 19, name: 'Lamine Yamal', position: 'ATA', gridPos: { x: 80, y: 64 }, rating: 9.2 },
        { number: 20, name: 'Dani Olmo', position: 'MEI', gridPos: { x: 50, y: 64 }, rating: 8.4 },
        { number: 11, name: 'Raphinha', position: 'ATA', gridPos: { x: 20, y: 64 }, rating: 8.9 },
        { number: 9, name: 'Lewandowski', position: 'ATA', gridPos: { x: 50, y: 82 }, rating: 8.8 }
      ],
      substitutes: ['Iñaki Peña', 'Araujo', 'Fort', 'Frenkie de Jong', 'Gavi', 'Fermín', 'Pau Víctor']
    },
    h2h: {
      homeWins: 105,
      draws: 52,
      awayWins: 100,
      lastMatches: ['RMA 3x2 BAR', 'BAR 1x2 RMA', 'BAR 2x1 RMA', 'RMA 3x1 BAR']
    }
  },

  {
    id: 'match-10',
    league: 'Brasileirão Betano Série A',
    leagueIcon: '🇧🇷',
    round: 'Rodada 29 - Clássico das Nações',
    status: 'SCHEDULED',
    date: '13/09/2026',
    dateIso: '2026-09-13',
    time: '16:00',
    stadium: 'Neo Química Arena, São Paulo',
    referee: 'Anderson Daronco (FIFA)',
    homeTeam: {
      id: 'corinthians',
      name: 'Corinthians',
      shortName: 'COR',
      badgeEmoji: '⚪⚫',
      primaryColor: '#000000',
      secondaryColor: '#ffffff'
    },
    awayTeam: {
      id: 'flamengo',
      name: 'Flamengo',
      shortName: 'FLA',
      badgeEmoji: '🔴⚫',
      primaryColor: '#c8102e',
      secondaryColor: '#000000'
    },
    homeScore: 0,
    awayScore: 0,
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xG: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [0, 0],
      passesTotal: [0, 0],
      passAccuracy: [0, 0],
      goalkeeperSaves: [0, 0]
    },
    lineupHome: {
      formation: '4-3-1-2',
      coach: 'Ramón Díaz',
      starters: [
        { number: 1, name: 'Hugo Souza', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.2 },
        { number: 2, name: 'Matheuzinho', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 6.8 },
        { number: 25, name: 'Cacá', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 6.9 },
        { number: 5, name: 'André Ramalho', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.2, captain: true },
        { number: 46, name: 'Hugo', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 6.6 },
        { number: 14, name: 'Raniele', position: 'VOL', gridPos: { x: 50, y: 55 }, rating: 7.0 },
        { number: 8, name: 'Charles', position: 'MC', gridPos: { x: 70, y: 48 }, rating: 6.7 },
        { number: 10, name: 'Rodrigo Garro', position: 'MEI', gridPos: { x: 50, y: 35 }, rating: 8.1 },
        { number: 70, name: 'José Martínez', position: 'MC', gridPos: { x: 30, y: 48 }, rating: 6.8 },
        { number: 9, name: 'Yuri Alberto', position: 'ATA', gridPos: { x: 38, y: 18 }, rating: 7.5 },
        { number: 94, name: 'Memphis Depay', position: 'ATA', gridPos: { x: 62, y: 18 }, rating: 7.9 }
      ],
      substitutes: ['Donelli', 'Fagner', 'Félix Torres', 'Breno Bidon', 'Coronado', 'Romero', 'Pedro Raul']
    },
    lineupAway: {
      formation: '4-2-3-1',
      coach: 'Filipe Luís',
      starters: [
        { number: 1, name: 'Rossi', position: 'GOL', gridPos: { x: 50, y: 90 }, rating: 7.4 },
        { number: 2, name: 'Varela', position: 'LAT', gridPos: { x: 85, y: 72 }, rating: 7.1 },
        { number: 3, name: 'Léo Ortiz', position: 'ZAG', gridPos: { x: 65, y: 76 }, rating: 7.6 },
        { number: 4, name: 'Léo Pereira', position: 'ZAG', gridPos: { x: 35, y: 76 }, rating: 7.3 },
        { number: 6, name: 'Ayrton Lucas', position: 'LAT', gridPos: { x: 15, y: 72 }, rating: 7.4 },
        { number: 5, name: 'Erick Pulgar', position: 'VOL', gridPos: { x: 40, y: 55 }, rating: 7.2 },
        { number: 8, name: 'Gerson', position: 'VOL', gridPos: { x: 60, y: 55 }, rating: 8.5, captain: true },
        { number: 7, name: 'Luiz Araújo', position: 'MEI', gridPos: { x: 80, y: 35 }, rating: 7.7 },
        { number: 14, name: 'Arrascaeta', position: 'MEI', gridPos: { x: 50, y: 32 }, rating: 8.6 },
        { number: 11, name: 'Bruno Henrique', position: 'MEI', gridPos: { x: 20, y: 35 }, rating: 7.5 },
        { number: 99, name: 'Gabigol', position: 'ATA', gridPos: { x: 50, y: 15 }, rating: 7.6 }
      ],
      substitutes: ['Matheus Cunha', 'David Luiz', 'Alex Sandro', 'Alcaraz', 'Allan', 'Michael', 'Pedro']
    },
    h2h: {
      homeWins: 55,
      draws: 33,
      awayWins: 63,
      lastMatches: ['COR 2x1 FLA', 'FLA 2x0 COR', 'COR 1x1 FLA', 'FLA 1x0 COR']
    }
  }
];
