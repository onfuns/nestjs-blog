import react from '@vitejs/plugin-react'
import { join } from 'path'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import vitePluginImportus from 'vite-plugin-importus'
import theme from './theme'

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
    unocss(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [],
    },
  },
})