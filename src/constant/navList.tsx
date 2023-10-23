import {
  HomeOutlined,
  HistoryOutlined,
  ClearOutlined,
  FolderOutlined,
  GiftOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

export const navItems: MenuProps['items'] = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '我的文件',
    key: 'myFile',
    icon: <FolderOutlined />,
    children: [
      {
        label: '最近',
        key: '/myFile?p=0',
        icon: <HistoryOutlined />
      }
    ]
  },
  {
    label: '我的分享',
    key: '/myShare',
    icon: <GiftOutlined />
  },
  {
    label: '回收站',
    key: '/recycleFile',
    icon: <ClearOutlined />
  }
]
