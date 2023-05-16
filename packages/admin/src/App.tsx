import Layout from '@/components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import config from './config'
import { routes, type IRouter } from './routes'

export default function App() {
  const createRoute = ({ path, component: Component }: IRouter) => {
    return <Route key={path} path={path} element={<Component />} />
  }

  return (
    <BrowserRouter basename={config.routeBasename}>
      <Layout>
        <Routes>
          {routes.map((route) => {
            if (route.children?.length) {
              return route.children.map(createRoute)
            }
            return createRoute(route)
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
