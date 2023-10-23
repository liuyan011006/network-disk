import { FC, useEffect } from 'react'
import { Outlet } from 'react-router'
import initLoginBg from '@/utils/background'

const LoginLayout: FC = () => {
  //加载背景组件的时机是在生命周期的函数
  useEffect(() => {
    initLoginBg()
    window.onresize = function () {
      initLoginBg()
    }
  }, [])
  return <Outlet />
}

export default LoginLayout
