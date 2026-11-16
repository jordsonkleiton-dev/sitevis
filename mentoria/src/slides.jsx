import Diamante, { Letra } from '../../src/Diamante.jsx'
import { Relampagos, Assinatura, GradeFundo } from '../../src/Efeitos.jsx'
import { Passo } from './Apresentacao.jsx'

// ✏️ Cada slide: componente, número de passos (cliques que revelam itens),
// seção (aparece no rodapé), fundo e notas do mentor (tecla N).
// Lembrete: a fonte Play Pretend (.titulo-poder) não tem acentos.

function Capa() {
  return (
    <div className="capa">
      <Relampagos className="relampagos--suave" />
      <GradeFundo />
      <div className="capa__texto">
        <p className="etiqueta">Mentoria VIS creative</p>
        <h1>
          <span className="titulo-pesado titulo-pesado--branco capa__linha">Vídeos que</span>
          <span className="titulo-poder capa__poder">VENDEM</span>
        </h1>
        <p className="capa__sub">O que falar, como falar e como gravar o seu produto para <strong>alcançar novos clientes no Instagram</strong>.</p>
      </div>
      <div className="capa__arte"><Diamante montar ativo className="capa__diamante" /></div>
      <Assinatura lado="direita" />
    </div>
  )
}

const ROTEIRO_DO_DIA = [
  { letra: 'diag', titulo: 'Diagnóstico', texto: 'Entender a sua empresa antes de qualquer dica.' },
  { letra: 'V', titulo: 'Visibilidade', texto: 'Como o Instagram entrega vídeo para quem ainda não te segue.' },
  { letra: 'I', titulo: 'Identidade', texto: 'O que falar e como falar do seu produto.' },
  { letra: 'S', titulo: 'Estratégia Social', texto: 'Roteiro, gravação no celular e chamada para venda.' },
  { letra: 'plano', titulo: 'Plano + dúvidas', texto: 'Seus próximos 30 dias e tudo o que ficou em aberto.' },
]

function Roteiro({ passo }) {
  return (
    <div className="conteudo">
      <p className="etiqueta">Nosso caminho hoje</p>
      <h2 className="titulo-pesado titulo-pesado--branco">5 etapas, <span className="faixa faixa--fina">um objetivo: vender</span></h2>
      <ol className="trilha">
        {ROTEIRO_DO_DIA.map((e, i) => (
          <Passo key={e.titulo} em={i + 1} passo={passo} como="li" className="trilha__item">
            <div className="trilha__icone">
              {e.letra === 'V' || e.letra === 'I' ? <Letra letra={e.letra} titulo={e.titulo} />
                : e.letra === 'S' ? <Diamante mostrar="raio" titulo="S" />
                : <span className="trilha__num">{i + 1}</span>}
            </div>
            <h3>{e.titulo}</h3>
            <p>{e.texto}</p>
          </Passo>
        ))}
      </ol>
    </div>
  )
}

const PERGUNTAS_PRODUTO = [
  ['O que você vende, e qual produto mais dá lucro hoje?', 'Define o produto-herói dos primeiros vídeos.'],
  ['Quem compra de você? Descreva o seu melhor cliente.', 'Mostra para quem o vídeo fala.'],
  ['Por que ele compra de você e não do concorrente?', 'Vira o diferencial que precisa aparecer na fala.'],
  ['Qual dúvida ou objeção você mais escuta antes da venda?', 'Vira pauta pronta: cada objeção é um vídeo.'],
]

function Diagnostico({ passo }) {
  return (
    <div className="conteudo">
      <p className="etiqueta">Diagnóstico · bloco 1 de 4</p>
      <h2 className="titulo-pesado titulo-pesado--branco">Seu produto e <span className="faixa">seu cliente</span></h2>
      <div className="perguntas">
        {PERGUNTAS_PRODUTO.map(([p, r], i) => (
          <Passo key={p} em={i + 1} passo={passo} className="pergunta">
            <span className="pergunta__num">{String(i + 1).padStart(2, '0')}</span>
            <p className="pergunta__texto">{p}</p>
            <p className="pergunta__porque">↳ {r}</p>
          </Passo>
        ))}
      </div>
    </div>
  )
}

