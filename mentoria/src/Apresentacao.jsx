import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { slides, secoes } from './slides.jsx'

// Palco fixo 1920×1080 escalado para caber em qualquer tela, com transições 3D.
// Teclas: → espaço (avança) · ← (volta) · O (visão geral) · N (notas) · F (tela cheia) · ? (ajuda)
// ?estatico no endereço mostra todos os passos sem animação (usado no PDF).
const LARGURA = 1920
const ALTURA = 1080
const ESTATICO = new URLSearchParams(location.search).has('estatico')

function lerHash() {
  const n = parseInt(location.hash.replace('#', ''), 10)
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), slides.length - 1) : 0
}
const ehCampo = (el) => el?.closest?.('input, textarea, [contenteditable="true"]')
const ehInterativo = (el) => el?.closest?.('button, a, input, textarea, [contenteditable="true"], [data-interativo]')

export default function Apresentacao() {
  const [estado, setEstado] = useState(() => {
    const a = lerHash()
    return { atual: a, passo: ESTATICO ? slides[a].passos ?? 0 : 0, anterior: null, direcao: 1 }
  })
  const { atual, passo, anterior, direcao } = estado
  const [notas, setNotas] = useState(false)
  const [geral, setGeral] = useState(false)
  const [ajuda, setAjuda] = useState(!ESTATICO)
  const [controles, setControles] = useState(true)
  const [escala, setEscala] = useState(1)
  const palco = useRef(null)
  const toque = useRef(null)

  const irPara = useCallback((destino, passoDestino = 0) => {
    setEstado((s) => destino === s.atual ? { ...s, passo: passoDestino } : {
      atual: destino, passo: ESTATICO ? slides[destino].passos ?? 0 : passoDestino, anterior: s.atual, direcao: destino > s.atual ? 1 : -1,
    })
  }, [])

  const ir = useCallback((delta) => {
    setEstado((s) => {
      const total = slides[s.atual].passos ?? 0
      if (delta > 0) {
        if (s.passo < total) return { ...s, passo: s.passo + 1 }
        if (s.atual < slides.length - 1) return { atual: s.atual + 1, passo: ESTATICO ? slides[s.atual + 1].passos ?? 0 : 0, anterior: s.atual, direcao: 1 }
      } else {
        if (s.passo > 0) return { ...s, passo: s.passo - 1 }
        if (s.atual > 0) return { atual: s.atual - 1, passo: slides[s.atual - 1].passos ?? 0, anterior: s.atual, direcao: -1 }
      }
      return s
    })
  }, [])

  // Remove o slide que está saindo depois da transição
  useEffect(() => {
    if (anterior === null) return
    const t = setTimeout(() => setEstado((s) => ({ ...s, anterior: null })), 950)
    return () => clearTimeout(t)
  }, [anterior, atual])

  useEffect(() => { history.replaceState(null, '', `${location.search}#${atual + 1}`) }, [atual])
  useEffect(() => { const t = setTimeout(() => setAjuda(false), 6000); return () => clearTimeout(t) }, [])

  useEffect(() => {
    const tecla = (e) => {
      if (ehCampo(e.target)) { if (e.key === 'Escape') e.target.blur(); return }
      const k = e.key.toLowerCase()
      if (['arrowright', 'pagedown', ' ', 'enter', 'arrowdown'].includes(k)) { e.preventDefault(); setGeral(false); ir(1) }
      else if (['arrowleft', 'pageup', 'backspace', 'arrowup'].includes(k)) { e.preventDefault(); ir(-1) }
      else if (k === 'home') irPara(0)
      else if (k === 'end') irPara(slides.length - 1)
      else if (k === 'n') setNotas((v) => !v)
      else if (k === 'o' || k === 'g') setGeral((v) => !v)
      else if (k === 'escape') { setGeral(false); setAjuda(false) }
      else if (k === '?' || k === 'h') setAjuda((v) => !v)
      else if (k === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.()
    }
    addEventListener('keydown', tecla)
    return () => removeEventListener('keydown', tecla)
  }, [ir, irPara])

  useLayoutEffect(() => {
    const ajustar = () => setEscala(Math.min(innerWidth / LARGURA, innerHeight / ALTURA))
    ajustar()
    addEventListener('resize', ajustar)
    return () => removeEventListener('resize', ajustar)
  }, [])

  // Paralaxe: a cena acompanha o mouse; controles somem quando o mouse para
  useEffect(() => {
    let parado
    const mover = (e) => {
      palco.current?.style.setProperty('--mx', ((e.clientX / innerWidth) * 2 - 1).toFixed(3))
      palco.current?.style.setProperty('--my', ((e.clientY / innerHeight) * 2 - 1).toFixed(3))
      setControles(true)
      clearTimeout(parado)
      parado = setTimeout(() => setControles(false), 2600)
    }
    addEventListener('pointermove', mover)
    parado = setTimeout(() => setControles(false), 4000)
    return () => { removeEventListener('pointermove', mover); clearTimeout(parado) }
  }, [])

  const clicar = (e) => {
    if (ehInterativo(e.target) || geral) return
    if (toque.current?.arrastou) return
    e.clientX < innerWidth / 4 ? ir(-1) : ir(1)
  }
  const inicioToque = (e) => { toque.current = { x: e.clientX, arrastou: false } }
  const fimToque = (e) => {
    if (!toque.current) return
    const dx = e.clientX - toque.current.x
    if (Math.abs(dx) > 60 && e.pointerType !== 'mouse') { toque.current.arrastou = true; ir(dx < 0 ? 1 : -1) }
  }

  const secaoAtual = slides[atual].secao
  const renderSlide = (i, papel) => {
    const s = slides[i]
    const Slide = s.componente
    return (
      <section
        key={i}
        className={`slide ${s.fundo ?? 'fundo-magenta'} ${ESTATICO ? '' : `slide--${papel}-${direcao > 0 ? 'frente' : 'tras'}`}`}
        data-passo={papel === 'entra' ? passo : s.passos ?? 0}
        aria-hidden={papel === 'sai'}
      >
        <Cena variante={s.cena} />
        <Slide passo={papel === 'entra' ? passo : s.passos ?? 0} irPara={irPara} />
        <footer className="slide__rodape">
          <img src="./logo/vis-logo-branco.svg" alt="VIS creative" />
          <span>{s.secao}</span>
          <b>{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</b>
        </footer>
      </section>
    )
  }

  return (
    <div
      className={`tela ${controles ? '' : 'tela--quieta'} ${ESTATICO ? 'tela--estatica' : ''}`}
      onClick={clicar}
      onPointerDown={inicioToque}
      onPointerUp={fimToque}
    >
      <div className="palco" ref={palco} style={{ width: LARGURA, height: ALTURA, transform: `translate(-50%, -50%) scale(${escala})` }}>
        {anterior !== null && anterior !== atual && renderSlide(anterior, 'sai')}
        {renderSlide(atual, 'entra')}
        <div className="palco__progresso" style={{ width: `${((atual + (passo / ((slides[atual].passos ?? 0) + 1))) / (slides.length - 1 || 1)) * 100}%` }} />
      </div>

      {!ESTATICO && (
        <nav className="controles" aria-label="Navegação da apresentação" onClick={(e) => e.stopPropagation()}>
          <button className="controles__seta" onClick={() => ir(-1)} aria-label="Voltar">‹</button>
          <div className="controles__secoes">
            {secoes.map((sec) => (
              <button key={sec.nome} className={sec.nome === secaoAtual ? 'ativa' : ''} onClick={() => irPara(sec.inicio)}>{sec.curto}</button>
            ))}
          </div>
          <button className="controles__seta controles__seta--frente" onClick={() => ir(1)} aria-label="Avançar">›</button>
          <button className="controles__icone" onClick={() => setGeral(true)} title="Visão geral (O)">▦</button>
          <button className="controles__icone" onClick={() => setNotas((v) => !v)} title="Notas do mentor (N)">✎</button>
          <button className="controles__icone" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())} title="Tela cheia (F)">⛶</button>
          <button className="controles__icone" onClick={() => setAjuda((v) => !v)} title="Ajuda (?)">?</button>
        </nav>
      )}

      {notas && (
        <aside className="notas" onClick={(e) => e.stopPropagation()}>
          <strong>Notas do mentor · slide {atual + 1}</strong>
          <p>{slides[atual].notas}</p>
        </aside>
      )}

      {ajuda && (
        <div className="ajuda" onClick={(e) => { e.stopPropagation(); setAjuda(false) }}>
          <div className="ajuda__caixa">
            <strong>Como navegar</strong>
            <ul>
              <li><kbd>→</kbd> ou <kbd>espaço</kbd> ou clique: avança (revela um item por vez)</li>
              <li><kbd>←</kbd> ou clique no canto esquerdo: volta</li>
              <li>No celular: arraste para o lado</li>
              <li><kbd>O</kbd> visão geral · <kbd>N</kbd> notas do mentor · <kbd>F</kbd> tela cheia</li>
              <li>Mova o mouse para ver os efeitos 3D e os botões de navegação</li>
            </ul>
            <small>Clique para fechar</small>
          </div>
        </div>
      )}

      {geral && (
        <div className="geral" onClick={(e) => e.stopPropagation()}>
          <div className="geral__topo">
            <strong>Visão geral</strong>
            <button onClick={() => setGeral(false)}>Fechar ✕</button>
          </div>
          <div className="geral__secoes">
            {secoes.map((sec) => (
              <div key={sec.nome} className="geral__secao">
                <h3>{sec.nome}</h3>
                <div className="geral__grade">
                  {slides.map((s, i) => s.secao === sec.nome && (
                    <button key={i} className={`geral__slide ${s.fundo ?? 'fundo-magenta'} ${i === atual ? 'atual' : ''}`} onClick={() => { irPara(i); setGeral(false) }}>
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <span>{s.titulo}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Fundo vivo: chão em perspectiva que corre, luzes e partículas, com paralaxe do mouse
function Cena({ variante = 'padrao' }) {
  if (variante === 'nenhuma') return null
  return (
    <div className={`cena cena--${variante}`} aria-hidden="true">
      <div className="cena__luz cena__luz--1" />
      <div className="cena__luz cena__luz--2" />
      <div className="cena__chao" />
      <div className="cena__particulas">
        {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
      </div>
    </div>
  )
}

// Revela o filho a partir do passo "em", virando em 3D. O cartão interno inclina com o mouse.
export function Passo({ em = 0, passo, children, como: Tag = 'div', className = '', inclinar = true, ...resto }) {
  const interno = useRef(null)
  const mover = (e) => {
    if (!inclinar) return
    const r = interno.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    interno.current.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`)
    interno.current.style.setProperty('--ry', `${(x * 18).toFixed(2)}deg`)
    interno.current.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    interno.current.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
    interno.current.classList.add('inclinado')
  }
  const sair = () => {
    if (!interno.current) return
    interno.current.style.setProperty('--rx', '0deg')
    interno.current.style.setProperty('--ry', '0deg')
    interno.current.classList.remove('inclinado')
  }
  return (
    <Tag className={`passo ${passo >= em ? 'passo--on' : ''}`} style={{ '--ordem': em }} {...resto}>
      <div ref={interno} className={`inclina ${className}`} onPointerMove={mover} onPointerLeave={sair}>{children}</div>
    </Tag>
  )
}
