// ✏️ Edite este arquivo para trocar os textos do site.

export const empresa = {
  nome: 'VIS creative',
  assinatura: 'Criatividade e poder.',
  chamada: 'Transformamos ideias em conteúdos que chamam atenção, fortalecem marcas e criam oportunidades de negócio.',
  sobre:
    'A VIS Creative é uma empresa de criatividade, produção audiovisual e comunicação estratégica. Atendemos diferentes segmentos, com soluções adaptadas aos objetivos de cada cliente.',
  whatsapp: '5584996030620', // DDI + DDD + número, só dígitos
  telefone: '(84) 99603-0620',
  email: 'contatoviscreative@gmail.com',
  instagram: 'https://instagram.com/viscreative_',
  instagramNome: '@viscreative_',
  cidade: 'Atendimento presencial e online',
}

export const nome = {
  titulo: 'Por que VIS?',
  texto:
    'VIS significa poder: a ideia de usar a criatividade como uma força para movimentar empresas. “Creative” reforça essa essência criativa. Juntos, formam a nossa assinatura: criatividade e poder.',
}

export const metodo = [
  {
    letra: 'V',
    titulo: 'Visibilidade',
    texto: 'Captar atenção, alcançar as pessoas certas e tornar a marca mais conhecida.',
  },
  {
    letra: 'I',
    titulo: 'Identidade',
    texto: 'Traduzir a essência, os valores e os diferenciais da empresa em uma comunicação reconhecível.',
  },
  {
    letra: 'S',
    titulo: 'Estratégia Social',
    texto: 'Conectar conteúdo, comportamento digital e objetivos comerciais para gerar relacionamento, engajamento e conversão.',
  },
]

// icone: um dos nomes definidos em Icone.jsx
export const servicos = [
  {
    icone: 'alvo',
    titulo: 'Planejamento e posicionamento',
    texto: 'Definimos como a sua marca se comunica e organizamos tudo em um plano.',
    itens: ['Definição da comunicação', 'Planejamento mensal e pautas', 'Campanhas', 'Estratégias de lançamento'],
  },
  {
    icone: 'ideia',
    titulo: 'Roteiros e ideias criativas',
    texto: 'Ideias que prendem a atenção nos primeiros segundos e contam a sua história.',
    itens: ['Desenvolvimento de conceitos', 'Narrativas', 'Ganchos para os conteúdos'],
  },
  {
    icone: 'camera',
    titulo: 'Produção audiovisual',
    texto: 'Da captação à edição final, com direção para quem aparece nos vídeos.',
    itens: ['Captação presencial', 'Direção de quem aparece nos vídeos', 'Edição profissional de reels', 'Vídeos institucionais e criativos'],
  },
  {
    icone: 'design',
    titulo: 'Design para redes sociais',
    texto: 'Peças visuais alinhadas à identidade e aos objetivos da sua marca.',
    itens: ['Artes para posts e stories', 'Peças para campanhas', 'Padrão visual consistente'],
  },
  {
    icone: 'celular',
    titulo: 'Gestão de Instagram',
    texto: 'Organizamos a sua presença digital e os seus conteúdos, conforme o plano contratado.',
    itens: ['Organização do perfil', 'Calendário de conteúdos', 'Publicação e acompanhamento'],
  },
  {
    icone: 'evento',
    titulo: 'Campanhas e cobertura',
    texto: 'Registramos os momentos que movimentam a sua marca.',
    itens: ['Conteúdos sazonais', 'Registro de eventos', 'Bastidores', 'Lançamentos'],
  },
  {
    icone: 'grafico',
    titulo: 'Tráfego pago',
    texto: 'Anúncios para ampliar o alcance e gerar oportunidades comerciais, conforme o escopo contratado.',
    itens: ['Criação e gestão de campanhas', 'Público certo para o seu objetivo', 'Acompanhamento de resultados'],
  },
]

export const etapas = [
  { titulo: 'Conversa inicial', texto: 'Entendemos o seu negócio, o seu público e os seus objetivos.' },
  { titulo: 'Proposta sob medida', texto: 'Montamos um plano com os serviços que fazem sentido para você.' },
  { titulo: 'Criação e produção', texto: 'Planejamos, roteirizamos, gravamos e criamos os conteúdos.' },
  { titulo: 'Publicação e ajustes', texto: 'Acompanhamos os resultados e ajustamos o caminho.' },
]

// A história do símbolo: o raio (S) + V e I = o diamante
export const simbolo = {
  titulo: 'Lapidamos diamantes.',
  texto: [
    'O S da VIS é um raio: o poder que movimenta. Sozinho, ele é energia pura.',
    'Quando se une ao V e ao I, o raio forma um diamante: o nosso símbolo. É ele que une o Método VIS à sua empresa.',
    'Nosso trabalho é lapidar esse diamante. E ele só fica perfeito quando o poder da VIS caminha junto com a empresa.',
  ],
  partes: [
    { mostrar: 'raio', titulo: 'O raio', sub: 'S · o poder da VIS', texto: 'Estratégia e criatividade como força para movimentar a sua marca.' },
    { mostrar: 'vi', titulo: 'V + I', sub: 'Visibilidade e Identidade', texto: 'A essência da sua empresa: quem ela é e como é vista.' },
    { mostrar: 'tudo', titulo: 'O diamante', sub: 'A sua marca lapidada', texto: 'Quando o poder da VIS acompanha a empresa, a marca brilha.' },
  ],
}

// Criativos do portfólio: coloque as imagens na pasta public/portfolio/
// Carrossel = várias imagens na lista "imagens", na ordem dos slides.
// A seção só aparece no site quando pelo menos uma imagem existir.
export const portfolio = [
  {
    imagens: ['portfolio/destrave-o-crescimento-1.webp', 'portfolio/destrave-o-crescimento-2.webp'],
    titulo: 'Destrave o crescimento',
    legenda: 'Carrossel: passos simples para destravar o crescimento da marca.',
  },
  {
    imagens: ['portfolio/clareza-antes-de-conversao.webp'],
    titulo: 'Clareza antes de conversão',
    legenda: 'Post: publicidade bem-feita não manipula a percepção do lead.',
  },
  {
    imagens: ['portfolio/super-poder.webp'],
    titulo: 'Super poder',
    legenda: 'Post: imagem não é só estética, é poder de impacto.',
  },
]
