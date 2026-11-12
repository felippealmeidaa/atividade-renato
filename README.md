# Mini Chat com LLM em Sistemas Distribuídos

Aplicação web que demonstra a arquitetura cliente-servidor para integração e consumo de APIs de Modelos de Linguagem de Larga Escala (LLMs), com foco em segurança de credenciais e baixo acoplamento.

---

## 🏗️ Arquitetura

O sistema é dividido em três camadas independentes:

```
[ Navegador (index.html) ]
           │
           │  POST /api/chat (JSON: { message })
           ▼
[ Back-End (server.js - Node.js) ]
           │
           │  Chamada autenticada com API Key (.env) + System Prompt
           ▼
[ API Externa do LLM (Google Gemini / OpenAI / Anthropic) ]
```

1. **Front-End (`public/index.html`):** Interface construída com HTML5, CSS3 e JavaScript puro. Comunica-se exclusivamente com a API local, desconhecendo qual provedor de IA está em operação.
2. **Back-End (`server.js`):** Servidor Node.js que atua como proxy reverso seguro. Responsável por armazenar as credenciais, injetar as regras de conduta (*System Prompt*) e padronizar o payload enviado ao cliente.
3. **Provedor de LLM:** API externa (Google Gemini em produção, com suporte configurável para OpenAI e Anthropic).

---

## 📁 Estrutura de Arquivos

```text
atividaderenato/
├── public/
│   └── index.html       # Interface web do chat (Front-end)
├── server.js            # Servidor HTTP e integração com as APIs (Back-end)
├── slides.html          # Apresentação do projeto (executável no navegador)
├── package.json         # Manifesto de dependências do Node.js
├── .env.example         # Exemplo das variáveis de ambiente necessárias
├── .gitignore           # Regras de exclusão para o controle de versão
└── README.md            # Documentação do projeto
```

---

## 🚀 Como Executar

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

### 2. Instalação das Dependências
Clone o repositório e instale as dependências:
```bash
npm install
```

### 3. Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto a partir do modelo `.env.example`:
```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux / Mac
cp .env.example .env
```

Abra o arquivo `.env` e configure sua chave de API:
```env
PORT=3000
PROVIDER=gemini
GEMINI_API_KEY=sua_chave_do_gemini_aqui
```

### 4. Inicialização
Inicie a aplicação:
```bash
npm start
```

Acesse no navegador:
- **Chat:** `http://localhost:3000`
- **Slides:** `http://localhost:3000/slides`

---

## 🧩 Alternando o Provedor (Desacoplamento)

Para demonstrar o baixo acoplamento entre as camadas, o provedor pode ser alterado apenas na configuração do servidor, sem qualquer modificação no código do front-end:

No arquivo `.env`, altere o valor da variável `PROVIDER`:
- `PROVIDER=gemini` — Utiliza a API real do Google Gemini.
- `PROVIDER=openai` — Alterna para o formato da OpenAI.
- `PROVIDER=anthropic` — Alterna para o formato da Anthropic.

Reinicie o servidor (`npm start`) para aplicar a alteração.

---

## 🔒 Segurança

- As chaves de API são armazenadas exclusivamente no arquivo `.env` no servidor e nunca são expostas ao navegador do cliente.
- O arquivo `.env` está listado no `.gitignore`, evitando que credenciais sejam versionadas no repositório.
