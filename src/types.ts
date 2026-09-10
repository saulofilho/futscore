export type MatchStatus = 'LIVE' | 'SCHEDULED' | 'FINISHED' | 'HT';

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub' | 'var' | 'penalty_miss';
  team: 'home' | 'away';
  player: string;
  assist?: string;
  detail?: string;
}

export interface MatchStats {
  possession: [number, number]; // [home, away] %
  shotsTotal: [number, number];
  shotsOnTarget: [number, number];
  xG: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  offsides: [number, number];
  bigChances: [number, number];
  passesTotal: [number, number];
  passAccuracy: [number, number]; // %
  goalkeeperSaves: [number, number];
}

export interface PlayerLineup {
  number: number;
  name: string;
  position: string; // 'GOL', 'ZAG', 'LAT', 'MEI', 'ATA'
  gridPos: { x: number; y: number }; // percentage 0-100 on pitch
  rating?: number;
  captain?: boolean;
}

export interface MatchLineup {
  formation: string; // e.g. '4-3-3', '4-2-3-1'
  coach: string;
  starters: PlayerLineup[];
  substitutes: string[];
}

export interface Match {
  id: string;
  league: string;
  leagueIcon?: string;
  round: string;
  status: MatchStatus;
  minute?: number;
  date: string;
  dateIso: string; // 'YYYY-MM-DD'
  time: string;
  stadium: string;
  referee: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    badgeEmoji: string;
    primaryColor: string;
    secondaryColor: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    badgeEmoji: string;
    primaryColor: string;
    secondaryColor: string;
  };
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
  stats: MatchStats;
  lineupHome: MatchLineup;
  lineupAway: MatchLineup;
  h2h?: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatches: string[];
  };
}

export interface LegendaryPlayer {
  name: string;
  era: string;
  position: string;
  goalsOrMatches: string;
  description: string;
  achievements: string;
}

export interface ClubTrophyCategory {
  title: string;
  count: number;
  iconName: string;
  years: string[];
}

export interface ClubRivalry {
  rivalName: string;
  derbyName: string;
  description: string;
  historicalRecord: string;
}

export interface TeamHistory {
  id: string;
  name: string;
  popularName: string;
  fullName: string;
  nickname: string;
  badgeEmoji: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  foundationDate: string;
  foundationYear: number;
  originCity: string;
  country: string;
  stadium: {
    name: string;
    capacity: string;
    opened: number;
    city: string;
    popularNickname?: string;
  };
  president: string;
  coach: string;
  summary: string;
  detailedHistory: string;
  goldenEra: string;
  trophies: ClubTrophyCategory[];
  legends: LegendaryPlayer[];
  rivalries: ClubRivalry[];
  curiosities: string[];
  anthemVerse: string;
  website: string;
}

export interface PlayerSeasonStat {
  id: string;
  name: string;
  age: number;
  photoEmoji: string;
  teamId: string;
  teamName: string;
  teamBadgeEmoji: string;
  nationality: string;
  flagEmoji: string;
  position: 'Atacante' | 'Meio-Campista' | 'Defensor' | 'Goleiro';
  league: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number; // e.g. 8.42
  xG: number;
  minutesPlayed: number;
  shotAccuracy: number; // %
  keyPassesPerGame: number;
  cleanSheets?: number;
  saves?: number;
  marketValue: string;
  rankingCategory: 'artilharia' | 'assistencias' | 'melhor_nota' | 'chuteira_ouro' | 'goleiros';
  strengths: string[];
}

export interface TransferNewsItem {
  id: string;
  title: string;
  summary: string;
  fullArticle: string;
  player: string;
  playerAge: number;
  position: string;
  nationality: string;
  fromTeam: string;
  toTeam: string;
  transferType: 'Definitivo' | 'Empréstimo' | 'Empréstimo com opção de compra' | 'Fim de Contrato' | 'Renovação' | 'Em Negociação';
  fee: string; // e.g. "€ 65M (R$ 390M)"
  contractYears: string;
  date: string;
  timeAgo: string;
  status: 'OFICIAL' | 'NEGOCIACAO' | 'SONDAGEM' | 'ESPECULACAO' | 'RENOVACAO';
  confidenceScore: number; // 0-100
  source: string;
  exclusiveQuote?: string;
}

export interface UserNotificationPreferences {
  favoriteMatchIds: string[];
  favoriteTeamIds: string[];
  notifyGoals: boolean;
  notifyKickoff: boolean;
  notifyCards: boolean;
  notifyPenalties: boolean;
  notifyTransfers: boolean;
  soundEnabled: boolean;
  browserPermissionGranted?: boolean;
}

export interface InAppAlert {
  id: string;
  title: string;
  message: string;
  type: 'goal' | 'red_card' | 'yellow_card' | 'penalty' | 'transfer' | 'whistle' | 'info' | 'system';
  timestamp: string;
  matchId?: string;
  isFavoriteMatch?: boolean;
  read: boolean;
}
