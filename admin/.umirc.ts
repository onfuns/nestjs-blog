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
  base: '/admin',
  publicPath: '/admin/',
  dynamicImport: {},
  hash: true,
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
    },
  },
  chunks: ['antd', 'vendors', 'umi'],
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
      .optimization.splitChunks({
        ...config.optimization.get('splitChunks'),
        cacheGroups: {
          default: false,
          antd: {
            test: /[\\/]node_modules[\\/](antd|@ant-design|rc-[\w]+)[\\/]/,
            name: 'antd',
            chunks: 'all',
            priority: 20,
          },
          vendors: {
            chunks: 'all',
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      })
  },
})