const MAPA = [
  ['“Não sei o que postar”', 'Identidade', 'pilares de conteúdo + banco de pautas'],
  ['“Tenho vergonha de aparecer”', 'Estratégia Social', 'formatos sem rosto e gravação guiada'],
  ['“Posto, mas ninguém vê”', 'Visibilidade', 'gancho, retenção e alcance de não seguidores'],
  ['“Tenho views, mas não vendo”', 'Estratégia Social', 'oferta clara, chamada e caminho até o WhatsApp'],
]

function Mapa({ passo }) {
  return (
    <div className="conteudo">
      <p className="etiqueta">Mapa de direção</p>
      <h2 className="titulo-pesado titulo-pesado--branco">A sua resposta <span className="faixa faixa--fina">define o caminho</span></h2>
      <div className="mapa">
        <div className="mapa__cab"><span>Se você disse…</span><span>Foco</span><span>O que vamos trabalhar</span></div>
        {MAPA.map(([dor, foco, acao], i) => (
          <Passo key={dor} em={i + 1} passo={passo} className="mapa__linha">
            <span className="mapa__dor">{dor}</span>
            <span className="mapa__foco">{foco}</span>
            <span>{acao}</span>
          </Passo>
        ))}
      </div>
    </div>
  )
}

function Formula({ passo }) {
  const partes = [
    { t: 'GANCHO', tempo: '0 a 3 s', txt: 'Pare a rolagem com a dor ou a promessa.', ex: '“Seu cabelo arma no calor? Olha isso.”' },
    { t: 'PROVA', tempo: '3 a 20 s', txt: 'Mostre o produto resolvendo, não só descrito.', ex: 'Antes e depois, aplicação real, cliente usando.' },
    { t: 'CHAMADA', tempo: 'final', txt: 'Diga exatamente o próximo passo.', ex: '“Comenta CACHO que eu te mando o kit.”' },
  ]
  return (
    <div className="conteudo">
      <p className="etiqueta">Estratégia Social · roteiro</p>
      <h2 className="titulo-pesado titulo-pesado--branco">A fórmula de <span className="faixa">todo vídeo que vende</span></h2>
      <div className="formula">
        {partes.map((p, i) => (
          <Passo key={p.t} em={i + 1} passo={passo} className="formula__bloco">
            <span className="titulo-poder formula__titulo">{p.t}</span>
            <span className="formula__tempo">{p.tempo}</span>
            <p>{p.txt}</p>
            <p className="formula__ex">{p.ex}</p>
          </Passo>
        ))}
      </div>
    </div>
  )
}

function Duvidas() {
  return (
    <div className="capa capa--centro">
      <Relampagos />
      <div>
        <p className="etiqueta etiqueta--centro">Espaço para dúvidas</p>
        <h2 className="titulo-poder duvidas__titulo">SUA VEZ</h2>
        <p className="capa__sub capa__sub--centro">Nenhuma pergunta é básica demais. <strong>Se ficou dúvida, ela vira o próximo vídeo.</strong></p>
      </div>
    </div>
  )
}

export const slides = [
  { componente: Capa, secao: 'Abertura', notas: 'Apresente-se e combine o formato: diagnóstico primeiro, conteúdo depois, dúvidas no final (e a qualquer momento).' },
  { componente: Roteiro, passos: 5, secao: 'Abertura', fundo: 'fundo-escuro', notas: 'Revele uma etapa por clique. Reforce que o diagnóstico vem antes porque cada empresa tem um gargalo diferente.' },
  { componente: Diagnostico, passos: 4, secao: 'Diagnóstico', fundo: 'fundo-escuro', notas: 'Faça a pergunta, escute e anote. Não dê a solução ainda: só registre. As respostas alimentam o mapa de direção.' },
  { componente: Mapa, passos: 4, secao: 'Diagnóstico', notas: 'Com base nas respostas, marque qual linha mais se parece com o mentorado. Ela define quanto tempo dedicar a cada módulo.' },
  { componente: Formula, passos: 3, secao: 'Estratégia Social', fundo: 'fundo-laranja', notas: 'Use o produto do próprio mentorado como exemplo e escreva o gancho junto com ele.' },
  { componente: Duvidas, secao: 'Dúvidas', notas: 'Abra para perguntas. As que exigirem mais tempo vão para a lista de próximos passos.' },
]
