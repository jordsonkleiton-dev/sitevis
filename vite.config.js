import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' faz o site funcionar no GitHub Pages (em /sitevis/)
export default defineConfig({
  plugins: [react()],
  base: './',
})
