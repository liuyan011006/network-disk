import {
  HistoryOutlined,
  ClearOutlined,
  FolderOutlined,
  CreditCardFilled
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

export const navItems: MenuProps['items'] = [
  {
    label: '我的文件',
    key: '/index',
    icon: <FolderOutlined />,
    children: [
      {
        label: '全部',
        key: '/index?category=0&path=0',
        icon: <HistoryOutlined />
      },
      {
        label: '最近',
        key: '/index?category=1',
        icon: <HistoryOutlined />
      },
      {
        label: '视频',
        key: '/index?category=2',
        icon: <HistoryOutlined />
      },
      {
        label: '文件',
        key: '/index?category=3',
        icon: <HistoryOutlined />
      }
    ]
  },
  {
    label: '我的分享',
    key: '/share',
    icon: <CreditCardFilled />
  },
  {
    label: '回收站',
    key: '/recycle',
    icon: <ClearOutlined />
  }
]
