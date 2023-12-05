import { FC, useState } from 'react'
import { Table, Space, message, Input } from 'antd'
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
  CopyOutlined,
  DragOutlined
} from '@ant-design/icons'
import { deleteDataApi } from '@/api/recycleApi'
import {
  getDataPathApi,
  updateFolderNameApi,
  shearToNewFolderApi,
  copyToNewFolderApi,
  batchOverrideFilesApi,
  batchGenerateDuplicatesApi
} from '@/api/fileApi'
import CommonModal from '../CommonModal'
import MoveModal from '../MoveOrCopyModal'
import ResolveSameModalBox from '../ResolveSameModal'

interface IFileTableProps {
  loading: boolean
  data: IFile[]
  updateData: () => void
}

const FileTable: FC<IFileTableProps> = ({ loading, data, updateData }) => {
  const dispatch = useDispatch()
  const selectedRowKeys = useSelector(selectSelectedRowKeys)
  const [selectDataId, setSelectDataId] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isUpdateNameOpen, setIsUpdateNameOpen] = useState(false)
  const [isMoveOpen, setMoveOpen] = useState(false)
  const [isCopyOpen, setCopyOpen] = useState(false)
  const [isResolveSameModalOpen, setIsResolveSameModalOpen] = useState(false)
  const [newFolder, setNewFolder] = useState([])
  const [oldFolder, setOldFolder] = useState([])
  const [targetId, setTargetId] = useState('')

  // 删除单个文件
  async function onDeleteFile() {
    const { code } = await deleteDataApi(selectDataId)
    setIsDeleteOpen(false)
    if (code !== 200) return message.error('删除失败')
    message.success('删除成功')
    updateData()
  }
  // 更新文件名
  async function onUpdateName() {
    const { code } = await updateFolderNameApi(selectDataId, inputVal)
    setIsUpdateNameOpen(false)
    if (code !== 200) return message.error('重命名失败')
    message.success('重命名成功')
    updateData()
  }
  // 移动文件
  async function onMoveFile(targetId: string) {
    const { data: pathList } = await getDataPathApi(targetId)
    if (pathList.some((item: any) => item.id === targetId)) {
      return message.warning('不能复制到自身及子文件夹下')
    }
    const { data, code } = await shearToNewFolderApi([selectDataId], targetId)
    setMoveOpen(false)
    if (code === 200) {
      message.success('移动成功')
      updateData()
    }
    if (code === 12009) {
      setIsResolveSameModalOpen(true)
      setOldFolder(data[0][0])
      setNewFolder(data[0][1])
      setTargetId(targetId)
      message.success('文件重名')
    }
  }
  // 复制文件
  async function onCopyFile(targetId: string) {
    const { data: pathList } = await getDataPathApi(targetId)
    if (pathList.some((item: any) => item.id === targetId)) {
      return message.warning('不能复制到自身及子文件夹下')
    }
    const { data, code } = await copyToNewFolderApi([selectDataId], targetId)
    setCopyOpen(false)
    if (code === 200) {
      message.success('复制成功')
      updateData()
    }
    if (code === 12009) {
      setIsResolveSameModalOpen(true)
      setOldFolder(data[0][0])
      setNewFolder(data[0][1])
      setTargetId(targetId)
      message.success('文件重名')
    }
  }
  // 解决重名文件
  async function onResolveSame(type: number) {
    if (type === 1) {
      const ids = oldFolder.map((item: any) => item.id)
      const sids = newFolder.map((item: any) => item.id)
      const { code } = await batchOverrideFilesApi(ids, sids, targetId)
      if (code === 200) message.success('生成副本成功')
      else message.error('生成副本失败')
      updateData()
    } else if (type === 2) {
      const ids = oldFolder.map((item: any) => item.id)
      const sids = newFolder.map((item: any) => item.id)
      const { code } = await batchGenerateDuplicatesApi(ids, sids, targetId)
      if (code === 200) message.success('生成副本成功')
      else message.error('生成副本失败')
      updateData()
    }
    setIsResolveSameModalOpen(false)
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
            <EditOutlined
              onClick={() => {
                setSelectDataId(data.id)
                setInputVal(data.name)
                setIsUpdateNameOpen(true)
              }}
            />
            <DownloadOutlined onClick={() => console.log(data.id)} />
            <DeleteFilled
              onClick={() => {
                setSelectDataId(data.id)
                setIsDeleteOpen(true)
              }}
            />

            <DragOutlined
              onClick={() => {
                setSelectDataId(data.id)
                setMoveOpen(true)
              }}
            />
            <CopyOutlined
              onClick={() => {
                setSelectDataId(data.id)
                setCopyOpen(true)
              }}
            />
          </Space>
        )
      }
    }
  ]
  return (
    <>
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
      />
      <CommonModal
        title="删除"
        visible={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onOk={onDeleteFile}
        content={
          <p>确定删除所选的文件吗？删除的文件可在 10天 内通过回收站还原</p>
        }
      />
      <MoveModal
        title="移动"
        visible={isMoveOpen}
        onCancel={() => setMoveOpen(false)}
        onOk={onMoveFile}
      />
      <MoveModal
        title="复制"
        visible={isCopyOpen}
        onCancel={() => setCopyOpen(false)}
        onOk={onCopyFile}
      />
      <ResolveSameModalBox
        visible={isResolveSameModalOpen}
        newFolder={newFolder}
        oldFolder={oldFolder}
        onOk={onResolveSame}
        onCancel={() => setIsResolveSameModalOpen(false)}
      />
      <Table
        loading={loading}
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
