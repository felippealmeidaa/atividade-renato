# 🎓 ROTEIRO DE APRESENTAÇÃO - GRUPO 4 (LABORATÓRIO DO MINI CHAT)
> **Tema:** Comunicação Front-End/Back-End, System Prompt e Desacoplamento de Provedor de LLM  
> **Tempo total:** 10 minutos de apresentação + 3 minutos de perguntas da turma / prof. Renato  
> **Pontuação:** 6,0 pontos

---

## ⚡ RESUMO RELÂMPAGO (O QUE VOCÊ PRECISA SABER DE COR)

Se você esquecer de tudo na hora, lembre-se apenas destas **4 frases**:
1. *"O front-end (`index.html`) é burro por design: ele só envia o texto que o usuário digitou e mostra a resposta na tela."*
2. *"A API Key NUNCA pode ir no front-end, senão qualquer um aperta F12 e rouba a nossa chave e gasta nossos créditos."*
3. *"O back-end (`server.js`) é quem guarda a chave em segredo no `.env`, adiciona o System Prompt ('aja como um tutor amigável') e chama a IA."*
4. *"Desacoplamento significa que mudamos de Gemini para OpenAI mudando apenas 1 linha no servidor, sem que o front-end precise mudar nada!"*

---

## ⏱️ DISTRIBUIÇÃO DO TEMPO (10 MINUTOS)

| Minutos | O que fazer | Quem fala |
| :--- | :--- | :--- |
| **00:00 - 01:30** | Slides 1 e 2: Abertura e o grande problema da segurança | Integrante 1 |
| **01:30 - 03:30** | Slides 3 e 4: Arquitetura distribuída e código do Front-End | Integrante 2 |
| **03:30 - 05:30** | Slides 5 e 6: O papel do Back-End e o que é System Prompt | Integrante 3 (ou Felipe) |
| **05:30 - 08:30** | **DEMONSTRAÇÃO AO VIVO:** Chat funcionando e troca de provedor | Felipe |
| **08:30 - 10:00** | Slide 7 e 8: Desacoplamento explicado e Pergunta-Desafio | Todos |
| **10:00 - 13:00** | Perguntas do Professor Renato e da turma | Grupo |

*(Nota: O professor exige que **todos os integrantes falem** para ganhar a nota cheia de 0,6 pontos do critério de participação).*

---

## 📢 FALA SLIDE A SLIDE (EXATAMENTE O QUE DIZER)

### 📌 Slide 1: Capa (00:00 - 00:30)
> *"Boa noite, professor Renato, boa noite turma. Nós somos o Grupo 4 e ficamos responsáveis pelo Laboratório do Mini Chat. Hoje nós vamos mostrar como um front-end em HTML conversa com um back-end em Node.js e como nos comunicamos com um LLM — no nosso caso prático, o Google Gemini — de forma segura e desacoplada."*

---

### 📌 Slide 2: Por que NÃO chamar o LLM direto do Front-End? (00:30 - 01:30)
> *"Para começar, a primeira pergunta que qualquer aluno de desenvolvimento web se faz é: 'Por que eu não posso fazer um `fetch` direto do `index.html` para a API da Google ou da OpenAI?'*  
> *A resposta é a Regra de Ouro: **Segurança**. Qualquer código que roda no navegador do usuário pode ser lido. Se colocarmos a nossa API Key no JavaScript do front-end, basta o usuário apertar F12, inspecionar o código e copiar a nossa chave privada, gastando todo o nosso limite financeiro.*  
> *Além disso, se a gente chamasse o LLM direto do front-end, nosso site ficaria fortemente acoplado àquela empresa específica. Se o provedor mudasse a API, teríamos que refazer todo o nosso site."*

---

### 📌 Slide 3: Arquitetura do Sistema Distribuído (01:30 - 02:30)
> *"Para resolver isso, montamos uma arquitetura de sistema distribuído com 3 partes bem definidas:*  
> *1. O **Cliente** (navegador do usuário com `index.html`).*  
> *2. O **Servidor Intermediário** (`server.js` em Node.js e Express).*  
> *3. A **Nuvem do LLM** (os servidores da Google com a API do Gemini).*  
> *O navegador só fala com o nosso servidor através de uma requisição HTTP POST para a rota `/api/chat`, enviando um JSON simples: `{ message: "texto" }`. É o nosso servidor que tem o trabalho de conversar com a inteligência artificial lá fora."*

---

### 📌 Slide 4: O Front-End (`index.html`) (02:30 - 03:30)
> *"O nosso front-end foi construído da maneira mais limpa e didática possível: apenas HTML, CSS e JavaScript puro, sem nenhum framework pesado.*  
> *Quando o usuário digita a pergunta e clica em 'Enviar', o JavaScript captura o texto e usa a função `fetch()` nativa para enviar os dados ao nosso back-end.*  
> *Reparem que o front-end é completamente neutro: ele não tem ideia se quem vai responder é o Gemini, o ChatGPT ou o Claude. Ele só espera receber de volta um JSON com a resposta formatada."*

---

### 📌 Slide 5: O Back-End (`server.js`) (03:30 - 04:30)
> *"Agora chegamos no coração do sistema: o `server.js`.*  
> *O back-end atua como um 'porteiro seguro' ou proxy reverso. Ele faz três coisas fundamentais:*  
> *Primeiro: ele lê a nossa API Key de um arquivo secreto chamado `.env`, usando a biblioteca `dotenv`. Esse arquivo está registrado no `.gitignore`, garantindo que a chave nunca seja enviada para o GitHub.*  
> *Segundo: ele recebe a mensagem do usuário e combina com as nossas instruções internas.*  
> *Terceiro: ele faz a requisição autenticada para o Gemini e devolve apenas o texto pronto para o navegador."*

