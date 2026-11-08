import { useEffect, useState } from 'react'
import { empresa, nome, metodo, servicos, etapas, simbolo, portfolio } from './conteudo.js'
import Icone from './Icone.jsx'
import Diamante, { useVisivel } from './Diamante.jsx'
import { Relampagos, Assinatura, GradeFundo } from './Efeitos.jsx'

const linkWhats = (msg = 'Olá! Vim pelo site da VIS creative e quero saber mais.') =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(msg)}`

const menu = [
  ['#sobre', 'Sobre'],
  ['#simbolo', 'O símbolo'],
  ['#metodo', 'Método VIS'],
  ['#servicos', 'Serviços'],
  ['#portfolio', 'Criativos'],
  ['#contato', 'Contato'],
]

function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label={empresa.nome}>
      <img src="./logo/vis-simbolo.svg" alt="" width="22" height="38" />
      <span><b>VIS</b>creative<i>.</i></span>
    </a>
  )
}

function Cabecalho({ temPortfolio }) {
  const [aberto, setAberto] = useState(false)
  return (
    <header className="cabecalho">
      <div className="container cabecalho__linha">
        <Logo />
        <button className="menu-botao" aria-label="Abrir menu" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
          {aberto ? '✕' : '☰'}
        </button>
        <nav className={`nav ${aberto ? 'nav--aberto' : ''}`}>
          {menu.filter(([href]) => temPortfolio || href !== '#portfolio').map(([href, n]) => (
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
    <section id="inicio" className="hero fundo-magenta listras">
      <GradeFundo />
      <Relampagos />
      <Assinatura lado="direita" />
      <div className="container hero__grade">
        <div className="hero__texto">
          <p className="hero__linha-fina">Transformamos ideias em</p>
          <h1>
            <span className="titulo-pesado">Criatividade</span>
            <span className="hero__e"><span className="faixa faixa--fina">e</span></span>
            <span className="titulo-poder">Poder.</span>
          </h1>
          <p className="hero__chamada">
            Conteúdos que <strong>chamam atenção</strong>, <strong>fortalecem marcas</strong> e <strong>criam oportunidades</strong> de negócio.
          </p>
          <div className="hero__botoes">
            <a className="botao botao--laranja" href={linkWhats('Olá! Quero solicitar uma proposta da VIS creative.')} target="_blank" rel="noreferrer">Solicitar proposta</a>
            <a className="botao botao--contorno" href="#servicos">Conhecer serviços</a>
          </div>
          <p className="arroba"><span className="arroba__icone" aria-hidden="true" />{empresa.instagramNome}</p>
        </div>
        <div className="hero__arte">
          <Diamante montar className="hero__simbolo" titulo="Símbolo VIS: o raio se une ao V e ao I e forma um diamante" />
        </div>
      </div>
    </section>
  )
}

function Sobre() {
  return (
    <section id="sobre" className="secao fundo-laranja listras">
      <GradeFundo />
      <Assinatura lado="esquerda" />
      <div className="container sobre">
        <div>
          <p className="etiqueta">Quem somos</p>
          <h2 className="titulo-misto">
            <span className="titulo-pesado">Ideias</span> <span className="faixa faixa--fina">que movimentam</span>{' '}
            <span className="titulo-pesado titulo-pesado--branco">Empresas</span>
          </h2>
          <p className="sobre__texto">{empresa.sobre}</p>
        </div>
        <div className="cartao cartao--vidro">
          <h3>{nome.titulo}</h3>
          <p>{nome.texto}</p>
        </div>
      </div>
    </section>
  )
}

function Simbolo() {
  const [ref, visivel] = useVisivel()
  return (
    <section id="simbolo" className="secao fundo-escuro simbolo" ref={ref}>
      <div className="container">
        <p className="etiqueta etiqueta--centro">O nosso símbolo</p>
        <h2 className="titulo-centro">
          <span className="titulo-pesado">Lapidamos</span> <span className="titulo-poder titulo-poder--medio">diamantes.</span>
        </h2>
        <div className="simbolo__texto">
          {simbolo.texto.map((t) => <p key={t}>{t}</p>)}
        </div>
        <ol className={`equacao ${visivel ? 'equacao--visivel' : ''}`}>
          {simbolo.partes.map((p, i) => (
            <li key={p.titulo} className={`equacao__parte equacao__parte--${p.mostrar}`}>
              <div className="equacao__arte">
                <Diamante mostrar={p.mostrar} montar={p.mostrar === 'tudo'} ativo={visivel} titulo={p.titulo} />
              </div>
              <h3>{p.titulo}</h3>
              <p className="equacao__sub">{p.sub}</p>
              <p>{p.texto}</p>
              {i < simbolo.partes.length - 1 && <span className="equacao__sinal" aria-hidden="true">{i === 0 ? '+' : '='}</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Metodo() {
  return (
    <section id="metodo" className="secao fundo-magenta listras">
      <Relampagos className="relampagos--suave" />
      <Assinatura lado="direita" />
      <div className="container">
        <p className="etiqueta etiqueta--centro">Como pensamos</p>
        <h2 className="titulo-centro">
          <span className="faixa faixa--fina">o</span> <span className="titulo-poder titulo-poder--medio">Método VIS</span>
        </h2>
        <p className="secao__sub">Três pilares que orientam cada projeto, do planejamento ao resultado.</p>
        <div className="grade grade--3">
          {metodo.map((m) => (
            <article key={m.letra} className={`pilar ${m.letra === 'S' ? 'pilar--raio' : ''}`}>
              <span className="pilar__letra" aria-hidden="true">{m.letra}</span>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
              {m.letra === 'S' && <p className="pilar__nota">O raio: o poder da VIS.</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="secao fundo-escuro">
      <div className="container">
        <p className="etiqueta etiqueta--centro">O que fazemos</p>
        <h2 className="titulo-centro">
          <span className="titulo-pesado">Nossos</span> <span className="faixa faixa--fina">serviços</span>
        </h2>
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

// Descobre quais imagens do portfólio já existem
function useCriativosDisponiveis() {
  const [ok, setOk] = useState([])
  useEffect(() => {
    portfolio.forEach((item) => {
      const img = new Image()
      img.onload = () => setOk((lista) => (lista.includes(item) ? lista : portfolio.filter((p) => p === item || lista.includes(p))))
      img.src = `./${item.imagem}`
    })
  }, [])
  return ok
}

function Portfolio({ itens }) {
  if (!itens.length) return null
  return (
    <section id="portfolio" className="secao fundo-laranja listras">
      <GradeFundo />
      <Assinatura lado="esquerda" />
      <div className="container">
        <p className="etiqueta etiqueta--centro">Nossos criativos</p>
        <h2 className="titulo-centro">
          <span className="titulo-pesado">Imagem</span> <span className="faixa faixa--fina">é poder de</span>{' '}
          <span className="titulo-pesado titulo-pesado--branco">impacto</span>
        </h2>
        <p className="secao__sub">Alguns dos conteúdos que criamos para as redes.</p>
        <div className="criativos">
          {itens.map((p) => (
            <figure key={p.imagem} className="criativo">
              <img src={`./${p.imagem}`} alt={p.titulo} loading="lazy" />
              <figcaption>{p.legenda}</figcaption>
            </figure>
          ))}
        </div>
        <p className="centro">
          <a className="botao botao--contorno" href={empresa.instagram} target="_blank" rel="noreferrer">Ver mais no Instagram {empresa.instagramNome}</a>
        </p>
      </div>
    </section>
  )
}

function ComoFunciona() {
  return (
    <section id="como-funciona" className="secao fundo-escuro">
      <div className="container">
        <p className="etiqueta etiqueta--centro">Passo a passo</p>
        <h2 className="titulo-centro">
          <span className="titulo-pesado">Como</span> <span className="faixa faixa--fina">funciona</span>
        </h2>
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
    <section id="contato" className="secao fundo-magenta listras">
      <Relampagos className="relampagos--suave" />
      <Assinatura lado="direita" />
      <div className="container contato">
        <div>
          <p className="etiqueta">Vamos conversar</p>
          <h2 className="titulo-misto">
            <span className="faixa faixa--fina">pronto para dar mais</span>
            <span className="titulo-poder titulo-poder--medio">poder</span>
            <span className="titulo-pesado titulo-pesado--branco">à sua marca?</span>
          </h2>
          <p className="contato__texto">Conte um pouco sobre o seu negócio. Respondemos pelo WhatsApp.</p>
          <ul className="contato__lista">
            <li><a href={linkWhats()} target="_blank" rel="noreferrer">WhatsApp {empresa.telefone}</a></li>
            <li><a href={`mailto:${empresa.email}`}>{empresa.email}</a></li>
            <li><a href={empresa.instagram} target="_blank" rel="noreferrer">{empresa.instagramNome}</a></li>
            <li>{empresa.cidade}</li>
          </ul>
        </div>
        <form className="cartao cartao--vidro formulario" onSubmit={enviar}>
          <label>Seu nome<input name="nome" required autoComplete="name" /></label>
          <label>Empresa<input name="empresa" autoComplete="organization" /></label>
          <label>Serviço de interesse
            <select name="servico" defaultValue="Ainda não sei">
              <option>Ainda não sei</option>
              {servicos.map((s) => <option key={s.titulo}>{s.titulo}</option>)}
            </select>
          </label>
          <label>Mensagem<textarea name="mensagem" rows="4" required /></label>
          <button className="botao botao--laranja" type="submit">Enviar pelo WhatsApp</button>
          {enviado && <p className="aviso">Abrimos o WhatsApp para você concluir o envio.</p>}
        </form>
      </div>
    </section>
  )
}

export default function App() {
  const criativos = useCriativosDisponiveis()
  return (
    <>
      <Cabecalho temPortfolio={criativos.length > 0} />
      <main>
        <Hero />
        <Sobre />
        <Simbolo />
        <Metodo />
        <Servicos />
        <Portfolio itens={criativos} />
        <ComoFunciona />
        <Contato />
      </main>
      <footer className="rodape">
        <div className="container rodape__linha">
          <Logo />
          <p>{empresa.assinatura} © {new Date().getFullYear()} {empresa.nome}</p>
          <a href={empresa.instagram} target="_blank" rel="noreferrer">{empresa.instagramNome}</a>
        </div>
      </footer>
      <a className="whats-flutuante" href={linkWhats()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>
      </a>
    </>
  )
}
