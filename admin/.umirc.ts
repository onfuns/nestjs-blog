import { defineConfig } from 'umi'
import { routes } from './src/routes'
import { default as theme } from './theme'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  // mfsu: {},
  base: '/admin-website',
  publicPath: '/admin-static/',
  theme: theme,
  //dynamicImport: {},
  chainWebpack(config) {
    //prettier-ignore
    config
      //.output
        // .set('chunkFilename','js/[id].[contenthash:8].chunk.js')
        // .end()
      .plugin('antd-dayjs-webpack-plugin')
        .use('antd-dayjs-webpack-plugin')
        .end()
    // .plugin('extract-css')
    //   .tap(args => [
    //     {
    //       ...args[0],
    //       chunkFilename: `css/[id].[contenthash:8].chunk.css`,
    //     },
    //   ])
    //   .end()
  },
})
