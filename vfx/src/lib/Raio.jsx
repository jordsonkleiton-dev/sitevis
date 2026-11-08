import { useCurrentFrame, interpolate } from 'remotion'
import { caminhoRaio } from './raio'

// Raio que "desenha" a partir do frame `inicio` e depois pisca até sumir
export function Raio({ x, y, comprimento, angulo, semente, inicio = 0, duracao = 8, largura, altura }) {
  const frame = useCurrentFrame() - inicio
  if (frame < 0) return null
  const partes = caminhoRaio(x, y, comprimento, angulo, semente)
  const desenho = interpolate(frame, [0, duracao], [0, 1], { extrapolateRight: 'clamp' })
  const piscar = frame > duracao ? (Math.floor(frame / 2) % 2 ? 0.55 : 1) : 1
  const sumir = interpolate(frame, [duracao + 6, duracao + 18], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const id = `brilho-${semente}`
  return (
    <svg viewBox={`0 0 ${largura} ${altura}`} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter={`url(#${id})`} opacity={piscar * sumir}>
        {partes.map((p, j) => (
          <path key={j} d={p.d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - desenho}
            fill="none" stroke={p.nivel ? '#f3b6f5' : '#fff'} strokeWidth={p.nivel ? 3 : 6}
            strokeLinejoin="round" strokeLinecap="round" opacity={p.nivel ? 0.8 : 1} />
        ))}
      </g>
    </svg>
  )
}
