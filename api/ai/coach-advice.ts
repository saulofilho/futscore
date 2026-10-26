import { GoogleGenAI } from '@google/genai';

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
    console.error('Failed to initialize GoogleGenAI client for coach advice on Vercel:', err);
  }
}

export default async function handler(req: any, res: any) {
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
    const { match, coachTeam, formation, mentality, pressure, substitutionsUsed, staminaAvg, recentEvents } = body || {};

    const myTeam = coachTeam === 'home' ? match?.homeTeam?.name : match?.awayTeam?.name;
    const oppTeam = coachTeam === 'home' ? match?.awayTeam?.name : match?.homeTeam?.name;
    const myScore = coachTeam === 'home' ? (match?.homeTeam?.score || 0) : (match?.awayTeam?.score || 0);
    const oppScore = coachTeam === 'home' ? (match?.awayTeam?.score || 0) : (match?.homeTeam?.score || 0);
    const min = match?.minute || 65;

    if (!aiClient) {
      res.status(200).json({
        assistantMessage: myScore > oppScore
          ? `Professor, estamos em vantagem (${myScore}x${oppScore} aos ${min}'). A formação ${formation} com postura ${mentality} mantém bom controle. Recomendo explorar as pontas em transição direta.`
          : myScore < oppScore
          ? `Atenção, técnico! Precisamos reagir (${myScore}x${oppScore}). A postura ${mentality} precisa de mais infiltração na área. Recomendo acionar reservas descansados.`
          : `Jogo truncado no empate (${myScore}x${oppScore} aos ${min}'). Sua escolha do ${formation} equilibra o meio-campo. Fique atento à fadiga (${staminaAvg}% de fôlego médio).`,
        tacticalRating: Math.floor(Math.random() * 12) + 82,
        keySuggestion: myScore > oppScore ? 'Manter posse e controlar transições' : 'Aumentar pressão pós-perda e chutes de fora',
        opponentCounterThreat: `O ${oppTeam} busca explorar bolas esticadas no contra-ataque.`,
      });
      return;
    }

    const prompt = `
Você é o Auxiliar Técnico (estrategista) do comandante do ${myTeam}.
O confronto está em andamento contra o ${oppTeam}:
- Minuto atual: ${min}'
- Placar: ${myTeam} ${myScore} x ${oppScore} ${oppTeam}
- Formação adotada: ${formation}
- Mentalidade: ${mentality}
- Nível de pressão: ${pressure}
- Substituições feitas: ${substitutionsUsed}/5
- Fôlego médio: ${staminaAvg}%
- Últimos lances: ${JSON.stringify(recentEvents || [])}

Dê um parecer tático em 2 ou 3 frases diretas e contundentes.
RETORNE UM OBJETO JSON:
{
  "assistantMessage": "sua fala direta para o técnico em português",
  "tacticalRating": número de 75 a 98,
  "keySuggestion": "sugestão cirúrgica de formação ou instrução",
  "opponentCounterThreat": "alerta sobre onde o adversário pode contra-atacar"
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
        throw new Error('Falha ao interpretar JSON');
      }
    }

    res.status(200).json({
      assistantMessage: parsed.assistantMessage || 'Excelente leitura tática. Continue monitorando o desgaste físico.',
      tacticalRating: parsed.tacticalRating || 85,
      keySuggestion: parsed.keySuggestion || 'Monitorar intensidade no meio-campo',
      opponentCounterThreat: parsed.opponentCounterThreat || 'Contra-ataques rápidos nas alas.',
    });
  } catch (err) {
    console.error('Vercel API coach error:', err);
    res.status(200).json({
      assistantMessage: 'Professor, o time está respondendo à proposta tática. Mantenha as linhas firmes e aproveite as trocas.',
      tacticalRating: 84,
      keySuggestion: 'Preservar energia para o terço final',
      opponentCounterThreat: 'Bolas paradas e contra-ataques rápidos.',
    });
  }
}
