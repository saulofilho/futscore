import { Match, SportType } from '../types';

export interface SportCategoryInfo {
  id: SportType | 'todos';
  label: string;
  iconEmoji: string;
  badge?: string;
  description: string;
  dominantColor: string;
}

export const SPORTS_CATEGORIES: SportCategoryInfo[] = [
  { id: 'todos', label: 'Todos os Esportes', iconEmoji: '🌐', description: 'Visão unificada de todas as modalidades e eventos ao vivo', dominantColor: '#00ff88' },
  { id: 'futebol', label: 'Futebol', iconEmoji: '⚽', description: 'Brasileirão, Champions League, Libertadores, Premier League e La Liga', dominantColor: '#00ff88' },
  { id: 'basquete', label: 'Basquete', iconEmoji: '🏀', badge: 'NBA/NBB', description: 'NBA, NBB Caixa Brasil e EuroLeague com quartos e estatísticas de tiro', dominantColor: '#ff8c00' },
  { id: 'hockey', label: 'Hóquei no Gelo', iconEmoji: '🏒', badge: 'NHL', description: 'NHL Stanley Cup e Mundial IIHF com períodos, power plays e defesas', dominantColor: '#00d2ff' },
  { id: 'volei', label: 'Vôlei', iconEmoji: '🏐', badge: 'Superliga', description: 'Superliga Masculina e Feminina, VNL e Champions League de Vôlei', dominantColor: '#ffc107' },
  { id: 'natacao', label: 'Natação', iconEmoji: '🏊', badge: 'Mundial', description: 'Mundial de Esportes Aquáticos, Troféu Brasil e raias em tempo real', dominantColor: '#00b4d8' },
  { id: 'jiujitsu', label: 'Jiu-Jitsu', iconEmoji: '🥋', badge: 'IBJJF/ADCC', description: 'Mundial IBJJF, ADCC Submission e BJJ Stars com pontuação por quedas e passagens', dominantColor: '#a855f7' },
  { id: 'judo', label: 'Judô', iconEmoji: '🥋', badge: 'IJF Grand Slam', description: 'Circuito Mundial IJF, Grand Slam de Paris e Tóquio com Ippon e Waza-ari', dominantColor: '#ef4444' },
  { id: 'mma', label: 'MMA & Lutas', iconEmoji: '🥊', badge: 'UFC', description: 'UFC, PFL e disputas de cinturão com rounds e golpes significativos', dominantColor: '#e11d48' },
  { id: 'tenis', label: 'Tênis', iconEmoji: '🎾', badge: 'ATP/WTA', description: 'Grand Slams, ATP 1000 e WTA com sets, games e break points', dominantColor: '#84cc16' },
];

