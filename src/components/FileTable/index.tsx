import { FC, useEffect, useState } from 'react'
import { Table, Space } from 'antd'
import { getFileDataApi, searchFileDataTypeApi } from '@/api/fileApi'
import { typeObj } from './file_table'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import {
  EditOutlined,
  DeleteFilled,
  DownloadOutlined,
  ShareAltOutlined
} from '@ant-design/icons'
import styles from './index.module.scss'

interface IFileTableProps {
  category: string
  path?: string
}

const FileTable: FC<IFileTableProps> = ({ category, path }) => {
  const [fileData, setFileData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (category === '0') {
      getFileData(path as string)
    } else {
      searchFileDataType(category)
    }
  }, [category, path])

  async function getFileData(parentDataId: string) {
    const { data, code } = await getFileDataApi(parentDataId)
    if (code !== 200) return
    setFileData(data.map((item: IFile) => ({ ...item, key: item.id })))
  }

  async function searchFileDataType(type: string) {
    const { data, code } = await searchFileDataTypeApi(type)
    if (code !== 200) return
    console.log(data)
    setFileData(data.map((item: IFile) => ({ ...item, key: item.id })))
  }

  const columns: ColumnsType<IFile> = [
    {
      title: '文件名',
      dataIndex: 'name',
      // @ts-ignore
      render: (text: number, data: IFile) =>
        data.type === 0 ? (
          <Link to={`/index?category=${category}&path=${data.id}`}>{text}</Link>
        ) : (
          <p>{text}</p>
        )
    },
    {
      title: '类型',
      dataIndex: 'type',
      // @ts-ignore
      render: (text: number) => <p>{typeObj[text]}</p>
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (text: string) => <p>{text || '-'}</p>
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
            <ShareAltOutlined className={styles.icon} />
            <EditOutlined className={styles.icon} />
            <DownloadOutlined className={styles.icon} />
            <DeleteFilled className={styles.icon} />
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
