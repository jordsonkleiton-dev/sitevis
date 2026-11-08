import { useState } from 'react'
import { empresa, nome, metodo, servicos, etapas } from './conteudo.js'
import Icone from './Icone.jsx'

const linkWhats = (msg = 'Olá! Vim pelo site da VIS creative e quero saber mais.') =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(msg)}`

const menu = [
  ['#sobre', 'Sobre'],
  ['#metodo', 'Método VIS'],
  ['#servicos', 'Serviços'],
  ['#como-funciona', 'Como funciona'],
  ['#contato', 'Contato'],
]

function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label={empresa.nome}>
      <img src="./logo/vis-simbolo.svg" alt="" width="22" height="38" />
      <span><b>VIS</b> creative<i>.</i></span>
    </a>
  )
}

function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  return (
    <header className="cabecalho">
      <div className="container cabecalho__linha">
        <Logo />
        <button className="menu-botao" aria-label="Abrir menu" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
          {aberto ? '✕' : '☰'}
        </button>
        <nav className={`nav ${aberto ? 'nav--aberto' : ''}`}>
          {menu.map(([href, n]) => (
            <a key={href} href={href} onClick={() => setAberto(false)}>{n}</a>
          ))}
          <a className="botao botao--pequeno" href={linkWhats()} target="_blank" rel="noreferrer">Fale conosco</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__grade">
        <div>
          <p className="etiqueta">Criatividade · Audiovisual · Comunicação estratégica</p>
          <h1>Criatividade <span className="destaque">e poder.</span></h1>
          <p className="hero__texto">{empresa.chamada}</p>
          <div className="hero__botoes">
            <a className="botao" href={linkWhats('Olá! Quero solicitar uma proposta da VIS creative.')} target="_blank" rel="noreferrer">Solicitar proposta</a>
            <a className="botao botao--contorno" href="#servicos">Conhecer serviços</a>
          </div>
        </div>
        <img className="hero__simbolo" src="./logo/vis-simbolo.svg" alt="" />
      </div>
    </section>
  )
}

function Sobre() {
  return (
    <section id="sobre" className="secao">
      <div className="container sobre">
        <div>
          <p className="etiqueta">Quem somos</p>
          <h2>Ideias que movimentam empresas</h2>
          <p>{empresa.sobre}</p>
        </div>
        <div className="cartao cartao--nome">
          <h3>{nome.titulo}</h3>
          <p>{nome.texto}</p>
        </div>
      </div>
    </section>
  )
}

function Metodo() {
  return (
    <section id="metodo" className="secao secao--escura">
      <div className="container">
        <p className="etiqueta etiqueta--centro">Como pensamos</p>
        <h2>O Método VIS</h2>
        <p className="secao__sub">Três pilares que orientam cada projeto, do planejamento ao resultado.</p>
        <div className="grade grade--3">
          {metodo.map((m) => (
            <article key={m.letra} className="pilar">
              <span className="pilar__letra" aria-hidden="true">{m.letra}</span>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="secao">
      <div className="container">
        <p className="etiqueta etiqueta--centro">O que fazemos</p>
        <h2>Nossos serviços</h2>
        <p className="secao__sub">Soluções adaptadas aos objetivos de cada cliente. Contrate um serviço ou combine vários.</p>
        <div className="grade">
          {servicos.map((s) => (
            <article key={s.titulo} className="cartao servico">
              <span className="servico__icone"><Icone nome={s.icone} /></span>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
              <ul>{s.itens.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
          <article className="cartao servico servico--cta">
            <h3>Não sabe por onde começar?</h3>
            <p>Conte o seu objetivo e montamos uma proposta com os serviços certos para o seu momento.</p>
            <a className="botao botao--claro" href={linkWhats('Olá! Quero ajuda para escolher os serviços certos.')} target="_blank" rel="noreferrer">Conversar agora</a>
          </article>
        </div>
      </div>
    </section>
  )
}

function ComoFunciona() {
  return (
    <section id="como-funciona" className="secao secao--alt">
      <div className="container">
        <p className="etiqueta etiqueta--centro">Passo a passo</p>
        <h2>Como funciona</h2>
        <ol className="etapas">
          {etapas.map((e, i) => (
            <li key={e.titulo} className="etapa">
              <span className="etapa__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contato() {
  const [enviado, setEnviado] = useState(false)
  function enviar(e) {
    e.preventDefault()
    const d = new FormData(e.target)
    const msg = `Olá! Meu nome é ${d.get('nome')}${d.get('empresa') ? `, da ${d.get('empresa')}` : ''}.\nTenho interesse em: ${d.get('servico')}.\n${d.get('mensagem')}`
    window.open(linkWhats(msg), '_blank')
    setEnviado(true)
  }
  return (
    <section id="contato" className="secao">
      <div className="container contato">
        <div>
          <p className="etiqueta">Vamos conversar</p>
          <h2>Pronto para dar mais poder à sua marca?</h2>
          <p className="contato__texto">Conte um pouco sobre o seu negócio. Respondemos pelo WhatsApp.</p>
          <ul className="contato__lista">
            <li><a href={linkWhats()} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
            <li><a href={empresa.instagram} target="_blank" rel="noreferrer">{empresa.instagramNome}</a></li>
            <li>{empresa.cidade}</li>
          </ul>
        </div>
        <form className="cartao formulario" onSubmit={enviar}>
          <label>Seu nome<input name="nome" required autoComplete="name" /></label>
          <label>Empresa<input name="empresa" autoComplete="organization" /></label>
          <label>Serviço de interesse
            <select name="servico" defaultValue="Ainda não sei">
              <option>Ainda não sei</option>
              {servicos.map((s) => <option key={s.titulo}>{s.titulo}</option>)}
            </select>
          </label>
          <label>Mensagem<textarea name="mensagem" rows="4" required /></label>
          <button className="botao" type="submit">Enviar pelo WhatsApp</button>
          {enviado && <p className="aviso">Abrimos o WhatsApp para você concluir o envio.</p>}
        </form>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Cabecalho />
      <main>
        <Hero />
        <Sobre />
        <Metodo />
        <Servicos />
        <ComoFunciona />
        <Contato />
      </main>
      <footer className="rodape">
        <div className="container rodape__linha">
          <Logo />
          <p>{empresa.assinatura} © {new Date().getFullYear()} {empresa.nome}</p>
        </div>
      </footer>
      <a className="whats-flutuante" href={linkWhats()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>
      </a>
    </>
  )
}
