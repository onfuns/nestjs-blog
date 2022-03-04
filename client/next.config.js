const path = require('path')
const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')
const isDev = process.env.NODE_ENV === 'development'

const aliases = {
  '@': path.join(__dirname, '.'),
}

const nextConfig = withAntdLess({
  modifyVars: { '@primary-color': '#f26c23' },
  distDir: isDev ? './.next' : './dist',
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...aliases,
    }
    return config
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ]
  },
})

module.exports = withPlugins([], nextConfig)
