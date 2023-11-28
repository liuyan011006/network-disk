import { FC, useState } from 'react'
import type { MenuProps } from 'antd'
import { Table, Space, message, Input, Dropdown } from 'antd'
import { typeObj } from './file_table'
import { useSelector, useDispatch } from 'react-redux'
import { selectSelectedRowKeys } from '@/store/file/selector'
import { setSelectedRowKeys } from '@/store/file'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import {
  EditOutlined,
  DeleteFilled,
  DownloadOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DragOutlined
} from '@ant-design/icons'
import { deleteDataApi } from '@/api/recycleApi'
import { updateFolderName } from '@/api/fileApi'
import CommonModal from '../CommonModal'

interface IFileTableProps {
  data: IFile[]
  updateData: () => void
}

const items: MenuProps['items'] = [
  {
    label: '移动',
    key: '1',
    icon: <DragOutlined />
  },
  {
    label: '复制',
    key: '2',
    icon: <CopyOutlined />
  }
]
const FileTable: FC<IFileTableProps> = ({ data, updateData }) => {
  const dispatch = useDispatch()
  const selectedRowKeys = useSelector(selectSelectedRowKeys)
  const [selectDataId, setSelectDataId] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isUpdateNameOpen, setIsUpdateNameOpen] = useState(false)

  async function onDeleteFile() {
    const { code } = await deleteDataApi(selectDataId)
    setIsDeleteOpen(false)
    if (code !== 200) return message.error('删除失败')
    message.success('删除成功')
    updateData()
  }

  async function onUpdateName() {
    const { code } = await updateFolderName(selectDataId, inputVal)
    setIsUpdateNameOpen(false)
    if (code !== 200) return message.error('重命名失败')
    message.success('重命名成功')
    updateData()
  }

  function onClick({ key }: any, data: IFile) {
    setSelectDataId(data.id)
    console.log(key)
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
            <CommonModal
              title="重命名"
              visible={isUpdateNameOpen}
              onCancel={() => setIsUpdateNameOpen(false)}
              onOk={onUpdateName}
              content={
                <Input
                  placeholder="重命名"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
              }
            >
              <EditOutlined
                onClick={() => {
                  setSelectDataId(data.id)
                  setInputVal(data.name)
                  setIsUpdateNameOpen(true)
                }}
              />
            </CommonModal>
            <DownloadOutlined onClick={() => console.log(data.id)} />
            <CommonModal
              title="删除"
              visible={isDeleteOpen}
              onCancel={() => setIsDeleteOpen(false)}
              onOk={onDeleteFile}
              content={
                <p>
                  确定删除所选的文件吗？删除的文件可在 10天 内通过回收站还原
                </p>
              }
            >
              <DeleteFilled
                onClick={() => {
                  setSelectDataId(data.id)
                  setIsDeleteOpen(true)
                }}
              />
            </CommonModal>
            <Dropdown menu={{ items, onClick: (e) => onClick(e, data) }}>
              <EllipsisOutlined />
            </Dropdown>
          </Space>
        )
      }
    }
  ]
  return (
    <>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => dispatch(setSelectedRowKeys(keys))
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  )
}
export default FileTable
