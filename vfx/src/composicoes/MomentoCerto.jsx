import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { aleatorio, emTexto, raioFractal } from '../lib/geometria'
import { cores, estiloFontes, fontes, useFontes } from '../lib/marca'

// "O momento certo": o encontro de Trump, Xi Jinping e Putin (19/11/2026, Shenzhen)
// como gancho para falar de timing no marketing. Post animado na linha laranja.
// 30 fps. Cenas (início, duração) em CENAS logo abaixo.

export const CENAS = {
  mesa: [0, 140],
  noticia: [132, 128],
  timing: [252, 118],
  aparece: [362, 88],
  fim: [442, 113],
}
export const DURACAO = CENAS.fim[0] + CENAS.fim[1]

const lim = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const suave = Easing.bezier(0.22, 1, 0.36, 1)
const entra = (f, ini, dur = 16) => interpolate(f, [ini, ini + dur], [0, 1], { ...lim, easing: suave })
const MARGEM = 90

const pesado = (tamanho, cor = '#fff') => ({
  fontFamily: fontes.pesada, fontWeight: 900, fontSize: tamanho, lineHeight: 1,
  letterSpacing: '-0.01em', textTransform: 'uppercase', color: cor,
})
const fino = (tamanho) => ({ fontFamily: fontes.pesada, fontWeight: 300, fontStyle: 'italic', fontSize: tamanho, lineHeight: 1.1, color: '#fff' })

// ---------- peças de texto ----------

// Texto que sobe de dentro de uma máscara
function Sobe({ f, ini, dur = 16, children, style }) {
  const p = entra(f, ini, dur)
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.08em', ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * 115}%)` }}>{children}</div>
    </div>
  )
}

// Faixa laranja que corre da esquerda para a direita e revela o texto
function Faixa({ f, ini, dur = 14, children, style, cor = cores.laranja }) {
  const p = entra(f, ini, dur)
  const t = entra(f, ini + 5, 12)
  return (
    <div style={{ display: 'inline-block', clipPath: `inset(-10% ${(1 - p) * 100}% -10% 0)`, background: cor, padding: '0.05em 0.26em 0.1em', ...style }}>
      <span style={{ display: 'inline-block', opacity: t, transform: `translateX(${(1 - t) * -24}px)` }}>{children}</span>
    </div>
  )
}

// Cada cena entra e sai com um fade curto
function Cena({ dur, children, sai = true }) {
  const f = useCurrentFrame()
  const a = interpolate(f, [0, 8], [0, 1], lim)
  const b = sai ? interpolate(f, [dur - 10, dur], [1, 0], lim) : 1
  return <AbsoluteFill style={{ opacity: Math.min(a, b), transform: `translateY(${(1 - b) * -40}px)` }}>{children}</AbsoluteFill>
}

// ---------- fundo ----------

function Fundo() {
  const f = useCurrentFrame()
  const { width: w, height: h } = useVideoConfig()
  // Faixas diagonais "/" que deslizam devagar, como nos posts
  const faixas = [
    { x: 0.32, largura: 0.1, opacidade: 0.06 },
    { x: 0.5, largura: 0.16, opacidade: 0.1 },
    { x: 0.78, largura: 0.06, opacidade: 0.07 },
  ]
  const deriva = f * 0.5
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(900px 760px at 100% 100%, #e06a00, transparent 62%), linear-gradient(170deg, #1c0700 0%, #4a1500 45%, #b34a00 100%)' }}>
      <div style={{
        position: 'absolute', left: '-25%', right: '-25%', top: '-20%', height: '70%', opacity: 0.35,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.09) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.09) 2px, transparent 2px)',
        backgroundSize: '90px 90px', backgroundPosition: `0 ${f * 1.2}px`,
        transform: 'perspective(700px) rotateX(48deg)', transformOrigin: 'top',
        maskImage: 'linear-gradient(#000, transparent 85%)', WebkitMaskImage: 'linear-gradient(#000, transparent 85%)',
      }} />
      <svg width={w} height={h} style={{ position: 'absolute' }}>
        {faixas.map((fx, i) => {
          const x0 = fx.x * w - h + deriva * (1 + i * 0.3)
          const d = fx.largura * w
          return <polygon key={i} points={emTexto([[x0, h], [x0 + d, h], [x0 + d + h, 0], [x0 + h, 0]])} fill={`rgba(255,255,255,${fx.opacidade})`} />
        })}
      </svg>
    </AbsoluteFill>
  )
}

