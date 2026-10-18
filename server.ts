import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

interface PredictRequestBody {
  match: {
    id: string;
    homeTeam: { name: string; shortName?: string; score?: number; badge?: string };
    awayTeam: { name: string; shortName?: string; score?: number; badge?: string };
    league?: string;
    stadium?: string;
    time?: string;
    status?: string;
    stats?: Record<string, any>;
  };
  homeHistory?: {
    summary?: string;
    coach?: string;
    trophiesCount?: number;
    stadiumName?: string;
    goldenEra?: string;
  };
  awayHistory?: {
    summary?: string;
    coach?: string;
    trophiesCount?: number;
    stadiumName?: string;
    goldenEra?: string;
  };
  focusMode?: string;
}

// Generates fallback algorithmic tactical prediction if Gemini API is unavailable or offline
function generateFallbackPrediction(body: PredictRequestBody) {
  const { match, homeHistory, awayHistory } = body;
  const homeName = match.homeTeam.name;
  const awayName = match.awayTeam.name;

  const homeHash = homeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const awayHash = awayName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

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
    modelUsed: 'FutScore Engine Tático (Modo Local)',
    predictedScore: {
      home: homeGoals,
      away: awayGoals,
    },
    winProbabilities: {
      home: Math.max(15, homeProb),
      draw: Math.max(15, drawProb),
      away: Math.max(15, awayProb),
    },
    confidenceLevel: (Math.abs(homeProb - awayProb) > 20 ? 'ALTA' : 'EQUILIBRADA') as 'ALTA' | 'MÉDIA' | 'EQUILIBRADA',
    tacticalAdvantage: `${homeName} detém ligeira vantagem de controle no meio-campo e fator mando de campo em ${match.stadium || 'seu estádio'}, enquanto o ${awayName} foca em transições rápidas pelas pontas.`,
    summary: `Confronto de alto nível pelo ${match.league || 'campeonato'}. O ${homeName}${homeHistory?.coach ? ` comandado por ${homeHistory.coach}` : ''} chega com maior volume de posse e pressão pós-perda na primeira linha. O ${awayName}${awayHistory?.coach ? ` sob a liderança de ${awayHistory.coach}` : ''} possui letalidade no contra-ataque e bolas paradas ofensivas. Espera-se um duelo equilibrado com oportunidades claras para ambas as equipes.`,
    historicContext: `${homeName} e ${awayName} carregam rica tradição esportiva. Historicamente, os embates entre ambos registram média superior a 2.3 gols por partida, com momentos de grande intensidade e rivalidade acirrada nos clássicos.`,
    keyMatchups: [
      {
        title: 'Batalha no Meio-Campo (Posse vs Pressão)',
        description: `Disputa direta na segunda linha entre os volantes do ${homeName} e os armadores do ${awayName} para ditar o ritmo de jogo.`,
      },
      {
        title: 'Velocidade nas Alas e Cruzamentos',
        description: `Laterais e pontas ofensivos buscam profundidade nos corredores laterais para abastecer os atacantes de área.`,
      },
    ],
    keyPlayersToWatch: [
      {
        name: `Camisa 10 do ${homeName}`,
        team: homeName,
        role: 'Meia Criador',
        reason: 'Principal articulador dos passes de ruptura e finalizações de média distância.',
      },
      {
        name: `Centroavante do ${awayName}`,
        team: awayName,
        role: 'Atacante de Referência',
        reason: 'Potência física para disputar bolas aéreas e converter chances criadas em contragolpes.',
      },
    ],
    matchScenario: {
      expectedGoalsTotal: '2 a 3 gols',
      bothTeamsToScoreProbability: 62,
      gamePace: 'INTENSO' as const,
      tip: 'Tendência favorável para ambas as equipes marcarem com gols decisivos no 2º tempo.',
    },
  };
}

