const next = require('next')
const express = require('express')
const isDev = process.env.NODE_ENV === 'development'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const server = express()
const { createProxyMiddleware } = require('http-proxy-middleware')

app.prepare().then(() => {
  server.get('/', (req, res) => {
    return app.render(req, res, '/article/list', req.query)
  })
  server.get('/category/:ename', (req, res) => {
    return app.render(req, res, '/article/list', req.query)
  })
  server.get('/article/:id', (req, res) => {
    return app.render(req, res, '/article/detail', req.query)
  })

  server.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  )

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 5000
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
