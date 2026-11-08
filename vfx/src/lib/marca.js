// Identidade VIS creative (mesmas cores do site, em ../src/styles.css)
import { staticFile } from 'remotion'

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

// Carrega a Play Pretend antes de renderizar
export const estiloFontes = `
@font-face {
  font-family: 'Play Pretend';
  src: url('${staticFile('fonts/play-pretend.woff2')}') format('woff2');
}`
