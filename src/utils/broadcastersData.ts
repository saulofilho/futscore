import { Match } from '../types';

export interface BroadcasterPlatform {
  id: string;
  name: string;
  shortName: string;
  type: 'TV Aberta' | 'TV por Assinatura' | 'Streaming' | 'YouTube / Web';
  category: 'free' | 'subscription' | 'pay-per-view';
  brandColor: string;
  accentBg: string;
  borderColor: string;
  logoIcon: string; // Emoji or visual symbol
  iconType: 'globo' | 'sportv' | 'premiere' | 'cazetv' | 'espn' | 'disney' | 'max' | 'tnt' | 'paramount' | 'sbt' | 'record' | 'band' | 'goat' | 'prime' | 'generic';
  resolution: string; // e.g. '4K Ultra HD', '1080p 60fps', 'Full HD'
  audioFormat: string; // e.g. 'Dolby 5.1', 'Estéreo Digital', 'Som Ambiente sem Narração'
  narrator?: string;
  commentator?: string;
  platformUrl?: string;
  deviceList: string[];
  description: string;
  officialRightsTag: string;
}

export const BROADCASTER_PLATFORMS: Record<string, BroadcasterPlatform> = {
  globo: {
    id: 'globo',
    name: 'TV Globo',
    shortName: 'Globo',
    type: 'TV Aberta',
    category: 'free',
    brandColor: '#ff0033',
    accentBg: 'bg-red-950/40',
    borderColor: 'border-red-600/40',
    logoIcon: '📺',
    iconType: 'globo',
    resolution: 'Full HD 1080i / 4K (Globoplay)',
    audioFormat: 'Dolby Digital 5.1',
    narrator: 'Luís Roberto / Gustavo Villani',
    commentator: 'Júnior e Roger Flores',
    platformUrl: 'https://globoplay.globo.com/tv-globo-ao-vivo/',
    deviceList: ['Smart TV', 'Antena Digital', 'Globoplay App', 'Web'],
    description: 'Transmissão gratuita em sinal aberto para todo o território nacional e sinal ao vivo liberado no Globoplay.',
    officialRightsTag: 'Direitos Exclusivos TV Aberta',
  },
  sportv: {
    id: 'sportv',
    name: 'SporTV / SporTV 4K',
    shortName: 'SporTV',
    type: 'TV por Assinatura',
    category: 'subscription',
    brandColor: '#0055ff',
    accentBg: 'bg-blue-950/40',
    borderColor: 'border-blue-500/40',
    logoIcon: '📡',
    iconType: 'sportv',
    resolution: '4K Ultra HD / 1080p',
    audioFormat: 'Som Stereo 5.1 & Ambiente',
    narrator: 'Milton Leite / Luiz Carlos Jr',
    commentator: 'Lédio Carmona e Ricardinho',
    platformUrl: 'https://globoplay.globo.com/sportv/',
    deviceList: ['Claro TV', 'SKY', 'Vivo Play', 'Globoplay + Canais'],
    description: 'Canal esportivo líder por assinatura com pré-jogo de 1h30, debate tático e tecnologia de tira-teima.',
    officialRightsTag: 'Canal Oficial TV Fechada',
  },
  premiere: {
    id: 'premiere',
    name: 'Premiere / Premiere Play',
    shortName: 'Premiere',
    type: 'Streaming',
    category: 'pay-per-view',
    brandColor: '#00ff88',
    accentBg: 'bg-emerald-950/40',
    borderColor: 'border-emerald-500/40',
    logoIcon: '🎟️',
    iconType: 'premiere',
    resolution: 'Full HD 1080p 60fps',
    audioFormat: 'Áudio Original / Narração Neutra',
    narrator: 'Dandan Pereira / Jader Rocha',
    commentator: 'Grafite e Alexandre Lozetti',
    platformUrl: 'https://premiere.globo.com',
    deviceList: ['Smart TV', 'Globoplay', 'Amazon Prime Channels', 'App Premiere'],
    description: 'A casa do futebol brasileiro com todas as partidas do Brasileirão Série A e B sem cortes de grade.',
    officialRightsTag: 'Pay-Per-View Oficial',
  },
  cazetv: {
    id: 'cazetv',
    name: 'CazéTV (YouTube & Prime Video)',
    shortName: 'CazéTV',
    type: 'YouTube / Web',
    category: 'free',
    brandColor: '#facc15',
    accentBg: 'bg-yellow-950/30',
    borderColor: 'border-yellow-500/40',
    logoIcon: '🔴',
    iconType: 'cazetv',
    resolution: '1080p 60fps Ultra Bitrate',
    audioFormat: 'Chat ao vivo + Interatividade',
    narrator: 'Luis Felipe Freitas / Rômulo Mendonça',
    commentator: 'Casimiro Miguel e convidados',
    platformUrl: 'https://www.youtube.com/@CazeTV',
    deviceList: ['YouTube App', 'Twitch', 'Prime Video', 'Samsung TV Plus'],
    description: 'A maior live esportiva do mundo com transmissão aberta e gratuita no YouTube, react ao vivo e narração descontraída.',
    officialRightsTag: 'Transmissão Digital Aberta',
  },
  espn: {
    id: 'espn',
    name: 'ESPN / ESPN 4',
    shortName: 'ESPN',
    type: 'TV por Assinatura',
    category: 'subscription',
    brandColor: '#dc2626',
    accentBg: 'bg-red-950/40',
    borderColor: 'border-red-500/40',
    logoIcon: '🔴',
    iconType: 'espn',
    resolution: 'Full HD 1080i',
    audioFormat: 'Som Stereo Surround',
    narrator: 'Rogério Vaughan / Paulo Andrade',
    commentator: 'Mauro Cezar Pereira e Mário Marra',
    platformUrl: 'https://www.espn.com.br/watch',
    deviceList: ['Operadoras de TV a Cabo', 'Disney+ Integrado'],
    description: 'Transmissão das maiores ligas europeias (Premier League, La Liga, Serie A) e jogos da Libertadores.',
    officialRightsTag: 'Líder Mundial em Esportes',
  },
  disney: {
    id: 'disney',
    name: 'Disney+ (Esportes / Star)',
    shortName: 'Disney+',
    type: 'Streaming',
    category: 'subscription',
    brandColor: '#0ea5e9',
    accentBg: 'bg-sky-950/40',
    borderColor: 'border-sky-500/40',
    logoIcon: '✨',
    iconType: 'disney',
    resolution: '4K Ultra HD & Dolby Atmos',
    audioFormat: 'Multicanais com Áudio Alternativo',
    narrator: 'Equipe oficial ESPN no Disney+',
    commentator: 'Gian Oddi e Ubiratan Leal',
    platformUrl: 'https://www.disneyplus.com',
    deviceList: ['Apple TV', 'Android TV', 'Roku', 'Fire TV', 'PlayStation', 'Xbox'],
    description: 'Streaming completo com todos os jogos ao vivo da Premier League, La Liga, Serie A, Copa Libertadores e tênis.',
    officialRightsTag: 'Streaming Oficial Ligas Europeias',
  },
  max: {
    id: 'max',
    name: 'Max (antigo HBO Max)',
    shortName: 'Max',
    type: 'Streaming',
    category: 'subscription',
    brandColor: '#a855f7',
    accentBg: 'bg-purple-950/40',
    borderColor: 'border-purple-500/40',
    logoIcon: '🟣',
    iconType: 'max',
    resolution: '4K HDR10 / 60fps',
    audioFormat: 'Dolby Atmos & 5.1',
    narrator: 'André Henning / Jorge Iggor',
    commentator: 'Vitor Sergio Rodrigues e Bruno Formiga',
    platformUrl: 'https://www.max.com',
    deviceList: ['Smart TVs', 'Chromecast', 'Celular & Tablet', 'Consoles'],
    description: 'Transmissão exclusiva de todos os jogos da UEFA Champions League ao vivo e com qualidade cinematográfica.',
    officialRightsTag: 'Casa da Champions League',
  },
  tnt: {
    id: 'tnt',
    name: 'TNT Sports',
    shortName: 'TNT',
    type: 'TV por Assinatura',
    category: 'subscription',
    brandColor: '#f97316',
    accentBg: 'bg-orange-950/40',
    borderColor: 'border-orange-500/40',
    logoIcon: '🔥',
    iconType: 'tnt',
    resolution: 'Full HD 1080p',
    audioFormat: 'Estéreo com Som do Estádio',
    narrator: 'André Henning',
    commentator: 'Vitor Sergio Rodrigues',
    platformUrl: 'https://tntsports.com.br',
    deviceList: ['Claro', 'SKY', 'Oi TV', 'Vivo'],
    description: 'Cobertura completa da Champions League com estúdio em Londres, Paris e Madri, e pré-jogo de 2 horas.',
    officialRightsTag: 'Canal Oficial UEFA Champions League',
  },
  paramount: {
    id: 'paramount',
    name: 'Paramount+',
    shortName: 'Paramount+',
    type: 'Streaming',
    category: 'subscription',
    brandColor: '#2563eb',
    accentBg: 'bg-blue-950/40',
    borderColor: 'border-blue-600/40',
    logoIcon: '🏔️',
    iconType: 'paramount',
    resolution: 'Full HD 1080p 60fps',
    audioFormat: 'Estéreo Digital',
    narrator: 'Nivaldo Prieto / João Guilherme',
    commentator: 'Paulo Vinícius Coelho (PVC)',
    platformUrl: 'https://www.paramountplus.com',
    deviceList: ['Smart TV', 'iOS', 'Android', 'Web'],
    description: 'Detentora dos direitos de partidas selecionadas da Copa Libertadores e Copa Sul-Americana.',
    officialRightsTag: 'Direitos Exclusivos CONMEBOL',
  },
  sbt: {
    id: 'sbt',
    name: 'SBT / +SBT',
    shortName: 'SBT',
    type: 'TV Aberta',
    category: 'free',
    brandColor: '#3b82f6',
    accentBg: 'bg-blue-950/30',
    borderColor: 'border-blue-500/30',
    logoIcon: '📺',
    iconType: 'sbt',
    resolution: 'Full HD Digital',
    audioFormat: 'Estéreo TV Aberta',
    narrator: 'Cleber Machado / Tiago Leifert',
    commentator: 'Mauro Beting e Nadine Basttos',
    platformUrl: 'https://www.sbt.com.br/aovivo',
    deviceList: ['TV Aberta', 'App +SBT', 'YouTube SBT Sports'],
    description: 'Jogos da Champions League e Sul-Americana nas terças-feiras em sinal aberto gratuito para o Brasil.',
    officialRightsTag: 'Transmissão TV Aberta',
  },
  goat: {
    id: 'goat',
    name: 'Canal GOAT (YouTube)',
    shortName: 'GOAT',
    type: 'YouTube / Web',
    category: 'free',
    brandColor: '#10b981',
    accentBg: 'bg-emerald-950/30',
    borderColor: 'border-emerald-500/30',
    logoIcon: '🐐',
    iconType: 'goat',
    resolution: '1080p 60fps',
    audioFormat: 'Interatividade com Chat',
    narrator: 'Guilherme Lage / Dudu Monsanto',
    commentator: 'Biro-Biro e convidados',
    platformUrl: 'https://www.youtube.com/@canalgoatbr',
    deviceList: ['YouTube', 'TikTok', 'Smart TV'],
    description: 'Canal digital 100% gratuito com transmissão da Bundesliga alemã, Série B e campeonatos estaduais.',
    officialRightsTag: 'Streaming Aberto Oficial',
  },
  record: {
    id: 'record',
    name: 'Record / PlayPlus',
    shortName: 'Record',
    type: 'TV Aberta',
    category: 'free',
    brandColor: '#38bdf8',
    accentBg: 'bg-sky-950/30',
    borderColor: 'border-sky-500/30',
    logoIcon: '📺',
    iconType: 'record',
    resolution: 'Full HD 1080i',
    audioFormat: 'Estéreo Aberto',
    narrator: 'Lucas Pereira / Oliveira Andrade',
    commentator: 'Walter Casagrande Jr e Dodô',
    platformUrl: 'https://recordtv.r7.com/ao-vivo',
    deviceList: ['TV Aberta', 'PlayPlus', 'Portal R7'],
    description: 'Transmissão oficial do Campeonato Paulista (Paulistão) em sinal aberto e streaming gratuito.',
    officialRightsTag: 'Direitos Exclusivos Paulistão TV Aberta',
  },
  prime: {
    id: 'prime',
    name: 'Amazon Prime Video',
    shortName: 'Prime Video',
    type: 'Streaming',
    category: 'subscription',
    brandColor: '#00a8e1',
    accentBg: 'bg-cyan-950/30',
    borderColor: 'border-cyan-500/40',
    logoIcon: '📦',
    iconType: 'prime',
    resolution: '4K Ultra HD & HDR',
    audioFormat: 'Dolby 5.1 Surround',
    narrator: 'Tiago Leifert / Cléber Machado',
    commentator: 'Eduardo Tironi',
    platformUrl: 'https://www.primevideo.com',
    deviceList: ['Smart TVs', 'Fire TV Stick', 'Smartphones', 'Web'],
    description: 'Jogos exclusivos da Copa do Brasil e partidas selecionadas do Brasileirão com transmissão de alta qualidade.',
    officialRightsTag: 'Direitos Exclusivos Copa do Brasil',
  },
  paulistao_play: {
    id: 'paulistao_play',
    name: 'Paulistão Play',
    shortName: 'Paulistão Play',
    type: 'Streaming',
    category: 'subscription',
    brandColor: '#f59e0b',
    accentBg: 'bg-amber-950/30',
    borderColor: 'border-amber-500/30',
    logoIcon: '📱',
    iconType: 'generic',
    resolution: 'Full HD 1080p',
    audioFormat: 'Estéreo',
    narrator: 'Equipe Federação Paulista',
    commentator: 'Analistas FPF',
    platformUrl: 'https://paulistaoplay.com.br',
    deviceList: ['App iOS', 'App Android', 'Navegador Web'],
    description: 'Plataforma oficial da Federação Paulista de Futebol com todos os jogos ao vivo da competição estadual.',
    officialRightsTag: 'Streaming Oficial FPF',
  },
};

