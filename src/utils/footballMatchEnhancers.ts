import { Match, MissingPlayer, RefereeTeam } from '../types';

export function getMatchBroadcast(match: Match): string[] {
  if (match.broadcast && match.broadcast.length > 0) {
    return match.broadcast;
  }
  const league = (match.league || '').toLowerCase();
  const home = (match.homeTeam?.name || '').toLowerCase();
  const away = (match.awayTeam?.name || '').toLowerCase();

  if (league.includes('brasileir') || league.includes('brasil')) {
    if (home.includes('flamengo') || away.includes('flamengo') || home.includes('corinthians') || away.includes('corinthians')) {
      return ['TV Globo', 'Premiere', 'SporTV'];
    }
    if (home.includes('athletico') || away.includes('cazé')) {
      return ['CazéTV', 'Rede Furacão'];
    }
    return ['SporTV', 'Premiere'];
  }

  if (league.includes('champions')) {
    return ['TNT Sports', 'Max', 'SBT'];
  }

  if (league.includes('premier') || league.includes('ingl') || league.includes('eng.')) {
    return ['ESPN', 'Disney+'];
  }

  if (league.includes('la liga') || league.includes('espanh') || league.includes('esp.')) {
    return ['ESPN', 'Disney+'];
  }

  if (league.includes('libertadores') || league.includes('sul-americana')) {
    return ['TV Globo', 'ESPN', 'Disney+', 'Paramount+'];
  }

  if (league.includes('paulist')) {
    return ['CazéTV', 'Record', 'Max', 'Paulistão Play'];
  }

  if (league.includes('carioca')) {
    return ['Band', 'Canal GOAT', 'CazéTV'];
  }

  return ['CazéTV', 'SporTV', 'Premiere'];
}

