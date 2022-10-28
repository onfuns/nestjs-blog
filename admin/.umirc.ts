import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
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
  favicon: '/admin/images/logo.png',
  title: 'Nest-Blog Admin',
  dynamicImport: {},
  hash: true,
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
    },
    '/uploads/': {
      target: 'http://localhost:4000',
    },
  },
  chunks: ['antd', 'vendors', 'umi'],
  chainWebpack(config) {
    config.output.set('chunkFilename', 'static/[id].[contenthash:8].chunk.js')
    config.plugin('antd-dayjs-webpack-plugin').use(AntdDayjsWebpackPlugin)
    config.plugin('extract-css').tap(args => [
      {
        ...args[0],
        chunkFilename: `static/[id].[contenthash:8].chunk.css`,
      },
    ])
    config.module
      .rule('mjs$')
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type('javascript/auto')

    config.merge({
      optimization: {
        splitChunks: {
          cacheGroups: {
            default: false,
            antd: {
              test: /[\\/]node_modules[\\/](antd|@ant-design|rc-[\w]+)[\\/]/,
              name: 'antd',
              chunks: 'all',
              priority: 20,
            },
            vendor: {
              chunks: 'all',
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
          },
        },
      },
    })
    return config
  },
})
