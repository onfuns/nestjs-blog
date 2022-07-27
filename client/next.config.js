const path = require('path')
const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')

const isDev = process.env.NODE_ENV === 'development'
const BACKEND_URL = 'http://localhost:4000'

const nextConfig = withAntdLess({
  modifyVars: { '@primary-color': '#f26c23' },
  distDir: isDev ? './.next' : './dist',
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.join(__dirname, '.'),
    }
    return config
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: BACKEND_URL,
  },
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/article',
      },
      {
        source: '/category/:ename',
        destination: '/article',
      },
      {
        source: '/article/:id',
        destination: '/article/info/:id',
      },
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ]
  },
})

module.exports = withPlugins([], nextConfig)
