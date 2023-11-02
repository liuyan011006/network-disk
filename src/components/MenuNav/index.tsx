import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { addBreadcrumbItem, deleteBreadcrumbItems } from '@/store/breadcrumb'
import { Menu } from 'antd'
import { navItems } from '@/components/MenuNav/menuNav'

const MenuNav: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [openKey, setOpenKey] = useState('')
  const path = useMemo(() => pathname + search, [pathname, search])

  useEffect(() => {
    setOpenKey(pathname)
    dispatch(deleteBreadcrumbItems(pathname))
  }, [pathname])

  function onClick(e: any) {
    navigate(e.key)
    dispatch(
      addBreadcrumbItem({
        key: e.key,
        title: e.domEvent.target.innerHTML
      })
    )
  }

  function onOpenChange(keys: string[]) {
    setOpenKey(keys[keys.length - 1])
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[path]}
      selectedKeys={[path]}
      openKeys={[openKey]}
      items={navItems}
      onClick={onClick}
      onOpenChange={(keys) => onOpenChange(keys)}
    />
  )
}

export default MenuNav
