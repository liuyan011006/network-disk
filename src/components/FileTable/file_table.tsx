import { Space, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
export const typeObj = {
  0: '文件夹',
  1: '图片',
  2: '视频',
  3: '文档',
  4: '音乐',
  5: '种子',
  6: '压缩包',
  7: '其他'
}

export const columns: ColumnsType<IFile> = [
  {
    title: '文件名',
    dataIndex: 'name'
    // render: (text: number) => <Link to={}>{text}</Link>
  },
  {
    title: '类型',
    dataIndex: 'type',
    // @ts-ignore
    render: (text: number) => <p>{typeObj[text]}</p>
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime'
  },
  {
    title: '大小',
    dataIndex: 'size',
    render: (text: string) => <p>{text || '-'}</p>
  },
  {
    title: '操作',
    render: (_) => {
      return (
        <Space>
          <Button type="primary">重命名</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      )
    }
  }
]
