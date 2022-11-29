import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { routes } from './routes'
import config from './config'
import Layout from '@/components/Layout'
import { KeepAlive } from 'react-activation'

const Wrapper = ({ router }) => (
  <KeepAlive key={router.path}>
    <router.component />
  </KeepAlive>
)

export default function App() {
  const renderRouter = router => {
    return <Route key={router.path} path={router.path} element={<Wrapper router={router} />} />
  }

  return (
    <BrowserRouter basename={config.routeBasename}>
      <Layout>
        <Suspense fallback={<div>loading..</div>}>
          <Routes>
            {routes.map(route => {
              if (route.children?.length) return route.children.map(renderRouter)
              return renderRouter(route)
            })}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