// Logo vertical no canto e o @ embaixo, como nos posts
function Assinatura() {
  const f = useCurrentFrame()
  const { width: w } = useVideoConfig()
  const some = interpolate(f, [CENAS.fim[0], CENAS.fim[0] + 10], [1, 0], lim)
  const a = entra(f, 6, 20)
  return (
    <>
      <Img src={staticFile('logo/vis-logo-branco.svg')} style={{ position: 'absolute', width: 250, left: w - 186, top: 160, transform: 'rotate(-90deg)', opacity: a * some }} />
      <div style={{ position: 'absolute', bottom: 46, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, opacity: a, fontFamily: fontes.pesada, fontWeight: 500, fontSize: 28, color: '#fff' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.3" /><circle cx="17.6" cy="6.4" r="0.6" fill="#fff" />
        </svg>
        viscreative_
      </div>
    </>
  )
}

// ---------- cena 1: a mesa ----------

const LIDERES = [
  { pais: 'CHINA', nome: 'Xi Jinping', angulo: -90 },
  { pais: 'RÚSSIA', nome: 'Putin', angulo: 30 },
  { pais: 'EUA', nome: 'Trump', angulo: 150 },
]

function Mesa({ f }) {
  const { width: w, height: h, fps } = useVideoConfig()
  const cx = w / 2, cy = h * 0.63
  const R = 255, rMesa = 165, rLugar = 92
  const giro = interpolate(f, [0, 140], [-10, 10])
  const pMesa = entra(f, 24, 26)
  const lugares = LIDERES.map((l, i) => {
    const a = ((l.angulo + giro) * Math.PI) / 180
    return { ...l, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, s: spring({ frame: f - (40 + i * 8), fps, config: { damping: 11, mass: 0.6 } }) }
  })
  const circ = 2 * Math.PI * rMesa
  return (
    <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0 }}>
      <defs>
        <radialGradient id="mesa"><stop offset="0" stopColor="#5a1d00" /><stop offset="1" stopColor="#260900" /></radialGradient>
        <filter id="brilho" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* Ondas: a notícia saindo da mesa para o mundo */}
      {[0, 1, 2].map((k) => {
        const t = f < 50 ? -1 : ((f - 50 + k * 22) % 66) / 66
        if (t < 0) return null
        return <circle key={k} cx={cx} cy={cy} r={rMesa + t * 470} fill="none" stroke={cores.laranjaClaro} strokeWidth={4} opacity={(1 - t) * 0.45} />
      })}
      <circle cx={cx} cy={cy} r={rMesa} fill="url(#mesa)" opacity={pMesa} />
      <circle cx={cx} cy={cy} r={rMesa} fill="none" stroke={cores.laranjaClaro} strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pMesa)} transform={`rotate(-90 ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={rMesa - 30} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth={3} opacity={pMesa} />
      {/* Linhas que ligam os três */}
      {[[0, 1], [1, 2], [2, 0]].map(([a, b], k) => {
        const p = entra(f, 66 + k * 6, 16)
        const A = lugares[a], B = lugares[b]
        return <line key={k} x1={A.x} y1={A.y} x2={A.x + (B.x - A.x) * p} y2={A.y + (B.y - A.y) * p} stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.85} filter="url(#brilho)" />
      })}
      <g opacity={entra(f, 58, 14)} fontFamily={fontes.pesada} textAnchor="middle" fill="#fff">
        <text x={cx} y={cy - 6} fontSize={24} fontWeight={800} letterSpacing="0.22em">ENCONTRO</text>
        <text x={cx} y={cy + 26} fontSize={24} fontWeight={300} fontStyle="italic" letterSpacing="0.1em">inédito</text>
      </g>
      {lugares.map((l) => (
        <g key={l.pais} transform={`translate(${l.x} ${l.y}) scale(${l.s})`} fontFamily={fontes.pesada} textAnchor="middle">
          <circle r={rLugar} fill="#fff" />
          <circle r={rLugar - 10} fill="none" stroke={cores.laranja} strokeWidth={3} />
          <text y={2} fontSize={l.pais.length > 4 ? 30 : 38} fontWeight={900} fill={cores.laranja}>{l.pais}</text>
          <text y={34} fontSize={22} fontWeight={600} fill="#3a1400">{l.nome}</text>
        </g>
      ))}
    </svg>
  )
}

function CenaMesa() {
  const f = useCurrentFrame()
  const { height: h } = useVideoConfig()
  return (
    <AbsoluteFill>
      <Mesa f={f} />
      <div style={{ position: 'absolute', left: MARGEM, top: h * 0.1 }}>
        <Sobe f={f} ini={2}>
          <div style={{ fontFamily: fontes.pesada, fontWeight: 600, fontSize: 26, letterSpacing: '0.18em', color: cores.laranjaClaro, textTransform: 'uppercase' }}>19 de novembro · Shenzhen, China</div>
        </Sobe>
        <Sobe f={f} ini={8} style={{ marginTop: 16 }}><div style={pesado(112)}>3 potências</div></Sobe>
        <Faixa f={f} ini={22} style={{ ...fino(68), marginTop: 10 }}>na mesma mesa.</Faixa>
      </div>
    </AbsoluteFill>
  )
}

// ---------- cena 2: a notícia corre ----------

const NOTIFICACOES = [
  { app: 'NOTÍCIAS', texto: 'Trump, Xi e Putin se reúnem na China' },
  { app: 'URGENTE', texto: 'Primeiro encontro dos três juntos' },
  { app: 'MUNDO', texto: 'Potências discutem a ordem mundial' },
  { app: 'SEU FEED', texto: 'Todo mundo falando da mesma coisa' },
  { app: 'GRUPO DA FAMÍLIA', texto: '"Viu o encontro dos três?"' },
]
const CHEGADAS = [24, 37, 47, 54, 59] // cada vez mais rápido

function Notificacao({ app, texto, y, s }) {
  const { width: w } = useVideoConfig()
  return (
    <div style={{
      position: 'absolute', left: (w - 900) / 2, top: y, width: 900, height: 116, borderRadius: 30,
      background: 'rgba(255,248,242,.96)', boxShadow: '0 18px 40px rgba(40,10,0,.35)',
      display: 'flex', alignItems: 'center', gap: 24, padding: '0 28px', fontFamily: fontes.pesada,
      opacity: Math.min(1, s * 1.4), transform: `translateY(${(1 - s) * -50}px) scale(${0.9 + s * 0.1})`,
    }}>
      <div style={{ width: 68, height: 68, borderRadius: 18, flexShrink: 0, background: `linear-gradient(140deg, ${cores.laranjaClaro}, ${cores.laranja})`, display: 'grid', placeItems: 'center' }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a6 6 0 0 0-6 6v4.5L4 16h16l-2-3.5V8a6 6 0 0 0-6-6zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3z" /></svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, letterSpacing: '0.08em', color: '#9a5a2e' }}>
          <span>{app}</span><span style={{ fontWeight: 500, letterSpacing: 0 }}>agora</span>
        </div>
        <div style={{ fontSize: 31, fontWeight: 700, color: '#2a0d00', marginTop: 4, whiteSpace: 'nowrap' }}>{texto}</div>
      </div>
    </div>
  )
}

function Rastros({ f }) {
  const { width: w, height: h } = useVideoConfig()
  const r = aleatorio(7)
  return Array.from({ length: 16 }, (_, i) => {
    const y = r() * h, comp = 200 + r() * 380, vel = 38 + r() * 30, desl = r() * 3000
    const x = w + 400 - ((f * vel + desl) % (w + 1000))
    return <div key={i} style={{ position: 'absolute', left: x, top: y, width: comp, height: 3, borderRadius: 3, background: 'linear-gradient(90deg, rgba(255,255,255,.35), transparent)' }} />
  })
}

function CenaNoticia() {
  const f = useCurrentFrame()
  const { height: h, fps } = useVideoConfig()
  const y0 = h * 0.37
  const molas = CHEGADAS.map((c) => spring({ frame: f - c, fps, config: { damping: 14, mass: 0.5 } }))
  return (
    <AbsoluteFill>
      <Rastros f={f} />
      <div style={{ position: 'absolute', left: MARGEM, top: h * 0.1 }}>
        <Sobe f={f} ini={4}><div style={pesado(84)}>A notícia rodou</div></Sobe>
        <Sobe f={f} ini={9}><div style={pesado(84)}>o mundo</div></Sobe>
        <Faixa f={f} ini={18} style={{ ...fino(64), marginTop: 12 }}>em minutos.</Faixa>
      </div>
      {NOTIFICACOES.map((n, i) => {
        // a mais nova entra no topo e empurra as outras para baixo
        const empurrao = molas.slice(i + 1).reduce((soma, m) => soma + m, 0)
        return <Notificacao key={i} {...n} s={molas[i]} y={y0 + empurrao * 134} />
      })}
    </AbsoluteFill>
  )
}

// ---------- cena 3: timing ----------

const RAIOS = [-160, -110, -30, 20, 70, 140].map((ang, i) => {
  const a = (ang * Math.PI) / 180
  const fim = [Math.cos(a) * 760, Math.sin(a) * 620]
  return raioFractal([0, 0], [fim[0] * 0.5 + 60, fim[1] * 0.5 - 40], fim, 11 + i * 17, { trecho: 90, forca: 0.28 })
})

function CenaTiming() {
  const f = useCurrentFrame()
  const { width: w, height: h, fps } = useVideoConfig()
  const saiA = interpolate(f, [40, 48], [1, 0], lim)
  const golpe = spring({ frame: f - 52, fps, config: { damping: 9, mass: 0.7 } })
  const flash = interpolate(f, [52, 54, 64], [0, 1, 0], lim)
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ position: 'absolute', opacity: saiA, transform: `translateY(${(1 - saiA) * -30}px)` }}>
        <Sobe f={f} ini={2}><div style={pesado(120)}>Amanhã,</div></Sobe>
        <Faixa f={f} ini={12} style={{ ...fino(64), marginTop: 14 }}>já é notícia velha.</Faixa>
      </div>
      {f >= 44 && (
        <>
          <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0, opacity: flash }}>
            <filter id="luz" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <g transform={`translate(${w / 2} ${h / 2})`} filter="url(#luz)">
              {RAIOS.map((pts, i) => <polyline key={i} points={emTexto(pts)} fill="none" stroke={i % 2 ? '#fff' : cores.laranjaClaro} strokeWidth={5} strokeLinejoin="round" />)}
            </g>
          </svg>
          <div>
            <Sobe f={f} ini={44}><div style={fino(58)}>No marketing,</div></Sobe>
            <div style={{
              fontFamily: fontes.poder, fontSize: 200, lineHeight: 1.05, color: '#fff', marginTop: 10,
              transform: `scale(${0.6 + golpe * 0.4})`, opacity: Math.min(1, golpe * 2),
              textShadow: `0 0 ${30 + flash * 40}px rgba(242,138,30,.9), 0 6px 0 ${cores.laranja}`,
            }}>TIMING</div>
            <Faixa f={f} ini={68} style={{ ...pesado(78), marginTop: 18 }}>é poder.</Faixa>
          </div>
        </>
      )}
    </AbsoluteFill>
  )
}

// ---------- cena 4: quem aparece ----------

function CenaAparece() {
  const f = useCurrentFrame()
  const palavra = 'some.'
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <Sobe f={f} ini={2}><div style={pesado(84)}>Quem aproveita</div></Sobe>
        <Sobe f={f} ini={7}><div style={pesado(84)}>o momento,</div></Sobe>
        <Faixa f={f} ini={16} style={{ ...pesado(132), marginTop: 16 }}>aparece.</Faixa>
        <div style={{ ...fino(60), marginTop: 56, opacity: entra(f, 38, 12) }}>
          Quem espera…{' '}
          {palavra.split('').map((letra, i) => {
            // as letras de "some." vão sumindo uma a uma
            const p = entra(f, 56 + i * 3, 10)
            return <span key={i} style={{ display: 'inline-block', opacity: entra(f, 46, 8) * (1 - p), filter: `blur(${p * 8}px)`, transform: `translateY(${p * -20}px)` }}>{letra}</span>
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ---------- cena 5: assinatura ----------

function CenaFim() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: f - 4, fps, config: { damping: 13, mass: 0.7 } })
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <Img src={staticFile('logo/vis-logo-branco.svg')} style={{ width: 460, transform: `scale(${0.7 + s * 0.3})`, opacity: Math.min(1, s * 1.5) }} />
        <Sobe f={f} ini={20} style={{ marginTop: 70 }}><div style={pesado(64)}>Sua marca está pronta</div></Sobe>
        <Faixa f={f} ini={30} style={{ ...fino(56), marginTop: 12 }}>para o próximo momento?</Faixa>
      </div>
    </AbsoluteFill>
  )
}

// ---------- composição ----------

const ORDEM = [
  ['mesa', CenaMesa],
  ['noticia', CenaNoticia],
  ['timing', CenaTiming],
  ['aparece', CenaAparece],
  ['fim', CenaFim],
]

export const MomentoCerto = () => {
  useFontes()
  return (
    <AbsoluteFill style={{ background: '#1c0700' }}>
      <style>{estiloFontes}</style>
      <Fundo />
      {ORDEM.map(([nome, Componente]) => {
        const [ini, dur] = CENAS[nome]
        return (
          <Sequence key={nome} from={ini} durationInFrames={dur}>
            <Cena dur={dur} sai={nome !== 'fim'}><Componente /></Cena>
          </Sequence>
        )
      })}
      <Assinatura />
    </AbsoluteFill>
  )
}
