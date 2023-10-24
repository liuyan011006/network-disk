import { FC, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, theme, Breadcrumb } from 'antd'
import { useSelector } from 'react-redux'
import { selectBreadcrumbItems } from '@/store/breadcrumb/selector'

import MenuNav from '@/components/MenuNav'
import { Outlet } from 'react-router'

const { Header, Sider, Content } = Layout

const BasicLayout: FC = () => {
  const breadcrumbItems = useSelector(selectBreadcrumbItems)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <MenuNav />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Breadcrumb
          style={{ padding: '30px 30px 0' }}
          separator=">"
          items={breadcrumbItems}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
