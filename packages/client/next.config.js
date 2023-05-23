const UnoCSS = require('@unocss/webpack').default
const presetUno = require('@unocss/preset-uno').default

const isDev = process.env.NODE_ENV === 'development'
const BACKEND_URL = 'http://localhost:4000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: isDev ? './.next' : './dist',
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: BACKEND_URL,
  },
  webpack: (config, context) => {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }))
    if (context.buildId !== 'development') {
      config.cache = false
    }
    return config
  },
  rewrites: async () => [
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
  ],
}

module.exports = nextConfig