export function getMatchMissingPlayers(match: Match): {
  home: MissingPlayer[];
  away: MissingPlayer[];
} {
  if (match.missingPlayersHome && match.missingPlayersAway) {
    return {
      home: match.missingPlayersHome,
      away: match.missingPlayersAway,
    };
  }

  const homeName = (match.homeTeam?.name || '').toLowerCase();
  const awayName = (match.awayTeam?.name || '').toLowerCase();

  const missingMap: Record<string, MissingPlayer[]> = {
    flamengo: [
      { name: 'Pedro', number: 9, position: 'ATA', reason: 'Ruptura no ligamento cruzado anterior (LCA) do joelho esquerdo', type: 'injury', expectedReturn: 'Em transição física', importance: 'Crucial' },
      { name: 'Matías Viña', number: 17, position: 'LAT', reason: 'Cirurgia de reconstrução do ligamento cruzado e menisco', type: 'injury', expectedReturn: 'Próxima temporada', importance: 'Titular' },
      { name: 'Everton Cebolinha', number: 11, position: 'ATA', reason: 'Ruptura total do tendão de Aquiles da perna esquerda', type: 'injury', expectedReturn: 'Fisioterapia avançada', importance: 'Titular' },
      { name: 'Nicolás De La Cruz', number: 18, position: 'MEI', reason: 'Controle de carga muscular na coxa direita', type: 'doubt', expectedReturn: 'Avaliação pré-jogo', importance: 'Crucial' },
      { name: 'Luiz Araújo', number: 7, position: 'ATA', reason: 'Fratura de cartilagem no joelho direito', type: 'injury', expectedReturn: 'Em recuperação', importance: 'Titular' },
    ],
    palmeiras: [
      { name: 'Joaquín Piquerez', number: 22, position: 'LAT', reason: 'Cirurgia no menisco do joelho esquerdo', type: 'injury', expectedReturn: 'Transição no gramado', importance: 'Crucial' },
      { name: 'Bruno Rodrigues', number: 11, position: 'ATA', reason: 'Cirurgia no tendão patelar do joelho esquerdo', type: 'injury', expectedReturn: 'Fisioterapia', importance: 'Rotativo' },
      { name: 'Mayke', number: 12, position: 'LAT', reason: 'Lesão muscular na panturrilha direita', type: 'doubt', expectedReturn: 'Treinando com bola', importance: 'Titular' },
      { name: 'Gustavo Gómez', number: 15, position: 'ZAG', reason: 'Acúmulo de 3 cartões amarelos (Suspensão automática)', type: 'suspension', expectedReturn: 'Próxima rodada', importance: 'Crucial' },
      { name: 'Maurício', number: 18, position: 'MEI', reason: 'Cirurgia no ombro direito após trauma', type: 'injury', expectedReturn: '2 a 3 semanas', importance: 'Titular' },
    ],
    real_madrid: [
      { name: 'Dani Carvajal', number: 2, position: 'LAT', reason: 'Tríplice ruptura no joelho direito (LCA, LCL e tendão poplíteo)', type: 'injury', expectedReturn: 'Fim da temporada', importance: 'Crucial' },
      { name: 'David Alaba', number: 4, position: 'ZAG', reason: 'Recuperação de artroscopia no joelho esquerdo', type: 'injury', expectedReturn: 'Transição individual', importance: 'Titular' },
      { name: 'Thibaut Courtois', number: 1, position: 'GOL', reason: 'Lesão no músculo abdutor da perna esquerda', type: 'injury', expectedReturn: '10 a 15 dias', importance: 'Crucial' },
      { name: 'Rodrygo', number: 11, position: 'ATA', reason: 'Desconforto na região posterior da coxa direita', type: 'doubt', expectedReturn: 'Dúvida para o clássico', importance: 'Crucial' },
      { name: 'Eduardo Camavinga', number: 6, position: 'VOL', reason: 'Suspenso por expulsão na rodada anterior', type: 'suspension', expectedReturn: 'Cumpre 1 partida', importance: 'Titular' },
    ],
    barcelona: [
      { name: 'Marc-André ter Stegen', number: 1, position: 'GOL', reason: 'Ruptura completa do tendão patelar do joelho direito', type: 'injury', expectedReturn: 'Apenas em 2025/26', importance: 'Crucial' },
      { name: 'Ferran Torres', number: 7, position: 'ATA', reason: 'Lesão muscular no bíceps femoral da coxa direita', type: 'injury', expectedReturn: '4 semanas', importance: 'Titular' },
      { name: 'Andreas Christensen', number: 15, position: 'ZAG', reason: 'Tendinopatia aquiliana no pé esquerdo', type: 'injury', expectedReturn: 'Novembro', importance: 'Titular' },
      { name: 'Ronald Araújo', number: 4, position: 'ZAG', reason: 'Cirurgia no tendão do músculo posterior da coxa', type: 'injury', expectedReturn: 'Dezembro', importance: 'Crucial' },
      { name: 'Gavi', number: 6, position: 'MEI', reason: 'Retorno gradual sob monitoramento de carga', type: 'doubt', expectedReturn: 'Minutos controlados', importance: 'Crucial' },
    ],
    corinthians: [
      { name: 'Maycon', number: 7, position: 'VOL', reason: 'Cirurgia de reconstrução do LCA no joelho direito', type: 'injury', expectedReturn: 'Próxima temporada', importance: 'Titular' },
      { name: 'Diego Palacios', number: 6, position: 'LAT', reason: 'Correção cirúrgica de cartilagem no joelho', type: 'injury', expectedReturn: 'Em recuperação', importance: 'Rotativo' },
      { name: 'Ruan Oliveira', number: 33, position: 'MEI', reason: 'Reabilitação de cirurgia de LCA', type: 'injury', expectedReturn: 'Transição física', importance: 'Rotativo' },
      { name: 'Yuri Alberto', number: 9, position: 'ATA', reason: 'Suspensão pelo 3º cartão amarelo', type: 'suspension', expectedReturn: 'Próximo confronto', importance: 'Crucial' },
    ],
    sao_paulo: [
      { name: 'Pablo Maia', number: 29, position: 'VOL', reason: 'Cirurgia para reinserção do tendão conjunto da coxa', type: 'injury', expectedReturn: 'Trabalho de fortalecimento', importance: 'Crucial' },
      { name: 'Alisson', number: 25, position: 'VOL', reason: 'Fratura no tornozelo direito com cirurgia', type: 'injury', expectedReturn: 'Transição no gramado', importance: 'Crucial' },
      { name: 'Michel Araújo', number: 15, position: 'MEI', reason: 'Lesão no ligamento colateral medial do joelho', type: 'injury', expectedReturn: '3 semanas', importance: 'Titular' },
      { name: 'Welington', number: 6, position: 'LAT', reason: 'Controle de fadiga muscular posterior', type: 'doubt', expectedReturn: 'Avaliação clínica', importance: 'Titular' },
    ],
    manchester_city: [
      { name: 'Rodri', number: 16, position: 'VOL', reason: 'Ruptura do ligamento cruzado anterior (LCA) e menisco', type: 'injury', expectedReturn: 'Fora da temporada', importance: 'Crucial' },
      { name: 'Oscar Bobb', number: 52, position: 'ATA', reason: 'Fratura no osso da fíbula durante treino', type: 'injury', expectedReturn: 'Dezembro', importance: 'Rotativo' },
      { name: 'Kevin De Bruyne', number: 17, position: 'MEI', reason: 'Desconforto na virilha e coxa', type: 'doubt', expectedReturn: 'Dúvida para o jogo', importance: 'Crucial' },
      { name: 'Kyle Walker', number: 2, position: 'LAT', reason: 'Problema no joelho após data FIFA', type: 'doubt', expectedReturn: 'Avaliação médica', importance: 'Titular' },
    ],
    liverpool: [
      { name: 'Alisson Becker', number: 1, position: 'GOL', reason: 'Lesão no tendão da coxa esquerda', type: 'injury', expectedReturn: 'Novembro', importance: 'Crucial' },
      { name: 'Diogo Jota', number: 20, position: 'ATA', reason: 'Trauma na costela superior e impacto torácico', type: 'injury', expectedReturn: '2 a 3 semanas', importance: 'Titular' },
      { name: 'Harvey Elliott', number: 19, position: 'MEI', reason: 'Fratura no pé durante convocação Sub-21', type: 'injury', expectedReturn: 'Transição física', importance: 'Rotativo' },
      { name: 'Alexis Mac Allister', number: 10, position: 'MEI', reason: 'Fadiga muscular acumulada', type: 'doubt', expectedReturn: 'Relacionado', importance: 'Crucial' },
    ],
    arsenal: [
      { name: 'Martin Ødegaard', number: 8, position: 'MEI', reason: 'Lesão ligamentar no tornozelo direito', type: 'injury', expectedReturn: 'Próxima semana', importance: 'Crucial' },
      { name: 'Bukayo Saka', number: 7, position: 'ATA', reason: 'Desconforto muscular na coxa direita', type: 'doubt', expectedReturn: 'Teste de vestiário', importance: 'Crucial' },
      { name: 'Jurriën Timber', number: 12, position: 'LAT', reason: 'Problema muscular e preservação física', type: 'doubt', expectedReturn: 'Avaliação final', importance: 'Titular' },
      { name: 'William Saliba', number: 2, position: 'ZAG', reason: 'Cartão vermelho direto na rodada anterior', type: 'suspension', expectedReturn: '1 jogo de gancho', importance: 'Crucial' },
    ],
    bayern: [
      { name: 'Hiroki Ito', number: 21, position: 'ZAG', reason: 'Fratura no metatarso do pé direito', type: 'injury', expectedReturn: 'Em recuperação', importance: 'Titular' },
      { name: 'Josip Stanišić', number: 2, position: 'LAT', reason: 'Ruptura no ligamento colateral do joelho direito', type: 'injury', expectedReturn: 'Dezembro', importance: 'Titular' },
      { name: 'Sacha Boey', number: 23, position: 'LAT', reason: 'Lesão no menisco do joelho esquerdo', type: 'injury', expectedReturn: 'Transição leve', importance: 'Rotativo' },
      { name: 'Jamal Musiala', number: 42, position: 'MEI', reason: 'Dores no quadril', type: 'doubt', expectedReturn: 'Banco provável', importance: 'Crucial' },
    ],
    botafogo: [
      { name: 'Rafael', number: 2, position: 'LAT', reason: 'Fratura na patela do joelho esquerdo', type: 'injury', expectedReturn: 'Tratamento intensivo', importance: 'Titular' },
      { name: 'Jeffinho', number: 47, position: 'ATA', reason: 'Lesão muscular na coxa com complicações cirúrgicas', type: 'injury', expectedReturn: 'Em transição', importance: 'Titular' },
      { name: 'Eduardo', number: 33, position: 'MEI', reason: 'Cirurgia no músculo reto femoral direito', type: 'injury', expectedReturn: 'Fim de ano', importance: 'Titular' },
      { name: 'Marlon Freitas', number: 17, position: 'VOL', reason: '3º cartão amarelo', type: 'suspension', expectedReturn: 'Cumpre suspensão', importance: 'Crucial' },
    ],
    atletico_mineiro: [
      { name: 'Matías Zaracho', number: 15, position: 'MEI', reason: 'Cirurgia para correção de hérnia do esporte', type: 'injury', expectedReturn: 'Transição física', importance: 'Crucial' },
      { name: 'Bernard', number: 11, position: 'MEI', reason: 'Ruptura no ligamento colateral do joelho direito', type: 'injury', expectedReturn: 'Em tratamento', importance: 'Titular' },
      { name: 'Cadu', number: 42, position: 'ATA', reason: 'Ruptura de ligamento no joelho direito', type: 'injury', expectedReturn: 'Cirurgia agendada', importance: 'Rotativo' },
    ],
    santos: [
      { name: 'Kevyson', number: 38, position: 'LAT', reason: 'Ruptura do LCA e menisco no joelho esquerdo', type: 'injury', expectedReturn: 'Fisioterapia', importance: 'Rotativo' },
      { name: 'Aderlan', number: 13, position: 'LAT', reason: 'Cirurgia de reconstituição ligamentar', type: 'injury', expectedReturn: 'Próxima temporada', importance: 'Titular' },
      { name: 'Diego Pituca', number: 21, position: 'VOL', reason: 'Acúmulo de cartões amarelos', type: 'suspension', expectedReturn: 'Próxima partida', importance: 'Crucial' },
    ],
    gremio: [
      { name: 'Walter Kannemann', number: 4, position: 'ZAG', reason: 'Dores musculares e controle de carga articular', type: 'doubt', expectedReturn: 'Avaliação no vestiário', importance: 'Crucial' },
      { name: 'André Henrique', number: 77, position: 'ATA', reason: 'Lesão multiligamentar no tornozelo direito', type: 'injury', expectedReturn: 'Fase final', importance: 'Rotativo' },
      { name: 'Dodi', number: 17, position: 'VOL', reason: 'Suspenso pelo terceiro cartão amarelo', type: 'suspension', expectedReturn: '1 partida', importance: 'Titular' },
    ],
    internacional: [
      { name: 'Gabriel Mercado', number: 25, position: 'ZAG', reason: 'Ruptura do ligamento cruzado anterior (LCA)', type: 'injury', expectedReturn: 'Próxima temporada', importance: 'Crucial' },
      { name: 'Fernando', number: 5, position: 'VOL', reason: 'Lesão na panturrilha direita', type: 'injury', expectedReturn: '2 semanas', importance: 'Crucial' },
      { name: 'Lucca', number: 45, position: 'ATA', reason: 'Bursite no quadril esquerdo', type: 'doubt', expectedReturn: 'Transição física', importance: 'Rotativo' },
    ],
  };

  const getForTeam = (teamKey: string, fallbackName: string): MissingPlayer[] => {
    for (const key of Object.keys(missingMap)) {
      if (teamKey.includes(key)) return missingMap[key];
    }
    return [
      { name: `Atleta 1 (${fallbackName})`, number: 8, position: 'MEI', reason: 'Desconforto muscular na coxa esquerda', type: 'injury', expectedReturn: '1 a 2 semanas', importance: 'Titular' },
      { name: `Atleta 2 (${fallbackName})`, number: 3, position: 'ZAG', reason: 'Suspenso pelo 3º cartão amarelo', type: 'suspension', expectedReturn: 'Cumpre 1 partida', importance: 'Titular' },
      { name: `Atleta 3 (${fallbackName})`, number: 11, position: 'ATA', reason: 'Avaliação clínica por controle de fadiga', type: 'doubt', expectedReturn: 'Dúvida pré-jogo', importance: 'Rotativo' },
    ];
  };

  return {
    home: getForTeam(homeName, match.homeTeam?.shortName || 'Mandante'),
    away: getForTeam(awayName, match.awayTeam?.shortName || 'Visitante'),
  };
}

export function getMatchReferees(match: Match): RefereeTeam {
  if (match.refereesTeam) return match.refereesTeam;

  const isFifa = (match.referee || '').includes('FIFA');
  const mainRef = match.referee || 'Wilton Pereira Sampaio (FIFA)';

  return {
    main: mainRef,
    assistant1: isFifa ? 'Bruno Boschilia (FIFA/PR)' : 'Neuza Inês Back (FIFA/SP)',
    assistant2: isFifa ? 'Bruno Raphael Pires (FIFA/GO)' : 'Fabrini Bevilaqua Costa (FIFA/SP)',
    fourthOfficial: 'Anderson Daronco (FIFA/RS)',
    varReferee: 'Rodrigo Guarizo Ferreira do Amaral (VAR-FIFA/SP)',
    avar: 'Fabricio Vilarinho da Silva (FIFA/GO)',
  };
}
