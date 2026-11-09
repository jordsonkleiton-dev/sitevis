import { Composition } from 'remotion'
import { DiamanteRevelacao } from './composicoes/DiamanteRevelacao'

// Lista de todas as animações. Cada <Composition> aparece no Studio.
// fundo: 'verde' (chroma key, ex.: CapCut) ou 'transparente' (exportar em ProRes 4444)
// cor: 'marca' (cores da VIS) ou 'branco' (tudo branco)
const base = { component: DiamanteRevelacao, fps: 60, durationInFrames: 240 }
const marca = { ...base, defaultProps: { fundo: 'verde', cor: 'marca' } }
const branco = { ...base, defaultProps: { fundo: 'verde', cor: 'branco' } }

export const Raiz = () => (
  <>
    <Composition id="DiamanteVertical" width={1080} height={1920} {...marca} />
    <Composition id="DiamanteQuadrado" width={1080} height={1080} {...marca} />
    <Composition id="DiamanteHorizontal" width={1920} height={1080} {...marca} />
    <Composition id="DiamanteBrancoVertical" width={1080} height={1920} {...branco} />
    <Composition id="DiamanteBrancoQuadrado" width={1080} height={1080} {...branco} />
    <Composition id="DiamanteBrancoHorizontal" width={1920} height={1080} {...branco} />
  </>
)
