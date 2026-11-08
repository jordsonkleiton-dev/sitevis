import { useEffect, useId, useRef, useState } from 'react'

// Partes do símbolo VIS (mesmas coordenadas da logo)
const RAIO = [
  '560,340 591,390 549,484 564,508 605,415 631,456 604,517 597,506 564,581 499,476',
  '633,460 672,524 569,755 536,701 611,530 605,519',
]
const VI = { laranja: '475,482 486,499 455,571 433,577', escuro: '487,502 552,607 521,677 456,572' }

// Liga a classe "visivel" quando o elemento aparece na tela
export function useVisivel(limite = 0.35) {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setVisivel(true)
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && (setVisivel(true), obs.disconnect()), { threshold: limite })
    obs.observe(el)
    return () => obs.disconnect()
  }, [limite])
  return [ref, visivel]
}

/**
 * mostrar: 'tudo' | 'raio' | 'vi'
 * montar: anima o raio caindo e o V+I encaixando para formar o diamante
 */
export default function Diamante({ mostrar = 'tudo', montar = false, ativo = true, className = '', titulo = 'Diamante VIS' }) {
  const id = useId().replace(/:/g, '')
  const verRaio = mostrar !== 'vi'
  const verVI = mostrar !== 'raio'
  return (
    <svg
      className={`diamante ${montar ? 'diamante--montar' : ''} ${montar && ativo ? 'diamante--ativo' : ''} ${className}`}
      viewBox="428 336 250 424"
      role="img"
      aria-label={titulo}
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D400EC" />
          <stop offset=".7" stopColor="#7A007C" />
          <stop offset="1" stopColor="#7E006D" />
        </linearGradient>
      </defs>
      {verVI && (
        <g className="diamante__vi">
          <polygon fill="#D66D00" points={VI.laranja} />
          <polygon fill="#400044" points={VI.escuro} className="diamante__escuro" />
        </g>
      )}
      {verRaio && (
        <g className="diamante__raio">
          {RAIO.map((p) => <polygon key={p} fill={`url(#g${id})`} points={p} />)}
        </g>
      )}
    </svg>
  )
}
