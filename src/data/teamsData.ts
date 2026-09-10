import { TeamHistory } from '../types';

export const TEAMS_DATA: Record<string, TeamHistory> = {
  flamengo: {
    id: 'flamengo',
    name: 'Flamengo',
    popularName: 'Mengão',
    fullName: 'Clube de Regatas do Flamengo',
    nickname: 'O Mais Querido, Rubro-Negro, Urubu',
    badgeEmoji: '🔴⚫',
    primaryColor: '#c8102e',
    secondaryColor: '#000000',
    accentColor: '#f59e0b',
    foundationDate: '17 de Novembro de 1895',
    foundationYear: 1895,
    originCity: 'Rio de Janeiro, RJ',
    country: 'Brasil',
    stadium: {
      name: 'Estádio Jornalista Mário Filho (Maracanã)',
      capacity: '78.838 espectadores',
      opened: 1950,
      city: 'Rio de Janeiro',
      popularNickname: 'O Templo do Futebol Mundial'
    },
    president: 'Rodolfo Landim',
    coach: 'Filipe Luís',
    summary: 'Fundado inicialmente como clube de remo nas praias do Rio de Janeiro em 1895, o Flamengo adotou o futebol em 1911 após a chegada de dissidentes do Fluminense. Tornou-se o clube com a maior torcida do mundo (mais de 45 milhões de apaixonados) e uma das instituições mais vencedoras do esporte global.',
    detailedHistory: `O Clube de Regatas do Flamengo nasceu na efervescência da Baía de Guanabara no final do século XIX. Em 1895, jovens do bairro do Flamengo adquiriram a baleeira "Pherusa" para competir nas regatas, então o esporte mais nobre do país.

Em outubro de 1911, um grupo de atletas insatisfeitos com a diretoria do Fluminense Football Club liderados por Alberto Borgerth migrou para o Flamengo, criando a seção de futebol terrestre oficializada em 24 de dezembro daquele ano.

A Era de Ouro do clube desabrochou nas décadas de 1970 e 1980, regida pelo maior camisa 10 de sua história: Arthur Antunes Coimbra, o Zico. Com uma geração lendária contendo Leandro, Júnior, Andrade, Adílio e Nunes, o Mengão conquistou o Campeonato Carioca, o Brasileirão de 1980 e o ápice mundial em 13 de dezembro de 1981, quando derrotou impiedosamente o campeão europeu Liverpool por 3 a 0 em Tóquio.

Em 2019, o clube reviveu a mística internacional sob o comando de Jorge Jesus e atuações espetaculares de Gabigol, Bruno Henrique e Arrascaeta, conquistando a Copa Libertadores numa virada épica sobre o River Plate em Lima e repetindo a glória continental novamente em 2022.`,
    goldenEra: '1981 (Campeão da Libertadores e Mundial Interclubes contra o Liverpool) e 2019 (Bicampeão da Libertadores e Campeão Brasileiro com recordes históricos).',
    trophies: [
      {
        title: 'Mundial de Clubes da FIFA / Intercontinental',
        count: 1,
        iconName: 'Globe',
        years: ['1981']
      },
      {
        title: 'Copa Libertadores da América',
        count: 3,
        iconName: 'Trophy',
        years: ['1981', '2019', '2022']
      },
      {
        title: 'Recopa Sul-Americana',
        count: 1,
        iconName: 'Award',
        years: ['2020']
      },
      {
        title: 'Campeonato Brasileiro Série A',
        count: 8,
        iconName: 'Shield',
        years: ['1980', '1982', '1983', '1987', '1992', '2009', '2019', '2020']
      },
      {
        title: 'Copa do Brasil',
        count: 5,
        iconName: 'Medal',
        years: ['1990', '2006', '2013', '2022', '2024']
      },
      {
        title: 'Campeonato Carioca',
        count: 38,
        iconName: 'Star',
        years: ['1914', '1915', '1920', '1978', '1979', '1981', '1996', '2001', '2019', '2020', '2021', '2024']
      }
    ],
    legends: [
      {
        name: 'Zico (Galinho de Quintino)',
        era: '1971–1983, 1985–1989',
        position: 'Meia-Atacante',
        goalsOrMatches: '509 gols em 732 jogos',
        description: 'Maior ídolo inquestionável da história rubro-negra. Dono de precisão cirúrgica em faltas, visão sobrenatural e liderança técnica inigualável.',
        achievements: 'Mundial 1981, Libertadores 1981, 4 Brasileiros, Maior artilheiro do Maracanã (333 gols).'
      },
      {
        name: 'Júnior (Maestro)',
        era: '1974–1984, 1989–1993',
        position: 'Lateral-Esquerdo / Meio-Campo',
        goalsOrMatches: '876 partidas (recordista do clube)',
        description: 'Ambidestro sublime, esbanjava elegância e polivalência no Maracanã.',
        achievements: 'Mundial 1981, Libertadores 1981, 4 Brasileiros, Copa do Brasil 1990.'
      },
      {
        name: 'Leandro',
        era: '1978–1990',
        position: 'Lateral-Direito / Zagueiro',
        goalsOrMatches: '415 jogos, 14 gols',
        description: 'Considerado um dos maiores laterais direitos de todos os tempos, jogou a carreira inteira exclusivamente pelo Flamengo.',
        achievements: 'Mundial 1981, Libertadores 1981, 4 Campeonatos Brasileiros.'
      },
      {
        name: 'Gabigol',
        era: '2019–2024',
        position: 'Atacante',
        goalsOrMatches: '160 gols em 305 jogos',
        description: 'Herói supremo da Libertadores de 2019 com dois gols no final contra o River Plate, e gol do título da Libertadores 2022.',
        achievements: '2x Libertadores, 2x Brasileirão, 2x Copa do Brasil, Artilheiro implacável.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Fluminense',
        derbyName: 'Fla-Flu',
        description: 'O clássico de maior glamour do futebol brasileiro. Nelson Rodrigues imortalizou a frase: "O Fla-Flu começou quarenta minutos antes do nada".',
        historicalRecord: 'Mais de 440 confrontos oficiais disputados no Maracanã.'
      },
      {
        rivalName: 'Vasco da Gama',
        derbyName: 'Clássico dos Milhões',
        description: 'A maior rivalidade popular do Rio de Janeiro, unindo as duas maiores torcidas do estado em jogos épicos e eletrizantes.',
        historicalRecord: 'Disputado desde 1923, reuniu o recorde de 174.770 pagantes em 1976.'
      },
      {
        rivalName: 'Palmeiras',
        derbyName: 'Duelo de Gigantes Contemporâneo',
        description: 'A rivalidade interestadual mais intensa do século XXI no Brasil, com decisões acirradas de Libertadores, Brasileirão e Supercopas.',
        historicalRecord: 'Final da Libertadores 2021 em Montevidéu e disputas diretas pelo topo.'
      }
    ],
    curiosities: [
      'As cores originais do remo eram ouro e azul, mas foram trocadas em 1898 pelo vermelho e preto porque o tecido dourado desbotava rapidamente com o sol forte e a salinidade carioca.',
      'O Urubu tornou-se mascote oficial em 1969, quando torcedores soltaram um urubu com uma bandeira amarrada nas arquibancadas do Maracanã contra o Botafogo, quebrando um tabu de vitórias.',
      'O Flamengo é o detentor do recorde de maior público em partidas de clubes na história do futebol brasileiro: 194.603 pessoas no Maracanã em 1963 contra o Fluminense.'
    ],
    anthemVerse: 'Uma vez Flamengo, sempre Flamengo! Flamengo sempre eu hei de ser! É meu maior prazer vê-lo brilhar, seja na terra, seja no mar!',
    website: 'https://www.flamengo.com.br'
  },

  palmeiras: {
    id: 'palmeiras',
    name: 'Palmeiras',
    popularName: 'Verdão',
    fullName: 'Sociedade Esportiva Palmeiras',
    nickname: 'Alviverde Imponente, Porco, Palestra',
    badgeEmoji: '🟢⚪',
    primaryColor: '#006437',
    secondaryColor: '#ffffff',
    accentColor: '#10b981',
    foundationDate: '26 de Agosto de 1914',
    foundationYear: 1914,
    originCity: 'São Paulo, SP',
    country: 'Brasil',
    stadium: {
      name: 'Allianz Parque',
      capacity: '43.713 espectadores',
      opened: 2014,
      city: 'São Paulo',
      popularNickname: 'A Casa Alviverde'
    },
    president: 'Leila Pereira',
    coach: 'Abel Ferreira',
    summary: 'Fundado por imigrantes italianos sob a denominação Palestra Italia em 1914, o Palmeiras consolidou-se como o Maior Campeão do Brasil, com 12 títulos do Campeonato Brasileiro, 3 Copas Libertadores e a histórica Copa Rio de 1951.',
    detailedHistory: `Em agosto de 1914, quatro operários e entusiastas italianos - Luigi Cervo, Vicenzo Ragognetti, Ezequiel Simone e Luigi Marzo - fundaram a Societá Sportiva Palestra Italia para congregar a expressiva colônia italiana em São Paulo.

Em 1942, em virtude da Segunda Guerra Mundial e de decreto governamental que proibiu termos ligados aos países do Eixo, o clube foi obrigado a mudar de nome. Nasceu assim a Sociedade Esportiva Palmeiras na emblemática "Arrancada Heroica" de 20 de setembro de 1942: o clube entrou em campo com a bandeira do Brasil e sagrou-se campeão paulista sobre o São Paulo, originando o lema: "Morreu líder e nasceu campeão!".

Em 1951, o Palmeiras venceu a Copa Rio no Maracanã diante da Juventus de Turim, coroando-se o primeiro campeão intercontinental de clubes. Nas décadas seguintes, surgiram as lendárias "Academias de Futebol" dos anos 60 e 70 regidas por Ademir da Guia, rivalizando com o Santos de Pelé.

No século XXI, sob a gestão técnica do português Abel Ferreira, o Verdão viveu nova fase dourada com o bicampeonato consecutivo da Libertadores (2020 e 2021) e múltiplos títulos nacionais.`,
    goldenEra: 'A Primeira e Segunda Academias (1960–1977) com Ademir da Guia e Dudu, a Era Parmalat (1993–1999) com Rivaldo, Evair e Marcos, e a Era Abel Ferreira (2020–presente).',
    trophies: [
      {
        title: 'Copa Rio Internacional de Clubes',
        count: 1,
        iconName: 'Globe',
        years: ['1951']
      },
      {
        title: 'Copa Libertadores da América',
        count: 3,
        iconName: 'Trophy',
        years: ['1999', '2020', '2021']
      },
      {
        title: 'Recopa Sul-Americana',
        count: 1,
        iconName: 'Award',
        years: ['2022']
      },
      {
        title: 'Campeonato Brasileiro Série A (Recordista)',
        count: 12,
        iconName: 'Shield',
        years: ['1960', '1967', '1967', '1969', '1972', '1973', '1993', '1994', '2016', '2018', '2022', '2023']
      },
      {
        title: 'Copa do Brasil',
        count: 4,
        iconName: 'Medal',
        years: ['1998', '2012', '2015', '2020']
      },
      {
        title: 'Campeonato Paulista',
        count: 26,
        iconName: 'Star',
        years: ['1920', '1932', '1942', '1959', '1993', '1994', '1996', '2008', '2020', '2022', '2023', '2024']
      }
    ],
    legends: [
      {
        name: 'Ademir da Guia (O Divino)',
        era: '1961–1977',
        position: 'Meia-Armador',
        goalsOrMatches: '902 jogos, 155 gols',
        description: 'O maior símbolo da elegância palmeirense. Jogava como se desfilasse com um smoking verde pelo gramado.',
        achievements: '5 títulos brasileiros, 5 campeonatos paulistas, símbolo das duas Academias de Futebol.'
      },
      {
        name: 'São Marcos',
        era: '1992–2012',
        position: 'Goleiro',
        goalsOrMatches: '533 partidas oficiais',
        description: 'Um dos goleiros mais carismáticos e decisivos da história. Herói da Libertadores de 1999 e pentacampeão mundial em 2002.',
        achievements: 'Libertadores 1999, Copa do Brasil 1998, Brasileirão 1993 e 1994.'
      },
      {
        name: 'Evair (O Matador)',
        era: '1991–1994, 1999',
        position: 'Centroavante',
        goalsOrMatches: '245 jogos, 126 gols',
        description: 'Centroavante cerebral que encerrou o jejum de títulos de 16 anos em 12 de junho de 1993 com gols inesquecíveis.',
        achievements: 'Bicampeão Brasileiro 1993/94, Libertadores 1999.'
      },
      {
        name: 'Dudu & Weverton',
        era: '2015–presente',
        position: 'Atacante / Goleiro',
        goalsOrMatches: 'Mais de 440 jogos cada',
        description: 'Pilares modernos da década mais vencedora da história recente palmeirense.',
        achievements: '2x Libertadores, 3x Brasileirão, Copa do Brasil.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Corinthians',
        derbyName: 'Derby Paulista',
        description: 'Eleito pela CNN como um dos 10 maiores clássicos de todo o planeta. Uma rivalidade centenária nascida em 1917 com rivalidades intensas em finais.',
        historicalRecord: 'Mais de 380 confrontos com equilíbrio quase milimétrico.'
      },
      {
        rivalName: 'São Paulo',
        derbyName: 'Choque-Rei',
        description: 'Rivalidade institucional acalorada desde a Arrancada Heroica de 1942 e duelos frequentes em fases decisivas de Libertadores e Copas.',
        historicalRecord: 'Mais de 340 partidas disputadas.'
      },
      {
        rivalName: 'Santos',
        derbyName: 'Clássico da Saudade',
        description: 'Revive as batalhas monumentais dos anos 60 entre a Academia do Palmeiras e o Santos de Pelé.',
        historicalRecord: 'Finalistas da Copa Libertadores da América 2020 no Maracanã.'
      }
    ],
    curiosities: [
      'Em 1965, o Palmeiras representou por inteiro a Seleção Brasileira na inauguração do Estádio Mineirão contra a seleção do Uruguai, vencendo por 3 a 0 com a camisa canarinho.',
      'O apelido "Porco" era uma ofensa usada por rivais nos anos 1960, até que em 1986 a torcida palmeirense adotou o mascote com orgulho aos gritos de "E dá-lhe Porco!", transformando tabu em idolatria.',
      'O ataque do Palmeiras de 1996 anotou incríveis 102 gols em apenas 30 partidas do Campeonato Paulista, com média superior a 3,4 gols por jogo.'
    ],
    anthemVerse: 'Quando surge o Alviverde Imponente no gramado em que a luta o aguarda, sabe bem o que vem pela frente, que a dureza do prélio não tarda!',
    website: 'https://www.palmeiras.com.br'
  },

  real_madrid: {
    id: 'real_madrid',
    name: 'Real Madrid',
    popularName: 'Los Merengues',
    fullName: 'Real Madrid Club de Fútbol',
    nickname: 'Los Blancos, La Casa Blanca, Los Vikingos',
    badgeEmoji: '👑⚪',
    primaryColor: '#ffffff',
    secondaryColor: '#001c58',
    accentColor: '#eab308',
    foundationDate: '6 de Março de 1902',
    foundationYear: 1902,
    originCity: 'Madri',
    country: 'Espanha',
    stadium: {
      name: 'Estádio Santiago Bernabéu',
      capacity: '85.000 espectadores',
      opened: 1947,
      city: 'Madri',
      popularNickname: 'A Catedral Europeia'
    },
    president: 'Florentino Pérez',
    coach: 'Carlo Ancelotti',
    summary: 'Eleito pela FIFA como o Melhor Clube do Século XX, o Real Madrid é o soberano absoluto da Europa, detentor de um recorde estratosférico de 15 títulos da UEFA Champions League e 36 títulos de La Liga.',
    detailedHistory: `Fundado em março de 1902 por estudantes acadêmicos sob o nome Madrid Foot-Ball Club, o clube recebeu o título de "Real" em 1920 concedido pelo Rei Afonso XIII.

A grande revolução do clube começou com a chegada do presidente Santiago Bernabéu nos anos 1940, que construiu o estádio monumental e contratou Alfredo Di Stéfano e Ferenc Puskás. Entre 1956 e 1960, o Real Madrid venceu as cinco primeiras edições consecutivas da Taça dos Clubes Campeões Europeus (atual Champions League), estabelecendo um padrão de domínio jamais visto.

Na virada do milênio, sob a gestão de Florentino Pérez, nasceu o conceito dos "Galácticos", reunindo Zidane, Figo, Ronaldo Fenômeno, Roberto Carlos e David Beckham. 

Entre 2014 e 2018, impulsionado pelo maior artilheiro da sua história, Cristiano Ronaldo (451 gols), e pelo técnico Zinedine Zidane, o clube conquistou o histórico tricampeonato consecutivo da Champions League (2016, 2017 e 2018), antes de alcançar a 14ª e 15ª taças com Vinicius Jr, Bellingham e Rodrygo.`,
    goldenEra: '1956–1960 (Pentacampeonato Europeu com Di Stéfano e Puskás) e 2014–2024 (Cinco Champions League em 10 anos sob Ancelotti e Zidane).',
    trophies: [
      {
        title: 'UEFA Champions League (Recordista Isolado)',
        count: 15,
        iconName: 'Trophy',
        years: ['1956', '1957', '1958', '1959', '1960', '1966', '1998', '2000', '2002', '2014', '2016', '2017', '2018', '2022', '2024']
      },
      {
        title: 'Mundial de Clubes da FIFA / Copa Intercontinental',
        count: 8,
        iconName: 'Globe',
        years: ['1960', '1998', '2002', '2014', '2016', '2017', '2018', '2022']
      },
      {
        title: 'Supercopa da UEFA',
        count: 6,
        iconName: 'Award',
        years: ['2002', '2014', '2016', '2017', '2022', '2024']
      },
      {
        title: 'La Liga Espanhola (Recordista)',
        count: 36,
        iconName: 'Shield',
        years: ['1932', '1954', '1961', '1975', '1986', '1995', '2001', '2007', '2012', '2017', '2020', '2022', '2024']
      },
      {
        title: 'Copa do Rei da Espanha',
        count: 20,
        iconName: 'Medal',
        years: ['1905', '1934', '1970', '1982', '1993', '2011', '2014', '2023']
      }
    ],
    legends: [
      {
        name: 'Cristiano Ronaldo (CR7)',
        era: '2009–2018',
        position: 'Extremo / Centroavante',
        goalsOrMatches: '451 gols em 438 jogos (média > 1.0 gol/jogo)',
        description: 'Maior artilheiro de toda a centenária história madridista. Quatro Bolas de Ouro com a camisa blanca.',
        achievements: '4x Champions League, 3x Mundiais, 2x La Liga, Artilheiro absoluto da UCL.'
      },
      {
        name: 'Alfredo Di Stéfano (La Saeta Rubia)',
        era: '1953–1964',
        position: 'Atacante Total',
        goalsOrMatches: '308 gols em 396 jogos',
        description: 'O jogador que transformou o Real Madrid em potência global e marcou gols em cinco finais europeias consecutivas.',
        achievements: '5x Copas da Europa consecutivas, 8x Campeonatos Espanhóis.'
      },
      {
        name: 'Zinedine Zidane (Zizou)',
        era: '2001–2006 (Jogador), 2016–2021 (Técnico)',
        position: 'Meia-Armador / Treinador',
        goalsOrMatches: '227 jogos como atleta, 3x Champions como treinador',
        description: 'Autor do voleio mais plástico da história das finais da Champions (em Glasgow contra o Leverkusen) e tricampeão europeu no banco.',
        achievements: 'Champions 2002 (atleta), Tri consecutivo da Champions 2016-17-18 (técnico).'
      },
      {
        name: 'Vinicius Jr & Luka Modrić',
        era: '2012–presente',
        position: 'Atacante / Meia Central',
        goalsOrMatches: '6x Campeão da Champions (Modrić), 2 gols em finais de UCL (Vini)',
        description: 'Modrić, Bola de Ouro em 2018, e Vinicius Jr, protagonista das 14ª e 15ª Taças da Europa.',
        achievements: 'Múltiplas taças europeias e mundiais.'
      }
    ],
    rivalries: [
      {
        rivalName: 'FC Barcelona',
        derbyName: 'El Clásico',
        description: 'A partida de futebol de clubes com maior audiência televisiva global (ultrapassa 650 milhões de telespectadores). Rivalidade esportiva, cultural e política.',
        historicalRecord: 'Mais de 250 partidas oficiais com supremacia em finais de Champions e Copas.'
      },
      {
        rivalName: 'Atlético de Madrid',
        derbyName: 'Derbi Madrileño',
        description: 'O clássico da capital espanhola, levado ao ápice com as finais da Champions League de 2014 (Lisboa) e 2016 (Milão).',
        historicalRecord: 'Confrontos centenários acalorados na Espanha.'
      }
    ],
    curiosities: [
      'O Real Madrid nunca foi rebaixado na história da Primeira Divisão Espanhola, juntamente com Athletic Bilbao e Barcelona.',
      'O Santiago Bernabéu foi reformado recentemente e conta com um gramado retrátil subterrâneo em estufa automatizada e teto móvel 360º.',
      'Entre 1957 e 1965, o Real Madrid permaneceu incríveis 121 jogos consecutivos sem perder uma única partida oficial como mandante em La Liga.'
    ],
    anthemVerse: '¡Hala Madrid! ¡Hala Madrid! Noble y bélico adalid, caballero del honor. ¡Hala Madrid! ¡Hala Madrid! A triunfar en buena lid, defendiendo tu color!',
    website: 'https://www.realmadrid.com'
  },

  barcelona: {
    id: 'barcelona',
    name: 'Barcelona',
    popularName: 'Barça',
    fullName: 'Futbol Club Barcelona',
    nickname: 'Blaugrana, Culés',
    badgeEmoji: '🔵🔴',
    primaryColor: '#004d98',
    secondaryColor: '#a50044',
    accentColor: '#edbb00',
    foundationDate: '29 de Novembro de 1899',
    foundationYear: 1899,
    originCity: 'Barcelona, Catalunha',
    country: 'Espanha',
    stadium: {
      name: 'Spotify Camp Nou',
      capacity: '99.354 espectadores',
      opened: 1957,
      city: 'Barcelona',
      popularNickname: 'O Santuário Blaugrana'
    },
    president: 'Joan Laporta',
    coach: 'Hansi Flick',
    summary: 'Sob o eterno lema "Més que un club" (Mais que um clube), o Barcelona é o símbolo esportivo da identidade catalã. Famoso pelo futebol arte posicional, pela academia La Masia e pela gloriosa era Lionel Messi.',
    detailedHistory: `Fundado pelo suíço Joan Gamper em 1899 com outros entusiastas suíços, britânicos e catalães, o Barcelona rapidamente converteu-se no catalisador das aspirações culturais e democráticas da Catalunha.

Na década de 1970, a chegada do gênio holandês Johan Cruyff transformou para sempre o DNA do clube. Nos anos 1990, de volta como técnico, Cruyff ergueu o lendário "Dream Team" com Romário, Koeman e Stoichkov, conquistando a primeira Champions League do clube em 1992 em Wembley.

No início dos anos 2000, o brilho transcendental de Ronaldinho Gaúcho devolveu o sorriso e a glória ao Camp Nou. Logo em seguida, sob a batuta de Pep Guardiola (2008–2012) e o surgimento do maior jogador do século XXI, Lionel Messi, acompanhado dos maestros Xavi e Iniesta, o Barcelona praticou o que muitos historiadores consideram o futebol mais perfeito e dominante de todos os tempos: o "Tiki-Taka", conquistando o histórico Sextete em 2009.`,
    goldenEra: '2008–2015 (A Era Pep Guardiola e o trio MSN - Messi, Suárez e Neymar, conquistando dois "Trebles" históricos).',
    trophies: [
      {
        title: 'UEFA Champions League',
        count: 5,
        iconName: 'Trophy',
        years: ['1992', '2006', '2009', '2011', '2015']
      },
      {
        title: 'Mundial de Clubes da FIFA',
        count: 3,
        iconName: 'Globe',
        years: ['2009', '2011', '2015']
      },
      {
        title: 'La Liga Espanhola',
        count: 27,
        iconName: 'Shield',
        years: ['1929', '1945', '1974', '1991', '1992', '1999', '2005', '2006', '2009', '2011', '2015', '2018', '2019', '2023']
      },
      {
        title: 'Copa do Rei da Espanha (Recordista)',
        count: 31,
        iconName: 'Medal',
        years: ['1910', '1922', '1951', '1968', '1981', '1997', '2009', '2012', '2015', '2016', '2017', '2018', '2021']
      }
    ],
    legends: [
      {
        name: 'Lionel Messi (La Pulga)',
        era: '2004–2021',
        position: 'Gênio / Extremo / Camisa 10',
        goalsOrMatches: '672 gols em 778 jogos (recorde absoluto)',
        description: 'Considerado por muitos o melhor jogador de futebol de todos os tempos. Formado em La Masia, venceu 35 títulos pelo Barça e 6 Bolas de Ouro pelo clube.',
        achievements: '4x Champions League, 10x La Liga, 3x Mundiais de Clubes, 6x Chuteiras de Ouro.'
      },
      {
        name: 'Ronaldinho Gaúcho (O Bruxo)',
        era: '2003–2008',
        position: 'Meia-Atacante',
        goalsOrMatches: '94 gols em 207 jogos',
        description: 'O homem que resgatou o orgulho e a magia no Camp Nou, aplaudido de pé no Santiago Bernabéu em 2005.',
        achievements: 'Champions League 2006, 2x La Liga, Melhor do Mundo FIFA (2004, 2005).'
      },
      {
        name: 'Johan Cruyff',
        era: '1973–1978 (Jogador), 1988–1996 (Técnico)',
        position: 'Atacante / Arquiteto Tático',
        goalsOrMatches: 'Pai intelectual do futebol moderno do Barça',
        description: 'O mentor que idealizou La Masia e o conceito de futebol total que define o clube até hoje.',
        achievements: 'Champions 1992 (treinador), 4x Ligas seguidas (Dream Team).'
      },
      {
        name: 'Xavi Hernández & Andrés Iniesta',
        era: '1998–2018',
        position: 'Cérebros do Meio-Campo',
        goalsOrMatches: 'Mais de 1.400 jogos combinados',
        description: 'A dupla de meio-campistas mais simbiótica e precisa da história do futebol.',
        achievements: '4x Champions League, Sextete 2009, Quintessência de La Masia.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Real Madrid',
        derbyName: 'El Clásico',
        description: 'A rivalidade de maior repercussão global no esporte.',
        historicalRecord: 'Mais de 250 partidas com embates marcados pelo confronto Guardiola x Mourinho e Messi x Cristiano Ronaldo.'
      },
      {
        rivalName: 'Espanyol',
        derbyName: 'Derbi Barcelonés',
        description: 'O clássico urbano da cidade de Barcelona entre catalães de tradições distintas.',
        historicalRecord: 'Mais de 170 jogos em La Liga.'
      }
    ],
    curiosities: [
      'O termo "Culés" (bunda em catalão) surgiu na década de 1920, no antigo campo da rua Indústria: os torcedores sentavam-se no muro alto da arquibancada e quem passava na rua só via as costas e nádegas deles enfileiradas.',
      'O primeiro contrato de Lionel Messi com o Barcelona foi assinado pelo secretário técnico Carles Rexach em um guardanapo de papel numa cafeteria.',
      'Em 2009, o Barcelona se tornou o primeiro clube do mundo a vencer todos os 6 títulos oficiais disputados em um único ano civil (Sextete).'
    ],
    anthemVerse: 'Tot el camp és un clam, som la gent blaugrana! Tant se val d\'on venim, si del sud o del nord, ara estem d\'acord, estem d\'acord: una bandera ens agmana! ¡Barça, Barça, Baaaarça!',
    website: 'https://www.fcbarcelona.com'
  },

  sao_paulo: {
    id: 'sao_paulo',
    name: 'São Paulo',
    popularName: 'Tricolor',
    fullName: 'São Paulo Futebol Clube',
    nickname: 'O Soberano, Tricolor Paulista, Clube da Fé',
    badgeEmoji: '🔴⚪⚫',
    primaryColor: '#c8102e',
    secondaryColor: '#000000',
    accentColor: '#ffffff',
    foundationDate: '25 de Janeiro de 1930 (refundado em 1935)',
    foundationYear: 1930,
    originCity: 'São Paulo, SP',
    country: 'Brasil',
    stadium: {
      name: 'MorumBIS (Estádio Cícero Pompeu de Toledo)',
      capacity: '66.795 espectadores',
      opened: 1960,
      city: 'São Paulo',
      popularNickname: 'O Gigante do Morumbi'
    },
    president: 'Julio Casares',
    coach: 'Luis Zubeldía',
    summary: 'Tricampeão Mundial e Tricampeão da Copa Libertadores, o São Paulo FC é conhecido como "O Clube da Fé" por sua capacidade histórica de ressurgir e vencer os maiores gigantes do futebol europeu (Barcelona em 1992, Milan em 1993 e Liverpool em 2005).',
    detailedHistory: `Fundado no dia do aniversário da cidade de São Paulo em 1930 pela união de dissidentes do Paulistano e da Associação Atlética das Palmeiras, o clube passou por turbulências políticas que culminaram na sua lendária refundação em dezembro de 1935, liderada pelos abnegados do "Clube da Fé".

Nos anos 1950 e 1960, o São Paulo abriu mão de grandes contratações para erguer o maior estádio particular do mundo na época: o Morumbi. 

A consagração cósmica do Tricolor ocorreu nos anos 1990 sob o comando do mestre Telê Santana. Praticando um futebol ofensivo, limpo e exuberante, o São Paulo bateu o Barcelona de Cruyff em Tóquio por 2 a 1 em 1992 e o Milan de Capello por 3 a 2 em 1993.

Em 2005, com o goleiro-artilheiro Rogério Ceni vivendo temporada histórica, o Tricolor sagrou-se tricampeão mundial diante do Liverpool em Yokohama, engatando logo a seguir o inédito tricampeonato consecutivo do Brasileirão (2006, 2007 e 2008) com Muricy Ramalho.`,
    goldenEra: '1991–1994 (A Era Telê Santana com Raí, Zetti, Muller e Cafu) e 2005–2008 (Tricampeão da Libertadores, Mundial e Tri do Brasileirão com Rogério Ceni).',
    trophies: [
      {
        title: 'Mundial de Clubes da FIFA / Copa Intercontinental (3x Invicto)',
        count: 3,
        iconName: 'Globe',
        years: ['1992', '1993', '2005']
      },
      {
        title: 'Copa Libertadores da América',
        count: 3,
        iconName: 'Trophy',
        years: ['1992', '1993', '2005']
      },
      {
        title: 'Copa Sul-Americana',
        count: 1,
        iconName: 'Award',
        years: ['2012']
      },
      {
        title: 'Campeonato Brasileiro Série A',
        count: 6,
        iconName: 'Shield',
        years: ['1977', '1986', '1991', '2006', '2007', '2008']
      },
      {
        title: 'Copa do Brasil',
        count: 1,
        iconName: 'Medal',
        years: ['2023']
      },
      {
        title: 'Campeonato Paulista',
        count: 22,
        iconName: 'Star',
        years: ['1931', '1943', '1953', '1971', '1975', '1980', '1985', '1987', '1991', '1992', '2000', '2005', '2021']
      }
    ],
    legends: [
      {
        name: 'Rogério Ceni (O Mito)',
        era: '1990–2015',
        position: 'Goleiro / Cobrador de Faltas',
        goalsOrMatches: '1.237 jogos (recorde mundial em um único clube), 131 gols',
        description: 'Maior goleiro-artilheiro da história da humanidade e maior ícone da torcida são-paulina.',
        achievements: 'Mundial 1993 e 2005 (Melhor jogador), Libertadores 1993 e 2005, Tri do Brasileirão 2006/07/08.'
      },
      {
        name: 'Raí (O Terror do Morumbi)',
        era: '1987–1993, 1998–2000',
        position: 'Meia-Armador / Capitão',
        goalsOrMatches: '395 jogos, 128 gols',
        description: 'Capitão e líder da equipe dos sonhos de Telê Santana. Dois gols na final do Mundial de 1992 contra o Barcelona.',
        achievements: 'Mundial 1992, Libertadores 1992 e 1993, Brasileirão 1991.'
      },
      {
        name: 'Telê Santana (Mestre Telê)',
        era: '1990–1996 (Técnico)',
        position: 'Treinador Histórico',
        goalsOrMatches: '410 partidas comandadas',
        description: 'O mestre que uniu a exigência da perfeição técnica à disciplina tática, construindo o time mais respeitado do planeta.',
        achievements: '2x Mundiais, 2x Libertadores, 2x Recopas, Brasileirão.'
      },
      {
        name: 'Careca & Muller',
        era: '1983–1997',
        position: 'Atacantes / Artilheiros',
        goalsOrMatches: 'Centenas de gols decisivos',
        description: 'Atacantes cirúrgicos com faro de gol implacável que marcaram época no Morumbi e na Seleção Brasileira.',
        achievements: 'Mundiais, Libertadores e Brasileirões.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Corinthians',
        derbyName: 'Clássico Majestoso',
        description: 'Batizado pelo célebre cronista Tommaso Mazzoni nos anos 1940. Disputa intensa que polariza a maior metrópole da América do Sul.',
        historicalRecord: 'Mais de 360 confrontos disputados.'
      },
      {
        rivalName: 'Palmeiras',
        derbyName: 'Choque-Rei',
        description: 'Rivalidade que remonta ao início das duas agremiações, com jogos tensos em mata-matas continentais e estaduais.',
        historicalRecord: 'Mais de 340 partidas.'
      },
      {
        rivalName: 'Santos',
        derbyName: 'San-São',
        description: 'Confronto entre a capital e o litoral com recordes históricos de público.',
        historicalRecord: 'Mais de 320 duelos.'
      }
    ],
    curiosities: [
      'O São Paulo é o único clube brasileiro que disputou 3 finais de Mundial Interclubes contra os campeões da Champions League e venceu todas as 3 (100% de aproveitamento contra Barcelona, Milan e Liverpool).',
      'As cores do clube foram criadas juntando as cores do Paulistano (vermelho e branco) e da A.A. das Palmeiras (preto e branco), resultando no tradicional uniforme tricolor.',
      'O lendário centro de treinamento de Cotia é referência global em formação de atletas, tendo revelado Kaká (Melhor do Mundo FIFA em 2007), Lucas Moura, Casemiro e Antony.'
    ],
    anthemVerse: 'Salve o Tricolor Paulista, amado clube brasileiro! Tu és forte, tu és grande, dentre os grandes és o primeiro!',
    website: 'https://www.saopaulofc.net'
  },

  manchester_city: {
    id: 'manchester_city',
    name: 'Manchester City',
    popularName: 'City',
    fullName: 'Manchester City Football Club',
    nickname: 'The Citizens, Sky Blues',
    badgeEmoji: '🔵⚪',
    primaryColor: '#6cabdd',
    secondaryColor: '#1c2c5b',
    accentColor: '#93c5fd',
    foundationDate: '1880 (como St. Mark\'s)',
    foundationYear: 1880,
    originCity: 'Manchester',
    country: 'Inglaterra',
    stadium: {
      name: 'Etihad Stadium',
      capacity: '53.400 espectadores',
      opened: 2003,
      city: 'Manchester',
      popularNickname: 'The Blue Moon'
    },
    president: 'Khaldoon Al Mubarak',
    coach: 'Pep Guardiola',
    summary: 'Fundado originalmente em 1880 pela igreja St. Mark\'s em Gorton para afastar os jovens da violência urbana, o City transformou-se no século XXI na máquina de futebol mais avassaladora da Europa, culminando na conquista da Triplice Coroa (Treble) em 2023.',
    detailedHistory: `Em 1880, membros da Igreja St. Mark de Gorton fundaram o clube, que em 1894 adotou o nome definitivo de Manchester City Football Club.

O clube viveu um primeiro auge no final dos anos 1960 sob o comando de Joe Mercer e Malcolm Allison, conquistando o título inglês em 1968 e a Taça das Taças Europeia em 1970 com lendas como Colin Bell e Francis Lee.

No final dos anos 1990, o City chegou ao fundo do poço caindo para a terceira divisão, até iniciar sua lendária recuperação com a final do play-off em Wembley em 1999.

A virada de chave definitiva ocorreu com a aquisição pelo Abu Dhabi United Group em 2008. Em 13 de maio de 2012, Sergio Agüero marcou o gol mais emocionante da Premier League no minuto 93:20 para selar o título após 44 anos.

A partir de 2016, a chegada do treinador Pep Guardiola levou a equipe à estratosfera tática, acumulando quatro títulos consecutivos inéditos da Premier League e vencendo em 2023 a tão sonhada UEFA Champions League e o Mundial de Clubes.`,
    goldenEra: '2017–presente (A Era Pep Guardiola com 4 títulos seguidos da Premier League, o Centurions de 100 pontos em 2018 e a Tríplice Coroa em 2023).',
    trophies: [
      {
        title: 'UEFA Champions League',
        count: 1,
        iconName: 'Trophy',
        years: ['2023']
      },
      {
        title: 'Mundial de Clubes da FIFA',
        count: 1,
        iconName: 'Globe',
        years: ['2023']
      },
      {
        title: 'Premier League / Campeonato Inglês',
        count: 10,
        iconName: 'Shield',
        years: ['1937', '1968', '2012', '2014', '2018', '2019', '2021', '2022', '2023', '2024']
      },
      {
        title: 'FA Cup (Copa da Inglaterra)',
        count: 7,
        iconName: 'Medal',
        years: ['1904', '1934', '1956', '1969', '2011', '2019', '2023']
      },
      {
        title: 'EFL Cup (Copa da Liga Inglesa)',
        count: 8,
        iconName: 'Star',
        years: ['1970', '1976', '2014', '2016', '2018', '2019', '2020', '2021']
      }
    ],
    legends: [
      {
        name: 'Kevin De Bruyne',
        era: '2015–presente',
        position: 'Meia-Ofensivo / Maestro',
        goalsOrMatches: 'Mais de 100 gols e 170 assistências pelo City',
        description: 'O passador mais genial e influente da era moderna da Premier League.',
        achievements: 'Champions League 2023, 6x Premier League, 2x Jogador do Ano da PFA.'
      },
      {
        name: 'Sergio "Kun" Agüero',
        era: '2011–2021',
        position: 'Centroavante',
        goalsOrMatches: '260 gols em 390 jogos (maior artilheiro da história do clube)',
        description: 'Eternizado pela estátua no Etihad e pelo antológico gol aos 93:20 contra o QPR em 2012.',
        achievements: '5x Premier League, Artilheiro histórico.'
      },
      {
        name: 'Erling Haaland',
        era: '2022–presente',
        position: 'Centroavante / Exterminador',
        goalsOrMatches: 'Mais de 90 gols em menos de 100 jogos',
        description: 'O homem dos recordes da Premier League (36 gols em uma única edição de estreia).',
        achievements: 'Tríplice Coroa 2023, Chuteira de Ouro Europeia.'
      },
      {
        name: 'Vincent Kompany & David Silva',
        era: '2008–2020',
        position: 'Zagueiro-Capitão / "El Mago"',
        goalsOrMatches: 'Mais de 700 jogos somados',
        description: 'Os alicerces de liderança e criatividade que construíram a grandeza moderna do clube.',
        achievements: 'Múltiplos títulos de Premier League.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Manchester United',
        derbyName: 'Manchester Derby',
        description: 'Uma das batalhas citadinas mais intensas do futebol inglês, que nos últimos 15 anos viu o City assumir o domínio da cidade.',
        historicalRecord: 'Mais de 190 partidas oficiais.'
      },
      {
        rivalName: 'Liverpool',
        derbyName: 'A Batalha Moderna da Inglaterra',
        description: 'Duelos táticos épicos entre o City de Guardiola e o Liverpool de Klopp disputados ponto a ponto por 95+ pontos na liga.',
        historicalRecord: 'Disputas eletrizantes decididas na última rodada.'
      }
    ],
    curiosities: [
      'Na temporada 2017-18, o Manchester City se tornou o primeiro e único time na história da Premier League a alcançar a marca mágica de 100 pontos (The Centurions).',
      'O hino do clube, "Blue Moon", foi gravado originalmente em 1934 por Richard Rodgers e Lorenz Hart e virou o canto mais arrepiante entoado no Etihad Stadium.',
      'O City é o primeiro clube masculino da história do futebol inglês a vencer quatro títulos consecutivos da divisão principal (2021, 2022, 2023, 2024).'
    ],
    anthemVerse: 'Blue Moon, you saw me standing alone, without a dream in my heart, without a love of my own! Then suddenly there appeared before me...',
    website: 'https://www.mancity.com'
  },

  corinthians: {
    id: 'corinthians',
    name: 'Corinthians',
    popularName: 'Timão',
    fullName: 'Sport Club Corinthians Paulista',
    nickname: 'O Time do Povo, Todo Poderoso Timão, Coringão',
    badgeEmoji: '⚪⚫',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    accentColor: '#dc2626',
    foundationDate: '1 de Setembro de 1910',
    foundationYear: 1910,
    originCity: 'São Paulo, SP',
    country: 'Brasil',
    stadium: {
      name: 'Neo Química Arena',
      capacity: '49.205 espectadores',
      opened: 2014,
      city: 'São Paulo',
      popularNickname: 'O Caldeirão de Itaquera'
    },
    president: 'Augusto Melo',
    coach: 'Ramón Díaz',
    summary: 'Nascido nas esquinas do bairro do Bom Retiro pela coragem de cinco operários sob a luz de um lampião, o Corinthians é o "Time do Povo". Bicampeão Mundial de Clubes da FIFA (2000 e 2012) e lar da inesquecível Democracia Corinthiana de Sócrates.',
    detailedHistory: `Em 1º de setembro de 1910, os operários Anselmo Corrêa, Antônio Pereira, Carlos Silva, Joaquim Ambrósio e Rafael Perrone fundaram o clube inspirados pelo Corinthian FC, equipe amadora de cavalheiros ingleses que excursionava por São Paulo. O primeiro presidente, o alfaiate Miguel Battaglia, proclamou: "O Corinthians vai ser o time do povo e o povo é quem vai fazer o time".

Nos anos 1970, o sofrimento de quase 23 anos sem títulos forjou uma das torcidas mais fanáticas do planeta, protagonizando a mítica Invasão Corinthiana do Maracanã em 1976 com mais de 70 mil paulistas no Rio de Janeiro, antes do gol salvador de Basílio em 1977.

Nos anos 1980, surgiu a histórica "Democracia Corinthiana", movimento liderado por Sócrates, Wladimir e Casagrande que decidia desde os horários de treino até contratações no voto direto, desafiando a Ditadura Militar com o slogan "Ganhar ou perder, mas sempre com democracia".

Em 2012, sob comando de Tite, o clube viveu seu ano perfeito: conquistou a Libertadores invicto e viajou com mais de 30 mil torcedores ao Japão para derrotar o Chelsea por 1 a 0 com gol de Paolo Guerrero e atuações milagrosas de Cássio.`,
    goldenEra: '1977–1983 (A redenção de 77 e a Democracia Corinthiana) e 2011–2015 (A Era Tite com Libertadores invicta, Mundial no Japão e Brasileirões).',
    trophies: [
      {
        title: 'Mundial de Clubes da FIFA',
        count: 2,
        iconName: 'Globe',
        years: ['2000', '2012']
      },
      {
        title: 'Copa Libertadores da América (Campeão Invicto)',
        count: 1,
        iconName: 'Trophy',
        years: ['2012']
      },
      {
        title: 'Recopa Sul-Americana',
        count: 1,
        iconName: 'Award',
        years: ['2013']
      },
      {
        title: 'Campeonato Brasileiro Série A',
        count: 7,
        iconName: 'Shield',
        years: ['1990', '1998', '1999', '2005', '2011', '2015', '2017']
      },
      {
        title: 'Copa do Brasil',
        count: 3,
        iconName: 'Medal',
        years: ['1995', '2002', '2009']
      },
      {
        title: 'Campeonato Paulista (Recordista)',
        count: 30,
        iconName: 'Star',
        years: ['1914', '1916', '1922', '1954', '1977', '1979', '1982', '1983', '1995', '1999', '2009', '2013', '2017', '2018', '2019']
      }
    ],
    legends: [
      {
        name: 'Doutor Sócrates (Magrão)',
        era: '1978–1984',
        position: 'Meia-Armador / Capitão Moral',
        goalsOrMatches: '298 jogos, 172 gols',
        description: 'Líder da Democracia Corinthiana, médico e filósofo dos gramados. Famoso pelos passes de calcanhar desconcertantes.',
        achievements: 'Bicampeão Paulista 1982/83, Símbolo cívico e esportivo brasileiro.'
      },
      {
        name: 'Cássio Ramos (Gigante)',
        era: '2012–2024',
        position: 'Goleiro Histórico',
        goalsOrMatches: '712 jogos pelo clube',
        description: 'Herói dos maiores títulos do clube com defesas milagrosas contra Diego Souza na Libertadores e Hazard no Mundial.',
        achievements: 'Mundial 2012 (Melhor jogador da final), Libertadores 2012, 2x Brasileirões.'
      },
      {
        name: 'Roberto Rivellino (Reizinho do Parque)',
        era: '1965–1974',
        position: 'Meia-Atacante',
        goalsOrMatches: '474 jogos, 144 gols',
        description: 'Criador do drible do elástico e dono de uma "patada atômica" lendária de perna esquerda.',
        achievements: 'Tricampeão mundial com a Seleção em 1970, ídolo da Fiel.'
      },
      {
        name: 'Marcelinho Carioca (Pé de Anjo)',
        era: '1994–2001, 2006, 2010',
        position: 'Meia / Cobrador de Faltas',
        goalsOrMatches: '433 jogos, 206 gols',
        description: 'Maior cobrador de faltas da história do Parque São Jorge e recordista de troféus pelo clube.',
        achievements: 'Mundial 2000, 2x Brasileirão, Copa do Brasil 1995.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Palmeiras',
        derbyName: 'Derby Paulista',
        description: 'O mais antigo e acalorado clássico paulista, marcado por provocações antológicas e decisões históricas.',
        historicalRecord: 'Mais de 380 partidas com decisões dramáticas nos pênaltis.'
      },
      {
        rivalName: 'São Paulo',
        derbyName: 'Clássico Majestoso',
        description: 'Confronto entre a paixão popular do Timão e o Tricolor do Morumbi.',
        historicalRecord: 'Mais de 360 confrontos.'
      },
      {
        rivalName: 'Santos',
        derbyName: 'Clássico Alvinegro',
        description: 'Duelos marcados pelo tabu de Pelé nos anos 60 e vingança alvinegra nos anos 70.',
        historicalRecord: 'Mais de 340 duelos.'
      }
    ],
    curiosities: [
      'Em 5 de dezembro de 1976, cerca de 70 mil torcedores corinthianos viajaram de São Paulo ao Rio de Janeiro na "Invasão do Maracanã" na semifinal do Brasileirão contra o Fluminense, no maior deslocamento pacífico de pessoas por transporte terrestre da história do esporte.',
      'O âncora e os dois remos no escudo foram desenhados pelo artista plástico e ex-jogador Francisco Rebolo em 1939 em alusão aos esportes náuticos do clube.',
      'No Mundial de Clubes de 2012 em Yokohama, o Corinthians levou mais de 30 mil fiéis ao Japão, que tingiram o estádio de preto e branco e foram elogiados pela imprensa internacional.'
    ],
    anthemVerse: 'Salve o Corinthians, o campeão dos campeões! Eternamente dentro dos nossos corações! Salve o Corinthians, de tradições e glórias mil...',
    website: 'https://www.corinthians.com.br'
  },

  santos: {
    id: 'santos',
    name: 'Santos',
    popularName: 'Peixe',
    fullName: 'Santos Futebol Clube',
    nickname: 'Alvinegro Praiano, Meninos da Vila, Santástico',
    badgeEmoji: '⚪⚫⭐',
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    accentColor: '#eab308',
    foundationDate: '14 de Abril de 1912',
    foundationYear: 1912,
    originCity: 'Santos, SP',
    country: 'Brasil',
    stadium: {
      name: 'Estádio Urbano Caldeira (Vila Belmiro)',
      capacity: '16.068 espectadores',
      opened: 1916,
      city: 'Santos',
      popularNickname: 'O Alçapão da Vila'
    },
    president: 'Marcelo Teixeira',
    coach: 'Fábio Carille',
    summary: 'A capital mundial do futebol arte. Berço do Rei Pelé, o maior atleta do século XX, o Santos encantou o planeta nos anos 1960 parando até guerras e conquistando o bicampeonato mundial em 1962 e 1963. Seguiu como celeiro inesgotável revelando craques como Neymar Jr.',
    detailedHistory: `No mesmo dia em que o transatlântico Titanic afundava no Atlântico Norte, em 14 de abril de 1912, três esportistas da cidade litorânea - Raymundo Marques, Mário Ferraz de Campos e Argemiro de Souza Júnior - fundaram o Santos Foot-Ball Club.

Em 1956, aos 15 anos, um garoto tímido de Três Corações chamado Edson Arantes do Nascimento, o Pelé, chegou à Vila Belmiro levado por Waldemar de Brito, que avisou: "Esse menino vai ser o melhor do mundo". O aviso virou lenda.

Entre 1956 e 1974, o "Santástico" de Pelé, Pepe, Coutinho, Zito, Mengálvio e Dorval assombrou os cinco continentes com mais de 3.000 gols. Em 1962, o Santos venceu Benfica de Eusébio e Peñarol para conquistar a Libertadores e o Mundial em pleno Estádio da Luz. Em 1963, repetiu o feito batendo o Milan de Maldini e Rivera no Maracanã.

Em 1969, em excursão pela África, o Santos parou a sangrenta Guerra de Biafra na Nigéria, com ambas as facções decretando cessar-fogo para assistir ao Rei Pelé jogar.

No século XXI, a mística dos "Meninos da Vila" floresceu novamente com Diego e Robinho em 2002 e a explosão meteórica de Neymar e Ganso em 2010 e 2011, faturando a terceira Copa Libertadores.`,
    goldenEra: '1961–1968 (A Era Pelé: Bicampeão Mundial, Bicampeão da Libertadores, Pentacampeão da Taça Brasil) e 2010–2012 (A Era Neymar Jr).',
    trophies: [
      {
        title: 'Mundial Interclubes (Bicampeão Mundial)',
        count: 2,
        iconName: 'Globe',
        years: ['1962', '1963']
      },
      {
        title: 'Copa Libertadores da América',
        count: 3,
        iconName: 'Trophy',
        years: ['1962', '1963', '2011']
      },
      {
        title: 'Recopa Sul-Americana',
        count: 1,
        iconName: 'Award',
        years: ['2012']
      },
      {
        title: 'Campeonato Brasileiro Série A',
        count: 8,
        iconName: 'Shield',
        years: ['1961', '1962', '1963', '1964', '1965', '1968', '2002', '2004']
      },
      {
        title: 'Copa do Brasil',
        count: 1,
        iconName: 'Medal',
        years: ['2010']
      },
      {
        title: 'Campeonato Paulista',
        count: 22,
        iconName: 'Star',
        years: ['1935', '1955', '1958', '1960', '1962', '1964', '1967', '1973', '1984', '2006', '2010', '2011', '2012', '2015', '2016']
      }
    ],
    legends: [
      {
        name: 'Pelé (O Rei do Futebol)',
        era: '1956–1974',
        position: 'Rei do Futebol / Camisa 10',
        goalsOrMatches: '1.091 gols em 1.116 jogos pelo Santos',
        description: 'O maior esportista de todos os tempos. Eternizou o número 10 mundialmente e revolucionou para sempre o esporte.',
        achievements: 'Bicampeão Mundial 1962/63, Tricampeão Mundial com o Brasil (1958, 62, 70), 6x Brasileiros.'
      },
      {
        name: 'Pepe (O Canhão da Vila)',
        era: '1954–1969',
        position: 'Ponta-Esquerda',
        goalsOrMatches: '405 gols em 750 jogos',
        description: 'O maior artilheiro "humano" do Santos (atrás apenas de Pelé), com chutes de canhota assustadoramente potentes.',
        achievements: 'Bicampeão Mundial 1962/63, 2x Campeão Mundial pelo Brasil.'
      },
      {
        name: 'Neymar Jr',
        era: '2009–2013',
        position: 'Ponta-Esquerda / Gênio dos Dribles',
        goalsOrMatches: '138 gols em 230 jogos',
        description: 'O Menino da Vila do século XXI, Prêmio Puskás da FIFA em 2011 com gol antológico contra o Flamengo.',
        achievements: 'Libertadores 2011, Copa do Brasil 2010, Recopa 2012.'
      },
      {
        name: 'Coutinho',
        era: '1958–1968',
        position: 'Centroavante',
        goalsOrMatches: '370 gols em 457 jogos',
        description: 'O parceiro mais genial de tabelinhas com o Rei Pelé dentro da grande área adversária.',
        achievements: 'Bicampeão Mundial 1962/63.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Palmeiras',
        derbyName: 'Clássico da Saudade',
        description: 'Revive as maiores noites de gala do futebol paulista dos anos 60 e a grande final da Libertadores 2020.',
        historicalRecord: 'Mais de 340 duelos.'
      },
      {
        rivalName: 'Corinthians',
        derbyName: 'Clássico Alvinegro',
        description: 'Rivalidade que coleciona capítulos épicos, pedaladas de Robinho em 2002 e golaços de Neymar.',
        historicalRecord: 'Mais de 340 jogos.'
      },
      {
        rivalName: 'São Paulo',
        derbyName: 'San-São',
        description: 'Clássico histórico entre duas das camisas mais vitoriosas internacionalmente do Brasil.',
        historicalRecord: 'Mais de 320 partidas.'
      }
    ],
    curiosities: [
      'O Santos é o clube de futebol que mais balançou as redes em toda a história da humanidade, superando a marca de 13.000 gols oficiais.',
      'Em 1969, em plena guerra civil na Nigéria, o governo nigeriano e os rebeldes de Biafra assinaram um armistício temporário de 48 horas para que ambos os lados pudessem assistir ao Santos de Pelé em campo na cidade de Benin.',
      'A Vila Belmiro possui um túnel de acesso ao gramado onde os jogadores tocam a placa "Aqui nasceu o Rei" antes de entrar no campo.'
    ],
    anthemVerse: 'Sou Alvinegro da Vila Belmiro! O Santos vive no meu coração! É o orgulho da nossa terra, nascido para ser campeão!',
    website: 'https://www.santosfc.com.br'
  },

  liverpool: {
    id: 'liverpool',
    name: 'Liverpool',
    popularName: 'The Reds',
    fullName: 'Liverpool Football Club',
    nickname: 'The Reds, Kopites',
    badgeEmoji: '🔴⚪',
    primaryColor: '#c8102e',
    secondaryColor: '#ffffff',
    accentColor: '#00b2a9',
    foundationDate: '3 de Junho de 1892',
    foundationYear: 1892,
    originCity: 'Liverpool, Merseyside',
    country: 'Inglaterra',
    stadium: {
      name: 'Anfield',
      capacity: '61.276 espectadores',
      opened: 1884,
      city: 'Liverpool',
      popularNickname: 'This is Anfield'
    },
    president: 'Tom Werner (FSG)',
    coach: 'Arne Slot',
    summary: 'Com a icônica arquibancada The Kop e o hino arrepiante "You\'ll Never Walk Alone", o Liverpool é o clube inglês mais titulado em competições europeias (6 Champions League). Conhecido pelo milagre de Istambul em 2005 e pelo futebol de alta intensidade.',
    detailedHistory: `Fundado em 1892 por John Houlding após uma disputa sobre o aluguel de Anfield que fez o Everton deixar o estádio, o Liverpool adotou o vermelho total em 1964 por decisão do técnico Bill Shankly, para impor respeito e poder psicológico aos adversários.

Sob o comando de Shankly e seu sucessor Bob Paisley nos anos 1970 e 1980, o clube dominou a Inglaterra e o continente europeu, faturando 4 Taças dos Campeões Europeus entre 1977 e 1984 com Kenny Dalglish, Ian Rush e Graeme Souness.

Em 25 de maio de 2005, o Liverpool protagonizou a maior final de Champions de todos os tempos: perdendo de 3 a 0 no intervalo para o poderoso Milan em Istambul, empatou em 6 minutos épicos liderado por Steven Gerrard e foi campeão nos pênaltis.

Entre 2015 e 2024, o técnico Jürgen Klopp construiu a era do "Heavy Metal Football", conquistando a sexta Champions League em 2019 e encerrando um jejum de 30 anos sem vencer a Premier League em 2020 com o trio devastador Salah, Firmino e Mané.`,
    goldenEra: '1975–1984 (A Era Bob Paisley com 3 Champions League) e 2018–2022 (A Era Jürgen Klopp campeão da Europa, do Mundo e da Premier League).',
    trophies: [
      {
        title: 'UEFA Champions League (Recordista Inglês)',
        count: 6,
        iconName: 'Trophy',
        years: ['1977', '1978', '1981', '1984', '2005', '2019']
      },
      {
        title: 'Mundial de Clubes da FIFA',
        count: 1,
        iconName: 'Globe',
        years: ['2019']
      },
      {
        title: 'Premier League / Campeonato Inglês',
        count: 19,
        iconName: 'Shield',
        years: ['1901', '1906', '1922', '1923', '1947', '1964', '1966', '1973', '1976', '1977', '1979', '1980', '1982', '1983', '1984', '1986', '1988', '1990', '2020']
      },
      {
        title: 'Copa da UEFA / Europa League',
        count: 3,
        iconName: 'Award',
        years: ['1973', '1976', '2001']
      },
      {
        title: 'FA Cup (Copa da Inglaterra)',
        count: 8,
        iconName: 'Medal',
        years: ['1965', '1974', '1986', '1989', '1992', '2001', '2006', '2022']
      }
    ],
    legends: [
      {
        name: 'Steven Gerrard (Captain Fantastic)',
        era: '1998–2015',
        position: 'Meio-Campista Total / Capitão',
        goalsOrMatches: '710 jogos, 186 gols',
        description: 'O maior capitão e alma de Anfield. Liderou a inacreditável virada do Milagre de Istambul em 2005.',
        achievements: 'Champions League 2005, Copa da UEFA 2001, 2x FA Cups.'
      },
      {
        name: 'Sir Kenny Dalglish (King Kenny)',
        era: '1977–1990 (Jogador/Técnico)',
        position: 'Atacante / Rei de Anfield',
        goalsOrMatches: '515 jogos, 172 gols',
        description: 'Venceu 3 Taças dos Campeões Europeus como jogador e fez a transição para técnico vencedor com bravura exemplar.',
        achievements: '3x Copas da Europa, 6x Títulos da Liga Inglesa.'
      },
      {
        name: 'Mohamed Salah (O Rei Egípcio)',
        era: '2017–presente',
        position: 'Extremo-Direito',
        goalsOrMatches: 'Mais de 220 gols pelo Liverpool',
        description: 'Maior artilheiro do Liverpool na era moderna da Premier League e ícone mundial.',
        achievements: 'Champions League 2019, Premier League 2020, 3x Chuteiras de Ouro da Premier League.'
      },
      {
        name: 'Ian Rush',
        era: '1980–1987, 1988–1996',
        position: 'Centroavante',
        goalsOrMatches: '346 gols em 660 jogos (recorde absoluto do clube)',
        description: 'O finalizador mais letal da história do futebol inglês.',
        achievements: '2x Copas da Europa, 5x Ligas Inglesas.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Manchester United',
        derbyName: 'North West Derby',
        description: 'O maior clássico do futebol britânico, unindo as duas cidades industriais do noroeste e os dois maiores campeões nacionais.',
        historicalRecord: 'Mais de 210 partidas oficiais.'
      },
      {
        rivalName: 'Everton',
        derbyName: 'Merseyside Derby',
        description: 'O clássico de Liverpool, separado por menos de 1 quilômetro e pelo parque Stanley Park.',
        historicalRecord: 'O derby ininterrupto mais longo da divisão de elite inglesa.'
      }
    ],
    curiosities: [
      'No túnel de acesso a Anfield, há a famosa placa de ferro pintada "THIS IS ANFIELD", instalada pelo lendário técnico Bill Shankly para "lembrar aos nossos rapazes por quem estão jogando, e aos adversários contra quem estão jogando".',
      'A canção "You\'ll Never Walk Alone" foi gravada pelo grupo local Gerry and the Pacemakers em 1963 e adotada pela arquibancada Spion Kop, tornando-se o hino comunitário mais emocionante do planeta.',
      'O Liverpool conquistou em 2020 a Premier League com 7 rodadas de antecedência, estabelecendo a conquista mais rápida de toda a história do futebol inglês.'
    ],
    anthemVerse: 'Walk on through the wind, walk on through the rain, though your dreams be tossed and blown... Walk on, walk on, with hope in your heart, and you\'ll never walk alone!',
    website: 'https://www.liverpoolfc.com'
  },

  bayern_munich: {
    id: 'bayern_munich',
    name: 'Bayern de Munique',
    popularName: 'Bayern',
    fullName: 'Fußball-Club Bayern München e. V.',
    nickname: 'Die Roten (Os Vermelhos), Der Rekordmeister',
    badgeEmoji: '🔴⚪🔵',
    primaryColor: '#dc052d',
    secondaryColor: '#ffffff',
    accentColor: '#0066b2',
    foundationDate: '27 de Fevereiro de 1900',
    foundationYear: 1900,
    originCity: 'Munique, Baviera',
    country: 'Alemanha',
    stadium: {
      name: 'Allianz Arena',
      capacity: '75.024 espectadores',
      opened: 2005,
      city: 'Munique',
      popularNickname: 'Schlauchboot (O Bote Inflável Iluminado)'
    },
    president: 'Herbert Hainer',
    coach: 'Vincent Kompany',
    summary: 'Maior potência do futebol alemão e hexacampeão da UEFA Champions League. Fundado em 1900 sob o lema bávaro "Mia san Mia" (Nós somos o que somos), o Bayern é sinônimo de excelência, organização, títulos e craques eternos como Franz Beckenbauer e Gerd Müller.',
    detailedHistory: `Em fevereiro de 1900, Franz John liderou 11 jogadores que se reuniram no restaurante Gisela em Munique para fundar o FC Bayern München.

Nos anos 1970, com o surgimento do "Kaiser" Franz Beckenbauer na zaga, Sepp Maier no gol e o implacável Gerd Müller no ataque ("Der Bomber"), o Bayern assombrou a Europa conquistando o tricampeonato consecutivo da Taça dos Clubes Campeões Europeus em 1974, 1975 e 1976.

Na década de 2010, o Bayern atingiu a perfeição técnica ao vencer a Tríplice Coroa em 2013 com Jupp Heynckes e repetir a façanha com o Sextete em 2020 sob o comando de Hansi Flick, com o atacante Robert Lewandowski batendo recordes históricos de gols.`,
    goldenEra: '1974–1976 (Tricampeonato Europeu consecutivo de Beckenbauer e Müller) e 2012–2020 (Dois "Trebles" europeus e 11 títulos consecutivos da Bundesliga).',
    trophies: [
      {
        title: 'UEFA Champions League (Hexacampeão)',
        count: 6,
        iconName: 'Trophy',
        years: ['1974', '1975', '1976', '2001', '2013', '2020']
      },
      {
        title: 'Mundial de Clubes da FIFA / Copa Intercontinental',
        count: 4,
        iconName: 'Globe',
        years: ['1976', '2001', '2013', '2020']
      },
      {
        title: 'Bundesliga / Campeonato Alemão (Recordista)',
        count: 33,
        iconName: 'Shield',
        years: ['1932', '1969', '1972', '1973', '1974', '1980', '1989', '1999', '2001', '2008', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
      },
      {
        title: 'DFB-Pokal (Copa da Alemanha)',
        count: 20,
        iconName: 'Medal',
        years: ['1957', '1966', '1967', '1969', '1982', '1986', '1998', '2000', '2003', '2005', '2008', '2013', '2016', '2019', '2020']
      }
    ],
    legends: [
      {
        name: 'Franz Beckenbauer (Der Kaiser)',
        era: '1964–1977',
        position: 'Líbero / O Imperador',
        goalsOrMatches: '582 jogos pelo Bayern',
        description: 'O maior zagueiro e líder da história do futebol. Criou a função do líbero moderno com técnica principesca.',
        achievements: 'Tricampeão da Europa (1974/75/76), 4x Bundesligas, 2x Bolas de Ouro.'
      },
      {
        name: 'Gerd Müller (Der Bomber)',
        era: '1964–1979',
        position: 'Centroavante Implacável',
        goalsOrMatches: '566 gols em 607 jogos oficiais',
        description: 'Média de praticamente um gol por partida, com instinto letal na grande área.',
        achievements: 'Tricampeão da Europa, 7x Artilheiro da Bundesliga, Bola de Ouro 1970.'
      },
      {
        name: 'Thomas Müller & Manuel Neuer',
        era: '2008–presente',
        position: 'Segundo Atacante / Goleiro-Líbero',
        goalsOrMatches: 'Mais de 700 jogos cada pelo clube',
        description: 'Neuer revolucionou o papel do goleiro na história e Müller é o recordista histórico de jogos oficiais do Bayern.',
        achievements: '2x Tríplice Coroa (2013, 2020), 12 títulos de Bundesliga.'
      }
    ],
    rivalries: [
      {
        rivalName: 'Borussia Dortmund',
        derbyName: 'Der Klassiker',
        description: 'A maior rivalidade do futebol alemão moderno, que decidiu a final da Champions League de 2013 em Wembley.',
        historicalRecord: 'Mais de 135 jogos com disputas ferozes pela salva de prata.'
      },
      {
        rivalName: 'Real Madrid',
        derbyName: 'A Besta Negra (Clássico Europeu)',
        description: 'O duelo mais disputado da história da Champions League (mais de 26 encontros mata-mata).',
        historicalRecord: 'Confrontos épicos nas semifinais da Taça da Europa.'
      }
    ],
    curiosities: [
      'A fachada luminosa da Allianz Arena é composta por 2.874 painéis infláveis de plástico ETFE que mudam para vermelho vivo nos jogos do Bayern.',
      'O lema "Mia san Mia" sintetiza a autoconfiança e brio bávaro: o sentimento de pertencimento incondicional e a busca insaciável pela vitória.',
      'O Bayern de Munique conta com mais de 330.000 sócios pagantes registrados, figurando no topo mundial em número de membros associados.'
    ],
    anthemVerse: 'Stern des Südens, welche Fahne weht? FC Bayern, wie er leibt und lebt! Mia san mia, ein Leben lang!',
    website: 'https://fcbayern.com'
  }
};