export const MULTI_SPORT_MATCHES: Match[] = [
  // ==========================================
  // BASQUETE (NBA & NBB)
  // ==========================================
  {
    id: 'nba-match-1',
    sport: 'basquete',
    sportCategory: 'Basquete - NBA',
    league: 'NBA Regular Season',
    leagueIcon: '🏀',
    round: 'Conferência Oeste',
    status: 'LIVE',
    minute: 38, // 3º Quarto
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: '3º Q - 04:12',
    stadium: 'Crypto.com Arena, Los Angeles, CA',
    referee: 'Scott Foster, Tony Brothers',
    stadiumCapacity: '19.079 lugares',
    broadcast: ['ESPN 2', 'Disney+', 'NBA League Pass'],
    homeTeam: {
      id: 'lakers',
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      badgeEmoji: '🏀',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
      primaryColor: '#552583',
      secondaryColor: '#FDB927'
    },
    awayTeam: {
      id: 'warriors',
      name: 'Golden State Warriors',
      shortName: 'GSW',
      badgeEmoji: '🏀',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/gsw.png',
      primaryColor: '#1D428A',
      secondaryColor: '#FFC72C'
    },
    homeScore: 88,
    awayScore: 84,
    periodScores: ['28-26', '31-29', '29-29'],
    events: [
      { id: 'nba-ev-1', minute: 6, type: 'three_pointer', team: 'away', player: 'Stephen Curry', detail: 'Cesta de 3 pontos do logotipo (9.5m)' },
      { id: 'nba-ev-2', minute: 14, type: 'dunk', team: 'home', player: 'Anthony Davis', assist: 'LeBron James', detail: 'Ponte aérea espetacular com enterrada com as duas mãos' },
      { id: 'nba-ev-3', minute: 22, type: 'three_pointer', team: 'home', player: 'Austin Reaves', detail: 'Chute do canto após passe infiltrado' },
      { id: 'nba-ev-4', minute: 28, type: 'block', team: 'home', player: 'LeBron James', detail: 'Toco espetacular na tabela impedindo bandeja' },
      { id: 'nba-ev-5', minute: 34, type: 'three_pointer', team: 'away', player: 'Buddy Hield', detail: 'Arremesso de transição rápida em contra-ataque' },
    ],
    stats: {
      possession: [51, 49],
      shotsTotal: [64, 61],
      shotsOnTarget: [34, 30],
      xG: [1.8, 1.6],
      corners: [0, 0],
      fouls: [14, 16],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [8, 6],
      passesTotal: [248, 262],
      passAccuracy: [88, 86],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      basketball: {
        fieldGoalPct: ['53.1%', '49.2%'],
        threePointPct: ['41.4%', '42.9%'],
        freeThrowPct: ['82.4%', '88.9%'],
        rebounds: [38, 32],
        assists: [24, 21],
        steals: [7, 5],
        blocks: [6, 3],
        turnovers: [9, 11],
        fouls: [14, 16],
        quarters: [[28, 31, 29, 0], [26, 29, 29, 0]],
        topScorers: {
          home: 'Anthony Davis (26 pts, 12 reb, 3 blk)',
          away: 'Stephen Curry (29 pts, 7/12 3PT)'
        }
      }
    },
    lineupHome: {
      formation: '5 Inicial',
      coach: 'JJ Redick',
      starters: [
        { number: 23, name: 'LeBron James', position: 'ALA', gridPos: { x: 50, y: 35 }, rating: 8.8 },
        { number: 3, name: 'Anthony Davis', position: 'PIVÔ', gridPos: { x: 50, y: 15 }, rating: 9.3 },
        { number: 15, name: 'Austin Reaves', position: 'ALA-ARM', gridPos: { x: 75, y: 55 }, rating: 8.1 },
        { number: 1, name: "D'Angelo Russell", position: 'ARM', gridPos: { x: 25, y: 65 }, rating: 7.6 },
        { number: 28, name: 'Rui Hachimura', position: 'ALA-PIVÔ', gridPos: { x: 80, y: 25 }, rating: 7.9 },
      ],
      substitutes: ['Gabe Vincent', 'Max Christie', 'Jaxson Hayes', 'Dalton Knecht']
    },
    lineupAway: {
      formation: '5 Inicial',
      coach: 'Steve Kerr',
      starters: [
        { number: 30, name: 'Stephen Curry', position: 'ARM', gridPos: { x: 30, y: 65 }, rating: 9.1 },
        { number: 23, name: 'Draymond Green', position: 'ALA-PIVÔ', gridPos: { x: 50, y: 20 }, rating: 8.0 },
        { number: 22, name: 'Andrew Wiggins', position: 'ALA', gridPos: { x: 70, y: 40 }, rating: 7.7 },
        { number: 7, name: 'Buddy Hield', position: 'ALA-ARM', gridPos: { x: 20, y: 45 }, rating: 8.2 },
        { number: 32, name: 'Trayce Jackson-Davis', position: 'PIVÔ', gridPos: { x: 50, y: 10 }, rating: 7.5 },
      ],
      substitutes: ['Jonathan Kuminga', 'Brandin Podziemski', 'Kevon Looney', 'Moses Moody']
    }
  },
  {
    id: 'nbb-match-1',
    sport: 'basquete',
    sportCategory: 'Basquete - NBB Caixa',
    league: 'NBB Caixa Brasil 2026',
    leagueIcon: '🇧🇷',
    round: 'Fase Regular - Rodada 14',
    status: 'FINISHED',
    minute: 40,
    date: 'Ontem',
    dateIso: '2026-10-24',
    time: 'Encerrado',
    stadium: 'Maracanãzinho, Rio de Janeiro',
    referee: 'Cristiano Maranho (FIBA)',
    broadcast: ['SporTV 3', 'YouTube NBB', 'FlaTV+'],
    homeTeam: {
      id: 'flamengo_basquete',
      name: 'Flamengo Basquete',
      shortName: 'FLA',
      badgeEmoji: '🔴⚫',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/819.png',
      primaryColor: '#c8102e',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'franca_basquete',
      name: 'Sesi Franca Basquete',
      shortName: 'FRA',
      badgeEmoji: '🔴⚪',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/2/29/Franca_Basquetebol_Clube.svg/1200px-Franca_Basquetebol_Clube.svg.png',
      primaryColor: '#b30000',
      secondaryColor: '#ffffff'
    },
    homeScore: 92,
    awayScore: 86,
    periodScores: ['24-21', '21-22', '26-20', '21-23'],
    events: [
      { id: 'nbb-ev-1', minute: 8, type: 'three_pointer', team: 'home', player: 'Gui Deodato', detail: 'Tiro preciso do perímetro' },
      { id: 'nbb-ev-2', minute: 18, type: 'dunk', team: 'away', player: 'Lucas Dias', detail: 'Enterrada após corte na linha de fundo' },
      { id: 'nbb-ev-3', minute: 31, type: 'three_pointer', team: 'home', player: 'Shaquille Johnson', detail: 'Cesta decisiva no estouro dos 24s' },
      { id: 'nbb-ev-4', minute: 39, type: 'block', team: 'home', player: 'Olivinha', detail: 'Toco comemoraço pela torcida rubro-negra' },
    ],
    stats: {
      possession: [50, 50],
      shotsTotal: [68, 65],
      shotsOnTarget: [36, 32],
      xG: [1.5, 1.4],
      corners: [0, 0],
      fouls: [19, 18],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [6, 5],
      passesTotal: [210, 198],
      passAccuracy: [85, 83],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      basketball: {
        fieldGoalPct: ['52.9%', '49.2%'],
        threePointPct: ['43.8%', '38.5%'],
        freeThrowPct: ['86.7%', '81.8%'],
        rebounds: [41, 36],
        assists: [22, 19],
        steals: [8, 6],
        blocks: [5, 4],
        turnovers: [10, 12],
        fouls: [19, 18],
        quarters: [[24, 21, 26, 21], [21, 22, 20, 23]],
        topScorers: {
          home: 'Gui Deodato (23 pts, 5/7 3PT)',
          away: 'Lucas Dias (24 pts, 9 reb)'
        }
      }
    },
    lineupHome: {
      formation: '5 Inicial',
      coach: 'Gustavo De Conti',
      starters: [
        { number: 1, name: 'Franco Balbi', position: 'ARM', gridPos: { x: 30, y: 65 }, rating: 8.6 },
        { number: 3, name: 'Shaquille Johnson', position: 'ALA-ARM', gridPos: { x: 70, y: 60 }, rating: 8.8 },
        { number: 9, name: 'Gui Deodato', position: 'ALA', gridPos: { x: 25, y: 35 }, rating: 9.2 },
        { number: 16, name: 'Olivinha', position: 'ALA-PIVÔ', gridPos: { x: 75, y: 25 }, rating: 8.5 },
        { number: 22, name: 'Maique', position: 'PIVÔ', gridPos: { x: 50, y: 15 }, rating: 7.9 },
      ],
      substitutes: ['Didi Louzada', 'Kayo Gonçalves', 'Luan Rodrigues', 'Felipe Motta']
    },
    lineupAway: {
      formation: '5 Inicial',
      coach: 'Helinho Garcia',
      starters: [
        { number: 9, name: 'Lucas Dias', position: 'ALA-PIVÔ', gridPos: { x: 50, y: 25 }, rating: 8.9 },
        { number: 14, name: 'Georginho de Paula', position: 'ARM', gridPos: { x: 30, y: 60 }, rating: 8.7 },
        { number: 28, name: 'David Jackson', position: 'ALA-ARM', gridPos: { x: 70, y: 55 }, rating: 8.0 },
        { number: 6, name: 'Santiago Scala', position: 'ALA', gridPos: { x: 20, y: 40 }, rating: 7.7 },
        { number: 3, name: 'Marcio Santos', position: 'PIVÔ', gridPos: { x: 50, y: 15 }, rating: 7.8 },
      ],
      substitutes: ['Charles Hinkle', 'Zu Jr', 'Nathan Mariano', 'Paulo Barbosa']
    }
  },

  // ==========================================
  // HÓQUEI NO GELO (NHL & MUNDIAL IIHF)
  // ==========================================
  {
    id: 'nhl-match-1',
    sport: 'hockey',
    sportCategory: 'Hóquei no Gelo - NHL',
    league: 'NHL Stanley Cup Season',
    leagueIcon: '🏒',
    round: 'Conferência Oeste',
    status: 'LIVE',
    minute: 48, // 3º Período
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: '3º P - 08:35',
    stadium: 'Rogers Place, Edmonton, Alberta',
    referee: 'Wes McCauley, Dan O’Rourke',
    stadiumCapacity: '18.347 lugares (Pista de Gelo Olímpica)',
    broadcast: ['ESPN 3', 'Disney+', 'Star+'],
    homeTeam: {
      id: 'oilers',
      name: 'Edmonton Oilers',
      shortName: 'EDM',
      badgeEmoji: '🏒',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png',
      primaryColor: '#041E42',
      secondaryColor: '#FF4C00'
    },
    awayTeam: {
      id: 'knights',
      name: 'Vegas Golden Knights',
      shortName: 'VGK',
      badgeEmoji: '🏒',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nhl/500/vgk.png',
      primaryColor: '#B4975A',
      secondaryColor: '#333F48'
    },
    homeScore: 4,
    awayScore: 2,
    periodScores: ['1-1', '2-1', '1-0'],
    events: [
      { id: 'nhl-ev-1', minute: 9, type: 'goal', team: 'home', player: 'Connor McDavid', assist: 'Leon Draisaitl', detail: 'Gol de Power Play com slap shot no canto superior' },
      { id: 'nhl-ev-2', minute: 17, type: 'goal', team: 'away', player: 'Jack Eichel', assist: 'Mark Stone', detail: 'Gol em rebote na área do goleiro' },
      { id: 'nhl-ev-3', minute: 26, type: 'goal', team: 'home', player: 'Leon Draisaitl', assist: 'Evan Bouchard', detail: 'Gol de primeira no ângulo sem chance de defesa' },
      { id: 'nhl-ev-4', minute: 35, type: 'goal', team: 'away', player: 'Jonathan Marchessault', detail: 'Gol de pulso em contra-ataque veloz 2 contra 1' },
      { id: 'nhl-ev-5', minute: 44, type: 'goal', team: 'home', player: 'Zach Hyman', assist: 'Connor McDavid', detail: 'Desvio sutil na frente da trave' },
    ],
    stats: {
      possession: [55, 45],
      shotsTotal: [36, 28],
      shotsOnTarget: [36, 28],
      xG: [3.4, 2.1],
      corners: [0, 0],
      fouls: [8, 12],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [3, 2],
      bigChances: [7, 4],
      passesTotal: [180, 150],
      passAccuracy: [88, 84],
      goalkeeperSaves: [26, 32],
    },
    sportStatsDetail: {
      hockey: {
        shotsOnGoal: [36, 28],
        powerPlay: ['2/3 (66.7%)', '0/2 (0.0%)'],
        penaltyMinutes: [6, 10],
        faceoffWinPct: ['58.4%', '41.6%'],
        hits: [26, 32],
        blockedShots: [14, 18],
        saves: [26, 32],
        periods: [[1, 2, 1], [1, 1, 0]]
      }
    },
    lineupHome: {
      formation: '1ª Linha & Goleiro',
      coach: 'Kris Knoblauch',
      starters: [
        { number: 97, name: 'Connor McDavid', position: 'CENTRO (C)', gridPos: { x: 50, y: 60 }, rating: 9.8, captain: true },
        { number: 29, name: 'Leon Draisaitl', position: 'ALA ESQ', gridPos: { x: 25, y: 70 }, rating: 9.4 },
        { number: 18, name: 'Zach Hyman', position: 'ALA DIR', gridPos: { x: 75, y: 70 }, rating: 8.7 },
        { number: 2, name: 'Evan Bouchard', position: 'DEFENSOR DIR', gridPos: { x: 70, y: 35 }, rating: 8.5 },
        { number: 14, name: 'Mattias Ekholm', position: 'DEFENSOR ESQ', gridPos: { x: 30, y: 35 }, rating: 8.2 },
        { number: 74, name: 'Stuart Skinner', position: 'GOLEIRO', gridPos: { x: 50, y: 10 }, rating: 8.9 },
      ],
      substitutes: ['Ryan Nugent-Hopkins', 'Evander Kane', 'Warren Foegele', 'Darnell Nurse']
    },
    lineupAway: {
      formation: '1ª Linha & Goleiro',
      coach: 'Bruce Cassidy',
      starters: [
        { number: 9, name: 'Jack Eichel', position: 'CENTRO (C)', gridPos: { x: 50, y: 60 }, rating: 8.9 },
        { number: 61, name: 'Mark Stone', position: 'ALA DIR', gridPos: { x: 75, y: 70 }, rating: 8.6, captain: true },
        { number: 49, name: 'Ivan Barbashev', position: 'ALA ESQ', gridPos: { x: 25, y: 70 }, rating: 7.9 },
        { number: 27, name: 'Shea Theodore', position: 'DEFENSOR', gridPos: { x: 30, y: 35 }, rating: 8.1 },
        { number: 7, name: 'Alex Pietrangelo', position: 'DEFENSOR', gridPos: { x: 70, y: 35 }, rating: 8.3 },
        { number: 33, name: 'Adin Hill', position: 'GOLEIRO', gridPos: { x: 50, y: 10 }, rating: 8.4 },
      ],
      substitutes: ['William Karlsson', 'Tomas Hertl', 'Brayden McNabb', 'Nicolas Roy']
    }
  },
  {
    id: 'nhl-match-2',
    sport: 'hockey',
    sportCategory: 'Hóquei no Gelo - Clássico NHL',
    league: 'NHL Original Six',
    leagueIcon: '🏒',
    round: 'Conferência Leste',
    status: 'FINISHED',
    minute: 60,
    date: 'Ontem',
    dateIso: '2026-10-24',
    time: 'Encerrado',
    stadium: 'TD Garden, Boston, MA',
    referee: 'Gord Dwyer, Chris Rooney',
    stadiumCapacity: '17.850 lugares',
    broadcast: ['ESPN 4', 'Disney+'],
    homeTeam: {
      id: 'bruins',
      name: 'Boston Bruins',
      shortName: 'BOS',
      badgeEmoji: '🐻',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png',
      primaryColor: '#FFB81C',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'canadiens',
      name: 'Montreal Canadiens',
      shortName: 'MTL',
      badgeEmoji: '🇨🇦',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png',
      primaryColor: '#AF1E2D',
      secondaryColor: '#192168'
    },
    homeScore: 3,
    awayScore: 2,
    periodScores: ['1-0', '1-1', '1-1'],
    events: [
      { id: 'nhl-ev-b1', minute: 12, type: 'goal', team: 'home', player: 'David Pastrnak', assist: 'Brad Marchand', detail: 'Gol com tiro de pulso sem ângulo' },
      { id: 'nhl-ev-b2', minute: 29, type: 'goal', team: 'away', player: 'Cole Caufield', assist: 'Nick Suzuki', detail: 'Disparo de primeira na entrada da zona neutra' },
      { id: 'nhl-ev-b3', minute: 38, type: 'goal', team: 'home', player: 'Brad Marchand', detail: 'Gol com shorthanded em desvantagem numérica!' },
      { id: 'nhl-ev-b4', minute: 56, type: 'goal', team: 'away', player: 'Juraj Slafkovsky', detail: 'Empate temporário no rebote' },
      { id: 'nhl-ev-b5', minute: 58, type: 'goal', team: 'home', player: 'Charlie McAvoy', detail: 'Gol da vitória nos minutos finais com puck desviado' },
    ],
    stats: {
      possession: [52, 48],
      shotsTotal: [33, 29],
      shotsOnTarget: [33, 29],
      xG: [2.8, 2.2],
      corners: [0, 0],
      fouls: [10, 12],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [2, 3],
      bigChances: [6, 5],
      passesTotal: [165, 155],
      passAccuracy: [86, 83],
      goalkeeperSaves: [27, 30],
    },
    sportStatsDetail: {
      hockey: {
        shotsOnGoal: [33, 29],
        powerPlay: ['1/4 (25%)', '1/3 (33%)'],
        penaltyMinutes: [8, 10],
        faceoffWinPct: ['53.5%', '46.5%'],
        hits: [30, 27],
        blockedShots: [17, 15],
        saves: [27, 30],
        periods: [[1, 1, 1], [0, 1, 1]]
      }
    },
    lineupHome: {
      formation: '1ª Linha & Goleiro',
      coach: 'Jim Montgomery',
      starters: [
        { number: 88, name: 'David Pastrnak', position: 'ALA DIR', gridPos: { x: 75, y: 70 }, rating: 9.3 },
        { number: 63, name: 'Brad Marchand', position: 'ALA ESQ (C)', gridPos: { x: 25, y: 70 }, rating: 9.1, captain: true },
        { number: 13, name: 'Charlie Coyle', position: 'CENTRO', gridPos: { x: 50, y: 60 }, rating: 8.2 },
        { number: 73, name: 'Charlie McAvoy', position: 'DEFENSOR', gridPos: { x: 70, y: 35 }, rating: 8.8 },
        { number: 27, name: 'Hampus Lindholm', position: 'DEFENSOR', gridPos: { x: 30, y: 35 }, rating: 8.0 },
        { number: 1, name: 'Jeremy Swayman', position: 'GOLEIRO', gridPos: { x: 50, y: 10 }, rating: 9.0 },
      ],
      substitutes: ['Pavel Zacha', 'Trent Frederic', 'Brandon Carlo', 'Morgan Geekie']
    },
    lineupAway: {
      formation: '1ª Linha & Goleiro',
      coach: 'Martin St. Louis',
      starters: [
        { number: 14, name: 'Nick Suzuki', position: 'CENTRO (C)', gridPos: { x: 50, y: 60 }, rating: 8.5, captain: true },
        { number: 22, name: 'Cole Caufield', position: 'ALA DIR', gridPos: { x: 75, y: 70 }, rating: 8.8 },
        { number: 20, name: 'Juraj Slafkovsky', position: 'ALA ESQ', gridPos: { x: 25, y: 70 }, rating: 8.3 },
        { number: 8, name: 'Mike Matheson', position: 'DEFENSOR', gridPos: { x: 30, y: 35 }, rating: 7.9 },
        { number: 21, name: 'Kaiden Guhle', position: 'DEFENSOR', gridPos: { x: 70, y: 35 }, rating: 7.8 },
        { number: 35, name: 'Sam Montembeault', position: 'GOLEIRO', gridPos: { x: 50, y: 10 }, rating: 8.2 },
      ],
      substitutes: ['Kirby Dach', 'Alex Newhook', 'Brendan Gallagher', 'Arber Xhekaj']
    }
  },

  // ==========================================
  // VÔLEI (SUPERLIGA BRASIL & LIGA DAS NAÇÕES)
  // ==========================================
  {
    id: 'volei-match-1',
    sport: 'volei',
    sportCategory: 'Vôlei - Superliga Masculina',
    league: 'Superliga Bet7k Masculina',
    leagueIcon: '🏐',
    round: 'Semifinal - Jogo 2',
    status: 'LIVE',
    minute: 78, // 4º Set
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: '4º Set [22-20]',
    stadium: 'Ginásio do Riacho, Contagem, MG',
    referee: 'Paulo Luís Beal, Sílvio Silveira',
    stadiumCapacity: '3.000 lugares',
    broadcast: ['SporTV 2', 'Canal Vôlei Brasil'],
    homeTeam: {
      id: 'sada_cruzeiro',
      name: 'Sada Cruzeiro Vôlei',
      shortName: 'CRU',
      badgeEmoji: '🏐',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/824.png',
      primaryColor: '#005CA9',
      secondaryColor: '#ffffff'
    },
    awayTeam: {
      id: 'volei_renata',
      name: 'Vôlei Renata / Campinas',
      shortName: 'REN',
      badgeEmoji: '🏐',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/pt/8/87/V%C3%B4lei_Renata.png',
      primaryColor: '#002B49',
      secondaryColor: '#FF671F'
    },
    homeScore: 2,
    awayScore: 1,
    periodScores: ['25-22', '21-25', '25-18', '22-20'],
    events: [
      { id: 'vol-ev-1', minute: 15, type: 'ace', team: 'home', player: 'Lucão', detail: 'Ace espetacular de saque flutuante a 108 km/h na linha de fundo' },
      { id: 'vol-ev-2', minute: 34, type: 'block', team: 'away', player: 'Maurício Souza', detail: 'Bloqueio duplo fechando a diagonal do ponteiro' },
      { id: 'vol-ev-3', minute: 52, type: 'point', team: 'home', player: 'Wallace Souza', detail: 'Ataque fulminante na saída de rede após levantamento perfeito' },
      { id: 'vol-ev-4', minute: 68, type: 'block', team: 'home', player: 'Otávio', detail: 'Toco monstruoso no meio de rede' },
      { id: 'vol-ev-5', minute: 76, type: 'ace', team: 'home', player: 'Miguel López', detail: 'Saque viagem devastador no fundo de quadra' },
    ],
    stats: {
      possession: [50, 50],
      shotsTotal: [86, 79],
      shotsOnTarget: [64, 58],
      xG: [2.1, 1.8],
      corners: [0, 0],
      fouls: [12, 14],
      yellowCards: [1, 1],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [12, 9],
      passesTotal: [140, 132],
      passAccuracy: [78, 73],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      volleyball: {
        sets: ['25-22', '21-25', '25-18', '22-20 (Em andamento)'],
        attackPoints: [58, 51],
        blockPoints: [14, 8],
        acePoints: [7, 3],
        opponentErrors: [18, 19],
        receptionEfficiency: ['76%', '68%'],
        topScorer: {
          home: 'Wallace Souza (22 pontos, 65% de aproveitamento)',
          away: 'Bruno Lima (18 pontos)'
        }
      }
    },
    lineupHome: {
      formation: 'Titulares em Quadra',
      coach: 'Filipe Ferraz',
      starters: [
        { number: 8, name: 'Wallace Souza', position: 'OPOSTO', gridPos: { x: 80, y: 25 }, rating: 9.4 },
        { number: 16, name: 'Lucão', position: 'CENTRAL', gridPos: { x: 50, y: 20 }, rating: 9.1 },
        { number: 18, name: 'Miguel López', position: 'PONTEIRO', gridPos: { x: 20, y: 25 }, rating: 9.0 },
        { number: 5, name: 'Uriarte', position: 'LEVANTADOR', gridPos: { x: 65, y: 40 }, rating: 8.8 },
        { number: 12, name: 'Otávio', position: 'CENTRAL', gridPos: { x: 35, y: 20 }, rating: 8.5 },
        { number: 17, name: 'Lukinha', position: 'LÍBERO', gridPos: { x: 50, y: 70 }, rating: 8.7 },
      ],
      substitutes: ['Rodriguinho', 'Cledenilson', 'Welinton Oppenkoski', 'Bauer']
    },
    lineupAway: {
      formation: 'Titulares em Quadra',
      coach: 'Horacio Dileo',
      starters: [
        { number: 1, name: 'Bruninho', position: 'LEVANTADOR (C)', gridPos: { x: 65, y: 40 }, rating: 9.0, captain: true },
        { number: 9, name: 'Bruno Lima', position: 'OPOSTO', gridPos: { x: 80, y: 25 }, rating: 8.7 },
        { number: 13, name: 'Maurício Souza', position: 'CENTRAL', gridPos: { x: 50, y: 20 }, rating: 8.4 },
        { number: 14, name: 'Adriano Cavalcante', position: 'PONTEIRO', gridPos: { x: 20, y: 25 }, rating: 8.6 },
        { number: 4, name: 'Lucas Borges', position: 'PONTEIRO', gridPos: { x: 20, y: 60 }, rating: 7.9 },
        { number: 11, name: 'Lukaco', position: 'LÍBERO', gridPos: { x: 50, y: 70 }, rating: 8.1 },
      ],
      substitutes: ['Cristiano', 'Leo Andrade', 'Bandini', 'Newton']
    }
  },
  {
    id: 'volei-match-2',
    sport: 'volei',
    sportCategory: 'Vôlei - Superliga Feminina',
    league: 'Superliga Feminina de Vôlei',
    leagueIcon: '🏐',
    round: 'Final - Clássico Pão de Queijo',
    status: 'FINISHED',
    minute: 105,
    date: 'Ontem',
    dateIso: '2026-10-24',
    time: 'Encerrado (3x2)',
    stadium: 'Arena Dentil, Uberlândia, MG',
    referee: 'Jediel de Carvalho, Anderson Caçador',
    broadcast: ['SporTV 2', 'TV Globo'],
    homeTeam: {
      id: 'praia_clube',
      name: 'Dentil Praia Clube',
      shortName: 'PRA',
      badgeEmoji: '🟡⚫',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/pt/e/eb/DentilPraiaClube.png',
      primaryColor: '#FFD700',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'gerdau_minas',
      name: 'Gerdau Minas',
      shortName: 'MIN',
      badgeEmoji: '🔵⚪',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/pt/9/91/MinasTenisClube.png',
      primaryColor: '#003366',
      secondaryColor: '#ffffff'
    },
    homeScore: 3,
    awayScore: 2,
    periodScores: ['23-25', '25-22', '21-25', '25-23', '15-12'],
    events: [
      { id: 'vfem-1', minute: 22, type: 'ace', team: 'away', player: 'Thaisa Daher', detail: 'Ace sensacional na linha com saque potente' },
      { id: 'vfem-2', minute: 48, type: 'block', team: 'home', player: 'Carol Gattaz', detail: 'Paredão no ataque da oposta adversária' },
      { id: 'vfem-3', minute: 75, type: 'point', team: 'home', player: 'Sofya Kuznetsova', detail: 'Ataque violentíssimo na paralela sem defesa' },
      { id: 'vfem-4', minute: 98, type: 'point', team: 'away', player: 'Kisy Nascimento', detail: 'Largadinha inteligente por cima do bloqueio' },
      { id: 'vfem-5', minute: 104, type: 'block', team: 'home', player: 'Milka Marcília', detail: 'Ponto do título no tie-break com bloqueio simples!' },
    ],
    stats: {
      possession: [50, 50],
      shotsTotal: [112, 108],
      shotsOnTarget: [82, 79],
      xG: [2.5, 2.4],
      corners: [0, 0],
      fouls: [10, 11],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [16, 15],
      passesTotal: [180, 175],
      passAccuracy: [81, 79],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      volleyball: {
        sets: ['23-25', '25-22', '21-25', '25-23', '15-12 (Finalizado)'],
        attackPoints: [69, 66],
        blockPoints: [18, 16],
        acePoints: [8, 6],
        opponentErrors: [24, 23],
        receptionEfficiency: ['78%', '75%'],
        topScorer: {
          home: 'Sofya Kuznetsova (28 pontos, MVP da partida)',
          away: 'Kisy Nascimento (25 pontos)'
        }
      }
    },
    lineupHome: {
      formation: 'Titulares Campeãs',
      coach: 'Paulo Coco',
      starters: [
        { number: 4, name: 'Claudia Bueno', position: 'LEVANTADORA', gridPos: { x: 65, y: 40 }, rating: 8.9 },
        { number: 7, name: 'Sofya Kuznetsova', position: 'PONTEIRA', gridPos: { x: 20, y: 25 }, rating: 9.7 },
        { number: 10, name: 'Tainara Santos', position: 'OPOSTA', gridPos: { x: 80, y: 25 }, rating: 8.8 },
        { number: 2, name: 'Carol Gattaz', position: 'CENTRAL', gridPos: { x: 50, y: 20 }, rating: 9.2 },
        { number: 15, name: 'Milka Marcília', position: 'CENTRAL', gridPos: { x: 35, y: 20 }, rating: 8.7 },
        { number: 19, name: 'Suelen Pinto', position: 'LÍBERO', gridPos: { x: 50, y: 70 }, rating: 9.0 },
      ],
      substitutes: ['Monique Pavão', 'Pri Souza', 'Ju Carrijo', 'Natinha']
    },
    lineupAway: {
      formation: 'Titulares Minas',
      coach: 'Nicola Negro',
      starters: [
        { number: 6, name: 'Thaisa Daher', position: 'CENTRAL (C)', gridPos: { x: 50, y: 20 }, rating: 9.3, captain: true },
        { number: 9, name: 'Kisy Nascimento', position: 'OPOSTA', gridPos: { x: 80, y: 25 }, rating: 9.1 },
        { number: 12, name: 'Pri Daroit', position: 'PONTEIRA', gridPos: { x: 20, y: 25 }, rating: 8.5 },
        { number: 1, name: 'Jenna Gray', position: 'LEVANTADORA', gridPos: { x: 65, y: 40 }, rating: 8.6 },
        { number: 11, name: 'Julia Kudiess', position: 'CENTRAL', gridPos: { x: 35, y: 20 }, rating: 8.4 },
        { number: 18, name: 'Nyeme Costa', position: 'LÍBERO', gridPos: { x: 50, y: 70 }, rating: 8.9 },
      ],
      substitutes: ['Fran Tomazoni', 'Peña', 'Larissa Fortes', 'Kelly Gomes']
    }
  },

  // ==========================================
  // NATAÇÃO (MUNDIAL DE ESPORTES AQUÁTICOS & TROFÉU BRASIL)
  // ==========================================
  {
    id: 'natacao-match-1',
    sport: 'natacao',
    sportCategory: 'Natação - Mundial Aquatics',
    league: 'Campeonato Mundial de Esportes Aquáticos',
    leagueIcon: '🏊',
    round: 'Final A - 50m Nado Livre Masculino',
    status: 'FINISHED',
    minute: 1,
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: 'Encerrado (Prova de Velocidade Pura)',
    stadium: 'Centro Aquático Internacional, Piscina Olímpica 50m',
    referee: 'World Aquatics Official Panel',
    broadcast: ['SporTV 3', 'CazéTV', 'Canal Olímpico do Brasil'],
    aquaticDetail: {
      eventDistance: '50m Nado Livre',
      stroke: 'Livre / Crawl',
      pool: 'Piscina Longa (50 metros, 8 Raias)',
      worldRecord: '20.91s (César Cielo - Brasil 🇧🇷)'
    },
    homeTeam: {
      id: 'guilherme_caribe',
      name: 'Guilherme Caribé (Brasil)',
      shortName: 'BRA',
      badgeEmoji: '🇧🇷',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png',
      primaryColor: '#009b3a',
      secondaryColor: '#fedf00'
    },
    awayTeam: {
      id: 'cameron_mcevoy',
      name: 'Cameron McEvoy (Austrália)',
      shortName: 'AUS',
      badgeEmoji: '🇦🇺',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png',
      primaryColor: '#002B7F',
      secondaryColor: '#ffffff'
    },
    homeScore: 21,
    awayScore: 21,
    periodScores: ['Tempo: 21.34s vs 21.06s'],
    events: [
      { id: 'nat-1', minute: 1, type: 'point', team: 'away', player: 'Cameron McEvoy (AUS)', detail: 'Largada relâmpago com tempo de reação de 0.58s na Raia 4' },
      { id: 'nat-2', minute: 1, type: 'point', team: 'home', player: 'Guilherme Caribé (BRA)', detail: 'Recuperação impressionante nos últimos 15 metros cravando medalha de Prata com 21.34s!' },
    ],
    stats: {
      possession: [50, 50],
      shotsTotal: [50, 50],
      shotsOnTarget: [50, 50],
      xG: [1.0, 1.0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [4, 4],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      swimming: {
        eventDistance: '50m Nado Livre Masculino',
        category: 'Final A - Disputa por Medalha',
        poolType: 'Piscina Longa Olímpica (50m)',
        worldRecord: '20.91s (César Cielo - 2009)',
        laneResults: [
          { lane: 4, swimmer: 'Cameron McEvoy', country: 'Austrália', flag: '🇦🇺', finalTime: '21.06s', diff: 'Líder', rank: 1, badge: 'OURO' },
          { lane: 5, swimmer: 'Guilherme Caribé', country: 'Brasil', flag: '🇧🇷', club: 'Flamengo / CBDA', finalTime: '21.34s', diff: '+0.28s', rank: 2, badge: 'PRATA' },
          { lane: 3, swimmer: 'Ben Proud', country: 'Grã-Bretanha', flag: '🇬🇧', finalTime: '21.41s', diff: '+0.35s', rank: 3, badge: 'BRONZE' },
          { lane: 2, swimmer: 'Caio Pumputis', country: 'Brasil', flag: '🇧🇷', club: 'Pinheiros', finalTime: '21.68s', diff: '+0.62s', rank: 4 },
          { lane: 6, swimmer: 'Florent Manaudou', country: 'França', flag: '🇫🇷', finalTime: '21.72s', diff: '+0.66s', rank: 5 },
          { lane: 7, swimmer: 'Jack Alexy', country: 'Estados Unidos', flag: '🇺🇸', finalTime: '21.79s', diff: '+0.73s', rank: 6 },
          { lane: 1, swimmer: 'Kenzo Simons', country: 'Holanda', flag: '🇳🇱', finalTime: '21.95s', diff: '+0.89s', rank: 7 },
          { lane: 8, swimmer: 'Ji Yu-chan', country: 'Coreia do Sul', flag: '🇰🇷', finalTime: '22.04s', diff: '+0.98s', rank: 8 },
        ]
      }
    },
    lineupHome: {
      formation: 'Pódio Mundial',
      coach: 'Fernando Possenti (Brasil)',
      starters: [
        { number: 5, name: 'Guilherme Caribé (Raia 5)', position: 'VELOCISTA', gridPos: { x: 50, y: 50 }, rating: 9.6 },
        { number: 2, name: 'Caio Pumputis (Raia 2)', position: 'VELOCISTA', gridPos: { x: 25, y: 50 }, rating: 8.9 },
      ],
      substitutes: ['Marcelo Chierighini', 'Gabriel Santos', 'Felipe Ribeiro']
    },
    lineupAway: {
      formation: 'Pódio Mundial',
      coach: 'Rohan Taylor (Austrália)',
      starters: [
        { number: 4, name: 'Cameron McEvoy (Raia 4 - Ouro)', position: 'CAMPEÃO', gridPos: { x: 50, y: 50 }, rating: 9.9 },
        { number: 3, name: 'Ben Proud (Raia 3 - Bronze)', position: 'VELOCISTA', gridPos: { x: 75, y: 50 }, rating: 9.2 },
      ],
      substitutes: ['Kyle Chalmers', 'Flynn Southam', 'Isaac Cooper']
    }
  },
  {
    id: 'natacao-match-2',
    sport: 'natacao',
    sportCategory: 'Natação - Mundial Aquatics',
    league: 'Campeonato Mundial de Esportes Aquáticos',
    leagueIcon: '🏊',
    round: 'Final - 400m Medley Individual',
    status: 'LIVE',
    minute: 3, // 300m Peito
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: 'Ao Vivo (Virada 300m Peito)',
    stadium: 'Centro Aquático de Paris, Piscina Olímpica',
    referee: 'World Aquatics',
    broadcast: ['SporTV 3', 'CazéTV'],
    aquaticDetail: {
      eventDistance: '400m Medley Individual',
      stroke: 'Borboleta / Costas / Peito / Livre',
      pool: 'Piscina Longa (50 metros)',
      worldRecord: '4:02.50 (Léon Marchand - França 🇫🇷)'
    },
    homeTeam: {
      id: 'leon_marchand',
      name: 'Léon Marchand (França)',
      shortName: 'FRA',
      badgeEmoji: '🇫🇷',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png',
      primaryColor: '#002395',
      secondaryColor: '#ED2939'
    },
    awayTeam: {
      id: 'carson_foster',
      name: 'Carson Foster (EUA)',
      shortName: 'USA',
      badgeEmoji: '🇺🇸',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png',
      primaryColor: '#B22234',
      secondaryColor: '#3C3B6E'
    },
    homeScore: 3,
    awayScore: 0,
    periodScores: ['Parcial 300m: 3:03.12 (Abaixo do Recorde Mundial!)'],
    events: [
      { id: 'med-1', minute: 1, type: 'point', team: 'home', player: 'Léon Marchand', detail: '100m Borboleta cravado em 54.32s - na frente do recorde mundial' },
      { id: 'med-2', minute: 2, type: 'point', team: 'home', player: 'Léon Marchand', detail: '200m Costas com virada impecável e nado subaquático de 14.5m' },
      { id: 'med-3', minute: 3, type: 'point', team: 'home', player: 'Léon Marchand', detail: '300m Nado Peito com vantagem de 3.8 segundos para o segundo colocado!' },
    ],
    stats: {
      possession: [65, 35],
      shotsTotal: [40, 40],
      shotsOnTarget: [40, 40],
      xG: [1.0, 1.0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [5, 2],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      swimming: {
        eventDistance: '400m Medley Individual Masculino',
        category: 'Final Olímpica / Mundial',
        poolType: 'Piscina Longa (50m)',
        worldRecord: '4:02.50 (Léon Marchand)',
        laneResults: [
          { lane: 4, swimmer: 'Léon Marchand', country: 'França', flag: '🇫🇷', split50m: '54.32 (Fly) / 1:02.40 (Back) / 1:06.40 (Breast)', finalTime: '3:03.12 (Projeção 4:01.88 - Recorde!)', diff: 'Líder Isolado', rank: 1, badge: 'RECORD' },
          { lane: 5, swimmer: 'Carson Foster', country: 'Estados Unidos', flag: '🇺🇸', finalTime: '3:06.94', diff: '+3.82s', rank: 2 },
          { lane: 3, swimmer: 'Daiya Seto', country: 'Japão', flag: '🇯🇵', finalTime: '3:07.50', diff: '+4.38s', rank: 3 },
          { lane: 6, swimmer: 'Alberto Razzetti', country: 'Itália', flag: '🇮🇹', finalTime: '3:08.12', diff: '+5.00s', rank: 4 },
        ]
      }
    },
    lineupHome: {
      formation: 'Raias Centrais',
      coach: 'Bob Bowman',
      starters: [{ number: 4, name: 'Léon Marchand (Raia 4)', position: 'MEDLEY', gridPos: { x: 50, y: 50 }, rating: 9.9 }],
      substitutes: []
    },
    lineupAway: {
      formation: 'Raias Centrais',
      coach: 'Eddie Reese',
      starters: [{ number: 5, name: 'Carson Foster (Raia 5)', position: 'MEDLEY', gridPos: { x: 50, y: 50 }, rating: 9.2 }],
      substitutes: []
    }
  },

  // ==========================================
  // JIU-JITSU (IBJJF WORLD CHAMPIONSHIP & ADCC)
  // ==========================================
  {
    id: 'bjj-match-1',
    sport: 'jiujitsu',
    sportCategory: 'Jiu-Jitsu - IBJJF World',
    league: 'IBJJF World Jiu-Jitsu Championship 2026',
    leagueIcon: '🥋',
    round: 'Final Adulto Faixa-Preta - Peso Médio (-82kg)',
    status: 'LIVE',
    minute: 8, // 8º minuto de 10
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: '8:15 / 10:00 (Tempo Real)',
    stadium: 'Walter Pyramid, Long Beach, Califórnia',
    referee: 'Árbitro Oficial IBJJF / CBJJ',
    broadcast: ['FloGrappling', 'YouTube IBJJF'],
    combatDetail: {
      modality: 'jiujitsu',
      weightClass: 'Peso Médio (-82.3 kg com Kimono)',
      beltOrDivision: 'Faixa-Preta Adulto Masculino',
      tatameOrRing: 'Tatame Central nº 1 - Arena Principal',
      decisionType: 'Disputa de Pontos IBJJF e Vantagens'
    },
    homeTeam: {
      id: 'mica_galvao',
      name: 'Mica Galvão (Melqui Galvão)',
      shortName: 'MICA',
      badgeEmoji: '🥋',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png',
      primaryColor: '#00ff88',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'tye_ruotolo',
      name: 'Tye Ruotolo (Atos Jiu-Jitsu)',
      shortName: 'RUO',
      badgeEmoji: '🥋',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png',
      primaryColor: '#002B7F',
      secondaryColor: '#ffffff'
    },
    homeScore: 4,
    awayScore: 2,
    periodScores: ['Pontos IBJJF: 4x2 | Vantagens: 2x1 | Punições: 0x0'],
    events: [
      { id: 'bjj-1', minute: 2, type: 'point', team: 'home', player: 'Mica Galvão', detail: 'Queda clássica de Kouchi Gari pontuando 2 pontos limpos' },
      { id: 'bjj-2', minute: 4, type: 'point', team: 'away', player: 'Tye Ruotolo', detail: 'Raspagem de guarda De La Riva e subida rápida (2 pontos)' },
      { id: 'bjj-3', minute: 6, type: 'point', team: 'home', player: 'Mica Galvão', detail: 'Passagem relâmpago para o joelho na barriga e estabilização (2 pontos)' },
      { id: 'bjj-4', minute: 7, type: 'sub', team: 'home', player: 'Mica Galvão', detail: 'Tentativa perigosa de chave de braço voadora (Armbar) gerando 1 Vantagem' },
    ],
    stats: {
      possession: [58, 42],
      shotsTotal: [10, 8],
      shotsOnTarget: [6, 4],
      xG: [2.0, 1.2],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [4, 2],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      combat: {
        modality: 'jiujitsu',
        weightClass: '-82.3 kg (Peso Médio)',
        beltOrDivision: 'Faixa-Preta Adulto Masculino',
        duration: '10:00 minutos',
        matOrRing: 'Tatame 1 - Walter Pyramid',
        bjjScores: {
          homePoints: 4,
          awayPoints: 2,
          homeAdvantages: 2,
          awayAdvantages: 1,
          homePenalties: 0,
          awayPenalties: 0,
          breakdown: {
            takedowns: [1, 0], // Quedas
            guardPasses: [0, 0], // Passagens de guarda
            mountOrBack: [1, 1], // Joelho na barriga / Raspagem
          }
        }
      }
    },
    lineupHome: {
      formation: 'Canto Azul',
      coach: 'Melquisedeque Galvão',
      starters: [{ number: 1, name: 'Mica Galvão (Faixa-Preta)', position: 'LUTADOR', gridPos: { x: 50, y: 50 }, rating: 9.8 }],
      substitutes: ['Fabricio Andrey', 'Diogo Reis']
    },
    lineupAway: {
      formation: 'Canto Branco',
      coach: 'André Galvão (Atos JJ)',
      starters: [{ number: 2, name: 'Tye Ruotolo (Faixa-Preta)', position: 'LUTADOR', gridPos: { x: 50, y: 50 }, rating: 9.5 }],
      substitutes: ['Kade Ruotolo', 'Lucas Barbosa']
    }
  },
  {
    id: 'bjj-match-2',
    sport: 'jiujitsu',
    sportCategory: 'Jiu-Jitsu - ADCC Submission',
    league: 'ADCC Submission Fighting World Championship',
    leagueIcon: '🥋',
    round: 'Superluta Principal Absoluto Sem Kimono (No-Gi)',
    status: 'FINISHED',
    minute: 12,
    date: 'Ontem',
    dateIso: '2026-10-24',
    time: 'Encerrado por Finalização',
    stadium: 'T-Mobile Arena, Las Vegas, Nevada',
    referee: 'Peter Baltaliysky (ADCC Head Referee)',
    broadcast: ['FloGrappling', 'UFC Fight Pass'],
    combatDetail: {
      modality: 'jiujitsu',
      weightClass: 'Superluta Absoluta (Sem Limite de Peso)',
      beltOrDivision: 'ADCC Hall of Fame Championship',
      tatameOrRing: 'Tatame Olímpico ADCC',
      winner: 'home',
      decisionType: 'Finalização por Mata-Leão (Rear Naked Choke) aos 11:45'
    },
    homeTeam: {
      id: 'gordon_ryan',
      name: 'Gordon Ryan (New Wave JJ)',
      shortName: 'RYAN',
      badgeEmoji: '🇺🇸',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png',
      primaryColor: '#002B7F',
      secondaryColor: '#B22234'
    },
    awayTeam: {
      id: 'felipe_pena',
      name: 'Felipe Preguiça (FP Team)',
      shortName: 'PENA',
      badgeEmoji: '🇧🇷',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png',
      primaryColor: '#009b3a',
      secondaryColor: '#fedf00'
    },
    homeScore: 6,
    awayScore: 0,
    periodScores: ['Tempo Final: 11:45 - Finalização'],
    events: [
      { id: 'adcc-1', minute: 4, type: 'point', team: 'home', player: 'Gordon Ryan', detail: 'Passagem de meia guarda pesada com pressão de ombro' },
      { id: 'adcc-2', minute: 8, type: 'point', team: 'home', player: 'Gordon Ryan', detail: 'Pegada de costas com ganchos estabilizados (+4 pontos)' },
      { id: 'adcc-3', minute: 12, type: 'submission', team: 'home', player: 'Gordon Ryan', detail: 'Finalização incontestável com Mata-Leão ajustado no pescoço!' },
    ],
    stats: {
      possession: [70, 30],
      shotsTotal: [8, 2],
      shotsOnTarget: [6, 1],
      xG: [3.0, 0.4],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [4, 1],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      combat: {
        modality: 'jiujitsu',
        weightClass: 'Superluta Absoluta Sem Kimono',
        duration: '20:00 minutos',
        matOrRing: 'Tatame ADCC Vegas',
        decisionType: 'Finalização (Mata-Leão)',
        winner: 'home',
        bjjScores: {
          homePoints: 6,
          awayPoints: 0,
          homeAdvantages: 3,
          awayAdvantages: 0,
          homePenalties: 0,
          awayPenalties: 1,
          breakdown: {
            takedowns: [0, 0],
            guardPasses: [1, 0],
            mountOrBack: [1, 0],
          }
        }
      }
    },
    lineupHome: {
      formation: 'Canto Vermelho',
      coach: 'John Danaher',
      starters: [{ number: 1, name: 'Gordon Ryan', position: 'ATLETA', gridPos: { x: 50, y: 50 }, rating: 9.9 }],
      substitutes: ['Garry Tonon', 'Giancarlo Bodoni']
    },
    lineupAway: {
      formation: 'Canto Azul',
      coach: 'Vinicius Draculino',
      starters: [{ number: 2, name: 'Felipe Preguiça', position: 'ATLETA', gridPos: { x: 50, y: 50 }, rating: 9.1 }],
      substitutes: ['Augusto Tanquinho', 'Kaynan Duarte']
    }
  },

  // ==========================================
  // JUDÔ (CIRCUITO MUNDIAL IJF & GRAND SLAM)
  // ==========================================
  {
    id: 'judo-match-1',
    sport: 'judo',
    sportCategory: 'Judô - Grand Slam IJF',
    league: 'IJF World Judo Tour - Grand Slam de Paris',
    leagueIcon: '🥋',
    round: 'Final Peso Pesado (+100kg Masculino)',
    status: 'LIVE',
    minute: 3, // 3º minuto de 4
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: '03:15 / 04:00 (Golden Score iminente)',
    stadium: 'Accor Arena de Bercy, Paris, França',
    referee: 'Árbitro Chefe IJF (3 Árbitros com VAR Judô)',
    broadcast: ['SporTV 3', 'JudoTV.com', 'Canal Olímpico do Brasil'],
    combatDetail: {
      modality: 'judo',
      weightClass: 'Categoria +100kg (Pesado)',
      beltOrDivision: 'Faixa-Preta / Judoca Olímpico',
      tatameOrRing: 'Tatame 1 (Dojô Oficial de Paris)',
      decisionType: 'Waza-ari e Shidos (Penalidades)'
    },
    homeTeam: {
      id: 'teddy_riner',
      name: 'Teddy Riner (França)',
      shortName: 'RIN',
      badgeEmoji: '🇫🇷',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png',
      primaryColor: '#002395',
      secondaryColor: '#ffffff'
    },
    awayTeam: {
      id: 'rafael_silva',
      name: 'Rafael Silva "Baby" (Brasil)',
      shortName: 'BABY',
      badgeEmoji: '🇧🇷',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png',
      primaryColor: '#009b3a',
      secondaryColor: '#fedf00'
    },
    homeScore: 1, // 1 Waza-ari
    awayScore: 0,
    periodScores: ['Pontuação IJF: 1 Waza-ari (Teddy) x 0 (Baby) | Shidos: 1 x 2'],
    events: [
      { id: 'jud-1', minute: 1, type: 'sub', team: 'away', player: 'Rafael Silva', detail: 'Shido aplicado por falta de pegada agressiva (kumikata passivo)' },
      { id: 'jud-2', minute: 2, type: 'sub', team: 'home', player: 'Teddy Riner', detail: 'Shido aplicado por falso ataque em entrada de Seoi-nage' },
      { id: 'jud-3', minute: 3, type: 'point', team: 'home', player: 'Teddy Riner', detail: 'Waza-ari sensacional aplicado com entrada de Harai-goshi na borda do tatame!' },
      { id: 'jud-4', minute: 4, type: 'sub', team: 'away', player: 'Rafael Silva', detail: 'Shido por saída do tatame na disputa de pegada no kimono' },
    ],
    stats: {
      possession: [55, 45],
      shotsTotal: [6, 4],
      shotsOnTarget: [4, 2],
      xG: [1.8, 0.9],
      corners: [0, 0],
      fouls: [1, 2],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [3, 1],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      combat: {
        modality: 'judo',
        weightClass: '+100kg Masculino',
        duration: '04:00 minutos oficiais',
        matOrRing: 'Tatame Central Bercy',
        judokaScores: {
          homeIppon: 0,
          awayIppon: 0,
          homeWazaari: 1,
          awayWazaari: 0,
          homeShido: 1,
          awayShido: 2,
        }
      }
    },
    lineupHome: {
      formation: 'Judogi Branco',
      coach: 'Franck Chambily (França)',
      starters: [{ number: 1, name: 'Teddy Riner (Tricampeão Olímpico)', position: 'JUDOCA', gridPos: { x: 50, y: 50 }, rating: 9.9 }],
      substitutes: []
    },
    lineupAway: {
      formation: 'Judogi Azul',
      coach: 'Kiko Pereira (CBJ Brasil)',
      starters: [{ number: 2, name: 'Rafael Silva Baby (Medalhista Olímpico)', position: 'JUDOCA', gridPos: { x: 50, y: 50 }, rating: 9.3 }],
      substitutes: []
    }
  },
  {
    id: 'judo-match-2',
    sport: 'judo',
    sportCategory: 'Judô - Grand Slam Tóquio',
    league: 'Campeonato Mundial IJF de Judô',
    leagueIcon: '🥋',
    round: 'Final Categoria -78kg Feminino',
    status: 'FINISHED',
    minute: 4,
    date: 'Ontem',
    dateIso: '2026-10-24',
    time: 'Encerrado por IPPON',
    stadium: 'Nippon Budokan, Tóquio, Japão',
    referee: 'Árbitro Internacional IJF',
    broadcast: ['SporTV 3', 'JudoTV.com'],
    combatDetail: {
      modality: 'judo',
      weightClass: '-78kg Feminino (Meio-Pesado)',
      beltOrDivision: 'Faixa-Preta / Judoca de Elite',
      tatameOrRing: 'Tatame de Honra Nippon Budokan',
      winner: 'home',
      decisionType: 'Vitória por IPPON aos 02:45 com entrada perfeita de Osoto-Gari'
    },
    homeTeam: {
      id: 'mayra_aguiar',
      name: 'Mayra Aguiar (Brasil)',
      shortName: 'MAY',
      badgeEmoji: '🇧🇷',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png',
      primaryColor: '#009b3a',
      secondaryColor: '#fedf00'
    },
    awayTeam: {
      id: 'alice_bellandi',
      name: 'Alice Bellandi (Itália)',
      shortName: 'ITA',
      badgeEmoji: '🇮🇹',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png',
      primaryColor: '#009246',
      secondaryColor: '#ce2b37'
    },
    homeScore: 10, // Ippon = 10 pts
    awayScore: 0,
    periodScores: ['Ippon aos 02:45 de luta'],
    events: [
      { id: 'jud-f1', minute: 1, type: 'sub', team: 'away', player: 'Alice Bellandi', detail: 'Tentativa de contra-golpe bloqueada no chão' },
      { id: 'jud-f2', minute: 2, type: 'sub_ippon', team: 'home', player: 'Mayra Aguiar', detail: 'IPPON Espetacular! Golpe de Osoto-Gari com as costas da adversária chapadas no tatame!' },
    ],
    stats: {
      possession: [60, 40],
      shotsTotal: [4, 2],
      shotsOnTarget: [3, 1],
      xG: [2.5, 0.3],
      corners: [0, 0],
      fouls: [0, 1],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [3, 0],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      combat: {
        modality: 'judo',
        weightClass: '-78kg Feminino',
        duration: '02:45 (Encerrado)',
        matOrRing: 'Nippon Budokan',
        decisionType: 'Ippon por Osoto-Gari',
        winner: 'home',
        judokaScores: {
          homeIppon: 1,
          awayIppon: 0,
          homeWazaari: 0,
          awayWazaari: 0,
          homeShido: 0,
          awayShido: 1,
        }
      }
    },
    lineupHome: {
      formation: 'Judogi Branco',
      coach: 'Sarah Menezes (Técnica CBJ)',
      starters: [{ number: 1, name: 'Mayra Aguiar (Tricampeã Mundial)', position: 'JUDOCA', gridPos: { x: 50, y: 50 }, rating: 9.9 }],
      substitutes: []
    },
    lineupAway: {
      formation: 'Judogi Azul',
      coach: 'Francesco Bruyere (Itália)',
      starters: [{ number: 2, name: 'Alice Bellandi (Campeã Olímpica)', position: 'JUDOCA', gridPos: { x: 50, y: 50 }, rating: 9.3 }],
      substitutes: []
    }
  },

  // ==========================================
  // MMA & LUTAS (UFC / PFL)
  // ==========================================
  {
    id: 'mma-match-1',
    sport: 'mma',
    sportCategory: 'MMA - UFC Championship',
    league: 'UFC 315 - Disputa de Cinturão',
    leagueIcon: '🥊',
    round: 'Disputa do Cinturão Meio-Pesado (5 Rounds)',
    status: 'LIVE',
    minute: 2, // 2º Round
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: 'Round 2 - 03:20',
    stadium: 'Delta Center, Salt Lake City, Utah',
    referee: 'Herb Dean',
    broadcast: ['UFC Fight Pass', 'Band', 'CazéTV'],
    combatDetail: {
      modality: 'mma',
      weightClass: 'Cinturão Meio-Pesado (Até 93 kg / 205 lbs)',
      beltOrDivision: 'Disputa de Título Mundial UFC',
      tatameOrRing: 'Octógono Oficial UFC',
      decisionType: 'Golpes Traumáticos e Tentativas de Nocaute'
    },
    homeTeam: {
      id: 'alex_poatan',
      name: 'Alex "Poatan" Pereira (Brasil)',
      shortName: 'POA',
      badgeEmoji: '🏹',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png',
      primaryColor: '#00ff88',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'magomed_ankalaev',
      name: 'Magomed Ankalaev (Rússia)',
      shortName: 'ANK',
      badgeEmoji: '🇷🇺',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png',
      primaryColor: '#0039A6',
      secondaryColor: '#D52B1E'
    },
    homeScore: 1,
    awayScore: 0,
    periodScores: ['R1: 10-9 Poatan | R2: Em andamento'],
    events: [
      { id: 'mma-1', minute: 1, type: 'point', team: 'home', player: 'Alex Poatan', detail: 'Chute baixo na panturrilha que fez o adversário perder a base' },
      { id: 'mma-2', minute: 2, type: 'point', team: 'away', player: 'Magomed Ankalaev', detail: 'Tentativa de queda com entrada no single leg defendida na grade' },
      { id: 'mma-3', minute: 2, type: 'point', team: 'home', player: 'Alex Poatan', detail: 'Cruzado de esquerda característico abalando o adversário no fim do R1!' },
    ],
    stats: {
      possession: [55, 45],
      shotsTotal: [48, 26],
      shotsOnTarget: [32, 14],
      xG: [2.2, 0.8],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [3, 1],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      combat: {
        modality: 'mma',
        weightClass: 'Meio-Pesado (93kg / 205 lbs)',
        duration: '5 Rounds de 5 minutos',
        matOrRing: 'Octógono UFC',
        mmaScores: {
          significantStrikes: [42, 19],
          takedowns: [0, 1],
          submissionAttempts: [0, 0],
          controlTime: ['01:10', '02:05'],
          knockdowns: [1, 0],
        }
      }
    },
    lineupHome: {
      formation: 'Canto Vermelho (Campeão)',
      coach: 'Glover Teixeira',
      starters: [{ number: 1, name: 'Alex Poatan Pereira (Campeão)', position: 'STRIKER', gridPos: { x: 50, y: 50 }, rating: 9.8 }],
      substitutes: ['Sean Strickland', 'Plinio Cruz']
    },
    lineupAway: {
      formation: 'Canto Azul (Desafiante)',
      coach: 'Sukhrab Magomedov',
      starters: [{ number: 2, name: 'Magomed Ankalaev', position: 'WRESTLER', gridPos: { x: 50, y: 50 }, rating: 9.1 }],
      substitutes: []
    }
  },

  // ==========================================
  // TÊNIS (GRAND SLAMS & ATP / WTA)
  // ==========================================
  {
    id: 'tenis-match-1',
    sport: 'tenis',
    sportCategory: 'Tênis - Grand Slam',
    league: 'Roland Garros - Final Masculina',
    leagueIcon: '🎾',
    round: 'Final Masculina - Saibro de Paris',
    status: 'LIVE',
    minute: 145, // 4º Set
    date: 'Hoje',
    dateIso: '2026-10-25',
    time: '4º Set [4-3]',
    stadium: 'Court Philippe-Chatrier, Paris, França',
    referee: 'Damien Dumusois (Cadeira)',
    broadcast: ['ESPN 2', 'Disney+', 'Star+'],
    homeTeam: {
      id: 'carlos_alcaraz',
      name: 'Carlos Alcaraz (Espanha)',
      shortName: 'ALC',
      badgeEmoji: '🇪🇸',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png',
      primaryColor: '#AA151B',
      secondaryColor: '#F1BF00'
    },
    awayTeam: {
      id: 'jannik_sinner',
      name: 'Jannik Sinner (Itália)',
      shortName: 'SIN',
      badgeEmoji: '🇮🇹',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png',
      primaryColor: '#009246',
      secondaryColor: '#ce2b37'
    },
    homeScore: 2,
    awayScore: 1,
    periodScores: ['6-3', '4-6', '7-6(4)', '4-3'],
    events: [
      { id: 'ten-1', minute: 35, type: 'point', team: 'home', player: 'Carlos Alcaraz', detail: 'Quebra de serviço (Break Point) com passadas cruzadas' },
      { id: 'ten-2', minute: 78, type: 'ace', team: 'away', player: 'Jannik Sinner', detail: 'Ace de 212 km/h na quina da quadra' },
      { id: 'ten-3', minute: 120, type: 'point', team: 'home', player: 'Carlos Alcaraz', detail: 'Drop shot espetacular na rede seguido de lob perfeito no tie-break' },
    ],
    stats: {
      possession: [51, 49],
      shotsTotal: [92, 88],
      shotsOnTarget: [68, 62],
      xG: [2.0, 1.8],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      bigChances: [8, 6],
      passesTotal: [0, 0],
      passAccuracy: [100, 100],
      goalkeeperSaves: [0, 0],
    },
    sportStatsDetail: {
      tennis: {
        sets: ['6-3', '4-6', '7-6(4)', '4-3 (4º Set em andamento)'],
        aces: [9, 12],
        doubleFaults: [3, 4],
        firstServePct: ['67%', '71%'],
        breakPointsConverted: ['3/7 (43%)', '2/6 (33%)'],
        winners: [44, 39],
        unforcedErrors: [28, 31],
      }
    },
    lineupHome: {
      formation: 'Tenista Destro',
      coach: 'Juan Carlos Ferrero',
      starters: [{ number: 1, name: 'Carlos Alcaraz (ESP)', position: 'TENISTA', gridPos: { x: 50, y: 75 }, rating: 9.8 }],
      substitutes: []
    },
    lineupAway: {
      formation: 'Tenista Destro',
      coach: 'Darren Cahill',
      starters: [{ number: 2, name: 'Jannik Sinner (ITA)', position: 'TENISTA', gridPos: { x: 50, y: 25 }, rating: 9.7 }],
      substitutes: []
    }
  }
];

export function getSportCategory(sport?: SportType): SportCategoryInfo {
  if (!sport) return SPORTS_CATEGORIES[1]; // default futebol
  return SPORTS_CATEGORIES.find(s => s.id === sport) || SPORTS_CATEGORIES[1];
}

export function filterMatchesBySport(matches: Match[], sport: SportType | 'todos'): Match[] {
  if (sport === 'todos') return matches;
  return matches.filter(m => (m.sport || 'futebol') === sport);
}
