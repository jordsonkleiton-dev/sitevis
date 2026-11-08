import { useState } from 'react'
import { empresa, servicos, diferenciais, planos, depoimentos } from './conteudo.js'

const linkWhats = (msg = 'Olá! Vim pelo site e gostaria de mais informações.') =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(msg)}`

const menu = [
  ['#servicos', 'Serviços'],
  ['#planos', 'Planos'],
  ['#depoimentos', 'Depoimentos'],
  ['#contato', 'Contato'],
]

function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  return (
    <header className="cabecalho">
      <div className="container cabecalho__linha">
        <a href="#inicio" className="logo">✦ {empresa.nome}</a>
        <button className="menu-botao" aria-label="Abrir menu" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
          {aberto ? '✕' : '☰'}
        </button>
        <nav className={`nav ${aberto ? 'nav--aberto' : ''}`}>
          {menu.map(([href, nome]) => (
            <a key={href} href={href} onClick={() => setAberto(false)}>{nome}</a>
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
      <div className="container">
        <h1>{empresa.slogan}</h1>
        <p>{empresa.descricao}</p>
        <div className="hero__botoes">
          <a className="botao" href={linkWhats()} target="_blank" rel="noreferrer">Pedir orçamento</a>
          <a className="botao botao--contorno" href="#servicos">Ver serviços</a>
        </div>
        <ul className="numeros">
          {diferenciais.map((d) => (
            <li key={d.texto}><strong>{d.numero}</strong><span>{d.texto}</span></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="secao">
      <div className="container">
        <h2>Nossos serviços</h2>
        <p className="secao__sub">Tudo o que você precisa, em um só lugar.</p>
        <div className="grade">
          {servicos.map((s) => (
            <article key={s.titulo} className="cartao">
              <span className="cartao__icone" aria-hidden="true">{s.icone}</span>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Planos() {
  return (
    <section id="planos" className="secao secao--alt">
      <div className="container">
        <h2>Planos e preços</h2>
        <p className="secao__sub">Escolha o que combina com você.</p>
        <div className="grade">
          {planos.map((p) => (
            <article key={p.nome} className={`cartao plano ${p.destaque ? 'plano--destaque' : ''}`}>
              {p.destaque && <span className="selo">Mais escolhido</span>}
              <h3>{p.nome}</h3>
              <p className="plano__preco">{p.preco}<small>{p.periodo}</small></p>
              <ul>{p.itens.map((i) => <li key={i}>✓ {i}</li>)}</ul>
              <a className={`botao ${p.destaque ? '' : 'botao--contorno'}`} href={linkWhats(`Olá! Tenho interesse no plano ${p.nome}.`)} target="_blank" rel="noreferrer">
                Quero este
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Depoimentos() {
  return (
    <section id="depoimentos" className="secao">
      <div className="container">
        <h2>O que dizem nossos clientes</h2>
        <div className="grade">
          {depoimentos.map((d) => (
            <figure key={d.nome} className="cartao depoimento">
              <blockquote>“{d.texto}”</blockquote>
              <figcaption>— {d.nome}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contato() {
  const [enviado, setEnviado] = useState(false)
  function enviar(e) {
    e.preventDefault()
    const dados = new FormData(e.target)
    const msg = `Olá! Meu nome é ${dados.get('nome')}.\n${dados.get('mensagem')}`
    window.open(linkWhats(msg), '_blank')
    setEnviado(true)
  }
  return (
    <section id="contato" className="secao secao--alt">
      <div className="container contato">
        <div>
          <h2>Fale com a gente</h2>
          <ul className="contato__lista">
            <li>📞 {empresa.telefone}</li>
            <li>✉️ <a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
            <li>📍 {empresa.endereco}</li>
            <li>🕒 {empresa.horario}</li>
          </ul>
        </div>
        <form className="cartao formulario" onSubmit={enviar}>
          <label>Seu nome<input name="nome" required /></label>
          <label>Mensagem<textarea name="mensagem" rows="4" required /></label>
          <button className="botao" type="submit">Enviar pelo WhatsApp</button>
          {enviado && <p className="aviso">Abrimos o WhatsApp para você concluir o envio. 😊</p>}
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
        <Servicos />
        <Planos />
        <Depoimentos />
        <Contato />
      </main>
      <footer className="rodape">
        <div className="container">
          <p>© {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.</p>
          <a href={empresa.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </footer>
      <a className="whats-flutuante" href={linkWhats()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">💬</a>
    </>
  )
}
