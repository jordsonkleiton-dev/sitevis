import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Apresentação da mentoria: usa os mesmos componentes, fontes e logos do site
const aqui = (p) => fileURLToPath(new URL(p, import.meta.url))
export default defineConfig({
  root: aqui('.'),
  publicDir: aqui('../public'),
  base: './',
  plugins: [react()],
  build: { outDir: aqui('../dist-mentoria'), emptyOutDir: true },
  server: { port: 5174 },
})
