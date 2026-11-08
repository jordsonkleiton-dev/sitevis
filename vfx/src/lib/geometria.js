// Ferramentas de geometria para desenhar linhas que "andam" (trim path).

// Números aleatórios sempre iguais para a mesma semente
export function aleatorio(semente) {
  let a = semente >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1])

export function comprimentos(pts) {
  const c = [0]
  for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + dist(pts[i - 1], pts[i]))
  return c
}

function pontoEm(pts, cum, d) {
  if (d <= 0) return pts[0]
  const total = cum[cum.length - 1]
  if (d >= total) return pts[pts.length - 1]
  let i = 1
  while (cum[i] < d) i++
  const t = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1)
  const a = pts[i - 1], b = pts[i]
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

// Pedaço da linha entre as distâncias a e b, como "d" de um <path>
export function trecho(pts, cum, a, b) {
  if (b - a <= 0.01) return ''
  const res = [pontoEm(pts, cum, a)]
  for (let i = 0; i < pts.length; i++) if (cum[i] > a && cum[i] < b) res.push(pts[i])
  res.push(pontoEm(pts, cum, b))
  return 'M' + res.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' L')
}

// Raio em zigue-zague seguindo uma curva de I até T, passando perto de C
export function zigueZague(I, C, T, semente, amplitude = 20, passo = 58) {
  const r = aleatorio(semente)
  const curva = (t) => [
    (1 - t) ** 2 * I[0] + 2 * (1 - t) * t * C[0] + t * t * T[0],
    (1 - t) ** 2 * I[1] + 2 * (1 - t) * t * C[1] + t * t * T[1],
  ]
  let comp = 0
  for (let i = 1; i <= 40; i++) comp += dist(curva((i - 1) / 40), curva(i / 40))
  const n = Math.max(6, Math.round(comp / passo))
  const pts = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const p = curva(t)
    const q = curva(Math.min(1, t + 0.01)), o = curva(Math.max(0, t - 0.01))
    const tx = q[0] - o[0], ty = q[1] - o[1]
    const l = Math.hypot(tx, ty) || 1
    const desvio = i === 0 || i === n ? 0 : (i % 2 ? 1 : -1) * amplitude * Math.sin(Math.PI * t) * (0.6 + 0.8 * r())
    pts.push([p[0] - (ty / l) * desvio, p[1] + (tx / l) * desvio])
  }
  return pts
}

// Semi-plano que avança na direção u: usado para a cor "varrer" uma peça
export function varredura(pontos, u, progresso) {
  const proj = pontos.map((p) => p[0] * u[0] + p[1] * u[1])
  const min = Math.min(...proj), max = Math.max(...proj)
  const d = min - 2 + (max - min + 4) * progresso
  const v = [-u[1], u[0]], G = 3000
  const canto = (s, t) => [u[0] * s + v[0] * t, u[1] * s + v[1] * t]
  return [canto(-G, -G), canto(d, -G), canto(d, G), canto(-G, G)]
}

export const emTexto = (pts) => pts.map((p) => p.join(',')).join(' ')
