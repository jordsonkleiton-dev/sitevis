import { useEffect, useState } from 'react'
import { Relampagos, Assinatura } from '../../src/Efeitos.jsx'
import { empresa } from '../../src/conteudo.js'
import { Passo } from './Apresentacao.jsx'
import Objeto3D from './Objeto3D.jsx'
import Diamante, { Letra } from '../../src/Diamante.jsx'

// ✏️ Conteúdo da mentoria. Cada slide tem: componente, título (visão geral),
// seção, passos (cliques que revelam itens), fundo, notas do mentor (tecla N).
// Lembrete: a fonte Play Pretend (.titulo-poder) não tem acentos.

/* ---------- Peças reutilizáveis ---------- */

function Titulo({ etiqueta, children }) {
  return (
    <header className="titulo">
      {etiqueta && <p className="etiqueta">{etiqueta}</p>}
      <h2 className="titulo-pesado titulo-pesado--branco titulo-3d">{children}</h2>
    </header>
  )
}

// Grade de cartões que entram um por clique
function Cartoes({ etiqueta, titulo, itens, colunas = 3, passo, numerar = false, classe = '' }) {
  return (
    <div className="conteudo">
      <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
      <div className={`cartoes ${classe}`} style={{ '--colunas': colunas }}>
        {itens.map((it, i) => (
          <Passo key={it.titulo} em={i + 1} passo={passo} className="cartao3d">
            {(numerar || it.icone) && <span className="cartao3d__icone">{it.icone ?? String(i + 1).padStart(2, '0')}</span>}
            <h3>{it.titulo}</h3>
            {it.texto && <p>{it.texto}</p>}
            {it.ex && <p className="cartao3d__ex">{it.ex}</p>}
          </Passo>
        ))}
      </div>
    </div>
  )
}

function Divisor({ numero, objeto, titulo, sub }) {
  return (
    <div className="divisor">
      <div className="divisor__arte"><Objeto3D tipo={objeto} className="divisor__objeto" /></div>
      <div className="divisor__texto">
        <span className="titulo-poder divisor__num">{numero}</span>
        <h2 className="titulo-pesado titulo-pesado--branco titulo-3d">{titulo}</h2>
        <p className="divisor__sub">{sub}</p>
      </div>
      <Assinatura lado="direita" />
    </div>
  )
}

