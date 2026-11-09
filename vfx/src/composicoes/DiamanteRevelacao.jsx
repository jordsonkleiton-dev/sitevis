import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { aleatorio, comprimentos, direcaoEm, emTexto, pedacos, pontoEm, raioFractal, varredura } from '../lib/geometria'
import { alturaDiamante, borda, centro, pecas } from '../lib/diamante'
import { cores } from '../lib/marca'

// Revelação do diamante VIS: uma faísca cai, explode em raios finos que
// voam pela tela e voltam desenhando o contorno de cada peça; a cor varre
// as peças e uma linha de luz passa pelo diamante.
// Feito para chroma key: sem brilho, sem desfoque e sem transparência.

const FUNDOS = { verde: '#00FF00', transparente: 'transparent' }
const BRANCO = cores.texto

const IMPACTO = 30 // frame em que a faísca bate
const DURACAO_RAIO = 64
const ATRASO_CAUDA = 12
const ESPESSURA = 6.4 // espessura na ponta do raio
// Linhas mais finas que isso ficam esverdeadas no recorte (compressão do MP4)
const ESPESSURA_MINIMA = 3.6
const AFINAMENTO = 160 // quanto do raio, a partir da cauda, vai afinando
const DURACAO_COR = 18

const curvaRaio = Easing.bezier(0.45, 0, 0.15, 1)
const suave = Easing.bezier(0.33, 0, 0.2, 1)
const limitar = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const progresso = (t) => curvaRaio(interpolate(t, [0, DURACAO_RAIO], [0, 1], limitar))

const polar = (angulo, raio, de = centro) => {
  const a = (angulo * Math.PI) / 180
  return [de[0] + Math.cos(a) * raio, de[1] + Math.sin(a) * raio]
}

// Frame (relativo ao início do raio) em que a ponta passa pela distância d
const quandoPassa = (raio, d) => {
  for (let t = 0; t <= DURACAO_RAIO; t += 0.25) if (progresso(t) * raio.total >= d) return t
  return DURACAO_RAIO
}

// Galhos: pequenas ramificações que nascem quando a ponta passa e somem rápido
function criarGalhos(raio, ate) {
  const r = aleatorio(raio.semente * 7 + 1)
  return [0.28, 0.5, 0.7].map((frac, k) => {
    const d = ate * (frac + (r() - 0.5) * 0.08)
    const origem = pontoEm(raio.pts, raio.cum, d)
    const ang = (direcaoEm(raio.pts, raio.cum, d) * 180) / Math.PI + (k % 2 ? 1 : -1) * (28 + r() * 22)
    const comp = 60 + r() * 70
    const pts = raioFractal(origem, polar(ang + (r() - 0.5) * 30, comp * 0.6, origem), polar(ang, comp, origem), raio.semente * 13 + k, { trecho: 40, forca: 0.25, niveis: 2 })
    return { pts, cum: comprimentos(pts), total: comprimentos(pts).at(-1), nasce: raio.atraso + quandoPassa(raio, d) }
  })
}

function montar(r, voo, contorno = []) {
  const pts = [...voo, ...contorno.slice(1)]
  const cum = comprimentos(pts)
  const raio = { ...r, pts, cum, voo: comprimentos(voo).at(-1), total: cum.at(-1) }
  raio.galhos = criarGalhos(raio, raio.voo)
  return raio
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
  return montar(r, raioFractal(centro, polar(r.angulo, r.alcance), contorno[0], r.semente), contorno)
})

// Raios que só cruzam a tela e somem
const RAIOS_SOLTOS = [
  { angulo: -95, atraso: 0, cor: '#f3b6f5', semente: 89 },
  { angulo: 15, atraso: 2, cor: cores.laranjaClaro, semente: 144 },
  { angulo: 100, atraso: 4, cor: cores.magenta, semente: 233 },
  { angulo: -60, atraso: 6, cor: '#f3b6f5', semente: 377 },
].map((r) => montar(r, raioFractal(centro, polar(r.angulo + 30, 450), polar(r.angulo, 1100), r.semente)))

// Quando cada peça recebe cor (logo depois que o contorno fecha)
const inicioCor = (peca) =>
  Math.max(...RAIOS_PECA.filter((r) => r.peca === peca).map((r) => IMPACTO + r.atraso + DURACAO_RAIO)) - 6

// Estalo onde o contorno de cada peça se fecha
const ESTALOS = Object.keys(pecas).map((peca, k) => {
  const raios = RAIOS_PECA.filter((r) => r.peca === peca)
  const ultimo = raios.reduce((a, b) => (a.atraso > b.atraso ? a : b))
  return {
    ponto: ultimo.pts.at(-1),
    frame: IMPACTO + ultimo.atraso + quandoPassa(ultimo, ultimo.total - 3),
    giro: k * 23,
  }
})

