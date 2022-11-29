import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImportus from 'vite-plugin-importus'
import theme from './theme'
import { join } from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
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
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...theme,
          '@root-entry-name': 'variable',
        },
        javascriptEnabled: true,
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react(),
    vitePluginImportus([
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'less',
      },
    ]),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [],
    },
  },
})
