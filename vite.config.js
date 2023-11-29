import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@page': '/src/page',
      '@assets': '/src/assets',
      '@lib': '/src/lib',
      '@styles': '/src/styles'
    }
  }
})
