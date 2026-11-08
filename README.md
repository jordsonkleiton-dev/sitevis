# Sitevis

Site da VIS creative — Criatividade e poder. Feito com React + Vite.

> 🎬 Animações e VFX ficam na pasta [`vfx/`](vfx/README.md) (projeto separado, com Remotion).

## Como rodar no seu computador

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Como personalizar

- **Textos, serviços, preços, contatos:** edite `src/conteudo.js`
- **Cores:** edite as variáveis no topo de `src/styles.css`
- **Logo:** arquivos vetoriais (SVG) em `public/logo/`
- **WhatsApp:** troque `whatsapp` em `src/conteudo.js` (ex.: `5511987654321`)

## Publicar de graça (GitHub Pages)

1. No GitHub, vá em **Settings → Pages** e em *Source* escolha **GitHub Actions**.
2. Envie as mudanças para a branch `main`. O site é publicado automaticamente em
   `https://jordsonkleiton-dev.github.io/sitevis/`.

## Portfólio (criativos)

Coloque as imagens dos posts na pasta `public/portfolio/` com estes nomes:

- `clareza-antes-de-conversao.jpg`
- `super-poder.jpg`

Para adicionar mais criativos, inclua novos itens na lista `portfolio` em `src/conteudo.js`.

## Fontes da marca

- **Author** (Fontshare, grátis): textos e o "creative." da logo. Carregada de api.fontshare.com.
- **Play Pretend** (Chequered Ink): títulos de impacto, como "PODER." e "VIS". Arquivo em
  `src/assets/fonts/`. ⚠️ Não tem acentos — use só em palavras sem acento. Uso comercial
  exige licença da Chequered Ink (chequered.ink).
- **Montserrat Black** (Google Fonts): títulos grossos, como "CRIATIVIDADE".
