# VIS — VFX e animações

Animações da VIS creative feitas em código com [Remotion](https://www.remotion.dev)
(React → vídeo MP4). Fica separado do site: nada aqui vai para o GitHub Pages.

## Começar

```bash
cd vfx
npm install
npm run studio
```

O Studio abre no navegador (normalmente http://localhost:3000) com a prévia ao vivo
de cada animação. Edite o código e a prévia atualiza na hora.

## Gerar o vídeo

```bash
npm run render -- Abertura out/abertura.mp4
```

Os vídeos vão para `vfx/out/` (essa pasta não vai para o Git).
Para um quadro só, como imagem: `npm run still -- Abertura out/capa.png --frame=75`

## Organização

- `src/Raiz.jsx` — lista das animações (nome, tamanho, fps, duração)
- `src/composicoes/` — uma animação por arquivo (ex.: `Abertura.jsx`)
- `src/lib/marca.js` — cores e fontes da VIS
- `src/lib/Raio.jsx` — raio elétrico animado, reutilizável
- `public/` — logos (SVG) e fontes; use com `staticFile('logo/...')`

## Formatos prontos

| Animação           | Tamanho     | Uso                     |
| ------------------ | ----------- | ----------------------- |
| `Abertura`         | 1080 × 1920 | Reels, Stories, TikTok  |
| `AberturaQuadrada` | 1080 × 1080 | Feed                    |

Todas a 30 fps. Para criar uma nova: copie um arquivo de `src/composicoes/`
e registre em `src/Raiz.jsx`.

## Observações

- **Play Pretend** não tem acentos: use só em palavras sem acento.
- **Licença do Remotion:** grátis para pessoas físicas e empresas com até 3 pessoas.
  Acima disso, exige licença paga (remotion.dev/license).
- Sem internet para baixar o navegador do Remotion, aponte para um Chrome instalado:
  `REMOTION_BROWSER=/caminho/do/chrome npm run render -- Abertura out/abertura.mp4`
