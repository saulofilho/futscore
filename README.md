# ⚽ FutScore — Futebol em Tempo Real & Central Esportiva

<div align="center">

![FutScore Social Thumbnail](./public/og-image.svg)

[![Deploy to GitHub Pages](https://github.com/actions/workflows/deploy.yml/badge.svg)](https://github.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-00ff88)](#licença)

**Acompanhe resultados ao vivo, estatísticas aprofundadas, classificação de ligas mundiais, mercado da bola, história dos clubes e notificações instantâneas.**

[🌐 Ver Demonstração](#-deploy-no-github-pages) • [✨ Funcionalidades](#-funcionalidades) • [🚀 Como Executar](#-como-executar-o-projeto) • [🖼️ Ícones e Compartilhamento](#-ícones-e-social-share-thumbnail)

</div>

---

## 📌 Visão Geral

O **FutScore** é uma plataforma moderna e responsiva desenvolvida para os amantes de futebol. Com design esportivo escuro de alta legibilidade, toques de neon esmeralda (`#00ff88`) e tipografia moderna, a aplicação entrega uma experiência imersiva para acompanhar campeonatos do Brasil e do mundo tanto no desktop quanto no mobile.

---

## ✨ Funcionalidades

- **🔴 Resultados e Placares ao Vivo (Live Scores):**
  - Ticker horizontal superior com partidas em andamento e atualizações instantâneas.
  - Filtro ágil por status: *Todos*, *Ao Vivo*, *Encerrados*, *Agendados* e *Meus Favoritos*.
  - Filtro por liga (Brasileirão Série A, Champions League, Premier League, La Liga, etc.).

- **📅 Calendário Inteligente Multidatas:**
  - Seletor diário com atalho para o dia atual ("HOJE") e modal com visão mensal completa.
  - Indicadores de quantidade de partidas por dia.

- **📺 Guia Onde Assistir (TV & Streaming):**
  - Informações de transmissão oficial para cada partida: *TV Globo*, *SporTV*, *Premiere*, *CazéTV*, *ESPN*, *Disney+*, *TNT Sports*, *Max*, *Paramount+* e *Canal GOAT*.
  - Filtro por emissora e plataforma de streaming tanto no desktop quanto no celular.
  - Widget exclusivo "Guia de Transmissão de Hoje" na barra lateral e aba completa no modal do jogo.

- **⚡ Escalações Aprofundadas, Tática & Desfalques:**
  - Campo tático visual e lista detalhada com 11 titulares, formação tática e notas de desempenho.
  - Banco de reservas completo e numerado.
  - **Boletim Médico & Desfalques:** lista de atletas lesionados, suspensos ou em dúvida com diagnóstico detalhado.
  - **Equipe de Arbitragem Oficial:** Árbitro Principal FIFA/CBF, Assistentes (bandeirinhas 1 e 2), 4º Árbitro e equipe de VAR/AVAR.
  - Comissão técnica completa (Técnicos, Auxiliares e Preparadores Físicos).

- **🌟 Central de Craques & Perfil Completo de Atletas:**
  - Nova aba "ATLETAS" com busca inteligente, filtros por posição e nacionalidade, e ordenação por valor de mercado, gols ou notas.
  - Ficha técnica aprofundada: idade, data/local de nascimento, altura, peso, pé preferido, contrato e valor de mercado em Euros (€) e Reais (R$).
  - Estatísticas detalhadas na temporada (gols, assistências, notas, minutos, xG, pontaria, finalizações e defesas).
  - Trajetória e histórico de clubes com anos, partidas disputadas e títulos conquistados.
  - Galeria de troféus e análise do estilo de jogo do atleta.
  - Acesso direto clicando no nome de qualquer jogador nas escalações, gols ou rankings!

- **🛡️ Mais Informações dos Clubes (Plantel & Temporada):**
  - **Elenco Completo da Temporada:** atletas agrupados por posição (Goleiros, Defensores, Meio-Campistas e Atacantes) com valor de mercado, idade e contrato.
  - **Desempenho Atual:** aproveitamento %, retrospecto dos últimos 5 jogos (V-V-E-V-D), gols pró/contra, jogos sem sofrer gol, artilheiro e líder em assistências.
  - **Estádio e Uniformes:** tipo de gramado (grama natural ou sintética FIFA), recordes de público, endereço completo e kits de uniformes oficiais (titular, reserva e fornecedora).

- **🔔 Central de Notificações & Alertas:**
  - Notificações na tela (toast) para gols, início/fim de jogo e cartões.
  - Alternância de efeitos sonoros (apito do árbitro e som de gol em áudio sintetizado Web Audio API).
  - Simulador integrado para testar disparos de eventos e notificações em tempo real.

- **📲 Botão Nativo de Compartilhamento:**
  - Compartilhe partidas e links diretamente via Web Share API (WhatsApp, Telegram, Twitter, redes sociais) ou cópia instantânea para a área de transferência com feedback visual.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.
- [npm](https://www.npmjs.com/) ou [bun](https://bun.sh/).

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/<seu-usuario>/futscore.git

# 2. Acesse a pasta do projeto
cd futscore

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra seu navegador em [http://localhost:3000](http://localhost:3000) (ou na porta indicada no terminal).

---

## 🌐 Deploy no GitHub Pages

O projeto está 100% preparado para ser publicado no **GitHub Pages** de forma automática ou manual, utilizando caminhos relativos de assets (`base: './'`).

### Opção 1: Deploy Automático via GitHub Actions (Recomendado)

O repositório já inclui o arquivo de automação `.github/workflows/deploy.yml`.

1. Suba seu código para um repositório no GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: FutScore initial release"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/<seu-repositorio>.git
   git push -u origin main
   ```
2. No seu repositório no GitHub, acesse:
   - **Settings** > **Pages**
   - Em **Build and deployment > Source**, selecione **GitHub Actions**.
3. A cada `git push` na branch `main`, a Action construirá a aplicação e fará o deploy automático! Sua aplicação ficará disponível em:
   `https://<seu-usuario>.github.io/<seu-repositorio>/`

---

### Opção 2: Deploy Manual via linha de comando (`gh-pages`)

Você também pode publicar manualmente usando o script já incluído:

```bash
npm run deploy
```

Este comando gera o build otimizado na pasta `dist` e envia diretamente para a branch `gh-pages` do seu repositório.

---

## 🖼️ Ícones e Social Share Thumbnail

O projeto possui ativos visuais modernos e configurados para indexação (SEO) e compartilhamento em redes sociais:

| Recurso | Caminho | Descrição |
| :--- | :--- | :--- |
| **Favicon** | `/public/favicon.svg` | Bola de futebol estilizada em SVG com anel neon `#00ff88` |
| **Apple Touch Icon** | `/public/apple-touch-icon.svg` | Ícone para tela inicial do iPhone / iPad |
| **PWA Manifest** | `/public/site.webmanifest` | Configuração para instalação como Progressive Web App |
| **Share Thumbnail** | `/public/og-image.svg` | Imagem OpenGraph 1200x630 para cards sociais (WhatsApp, Twitter, LinkedIn, Facebook, Discord) |

### Tags Meta no `index.html`

- `og:image`: `./og-image.svg` (com dimensões 1200x630 e tipo `image/svg+xml`)
- `twitter:card`: `summary_large_image`
- `twitter:image`: `./og-image.svg`
- `theme-color`: `#00ff88`
- Schema estruturado `WebApplication` (SportsApplication) via JSON-LD.

---

## 🔌 Conexão com Dados Reais de Futebol

O aplicativo possui uma camada dupla de dados:

1. **Snapshot de Dados Reais de Alta Fidelidade (`src/data/realFootballSnapshot.ts`):**
   - Dados detalhados de rodadas de ligas com confrontos reais, escalações, minutos e gols.
   - Funciona instantaneamente sem necessidade de cadastrar chave de API.

2. **Integração com API Externa (opcional):**
   - Você pode conectar uma chave de API própria (como [football-data.org](https://www.football-data.org/)) definindo no arquivo `.env`:
     ```env
     VITE_FOOTBALL_API_KEY=sua_chave_aqui
     ```
   - O serviço `src/services/footballApi.ts` faz as requisições em tempo real e armazena em cache para otimizar a cota de requisições.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 6](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Áudio:** Web Audio API (apito e som de gol sintetizados)

---

## 📁 Estrutura do Projeto

```text
futscore/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Pipeline CI/CD para GitHub Pages
├── public/
│   ├── favicon.svg               # Ícone do navegador (SVG)
│   ├── icon.svg                  # Ícone para web/mobile
│   ├── apple-touch-icon.svg      # Ícone touch iOS
│   ├── site.webmanifest          # Manifesto PWA
│   └── og-image.svg              # Miniatura de compartilhamento (1200x630)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Navegação, filtros, som e botão Compartilhar
│   │   ├── LiveTicker.tsx        # Ticker horizontal de jogos em tempo real
│   │   ├── MatchCalendar.tsx     # Barra e modal do calendário de partidas
│   │   ├── MatchCard.tsx         # Cartão individual do jogo
│   │   ├── MatchDetailModal.tsx  # Modal com estatísticas, gols e escalações
│   │   ├── LeagueStandingsTable.tsx # Tabela de classificação responsiva
│   │   ├── MarketNewsView.tsx    # Mercado da bola e notícias
│   │   ├── TeamsCatalog.tsx      # Catálogo e história dos clubes
│   │   ├── TeamHistoryModal.tsx  # Modal detalhado do clube
│   │   ├── NotificationModal.tsx # Central de preferências de notificações
│   │   └── NotificationToast.tsx # Alertas dinâmicos de gol e lances
│   ├── data/
│   │   └── realFootballSnapshot.ts # Dados reais de partidas e classificação
│   ├── services/
│   │   ├── footballApi.ts        # Integração e fetch com APIs de futebol
│   │   └── soundEffects.ts       # Sintetizador de áudio de apito e gol
│   ├── types.ts                  # Tipagens TypeScript do sistema
│   ├── App.tsx                   # Componente raiz e sincronização de estado
│   ├── index.css                 # Estilos globais e utilitários Tailwind
│   └── main.tsx                  # Ponto de entrada React
├── index.html                    # HTML com meta tags SEO, favicon e OpenGraph
├── package.json                  # Scripts e dependências
├── tsconfig.json                 # Configurações TypeScript
└── vite.config.ts                # Configuração do Vite com base relativa
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
