import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'omniscore-vercel',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client on Vercel:', err);
  }
}

function generateFallbackPrediction(body: any) {
  const { match, homeHistory, awayHistory } = body;
  const homeName = match.homeTeam.name;
  const awayName = match.awayTeam.name;

  const homeHash = homeName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const awayHash = awayName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

  const homeAdvantage = 8;
  const rawHome = (homeHash % 45) + homeAdvantage + 25;
  const rawAway = (awayHash % 40) + 20;
  const total = rawHome + rawAway + 20;

  const homeProb = Math.round((rawHome / total) * 100);
  const awayProb = Math.round((rawAway / total) * 100);
  const drawProb = 100 - homeProb - awayProb;

  const homeGoals = homeProb > 48 ? 2 : homeProb > 35 ? 1 : 0;
  const awayGoals = awayProb > 45 ? 2 : awayProb > 32 ? 1 : 0;

  return {
    id: `pred-${match.id}-${Date.now()}`,
    matchId: match.id,
    timestamp: new Date().toISOString(),
    modelUsed: 'OmniScore Engine Tático (Modo Local)',
    predictedScore: {
      home: homeGoals,
      away: awayGoals,
    },
    winProbabilities: {
      home: Math.max(15, homeProb),
      draw: Math.max(15, drawProb),
      away: Math.max(15, awayProb),
    },
    confidenceLevel: (Math.abs(homeProb - awayProb) > 20 ? 'ALTA' : 'EQUILIBRADA'),
    tacticalAdvantage: `${homeName} detém ligeira vantagem de controle e fator mando de campo em ${match.stadium || 'seu estádio/arena'}.`,
    summary: `Confronto de alto nível pelo ${match.league || 'campeonato'}. O ${homeName}${homeHistory?.coach ? ` comandado por ${homeHistory.coach}` : ''} busca o protagonismo. O ${awayName}${awayHistory?.coach ? ` sob comando de ${awayHistory.coach}` : ''} aposta em solidez defensiva e contra-ataques objetivos.`,
    historicContext: `${homeName} e ${awayName} carregam tradição esportiva e rivalidade intensa em decisões.`,
    keyMatchups: [
      {
        title: 'Batalha pela Posse e Ritmo de Jogo',
        description: `Disputa direta no meio-campo para ditar a velocidade das transições.`,
      },
      {
        title: 'Eficiência nas Bolas Paradas e Finais',
        description: `Lances decisivos em jogadas ensaiadas e finalizações de média distância.`,
      },
    ],
    keyPlayersToWatch: [
      {
        name: `Destaque do ${homeName}`,
        team: homeName,
        role: 'Armador / Principal Artilheiro',
        reason: 'Capacidade de decidir em jogadas individuais de alta pressão.',
      },
      {
        name: `Destaque do ${awayName}`,
        team: awayName,
        role: 'Líder / Referência Tática',
        reason: 'Solidez em transições rápidas e liderança emocional.',
      },
    ],
    matchScenario: {
      expectedGoalsTotal: '2 a 3 gols / pontos decisivos',
      bothTeamsToScoreProbability: 62,
      gamePace: 'INTENSO',
      tip: 'Tendência favorável para partida movimentada com chances claras para ambos os lados.',
    },
  };
}

export default async function handler(req: any, res: any) {
  // Set CORS and headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { match, homeHistory, awayHistory, focusMode } = body || {};

    if (!match || !match.homeTeam || !match.awayTeam) {
      res.status(400).json({ error: 'Dados da partida incompletos para previsão.' });
      return;
    }

    if (!aiClient) {
      const fallback = generateFallbackPrediction(body);
      res.status(200).json(fallback);
      return;
    }

    const homeName = match.homeTeam.name;
    const awayName = match.awayTeam.name;
    const league = match.league || 'Campeonato';
    const stadium = match.stadium || 'Arena / Estádio';

    const prompt = `
Você é o especialista tático e estatístico número 1 de esportes do OmniScore PRO.
Analise a partida/confronto a seguir e elabore um prognóstico pré-jogo aprofundado, técnico, realista e fundamentado.

DADOS DA PARTIDA:
- Confronto: ${homeName} x ${awayName}
- Torneio / Liga: ${league}
- Local: ${stadium}
- Status atual: ${match.status || 'Agendado'}
- Foco adicional do usuário: ${focusMode || 'Análise Geral'}

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO com os seguintes campos (sem markdown adicional):
{
  "predictedScore": { "home": number, "away": number },
  "winProbabilities": { "home": number, "draw": number, "away": number },
  "confidenceLevel": "ALTA" | "MÉDIA" | "EQUILIBRADA",
  "tacticalAdvantage": "frase resumindo qual equipe tem vantagem tática e o motivo",
  "summary": "2 a 3 parágrafos curtos em português analisando postura e momento",
  "historicContext": "análise sobre tradição histórica e peso no confronto",
  "keyMatchups": [
    { "title": "nome do duelo", "description": "detalhes táticos" },
    { "title": "nome do duelo", "description": "detalhes táticos" }
  ],
  "keyPlayersToWatch": [
    { "name": "Nome", "team": "Time", "role": "Posição", "reason": "Motivo" },
    { "name": "Nome", "team": "Time", "role": "Posição", "reason": "Motivo" }
  ],
  "matchScenario": {
    "expectedGoalsTotal": "ex: 2 a 3 gols/pontos",
    "bothTeamsToScoreProbability": number,
    "gamePace": "INTENSO" | "CADENCIADO" | "TRUNCADO",
    "tip": "Dica / Leitura técnica principal"
  }
}
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(responseText.trim());
    } catch {
      const matchJson = responseText.match(/\{[\s\S]*\}/);
      if (matchJson) {
        parsed = JSON.parse(matchJson[0]);
      } else {
        throw new Error('Falha ao interpretar resposta JSON');
      }
    }

    res.status(200).json({
      id: `pred-${match.id}-${Date.now()}`,
      matchId: match.id,
      timestamp: new Date().toISOString(),
      modelUsed: 'Gemini 2.5 Flash (Vercel Serverless)',
      predictedScore: parsed.predictedScore || { home: 1, away: 0 },
      winProbabilities: parsed.winProbabilities || { home: 45, draw: 25, away: 30 },
      confidenceLevel: parsed.confidenceLevel || 'MÉDIA',
      tacticalAdvantage: parsed.tacticalAdvantage || 'Equilíbrio marcante entre as propostas.',
      summary: parsed.summary || 'Prognóstico detalhado gerado com base no histórico das equipes.',
      historicContext: parsed.historicContext || 'Equipes com vasta tradição e histórico competitivo.',
      keyMatchups: Array.isArray(parsed.keyMatchups) ? parsed.keyMatchups : [],
      keyPlayersToWatch: Array.isArray(parsed.keyPlayersToWatch) ? parsed.keyPlayersToWatch : [],
      matchScenario: parsed.matchScenario || {
        expectedGoalsTotal: '2 gols',
        bothTeamsToScoreProbability: 50,
        gamePace: 'INTENSO',
        tip: 'Partida aberta com boas chances para ambos os lados.',
      },
    });
  } catch (error) {
    console.error('Vercel API predict error:', error);
    const fallback = generateFallbackPrediction(req.body);
    res.status(200).json(fallback);
  }
}
