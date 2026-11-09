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

## Gerar os vídeos

```bash
# Fundo verde (chroma key) — para CapCut e qualquer editor
npm run render -- DiamanteVertical out/diamante-vertical-verde.mp4 --crf=14

# Fundo transparente (ProRes 4444) — Premiere, After Effects, DaVinci
npm run render -- DiamanteVertical out/diamante-vertical-transparente.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --props='{"fundo":"transparente"}'
```

Os vídeos vão para `vfx/out/` (essa pasta não vai para o Git).

## Animações

| Animação             | Tamanho     | Uso                    |
| -------------------- | ----------- | ---------------------- |
| `DiamanteVertical`   | 1080 × 1920 | Reels, Stories, TikTok |
| `DiamanteQuadrado`   | 1080 × 1080 | Feed                   |
| `DiamanteHorizontal` | 1920 × 1080 | YouTube, telas         |

60 fps, 4 segundos. Roteiro: faísca cai → explode em raios → os raios voltam
desenhando o contorno de cada peça → a cor varre as peças → linha de luz →
diamante parado por ~1,5 s.

### Regras para o chroma key ficar limpo

- Nada de brilho, desfoque ou transparência sobre o fundo verde.
- Linhas finas só em cores vivas (magenta, rosa, laranja) e nunca mais finas
  que `ESPESSURA_MINIMA` (~6 px): abaixo disso a compressão do MP4 mistura a
  linha com o verde e ela fica esverdeada no recorte.
- Nenhuma cor verde na animação.

## Organização

- `src/Raiz.jsx` — lista das animações (nome, tamanho, fps, duração)
- `src/composicoes/DiamanteRevelacao.jsx` — a revelação do diamante (tempos no topo do arquivo)
- `src/lib/diamante.js` — peças do diamante (mesmas coordenadas da logo)
- `src/lib/geometria.js` — raio fractal, galhos, linhas que se desenham, varredura de cor
- `src/lib/marca.js` — cores e fontes da VIS
- `public/` — logos (SVG) e fontes; use com `staticFile('logo/...')`

## Observações

- **Play Pretend** não tem acentos: use só em palavras sem acento.
- **Licença do Remotion:** grátis para pessoas físicas e empresas com até 3 pessoas.
  Acima disso, exige licença paga (remotion.dev/license).
- Sem internet para baixar o navegador do Remotion, aponte para um Chrome instalado:
  `REMOTION_BROWSER=/caminho/do/chrome npm run render -- DiamanteVertical out/diamante.mp4`
