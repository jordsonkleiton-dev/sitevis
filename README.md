# Sitevis

Site da VIS creative — Criatividade e poder. Feito com React + Vite.

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
