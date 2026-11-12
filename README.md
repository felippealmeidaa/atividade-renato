# 💬 Mini Chat com LLM em Sistemas Distribuídos
> **Disciplina:** Desenvolvimento Web | **Professor:** Renato  
> **Atividade:** Sala de Aula Invertida (6,0 pontos)  
> **Tema do Grupo 4:** Laboratório do mini chat (Comunicação Front-End & Back-End, System Prompt e Desacoplamento de Provedor)

---

## 🎯 Objetivo do Projeto
Demonstrar na prática como uma aplicação web moderna consome Modelos de Linguagem de Larga Escala (LLMs) em uma arquitetura de sistemas distribuídos:
1. **Comunicação Cliente-Servidor:** Como o navegador (`index.html`) se comunica com o servidor Node.js (`server.js`) via HTTP POST com payload JSON.
2. **Segurança de API Key:** Proteger a chave secreta no servidor (`.env`), impedindo que fique visível no código-fonte do cliente (DevTools/F12).
3. **Injeção de System Prompt:** Definir a identidade e regras de conduta da IA diretamente no back-end.
4. **Baixo Acoplamento:** Demonstrar que podemos alternar de provedor (de Google Gemini para OpenAI ou Anthropic) alterando **apenas 1 linha no back-end**, mantendo o front-end 100% intocado.

---

## 🏗️ Arquitetura do Sistema Distribuído

```
┌─────────────────────────┐          ┌─────────────────────────┐          ┌─────────────────────────┐
│     1. Navegador        │          │   2. Servidor Node.js   │          │   3. API do Provedor    │
│    (Cliente Web)        │          │       (Back-End)        │          │      (Nuvem LLM)        │
│                         │          │                         │          │                         │
│   public/index.html     │          │        server.js        │          │   Google Gemini API     │
│                         │  POST    │                         │  POST    │   (ou OpenAI/Claude)    │
│  - Input de texto       │ ───────> │  - Recebe { message }   │ ───────> │                         │
│  - fetch('/api/chat')   │  JSON    │  - Aplica System Prompt │  HTTPS   │  - Processa inteligência│
│  - Renderiza resposta   │ <─────── │  - Injeta Chave (.env)  │ <─────── │  - Devolve texto        │
│                         │  {reply} │  - Devolve para o front │  JSON    │                         │
└─────────────────────────┘          └─────────────────────────┘          └─────────────────────────┘
```

---

## 📁 Estrutura de Arquivos

```text
atividaderenato/
├── public/
│   └── index.html         # Front-end minimalista (HTML5, CSS3, Fetch API)
├── server.js              # Back-end Node.js (Express, CORS, Dotenv, Fetch nativo)
├── package.json           # Dependências do projeto (express, dotenv, cors)
├── .env.example           # Modelo de configuração das variáveis de ambiente
├── .gitignore             # Garante que .env e node_modules NÃO subam para o GitHub
├── slides.html            # Apresentação completa em 8 slides (executável no navegador)
├── ROTEIRO_APRESENTACAO.md # Guia passo a passo para a fala de 10 minutos
└── README.md              # Documentação oficial do projeto
```

---

## 🚀 Como Executar o Projeto Passo a Passo

### 1. Pré-requisitos
- Ter o **Node.js** instalado na máquina (versão 18 ou superior).

### 2. Instalar as dependências
Abra o terminal na pasta do projeto e execute:
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
# No Windows PowerShell:
Copy-Item .env.example .env

# Ou no Linux/Mac:
cp .env.example .env
```

Abra o arquivo `.env` e adicione sua chave de API do **Google Gemini**:
```env
PORT=3000
PROVIDER=gemini
GEMINI_API_KEY=sua_chave_real_do_gemini_aqui
```
> 💡 *Você pode obter sua chave de API gratuitamente em: [Google AI Studio](https://aistudio.google.com/)*

### 4. Iniciar o servidor
Execute o comando:
```bash
npm start
```

### 5. Acessar no navegador
Abra seu navegador e acesse:
- **Chat em execução:** [http://localhost:3000](http://localhost:3000)
- **Slides da apresentação:** Basta abrir o arquivo `slides.html` diretamente no navegador (dois cliques).

---

## 🧩 Testando o Desacoplamento (Troca de Provedor)

Para demonstrar ao professor e à turma o desacoplamento na prática:

1. Abra o arquivo `.env` (ou a linha 25 de `server.js`).
2. Altere a variável `PROVIDER`:
   ```env
   PROVIDER=openai
   ```
3. Reinicie o servidor (`npm start`).
4. Volte ao navegador, faça uma pergunta e veja que a resposta agora veio da OpenAI, **sem que o arquivo `public/index.html` precisasse ser alterado em uma única vírgula**!

---

## 🔒 Regra de Ouro da Segurança
- **A API Key NUNCA aparece no front-end:** Se colocada no `index.html`, qualquer usuário conseguiria inspecioná-la via DevTools (`F12`) e roubar os créditos da conta.
- **`.env` sempre no `.gitignore`:** O arquivo `.env` nunca deve ser versionado no GitHub. O repositório contém apenas `.env.example`.
- **Se a chave vazar:** Acesse imediatamente o painel do Google AI Studio e faça a revogação (*Revoke*).

---

## ❓ Pergunta-Desafio para a Turma (Final da Apresentação)
> *"Se um desenvolvedor colocar a API Key diretamente no código JavaScript do front-end (`index.html`), o que um usuário mal-intencionado precisa fazer para roubar essa chave e esgotar os créditos da conta?"*

**Resposta:** Basta abrir a ferramenta de desenvolvedor do navegador (tecla `F12`), acessar a aba *Sources* ou *Network* e copiar a chave que trafega em texto puro. Por isso, toda comunicação com LLM pago deve ser intermediada por um servidor back-end.

---

## 👥 Integrantes - Grupo 4
- Felipe e Equipe
- **Disciplina:** Desenvolvimento Web - Prof. Renato
