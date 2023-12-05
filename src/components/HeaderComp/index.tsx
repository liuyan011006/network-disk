import { FC } from 'react'
import { Layout } from 'antd'
import logo from '@/assets/image/logo.png'

interface IHeaderComp {
  background: string
}

const HeaderComp: FC<IHeaderComp> = ({ background }) => {
  return (
    <Layout.Header style={{ background }}>
      <div style={{ display: 'flex' }}>
        <img src={logo} height="64px" />
        <h3 style={{ margin: 0 }}>未来 · 网盘</h3>
      </div>
    </Layout.Header>
  )
}

export default HeaderComp
