import Layout from '@/components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import config from './config'
import { routes, type IRouter } from './routes'

export default function App() {
  const createRouter = (router: IRouter) => {
    return (
      <Route
        path={router.path}
        key={router.path}
        element={
          <Layout>
            <router.component />
          </Layout>
        }
      />
    )
  }

  return (
    <BrowserRouter basename={config.routeBasename}>
      <Routes>
        {routes.map((route) => {
          if (route.children?.length) {
            return route.children.map(createRouter)
          }
          return createRouter(route)
        })}
      </Routes>
    </BrowserRouter>
  )
}
