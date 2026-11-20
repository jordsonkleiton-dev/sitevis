// Identidade VIS creative (mesmas cores do site, em ../src/styles.css)
import { useEffect, useState } from 'react'
import { continueRender, delayRender, staticFile } from 'remotion'

export const cores = {
  magenta: '#D400EC',
  roxo: '#7A007C',
  roxoEscuro: '#400044',
  laranja: '#D66D00',
  laranjaClaro: '#F28A1E',
  fundo: '#0e0010',
  texto: '#fbf2fb',
}

export const fontes = {
  poder: "'Play Pretend', 'Arial Black', sans-serif", // sem acentos!
  pesada: "'Montserrat', 'Arial Black', sans-serif",
}

// Fontes da marca, servidas de public/fonts
export const estiloFontes = `
@font-face {
  font-family: 'Play Pretend';
  src: url('${staticFile('fonts/play-pretend.woff2')}') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  src: url('${staticFile('fonts/montserrat.woff2')}') format('woff2');
  font-weight: 100 900;
  font-style: normal;
}
@font-face {
  font-family: 'Montserrat';
  src: url('${staticFile('fonts/montserrat-italico.woff2')}') format('woff2');
  font-weight: 100 900;
  font-style: italic;
}`

// Segura a renderização até as fontes carregarem (senão o 1º quadro sai com outra fonte)
export function useFontes() {
  const [espera] = useState(() => delayRender('Carregando fontes'))
  useEffect(() => {
    const lista = ['10px "Play Pretend"', '300 10px Montserrat', '500 10px Montserrat', '900 10px Montserrat', 'italic 300 10px Montserrat']
    Promise.all(lista.map((f) => document.fonts.load(f))).then(() => continueRender(espera))
  }, [espera])
}
