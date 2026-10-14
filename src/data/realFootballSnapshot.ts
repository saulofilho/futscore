import { Match, LeagueTable, TransferNewsItem } from "../types";

export const REAL_MATCHES_SNAPSHOT: Match[] = [
  {
    "id": "espn-401841258",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Arena MRV, Belo Horizonte",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "atl_tico_mg",
      "name": "Atlético-MG",
      "shortName": "CAM",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/7632.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "santos",
      "name": "Santos",
      "shortName": "SAN",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2674.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 2,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401841258-0",
        "minute": 45,
        "type": "yellow_card",
        "team": "home",
        "player": "Alan Franco",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-1",
        "minute": 45,
        "type": "yellow_card",
        "team": "away",
        "player": "Lucas Verissimo",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-2",
        "minute": 66,
        "type": "yellow_card",
        "team": "home",
        "player": "Thiago Borbas",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-3",
        "minute": 66,
        "type": "yellow_card",
        "team": "away",
        "player": "Luan Peres",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-4",
        "minute": 70,
        "type": "yellow_card",
        "team": "home",
        "player": "Igor Gomes",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-5",
        "minute": 85,
        "type": "yellow_card",
        "team": "away",
        "player": "João Schmidt",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-6",
        "minute": 88,
        "type": "goal",
        "team": "away",
        "player": "Gabriel Barbosa",
        "detail": "Goal"
      },
      {
        "id": "ev-401841258-7",
        "minute": 89,
        "type": "yellow_card",
        "team": "away",
        "player": "Gabriel Barbosa",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-8",
        "minute": 89,
        "type": "yellow_card",
        "team": "away",
        "player": "Willian Arão",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841258-9",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "Vitor Hugo",
        "detail": "Goal - Volley"
      },
      {
        "id": "ev-401841258-10",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "Thiago Borbas",
        "detail": "Goal - Volley"
      }
    ],
    "stats": {
      "possession": [
        48,
        52
      ],
      "shotsTotal": [
        12,
        6
      ],
      "shotsOnTarget": [
        5,
        2
      ],
      "xG": [
        1.9,
        1
      ],
      "corners": [
        7,
        5
      ],
      "fouls": [
        14,
        9
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        489,
        463
      ],
      "passAccuracy": [
        82,
        79
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841263",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Estadio do Maracana, Rio de Janeiro",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "flamengo",
      "name": "Flamengo",
      "shortName": "FLA",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "fluminense",
      "name": "Fluminense",
      "shortName": "FLU",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401841263-0",
        "minute": 31,
        "type": "yellow_card",
        "team": "home",
        "player": "Erick Pulgar",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841263-1",
        "minute": 39,
        "type": "yellow_card",
        "team": "away",
        "player": "Luciano Acosta",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841263-2",
        "minute": 49,
        "type": "yellow_card",
        "team": "home",
        "player": "Saúl Ñíguez",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841263-3",
        "minute": 57,
        "type": "yellow_card",
        "team": "away",
        "player": "Agustín Canobbio",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841263-4",
        "minute": 65,
        "type": "goal",
        "team": "home",
        "player": "Jorge Carrascal",
        "detail": "Goal"
      },
      {
        "id": "ev-401841263-5",
        "minute": 83,
        "type": "yellow_card",
        "team": "away",
        "player": "Ignácio",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841263-6",
        "minute": 87,
        "type": "yellow_card",
        "team": "away",
        "player": "Guilherme Arana",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841263-7",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Joaquin Freitas",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        58,
        42
      ],
      "shotsTotal": [
        8,
        6
      ],
      "shotsOnTarget": [
        3,
        2
      ],
      "xG": [
        1.1,
        0.2
      ],
      "corners": [
        4,
        6
      ],
      "fouls": [
        16,
        9
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        547,
        412
      ],
      "passAccuracy": [
        88,
        85
      ],
      "goalkeeperSaves": [
        1,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841267",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Arena do Grêmio, Porto Alegre",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "gr_mio",
      "name": "Grêmio",
      "shortName": "GRE",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6273.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "internacional",
      "name": "Internacional",
      "shortName": "INT",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1936.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401841267-0",
        "minute": 25,
        "type": "yellow_card",
        "team": "away",
        "player": "Alan Patrick",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841267-1",
        "minute": 27,
        "type": "yellow_card",
        "team": "away",
        "player": "Rodrigo Villagra",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841267-2",
        "minute": 29,
        "type": "yellow_card",
        "team": "home",
        "player": "Mathías Villasanti",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841267-3",
        "minute": 33,
        "type": "goal",
        "team": "away",
        "player": "Vitinho",
        "detail": "Goal"
      },
      {
        "id": "ev-401841267-4",
        "minute": 53,
        "type": "yellow_card",
        "team": "away",
        "player": "Bruno Henrique",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841267-5",
        "minute": 65,
        "type": "yellow_card",
        "team": "home",
        "player": "Francis Amuzu",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841267-6",
        "minute": 73,
        "type": "goal",
        "team": "home",
        "player": "Wallace",
        "detail": "Goal"
      },
      {
        "id": "ev-401841267-7",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Wallace",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        57,
        43
      ],
      "shotsTotal": [
        8,
        11
      ],
      "shotsOnTarget": [
        3,
        4
      ],
      "xG": [
        1.1,
        1
      ],
      "corners": [
        4,
        5
      ],
      "fouls": [
        12,
        16
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        465,
        436
      ],
      "passAccuracy": [
        86,
        83
      ],
      "goalkeeperSaves": [
        1,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841261",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Allianz Parque, Sao Paulo",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "palmeiras",
      "name": "Palmeiras",
      "shortName": "PAL",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "corinthians",
      "name": "Corinthians",
      "shortName": "COR",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/874.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 4,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401841261-0",
        "minute": 9,
        "type": "yellow_card",
        "team": "home",
        "player": "Jhon Arias",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-1",
        "minute": 15,
        "type": "yellow_card",
        "team": "away",
        "player": "Raniele",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-2",
        "minute": 16,
        "type": "goal",
        "team": "home",
        "player": "Alexander Barboza",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401841261-3",
        "minute": 45,
        "type": "goal",
        "team": "home",
        "player": "Agustín Giay",
        "detail": "Goal"
      },
      {
        "id": "ev-401841261-4",
        "minute": 46,
        "type": "goal",
        "team": "home",
        "player": "Matheus Bidu",
        "detail": "Own Goal"
      },
      {
        "id": "ev-401841261-5",
        "minute": 48,
        "type": "yellow_card",
        "team": "away",
        "player": "Memphis Depay",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-6",
        "minute": 49,
        "type": "yellow_card",
        "team": "home",
        "player": "Agustín Giay",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-7",
        "minute": 51,
        "type": "goal",
        "team": "home",
        "player": "Agustín Giay",
        "detail": "Goal"
      },
      {
        "id": "ev-401841261-8",
        "minute": 59,
        "type": "yellow_card",
        "team": "away",
        "player": "Gabriel Paulista",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-9",
        "minute": 65,
        "type": "yellow_card",
        "team": "away",
        "player": "Vitinho",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-10",
        "minute": 72,
        "type": "yellow_card",
        "team": "home",
        "player": "Gustavo Gómez",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841261-11",
        "minute": 90,
        "type": "goal",
        "team": "away",
        "player": "Gustavo Henrique",
        "detail": "Goal - Header"
      }
    ],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        14,
        10
      ],
      "shotsOnTarget": [
        6,
        4
      ],
      "xG": [
        3.5,
        1
      ],
      "corners": [
        6,
        2
      ],
      "fouls": [
        16,
        10
      ],
      "yellowCards": [
        0,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        4,
        1
      ],
      "passesTotal": [
        401,
        466
      ],
      "passAccuracy": [
        82,
        86
      ],
      "goalkeeperSaves": [
        1,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841266",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Arena Fonte Nova, Salvador",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "bahia",
      "name": "Bahia",
      "shortName": "BAH",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9967.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "mirassol",
      "name": "Mirassol",
      "shortName": "MIR",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9169.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401841266-0",
        "minute": 35,
        "type": "yellow_card",
        "team": "away",
        "player": "Chico",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841266-1",
        "minute": 36,
        "type": "yellow_card",
        "team": "away",
        "player": "Walter",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841266-2",
        "minute": 38,
        "type": "goal",
        "team": "home",
        "player": "Luciano Juba",
        "detail": "Penalty - Scored"
      },
      {
        "id": "ev-401841266-3",
        "minute": 63,
        "type": "yellow_card",
        "team": "home",
        "player": "Jean Lucas",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841266-4",
        "minute": 78,
        "type": "yellow_card",
        "team": "away",
        "player": "Carlos Eduardo",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841266-5",
        "minute": 90,
        "type": "yellow_card",
        "team": "away",
        "player": "Neto Moura",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        10,
        10
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        1.1,
        0.2
      ],
      "corners": [
        5,
        6
      ],
      "fouls": [
        17,
        14
      ],
      "yellowCards": [
        0,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        391,
        482
      ],
      "passAccuracy": [
        87,
        85
      ],
      "goalkeeperSaves": [
        0,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841264",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "12/10",
    "dateIso": "2026-10-12",
    "time": "Encerrado",
    "stadium": "Couto Pereira, Curitiba",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "coritiba",
      "name": "Coritiba",
      "shortName": "CFC",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3456.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "botafogo",
      "name": "Botafogo",
      "shortName": "BOT",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6086.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401841264-0",
        "minute": 22,
        "type": "goal",
        "team": "home",
        "player": "Fernando Marçal",
        "detail": "Own Goal"
      },
      {
        "id": "ev-401841264-1",
        "minute": 34,
        "type": "goal",
        "team": "away",
        "player": "Danilo Santos",
        "detail": "Goal"
      },
      {
        "id": "ev-401841264-2",
        "minute": 45,
        "type": "yellow_card",
        "team": "away",
        "player": "Allan",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841264-3",
        "minute": 45,
        "type": "yellow_card",
        "team": "home",
        "player": "Fabricio Bustos",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841264-4",
        "minute": 45,
        "type": "yellow_card",
        "team": "home",
        "player": "Sebastián Gómez",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841264-5",
        "minute": 52,
        "type": "yellow_card",
        "team": "home",
        "player": "Thiago Santos",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841264-6",
        "minute": 66,
        "type": "yellow_card",
        "team": "away",
        "player": "Fernando Marçal",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841264-7",
        "minute": 66,
        "type": "yellow_card",
        "team": "home",
        "player": "Tiago",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841264-8",
        "minute": 88,
        "type": "yellow_card",
        "team": "home",
        "player": "Rodrigo",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        55,
        45
      ],
      "shotsTotal": [
        9,
        12
      ],
      "shotsOnTarget": [
        4,
        5
      ],
      "xG": [
        1.1,
        1
      ],
      "corners": [
        3,
        2
      ],
      "fouls": [
        12,
        18
      ],
      "yellowCards": [
        2,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        576,
        475
      ],
      "passAccuracy": [
        82,
        86
      ],
      "goalkeeperSaves": [
        3,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841265",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "12/10",
    "dateIso": "2026-10-12",
    "time": "Encerrado",
    "stadium": "Arena Condá, Chapecó",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "chapecoense",
      "name": "Chapecoense",
      "shortName": "CHA",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9318.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "athletico_paranaense",
      "name": "Athletico-PR",
      "shortName": "CAP",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 4,
    "events": [
      {
        "id": "ev-401841265-0",
        "minute": 6,
        "type": "goal",
        "team": "away",
        "player": "Leozinho",
        "detail": "Goal"
      },
      {
        "id": "ev-401841265-1",
        "minute": 29,
        "type": "goal",
        "team": "away",
        "player": "Luiz Gustavo",
        "detail": "Goal"
      },
      {
        "id": "ev-401841265-2",
        "minute": 31,
        "type": "goal",
        "team": "away",
        "player": "Kevin Viveros",
        "detail": "Goal"
      },
      {
        "id": "ev-401841265-3",
        "minute": 40,
        "type": "yellow_card",
        "team": "home",
        "player": "Marcinho",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841265-4",
        "minute": 45,
        "type": "yellow_card",
        "team": "home",
        "player": "João Paulo",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841265-5",
        "minute": 70,
        "type": "yellow_card",
        "team": "away",
        "player": "Gilberto",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841265-6",
        "minute": 72,
        "type": "goal",
        "team": "home",
        "player": "Maurício Garcez",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401841265-7",
        "minute": 78,
        "type": "goal",
        "team": "away",
        "player": "Kevin Viveros",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        15,
        12
      ],
      "shotsOnTarget": [
        6,
        5
      ],
      "xG": [
        1.1,
        3.4
      ],
      "corners": [
        6,
        5
      ],
      "fouls": [
        11,
        15
      ],
      "yellowCards": [
        3,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        4
      ],
      "passesTotal": [
        383,
        391
      ],
      "passAccuracy": [
        87,
        83
      ],
      "goalkeeperSaves": [
        4,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841260",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Estádio Municipal Cicero de Souza Marques, Bragança Paulista",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "red_bull_bragantino",
      "name": "Red Bull Bragantino",
      "shortName": "BRA",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6079.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "cruzeiro",
      "name": "Cruzeiro",
      "shortName": "CRU",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2022.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 4,
    "awayScore": 2,
    "events": [
      {
        "id": "ev-401841260-0",
        "minute": 10,
        "type": "yellow_card",
        "team": "home",
        "player": "Guzmán Rodríguez",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841260-1",
        "minute": 13,
        "type": "goal",
        "team": "home",
        "player": "Lucas Barbosa",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401841260-2",
        "minute": 18,
        "type": "yellow_card",
        "team": "away",
        "player": "William",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841260-3",
        "minute": 20,
        "type": "goal",
        "team": "home",
        "player": "Kaio Jorge",
        "detail": "Own Goal"
      },
      {
        "id": "ev-401841260-4",
        "minute": 28,
        "type": "yellow_card",
        "team": "home",
        "player": "Ryan Augusto",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841260-5",
        "minute": 30,
        "type": "goal",
        "team": "home",
        "player": "Ramires",
        "detail": "Goal"
      },
      {
        "id": "ev-401841260-6",
        "minute": 43,
        "type": "goal",
        "team": "away",
        "player": "Zé Lucas",
        "detail": "Goal"
      },
      {
        "id": "ev-401841260-7",
        "minute": 77,
        "type": "yellow_card",
        "team": "away",
        "player": "Felipe Morais",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401841260-8",
        "minute": 89,
        "type": "goal",
        "team": "away",
        "player": "Matheus Henrique",
        "detail": "Goal"
      },
      {
        "id": "ev-401841260-9",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "José Herrera",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        46,
        54
      ],
      "shotsTotal": [
        17,
        14
      ],
      "shotsOnTarget": [
        7,
        6
      ],
      "xG": [
        3.5,
        1.8
      ],
      "corners": [
        7,
        5
      ],
      "fouls": [
        15,
        16
      ],
      "yellowCards": [
        2,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        4,
        2
      ],
      "passesTotal": [
        391,
        478
      ],
      "passAccuracy": [
        88,
        80
      ],
      "goalkeeperSaves": [
        2,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841275",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "16/10",
    "dateIso": "2026-10-16",
    "time": "23:00",
    "stadium": "Estadio Municipal José Maria de Campos Maia, Mirassol",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "mirassol",
      "name": "Mirassol",
      "shortName": "MIR",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9169.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "internacional",
      "name": "Internacional",
      "shortName": "INT",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1936.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        11,
        8
      ],
      "shotsOnTarget": [
        4,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        2
      ],
      "fouls": [
        8,
        16
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        529,
        473
      ],
      "passAccuracy": [
        88,
        82
      ],
      "goalkeeperSaves": [
        0,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841268",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "21:00",
    "stadium": "Joao Havelange Stadium, Rio de Janeiro",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "botafogo",
      "name": "Botafogo",
      "shortName": "BOT",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6086.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "chapecoense",
      "name": "Chapecoense",
      "shortName": "CHA",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9318.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        9,
        9
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        3
      ],
      "fouls": [
        10,
        14
      ],
      "yellowCards": [
        2,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        398,
        513
      ],
      "passAccuracy": [
        83,
        83
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841270",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "21:30",
    "stadium": "Arena MRV, Belo Horizonte",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "atl_tico_mg",
      "name": "Atlético-MG",
      "shortName": "CAM",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/7632.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "coritiba",
      "name": "Coritiba",
      "shortName": "CFC",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3456.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        9,
        9
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        6
      ],
      "fouls": [
        14,
        14
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        484,
        486
      ],
      "passAccuracy": [
        87,
        87
      ],
      "goalkeeperSaves": [
        0,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841271",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "22:30",
    "stadium": "Arena da Baixada, Curitiba",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "athletico_paranaense",
      "name": "Athletico-PR",
      "shortName": "CAP",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "palmeiras",
      "name": "Palmeiras",
      "shortName": "PAL",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        58,
        42
      ],
      "shotsTotal": [
        14,
        6
      ],
      "shotsOnTarget": [
        6,
        2
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        3,
        6
      ],
      "fouls": [
        10,
        9
      ],
      "yellowCards": [
        3,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        541,
        379
      ],
      "passAccuracy": [
        82,
        85
      ],
      "goalkeeperSaves": [
        0,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841273",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "00:00",
    "stadium": "Estádio Cícero Pompeu de Toledo, Sao Paulo",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "s_o_paulo",
      "name": "São Paulo",
      "shortName": "SAO",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2026.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "vasco_da_gama",
      "name": "Vasco da Gama",
      "shortName": "VAS",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3454.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        45,
        55
      ],
      "shotsTotal": [
        15,
        11
      ],
      "shotsOnTarget": [
        6,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        3,
        3
      ],
      "fouls": [
        8,
        10
      ],
      "yellowCards": [
        0,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        482,
        465
      ],
      "passAccuracy": [
        80,
        85
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841277",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "19:00",
    "stadium": "Estadio do Maracana, Rio de Janeiro",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "fluminense",
      "name": "Fluminense",
      "shortName": "FLU",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "santos",
      "name": "Santos",
      "shortName": "SAN",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2674.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        56,
        44
      ],
      "shotsTotal": [
        11,
        6
      ],
      "shotsOnTarget": [
        4,
        2
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        2
      ],
      "fouls": [
        12,
        17
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        577,
        473
      ],
      "passAccuracy": [
        89,
        80
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841276",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "19:00",
    "stadium": "Arena do Grêmio, Porto Alegre",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "gr_mio",
      "name": "Grêmio",
      "shortName": "GRE",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6273.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "cruzeiro",
      "name": "Cruzeiro",
      "shortName": "CRU",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2022.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        56,
        44
      ],
      "shotsTotal": [
        16,
        12
      ],
      "shotsOnTarget": [
        7,
        5
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        8,
        6
      ],
      "fouls": [
        11,
        17
      ],
      "yellowCards": [
        0,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        382,
        479
      ],
      "passAccuracy": [
        80,
        78
      ],
      "goalkeeperSaves": [
        1,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841269",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "21:30",
    "stadium": "Arena Fonte Nova, Salvador",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "bahia",
      "name": "Bahia",
      "shortName": "BAH",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9967.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "flamengo",
      "name": "Flamengo",
      "shortName": "FLA",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        59,
        41
      ],
      "shotsTotal": [
        11,
        13
      ],
      "shotsOnTarget": [
        4,
        5
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        3
      ],
      "fouls": [
        8,
        10
      ],
      "yellowCards": [
        0,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        480,
        346
      ],
      "passAccuracy": [
        82,
        84
      ],
      "goalkeeperSaves": [
        0,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401841274",
    "league": "Brasileirão Betano Série A",
    "leagueIcon": "🇧🇷",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "22:30",
    "stadium": "Mangueirão, Belém",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "remo",
      "name": "Remo",
      "shortName": "REMO",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/4936.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "red_bull_bragantino",
      "name": "Red Bull Bragantino",
      "shortName": "BRA",
      "badgeEmoji": "🇧🇷",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6079.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        59,
        41
      ],
      "shotsTotal": [
        8,
        9
      ],
      "shotsOnTarget": [
        3,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        5
      ],
      "fouls": [
        15,
        9
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        521,
        436
      ],
      "passAccuracy": [
        84,
        82
      ],
      "goalkeeperSaves": [
        4,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915418",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Stade Bollaert-Delelis, Lens",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "lens",
      "name": "Lens",
      "shortName": "RCL",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/175.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "sporting_cp",
      "name": "Sporting CP",
      "shortName": "SCP",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2250.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 2,
    "events": [
      {
        "id": "ev-401915418-0",
        "minute": 22,
        "type": "goal",
        "team": "away",
        "player": "Luis Suárez",
        "detail": "Goal"
      },
      {
        "id": "ev-401915418-1",
        "minute": 71,
        "type": "yellow_card",
        "team": "home",
        "player": "Michaël Cuisance",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915418-2",
        "minute": 74,
        "type": "goal",
        "team": "away",
        "player": "Issa Doumbia",
        "detail": "Goal"
      },
      {
        "id": "ev-401915418-3",
        "minute": 81,
        "type": "yellow_card",
        "team": "home",
        "player": "Florian Thauvin",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        56,
        44
      ],
      "shotsTotal": [
        9,
        7
      ],
      "shotsOnTarget": [
        4,
        3
      ],
      "xG": [
        0.3,
        1.8
      ],
      "corners": [
        3,
        2
      ],
      "fouls": [
        16,
        16
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        2
      ],
      "passesTotal": [
        506,
        487
      ],
      "passAccuracy": [
        80,
        85
      ],
      "goalkeeperSaves": [
        3,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915436",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Baku Olympic Stadium, Baku",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "sabah_fk",
      "name": "Sabah FK",
      "shortName": "SAB",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/21922.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "slavia_prague",
      "name": "Slavia Prague",
      "shortName": "SLP",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/494.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 2,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401915436-0",
        "minute": 14,
        "type": "yellow_card",
        "team": "home",
        "player": "Veljko Simic",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915436-1",
        "minute": 49,
        "type": "goal",
        "team": "home",
        "player": "Kaheem Parris",
        "detail": "Goal"
      },
      {
        "id": "ev-401915436-2",
        "minute": 66,
        "type": "yellow_card",
        "team": "home",
        "player": "Steve Solvet",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915436-3",
        "minute": 67,
        "type": "yellow_card",
        "team": "away",
        "player": "Emmanuel Dennis Ayaosi",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915436-4",
        "minute": 74,
        "type": "yellow_card",
        "team": "home",
        "player": "Akim Zedadka",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915436-5",
        "minute": 77,
        "type": "yellow_card",
        "team": "away",
        "player": "Oskar Kubiak",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915436-6",
        "minute": 88,
        "type": "goal",
        "team": "home",
        "player": "Joy-Lance Mickels",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        51,
        49
      ],
      "shotsTotal": [
        9,
        13
      ],
      "shotsOnTarget": [
        4,
        5
      ],
      "xG": [
        1.9,
        0.2
      ],
      "corners": [
        8,
        6
      ],
      "fouls": [
        9,
        11
      ],
      "yellowCards": [
        3,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        499,
        486
      ],
      "passAccuracy": [
        85,
        79
      ],
      "goalkeeperSaves": [
        0,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915417",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Emirates Stadium, London",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "arsenal",
      "name": "Arsenal",
      "shortName": "ARS",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "lille",
      "name": "Lille",
      "shortName": "LILL",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/166.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401915417-0",
        "minute": 29,
        "type": "yellow_card",
        "team": "home",
        "player": "Mikel Merino",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915417-1",
        "minute": 64,
        "type": "goal",
        "team": "home",
        "player": "Jurriën Timber",
        "detail": "Goal"
      },
      {
        "id": "ev-401915417-2",
        "minute": 67,
        "type": "goal",
        "team": "home",
        "player": "Eberechi Eze",
        "detail": "Goal"
      },
      {
        "id": "ev-401915417-3",
        "minute": 71,
        "type": "goal",
        "team": "home",
        "player": "Bukayo Saka",
        "detail": "Goal"
      },
      {
        "id": "ev-401915417-4",
        "minute": 81,
        "type": "yellow_card",
        "team": "away",
        "player": "Maxima Goffi",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915417-5",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Kai Havertz",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        53,
        47
      ],
      "shotsTotal": [
        11,
        14
      ],
      "shotsOnTarget": [
        4,
        6
      ],
      "xG": [
        2.7,
        0.2
      ],
      "corners": [
        4,
        2
      ],
      "fouls": [
        9,
        12
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        3,
        1
      ],
      "passesTotal": [
        418,
        485
      ],
      "passAccuracy": [
        84,
        82
      ],
      "goalkeeperSaves": [
        0,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915412",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Riyadh Air Metropolitano, Madrid",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "atl_tico_madrid",
      "name": "Atlético Madrid",
      "shortName": "ATM",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "manchester_united",
      "name": "Manchester United",
      "shortName": "MAN",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 2,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401915412-0",
        "minute": 1,
        "type": "goal",
        "team": "home",
        "player": "Pablo Barrios",
        "detail": "Goal"
      },
      {
        "id": "ev-401915412-1",
        "minute": 37,
        "type": "yellow_card",
        "team": "home",
        "player": "Atlético Madrid",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915412-2",
        "minute": 52,
        "type": "yellow_card",
        "team": "away",
        "player": "Marcus Rashford",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915412-3",
        "minute": 74,
        "type": "red_card",
        "team": "away",
        "player": "Leny Yoro",
        "detail": "Red Card"
      },
      {
        "id": "ev-401915412-4",
        "minute": 79,
        "type": "goal",
        "team": "home",
        "player": "Ademola Lookman",
        "detail": "Goal"
      },
      {
        "id": "ev-401915412-5",
        "minute": 88,
        "type": "yellow_card",
        "team": "home",
        "player": "Robin Le Normand",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        11,
        14
      ],
      "shotsOnTarget": [
        4,
        6
      ],
      "xG": [
        1.9,
        0.2
      ],
      "corners": [
        3,
        2
      ],
      "fouls": [
        9,
        13
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        399,
        392
      ],
      "passAccuracy": [
        82,
        81
      ],
      "goalkeeperSaves": [
        1,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915435",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "RAMS Park, Istanbul",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "galatasaray",
      "name": "Galatasaray",
      "shortName": "GAL",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/432.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "barcelona",
      "name": "Barcelona",
      "shortName": "BAR",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 4,
    "events": [
      {
        "id": "ev-401915435-0",
        "minute": 28,
        "type": "goal",
        "team": "home",
        "player": "Alexey Batrakov",
        "detail": "Goal"
      },
      {
        "id": "ev-401915435-1",
        "minute": 43,
        "type": "goal",
        "team": "away",
        "player": "João Cancelo",
        "detail": "Goal"
      },
      {
        "id": "ev-401915435-2",
        "minute": 50,
        "type": "goal",
        "team": "away",
        "player": "Fermín López",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401915435-3",
        "minute": 53,
        "type": "goal",
        "team": "away",
        "player": "Anthony Gordon",
        "detail": "Goal"
      },
      {
        "id": "ev-401915435-4",
        "minute": 64,
        "type": "yellow_card",
        "team": "home",
        "player": "Rafael Leão",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915435-5",
        "minute": 65,
        "type": "goal",
        "team": "away",
        "player": "Karim Adeyemi",
        "detail": "Goal"
      },
      {
        "id": "ev-401915435-6",
        "minute": 86,
        "type": "yellow_card",
        "team": "home",
        "player": "Roland Sallai",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        46,
        54
      ],
      "shotsTotal": [
        11,
        12
      ],
      "shotsOnTarget": [
        4,
        5
      ],
      "xG": [
        1.1,
        3.4
      ],
      "corners": [
        5,
        6
      ],
      "fouls": [
        11,
        10
      ],
      "yellowCards": [
        0,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        0
      ],
      "bigChances": [
        2,
        4
      ],
      "passesTotal": [
        407,
        449
      ],
      "passAccuracy": [
        82,
        82
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915413",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "San Siro, Milano",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "internazionale",
      "name": "Internazionale",
      "shortName": "INT",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "club_brugge",
      "name": "Club Brugge",
      "shortName": "BRU",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/570.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 4,
    "events": [
      {
        "id": "ev-401915413-0",
        "minute": 27,
        "type": "yellow_card",
        "team": "away",
        "player": "Jorne Spileers",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915413-1",
        "minute": 29,
        "type": "yellow_card",
        "team": "home",
        "player": "Hakan Çalhanoglu",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915413-2",
        "minute": 30,
        "type": "goal",
        "team": "away",
        "player": "Nicolo Tresoldi",
        "detail": "Penalty - Scored"
      },
      {
        "id": "ev-401915413-3",
        "minute": 39,
        "type": "yellow_card",
        "team": "home",
        "player": "Manuel Akanji",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915413-4",
        "minute": 44,
        "type": "goal",
        "team": "home",
        "player": "Lautaro Martínez",
        "detail": "Goal"
      },
      {
        "id": "ev-401915413-5",
        "minute": 63,
        "type": "goal",
        "team": "away",
        "player": "Nicolo Tresoldi",
        "detail": "Goal"
      },
      {
        "id": "ev-401915413-6",
        "minute": 70,
        "type": "yellow_card",
        "team": "away",
        "player": "Jan Virgili",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915413-7",
        "minute": 72,
        "type": "yellow_card",
        "team": "away",
        "player": "Lee Han-Beom",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915413-8",
        "minute": 74,
        "type": "goal",
        "team": "away",
        "player": "Nicolo Tresoldi",
        "detail": "Goal"
      },
      {
        "id": "ev-401915413-9",
        "minute": 81,
        "type": "goal",
        "team": "home",
        "player": "Lautaro Martínez",
        "detail": "Goal"
      },
      {
        "id": "ev-401915413-10",
        "minute": 81,
        "type": "yellow_card",
        "team": "away",
        "player": "Club Brugge",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915413-11",
        "minute": 87,
        "type": "goal",
        "team": "away",
        "player": "Romeo Vermant",
        "detail": "Goal"
      },
      {
        "id": "ev-401915413-12",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "Ange-Yoan Bonny",
        "detail": "Goal"
      },
      {
        "id": "ev-401915413-13",
        "minute": 90,
        "type": "yellow_card",
        "team": "away",
        "player": "Felix Lemarechal",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        57,
        43
      ],
      "shotsTotal": [
        16,
        12
      ],
      "shotsOnTarget": [
        7,
        5
      ],
      "xG": [
        2.7,
        3.4
      ],
      "corners": [
        6,
        3
      ],
      "fouls": [
        16,
        13
      ],
      "yellowCards": [
        0,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        0
      ],
      "bigChances": [
        3,
        4
      ],
      "passesTotal": [
        479,
        390
      ],
      "passAccuracy": [
        81,
        81
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915434",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Red Bull Arena, Leipzig",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "rb_leipzig",
      "name": "RB Leipzig",
      "shortName": "RBL",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/11420.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "psv_eindhoven",
      "name": "PSV Eindhoven",
      "shortName": "PSV",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/148.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 1,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401915434-0",
        "minute": 43,
        "type": "yellow_card",
        "team": "away",
        "player": "Sergiño Dest",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915434-1",
        "minute": 75,
        "type": "goal",
        "team": "home",
        "player": "Brajan Gruda",
        "detail": "Goal"
      },
      {
        "id": "ev-401915434-2",
        "minute": 81,
        "type": "yellow_card",
        "team": "home",
        "player": "Antonio Nusa",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915434-3",
        "minute": 85,
        "type": "yellow_card",
        "team": "away",
        "player": "Armando Obispo",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        55,
        45
      ],
      "shotsTotal": [
        16,
        6
      ],
      "shotsOnTarget": [
        7,
        2
      ],
      "xG": [
        1.1,
        0.2
      ],
      "corners": [
        3,
        4
      ],
      "fouls": [
        17,
        15
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        527,
        362
      ],
      "passAccuracy": [
        86,
        80
      ],
      "goalkeeperSaves": [
        0,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915411",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Viking Stadion, Stavanger",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "viking_fk",
      "name": "Viking FK",
      "shortName": "VIK",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/510.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "bayern_munich",
      "name": "Bayern Munich",
      "shortName": "MUN",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 3,
    "events": [
      {
        "id": "ev-401915411-0",
        "minute": 2,
        "type": "goal",
        "team": "home",
        "player": "Gianni Stensness",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401915411-1",
        "minute": 38,
        "type": "goal",
        "team": "home",
        "player": "Peter Christiansen",
        "detail": "Goal"
      },
      {
        "id": "ev-401915411-2",
        "minute": 52,
        "type": "yellow_card",
        "team": "away",
        "player": "Konrad Laimer",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915411-3",
        "minute": 53,
        "type": "yellow_card",
        "team": "home",
        "player": "Kristoffer Haugen",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915411-4",
        "minute": 54,
        "type": "goal",
        "team": "away",
        "player": "Harry Kane",
        "detail": "Penalty - Scored"
      },
      {
        "id": "ev-401915411-5",
        "minute": 60,
        "type": "goal",
        "team": "away",
        "player": "Harry Kane",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401915411-6",
        "minute": 67,
        "type": "yellow_card",
        "team": "home",
        "player": "Jesper Daland",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915411-7",
        "minute": 68,
        "type": "yellow_card",
        "team": "away",
        "player": "Ismael Saibari",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915411-8",
        "minute": 71,
        "type": "goal",
        "team": "away",
        "player": "Luis Díaz",
        "detail": "Goal"
      },
      {
        "id": "ev-401915411-9",
        "minute": 73,
        "type": "yellow_card",
        "team": "away",
        "player": "Michael Olise",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915411-10",
        "minute": 73,
        "type": "red_card",
        "team": "away",
        "player": "Michael Olise",
        "detail": "Red Card"
      },
      {
        "id": "ev-401915411-11",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "Herman Haugen",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        59,
        41
      ],
      "shotsTotal": [
        11,
        14
      ],
      "shotsOnTarget": [
        4,
        6
      ],
      "xG": [
        2.7,
        2.6
      ],
      "corners": [
        7,
        2
      ],
      "fouls": [
        11,
        12
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        3,
        3
      ],
      "passesTotal": [
        549,
        516
      ],
      "passAccuracy": [
        80,
        80
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915410",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "Ontem",
    "dateIso": "2026-10-13",
    "time": "Encerrado",
    "stadium": "Estadio de la Cerámica, Villarreal",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "villarreal",
      "name": "Villarreal",
      "shortName": "VIL",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "napoli",
      "name": "Napoli",
      "shortName": "NAP",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/114.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401915410-0",
        "minute": 8,
        "type": "goal",
        "team": "away",
        "player": "Amir Rrahmani",
        "detail": "Goal"
      },
      {
        "id": "ev-401915410-1",
        "minute": 23,
        "type": "goal",
        "team": "home",
        "player": "Georges Mikautadze",
        "detail": "Goal"
      },
      {
        "id": "ev-401915410-2",
        "minute": 26,
        "type": "goal",
        "team": "home",
        "player": "Santiago Mouriño",
        "detail": "Goal"
      },
      {
        "id": "ev-401915410-3",
        "minute": 33,
        "type": "yellow_card",
        "team": "home",
        "player": "Georges Mikautadze",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915410-4",
        "minute": 55,
        "type": "yellow_card",
        "team": "away",
        "player": "Giovane",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915410-5",
        "minute": 62,
        "type": "yellow_card",
        "team": "away",
        "player": "Kevin De Bruyne",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915410-6",
        "minute": 67,
        "type": "yellow_card",
        "team": "home",
        "player": "Nathan Saliba",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915410-7",
        "minute": 85,
        "type": "yellow_card",
        "team": "away",
        "player": "Giovanni Di Lorenzo",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401915410-8",
        "minute": 86,
        "type": "goal",
        "team": "home",
        "player": "Tani Oluwaseyi",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        9,
        10
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        2.7,
        1
      ],
      "corners": [
        7,
        5
      ],
      "fouls": [
        14,
        14
      ],
      "yellowCards": [
        0,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        3,
        1
      ],
      "passesTotal": [
        557,
        473
      ],
      "passAccuracy": [
        82,
        86
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915416",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "16:45",
    "stadium": "De Kuip, Rotterdam",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "feyenoord_rotterdam",
      "name": "Feyenoord Rotterdam",
      "shortName": "FEY",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/142.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "como",
      "name": "Como",
      "shortName": "COMO",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2572.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        47,
        53
      ],
      "shotsTotal": [
        10,
        10
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        5
      ],
      "fouls": [
        15,
        17
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        527,
        427
      ],
      "passAccuracy": [
        89,
        81
      ],
      "goalkeeperSaves": [
        4,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915415",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "16:45",
    "stadium": "Raiffeisen Arena (Linz), Linz",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "lask_linz",
      "name": "LASK Linz",
      "shortName": "LAS",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/4411.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "liverpool",
      "name": "Liverpool",
      "shortName": "LIV",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        51,
        49
      ],
      "shotsTotal": [
        8,
        8
      ],
      "shotsOnTarget": [
        3,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        4
      ],
      "fouls": [
        15,
        9
      ],
      "yellowCards": [
        2,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        453,
        503
      ],
      "passAccuracy": [
        87,
        78
      ],
      "goalkeeperSaves": [
        0,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915414",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Olimpico, Roma",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "as_roma",
      "name": "AS Roma",
      "shortName": "ROMA",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "real_madrid",
      "name": "Real Madrid",
      "shortName": "RMA",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        15,
        9
      ],
      "shotsOnTarget": [
        6,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        6
      ],
      "fouls": [
        17,
        16
      ],
      "yellowCards": [
        2,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        448,
        431
      ],
      "passAccuracy": [
        81,
        79
      ],
      "goalkeeperSaves": [
        0,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915409",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Villa Park, Birmingham",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "aston_villa",
      "name": "Aston Villa",
      "shortName": "AVL",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "fenerbahce",
      "name": "Fenerbahce",
      "shortName": "FEN",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/436.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        45,
        55
      ],
      "shotsTotal": [
        12,
        13
      ],
      "shotsOnTarget": [
        5,
        5
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        7,
        4
      ],
      "fouls": [
        15,
        13
      ],
      "yellowCards": [
        1,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        536,
        493
      ],
      "passAccuracy": [
        83,
        82
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915393",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Aspmyra Stadion, Bodø/Glimt",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "bodo_glimt",
      "name": "Bodo/Glimt",
      "shortName": "BODO",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2980.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "borussia_dortmund",
      "name": "Borussia Dortmund",
      "shortName": "DOR",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        16,
        8
      ],
      "shotsOnTarget": [
        7,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        3
      ],
      "fouls": [
        8,
        18
      ],
      "yellowCards": [
        3,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        576,
        496
      ],
      "passAccuracy": [
        81,
        82
      ],
      "goalkeeperSaves": [
        0,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915407",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Etihad Stadium, Manchester",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "manchester_city",
      "name": "Manchester City",
      "shortName": "MNC",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "paris_saint_germain",
      "name": "Paris Saint-Germain",
      "shortName": "PSG",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        12,
        9
      ],
      "shotsOnTarget": [
        5,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        2
      ],
      "fouls": [
        10,
        12
      ],
      "yellowCards": [
        2,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        568,
        476
      ],
      "passAccuracy": [
        82,
        78
      ],
      "goalkeeperSaves": [
        1,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915408",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Estadio La Cartuja, Sevilla",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "real_betis",
      "name": "Real Betis",
      "shortName": "BET",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "fc_porto",
      "name": "FC Porto",
      "shortName": "FCP",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/437.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        47,
        53
      ],
      "shotsTotal": [
        13,
        9
      ],
      "shotsOnTarget": [
        5,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        2
      ],
      "fouls": [
        8,
        11
      ],
      "yellowCards": [
        3,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        542,
        478
      ],
      "passAccuracy": [
        89,
        85
      ],
      "goalkeeperSaves": [
        2,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915406",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Stamford Bridge, London",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "shakhtar_donetsk",
      "name": "Shakhtar Donetsk",
      "shortName": "SHK",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/493.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "aek_athens",
      "name": "AEK Athens",
      "shortName": "AEK",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/887.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        57,
        43
      ],
      "shotsTotal": [
        15,
        6
      ],
      "shotsOnTarget": [
        6,
        2
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        8,
        4
      ],
      "fouls": [
        14,
        17
      ],
      "yellowCards": [
        3,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        514,
        480
      ],
      "passAccuracy": [
        84,
        82
      ],
      "goalkeeperSaves": [
        4,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401915405",
    "league": "UEFA Champions League",
    "leagueIcon": "🇪🇺",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Hoje",
    "dateIso": "2026-10-14",
    "time": "19:00",
    "stadium": "Národny Futbalovy Stadión, Bratislava",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "slovan_bratislava",
      "name": "Slovan Bratislava",
      "shortName": "SLB",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/521.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "vfb_stuttgart",
      "name": "VfB Stuttgart",
      "shortName": "VFB",
      "badgeEmoji": "🇪🇺",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/134.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        13,
        14
      ],
      "shotsOnTarget": [
        5,
        6
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        4
      ],
      "fouls": [
        13,
        18
      ],
      "yellowCards": [
        1,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        571,
        380
      ],
      "passAccuracy": [
        80,
        81
      ],
      "goalkeeperSaves": [
        2,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879266",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Selhurst Park, London",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "crystal_palace",
      "name": "Crystal Palace",
      "shortName": "CRY",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/384.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "nottingham_forest",
      "name": "Nottingham Forest",
      "shortName": "NFO",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/393.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401879266-0",
        "minute": 3,
        "type": "goal",
        "team": "away",
        "player": "Dan Ndoye",
        "detail": "Goal"
      },
      {
        "id": "ev-401879266-1",
        "minute": 16,
        "type": "yellow_card",
        "team": "home",
        "player": "Jefferson Lerma",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879266-2",
        "minute": 41,
        "type": "goal",
        "team": "home",
        "player": "Daichi Kamada",
        "detail": "Goal"
      },
      {
        "id": "ev-401879266-3",
        "minute": 45,
        "type": "goal",
        "team": "home",
        "player": "Jefferson Lerma",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401879266-4",
        "minute": 59,
        "type": "goal",
        "team": "home",
        "player": "Yéremy Pino",
        "detail": "Goal"
      },
      {
        "id": "ev-401879266-5",
        "minute": 60,
        "type": "yellow_card",
        "team": "home",
        "player": "Yéremy Pino",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879266-6",
        "minute": 73,
        "type": "yellow_card",
        "team": "away",
        "player": "Ola Aina",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879266-7",
        "minute": 90,
        "type": "yellow_card",
        "team": "away",
        "player": "Murillo",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        13,
        14
      ],
      "shotsOnTarget": [
        5,
        6
      ],
      "xG": [
        2.7,
        1
      ],
      "corners": [
        5,
        6
      ],
      "fouls": [
        10,
        12
      ],
      "yellowCards": [
        0,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        3,
        1
      ],
      "passesTotal": [
        495,
        397
      ],
      "passAccuracy": [
        82,
        79
      ],
      "goalkeeperSaves": [
        1,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401878774",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "The MKM Stadium, Hull",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "hull_city",
      "name": "Hull City",
      "shortName": "HUL",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/306.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "everton",
      "name": "Everton",
      "shortName": "EVE",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/368.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 2,
    "awayScore": 2,
    "events": [
      {
        "id": "ev-401878774-0",
        "minute": 13,
        "type": "yellow_card",
        "team": "home",
        "player": "Matt Crooks",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401878774-1",
        "minute": 21,
        "type": "yellow_card",
        "team": "home",
        "player": "Oliver McBurnie",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401878774-2",
        "minute": 48,
        "type": "goal",
        "team": "home",
        "player": "Joe Gelhardt",
        "detail": "Goal"
      },
      {
        "id": "ev-401878774-3",
        "minute": 55,
        "type": "goal",
        "team": "away",
        "player": "Kiernan Dewsbury-Hall",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401878774-4",
        "minute": 68,
        "type": "goal",
        "team": "away",
        "player": "Thierno Barry",
        "detail": "Goal"
      },
      {
        "id": "ev-401878774-5",
        "minute": 74,
        "type": "goal",
        "team": "home",
        "player": "Mohamed Belloumi",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        47,
        53
      ],
      "shotsTotal": [
        12,
        14
      ],
      "shotsOnTarget": [
        5,
        6
      ],
      "xG": [
        1.9,
        1.8
      ],
      "corners": [
        5,
        6
      ],
      "fouls": [
        16,
        17
      ],
      "yellowCards": [
        1,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        0
      ],
      "bigChances": [
        2,
        2
      ],
      "passesTotal": [
        473,
        396
      ],
      "passAccuracy": [
        88,
        85
      ],
      "goalkeeperSaves": [
        2,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879264",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Anfield, Liverpool",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "liverpool",
      "name": "Liverpool",
      "shortName": "LIV",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "manchester_city",
      "name": "Manchester City",
      "shortName": "MNC",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 3,
    "events": [
      {
        "id": "ev-401879264-0",
        "minute": 8,
        "type": "yellow_card",
        "team": "home",
        "player": "Ronald Araújo",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879264-1",
        "minute": 47,
        "type": "yellow_card",
        "team": "home",
        "player": "Ryan Gravenberch",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879264-2",
        "minute": 58,
        "type": "yellow_card",
        "team": "away",
        "player": "Nico O'Reilly",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879264-3",
        "minute": 62,
        "type": "red_card",
        "team": "home",
        "player": "Ryan Gravenberch",
        "detail": "Red Card"
      },
      {
        "id": "ev-401879264-4",
        "minute": 65,
        "type": "goal",
        "team": "away",
        "player": "Erling Haaland",
        "detail": "Goal"
      },
      {
        "id": "ev-401879264-5",
        "minute": 68,
        "type": "goal",
        "team": "away",
        "player": "Jérémy Doku",
        "detail": "Goal"
      },
      {
        "id": "ev-401879264-6",
        "minute": 78,
        "type": "goal",
        "team": "away",
        "player": "Rayan Cherki",
        "detail": "Goal"
      },
      {
        "id": "ev-401879264-7",
        "minute": 86,
        "type": "yellow_card",
        "team": "away",
        "player": "Ayyoub Bouaddi",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879264-8",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Virgil van Dijk",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        8,
        11
      ],
      "shotsOnTarget": [
        3,
        4
      ],
      "xG": [
        0.3,
        2.6
      ],
      "corners": [
        7,
        5
      ],
      "fouls": [
        14,
        15
      ],
      "yellowCards": [
        3,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        2,
        3
      ],
      "passesTotal": [
        449,
        490
      ],
      "passAccuracy": [
        84,
        85
      ],
      "goalkeeperSaves": [
        3,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879267",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "12/10",
    "dateIso": "2026-10-12",
    "time": "Encerrado",
    "stadium": "Coventry Building Society Arena, Coventry",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "coventry_city",
      "name": "Coventry City",
      "shortName": "COV",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/388.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "newcastle_united",
      "name": "Newcastle United",
      "shortName": "NEW",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 4,
    "awayScore": 1,
    "events": [
      {
        "id": "ev-401879267-0",
        "minute": 6,
        "type": "goal",
        "team": "home",
        "player": "Jack Rudoni",
        "detail": "Penalty - Scored"
      },
      {
        "id": "ev-401879267-1",
        "minute": 48,
        "type": "goal",
        "team": "home",
        "player": "Sidiki Cherif",
        "detail": "Goal"
      },
      {
        "id": "ev-401879267-2",
        "minute": 66,
        "type": "yellow_card",
        "team": "home",
        "player": "Milan van Ewijk",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879267-3",
        "minute": 70,
        "type": "goal",
        "team": "away",
        "player": "Sven Botman",
        "detail": "Goal"
      },
      {
        "id": "ev-401879267-4",
        "minute": 81,
        "type": "goal",
        "team": "home",
        "player": "Ellis Simms",
        "detail": "Goal"
      },
      {
        "id": "ev-401879267-5",
        "minute": 81,
        "type": "yellow_card",
        "team": "away",
        "player": "Joelinton",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401879267-6",
        "minute": 86,
        "type": "goal",
        "team": "home",
        "player": "Stephen Mfuni",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        59,
        41
      ],
      "shotsTotal": [
        12,
        8
      ],
      "shotsOnTarget": [
        5,
        3
      ],
      "xG": [
        3.5,
        1
      ],
      "corners": [
        5,
        3
      ],
      "fouls": [
        9,
        11
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        4,
        1
      ],
      "passesTotal": [
        402,
        388
      ],
      "passAccuracy": [
        86,
        81
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401878771",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "11:30",
    "stadium": "Hill Dickinson Stadium, Liverpool",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "everton",
      "name": "Everton",
      "shortName": "EVE",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/368.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "chelsea",
      "name": "Chelsea",
      "shortName": "CHE",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        55,
        45
      ],
      "shotsTotal": [
        15,
        7
      ],
      "shotsOnTarget": [
        6,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        8,
        3
      ],
      "fouls": [
        15,
        15
      ],
      "yellowCards": [
        1,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        538,
        466
      ],
      "passAccuracy": [
        81,
        86
      ],
      "goalkeeperSaves": [
        2,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879262",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "14:00",
    "stadium": "Gtech Community Stadium, Brentford",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "brentford",
      "name": "Brentford",
      "shortName": "BRE",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/337.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "liverpool",
      "name": "Liverpool",
      "shortName": "LIV",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        14,
        7
      ],
      "shotsOnTarget": [
        6,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        5
      ],
      "fouls": [
        14,
        18
      ],
      "yellowCards": [
        3,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        472,
        425
      ],
      "passAccuracy": [
        82,
        87
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401878770",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "14:00",
    "stadium": "Craven Cottage, London",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "fulham",
      "name": "Fulham",
      "shortName": "FUL",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/370.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "hull_city",
      "name": "Hull City",
      "shortName": "HUL",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/306.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        8,
        10
      ],
      "shotsOnTarget": [
        3,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        2
      ],
      "fouls": [
        9,
        16
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        539,
        475
      ],
      "passAccuracy": [
        82,
        80
      ],
      "goalkeeperSaves": [
        3,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879259",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "14:00",
    "stadium": "Etihad Stadium, Manchester",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "manchester_city",
      "name": "Manchester City",
      "shortName": "MNC",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "ipswich_town",
      "name": "Ipswich Town",
      "shortName": "IPS",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/373.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        50,
        50
      ],
      "shotsTotal": [
        17,
        8
      ],
      "shotsOnTarget": [
        7,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        6
      ],
      "fouls": [
        16,
        13
      ],
      "yellowCards": [
        3,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        502,
        427
      ],
      "passAccuracy": [
        82,
        83
      ],
      "goalkeeperSaves": [
        1,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879258",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "16:30",
    "stadium": "St. James' Park, Newcastle-upon-Tyne",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "newcastle_united",
      "name": "Newcastle United",
      "shortName": "NEW",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "aston_villa",
      "name": "Aston Villa",
      "shortName": "AVL",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        52,
        48
      ],
      "shotsTotal": [
        15,
        7
      ],
      "shotsOnTarget": [
        6,
        3
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        4
      ],
      "fouls": [
        8,
        12
      ],
      "yellowCards": [
        1,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        448,
        418
      ],
      "passAccuracy": [
        83,
        78
      ],
      "goalkeeperSaves": [
        1,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879263",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "13:00",
    "stadium": "Vitality Stadium, Bournemouth",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "afc_bournemouth",
      "name": "AFC Bournemouth",
      "shortName": "BOU",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/349.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "sunderland",
      "name": "Sunderland",
      "shortName": "SUN",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/366.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        9,
        10
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        3
      ],
      "fouls": [
        16,
        9
      ],
      "yellowCards": [
        2,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        544,
        507
      ],
      "passAccuracy": [
        84,
        87
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879261",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "13:00",
    "stadium": "American Express Stadium, Falmer",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "brighton___hove_albion",
      "name": "Brighton & Hove Albion",
      "shortName": "BHA",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/331.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "crystal_palace",
      "name": "Crystal Palace",
      "shortName": "CRY",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/384.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        59,
        41
      ],
      "shotsTotal": [
        11,
        14
      ],
      "shotsOnTarget": [
        4,
        6
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        4
      ],
      "fouls": [
        13,
        9
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        540,
        499
      ],
      "passAccuracy": [
        87,
        85
      ],
      "goalkeeperSaves": [
        4,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401879260",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "13:00",
    "stadium": "Elland Road, Leeds",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "leeds_united",
      "name": "Leeds United",
      "shortName": "LEE",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/357.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "manchester_united",
      "name": "Manchester United",
      "shortName": "MAN",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        55,
        45
      ],
      "shotsTotal": [
        9,
        9
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        4
      ],
      "fouls": [
        8,
        18
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        504,
        417
      ],
      "passAccuracy": [
        86,
        84
      ],
      "goalkeeperSaves": [
        1,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401878769",
    "league": "Premier League",
    "leagueIcon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "15:30",
    "stadium": "The City Ground, Nottingham",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "nottingham_forest",
      "name": "Nottingham Forest",
      "shortName": "NFO",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/393.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "arsenal",
      "name": "Arsenal",
      "shortName": "ARS",
      "badgeEmoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        53,
        47
      ],
      "shotsTotal": [
        12,
        12
      ],
      "shotsOnTarget": [
        5,
        5
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        6
      ],
      "fouls": [
        9,
        17
      ],
      "yellowCards": [
        2,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        540,
        433
      ],
      "passAccuracy": [
        87,
        86
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882854",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Estadio Martínez Valero, Elche",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "elche",
      "name": "Elche",
      "shortName": "ELC",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3751.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "celta_vigo",
      "name": "Celta Vigo",
      "shortName": "CEL",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/85.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [
      {
        "id": "ev-401882854-0",
        "minute": 37,
        "type": "yellow_card",
        "team": "away",
        "player": "Yoel Lago",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882854-1",
        "minute": 59,
        "type": "yellow_card",
        "team": "away",
        "player": "Javi Rueda",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882854-2",
        "minute": 81,
        "type": "yellow_card",
        "team": "away",
        "player": "Aleix Febas",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882854-3",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Marc Aguado",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        45,
        55
      ],
      "shotsTotal": [
        10,
        6
      ],
      "shotsOnTarget": [
        4,
        2
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        5
      ],
      "fouls": [
        14,
        15
      ],
      "yellowCards": [
        3,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        431,
        459
      ],
      "passAccuracy": [
        82,
        86
      ],
      "goalkeeperSaves": [
        2,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882847",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Reale Arena, San Sebastian",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "real_sociedad",
      "name": "Real Sociedad",
      "shortName": "RSO",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "deportivo",
      "name": "Deportivo",
      "shortName": "DEP",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/90.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 2,
    "events": [
      {
        "id": "ev-401882847-0",
        "minute": 29,
        "type": "goal",
        "team": "home",
        "player": "Jon Martín",
        "detail": "Goal - Header"
      },
      {
        "id": "ev-401882847-1",
        "minute": 34,
        "type": "goal",
        "team": "home",
        "player": "Arsen Zakharyan",
        "detail": "Goal"
      },
      {
        "id": "ev-401882847-2",
        "minute": 40,
        "type": "yellow_card",
        "team": "away",
        "player": "David Mella",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882847-3",
        "minute": 54,
        "type": "goal",
        "team": "home",
        "player": "Gonçalo Guedes",
        "detail": "Goal"
      },
      {
        "id": "ev-401882847-4",
        "minute": 61,
        "type": "goal",
        "team": "away",
        "player": "Mario Soriano Carreno",
        "detail": "Goal"
      },
      {
        "id": "ev-401882847-5",
        "minute": 66,
        "type": "red_card",
        "team": "home",
        "player": "Pablo Marín",
        "detail": "Red Card"
      },
      {
        "id": "ev-401882847-6",
        "minute": 69,
        "type": "goal",
        "team": "away",
        "player": "Yeremay Hernández",
        "detail": "Penalty - Scored"
      },
      {
        "id": "ev-401882847-7",
        "minute": 71,
        "type": "yellow_card",
        "team": "away",
        "player": "José María Giménez",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882847-8",
        "minute": 90,
        "type": "red_card",
        "team": "away",
        "player": "Lorenzo Amatucci",
        "detail": "Red Card"
      },
      {
        "id": "ev-401882847-9",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Yangel Herrera",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        58,
        42
      ],
      "shotsTotal": [
        14,
        6
      ],
      "shotsOnTarget": [
        6,
        2
      ],
      "xG": [
        2.7,
        1.8
      ],
      "corners": [
        6,
        4
      ],
      "fouls": [
        8,
        12
      ],
      "yellowCards": [
        1,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        3,
        2
      ],
      "passesTotal": [
        492,
        373
      ],
      "passAccuracy": [
        80,
        87
      ],
      "goalkeeperSaves": [
        2,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882855",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "Estadio La Cartuja, Sevilla",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "real_betis",
      "name": "Real Betis",
      "shortName": "BET",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "osasuna",
      "name": "Osasuna",
      "shortName": "OSA",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/97.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 5,
    "awayScore": 2,
    "events": [
      {
        "id": "ev-401882855-0",
        "minute": 10,
        "type": "goal",
        "team": "home",
        "player": "Isco",
        "detail": "Penalty - Scored"
      },
      {
        "id": "ev-401882855-1",
        "minute": 31,
        "type": "goal",
        "team": "home",
        "player": "Abde Ezzalzouli",
        "detail": "Goal"
      },
      {
        "id": "ev-401882855-2",
        "minute": 41,
        "type": "yellow_card",
        "team": "away",
        "player": "Jon Moncayola",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882855-3",
        "minute": 45,
        "type": "yellow_card",
        "team": "away",
        "player": "Unai Santos",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882855-4",
        "minute": 45,
        "type": "yellow_card",
        "team": "home",
        "player": "Cucho Hernández",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882855-5",
        "minute": 48,
        "type": "goal",
        "team": "home",
        "player": "Ante Budimir",
        "detail": "Own Goal"
      },
      {
        "id": "ev-401882855-6",
        "minute": 51,
        "type": "goal",
        "team": "away",
        "player": "Ante Budimir",
        "detail": "Goal"
      },
      {
        "id": "ev-401882855-7",
        "minute": 56,
        "type": "goal",
        "team": "away",
        "player": "Raúl García",
        "detail": "Goal - Volley"
      },
      {
        "id": "ev-401882855-8",
        "minute": 64,
        "type": "yellow_card",
        "team": "away",
        "player": "Lucas Torró",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882855-9",
        "minute": 67,
        "type": "goal",
        "team": "home",
        "player": "Isco",
        "detail": "Goal"
      },
      {
        "id": "ev-401882855-10",
        "minute": 81,
        "type": "yellow_card",
        "team": "home",
        "player": "Marc Roca",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882855-11",
        "minute": 88,
        "type": "yellow_card",
        "team": "away",
        "player": "Valentin Rosier",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882855-12",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "José Morante",
        "detail": "Goal"
      },
      {
        "id": "ev-401882855-13",
        "minute": 90,
        "type": "yellow_card",
        "team": "away",
        "player": "Alejandro Catena",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        48,
        52
      ],
      "shotsTotal": [
        15,
        8
      ],
      "shotsOnTarget": [
        6,
        3
      ],
      "xG": [
        4.3,
        1.8
      ],
      "corners": [
        4,
        4
      ],
      "fouls": [
        12,
        9
      ],
      "yellowCards": [
        3,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        2
      ],
      "bigChances": [
        5,
        2
      ],
      "passesTotal": [
        495,
        508
      ],
      "passAccuracy": [
        89,
        80
      ],
      "goalkeeperSaves": [
        2,
        5
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882850",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "11/10",
    "dateIso": "2026-10-11",
    "time": "Encerrado",
    "stadium": "El Sardineros, Santander",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "racing_santander",
      "name": "Racing Santander",
      "shortName": "RAC",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/87.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "valencia",
      "name": "Valencia",
      "shortName": "VAL",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/94.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 2,
    "awayScore": 2,
    "events": [
      {
        "id": "ev-401882850-0",
        "minute": 2,
        "type": "goal",
        "team": "away",
        "player": "Dani Raba",
        "detail": "Goal"
      },
      {
        "id": "ev-401882850-1",
        "minute": 22,
        "type": "yellow_card",
        "team": "home",
        "player": "Pablo Ramon",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882850-2",
        "minute": 32,
        "type": "goal",
        "team": "home",
        "player": "Yassir Zabiri",
        "detail": "Goal"
      },
      {
        "id": "ev-401882850-3",
        "minute": 45,
        "type": "yellow_card",
        "team": "away",
        "player": "Guido Rodríguez",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882850-4",
        "minute": 45,
        "type": "yellow_card",
        "team": "home",
        "player": "Jorge Salinas",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882850-5",
        "minute": 45,
        "type": "yellow_card",
        "team": "away",
        "player": "Dani Raba",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882850-6",
        "minute": 47,
        "type": "goal",
        "team": "home",
        "player": "Iván Martín",
        "detail": "Goal - Volley"
      },
      {
        "id": "ev-401882850-7",
        "minute": 65,
        "type": "goal",
        "team": "away",
        "player": "David Otorbi",
        "detail": "Goal"
      },
      {
        "id": "ev-401882850-8",
        "minute": 72,
        "type": "yellow_card",
        "team": "away",
        "player": "Pablo Maffeo",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882850-9",
        "minute": 90,
        "type": "yellow_card",
        "team": "home",
        "player": "Iván Martín",
        "detail": "Yellow Card"
      }
    ],
    "stats": {
      "possession": [
        49,
        51
      ],
      "shotsTotal": [
        16,
        9
      ],
      "shotsOnTarget": [
        7,
        4
      ],
      "xG": [
        1.9,
        1.8
      ],
      "corners": [
        3,
        3
      ],
      "fouls": [
        15,
        17
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        2
      ],
      "passesTotal": [
        432,
        516
      ],
      "passAccuracy": [
        88,
        83
      ],
      "goalkeeperSaves": [
        2,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882852",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Full Time",
    "status": "FINISHED",
    "minute": 90,
    "date": "12/10",
    "dateIso": "2026-10-12",
    "time": "Encerrado",
    "stadium": "Estadi Ciutat de València, Manises",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "levante",
      "name": "Levante",
      "shortName": "LEV",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1538.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "sevilla",
      "name": "Sevilla",
      "shortName": "SEV",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/243.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 3,
    "awayScore": 3,
    "events": [
      {
        "id": "ev-401882852-0",
        "minute": 13,
        "type": "goal",
        "team": "away",
        "player": "Robbie Ure",
        "detail": "Goal"
      },
      {
        "id": "ev-401882852-1",
        "minute": 39,
        "type": "yellow_card",
        "team": "home",
        "player": "Adrián de la Fuente",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-2",
        "minute": 48,
        "type": "yellow_card",
        "team": "away",
        "player": "Felix Correia",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-3",
        "minute": 54,
        "type": "goal",
        "team": "away",
        "player": "Felix Correia",
        "detail": "Goal"
      },
      {
        "id": "ev-401882852-4",
        "minute": 57,
        "type": "goal",
        "team": "home",
        "player": "Iván Romero",
        "detail": "Goal"
      },
      {
        "id": "ev-401882852-5",
        "minute": 63,
        "type": "yellow_card",
        "team": "away",
        "player": "Andrés Castrín",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-6",
        "minute": 66,
        "type": "yellow_card",
        "team": "away",
        "player": "Sevilla",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-7",
        "minute": 76,
        "type": "yellow_card",
        "team": "home",
        "player": "Dani Requena",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-8",
        "minute": 84,
        "type": "yellow_card",
        "team": "away",
        "player": "Alfonso González",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-9",
        "minute": 90,
        "type": "yellow_card",
        "team": "away",
        "player": "Isaac Romero",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-10",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "Adrián de la Fuente",
        "detail": "Goal"
      },
      {
        "id": "ev-401882852-11",
        "minute": 90,
        "type": "goal",
        "team": "away",
        "player": "Isaac Romero",
        "detail": "Goal"
      },
      {
        "id": "ev-401882852-12",
        "minute": 90,
        "type": "yellow_card",
        "team": "away",
        "player": "Juan Iglesias",
        "detail": "Yellow Card"
      },
      {
        "id": "ev-401882852-13",
        "minute": 90,
        "type": "red_card",
        "team": "away",
        "player": "Isaac Romero",
        "detail": "Red Card"
      },
      {
        "id": "ev-401882852-14",
        "minute": 90,
        "type": "goal",
        "team": "home",
        "player": "Ifeanyi Ndukwe",
        "detail": "Goal"
      }
    ],
    "stats": {
      "possession": [
        59,
        41
      ],
      "shotsTotal": [
        9,
        9
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        2.7,
        2.6
      ],
      "corners": [
        3,
        6
      ],
      "fouls": [
        16,
        17
      ],
      "yellowCards": [
        3,
        1
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        3,
        3
      ],
      "passesTotal": [
        500,
        472
      ],
      "passAccuracy": [
        81,
        87
      ],
      "goalkeeperSaves": [
        3,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882844",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "16/10",
    "dateIso": "2026-10-16",
    "time": "19:00",
    "stadium": "Riazor, La Coruña",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "deportivo",
      "name": "Deportivo",
      "shortName": "DEP",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/90.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "levante",
      "name": "Levante",
      "shortName": "LEV",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1538.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        47,
        53
      ],
      "shotsTotal": [
        14,
        9
      ],
      "shotsOnTarget": [
        6,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        5,
        4
      ],
      "fouls": [
        12,
        17
      ],
      "yellowCards": [
        2,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        0
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        491,
        386
      ],
      "passAccuracy": [
        81,
        82
      ],
      "goalkeeperSaves": [
        4,
        0
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882843",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "12:00",
    "stadium": "RCDE Stadium, Barcelona",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "espanyol",
      "name": "Espanyol",
      "shortName": "ESP",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/88.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "atl_tico_madrid",
      "name": "Atlético Madrid",
      "shortName": "ATM",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        48,
        52
      ],
      "shotsTotal": [
        8,
        12
      ],
      "shotsOnTarget": [
        3,
        5
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        4,
        4
      ],
      "fouls": [
        17,
        9
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        577,
        455
      ],
      "passAccuracy": [
        83,
        85
      ],
      "goalkeeperSaves": [
        1,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882837",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "14:15",
    "stadium": "Estadio de la Cerámica, Villarreal",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "villarreal",
      "name": "Villarreal",
      "shortName": "VIL",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "elche",
      "name": "Elche",
      "shortName": "ELC",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3751.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        49,
        51
      ],
      "shotsTotal": [
        11,
        6
      ],
      "shotsOnTarget": [
        4,
        2
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        7,
        2
      ],
      "fouls": [
        15,
        10
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        490,
        464
      ],
      "passAccuracy": [
        82,
        81
      ],
      "goalkeeperSaves": [
        3,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882846",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "16:30",
    "stadium": "Estadio La Cartuja, Sevilla",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "real_betis",
      "name": "Real Betis",
      "shortName": "BET",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "barcelona",
      "name": "Barcelona",
      "shortName": "BAR",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        56,
        44
      ],
      "shotsTotal": [
        13,
        14
      ],
      "shotsOnTarget": [
        5,
        6
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        8,
        6
      ],
      "fouls": [
        12,
        16
      ],
      "yellowCards": [
        1,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        501,
        373
      ],
      "passAccuracy": [
        82,
        79
      ],
      "goalkeeperSaves": [
        0,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882838",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "17/10",
    "dateIso": "2026-10-17",
    "time": "19:00",
    "stadium": "Mestalla Stadium, Manises",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "valencia",
      "name": "Valencia",
      "shortName": "VAL",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/94.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "athletic_club",
      "name": "Athletic Club",
      "shortName": "ATH",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        56,
        44
      ],
      "shotsTotal": [
        11,
        9
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        3
      ],
      "fouls": [
        17,
        17
      ],
      "yellowCards": [
        1,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        388,
        438
      ],
      "passAccuracy": [
        84,
        85
      ],
      "goalkeeperSaves": [
        4,
        3
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882840",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "12:00",
    "stadium": "El Sadar, Pamplona",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "osasuna",
      "name": "Osasuna",
      "shortName": "OSA",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/97.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "racing_santander",
      "name": "Racing Santander",
      "shortName": "RAC",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/87.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        57,
        43
      ],
      "shotsTotal": [
        14,
        13
      ],
      "shotsOnTarget": [
        6,
        5
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        6,
        6
      ],
      "fouls": [
        13,
        10
      ],
      "yellowCards": [
        2,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        0,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        518,
        464
      ],
      "passAccuracy": [
        83,
        84
      ],
      "goalkeeperSaves": [
        2,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882845",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "14:15",
    "stadium": "Balaidos, Vigo",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "celta_vigo",
      "name": "Celta Vigo",
      "shortName": "CEL",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/85.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "alav_s",
      "name": "Alavés",
      "shortName": "ALA",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/96.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        46,
        54
      ],
      "shotsTotal": [
        14,
        14
      ],
      "shotsOnTarget": [
        6,
        6
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        3,
        2
      ],
      "fouls": [
        11,
        16
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        519,
        359
      ],
      "passAccuracy": [
        81,
        85
      ],
      "goalkeeperSaves": [
        4,
        4
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882841",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "16:30",
    "stadium": "La Rosaleda, Malaga",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "m_laga",
      "name": "Málaga",
      "shortName": "MCF",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/99.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "real_sociedad",
      "name": "Real Sociedad",
      "shortName": "RSO",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        11,
        9
      ],
      "shotsOnTarget": [
        4,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        8,
        3
      ],
      "fouls": [
        15,
        13
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        527,
        419
      ],
      "passAccuracy": [
        87,
        85
      ],
      "goalkeeperSaves": [
        4,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401882839",
    "league": "La Liga",
    "leagueIcon": "🇪🇸",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "18/10",
    "dateIso": "2026-10-18",
    "time": "19:00",
    "stadium": "Santiago Bernabéu, Madrid",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "real_madrid",
      "name": "Real Madrid",
      "shortName": "RMA",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "sevilla",
      "name": "Sevilla",
      "shortName": "SEV",
      "badgeEmoji": "🇪🇸",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/243.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        49,
        51
      ],
      "shotsTotal": [
        15,
        14
      ],
      "shotsOnTarget": [
        6,
        6
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        8,
        6
      ],
      "fouls": [
        10,
        12
      ],
      "yellowCards": [
        1,
        0
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        1
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        543,
        477
      ],
      "passAccuracy": [
        87,
        79
      ],
      "goalkeeperSaves": [
        4,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401912522",
    "league": "Copa Libertadores",
    "leagueIcon": "🏆",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "Amanhã",
    "dateIso": "2026-10-15",
    "time": "00:30",
    "stadium": "Estadio do Maracana, Rio de Janeiro",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "fluminense",
      "name": "Fluminense",
      "shortName": "FLU",
      "badgeEmoji": "🏆",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "palmeiras",
      "name": "Palmeiras",
      "shortName": "PAL",
      "badgeEmoji": "🏆",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        45,
        55
      ],
      "shotsTotal": [
        17,
        14
      ],
      "shotsOnTarget": [
        7,
        6
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        7,
        3
      ],
      "fouls": [
        8,
        12
      ],
      "yellowCards": [
        0,
        3
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        2,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        467,
        509
      ],
      "passAccuracy": [
        82,
        87
      ],
      "goalkeeperSaves": [
        0,
        1
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  },
  {
    "id": "espn-401912523",
    "league": "Copa Libertadores",
    "leagueIcon": "🏆",
    "round": "Scheduled",
    "status": "SCHEDULED",
    "date": "16/10",
    "dateIso": "2026-10-16",
    "time": "00:30",
    "stadium": "Estadio Jorge Luis Hirschi, La Plata",
    "referee": "Arbitragem Oficial FIFA/CBF",
    "homeTeam": {
      "id": "estudiantes_de_la_plata",
      "name": "Estudiantes de La Plata",
      "shortName": "EST",
      "badgeEmoji": "🏆",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/8.png",
      "primaryColor": "#00ff88",
      "secondaryColor": "#141618"
    },
    "awayTeam": {
      "id": "flamengo",
      "name": "Flamengo",
      "shortName": "FLA",
      "badgeEmoji": "🏆",
      "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
      "primaryColor": "#ececed",
      "secondaryColor": "#0b0c0d"
    },
    "homeScore": 0,
    "awayScore": 0,
    "events": [],
    "stats": {
      "possession": [
        54,
        46
      ],
      "shotsTotal": [
        12,
        11
      ],
      "shotsOnTarget": [
        5,
        4
      ],
      "xG": [
        0.3,
        0.2
      ],
      "corners": [
        3,
        3
      ],
      "fouls": [
        14,
        11
      ],
      "yellowCards": [
        1,
        2
      ],
      "redCards": [
        0,
        0
      ],
      "offsides": [
        1,
        2
      ],
      "bigChances": [
        2,
        1
      ],
      "passesTotal": [
        525,
        518
      ],
      "passAccuracy": [
        83,
        86
      ],
      "goalkeeperSaves": [
        3,
        2
      ]
    },
    "lineupHome": {
      "formation": "4-3-3",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    },
    "lineupAway": {
      "formation": "4-2-3-1",
      "coach": "Técnico Oficial",
      "starters": [],
      "substitutes": []
    }
  }
];

export const REAL_STANDINGS_SNAPSHOT: LeagueTable[] = [
  {
    "id": "bra.1",
    "name": "Brasileirão Betano Série A",
    "icon": "🇧🇷",
    "season": "2026",
    "entries": [
      {
        "rank": 1,
        "teamId": "flamengo",
        "teamName": "Flamengo",
        "shortName": "FLA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
        "points": 64,
        "played": 30,
        "wins": 19,
        "draws": 7,
        "losses": 4,
        "goalsFor": 58,
        "goalsAgainst": 25,
        "goalDiff": 33
      },
      {
        "rank": 2,
        "teamId": "palmeiras",
        "teamName": "Palmeiras",
        "shortName": "PAL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
        "points": 63,
        "played": 30,
        "wins": 18,
        "draws": 9,
        "losses": 3,
        "goalsFor": 52,
        "goalsAgainst": 22,
        "goalDiff": 30
      },
      {
        "rank": 3,
        "teamId": "athletico_paranaense",
        "teamName": "Athletico Paranaense",
        "shortName": "CAP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
        "points": 53,
        "played": 30,
        "wins": 15,
        "draws": 8,
        "losses": 7,
        "goalsFor": 49,
        "goalsAgainst": 35,
        "goalDiff": 14
      },
      {
        "rank": 4,
        "teamId": "fluminense",
        "teamName": "Fluminense",
        "shortName": "FLU",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
        "points": 51,
        "played": 30,
        "wins": 14,
        "draws": 9,
        "losses": 7,
        "goalsFor": 48,
        "goalsAgainst": 37,
        "goalDiff": 11
      },
      {
        "rank": 5,
        "teamId": "bahia",
        "teamName": "Bahia",
        "shortName": "BAH",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9967.png",
        "points": 49,
        "played": 30,
        "wins": 13,
        "draws": 10,
        "losses": 7,
        "goalsFor": 44,
        "goalsAgainst": 36,
        "goalDiff": 8
      },
      {
        "rank": 6,
        "teamId": "cruzeiro",
        "teamName": "Cruzeiro",
        "shortName": "CRU",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2022.png",
        "points": 48,
        "played": 30,
        "wins": 14,
        "draws": 6,
        "losses": 10,
        "goalsFor": 46,
        "goalsAgainst": 44,
        "goalDiff": 2
      },
      {
        "rank": 7,
        "teamId": "atl_tico_mg",
        "teamName": "Atlético-MG",
        "shortName": "CAM",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/7632.png",
        "points": 47,
        "played": 30,
        "wins": 13,
        "draws": 8,
        "losses": 9,
        "goalsFor": 41,
        "goalsAgainst": 35,
        "goalDiff": 6
      },
      {
        "rank": 8,
        "teamId": "santos",
        "teamName": "Santos",
        "shortName": "SAN",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2674.png",
        "points": 42,
        "played": 30,
        "wins": 11,
        "draws": 9,
        "losses": 10,
        "goalsFor": 46,
        "goalsAgainst": 45,
        "goalDiff": 1
      },
      {
        "rank": 9,
        "teamId": "red_bull_bragantino",
        "teamName": "Red Bull Bragantino",
        "shortName": "BRA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6079.png",
        "points": 40,
        "played": 30,
        "wins": 11,
        "draws": 7,
        "losses": 12,
        "goalsFor": 38,
        "goalsAgainst": 35,
        "goalDiff": 3
      },
      {
        "rank": 10,
        "teamId": "s_o_paulo",
        "teamName": "São Paulo",
        "shortName": "SAO",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2026.png",
        "points": 39,
        "played": 30,
        "wins": 11,
        "draws": 6,
        "losses": 13,
        "goalsFor": 35,
        "goalsAgainst": 35,
        "goalDiff": 0
      },
      {
        "rank": 11,
        "teamId": "coritiba",
        "teamName": "Coritiba",
        "shortName": "CFC",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3456.png",
        "points": 39,
        "played": 30,
        "wins": 10,
        "draws": 9,
        "losses": 11,
        "goalsFor": 38,
        "goalsAgainst": 48,
        "goalDiff": -10
      },
      {
        "rank": 12,
        "teamId": "vit_ria",
        "teamName": "Vitória",
        "shortName": "VIT",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3457.png",
        "points": 36,
        "played": 30,
        "wins": 10,
        "draws": 6,
        "losses": 14,
        "goalsFor": 33,
        "goalsAgainst": 44,
        "goalDiff": -11
      },
      {
        "rank": 13,
        "teamId": "botafogo",
        "teamName": "Botafogo",
        "shortName": "BOT",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6086.png",
        "points": 36,
        "played": 30,
        "wins": 9,
        "draws": 9,
        "losses": 12,
        "goalsFor": 43,
        "goalsAgainst": 48,
        "goalDiff": -5
      },
      {
        "rank": 14,
        "teamId": "vasco_da_gama",
        "teamName": "Vasco da Gama",
        "shortName": "VAS",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3454.png",
        "points": 35,
        "played": 29,
        "wins": 9,
        "draws": 8,
        "losses": 12,
        "goalsFor": 36,
        "goalsAgainst": 42,
        "goalDiff": -6
      },
      {
        "rank": 15,
        "teamId": "mirassol",
        "teamName": "Mirassol",
        "shortName": "MIR",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9169.png",
        "points": 33,
        "played": 30,
        "wins": 8,
        "draws": 9,
        "losses": 13,
        "goalsFor": 34,
        "goalsAgainst": 44,
        "goalDiff": -10
      },
      {
        "rank": 16,
        "teamId": "corinthians",
        "teamName": "Corinthians",
        "shortName": "COR",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/874.png",
        "points": 32,
        "played": 30,
        "wins": 8,
        "draws": 8,
        "losses": 14,
        "goalsFor": 31,
        "goalsAgainst": 38,
        "goalDiff": -7
      },
      {
        "rank": 17,
        "teamId": "internacional",
        "teamName": "Internacional",
        "shortName": "INT",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1936.png",
        "points": 32,
        "played": 30,
        "wins": 7,
        "draws": 11,
        "losses": 12,
        "goalsFor": 33,
        "goalsAgainst": 38,
        "goalDiff": -5
      },
      {
        "rank": 18,
        "teamId": "gr_mio",
        "teamName": "Grêmio",
        "shortName": "GRE",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/6273.png",
        "points": 31,
        "played": 30,
        "wins": 7,
        "draws": 10,
        "losses": 13,
        "goalsFor": 32,
        "goalsAgainst": 40,
        "goalDiff": -8
      },
      {
        "rank": 19,
        "teamId": "remo",
        "teamName": "Remo",
        "shortName": "REMO",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/4936.png",
        "points": 25,
        "played": 30,
        "wins": 5,
        "draws": 10,
        "losses": 15,
        "goalsFor": 33,
        "goalsAgainst": 48,
        "goalDiff": -15
      },
      {
        "rank": 20,
        "teamId": "chapecoense",
        "teamName": "Chapecoense",
        "shortName": "CHA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/9318.png",
        "points": 18,
        "played": 29,
        "wins": 3,
        "draws": 9,
        "losses": 17,
        "goalsFor": 30,
        "goalsAgainst": 61,
        "goalDiff": -31
      }
    ]
  },
  {
    "id": "eng.1",
    "name": "Premier League",
    "icon": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "season": "2026",
    "entries": [
      {
        "rank": 1,
        "teamId": "manchester_city",
        "teamName": "Manchester City",
        "shortName": "MNC",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
        "points": 18,
        "played": 6,
        "wins": 6,
        "draws": 0,
        "losses": 0,
        "goalsFor": 16,
        "goalsAgainst": 5,
        "goalDiff": 11
      },
      {
        "rank": 2,
        "teamId": "arsenal",
        "teamName": "Arsenal",
        "shortName": "ARS",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
        "points": 15,
        "played": 6,
        "wins": 5,
        "draws": 0,
        "losses": 1,
        "goalsFor": 10,
        "goalsAgainst": 5,
        "goalDiff": 5
      },
      {
        "rank": 3,
        "teamId": "brighton___hove_albion",
        "teamName": "Brighton & Hove Albion",
        "shortName": "BHA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/331.png",
        "points": 13,
        "played": 6,
        "wins": 4,
        "draws": 1,
        "losses": 1,
        "goalsFor": 18,
        "goalsAgainst": 5,
        "goalDiff": 13
      },
      {
        "rank": 4,
        "teamId": "brentford",
        "teamName": "Brentford",
        "shortName": "BRE",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/337.png",
        "points": 10,
        "played": 6,
        "wins": 2,
        "draws": 4,
        "losses": 0,
        "goalsFor": 12,
        "goalsAgainst": 6,
        "goalDiff": 6
      },
      {
        "rank": 5,
        "teamId": "everton",
        "teamName": "Everton",
        "shortName": "EVE",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/368.png",
        "points": 10,
        "played": 6,
        "wins": 2,
        "draws": 4,
        "losses": 0,
        "goalsFor": 8,
        "goalsAgainst": 5,
        "goalDiff": 3
      },
      {
        "rank": 6,
        "teamId": "chelsea",
        "teamName": "Chelsea",
        "shortName": "CHE",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
        "points": 10,
        "played": 6,
        "wins": 3,
        "draws": 1,
        "losses": 2,
        "goalsFor": 15,
        "goalsAgainst": 13,
        "goalDiff": 2
      },
      {
        "rank": 7,
        "teamId": "leeds_united",
        "teamName": "Leeds United",
        "shortName": "LEE",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/357.png",
        "points": 9,
        "played": 6,
        "wins": 2,
        "draws": 3,
        "losses": 1,
        "goalsFor": 8,
        "goalsAgainst": 5,
        "goalDiff": 3
      },
      {
        "rank": 8,
        "teamId": "hull_city",
        "teamName": "Hull City",
        "shortName": "HUL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/306.png",
        "points": 9,
        "played": 6,
        "wins": 2,
        "draws": 3,
        "losses": 1,
        "goalsFor": 8,
        "goalsAgainst": 6,
        "goalDiff": 2
      },
      {
        "rank": 9,
        "teamId": "liverpool",
        "teamName": "Liverpool",
        "shortName": "LIV",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
        "points": 9,
        "played": 6,
        "wins": 2,
        "draws": 3,
        "losses": 1,
        "goalsFor": 7,
        "goalsAgainst": 7,
        "goalDiff": 0
      },
      {
        "rank": 10,
        "teamId": "ipswich_town",
        "teamName": "Ipswich Town",
        "shortName": "IPS",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/373.png",
        "points": 9,
        "played": 6,
        "wins": 3,
        "draws": 0,
        "losses": 3,
        "goalsFor": 9,
        "goalsAgainst": 12,
        "goalDiff": -3
      },
      {
        "rank": 11,
        "teamId": "newcastle_united",
        "teamName": "Newcastle United",
        "shortName": "NEW",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
        "points": 8,
        "played": 6,
        "wins": 2,
        "draws": 2,
        "losses": 2,
        "goalsFor": 10,
        "goalsAgainst": 13,
        "goalDiff": -3
      },
      {
        "rank": 12,
        "teamId": "crystal_palace",
        "teamName": "Crystal Palace",
        "shortName": "CRY",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/384.png",
        "points": 7,
        "played": 6,
        "wins": 2,
        "draws": 1,
        "losses": 3,
        "goalsFor": 9,
        "goalsAgainst": 12,
        "goalDiff": -3
      },
      {
        "rank": 13,
        "teamId": "manchester_united",
        "teamName": "Manchester United",
        "shortName": "MAN",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
        "points": 6,
        "played": 6,
        "wins": 1,
        "draws": 3,
        "losses": 2,
        "goalsFor": 9,
        "goalsAgainst": 9,
        "goalDiff": 0
      },
      {
        "rank": 14,
        "teamId": "coventry_city",
        "teamName": "Coventry City",
        "shortName": "COV",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/388.png",
        "points": 6,
        "played": 6,
        "wins": 2,
        "draws": 0,
        "losses": 4,
        "goalsFor": 5,
        "goalsAgainst": 11,
        "goalDiff": -6
      },
      {
        "rank": 15,
        "teamId": "nottingham_forest",
        "teamName": "Nottingham Forest",
        "shortName": "NFO",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/393.png",
        "points": 5,
        "played": 6,
        "wins": 1,
        "draws": 2,
        "losses": 3,
        "goalsFor": 5,
        "goalsAgainst": 8,
        "goalDiff": -3
      },
      {
        "rank": 16,
        "teamId": "aston_villa",
        "teamName": "Aston Villa",
        "shortName": "AVL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
        "points": 5,
        "played": 6,
        "wins": 1,
        "draws": 2,
        "losses": 3,
        "goalsFor": 6,
        "goalsAgainst": 11,
        "goalDiff": -5
      },
      {
        "rank": 17,
        "teamId": "sunderland",
        "teamName": "Sunderland",
        "shortName": "SUN",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/366.png",
        "points": 4,
        "played": 6,
        "wins": 1,
        "draws": 1,
        "losses": 4,
        "goalsFor": 6,
        "goalsAgainst": 12,
        "goalDiff": -6
      },
      {
        "rank": 18,
        "teamId": "afc_bournemouth",
        "teamName": "AFC Bournemouth",
        "shortName": "BOU",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/349.png",
        "points": 3,
        "played": 6,
        "wins": 0,
        "draws": 3,
        "losses": 3,
        "goalsFor": 7,
        "goalsAgainst": 13,
        "goalDiff": -6
      },
      {
        "rank": 19,
        "teamId": "tottenham_hotspur",
        "teamName": "Tottenham Hotspur",
        "shortName": "TOT",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
        "points": 3,
        "played": 6,
        "wins": 0,
        "draws": 3,
        "losses": 3,
        "goalsFor": 3,
        "goalsAgainst": 9,
        "goalDiff": -6
      },
      {
        "rank": 20,
        "teamId": "fulham",
        "teamName": "Fulham",
        "shortName": "FUL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/370.png",
        "points": 2,
        "played": 6,
        "wins": 0,
        "draws": 2,
        "losses": 4,
        "goalsFor": 6,
        "goalsAgainst": 10,
        "goalDiff": -4
      }
    ]
  },
  {
    "id": "esp.1",
    "name": "La Liga",
    "icon": "🇪🇸",
    "season": "2026",
    "entries": [
      {
        "rank": 1,
        "teamId": "barcelona",
        "teamName": "Barcelona",
        "shortName": "BAR",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
        "points": 24,
        "played": 8,
        "wins": 8,
        "draws": 0,
        "losses": 0,
        "goalsFor": 34,
        "goalsAgainst": 7,
        "goalDiff": 27
      },
      {
        "rank": 2,
        "teamId": "atl_tico_madrid",
        "teamName": "Atlético Madrid",
        "shortName": "ATM",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
        "points": 19,
        "played": 8,
        "wins": 6,
        "draws": 1,
        "losses": 1,
        "goalsFor": 18,
        "goalsAgainst": 8,
        "goalDiff": 10
      },
      {
        "rank": 3,
        "teamId": "real_betis",
        "teamName": "Real Betis",
        "shortName": "BET",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
        "points": 19,
        "played": 8,
        "wins": 6,
        "draws": 1,
        "losses": 1,
        "goalsFor": 14,
        "goalsAgainst": 9,
        "goalDiff": 5
      },
      {
        "rank": 4,
        "teamId": "real_madrid",
        "teamName": "Real Madrid",
        "shortName": "RMA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
        "points": 18,
        "played": 8,
        "wins": 6,
        "draws": 0,
        "losses": 2,
        "goalsFor": 19,
        "goalsAgainst": 8,
        "goalDiff": 11
      },
      {
        "rank": 5,
        "teamId": "sevilla",
        "teamName": "Sevilla",
        "shortName": "SEV",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/243.png",
        "points": 14,
        "played": 8,
        "wins": 4,
        "draws": 2,
        "losses": 2,
        "goalsFor": 13,
        "goalsAgainst": 12,
        "goalDiff": 1
      },
      {
        "rank": 6,
        "teamId": "real_sociedad",
        "teamName": "Real Sociedad",
        "shortName": "RSO",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
        "points": 13,
        "played": 8,
        "wins": 4,
        "draws": 1,
        "losses": 3,
        "goalsFor": 12,
        "goalsAgainst": 15,
        "goalDiff": -3
      },
      {
        "rank": 7,
        "teamId": "alav_s",
        "teamName": "Alavés",
        "shortName": "ALA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/96.png",
        "points": 11,
        "played": 8,
        "wins": 3,
        "draws": 2,
        "losses": 3,
        "goalsFor": 12,
        "goalsAgainst": 8,
        "goalDiff": 4
      },
      {
        "rank": 8,
        "teamId": "deportivo",
        "teamName": "Deportivo",
        "shortName": "DEP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/90.png",
        "points": 10,
        "played": 8,
        "wins": 2,
        "draws": 4,
        "losses": 2,
        "goalsFor": 12,
        "goalsAgainst": 11,
        "goalDiff": 1
      },
      {
        "rank": 9,
        "teamId": "celta_vigo",
        "teamName": "Celta Vigo",
        "shortName": "CEL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/85.png",
        "points": 8,
        "played": 8,
        "wins": 1,
        "draws": 5,
        "losses": 2,
        "goalsFor": 8,
        "goalsAgainst": 6,
        "goalDiff": 2
      },
      {
        "rank": 10,
        "teamId": "athletic_club",
        "teamName": "Athletic Club",
        "shortName": "ATH",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
        "points": 8,
        "played": 6,
        "wins": 2,
        "draws": 2,
        "losses": 2,
        "goalsFor": 7,
        "goalsAgainst": 6,
        "goalDiff": 1
      },
      {
        "rank": 11,
        "teamId": "villarreal",
        "teamName": "Villarreal",
        "shortName": "VIL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
        "points": 8,
        "played": 8,
        "wins": 2,
        "draws": 2,
        "losses": 4,
        "goalsFor": 13,
        "goalsAgainst": 13,
        "goalDiff": 0
      },
      {
        "rank": 12,
        "teamId": "espanyol",
        "teamName": "Espanyol",
        "shortName": "ESP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/88.png",
        "points": 8,
        "played": 8,
        "wins": 2,
        "draws": 2,
        "losses": 4,
        "goalsFor": 11,
        "goalsAgainst": 11,
        "goalDiff": 0
      },
      {
        "rank": 13,
        "teamId": "rayo_vallecano",
        "teamName": "Rayo Vallecano",
        "shortName": "RAY",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/101.png",
        "points": 8,
        "played": 7,
        "wins": 2,
        "draws": 2,
        "losses": 3,
        "goalsFor": 11,
        "goalsAgainst": 16,
        "goalDiff": -5
      },
      {
        "rank": 14,
        "teamId": "getafe",
        "teamName": "Getafe",
        "shortName": "GET",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2922.png",
        "points": 8,
        "played": 8,
        "wins": 2,
        "draws": 2,
        "losses": 4,
        "goalsFor": 4,
        "goalsAgainst": 10,
        "goalDiff": -6
      },
      {
        "rank": 15,
        "teamId": "racing_santander",
        "teamName": "Racing Santander",
        "shortName": "RAC",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/87.png",
        "points": 8,
        "played": 8,
        "wins": 2,
        "draws": 2,
        "losses": 4,
        "goalsFor": 13,
        "goalsAgainst": 23,
        "goalDiff": -10
      },
      {
        "rank": 16,
        "teamId": "osasuna",
        "teamName": "Osasuna",
        "shortName": "OSA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/97.png",
        "points": 8,
        "played": 8,
        "wins": 2,
        "draws": 2,
        "losses": 4,
        "goalsFor": 8,
        "goalsAgainst": 18,
        "goalDiff": -10
      },
      {
        "rank": 17,
        "teamId": "levante",
        "teamName": "Levante",
        "shortName": "LEV",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1538.png",
        "points": 6,
        "played": 7,
        "wins": 1,
        "draws": 3,
        "losses": 3,
        "goalsFor": 11,
        "goalsAgainst": 15,
        "goalDiff": -4
      },
      {
        "rank": 18,
        "teamId": "elche",
        "teamName": "Elche",
        "shortName": "ELC",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/3751.png",
        "points": 6,
        "played": 8,
        "wins": 1,
        "draws": 3,
        "losses": 4,
        "goalsFor": 11,
        "goalsAgainst": 17,
        "goalDiff": -6
      },
      {
        "rank": 19,
        "teamId": "valencia",
        "teamName": "Valencia",
        "shortName": "VAL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/94.png",
        "points": 5,
        "played": 8,
        "wins": 1,
        "draws": 2,
        "losses": 5,
        "goalsFor": 6,
        "goalsAgainst": 15,
        "goalDiff": -9
      },
      {
        "rank": 20,
        "teamId": "m_laga",
        "teamName": "Málaga",
        "shortName": "MCF",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/99.png",
        "points": 4,
        "played": 8,
        "wins": 0,
        "draws": 4,
        "losses": 4,
        "goalsFor": 4,
        "goalsAgainst": 13,
        "goalDiff": -9
      }
    ]
  },
  {
    "id": "uefa.champions",
    "name": "UEFA Champions League",
    "icon": "🇪🇺",
    "season": "2026",
    "entries": [
      {
        "rank": 1,
        "teamId": "barcelona",
        "teamName": "Barcelona",
        "shortName": "BAR",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
        "points": 6,
        "played": 2,
        "wins": 2,
        "draws": 0,
        "losses": 0,
        "goalsFor": 9,
        "goalsAgainst": 2,
        "goalDiff": 7
      },
      {
        "rank": 2,
        "teamId": "sporting_cp",
        "teamName": "Sporting CP",
        "shortName": "SCP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2250.png",
        "points": 6,
        "played": 2,
        "wins": 2,
        "draws": 0,
        "losses": 0,
        "goalsFor": 5,
        "goalsAgainst": 1,
        "goalDiff": 4
      },
      {
        "rank": 3,
        "teamId": "arsenal",
        "teamName": "Arsenal",
        "shortName": "ARS",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
        "points": 6,
        "played": 2,
        "wins": 2,
        "draws": 0,
        "losses": 0,
        "goalsFor": 4,
        "goalsAgainst": 0,
        "goalDiff": 4
      },
      {
        "rank": 4,
        "teamId": "bayern_munich",
        "teamName": "Bayern Munich",
        "shortName": "MUN",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
        "points": 4,
        "played": 2,
        "wins": 1,
        "draws": 1,
        "losses": 0,
        "goalsFor": 8,
        "goalsAgainst": 3,
        "goalDiff": 5
      },
      {
        "rank": 5,
        "teamId": "paris_saint_germain",
        "teamName": "Paris Saint-Germain",
        "shortName": "PSG",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 6,
        "goalsAgainst": 1,
        "goalDiff": 5
      },
      {
        "rank": 6,
        "teamId": "como",
        "teamName": "Como",
        "shortName": "COMO",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2572.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 4,
        "goalsAgainst": 1,
        "goalDiff": 3
      },
      {
        "rank": 7,
        "teamId": "manchester_united",
        "teamName": "Manchester United",
        "shortName": "MAN",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 4,
        "goalsAgainst": 2,
        "goalDiff": 2
      },
      {
        "rank": 8,
        "teamId": "vfb_stuttgart",
        "teamName": "VfB Stuttgart",
        "shortName": "VFB",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/134.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 3,
        "goalsAgainst": 1,
        "goalDiff": 2
      },
      {
        "rank": 9,
        "teamId": "manchester_city",
        "teamName": "Manchester City",
        "shortName": "MNC",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 2,
        "goalsAgainst": 0,
        "goalDiff": 2
      },
      {
        "rank": 10,
        "teamId": "villarreal",
        "teamName": "Villarreal",
        "shortName": "VIL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 5,
        "goalsAgainst": 4,
        "goalDiff": 1
      },
      {
        "rank": 11,
        "teamId": "aston_villa",
        "teamName": "Aston Villa",
        "shortName": "AVL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 3,
        "goalsAgainst": 2,
        "goalDiff": 1
      },
      {
        "rank": 12,
        "teamId": "real_betis",
        "teamName": "Real Betis",
        "shortName": "BET",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 3,
        "goalsAgainst": 2,
        "goalDiff": 1
      },
      {
        "rank": 13,
        "teamId": "atl_tico_madrid",
        "teamName": "Atlético Madrid",
        "shortName": "ATM",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 3,
        "goalsAgainst": 2,
        "goalDiff": 1
      },
      {
        "rank": 14,
        "teamId": "borussia_dortmund",
        "teamName": "Borussia Dortmund",
        "shortName": "DOR",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 3,
        "goalsAgainst": 2,
        "goalDiff": 1
      },
      {
        "rank": 15,
        "teamId": "liverpool",
        "teamName": "Liverpool",
        "shortName": "LIV",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 2,
        "goalsAgainst": 1,
        "goalDiff": 1
      },
      {
        "rank": 16,
        "teamId": "real_madrid",
        "teamName": "Real Madrid",
        "shortName": "RMA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 2,
        "goalsAgainst": 1,
        "goalDiff": 1
      },
      {
        "rank": 17,
        "teamId": "aek_athens",
        "teamName": "AEK Athens",
        "shortName": "AEK",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/887.png",
        "points": 3,
        "played": 1,
        "wins": 1,
        "draws": 0,
        "losses": 0,
        "goalsFor": 1,
        "goalsAgainst": 0,
        "goalDiff": 1
      },
      {
        "rank": 18,
        "teamId": "club_brugge",
        "teamName": "Club Brugge",
        "shortName": "BRU",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/570.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 6,
        "goalsAgainst": 6,
        "goalDiff": 0
      },
      {
        "rank": 19,
        "teamId": "lens",
        "teamName": "Lens",
        "shortName": "RCL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/175.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 3,
        "goalsAgainst": 4,
        "goalDiff": -1
      },
      {
        "rank": 20,
        "teamId": "rb_leipzig",
        "teamName": "RB Leipzig",
        "shortName": "RBL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/11420.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 2,
        "goalsAgainst": 4,
        "goalDiff": -2
      },
      {
        "rank": 21,
        "teamId": "sabah_fk",
        "teamName": "Sabah FK",
        "shortName": "SAB",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/21922.png",
        "points": 3,
        "played": 2,
        "wins": 1,
        "draws": 0,
        "losses": 1,
        "goalsFor": 2,
        "goalsAgainst": 4,
        "goalDiff": -2
      },
      {
        "rank": 22,
        "teamId": "as_roma",
        "teamName": "AS Roma",
        "shortName": "ROMA",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
        "points": 1,
        "played": 1,
        "wins": 0,
        "draws": 1,
        "losses": 0,
        "goalsFor": 1,
        "goalsAgainst": 1,
        "goalDiff": 0
      },
      {
        "rank": 23,
        "teamId": "shakhtar_donetsk",
        "teamName": "Shakhtar Donetsk",
        "shortName": "SHK",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/493.png",
        "points": 1,
        "played": 1,
        "wins": 0,
        "draws": 1,
        "losses": 0,
        "goalsFor": 1,
        "goalsAgainst": 1,
        "goalDiff": 0
      },
      {
        "rank": 24,
        "teamId": "fenerbahce",
        "teamName": "Fenerbahce",
        "shortName": "FEN",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/436.png",
        "points": 1,
        "played": 1,
        "wins": 0,
        "draws": 1,
        "losses": 0,
        "goalsFor": 1,
        "goalsAgainst": 1,
        "goalDiff": 0
      },
      {
        "rank": 25,
        "teamId": "psv_eindhoven",
        "teamName": "PSV Eindhoven",
        "shortName": "PSV",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/148.png",
        "points": 1,
        "played": 2,
        "wins": 0,
        "draws": 1,
        "losses": 1,
        "goalsFor": 1,
        "goalsAgainst": 2,
        "goalDiff": -1
      },
      {
        "rank": 26,
        "teamId": "viking_fk",
        "teamName": "Viking FK",
        "shortName": "VIK",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/510.png",
        "points": 1,
        "played": 2,
        "wins": 0,
        "draws": 1,
        "losses": 1,
        "goalsFor": 4,
        "goalsAgainst": 6,
        "goalDiff": -2
      },
      {
        "rank": 27,
        "teamId": "lask_linz",
        "teamName": "LASK Linz",
        "shortName": "LAS",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/4411.png",
        "points": 0,
        "played": 1,
        "wins": 0,
        "draws": 0,
        "losses": 1,
        "goalsFor": 0,
        "goalsAgainst": 1,
        "goalDiff": -1
      },
      {
        "rank": 28,
        "teamId": "internazionale",
        "teamName": "Internazionale",
        "shortName": "INT",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
        "points": 0,
        "played": 2,
        "wins": 0,
        "draws": 0,
        "losses": 2,
        "goalsFor": 4,
        "goalsAgainst": 6,
        "goalDiff": -2
      },
      {
        "rank": 29,
        "teamId": "fc_porto",
        "teamName": "FC Porto",
        "shortName": "FCP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/437.png",
        "points": 0,
        "played": 1,
        "wins": 0,
        "draws": 0,
        "losses": 1,
        "goalsFor": 0,
        "goalsAgainst": 2,
        "goalDiff": -2
      },
      {
        "rank": 30,
        "teamId": "slavia_prague",
        "teamName": "Slavia Prague",
        "shortName": "SLP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/494.png",
        "points": 0,
        "played": 2,
        "wins": 0,
        "draws": 0,
        "losses": 2,
        "goalsFor": 2,
        "goalsAgainst": 5,
        "goalDiff": -3
      },
      {
        "rank": 31,
        "teamId": "napoli",
        "teamName": "Napoli",
        "shortName": "NAP",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/114.png",
        "points": 0,
        "played": 2,
        "wins": 0,
        "draws": 0,
        "losses": 2,
        "goalsFor": 1,
        "goalsAgainst": 4,
        "goalDiff": -3
      },
      {
        "rank": 32,
        "teamId": "lille",
        "teamName": "Lille",
        "shortName": "LILL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/166.png",
        "points": 0,
        "played": 2,
        "wins": 0,
        "draws": 0,
        "losses": 2,
        "goalsFor": 2,
        "goalsAgainst": 6,
        "goalDiff": -4
      },
      {
        "rank": 33,
        "teamId": "feyenoord_rotterdam",
        "teamName": "Feyenoord Rotterdam",
        "shortName": "FEY",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/142.png",
        "points": 0,
        "played": 1,
        "wins": 0,
        "draws": 0,
        "losses": 1,
        "goalsFor": 1,
        "goalsAgainst": 5,
        "goalDiff": -4
      },
      {
        "rank": 34,
        "teamId": "galatasaray",
        "teamName": "Galatasaray",
        "shortName": "GAL",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/432.png",
        "points": 0,
        "played": 2,
        "wins": 0,
        "draws": 0,
        "losses": 2,
        "goalsFor": 2,
        "goalsAgainst": 7,
        "goalDiff": -5
      },
      {
        "rank": 35,
        "teamId": "slovan_bratislava",
        "teamName": "Slovan Bratislava",
        "shortName": "SLB",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/521.png",
        "points": 0,
        "played": 1,
        "wins": 0,
        "draws": 0,
        "losses": 1,
        "goalsFor": 1,
        "goalsAgainst": 6,
        "goalDiff": -5
      },
      {
        "rank": 36,
        "teamId": "bodo_glimt",
        "teamName": "Bodo/Glimt",
        "shortName": "BODO",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/2980.png",
        "points": 0,
        "played": 1,
        "wins": 0,
        "draws": 0,
        "losses": 1,
        "goalsFor": 0,
        "goalsAgainst": 5,
        "goalDiff": -5
      }
    ]
  }
];

export const REAL_NEWS_SNAPSHOT: TransferNewsItem[] = [
  {
    "id": "news-0",
    "title": "Corinthians hire Clarence Seedorf as head coach after seven consecutive league defeats",
    "summary": "Corinthians hired Clarence Seedorf on Sunday for the Netherlands playing great's first coaching job since 2019 -- and a relegation fight in Brazil's top tier.",
    "fullArticle": "Corinthians hired Clarence Seedorf on Sunday for the Netherlands playing great's first coaching job since 2019 -- and a relegation fight in Brazil's top tier.\n\nFonte: Associated Press (2026-10-11)",
    "player": "news",
    "playerAge": 26,
    "position": "Destaque",
    "nationality": "Internacional",
    "fromTeam": "Clube",
    "toTeam": "Transferências & Notícias",
    "transferType": "OFICIAL",
    "fee": "Cobertura ao vivo",
    "contractYears": "2026",
    "date": "2026-10-11",
    "timeAgo": "Recente",
    "status": "OFICIAL",
    "confidenceScore": 98,
    "source": "Associated Press / ESPN",
    "imageUrl": "https://a.espncdn.com/photo/2026/1011/r1729357_1296x729_16-9.jpg"
  },
  {
    "id": "news-1",
    "title": "Philippe Coutinho reveals Neymar's 'important role' in Santos transfer",
    "summary": "Philippe Coutinho has said his former Brazil teammate Neymar played a \"very important role\" in him signing for Santos.",
    "fullArticle": "Philippe Coutinho has said his former Brazil teammate Neymar played a \"very important role\" in him signing for Santos.\n\nFonte: ESPN (2026-09-15)",
    "player": "Soccer",
    "playerAge": 26,
    "position": "Destaque",
    "nationality": "Internacional",
    "fromTeam": "Clube",
    "toTeam": "Transferências & Notícias",
    "transferType": "OFICIAL",
    "fee": "Cobertura ao vivo",
    "contractYears": "2026",
    "date": "2026-09-15",
    "timeAgo": "Recente",
    "status": "OFICIAL",
    "confidenceScore": 98,
    "source": "ESPN / ESPN",
    "imageUrl": "https://a.espncdn.com/photo/2026/0915/r1716938_1296x729_16-9.jpg"
  },
  {
    "id": "news-2",
    "title": "Former Liverpool, Barcelona midfielder Philippe Coutinho set to join Neymar at Santos",
    "summary": "Philippe Coutinho is set to play for Santos for the remainder of the year.",
    "fullArticle": "Philippe Coutinho is set to play for Santos for the remainder of the year.\n\nFonte: Adriana Garcia (2026-09-14)",
    "player": "news",
    "playerAge": 26,
    "position": "Destaque",
    "nationality": "Internacional",
    "fromTeam": "Clube",
    "toTeam": "Transferências & Notícias",
    "transferType": "OFICIAL",
    "fee": "Cobertura ao vivo",
    "contractYears": "2026",
    "date": "2026-09-14",
    "timeAgo": "Recente",
    "status": "OFICIAL",
    "confidenceScore": 98,
    "source": "Adriana Garcia / ESPN",
    "imageUrl": "https://a.espncdn.com/photo/2026/0219/r1617175_2_1296x729_16-9.jpg"
  },
  {
    "id": "news-3",
    "title": "What Mastantuono, Estêvão transfers can teach South America's future stars",
    "summary": "Both Franco Mastantuono and Estêvão moved from South America to Europe at the same time. However, after a season, both of them ended up on different paths.",
    "fullArticle": "Both Franco Mastantuono and Estêvão moved from South America to Europe at the same time. However, after a season, both of them ended up on different paths.\n\nFonte: Tim Vickery (2026-08-26)",
    "player": "Soccer",
    "playerAge": 26,
    "position": "Destaque",
    "nationality": "Internacional",
    "fromTeam": "Clube",
    "toTeam": "Transferências & Notícias",
    "transferType": "OFICIAL",
    "fee": "Cobertura ao vivo",
    "contractYears": "2026",
    "date": "2026-08-26",
    "timeAgo": "Recente",
    "status": "OFICIAL",
    "confidenceScore": 98,
    "source": "Tim Vickery / ESPN",
    "imageUrl": "https://a.espncdn.com/photo/2026/0825/r1706757_1296x729_16-9.jpg"
  },
  {
    "id": "news-4",
    "title": "Why Man City's move for Allan Elias gets them a winger, midfielder and defender",
    "summary": "Palmeiras' Allan Elias attacks and defends down the flank all game, which is what made him so attractive to Manchester City.",
    "fullArticle": "Palmeiras' Allan Elias attacks and defends down the flank all game, which is what made him so attractive to Manchester City.\n\nFonte: Tim Vickery (2026-08-25)",
    "player": "Soccer",
    "playerAge": 26,
    "position": "Destaque",
    "nationality": "Internacional",
    "fromTeam": "Clube",
    "toTeam": "Transferências & Notícias",
    "transferType": "OFICIAL",
    "fee": "Cobertura ao vivo",
    "contractYears": "2026",
    "date": "2026-08-25",
    "timeAgo": "Recente",
    "status": "OFICIAL",
    "confidenceScore": 98,
    "source": "Tim Vickery / ESPN",
    "imageUrl": "https://a.espncdn.com/photo/2026/0825/r1706608_1296x729_16-9.jpg"
  },
  {
    "id": "news-5",
    "title": "Santos open to Robinho Junior loan to Europe - sources",
    "summary": "Santos are open to loan Brazilian forward Robinho Junior to a European club this season, sources have told ESPN.",
    "fullArticle": "Santos are open to loan Brazilian forward Robinho Junior to a European club this season, sources have told ESPN.\n\nFonte: Felipe Silva (2026-08-25)",
    "player": "news",
    "playerAge": 26,
    "position": "Destaque",
    "nationality": "Internacional",
    "fromTeam": "Clube",
    "toTeam": "Transferências & Notícias",
    "transferType": "OFICIAL",
    "fee": "Cobertura ao vivo",
    "contractYears": "2026",
    "date": "2026-08-25",
    "timeAgo": "Recente",
    "status": "OFICIAL",
    "confidenceScore": 98,
    "source": "Felipe Silva / ESPN",
    "imageUrl": "https://a.espncdn.com/photo/2026/0504/r1653539_1296x729_16-9.jpg"
  }
];