// Direção em que a cor varre cada peça (de baixo para cima, ao longo da peça)
const DIRECAO_COR = {
  raioCima: [0.38, -0.92],
  raioBaixo: [0.22, -0.97],
  escuro: [0.42, -0.9],
  laranja: [0.4, -0.92],
}

// Desenha o trecho [cauda, cabeca] afinando da ponta para a cauda
function Tracado({ pts, cum, cauda, cabeca, limiteAfinar, espessura, cor, afinamento = AFINAMENTO, minima = ESPESSURA_MINIMA }) {
  if (cabeca - cauda < 0.5 || espessura <= 0) return null
  return pedacos(pts, cum, cauda, cabeca).map((p, i) => {
    const afina = p.d < limiteAfinar ? Math.min(1, (p.d - cauda) / afinamento) : 1
    const fina = Math.min(espessura, minima)
    const w = fina + (espessura - fina) * Math.max(0, afina) ** 0.8
    return <polyline key={i} points={emTexto(p.pts)} fill="none" stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
  })
}

function Linha({ raio, frame }) {
  const f = frame - IMPACTO - raio.atraso
  if (f < 0) return null
  const cabeca = progresso(f) * raio.total
  const cauda = Math.min(progresso(f - ATRASO_CAUDA) * raio.total, raio.voo)
  // depois que a peça ganha cor, o contorno afina até sumir
  const fimCor = raio.peca ? inicioCor(raio.peca) + DURACAO_COR : null
  const espessura = fimCor === null ? ESPESSURA : interpolate(frame, [fimCor - 4, fimCor + 6], [ESPESSURA, 0], limitar)
  // núcleo branco atrás da ponta: maior quanto mais rápido o raio anda
  const velocidade = cabeca - progresso(f - 1) * raio.total
  const nucleo = Math.min(70, velocidade * 3.5, Math.max(0, cabeca - cauda - 20))
  return (
    <g>
      {raio.galhos.map((g, i) => {
        const fg = f - (g.nasce - raio.atraso)
        if (fg < 0) return null
        const cab = Easing.out(Easing.cubic)(Math.min(1, fg / 8)) * g.total
        const cau = Easing.in(Easing.quad)(Math.min(1, Math.max(0, (fg - 4) / 8))) * g.total
        return <Tracado key={i} pts={g.pts} cum={g.cum} cauda={cau} cabeca={cab} limiteAfinar={Infinity} espessura={4.6} cor={raio.cor} afinamento={50} />
      })}
      <Tracado pts={raio.pts} cum={raio.cum} cauda={cauda} cabeca={cabeca} limiteAfinar={raio.voo} espessura={espessura} cor={raio.cor} />
      {nucleo > 2 && espessura > 0 && (
        <Tracado pts={raio.pts} cum={raio.cum} cauda={cabeca - nucleo} cabeca={cabeca} limiteAfinar={Infinity} espessura={2.6} cor={BRANCO} afinamento={nucleo} minima={1.2} />
      )}
    </g>
  )
}

function Estalo({ estalo, frame }) {
  const f = frame - estalo.frame
  if (f < 0 || f > 12) return null
  const cab = Easing.out(Easing.cubic)(Math.min(1, f / 6))
  const cau = Easing.in(Easing.quad)(Math.min(1, Math.max(0, (f - 2) / 10)))
  return [0, 72, 144, 216, 288].map((a, i) => {
    const comp = i % 2 ? 13 : 22
    const ang = a + estalo.giro
    const p0 = polar(ang, 9 + comp * cau, estalo.ponto), p1 = polar(ang, 9 + comp * cab, estalo.ponto)
    return <line key={i} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} stroke="#f45cff" strokeWidth={4} strokeLinecap="round" />
  })
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
  // o anel se parte em 10 arcos que encolhem até sumir (espessura fixa)
  const arco = interpolate(anel, [0.25, 1], [0.1, 0], limitar)

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
        {arco > 0.002 && anel > 0 && (
          <circle cx={centro[0]} cy={centro[1]} r={12 + anel * 90} fill="none" stroke="#f45cff" strokeWidth={4}
            pathLength={1} strokeDasharray={`${arco} ${0.1 - arco}`} strokeDashoffset={-anel * 0.05} strokeLinecap="round" />
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
        {ESTALOS.map((e, i) => <Estalo key={i} estalo={e} frame={frame} />)}
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
