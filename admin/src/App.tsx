import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { routes } from './routes'

export default function App() {
  const r = [
    {
      path: '/login',
      Component: lazy(() => import('@/pages/login')),
    },
  ]

  // const modules = import.meta.glob('@/pages/*')
  // const Compontents = lazy(modules['@/pages/login.tsx'] as any)
  console.log(`routes`, routes)
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => {
          if (route.component && route.children?.length) {
            // return (
            //   <route.component>
            //     {route.children.map(child => (
            //       <Route key={child.path} path={child.path} element={<child.component />} />
            //     ))}
            //   </route.component>
            // )
            {
              return route.children.map(child => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={
                    <route.component>
                      <child.component />
                    </route.component>
                  }
                />
              ))
            }
          }
          return <Route key={route.path} path={route.path} element={<route.component />} />
        })}
      </Routes>
    </BrowserRouter>
  )
}
