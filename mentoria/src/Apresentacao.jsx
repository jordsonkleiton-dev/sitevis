import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { slides } from './slides.jsx'

// Palco fixo 1920×1080, escalado para caber em qualquer tela.
// → / espaço / clique: próximo passo · ←: volta · N: notas do mentor · F: tela cheia
// O endereço guarda o slide atual (#5), então dá para recarregar sem perder o lugar.
const LARGURA = 1920
const ALTURA = 1080

function lerHash() {
  const n = parseInt(location.hash.replace('#', ''), 10)
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), slides.length - 1) : 0
}

export default function Apresentacao() {
  const [atual, setAtual] = useState(lerHash)
  const [passo, setPasso] = useState(0)
  const [notas, setNotas] = useState(false)
  const [escala, setEscala] = useState(1)
  const palco = useRef(null)

  const total = slides[atual].passos ?? 0

  const ir = useCallback((delta) => {
    if (delta > 0) {
      if (passo < total) return setPasso(passo + 1)
      if (atual < slides.length - 1) { setAtual(atual + 1); setPasso(0) }
    } else {
      if (passo > 0) return setPasso(passo - 1)
      if (atual > 0) { setAtual(atual - 1); setPasso(slides[atual - 1].passos ?? 0) }
    }
  }, [atual, passo, total])

  useEffect(() => { history.replaceState(null, '', `#${atual + 1}`) }, [atual])

  useEffect(() => {
    const tecla = (e) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); ir(1) }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); ir(-1) }
      else if (e.key === 'Home') { setAtual(0); setPasso(0) }
      else if (e.key === 'End') { setAtual(slides.length - 1); setPasso(0) }
      else if (e.key.toLowerCase() === 'n') setNotas((v) => !v)
      else if (e.key.toLowerCase() === 'f') {
        document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.()
      }
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [ir])

  useLayoutEffect(() => {
    const ajustar = () => setEscala(Math.min(innerWidth / LARGURA, innerHeight / ALTURA))
    ajustar()
    addEventListener('resize', ajustar)
    return () => removeEventListener('resize', ajustar)
  }, [])

  const Slide = slides[atual].componente
  return (
    <div className="tela" onClick={(e) => (e.clientX < innerWidth / 4 ? ir(-1) : ir(1))}>
      <div className="palco" ref={palco} style={{ width: LARGURA, height: ALTURA, transform: `translate(-50%, -50%) scale(${escala})` }}>
        <section key={atual} className={`slide ${slides[atual].fundo ?? 'fundo-magenta'}`} data-passo={passo}>
          <Slide passo={passo} />
          <footer className="slide__rodape">
            <img src="./logo/vis-logo-branco.svg" alt="VIS creative" />
            <span>{slides[atual].secao}</span>
            <b>{String(atual + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</b>
          </footer>
          <div className="slide__progresso" style={{ width: `${((atual + 1) / slides.length) * 100}%` }} />
        </section>
      </div>
      {notas && (
        <aside className="notas" onClick={(e) => e.stopPropagation()}>
          <strong>Notas do mentor · slide {atual + 1}</strong>
          <p>{slides[atual].notas}</p>
          <small>← → navegar · N esconder notas · F tela cheia</small>
        </aside>
      )}
    </div>
  )
}

// Mostra o filho só a partir do passo "em" (com animação de entrada)
export function Passo({ em, passo, children, como: Tag = 'div', className = '', ...resto }) {
  return <Tag className={`passo ${passo >= em ? 'passo--on' : ''} ${className}`} {...resto}>{children}</Tag>
}