---

### 📌 Slide 6: O que é o System Prompt? (04:30 - 05:30)
> *"Um dos requisitos da atividade é o **System Prompt**. O que é isso?*  
> *É uma instrução prévia que nós damos para o modelo antes de começar qualquer conversa, definindo quem ele é e como ele deve se comportar.*  
> *No nosso código, configuramos o seguinte System Prompt:*  
> *'Você é um assistente acadêmico amigável e didático na aula de Desenvolvimento Web do professor Renato. Responda de forma clara e em português brasileiro.'*  
> *E o mais importante: esse System Prompt fica escondido no back-end! O usuário que está usando o chat não consegue alterar essa regra, evitando que a IA saia do controle."*

---

### 💻 MOMENTO DA DEMONSTRAÇÃO PRÁTICA AO VIVO (05:30 - 08:30)
*(Aqui você sai dos slides e vai para o navegador com o chat aberto em `http://localhost:3000`)*

1. **Passo 1 (Mostrar funcionando):**
   > *"Agora vamos ver o sistema rodando na prática.*  
   > *(Clique no botão sugerido ou digite: 'O que é um sistema distribuído?')*  
   > *Vejam: cliquei em enviar, o back-end processou e o Google Gemini respondeu instantaneamente! Reparem na tag abaixo da mensagem: 'Provedor: gemini'."*

2. **Passo 2 (Mostrar o System Prompt funcionando):**
   > *"Vamos testar se o System Prompt está valendo? Vou perguntar: 'Quem é o seu professor?'*  
   > *(A IA responderá mencionando o professor Renato ou a aula de Desenvolvimento Web)*  
   > *Isso prova que a IA foi condicionada pelo nosso back-end."*

3. **Passo 3 (O Grand Finale: Demonstrar o Desacoplamento):**
   > *"Agora vem o requisito principal do Grupo 4: a troca de provedor.*  
   > *Imaginem que a nossa empresa decidiu trocar do Google Gemini para a OpenAI. Será que precisamos reescrever o front-end?*  
   > *(Abra o arquivo `.env` ou `server.js` na frente da turma e mude `PROVIDER=openai`)*  
   > *Vejam: alteramos apenas essa variável no back-end. Salvamos e reiniciamos.*  
   > *(Volte para o navegador, faça uma nova pergunta e mostre a resposta)*  
   > *Olhem a mágica: a resposta agora veio com o formato da OpenAI, e o nosso `index.html` não precisou ser alterado em absolutamente nada! Isso é o que a engenharia de software chama de **baixo acoplamento**!"*

---

### 📌 Slide 7: Desacoplamento Explicado (08:30 - 09:15)
> *"Voltando para o resumo: o que acabamos de provar na tela é o conceito de desacoplamento. Criamos um contrato de interface entre o cliente e o servidor. Enquanto o contrato for respeitado, podemos trocar de banco de dados, trocar de provedor de nuvem ou trocar de modelo de IA nos bastidores sem nunca impactar o usuário final."*

---

### 📌 Slide 8: Pergunta-Desafio para a Turma (09:15 - 10:00)
> *"Para encerrar nossa apresentação e cumprir o último requisito da atividade, temos uma pergunta-desafio para a turma valendo moral:*  
>  
> ❓ **'Se um desenvolvedor colocar a API Key diretamente no JavaScript do front-end (`index.html`), o que qualquer pessoa precisa fazer para roubar essa chave?'**  
>  
> *(Espere 5 segundos para alguém da sala responder)*  
>  
> *Exatamente! Basta abrir o DevTools apertando F12, olhar a aba 'Sources' ou 'Network' e copiar a chave que está lá em texto puro. Por isso a regra de ouro é: **Chave de API de LLM sempre mora no back-end!** Muito obrigado!"*

---

## 🎯 POSSÍVEIS PERGUNTAS DO PROFESSOR RENATO E COMO RESPONDER

### 1. "O que acontece se a chave vazar por engano no GitHub?"
- **Resposta:** *"Professor, a primeira atitude imediata é revogar a chave no painel do provedor (no caso, o Google AI Studio). Chave revogada perde o acesso na hora. Em seguida, limpamos o histórico do Git e conferimos se o `.env` está dentro do `.gitignore`."*

### 2. "Por que vocês usaram Express no back-end em vez de chamar direto?"
- **Resposta:** *"O Express nos dá um servidor web leve e modular. Ele nos permitiu criar a rota `POST /api/chat`, receber o corpo da requisição em formato JSON, injetar o System Prompt com a chave protegida e servir os arquivos estáticos do front-end."*

### 3. "Qual a diferença entre o modelo da OpenAI e do Gemini na requisição?"
- **Resposta:** *"O payload do body é um pouco diferente: a OpenAI usa um array `messages` com papéis `system` e `user`. O Gemini usa `system_instruction` e um array `contents` com `parts`. O mérito do nosso back-end é exatamente traduzir isso de forma transparente para que o front-end receba sempre o mesmo formato padronizado `{ reply: '...' }`."*

### 4. "O que significa 'rate limit' que o Grupo 3 citou?"
- **Resposta:** *"Rate limit é o limite de requisições por minuto que a API do provedor permite. Com o back-end centralizando as chamadas, podemos no futuro criar uma fila ou cache para evitar estourar esse limite, algo impossível se cada usuário chamasse direto do front-end."*
