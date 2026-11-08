// Peças do diamante VIS (mesmas coordenadas de public/logo/vis-simbolo.svg)
const p = (s) => s.split(' ').map((par) => par.split(',').map(Number))

export const pecas = {
  laranja: p('475,482 486,499 455,571 433,577'),
  escuro: p('487,502 552,607 521,677 456,572'),
  raioCima: p('560,340 591,390 549,484 564,508 605,415 631,456 604,517 597,506 564,581 499,476'),
  raioBaixo: p('633,460 672,524 569,755 536,701 611,530 605,519'),
}

export const centro = [553, 548]
export const alturaDiamante = 424

// Caminho pela borda da peça, do vértice `de` ao `ate` (sentido +1 ou -1)
export function borda(pontos, de, ate, sentido = 1) {
  const n = pontos.length
  const res = [pontos[de]]
  let i = de
  do {
    i = (i + sentido + n) % n
    res.push(pontos[i])
  } while (i !== ate)
  return res
}
