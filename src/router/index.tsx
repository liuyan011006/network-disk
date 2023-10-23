import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const BasicLayout = lazy(() => import('@/layouts/BasicLayout'))
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
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: withLoadingComponent(<Home />)
      },
      {
        path: 'myFile',
        element: withLoadingComponent(<MyFile />)
      },
      {
        path: 'myShare',
        element: withLoadingComponent(<MyShare />)
      },
      {
        path: 'recycleFile',
        element: withLoadingComponent(<RecycleFile />)
      }
    ]
  }
])

export default router
