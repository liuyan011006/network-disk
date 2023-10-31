import { FC } from 'react'
import { Layout, theme } from 'antd'

import MenuNav from '@/components/MenuNav'
import HeaderComp from '@/components/HeaderComp'
import SiderComp from '@/components/SiderComp'
import { Outlet } from 'react-router'

const { Content, Sider } = Layout

const BasicLayout: FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderComp background={colorBgContainer} />
      <Layout>
        <SiderComp background={colorBgContainer} />
        <Content
          style={{
            margin: '20px',
            padding: '24px 0',
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Layout style={{ height: '100%' }}>
            <Sider style={{ background: colorBgContainer }}>
              <MenuNav />
            </Sider>
            <Content
              style={{
                padding: 24,
                background: colorBgContainer
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
