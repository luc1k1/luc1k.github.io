import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' works on GitHub Pages with any repo name or custom domain
export default defineConfig({
  plugins: [react()],
  base: './',
})
