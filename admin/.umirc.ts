import { defineConfig } from 'umi'
import { routes } from './src/routes'
import { default as theme } from './theme'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  theme,
  fastRefresh: {},
  // mfsu: {},
  base: '/admin-website',
  publicPath: '/',
  dynamicImport: {},
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
    },
  },
  chainWebpack(config) {
    config.output
      .set('chunkFilename', 'static/[id].[contenthash:8].chunk.js')
      .end()
      .plugin('antd-dayjs-webpack-plugin')
      .use('antd-dayjs-webpack-plugin')
      .end()
      .plugin('extract-css')
      .tap(args => [
        {
          ...args[0],
          chunkFilename: `static/[id].[contenthash:8].chunk.css`,
        },
      ])
      .end()
  },
})
