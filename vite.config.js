import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' works on GitHub Pages with any repo name or custom domain
export default defineConfig({
  plugins: [react()],
  base: './',
  // shown in the footer as “Updated Nov 2026”
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        // vendor libs in their own long-cached chunks
        manualChunks: { react: ['react', 'react-dom'] },
      },
    },
  },
})
