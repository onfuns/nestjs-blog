import Layout from '@/components/Layout'
import { KeepAlive } from 'react-activation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import config from './config'
import { routes, type IRouter } from './routes'

export default function App() {
  const createRouter = (router: IRouter) => {
    const element = (
      <KeepAlive key={router.path}>
        <router.component />
      </KeepAlive>
    )
    return <Route path={router.path} element={element} />
  }

  return (
    <BrowserRouter basename={config.routeBasename}>
      <Layout>
        <Routes>
          {routes.map((route) => {
            if (route.children?.length) {
              return route.children.map(createRouter)
            }
            return createRouter(route)
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
