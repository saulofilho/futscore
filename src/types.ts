export type MatchStatus = 'LIVE' | 'SCHEDULED' | 'FINISHED' | 'HT';

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub' | 'var' | 'penalty_miss';
  team: 'home' | 'away';
  player: string;
  assist?: string;
  subOut?: string; // player replaced during substitution
  detail?: string;
  scoreAfter?: [number, number]; // [homeScore, awayScore] at this event
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
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    badgeEmoji: string;
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
  };
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
  stats: MatchStats;
  lineupHome: MatchLineup;
  lineupAway: MatchLineup;
  broadcast?: string[]; // e.g. ['Globo', 'SporTV', 'Premiere', 'CazéTV', 'ESPN', 'Disney+', 'Max']
  missingPlayersHome?: MissingPlayer[];
  missingPlayersAway?: MissingPlayer[];
  refereesTeam?: RefereeTeam;
  technicalStaffHome?: { coach: string; assistant?: string; physicalTrainer?: string };
  technicalStaffAway?: { coach: string; assistant?: string; physicalTrainer?: string };
  stadiumCapacity?: number | string;
  stadiumInfo?: StadiumInfo;
  weather?: MatchWeather;
  h2h?: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatches: string[];
  };
}

export interface StadiumInfo {
  name: string;
  city: string;
  capacity: number;
  capacityFormatted: string;
  surface?: string;
  openedYear?: number;
}

export interface MatchWeather {
  temp: number; // e.g. 26
  condition: string; // e.g. 'Céu Limpo' | 'Parcialmente Nublado' | 'Chuva Leve'
  skyState?: string; // e.g. 'Céu ensolarado com poucas nuvens'
  icon?: string; // e.g. '☀️' | '⛅' | '🌧️'
  humidity?: number; // e.g. 65 (%)
  windSpeed?: string; // e.g. '12 km/h'
}

export interface MissingPlayer {
  name: string;
  number?: number;
  position?: string;
  reason: string;
  type: 'injury' | 'suspension' | 'doubt';
  expectedReturn?: string;
  importance?: 'Crucial' | 'Titular' | 'Rotativo';
}

export interface RefereeTeam {
  main: string;
  assistant1?: string;
  assistant2?: string;
  fourthOfficial?: string;
  varReferee?: string;
  avar?: string;
}

export interface SquadPlayer {
  id: string;
  number: number;
  name: string;
  position: 'GOL' | 'ZAG' | 'LAT' | 'VOL' | 'MEI' | 'ATA';
  positionDetail: string;
  age: number;
  nationality: string;
  flagEmoji: string;
  marketValue: string;
  contractUntil: string;
  isCaptain?: boolean;
  photoEmoji?: string;
  seasonMatches?: number;
  seasonGoals?: number;
  seasonAssists?: number;
}

export interface TeamSeasonPerformance {
  currentPosition: string;
  winRate: string;
  last5: ('V' | 'E' | 'D')[];
  topScorer: { name: string; goals: number };
  topAssister: { name: string; assists: number };
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  possessionAvg: number;
}

