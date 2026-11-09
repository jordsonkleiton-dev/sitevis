// Exporta todas as animações:
//  - MP4 com fundo verde (chroma key), convertido com cuidado na cor das bordas
//  - MOV ProRes 4444 com fundo transparente (só no formato vertical)
// Uso: npm run exportar            (tudo)
//      npm run exportar -- Branco  (só as composições cujo nome contém "Branco")
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'

const COMPOSICOES = [
  ['DiamanteVertical', 'diamante-vertical'],
  ['DiamanteQuadrado', 'diamante-quadrado'],
  ['DiamanteHorizontal', 'diamante-horizontal'],
  ['DiamanteBrancoVertical', 'diamante-branco-vertical'],
  ['DiamanteBrancoQuadrado', 'diamante-branco-quadrado'],
  ['DiamanteBrancoHorizontal', 'diamante-branco-horizontal'],
]
const filtro = process.argv[2]
const rodar = (args) => execFileSync('npx', args, { stdio: ['ignore', 'ignore', 'inherit'] })

mkdirSync('out/tmp', { recursive: true })
for (const [id, nome] of COMPOSICOES) {
  if (filtro && !id.includes(filtro)) continue
  console.log(`▶ ${id}`)
  const mestre = `out/tmp/${nome}.mov`
  // 1. mestre sem perda de cor (4:4:4)
  rodar(['remotion', 'render', id, mestre, '--codec=prores', '--prores-profile=4444', '--image-format=png', '--pixel-format=yuv444p10le'])
  // 2. MP4 compatível com qualquer editor (CapCut incluso)
  rodar(['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-i', mestre,
    '-vf', 'scale=flags=lanczos+accurate_rnd+full_chroma_int+full_chroma_inp:out_color_matrix=bt709:out_range=tv,format=yuv420p',
    '-c:v', 'libx264', '-crf', '12', '-preset', 'slow',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart',
    `out/${nome}-verde.mp4`])
  // 3. versão transparente (vertical)
  if (id.endsWith('Vertical')) {
    rodar(['remotion', 'render', id, `out/${nome}-transparente.mov`, '--codec=prores', '--prores-profile=4444',
      '--image-format=png', '--pixel-format=yuva444p10le', `--props=${JSON.stringify({ fundo: 'transparente' })}`])
  }
}
rmSync('out/tmp', { recursive: true, force: true })
console.log('✔ Pronto: vídeos em vfx/out/')
