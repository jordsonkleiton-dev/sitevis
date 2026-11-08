import { Composition } from 'remotion'
import { DiamanteRevelacao } from './composicoes/DiamanteRevelacao'

// Lista de todas as animações. Cada <Composition> aparece no Studio.
// fundo: 'verde' (chroma key, ex.: CapCut) ou 'transparente' (exportar em ProRes 4444)
const padrao = { component: DiamanteRevelacao, fps: 60, durationInFrames: 240, defaultProps: { fundo: 'verde' } }

export const Raiz = () => (
  <>
    <Composition id="DiamanteVertical" width={1080} height={1920} {...padrao} />
    <Composition id="DiamanteQuadrado" width={1080} height={1080} {...padrao} />
    <Composition id="DiamanteHorizontal" width={1920} height={1080} {...padrao} />
  </>
)
