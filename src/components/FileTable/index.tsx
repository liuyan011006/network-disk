import { FC, useEffect, useState } from 'react'
import { Table, Space, Button } from 'antd'
import { getFileDataApi } from '@/api/fileApi'
import { typeObj } from './file_table'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'

interface IFileTableProps {
  path: number
  category: number
}

const FileTable: FC<IFileTableProps> = ({ path, category }) => {
  const [fileData, setFileData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  async function getFileData(parentDataId: number) {
    const { data, code } = await getFileDataApi(parentDataId)
    if (code !== 200) return
    setFileData(data.map((item: IFile) => ({ ...item, key: item.id })))
  }

  useEffect(() => {
    getFileData(path)
  }, [path])

  const columns: ColumnsType<IFile> = [
    {
      title: '文件名',
      dataIndex: 'name',
      // @ts-ignore
      render: (text: number, data) => (
        <Link to={`/index?category=${category}&path=${data.id}`}>{text}</Link>
      )
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
  return (
    <Table
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys)
      }}
      columns={columns}
      dataSource={fileData}
      pagination={false}
    />
  )
}
export default FileTable