function BlocoPerguntas({ bloco, titulo, perguntas, passo }) {
  return (
    <div className="conteudo">
      <Titulo etiqueta={`Diagnóstico · bloco ${bloco} de 4`}>{titulo}</Titulo>
      <div className="perguntas">
        {perguntas.map(([p, r], i) => (
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

/* ---------- Abertura ---------- */

function Capa() {
  return (
    <div className="capa">
      <Relampagos className="relampagos--suave" />
      <div className="capa__texto">
        <p className="etiqueta">Mentoria VIS creative</p>
        <h1>
          <span className="titulo-pesado titulo-pesado--branco capa__linha titulo-3d">Vídeos que</span>
          <span className="titulo-poder capa__poder poder-3d">VENDEM</span>
        </h1>
        <p className="capa__sub">O que falar, como falar e como gravar o seu produto para <strong>alcançar novos clientes no Instagram</strong>.</p>
      </div>
      <div className="capa__arte"><Objeto3D tipo="diamante" className="capa__objeto" /></div>
      <Assinatura lado="direita" />
    </div>
  )
}

function Combinados({ passo }) {
  return (
    <Cartoes
      etiqueta="Antes de começar" titulo={<>Como funciona <span className="faixa faixa--fina">o nosso encontro</span></>}
      passo={passo} colunas={4}
      itens={[
        { icone: '🔍', titulo: 'Primeiro eu escuto', texto: 'Começamos pelo diagnóstico da sua empresa. Nada de receita pronta.' },
        { icone: '🎯', titulo: 'Depois, o método', texto: 'Visibilidade, Identidade e Estratégia Social aplicados ao seu produto.' },
        { icone: '🎬', titulo: 'Mão na massa', texto: 'Você sai com o roteiro do seu primeiro vídeo escrito.' },
        { icone: '💬', titulo: 'Pergunte à vontade', texto: 'Dúvida pode a qualquer momento. Ela é o melhor material da mentoria.' },
      ]}
    />
  )
}

const CAMINHO = [
  { obj: null, num: '1', titulo: 'Diagnóstico', texto: 'Entender a sua empresa antes de qualquer dica.' },
  { obj: 'V', titulo: 'Visibilidade', texto: 'Como o Instagram entrega vídeo para quem ainda não te segue.' },
  { obj: 'I', titulo: 'Identidade', texto: 'O que falar e como falar do seu produto.' },
  { obj: 'raio', titulo: 'Estratégia Social', texto: 'Roteiro, gravação no celular e o caminho até a venda.' },
  { obj: null, num: '5', titulo: 'Plano + dúvidas', texto: 'Seus próximos 30 dias e tudo o que ficou em aberto.' },
]
function Caminho({ passo }) {
  return (
    <div className="conteudo">
      <Titulo etiqueta="Nosso caminho hoje">5 etapas, <span className="faixa faixa--fina">um objetivo: vender</span></Titulo>
      <ol className="trilha">
        {CAMINHO.map((e, i) => (
          <Passo key={e.titulo} em={i + 1} passo={passo} como="li" className="trilha__item">
            <div className="trilha__icone">
              {e.obj === 'raio' ? <Diamante mostrar="raio" titulo="S" /> : e.obj ? <Letra letra={e.obj} titulo={e.titulo} /> : <span className="titulo-poder trilha__num">{e.num}</span>}
            </div>
            <h3>{e.titulo}</h3>
            <p>{e.texto}</p>
          </Passo>
        ))}
      </ol>
    </div>
  )
}

function Verdade({ passo }) {
  return (
    <div className="frase">
      <Passo em={0} passo={passo} inclinar={false} className="frase__linha">
        <p className="frase__pequena">Seu cliente já está no Instagram, rolando o feed agora.</p>
      </Passo>
      <Passo em={1} passo={passo} inclinar={false} className="frase__linha">
        <p className="titulo-pesado titulo-pesado--branco titulo-3d frase__grande">A pergunta é: <span className="faixa">ele para</span> no seu vídeo?</p>
      </Passo>
      <Passo em={2} passo={passo} inclinar={false} className="frase__linha">
        <p className="frase__pequena">Vender por vídeo não é talento. <strong>É método, e método se aprende.</strong></p>
      </Passo>
    </div>
  )
}

/* ---------- Diagnóstico ---------- */

const Bloco1 = ({ passo }) => <BlocoPerguntas bloco={1} passo={passo} titulo={<>Seu produto e <span className="faixa">seu cliente</span></>} perguntas={[
  ['O que você vende, e qual produto mais dá lucro hoje?', 'Define o produto-herói dos primeiros vídeos.'],
  ['Quem compra de você? Descreva o seu melhor cliente.', 'Mostra para quem o vídeo fala.'],
  ['Por que ele compra de você e não do concorrente?', 'Vira o diferencial que precisa aparecer na fala.'],
  ['Qual dúvida ou objeção você mais escuta antes da venda?', 'Vira pauta pronta: cada objeção é um vídeo.'],
]} />

const Bloco2 = ({ passo }) => <BlocoPerguntas bloco={2} passo={passo} titulo={<>Seu Instagram <span className="faixa">hoje</span></>} perguntas={[
  ['Quantas vezes você posta por semana, e em quais formatos?', 'Mostra se o problema é constância ou formato.'],
  ['Qual foi o seu vídeo mais visto? Por que acha que foi?', 'É o ponto de partida: repetir o que já funcionou.'],
  ['De onde vêm as suas vendas hoje? Direct, WhatsApp, loja, indicação?', 'Define para onde a chamada do vídeo leva.'],
  ['Quem cai no seu perfil entende em 3 segundos o que você vende?', 'Se não entende, o alcance se perde no perfil.'],
]} />

const Bloco3 = ({ passo }) => <BlocoPerguntas bloco={3} passo={passo} titulo={<>Você e <span className="faixa">o vídeo</span></>} perguntas={[
  ['O que mais te impede de gravar: tempo, vergonha, não saber o que falar ou editar?', 'Aponta o primeiro bloqueio a destravar.'],
  ['Você topa aparecer, ou prefere começar sem mostrar o rosto?', 'Escolhe os formatos certos para começar.'],
  ['Que equipamento você tem? Celular, microfone, luz, tripé?', 'Ajusta as dicas de gravação ao que existe.'],
  ['Quanto tempo por semana dá para dedicar ao conteúdo, de verdade?', 'Define o tamanho realista da rotina.'],
]} />

const Bloco4 = ({ passo }) => <BlocoPerguntas bloco={4} passo={passo} titulo={<>Metas e <span className="faixa">resultado</span></>} perguntas={[
  ['Quanto você quer vender a mais por mês?', 'Transforma “quero crescer” em número.'],
  ['Qual produto você quer empurrar nos próximos 30 dias?', 'Foca o plano em uma oferta só.'],
  ['Tem alguma data, lançamento ou promoção chegando?', 'Encaixa a campanha no calendário.'],
  ['Como você vai saber, daqui a 30 dias, que valeu a pena?', 'Combina como vamos medir o sucesso.'],
]} />

const MAPA = [
  ['“Não sei o que postar”', 'Identidade', 'pilares de conteúdo + fábrica de pautas'],
  ['“Tenho vergonha de aparecer”', 'Estratégia Social', 'formatos sem rosto e gravação guiada'],
  ['“Posto, mas ninguém vê”', 'Visibilidade', 'gancho, retenção e perfil que converte'],
  ['“Tenho views, mas não vendo”', 'Estratégia Social', 'oferta clara, chamada e caminho até o WhatsApp'],
  ['“Não tenho tempo”', 'Plano', 'rotina semanal e gravação em lote'],
]
function Mapa({ passo }) {
  const [marcadas, setMarcadas] = useState([])
  const alternar = (i) => setMarcadas((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]))
  return (
    <div className="conteudo">
      <Titulo etiqueta="Mapa de direção · clique na linha do mentorado">A sua resposta <span className="faixa faixa--fina">define o caminho</span></Titulo>
      <div className="mapa">
        <div className="mapa__cab"><span>Se você disse…</span><span>Foco</span><span>O que vamos trabalhar</span></div>
        {MAPA.map(([dor, foco, acao], i) => (
          <Passo key={dor} em={i + 1} passo={passo} className={`mapa__linha ${marcadas.includes(i) ? 'mapa__linha--marcada' : ''}`} data-interativo onClick={() => alternar(i)}>
            <span className="mapa__dor"><i className="mapa__check">{marcadas.includes(i) ? '✓' : ''}</i>{dor}</span>
            <span className="mapa__foco">{foco}</span>
            <span>{acao}</span>
          </Passo>
        ))}
      </div>
    </div>
  )
}

/* ---------- V · Visibilidade ---------- */

function Distribuicao({ passo }) {
  const etapas = [
    { t: 'Teste pequeno', d: 'O vídeo é mostrado primeiro para um grupo pequeno, de seguidores e não seguidores.' },
    { t: 'Avaliação', d: 'O Instagram mede: assistiram até o fim? Enviaram para alguém? Salvaram? Comentaram?' },
    { t: 'Mais alcance', d: 'Se as pessoas reagem bem, o vídeo é levado para cada vez mais gente que ainda não te conhece.' },
  ]
  return (
    <div className="conteudo">
      <Titulo etiqueta="Visibilidade · como funciona">Como o Instagram <span className="faixa">espalha</span> o seu vídeo</Titulo>
      <div className="anel">
        {etapas.map((e, i) => (
          <Passo key={e.t} em={i + 1} passo={passo} className={`anel__etapa anel__etapa--${i + 1}`}>
            <div className="anel__circulo"><span>{i + 1}</span></div>
            <h3>{e.t}</h3>
            <p>{e.d}</p>
          </Passo>
        ))}
      </div>
      <Passo em={4} passo={passo} inclinar={false} className="destaque">
        Ou seja: <strong>quem decide o alcance é a reação das pessoas</strong>, não o número de seguidores.
      </Passo>
    </div>
  )
}

const Sinais = ({ passo }) => <Cartoes passo={passo} colunas={4} etiqueta="Visibilidade · o que conta"
  titulo={<>Os sinais que <span className="faixa faixa--fina">fazem o vídeo crescer</span></>}
  itens={[
    { icone: '⏱', titulo: 'Retenção', texto: 'Quantas pessoas passam dos primeiros 3 segundos e vão até o fim.', ex: 'É o sinal mais forte. O gancho decide.' },
    { icone: '📤', titulo: 'Envios', texto: 'Quando alguém manda o seu vídeo para um amigo.', ex: 'Curtida é aplauso. Envio é indicação.' },
    { icone: '🔖', titulo: 'Salvamentos', texto: 'Quando o conteúdo é útil a ponto de guardar.', ex: 'Dicas, listas e passo a passo são salvos.' },
    { icone: '💬', titulo: 'Comentários', texto: 'Conversa de verdade, não só emoji.', ex: 'Pergunte algo no final do vídeo.' },
  ]} />

const Formatos = ({ passo }) => <Cartoes passo={passo} colunas={4} etiqueta="Visibilidade · formatos"
  titulo={<>Cada formato <span className="faixa faixa--fina">tem uma função</span></>}
  itens={[
    { icone: '🎬', titulo: 'Reels', texto: 'Alcance. É onde você conhece clientes novos.', ex: 'Use para atrair.' },
    { icone: '🗂', titulo: 'Carrossel', texto: 'Ensinar e ser salvo. Aprofunda o assunto.', ex: 'Use para provar que entende.' },
    { icone: '⭕', titulo: 'Stories', texto: 'Relacionamento diário com quem já te segue.', ex: 'Use para vender todo dia.' },
    { icone: '🤝', titulo: 'Live e collab', texto: 'Autoridade e público emprestado de parceiros.', ex: 'Use para crescer junto.' },
  ]} />

function Perfil({ passo }) {
  const itens = [
    ['Foto', 'Rosto ou logo nítido, que se reconhece pequeno.'],
    ['Nome', 'Inclua a palavra que o cliente pesquisa: “Doces finos · Natal”.'],
    ['Bio', 'O que você faz + para quem + a chamada. Em 3 linhas.'],
    ['Link', 'Direto para o WhatsApp com mensagem pronta.'],
    ['Destaques', 'Produtos, depoimentos, como comprar, entrega.'],
    ['Fixados', 'Seus 3 melhores vídeos de venda no topo.'],
  ]
  return (
    <div className="conteudo conteudo--lado">
      <div>
        <Titulo etiqueta="Visibilidade · perfil">O perfil <span className="faixa">fecha a venda</span></Titulo>
        <p className="texto-apoio">O vídeo traz a pessoa. Em 3 segundos no perfil ela decide se segue, chama ou vai embora.</p>
        <ul className="lista-check">
          {itens.map(([t, d], i) => (
            <Passo key={t} em={i + 1} passo={passo} como="li" inclinar={false} className="lista-check__item"><b>{t}</b> {d}</Passo>
          ))}
        </ul>
      </div>
      <Celular passo={passo} />
    </div>
  )
}

function Celular({ passo }) {
  return (
    <div className="celular-cena">
      <div className="celular" data-interativo>
        <div className="celular__tela">
          <div className={`cel cel__topo ${passo >= 1 ? 'cel--on' : ''}`}><div className="cel__foto" /><div className="cel__nums"><b>128</b><b>2.340</b><b>310</b></div></div>
          <div className={`cel cel__nome ${passo >= 2 ? 'cel--on' : ''}`}>Doces finos · Natal</div>
          <div className={`cel cel__bio ${passo >= 3 ? 'cel--on' : ''}`}>Bolos e doces para festas 🎂<br />Encomendas com 3 dias de antecedência<br />👇 Peça pelo WhatsApp</div>
          <div className={`cel cel__link ${passo >= 4 ? 'cel--on' : ''}`}>wa.me/seunumero</div>
          <div className={`cel cel__destaques ${passo >= 5 ? 'cel--on' : ''}`}>{['Cardápio', 'Clientes', 'Pedir', 'Entrega'].map((d) => <span key={d}><i />{d}</span>)}</div>
          <div className={`cel cel__grade ${passo >= 6 ? 'cel--on' : ''}`}>{Array.from({ length: 9 }, (_, i) => <i key={i} className={i < 3 ? 'fixado' : ''} />)}</div>
        </div>
      </div>
    </div>
  )
}

/* ---------- I · Identidade ---------- */

const TiposConteudo = ({ passo }) => <Cartoes passo={passo} colunas={3} etiqueta="Identidade · o que falar"
  titulo={<>3 tipos de conteúdo, <span className="faixa faixa--fina">3 funções</span></>}
  itens={[
    { icone: '🧲', titulo: 'Atrair', texto: 'Fala da dor, da curiosidade ou do desejo de quem ainda não te conhece.', ex: '“3 erros que deixam o seu bolo solado”' },
    { icone: '❤️', titulo: 'Conectar', texto: 'Mostra quem está por trás: bastidor, história, valores, rotina.', ex: '“Como começou a minha confeitaria”' },
    { icone: '💰', titulo: 'Vender', texto: 'Produto, prova e oferta, com chamada clara.', ex: '“O bolo mais pedido do mês e como encomendar”' },
  ]} />

function Fabrica({ passo }) {
  const pares = [
    ['“É caro?”', 'Por que custa isso, e o que está incluído'],
    ['“Funciona para mim?”', 'Caso real de um cliente parecido'],
    ['“Demora quanto?”', 'Bastidor do processo, do pedido à entrega'],
    ['“Qual a diferença?”', 'Comparação lado a lado'],
    ['“Como eu uso?”', 'Tutorial rápido de 30 segundos'],
  ]
  return (
    <div className="conteudo">
      <Titulo etiqueta="Identidade · fábrica de pautas">Pergunta de cliente <span className="faixa">vira vídeo</span></Titulo>
      <div className="fabrica">
        {pares.map(([p, v], i) => (
          <Passo key={p} em={i + 1} passo={passo} className="fabrica__linha">
            <span className="fabrica__pergunta">{p}</span>
            <span className="fabrica__seta">→</span>
            <span className="fabrica__video">🎬 {v}</span>
          </Passo>
        ))}
      </div>
    </div>
  )
}

function Escada({ passo }) {
  const degraus = [
    { t: 'Característica', d: 'O que o produto é', ex: '“Tecido dry fit”' },
    { t: 'Benefício', d: 'O que ele faz por você', ex: '“Não marca o suor”' },
    { t: 'Transformação', d: 'Como a vida fica melhor', ex: '“Do treino ao trabalho sem se preocupar”' },
  ]
  return (
    <div className="conteudo">
      <Titulo etiqueta="Identidade · como falar do produto">Suba a escada <span className="faixa faixa--fina">até a transformação</span></Titulo>
      <div className="escada">
        {degraus.map((g, i) => (
          <Passo key={g.t} em={i + 1} passo={passo} className={`degrau degrau--${i + 1}`}>
            <span className="degrau__num">{i + 1}</span>
            <h3>{g.t}</h3>
            <p>{g.d}</p>
            <p className="degrau__ex">{g.ex}</p>
          </Passo>
        ))}
      </div>
      <Passo em={4} passo={passo} inclinar={false} className="destaque">
        O cliente não compra o tecido. <strong>Compra a tranquilidade.</strong> Fale sempre do último degrau.
      </Passo>
    </div>
  )
}

function EviteFale({ passo }) {
  const pares = [
    ['Produto de alta qualidade', 'Dura 2 anos sem desbotar'],
    ['Atendimento diferenciado', 'Respondo em até 10 minutos no WhatsApp'],
    ['Preço imperdível', 'Sai por menos que um lanche por dia'],
    ['Somos referência', 'Já atendemos mais de 300 famílias na cidade (use o seu número real)'],
  ]
  return (
    <div className="conteudo">
      <Titulo etiqueta="Identidade · a língua do cliente">Troque o genérico <span className="faixa">pelo concreto</span></Titulo>
      <div className="troca">
        <div className="troca__cab"><span>✕ Evite</span><span>✓ Fale assim</span></div>
        {pares.map(([a, b], i) => (
          <Passo key={a} em={i + 1} passo={passo} className="troca__linha">
            <span className="troca__evite">{a}</span>
            <span className="troca__fale">{b}</span>
          </Passo>
        ))}
      </div>
    </div>
  )
}

/* ---------- S · Estratégia Social ---------- */

function Formula({ passo }) {
  const partes = [
    { t: 'GANCHO', tempo: '0 a 3 s', txt: 'Pare a rolagem com a dor ou a promessa.', ex: '“Seu cabelo arma no calor? Olha isso.”' },
    { t: 'PROVA', tempo: '3 a 20 s', txt: 'Mostre o produto resolvendo, não só descrito.', ex: 'Antes e depois, aplicação real, cliente usando.' },
    { t: 'CHAMADA', tempo: 'final', txt: 'Diga exatamente o próximo passo.', ex: '“Comenta CACHO que eu te mando o kit.”' },
  ]
  return (
    <div className="conteudo">
      <Titulo etiqueta="Estratégia Social · roteiro">A fórmula de <span className="faixa">todo vídeo que vende</span></Titulo>
      <div className="formula">
        {partes.map((p, i) => (
          <Passo key={p.t} em={i + 1} passo={passo} className="formula__bloco">
            <span className="titulo-poder formula__titulo poder-3d">{p.t}</span>
            <span className="formula__tempo">{p.tempo}</span>
            <p>{p.txt}</p>
            <p className="formula__ex">{p.ex}</p>
          </Passo>
        ))}
      </div>
    </div>
  )
}

const GANCHOS = [
  'Pare de ___ se você quer ___',
  '3 erros que ___',
  'Ninguém te conta isso sobre ___',
  'Olha o que acontece quando ___',
  'Você ainda ___? Assiste isso.',
  'Se eu fosse começar hoje, eu ___',
  'O que R$ ___ compra aqui',
  'Teste: ___ ou ___?',
  'Antes de comprar ___, veja isso',
  'O pedido mais estranho que já recebi',
]
function Ganchos({ passo }) {
  return (
    <div className="conteudo">
      <Titulo etiqueta="Estratégia Social · ganchos">10 ganchos <span className="faixa faixa--fina">para copiar e adaptar</span></Titulo>
      <div className="ganchos">
        {GANCHOS.map((g, i) => (
          <Passo key={g} em={Math.ceil((i + 1) / 2)} passo={passo} className="gancho">
            <span className="gancho__num">{String(i + 1).padStart(2, '0')}</span>{g}
          </Passo>
        ))}
      </div>
    </div>
  )
}

const Modelos = ({ passo }) => <Cartoes passo={passo} colunas={3} etiqueta="Estratégia Social · modelos" classe="cartoes--compactos"
  titulo={<>6 roteiros <span className="faixa">prontos</span></>}
  itens={[
    { icone: '🔄', titulo: 'Antes e depois', texto: 'Mostre o problema, corte, mostre o resultado.' },
    { icone: '⚠️', titulo: '3 erros', texto: 'Liste erros comuns do cliente e termine com o seu produto como solução.' },
    { icone: '⚖️', titulo: 'Mito ou verdade', texto: 'Derrube uma crença do seu mercado em 20 segundos.' },
    { icone: '🛠', titulo: 'Bastidor', texto: 'O processo de fazer, embalar ou entregar. Gera confiança.' },
    { icone: '⭐', titulo: 'Cliente real', texto: 'Depoimento ou reação de quem comprou. A melhor prova.' },
    { icone: '📦', titulo: 'Demonstração', texto: 'Produto na mão: abrir, usar, testar na frente da câmera.' },
  ]} />

const Gravar = ({ passo }) => <Cartoes passo={passo} colunas={3} etiqueta="Estratégia Social · gravação" classe="cartoes--compactos"
  titulo={<>Só com o <span className="faixa">celular</span></>}
  itens={[
    { icone: '💡', titulo: 'Luz', texto: 'Fique de frente para a janela. Nunca de costas para ela.' },
    { icone: '🎙', titulo: 'Som', texto: 'Grave perto do celular, em lugar sem eco. Microfone de lapela ajuda muito.' },
    { icone: '📱', titulo: 'Enquadramento', texto: 'Vertical, olhos na linha de cima da grade, espaço livre para a legenda.' },
    { icone: '📐', titulo: 'Firmeza', texto: 'Apoie o celular ou use tripé. Câmera tremida faz a pessoa sair.' },
    { icone: '✂️', titulo: 'Edição', texto: 'No CapCut: corte os silêncios, use legenda automática e revise.' },
    { icone: '⏳', titulo: 'Duração', texto: 'Comece com 15 a 30 segundos. Curto e direto retém mais.' },
  ]} />

const SemRosto = ({ passo }) => <Cartoes passo={passo} colunas={5} classe="cartoes--compactos" etiqueta="Estratégia Social · vergonha de aparecer"
  titulo={<>5 formatos <span className="faixa faixa--fina">sem mostrar o rosto</span></>}
  itens={[
    { icone: '✋', titulo: 'Mãos em ação', texto: 'Mostre o produto sendo feito, usado ou embalado.' },
    { icone: '🎧', titulo: 'Voz por cima', texto: 'Grave as imagens e narre depois, com calma.' },
    { icone: '🔤', titulo: 'Texto na tela', texto: 'Imagens do produto com frases curtas e uma música.' },
    { icone: '👥', titulo: 'Equipe e clientes', texto: 'Outras pessoas falam pela marca.' },
    { icone: '📲', titulo: 'Tela do celular', texto: 'Mostre o catálogo, um pedido ou uma conversa (com permissão).' },
  ]} />

function Funil({ passo }) {
  const etapas = ['Vídeo', 'Comentário ou Direct', 'Resposta rápida', 'WhatsApp', 'Oferta', 'Pós-venda', 'Depoimento']
  return (
    <div className="conteudo">
      <Titulo etiqueta="Estratégia Social · da view à venda">O caminho <span className="faixa">até o WhatsApp</span></Titulo>
      <div className="fluxo">
        {etapas.map((e, i) => (
          <Passo key={e} em={i + 1} passo={passo} className="fluxo__no">
            <span className="fluxo__num">{i + 1}</span>{e}
          </Passo>
        ))}
      </div>
      <Passo em={8} passo={passo} inclinar={false} className="destaque">
        🔁 O depoimento <strong>vira o próximo vídeo</strong>, e o ciclo recomeça. Use uma palavra-chave na chamada: “comenta EU QUERO”.
      </Passo>
    </div>
  )
}

const Metricas = ({ passo }) => <Cartoes passo={passo} colunas={5} etiqueta="Estratégia Social · métricas" classe="cartoes--compactos"
  titulo={<>O que olhar <span className="faixa faixa--fina">toda semana</span></>}
  itens={[
    { icone: '⏱', titulo: 'Retenção', texto: 'Nos 3 primeiros segundos. Se cai cedo, troque o gancho.' },
    { icone: '🌍', titulo: 'Não seguidores', texto: 'Mostra se você está chegando em gente nova.' },
    { icone: '📤', titulo: 'Envios', texto: 'O vídeo que é enviado merece uma parte 2.' },
    { icone: '💬', titulo: 'Conversas', texto: 'Quantas pessoas chamaram no Direct ou no WhatsApp.' },
    { icone: '💰', titulo: 'Vendas', texto: 'Pergunte sempre: “por onde você me conheceu?”' },
  ]} />

/* ---------- Prática ---------- */

const CAMPOS = [
  ['heroi', 'Produto-herói', 'Qual produto vamos mostrar?'],
  ['dor', 'Dor do cliente', 'Que problema ele resolve?'],
  ['gancho', 'Gancho (0 a 3 s)', 'A primeira frase do vídeo'],
  ['prova', 'Prova', 'O que vamos mostrar na tela?'],
  ['chamada', 'Chamada', 'O que a pessoa deve fazer agora?'],
]
function MaoNaMassa({ passo }) {
  const [valores, setValores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mentoria-roteiro') || '{}') } catch { return {} }
  })
  useEffect(() => { try { localStorage.setItem('mentoria-roteiro', JSON.stringify(valores)) } catch { /* sem armazenamento */ } }, [valores])
  return (
    <div className="conteudo">
      <Titulo etiqueta="Prática · preencha junto com o mentorado">O roteiro do <span className="faixa">seu primeiro vídeo</span></Titulo>
      <div className="ficha">
        {CAMPOS.map(([id, rotulo, dica], i) => (
          <Passo key={id} em={i + 1} passo={passo} inclinar={false} className="ficha__campo">
            <label htmlFor={`f-${id}`}>{rotulo}</label>
            <input id={`f-${id}`} placeholder={dica} value={valores[id] ?? ''} onChange={(e) => setValores((v) => ({ ...v, [id]: e.target.value }))} />
          </Passo>
        ))}
      </div>
    </div>
  )
}

/* ---------- Plano ---------- */

function Plano30({ passo }) {
  const semanas = [
    ['Semana 1', 'Arrumar a casa', 'Perfil revisado (bio, link, destaques) e banco com 20 pautas tiradas das perguntas dos clientes.'],
    ['Semana 2', 'Gravar em lote', '6 vídeos de uma vez: 3 para atrair, 2 para conectar, 1 para vender. Publicar 3 por semana.'],
    ['Semana 3', 'Repetir o que funcionou', 'Olhar as métricas, fazer a parte 2 dos melhores e stories de venda todos os dias.'],
    ['Semana 4', 'Campanha de venda', 'Oferta do produto-herói, depoimentos e revisão dos resultados com o mentor.'],
  ]
  return (
    <div className="conteudo">
      <Titulo etiqueta="Plano de ação">Seus próximos <span className="faixa">30 dias</span></Titulo>
      <div className="linha-tempo">
        {semanas.map(([s, t, d], i) => (
          <Passo key={s} em={i + 1} passo={passo} className="linha-tempo__item">
            <span className="linha-tempo__semana">{s}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Passo>
        ))}
      </div>
    </div>
  )
}

const Rotina = ({ passo }) => <Cartoes passo={passo} colunas={4} etiqueta="Plano de ação · rotina"
  titulo={<>A semana de quem <span className="faixa faixa--fina">não tem tempo</span></>}
  itens={[
    { icone: '🗓', titulo: 'Planejar', texto: '30 minutos, 1 vez por semana. Escolha as pautas e escreva os ganchos.', ex: 'Segunda' },
    { icone: '🎥', titulo: 'Gravar', texto: '2 horas, 1 vez por semana. Grave tudo de uma vez, trocando só a roupa.', ex: 'Terça' },
    { icone: '✂️', titulo: 'Editar', texto: '1 hora. Use modelos do CapCut para ganhar velocidade.', ex: 'Quarta' },
    { icone: '📲', titulo: 'Publicar e responder', texto: '15 minutos por dia. Responder rápido também conta para o alcance.', ex: 'Todo dia' },
  ]} />

/* ---------- Dúvidas e encerramento ---------- */

function SuaVez() {
  return (
    <div className="capa capa--centro">
      <Relampagos />
      <div>
        <p className="etiqueta etiqueta--centro">Espaço para dúvidas</p>
        <h2 className="titulo-poder duvidas__titulo poder-3d">SUA VEZ</h2>
        <p className="capa__sub capa__sub--centro">Nenhuma pergunta é básica demais. <strong>Se ficou dúvida, ela vira o próximo vídeo.</strong></p>
      </div>
    </div>
  )
}

const FAQ = [
  ['Preciso postar todo dia?', 'Não. Constância vale mais que quantidade: 3 vídeos bons por semana, toda semana, ganham de 7 corridos numa semana e nada na outra.'],
  ['Preciso de câmera profissional?', 'Não. O celular grava bem. Luz da janela e som limpo fazem mais diferença do que a câmera.'],
  ['E se ninguém comentar?', 'Normal no começo. Faça uma pergunta direta no fim do vídeo e responda todo comentário que chegar.'],
  ['Devo usar música em alta?', 'Ajuda, mas não salva vídeo fraco. Gancho e retenção pesam mais. Use volume baixo quando você estiver falando.'],
  ['Em quanto tempo vejo resultado?', 'Os primeiros sinais aparecem em 2 a 4 semanas de constância. Venda vem quando gancho, prova e chamada estão afinados.'],
]
function Perguntas() {
  const [aberta, setAberta] = useState(null)
  return (
    <div className="conteudo">
      <Titulo etiqueta="Dúvidas · clique para ver a resposta">Perguntas que <span className="faixa">sempre aparecem</span></Titulo>
      <div className="faq">
        {FAQ.map(([p, r], i) => (
          <button key={p} className={`faq__item ${aberta === i ? 'faq__item--aberta' : ''}`} onClick={() => setAberta(aberta === i ? null : i)}>
            <span className="faq__pergunta">{p}<i>{aberta === i ? '−' : '+'}</i></span>
            <span className="faq__resposta">{r}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Encerramento() {
  return (
    <div className="capa">
      <Relampagos className="relampagos--suave" />
      <div className="capa__texto">
        <p className="etiqueta">Obrigado</p>
        <h2 className="titulo-pesado titulo-pesado--branco titulo-3d encerra__titulo">Seu diamante já existe.<br /><span className="faixa">Agora é lapidar.</span></h2>
        <div className="encerra__contatos">
          <span>📸 {empresa.instagramNome}</span>
          <span>💬 {empresa.telefone}</span>
          <span>✉️ {empresa.email}</span>
        </div>
      </div>
      <div className="capa__arte"><Objeto3D tipo="diamante" className="capa__objeto" giro={0.8} /></div>
      <Assinatura lado="direita" />
    </div>
  )
}

/* ---------- Lista de slides ---------- */

export const slides = [
  { componente: Capa, titulo: 'Capa', secao: 'Abertura', cena: 'nenhuma', notas: 'Apresente-se. Combine que a mentoria é prática: diagnóstico primeiro, conteúdo depois, dúvidas no final e a qualquer momento.' },
  { componente: Combinados, titulo: 'Como funciona', passos: 4, secao: 'Abertura', fundo: 'fundo-escuro', notas: 'Deixe o mentorado à vontade. Reforce que ele vai sair com um roteiro pronto.' },
  { componente: Caminho, titulo: 'As 5 etapas', passos: 5, secao: 'Abertura', fundo: 'fundo-escuro', notas: 'Uma etapa por clique. O diagnóstico vem antes porque cada empresa tem um gargalo diferente.' },
  { componente: Verdade, titulo: 'Ele para no seu vídeo?', passos: 2, secao: 'Abertura', notas: 'Faça a pergunta e espere a resposta do mentorado antes de seguir.' },

  { componente: () => <Divisor numero="01" objeto="diamante" titulo="Diagnóstico" sub="Antes da solução, a pergunta certa." />, titulo: 'Diagnóstico', secao: 'Diagnóstico', cena: 'nenhuma', notas: 'Avise que agora você vai fazer perguntas e anotar. Peça respostas sinceras.' },
  { componente: Bloco1, titulo: 'Produto e cliente', passos: 4, secao: 'Diagnóstico', fundo: 'fundo-escuro', notas: 'Faça a pergunta, escute e anote. Não dê a solução ainda. Peça exemplos concretos.' },
  { componente: Bloco2, titulo: 'Instagram hoje', passos: 4, secao: 'Diagnóstico', fundo: 'fundo-escuro', notas: 'Se possível, abra o perfil do mentorado na hora e olhe junto com ele.' },
  { componente: Bloco3, titulo: 'Você e o vídeo', passos: 4, secao: 'Diagnóstico', fundo: 'fundo-escuro', notas: 'Aqui aparecem os bloqueios emocionais. Acolha: vergonha e falta de tempo são os mais comuns.' },
  { componente: Bloco4, titulo: 'Metas', passos: 4, secao: 'Diagnóstico', fundo: 'fundo-escuro', notas: 'Saia daqui com um número e um produto-herói definidos.' },
  { componente: Mapa, titulo: 'Mapa de direção', passos: 5, secao: 'Diagnóstico', notas: 'Clique nas linhas que combinam com o mentorado: elas ficam marcadas e definem onde você gasta mais tempo.' },

  { componente: () => <Divisor numero="02" objeto="V" titulo="Visibilidade" sub="Ser visto pelas pessoas certas." />, titulo: 'Visibilidade', secao: 'Visibilidade', cena: 'nenhuma', notas: 'Primeiro pilar do Método VIS.' },
  { componente: Distribuicao, titulo: 'Como o vídeo se espalha', passos: 4, secao: 'Visibilidade', fundo: 'fundo-escuro', notas: 'Explique sem tecnicês: o Instagram testa e amplia o que as pessoas gostam.' },
  { componente: Sinais, titulo: 'Sinais que contam', passos: 4, secao: 'Visibilidade', fundo: 'fundo-escuro', notas: 'Mostre nas estatísticas do mentorado onde ver retenção e envios.' },
  { componente: Formatos, titulo: 'Formatos', passos: 4, secao: 'Visibilidade', notas: 'Pergunte qual formato ele mais usa hoje e qual está faltando.' },
  { componente: Perfil, titulo: 'Perfil que converte', passos: 6, secao: 'Visibilidade', fundo: 'fundo-escuro', notas: 'Cada clique acende uma parte do celular. Compare com o perfil real do mentorado.' },

  { componente: () => <Divisor numero="03" objeto="I" titulo="Identidade" sub="O que falar e como falar do seu produto." />, titulo: 'Identidade', secao: 'Identidade', cena: 'nenhuma', notas: 'Segundo pilar do Método VIS.' },
  { componente: TiposConteudo, titulo: 'Atrair, conectar, vender', passos: 3, secao: 'Identidade', fundo: 'fundo-escuro', notas: 'Peça um exemplo de cada tipo usando o produto do mentorado.' },
  { componente: Fabrica, titulo: 'Fábrica de pautas', passos: 5, secao: 'Identidade', notas: 'Use as objeções do bloco 1 do diagnóstico e transforme cada uma em pauta na hora.' },
  { componente: Escada, titulo: 'Escada do produto', passos: 4, secao: 'Identidade', fundo: 'fundo-escuro', notas: 'Faça a escada com o produto-herói do mentorado.' },
  { componente: EviteFale, titulo: 'Genérico x concreto', passos: 4, secao: 'Identidade', fundo: 'fundo-escuro', notas: 'Peça para ele ler a bio atual e trocar cada frase genérica por uma concreta.' },

  { componente: () => <Divisor numero="04" objeto="raio" titulo="Estratégia Social" sub="Roteiro, gravação e o caminho até a venda." />, titulo: 'Estratégia Social', secao: 'Estratégia Social', cena: 'nenhuma', notas: 'Terceiro pilar: o raio que movimenta tudo.' },
  { componente: Formula, titulo: 'Gancho, prova, chamada', passos: 3, secao: 'Estratégia Social', fundo: 'fundo-laranja', notas: 'Use o produto do próprio mentorado como exemplo e escreva o gancho junto com ele.' },
  { componente: Ganchos, titulo: '10 ganchos', passos: 5, secao: 'Estratégia Social', fundo: 'fundo-escuro', notas: 'Peça para ele escolher 3 ganchos e completar com o produto dele.' },
  { componente: Modelos, titulo: '6 roteiros prontos', passos: 6, secao: 'Estratégia Social', fundo: 'fundo-escuro', notas: 'Qual desses ele consegue gravar ainda esta semana?' },
  { componente: Gravar, titulo: 'Gravar com o celular', passos: 6, secao: 'Estratégia Social', notas: 'Se der, faça um teste de luz e som ao vivo com o celular dele.' },
  { componente: SemRosto, titulo: 'Sem mostrar o rosto', passos: 5, secao: 'Estratégia Social', fundo: 'fundo-escuro', notas: 'Para quem tem vergonha: começar sem rosto é melhor do que não começar.' },
  { componente: Funil, titulo: 'Caminho até o WhatsApp', passos: 8, secao: 'Estratégia Social', fundo: 'fundo-escuro', notas: 'Desenhe o caminho real da venda do mentorado e veja onde ele perde clientes.' },
  { componente: Metricas, titulo: 'Métricas da semana', passos: 5, secao: 'Estratégia Social', notas: 'Combine um dia fixo da semana para olhar esses números.' },

  { componente: MaoNaMassa, titulo: 'Roteiro do primeiro vídeo', passos: 5, secao: 'Prática', fundo: 'fundo-laranja', notas: 'Clique nos campos e digite junto com o mentorado. O texto fica salvo neste navegador.' },

  { componente: Plano30, titulo: 'Plano de 30 dias', passos: 4, secao: 'Plano', fundo: 'fundo-escuro', notas: 'Ajuste as metas de cada semana ao tempo que o mentorado disse ter no bloco 3.' },
  { componente: Rotina, titulo: 'Rotina semanal', passos: 4, secao: 'Plano', notas: 'Peça para ele colocar esses horários na agenda agora.' },

  { componente: SuaVez, titulo: 'Sua vez', secao: 'Dúvidas', cena: 'nenhuma', notas: 'Abra para perguntas. Anote as que viram pauta de vídeo.' },
  { componente: Perguntas, titulo: 'Perguntas frequentes', secao: 'Dúvidas', fundo: 'fundo-escuro', notas: 'Use se o mentorado não tiver perguntas, ou para complementar.' },
  { componente: Encerramento, titulo: 'Encerramento', secao: 'Encerramento', cena: 'nenhuma', notas: 'Reforce o próximo passo combinado e a data da revisão.' },
]

const CURTOS = { Abertura: 'Início', Diagnóstico: 'Diagnóstico', Visibilidade: 'V', Identidade: 'I', 'Estratégia Social': 'S', Prática: 'Prática', Plano: 'Plano', Dúvidas: 'Dúvidas', Encerramento: 'Fim' }
export const secoes = slides.reduce((lista, s, i) => {
  if (!lista.some((x) => x.nome === s.secao)) lista.push({ nome: s.secao, curto: CURTOS[s.secao] ?? s.secao, inicio: i })
  return lista
}, [])
