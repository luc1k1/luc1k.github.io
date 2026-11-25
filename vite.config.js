import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' works on GitHub Pages with any repo name or custom domain
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        // vendor libs in their own long-cached chunks
        manualChunks: { react: ['react', 'react-dom'], motion: ['framer-motion'] },
      },
    },
  },
})
