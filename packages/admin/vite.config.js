import react from '@vitejs/plugin-react'
import { join } from 'path'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: join(__dirname, './src'),
      },
    ],
  },
  server: {
    port: 4002,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
      },
      '/uploads/': {
        target: 'http://localhost:4000',
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [react(), unocss()],
})