/**
 * Returns the customized broadcaster platforms for the match based on its competition/league
 */
export function getMatchBroadcastersDetailed(match: Match): BroadcasterPlatform[] {
  const league = (match.league || '').toLowerCase();
  const home = (match.homeTeam?.name || '').toLowerCase();
  const away = (match.awayTeam?.name || '').toLowerCase();

  // 1. UEFA Champions League
  if (league.includes('champions')) {
    return [
      BROADCASTER_PLATFORMS.tnt,
      BROADCASTER_PLATFORMS.max,
      BROADCASTER_PLATFORMS.sbt,
    ];
  }

  // 2. Premier League (Inglaterra)
  if (league.includes('premier') || league.includes('ingl') || league.includes('eng.')) {
    return [
      BROADCASTER_PLATFORMS.espn,
      BROADCASTER_PLATFORMS.disney,
    ];
  }

  // 3. La Liga (Espanha)
  if (league.includes('la liga') || league.includes('espanh') || league.includes('esp.')) {
    return [
      BROADCASTER_PLATFORMS.espn,
      BROADCASTER_PLATFORMS.disney,
    ];
  }

  // 4. Copa Libertadores & Sul-Americana
  if (league.includes('libertadores') || league.includes('sul-americana')) {
    return [
      BROADCASTER_PLATFORMS.globo,
      BROADCASTER_PLATFORMS.espn,
      BROADCASTER_PLATFORMS.disney,
      BROADCASTER_PLATFORMS.paramount,
    ];
  }

  // 5. Paulistão
  if (league.includes('paulist')) {
    return [
      BROADCASTER_PLATFORMS.record,
      BROADCASTER_PLATFORMS.cazetv,
      BROADCASTER_PLATFORMS.max,
      BROADCASTER_PLATFORMS.tnt,
      BROADCASTER_PLATFORMS.paulistao_play,
    ];
  }

  // 6. Carioca
  if (league.includes('carioca')) {
    return [
      BROADCASTER_PLATFORMS.cazetv,
      BROADCASTER_PLATFORMS.goat,
      BROADCASTER_PLATFORMS.premiere,
    ];
  }

  // 7. Bundesliga / Serie A Italiana
  if (league.includes('bundesliga') || league.includes('alem') || league.includes('italia') || league.includes('serie a - it')) {
    return [
      BROADCASTER_PLATFORMS.cazetv,
      BROADCASTER_PLATFORMS.goat,
      BROADCASTER_PLATFORMS.espn,
      BROADCASTER_PLATFORMS.disney,
    ];
  }

  // 8. Brasileirão Série A / Copa do Brasil / Padrão Brasil
  // Check if CazéTV has rights (e.g. Athletico Paranaense mandante)
  if (home.includes('athletico') || home.includes('cazé')) {
    return [
      BROADCASTER_PLATFORMS.cazetv,
      BROADCASTER_PLATFORMS.prime,
      BROADCASTER_PLATFORMS.globo,
    ];
  }

  // Big classic clash (Globo TV Aberta + Premiere + SporTV)
  return [
    BROADCASTER_PLATFORMS.globo,
    BROADCASTER_PLATFORMS.sportv,
    BROADCASTER_PLATFORMS.premiere,
    BROADCASTER_PLATFORMS.cazetv,
  ];
}
