import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { cores, fontes, estiloFontes } from '../lib/marca'
import { Raio } from '../lib/Raio'

// Animação de teste: raios caem, flash, a logo entra e aparece "PODER."
export const Abertura = () => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  const flash = interpolate(frame, [18, 21, 30], [0, 0.9, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const logo = spring({ frame: frame - 22, fps, config: { damping: 12 } })
  const texto = spring({ frame: frame - 45, fps, config: { damping: 200 } })
  const tremor = frame > 20 && frame < 30 ? Math.sin(frame * 9) * 14 : 0
  const brilhoFundo = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const saida = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: 'clamp' })

  return (
    <AbsoluteFill style={{ background: cores.fundo, opacity: saida }}>
      <style>{estiloFontes}</style>
      <AbsoluteFill style={{ opacity: brilhoFundo, background: `radial-gradient(circle at 50% 45%, ${cores.roxo} 0%, ${cores.roxoEscuro} 35%, transparent 70%)` }} />

      <Raio x={-40} y={height * 0.1} comprimento={width * 0.9} angulo={0.9} semente={7} inicio={6} largura={width} altura={height} />
      <Raio x={width + 40} y={height * 0.25} comprimento={width * 0.8} angulo={2.4} semente={21} inicio={12} largura={width} altura={height} />
      <Raio x={width * 0.5} y={-20} comprimento={height * 0.45} angulo={1.57} semente={42} inicio={16} largura={width} altura={height} />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 60, transform: `translateX(${tremor}px)` }}>
        <Img src={staticFile('logo/vis-logo-branco.svg')}
          style={{ width: width * 0.7, transform: `scale(${0.4 + logo * 0.6})`, opacity: logo }} />
        <div style={{
          fontFamily: fontes.poder, fontSize: width * 0.2, color: cores.texto, lineHeight: 1,
          opacity: texto, transform: `translateY(${(1 - texto) * 80}px)`,
          textShadow: `0 0 40px ${cores.magenta}, 0 0 90px ${cores.magenta}`,
        }}>
          PODER<span style={{ color: cores.laranjaClaro }}>.</span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: '#fff', opacity: flash }} />
    </AbsoluteFill>
  )
}
