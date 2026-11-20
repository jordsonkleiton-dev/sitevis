import { Config } from '@remotion/cli/config'

Config.setEntryPoint('./src/index.js')
Config.setVideoImageFormat('jpeg')
Config.setCodec('h264')

// Opcional: usar um Chrome já instalado (ex.: em ambientes sem internet).
// No seu computador não precisa: o Remotion baixa o navegador sozinho.
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER)
