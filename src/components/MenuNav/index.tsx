import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Menu } from 'antd'
import { navItems } from '@/constant/navList'

const MenuNav: FC = () => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [openKey, setOpenKey] = useState('')
  const path = useMemo(() => pathname + search, [pathname, search])

  useEffect(() => {
    setOpenKey(pathname.slice(1))
  }, [pathname])

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[path]}
      selectedKeys={[path]}
      openKeys={[openKey]}
      items={navItems}
      onClick={(e) => navigate(e.key)}
      onOpenChange={(keys) => setOpenKey(keys[keys.length - 1])}
    />
  )
}

export default MenuNav
