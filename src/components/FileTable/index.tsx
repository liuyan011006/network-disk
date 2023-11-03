import { FC, useState } from 'react'
import { Table, Space, message } from 'antd'
import { typeObj } from './file_table'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import {
  EditOutlined,
  DeleteFilled,
  DownloadOutlined,
  ShareAltOutlined
} from '@ant-design/icons'
import DeleteModal from '../DeleteModal'
import { deleteDataApi } from '@/api/recycleApi'

interface IFileTableProps {
  data: IFile[]
  updateData: () => void
}

const FileTable: FC<IFileTableProps> = ({ data, updateData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectDataId, setSelectDataId] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  async function onDeleteFile() {
    const { code } = await deleteDataApi(selectDataId)
    setIsDeleteOpen(true)
    if (code !== 200) return message.error('删除失败')
    message.success('删除成功')
    updateData()
  }

  const columns: ColumnsType<IFile> = [
    {
      title: '文件名',
      dataIndex: 'name',
      // @ts-ignore
      render: (text: number, data: IFile) =>
        data.type === 0 ? (
          <Link to={`/index?category=0&path=${data.id}`}>{text}</Link>
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
      render: (_, data) => {
        return (
          <Space>
            <ShareAltOutlined onClick={() => console.log(data.id)} />
            <EditOutlined onClick={() => console.log(data.id)} />
            <DownloadOutlined onClick={() => console.log(data.id)} />
            <DeleteFilled
              onClick={() => {
                setSelectDataId(data.id)
                setIsDeleteOpen(true)
              }}
            />
          </Space>
        )
      }
    }
  ]
  return (
    <>
      <DeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onOk={onDeleteFile}
      />
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys)
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  )
}
export default FileTable