// API endpoint for Gemini-powered Match Predictions
app.post('/api/ai/predict-match', async (req: Request, res: Response): Promise<void> => {
  try {
    const body: PredictRequestBody = req.body;
    const { match, homeHistory, awayHistory, focusMode } = body;

    if (!match || !match.homeTeam || !match.awayTeam) {
      res.status(400).json({ error: 'Dados da partida incompletos para previsão.' });
      return;
    }

    // If Gemini client is not initialized or API key is absent, use fallback
    if (!aiClient) {
      const fallback = generateFallbackPrediction(body);
      res.json(fallback);
      return;
    }

    const homeName = match.homeTeam.name;
    const awayName = match.awayTeam.name;
    const league = match.league || 'Campeonato';
    const stadium = match.stadium || 'Estádio';

    const prompt = `
Você é o especialista tático e estatístico número 1 de futebol do FutScore PRO.
Analise a partida a seguir e elabore um prognóstico pré-jogo aprofundado, técnico, realista e fundamentado.

DADOS DA PARTIDA:
- Confronto: ${homeName} (Mandante) x ${awayName} (Visitante)
- Torneio / Liga: ${league}
- Estádio / Local: ${stadium}
- Status atual: ${match.status || 'Agendado'}
- Estatísticas disponíveis: ${JSON.stringify(match.stats || {})}
- Foco adicional do usuário: ${focusMode || 'Análise Tática e Histórica Geral'}

HISTÓRICO E CONTEXTO:
- ${homeName}: Técnico: ${homeHistory?.coach || 'Não informado'}, Títulos relevantes: ${homeHistory?.trophiesCount || 'Diversos'}, Era de Ouro: ${homeHistory?.goldenEra || 'Tradição sólida'}.
- ${awayName}: Técnico: ${awayHistory?.coach || 'Não informado'}, Títulos relevantes: ${awayHistory?.trophiesCount || 'Diversos'}, Era de Ouro: ${awayHistory?.goldenEra || 'Tradição sólida'}.

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO com os seguintes campos (sem blocos markdown adicionais):
{
  "predictedScore": { "home": number, "away": number },
  "winProbabilities": { "home": number, "draw": number, "away": number }, // soma deve ser 100
  "confidenceLevel": "ALTA" | "MÉDIA" | "EQUILIBRADA",
  "tacticalAdvantage": "frase resumindo qual equipe tem a vantagem tática e o motivo",
  "summary": "2 a 3 parágrafos curtos e dinâmicos em português analisando postura tática, transições e momento dos times",
  "historicContext": "análise sobre a rivalidade, tradição histórica e peso da camisa no confronto",
  "keyMatchups": [
    { "title": "nome do duelo", "description": "detalhes táticos do embate" },
    { "title": "nome do duelo", "description": "detalhes táticos do embate" }
  ],
  "keyPlayersToWatch": [
    { "name": "Nome", "team": "Time", "role": "Posição", "reason": "Por que será decisivo" },
    { "name": "Nome", "team": "Time", "role": "Posição", "reason": "Por que será decisivo" }
  ],
  "matchScenario": {
    "expectedGoalsTotal": "ex: 2 a 3 gols",
    "bothTeamsToScoreProbability": number (0 a 100),
    "gamePace": "INTENSO" | "CADENCIADO" | "TRUNCADO",
    "tip": "Dica / Leitura técnica principal do confronto"
  }
}
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'Você é um analista de futebol profissional renomado. Gere prognósticos precisos em JSON sem texto fora do formato.',
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
        throw new Error('Falha ao interpretar resposta JSON do Gemini');
      }
    }

    const predictionResult = {
      id: `pred-${match.id}-${Date.now()}`,
      matchId: match.id,
      timestamp: new Date().toISOString(),
      modelUsed: 'Gemini 3.8 Flash (Google GenAI)',
      predictedScore: parsed.predictedScore || { home: 1, away: 1 },
      winProbabilities: parsed.winProbabilities || { home: 40, draw: 30, away: 30 },
      confidenceLevel: parsed.confidenceLevel || 'MÉDIA',
      tacticalAdvantage: parsed.tacticalAdvantage || 'Equilíbrio marcante entre as propostas das duas equipes.',
      summary: parsed.summary || 'Prognóstico detalhado gerado com base no histórico das equipes.',
      historicContext: parsed.historicContext || 'Equipes com vasta tradição e histórico competitivo.',
      keyMatchups: Array.isArray(parsed.keyMatchups) ? parsed.keyMatchups : [],
      keyPlayersToWatch: Array.isArray(parsed.keyPlayersToWatch) ? parsed.keyPlayersToWatch : [],
      matchScenario: parsed.matchScenario || {
        expectedGoalsTotal: '2 gols',
        bothTeamsToScoreProbability: 55,
        gamePace: 'INTENSO',
        tip: 'Partida aberta com boas chances para ambos os lados.',
      },
    };

    res.json(predictionResult);
  } catch (error: any) {
    console.error('Error generating prediction via Gemini:', error);
    const fallback = generateFallbackPrediction(req.body);
    res.json(fallback);
  }
});

// API endpoint for Gemini-powered Assistant Coach Advice
app.post('/api/ai/coach-advice', async (req: Request, res: Response): Promise<void> => {
  try {
    const { match, coachTeam, formation, mentality, pressure, substitutionsUsed, staminaAvg, recentEvents } = req.body;

    const myTeam = coachTeam === 'home' ? match?.homeTeam?.name : match?.awayTeam?.name;
    const oppTeam = coachTeam === 'home' ? match?.awayTeam?.name : match?.homeTeam?.name;
    const myScore = coachTeam === 'home' ? (match?.homeTeam?.score || 0) : (match?.awayTeam?.score || 0);
    const oppScore = coachTeam === 'home' ? (match?.awayTeam?.score || 0) : (match?.homeTeam?.score || 0);
    const min = match?.minute || 65;

    // Fast fallback if Gemini client not available
    if (!aiClient) {
      res.json({
        assistantMessage: myScore > oppScore
          ? `Professor, estamos em vantagem (${myScore}x${oppScore} aos ${min}'). A formação ${formation} com postura ${mentality} mantém bom controle. Se o ${oppTeam} adiantar as linhas, recomendo explorar as pontas em transição direta.`
          : myScore < oppScore
          ? `Atenção, técnico! Precisamos reagir (${myScore}x${oppScore}). A postura ${mentality} precisa de mais infiltração na área. Recomendo acionar atacantes descansados do banco e adiantar os volantes.`
          : `Jogo truncado no empate (${myScore}x${oppScore} aos ${min}'). Sua escolha do ${formation} equilibra o meio-campo. Fique atento à fadiga dos laterais (${staminaAvg}% de fôlego médio).`,
        tacticalRating: Math.floor(Math.random() * 12) + 82,
        keySuggestion: myScore > oppScore ? 'Manter posse e controlar transições' : 'Aumentar pressão pós-perda e chutes de fora',
        opponentCounterThreat: `O ${oppTeam} busca explorar bolas esticadas no contra-ataque.`,
      });
      return;
    }

    const prompt = `
Você é o Auxiliar Técnico de Futebol (fiel escudeiro e estrategista) do treinador que comanda o ${myTeam}.
O jogo atual está em andamento contra o ${oppTeam}:
- Minuto atual: ${min}'
- Placar: ${myTeam} ${myScore} x ${oppScore} ${oppTeam}
- Formação tática adotada pelo técnico: ${formation}
- Mentalidade da equipe: ${mentality}
- Nível de pressão: ${pressure}
- Substituições feitas: ${substitutionsUsed}/5
- Fôlego/estamina média do elenco: ${staminaAvg}%
- Últimos lances da partida: ${JSON.stringify(recentEvents || [])}

Dê um parecer tático em 2 ou 3 frases diretas, profissionais e contundentes, como um auxiliar técnico experiente conversando na beira do gramado.
RETORNE UM OBJETO JSON ESTRITO com o seguinte formato:
{
  "assistantMessage": "sua fala direta para o técnico em português",
  "tacticalRating": número de 75 a 98,
  "keySuggestion": "sugestão cirúrgica de formação, substituição ou instrução",
  "opponentCounterThreat": "alerta sobre onde o adversário pode nos ferir nos próximos minutos"
}
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'Você é um assistente técnico de futebol profissional da Série A / Champions League. Responda apenas o JSON.',
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
        throw new Error('Falha ao interpretar JSON');
      }
    }

    res.json({
      assistantMessage: parsed.assistantMessage || 'Excelente leitura tática. Continue monitorando o desgaste físico.',
      tacticalRating: parsed.tacticalRating || 85,
      keySuggestion: parsed.keySuggestion || 'Monitorar pernas pesadas no meio-campo',
      opponentCounterThreat: parsed.opponentCounterThreat || 'Contra-ataques rápidos nas alas.',
    });
  } catch (err) {
    console.error('Error generating coach advice:', err);
    res.json({
      assistantMessage: 'Professor, o time está respondendo à proposta tática. Mantenha as linhas firmes e aproveite as trocas permitidas.',
      tacticalRating: 84,
      keySuggestion: 'Preservar energia dos alas para o terço final',
      opponentCounterThreat: 'Bolas paradas e cruzamentos na segunda trave.',
    });
  }
});


// Start Express server and attach Vite middleware in development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FutScore Server with Gemini AI running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
