import { Composition } from 'remotion'
import { Abertura } from './composicoes/Abertura'

// Lista de todas as animações. Cada <Composition> aparece no Studio.
export const Raiz = () => (
  <>
    {/* Vertical para Reels / Stories / TikTok */}
    <Composition id="Abertura" component={Abertura} width={1080} height={1920} fps={30} durationInFrames={150} />
    {/* Quadrado para feed */}
    <Composition id="AberturaQuadrada" component={Abertura} width={1080} height={1080} fps={30} durationInFrames={150} />
  </>
)
