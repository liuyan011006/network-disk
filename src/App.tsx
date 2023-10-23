import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { ConfigProvider, theme } from 'antd'
import router from '@/router'

export default function App() {
  const [isDark] = useState(false)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
