import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { comprimentos, emTexto, trecho, varredura, zigueZague } from '../lib/geometria'
import { alturaDiamante, borda, centro, pecas } from '../lib/diamante'
import { cores } from '../lib/marca'

// Revelação do diamante VIS: uma faísca cai, explode em raios finos que
// voam pela tela e voltam desenhando o contorno de cada peça; a cor varre
// as peças e uma linha de luz passa pelo diamante.
// Feito para chroma key: sem brilho, sem desfoque e sem transparência.

const FUNDOS = { verde: '#00FF00', transparente: 'transparent' }

const IMPACTO = 30 // frame em que a faísca bate
const DURACAO_RAIO = 64
const ATRASO_CAUDA = 12
const ESPESSURA = 4.5
const DURACAO_COR = 18

const curvaRaio = Easing.bezier(0.45, 0, 0.15, 1)
const suave = Easing.bezier(0.33, 0, 0.2, 1)
const limitar = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }

const polar = (angulo, raio) => {
  const a = (angulo * Math.PI) / 180
  return [centro[0] + Math.cos(a) * raio, centro[1] + Math.sin(a) * raio]
}

// Raios que terminam desenhando uma peça
const RAIOS_PECA = [
  { peca: 'raioCima', de: 0, ate: 5, sentido: 1, angulo: -150, alcance: 720, atraso: 0, cor: cores.magenta, semente: 3 },
  { peca: 'raioCima', de: 0, ate: 5, sentido: -1, angulo: -35, alcance: 700, atraso: 3, cor: cores.magenta, semente: 8 },
  { peca: 'raioBaixo', de: 2, ate: 0, sentido: 1, angulo: 135, alcance: 680, atraso: 2, cor: cores.magenta, semente: 13 },
  { peca: 'raioBaixo', de: 2, ate: 0, sentido: -1, angulo: 50, alcance: 700, atraso: 5, cor: cores.magenta, semente: 21 },
  { peca: 'escuro', de: 2, ate: 2, sentido: 1, angulo: 165, alcance: 640, atraso: 7, cor: cores.magenta, semente: 34 },
  { peca: 'laranja', de: 3, ate: 3, sentido: -1, angulo: -175, alcance: 620, atraso: 9, cor: cores.laranjaClaro, semente: 55 },
].map((r) => {
  const contorno = borda(pecas[r.peca], r.de, r.ate, r.sentido)
  const voo = zigueZague(centro, polar(r.angulo, r.alcance), contorno[0], r.semente)
  const pts = [...voo, ...contorno.slice(1)]
  const cum = comprimentos(pts)
  return { ...r, pts, cum, voo: comprimentos(voo).at(-1), total: cum.at(-1) }
})

// Raios que só cruzam a tela e somem
const RAIOS_SOLTOS = [
  { angulo: -95, atraso: 0, cor: '#f3b6f5', semente: 89 },
  { angulo: 15, atraso: 2, cor: cores.laranjaClaro, semente: 144 },
  { angulo: 100, atraso: 4, cor: cores.magenta, semente: 233 },
  { angulo: -60, atraso: 6, cor: '#f3b6f5', semente: 377 },
].map((r) => {
  const pts = zigueZague(centro, polar(r.angulo + 30, 450), polar(r.angulo, 1100), r.semente)
  const cum = comprimentos(pts)
  return { ...r, pts, cum, voo: cum.at(-1), total: cum.at(-1) }
})

// Quando cada peça recebe cor (logo depois que o contorno fecha)
const inicioCor = (peca) =>
  Math.max(...RAIOS_PECA.filter((r) => r.peca === peca).map((r) => IMPACTO + r.atraso + DURACAO_RAIO)) - 6

// Direção em que a cor varre cada peça (de baixo para cima, ao longo da peça)
const DIRECAO_COR = {
  raioCima: [0.38, -0.92],
  raioBaixo: [0.22, -0.97],
  escuro: [0.42, -0.9],
  laranja: [0.4, -0.92],
}

function Linha({ raio, frame }) {
  const f = frame - IMPACTO - raio.atraso
  if (f < 0) return null
  const progresso = (t) => curvaRaio(interpolate(t, [0, DURACAO_RAIO], [0, 1], limitar))
  const cabeca = progresso(f) * raio.total
  const cauda = Math.min(progresso(f - ATRASO_CAUDA) * raio.total, raio.voo)
  // depois que a peça ganha cor, o contorno afina até sumir
  const fimCor = raio.peca ? inicioCor(raio.peca) + DURACAO_COR : null
  const espessura = fimCor === null ? ESPESSURA : interpolate(frame, [fimCor - 4, fimCor + 6], [ESPESSURA, 0], limitar)
  const d = trecho(raio.pts, raio.cum, cauda, cabeca)
  if (!d || cabeca - cauda < 1 || espessura <= 0) return null
  return <path d={d} fill="none" stroke={raio.cor} strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round" />
}

