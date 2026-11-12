require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações básicas do Express
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve o front-end (index.html)

// Rota auxiliar para abrir os slides da apresentação diretamente pelo navegador
app.get('/slides', (req, res) => {
  res.sendFile(__dirname + '/slides.html');
});

// ============================================================================
// 1. SYSTEM PROMPT (Comportamento da IA)
// ============================================================================
// O System Prompt instrui o modelo sobre como ele deve se comportar antes mesmo
// do usuário digitar qualquer coisa.
const SYSTEM_PROMPT = `Você é um assistente acadêmico amigável e didático na aula de Desenvolvimento Web do professor Renato. 
Responda de forma clara, objetiva, bem-humorada e sempre em português brasileiro. 
Mantenha respostas curtas (máximo 2 a 3 parágrafos) para caber bem na interface de chat.`;

// ============================================================================
// 2. CONFIGURAÇÃO DO PROVEDOR (DESACOPLAMENTO)
// ============================================================================
// Aqui está o coração do Grupo 4:
// Podemos alternar entre 'gemini', 'openai' ou 'anthropic'.
// Repare que o front-end (index.html) NUNCA sabe qual modelo está rodando!
const PROVIDER = process.env.PROVIDER || 'gemini';

// ============================================================================
// 3. FUNÇÃO: Chamada para a API do Google Gemini
// ============================================================================
async function chamarGemini(mensagemDoUsuario) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'sua_chave_do_gemini_aqui') {
    throw new Error('Chave do Gemini não configurada! Adicione GEMINI_API_KEY no arquivo .env');
  }

  // Endpoint oficial da API do Gemini (usando o modelo leve e rapido gemini-3.5-flash-lite)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: mensagemDoUsuario }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Erro na API do Gemini (${response.status}): ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const respostaTexto = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return respostaTexto || 'Não foi possível obter resposta do Gemini.';
}

// ============================================================================
// 4. FUNÇÃO: Chamada para a API da OpenAI (Real ou Simulada)
// ============================================================================
async function chamarOpenAI(mensagemDoUsuario) {
  const apiKey = process.env.OPENAI_API_KEY;

  // Se tiver chave real da OpenAI no .env, faz a chamada real
  if (apiKey && apiKey !== 'sua_chave_da_openai_aqui') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: mensagemDoUsuario },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na OpenAI (${response.status})`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  }

  // Simulação didática para demonstrar o desacoplamento sem gastar créditos
  return `🤖 [Resposta da OpenAI (gpt-4o-mini)]:\nRecebi sua pergunta: "${mensagemDoUsuario}".\n\nNote que o front-end recebeu a resposta exatamente no mesmo formato, comprovando o desacoplamento: trocamos o provedor no server.js e o index.html nem percebeu a diferença!`;
}

// ============================================================================
// 5. FUNÇÃO: Chamada para a API da Anthropic (Real ou Simulada)
// ============================================================================
async function chamarAnthropic(mensagemDoUsuario) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey && apiKey !== 'sua_chave_da_anthropic_aqui') {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: mensagemDoUsuario },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na Anthropic (${response.status})`);
    }

    const data = await response.json();
    return data.content?.[0]?.text;
  }

  // Simulação didática
  return `🧠 [Resposta da Anthropic (Claude 3 Haiku)]:\nOlá! Recebi sua mensagem: "${mensagemDoUsuario}".\n\nComo você pode ver, a comunicação cliente-servidor continua 100% estável mesmo alternando para Claude, demonstrando uma arquitetura de baixo acoplamento!`;
}

// ============================================================================
// 6. ROTA PRINCIPAL: POST /api/chat
// ============================================================================
// O front-end (index.html) envia { message: "texto" } para esta rota.
// O back-end decide qual API externa chamar e devolve { reply: "...", provider: "..." }
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validação simples
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'A mensagem não pode estar vazia.' });
    }

    console.log(`\n📩 Nova mensagem recebida do front-end: "${message}"`);
    console.log(`⚙️ Provedor configurado: ${PROVIDER.toUpperCase()}`);

    let reply = '';

    // Escolhe o provedor configurado
    switch (PROVIDER.toLowerCase()) {
      case 'gemini':
        reply = await chamarGemini(message);
        break;
      case 'openai':
        reply = await chamarOpenAI(message);
        break;
      case 'anthropic':
        reply = await chamarAnthropic(message);
        break;
      default:
        return res.status(500).json({ error: `Provedor desconhecido: ${PROVIDER}` });
    }

    console.log(`✅ Resposta enviada com sucesso ao front-end pelo provedor [${PROVIDER}].`);

    // Retorna a resposta para o front-end
    return res.json({
      reply,
      provider: PROVIDER,
    });

  } catch (error) {
    console.error('❌ Erro no processamento:', error.message);
    return res.status(500).json({
      error: error.message || 'Erro interno no servidor ao processar resposta do LLM.',
      provider: PROVIDER,
    });
  }
});

// ============================================================================
// 7. INICIALIZAÇÃO DO SERVIDOR
// ============================================================================
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Servidor rodando com sucesso em: http://localhost:${PORT}`);
  console.log(`🤖 Provedor de LLM ativo: [${PROVIDER.toUpperCase()}]`);
  console.log('🔒 Chaves de API protegidas no servidor (.env)');
  console.log('====================================================');
});
