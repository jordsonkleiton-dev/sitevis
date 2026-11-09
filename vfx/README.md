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
npm run exportar            # todas as animações
npm run exportar -- Branco  # só as que têm "Branco" no nome
```

Para cada animação sai um **MP4 com fundo verde** (para CapCut e qualquer editor)
e, no formato vertical, um **MOV com fundo transparente** (ProRes 4444, para
Premiere, After Effects e DaVinci). Os vídeos vão para `vfx/out/` (fora do Git).

O MP4 é gerado a partir de um mestre sem perda de cor e convertido com cuidado
nas bordas, o que deixa o recorte do verde mais limpo.

**Dica no CapCut:** depois do *Chroma key*, suba um pouco a **Sombra** para tirar
o fio de verde que pode sobrar no contorno.

## Animações

| Animação             | Tamanho     | Uso                    |
| -------------------- | ----------- | ---------------------- |
| `DiamanteVertical`   | 1080 × 1920 | Reels, Stories, TikTok |
| `DiamanteQuadrado`   | 1080 × 1080 | Feed                   |
| `DiamanteHorizontal` | 1920 × 1080 | YouTube, telas         |

Cada uma tem a versão **toda branca**: `DiamanteBrancoVertical`,
`DiamanteBrancoQuadrado` e `DiamanteBrancoHorizontal`. Nela, a linha de luz
final vira um corte que atravessa o diamante.

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
