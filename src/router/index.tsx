import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import LoginLayout from '@/layouts/LoginLayout'

const Login = lazy(() => import('@/pages/Login'))
const Home = lazy(() => import('@/pages/Home'))
const MyFile = lazy(() => import('@/pages/MyFile'))
const MyShare = lazy(() => import('@/pages/MyShare'))
const RecycleFile = lazy(() => import('@/pages/RecycleFile'))

const withLoadingComponent = (element: JSX.Element) => (
  <Suspense
    fallback={
      <div>
        <h1>Loading...</h1>
      </div>
    }
  >
    {element}
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'index',
        element: withLoadingComponent(<Home />)
      },
      {
        path: 'recycle',
        element: withLoadingComponent(<RecycleFile />)
      },
      {
        path: 'share',
        element: withLoadingComponent(<MyShare />)
      }
    ]
  },
  {
    path: '/login',
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  }
])

export default router
