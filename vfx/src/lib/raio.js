// Gera um raio "elétrico" sempre igual para a mesma semente (copiado de ../src/Efeitos.jsx)
function aleatorio(semente) {
  let s = semente
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}

export function caminhoRaio(x, y, comprimento, angulo, semente, ramos = 3) {
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
