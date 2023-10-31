import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import { NavLink } from 'react-router-dom'
import { NavList, icon_style, font_style } from './siderComp'
import styles from './index.module.scss'

interface ISiderCompProps {
  background: string
}

const SiderComp: FC<ISiderCompProps> = ({ background }) => {
  const { pathname } = useLocation()

  return (
    <Layout.Sider className={styles.sider} width={100} style={{ background }}>
      {NavList.map(({ icon: Icon, label, key }) => (
        <NavLink key={key} to={key} className={styles.IconItem}>
          <Icon style={icon_style(pathname === key.split('?')[0])} />
          <p style={font_style(pathname === key.split('?')[0])}>{label}</p>
        </NavLink>
      ))}
    </Layout.Sider>
  )
}

export default SiderComp