export const DiamanteRevelacao = ({ fundo = 'verde' }) => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()

  // Enquadramento: o diamante ocupa 62% do lado menor do vídeo
  const escala = (0.62 * Math.min(width, height)) / alturaDiamante
  const vbL = width / escala, vbA = height / escala
  const viewBox = `${centro[0] - vbL / 2} ${centro[1] - vbA / 2} ${vbL} ${vbA}`
  const topo = centro[1] - vbA / 2

  // 1. Faísca caindo com rastro
  const queda = interpolate(frame, [0, IMPACTO], [0, 1], { ...limitar, easing: Easing.in(Easing.cubic) })
  const yFaisca = interpolate(queda, [0, 1], [topo - 40, centro[1]])
  const rastro = interpolate(queda, [0, 0.4, 1], [0, 90, 220])
  const raioFaisca = interpolate(frame, [IMPACTO - 2, IMPACTO + 4], [7, 0], limitar)

  // 2. Anel do impacto
  const anel = interpolate(frame, [IMPACTO, IMPACTO + 22], [0, 1], { ...limitar, easing: Easing.out(Easing.cubic) })
  const espessuraAnel = interpolate(anel, [0, 1], [5, 0])

  // 4. Assentamento do diamante depois que todas as peças têm cor
  const fimCores = Math.max(...Object.keys(pecas).map(inicioCor)) + DURACAO_COR
  const pulso = interpolate(frame, [fimCores - 8, fimCores, fimCores + 20], [1, 1.035, 1], { ...limitar, easing: suave })

  // 5. Linha de luz atravessando o diamante
  const luz = interpolate(frame, [fimCores + 6, fimCores + 32], [0, 1], { ...limitar, easing: suave })

  return (
    <AbsoluteFill style={{ background: FUNDOS[fundo] ?? fundo }}>
      <svg viewBox={viewBox} width={width} height={height} shapeRendering="geometricPrecision">
        <defs>
          <linearGradient id="vis-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={cores.magenta} />
            <stop offset=".7" stopColor={cores.roxo} />
            <stop offset="1" stopColor="#7E006D" />
          </linearGradient>
          {Object.entries(pecas).map(([nome, pts]) => {
            const p = suave(interpolate(frame, [inicioCor(nome), inicioCor(nome) + DURACAO_COR], [0, 1], limitar))
            return (
              <clipPath key={nome} id={`cor-${nome}`}>
                <polygon points={emTexto(varredura(pts, DIRECAO_COR[nome], p))} />
              </clipPath>
            )
          })}
          <clipPath id="diamante">
            {Object.entries(pecas).map(([nome, pts]) => <polygon key={nome} points={emTexto(pts)} />)}
          </clipPath>
        </defs>

        {/* 1. faísca */}
        {frame < IMPACTO + 4 && (
          <g>
            <line x1={centro[0]} y1={yFaisca - rastro} x2={centro[0]} y2={yFaisca} stroke={cores.magenta}
              strokeWidth={3} strokeLinecap="round" />
            <circle cx={centro[0]} cy={yFaisca} r={raioFaisca} fill={cores.texto} />
          </g>
        )}

        {/* 2. anel do impacto */}
        {espessuraAnel > 0 && anel > 0 && (
          <circle cx={centro[0]} cy={centro[1]} r={anel * 90} fill="none" stroke={cores.texto} strokeWidth={espessuraAnel} />
        )}

        <g transform={`translate(${centro[0]} ${centro[1]}) scale(${pulso}) translate(${-centro[0]} ${-centro[1]})`}>
          {/* 4. cor varrendo cada peça */}
          {Object.entries(pecas).filter(([nome]) => frame > inicioCor(nome)).map(([nome, pts]) => (
            <polygon key={nome} points={emTexto(pts)} clipPath={`url(#cor-${nome})`}
              fill={nome === 'laranja' ? cores.laranja : nome === 'escuro' ? cores.roxoEscuro : 'url(#vis-g)'} />
          ))}

          {/* 3. raios que desenham o contorno */}
          {RAIOS_PECA.map((r, i) => <Linha key={i} raio={r} frame={frame} />)}

          {/* 5. linha de luz */}
          {luz > 0 && luz < 1 && (
            <g clipPath="url(#diamante)">
              <polygon fill={cores.texto} points={emTexto(faixaDeLuz(luz))} />
            </g>
          )}
        </g>

        {RAIOS_SOLTOS.map((r, i) => <Linha key={i} raio={r} frame={frame} />)}
      </svg>
    </AbsoluteFill>
  )
}

// Faixa fina inclinada que atravessa o diamante de baixo-esquerda para cima-direita
function faixaDeLuz(p) {
  const u = [0.5, -0.866] // direção do movimento
  const v = [0.866, 0.5] // direção da faixa
  const meio = interpolate(p, [0, 1], [-280, 280])
  const larg = 10, G = 600
  const pt = (s, t) => [centro[0] + u[0] * s + v[0] * t, centro[1] + u[1] * s + v[1] * t]
  return [pt(meio - larg, -G), pt(meio + larg, -G), pt(meio + larg, G), pt(meio - larg, G)]
}
