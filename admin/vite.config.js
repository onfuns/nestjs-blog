import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImportus from 'vite-plugin-importus'
import theme from './theme'
import { join } from 'path'
import { readFile } from 'fs/promises'

export default defineConfig({
  resolve: {
    alias: {
      '@/': join(__dirname, './src/'),
    },
  },
  server: {
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
    {
      // 升级antd 5 后删除
      name: 'add-missing-theme',
      apply: 'build',
      transform: (code, id) => {
        const reg = /antd(?:\/|\\{1,2})es(?:\/|\\{1,2})index\.js/
        if (reg.test(id)) {
          return `${code}\nexport const theme = undefined;`
        }
        return code
      },
    },
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          // 升级antd 5 后删除
          name: 'add-missing-theme',
          setup(build) {
            build.onLoad({ filter: /antd(?:\/|\\{1,2})es(?:\/|\\{1,2})index\.js/ }, async args => {
              const text = await readFile(args.path, 'utf8')
              return {
                contents: `${text}\nexport const theme = undefined;`,
                loader: 'js',
              }
            })
          },
        },
      ],
    },
  },
})