export interface AthleteProfile {
  id: string;
  name: string;
  fullName: string;
  nickname?: string;
  number: number;
  position: 'Goleiro' | 'Zagueiro' | 'Lateral' | 'Meio-Campista' | 'Volante' | 'Atacante' | 'Ponta';
  teamId: string;
  teamName: string;
  teamBadgeEmoji: string;
  teamLogoUrl?: string;
  age: number;
  birthDate: string;
  birthPlace: string;
  height: string;
  weight: string;
  preferredFoot: 'Destro' | 'Canhoto' | 'Ambidestro';
  nationality: string;
  flagEmoji: string;
  marketValue: string;
  marketValueBrl: string;
  contractUntil: string;
  photoEmoji: string;
  photoUrl?: string;
  seasonStats: {
    matches: number;
    goals: number;
    assists: number;
    rating: number;
    minutesPlayed: number;
    yellowCards: number;
    redCards: number;
    shotsOnTarget?: number;
    shotAccuracy?: number;
    passAccuracy?: number;
    keyPassesPerGame?: number;
    cleanSheets?: number;
    saves?: number;
    xG?: number;
  };
  strengths: string[];
  playStyle: string;
  careerHistory: {
    club: string;
    years: string;
    matches: number;
    goals: number;
    titles?: string;
  }[];
  trophies: string[];
  bio: string;
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
    pitch?: string;
    recordAttendance?: string;
    address?: string;
  };
  president: string;
  coach: string;
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
  squad?: SquadPlayer[];
  seasonPerformance?: TeamSeasonPerformance;
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
  transferType: 'Definitivo' | 'Empréstimo' | 'Empréstimo com opção de compra' | 'Fim de Contrato' | 'Renovação' | 'Em Negociação' | 'Notícia Oficial' | 'OFICIAL';
  fee: string; // e.g. "€ 65M (R$ 390M)"
  contractYears: string;
  date: string;
  timeAgo: string;
  status: 'OFICIAL' | 'NEGOCIACAO' | 'SONDAGEM' | 'ESPECULACAO' | 'RENOVACAO';
  confidenceScore: number; // 0-100
  source: string;
  exclusiveQuote?: string;
  imageUrl?: string;
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

export interface LeagueStandingEntry {
  rank: number;
  teamId: string;
  teamName: string;
  shortName: string;
  logoUrl?: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
}

export interface LeagueTable {
  id: string;
  name: string;
  icon: string;
  season: string;
  entries: LeagueStandingEntry[];
}

export interface GoalCelebrationData {
  id: string;
  matchId: string;
  scoringTeamName: string;
  scoringTeamShortName?: string;
  scoringTeamBadge?: string;
  scoringTeamLogoUrl?: string;
  opponentTeamName: string;
  opponentTeamShortName?: string;
  opponentTeamBadge?: string;
  scorerName: string;
  assistName?: string;
  minute: number;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  matchTitle: string;
  league?: string;
}

export interface MatchAiPrediction {
  id: string;
  matchId: string;
  timestamp: string;
  modelUsed: string;
  predictedScore: {
    home: number;
    away: number;
  };
  winProbabilities: {
    home: number;
    draw: number;
    away: number;
  };
  confidenceLevel: 'ALTA' | 'MÉDIA' | 'EQUILIBRADA';
  tacticalAdvantage: string;
  summary: string;
  historicContext: string;
  keyMatchups: Array<{
    title: string;
    description: string;
  }>;
  keyPlayersToWatch: Array<{
    name: string;
    team: string;
    role: string;
    reason: string;
  }>;
  matchScenario: {
    expectedGoalsTotal: string;
    bothTeamsToScoreProbability: number;
    gamePace: 'INTENSO' | 'CADENCIADO' | 'TRUNCADO';
    tip: string;
  };
}

export type CoachFormation = '4-3-3' | '4-2-3-1' | '4-4-2' | '3-5-2' | '5-4-1' | '3-4-3';

export type CoachMentality = 'ULTRA_OFENSIVA' | 'OFENSIVA' | 'EQUILIBRADA' | 'CAUTELOSA' | 'RETRANCA';

export type CoachPressure = 'ALTA' | 'MEDIA' | 'BAIXA';

export type CoachPassingStyle = 'CURTO' | 'DIRETO' | 'EQUILIBRADO';

export interface CoachPlayer {
  id: string;
  name: string;
  number: number;
  position: 'GOL' | 'ZAG' | 'LAT' | 'VOL' | 'MEI' | 'ATA';
  rating: number;
  stamina: number; // 0 - 100
  yellowCards: number;
  isCaptain?: boolean;
  goals: number;
  assists: number;
  formStatus: 'EM_ALTA' | 'NORMAL' | 'CANSADO';
}

export interface CoachTacticalState {
  teamSide: 'home' | 'away';
  formation: CoachFormation;
  mentality: CoachMentality;
  pressure: CoachPressure;
  passingStyle: CoachPassingStyle;
  substitutionsUsed: number;
  maxSubstitutions: number;
  activeShout?: string;
  tacticalMorale: number; // 0 - 100
  momentumScore: number; // -100 to +100
}

