// Elementos visuais da linguagem VIS: raios elétricos, assinatura vertical,
// listras diagonais e grade em perspectiva (como nos criativos).

// Gera um raio "elétrico" sempre igual (semente fixa)
function aleatorio(semente) {
  let s = semente
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}
function caminhoRaio(x, y, comprimento, angulo, semente, ramos = 3) {
  const r = aleatorio(semente)
  const partes = []
  const gerar = (x0, y0, comp, ang, nivel) => {
    let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`
    let cx = x0, cy = y0
    const passos = Math.max(4, Math.round(comp / 22))
    for (let i = 0; i < passos; i++) {
      const a = ang + (r() - 0.5) * 1.1
      const l = comp / passos
      cx += Math.cos(a) * l
      cy += Math.sin(a) * l
      d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`
      if (nivel < 2 && r() < 0.28 && partes.length < ramos * 3) {
        gerar(cx, cy, comp * 0.4, ang + (r() < 0.5 ? -0.7 : 0.7), nivel + 1)
      }
    }
    partes.push({ d, nivel })
  }
  gerar(x, y, comprimento, angulo, 0)
  return partes
}

export function Relampagos({ className = '' }) {
  const raios = [
    caminhoRaio(-20, 60, 420, 0.75, 7),
    caminhoRaio(1220, 320, 360, 2.6, 21),
    caminhoRaio(980, -10, 300, 1.9, 42),
  ]
  return (
    <svg className={`relampagos ${className}`} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="brilho-raio" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {raios.map((partes, i) => (
        <g key={i} className={`relampago relampago--${i + 1}`} filter="url(#brilho-raio)">
          {partes.map((p, j) => (
            <path key={j} d={p.d} fill="none" stroke={p.nivel ? '#f3b6f5' : '#fff'} strokeWidth={p.nivel ? 1.4 : 2.6} strokeLinejoin="round" strokeLinecap="round" opacity={p.nivel ? 0.8 : 1} />
          ))}
        </g>
      ))}
    </svg>
  )
}

// "VIS creative." na vertical, nas bordas, como nos posts
export function Assinatura({ lado = 'direita' }) {
  return (
    <span className={`assinatura assinatura--${lado}`} aria-hidden="true">
      <b>VIS</b>creative<i>.</i>
    </span>
  )
}

export function GradeFundo() {
  return <div className="grade-fundo" aria-hidden="true" />
}
