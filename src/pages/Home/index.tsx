import { FC, useMemo, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { UploadOutlined, DragOutlined, CopyOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Space, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setFileSelectedRowKeys } from '@/store/file'
import { selectFileSelectedRowKeys } from '@/store/file/selector'
import { useLocation } from 'react-router'
import { parseSearch } from '@/utils/path'
import {
  getFileDataApi,
  searchFileDataTypeApi,
  shearToNewFolderApi,
  copyToNewFolderApi,
  getDataPathApi,
  batchOverrideFilesApi,
  batchGenerateDuplicatesApi
} from '@/api/fileApi'
import DataPath from '@/components/DataPath'
import FileTable from '@/components/FileTable'
import NewFolderModal from '@/components/NewFolderModal'
import DeleteAllModal from '@/components/DeleteAllModal'
import MoveOrCopyModal from '@/components/MoveOrCopyModal'
import ResolveSameModal from '@/components/ResolveSameModal'

const Home: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { category, path }: any = useMemo(() => parseSearch(search), [search])
  const [loading, setLoading] = useState(false)
  const [fileData, setFileData] = useState([])
  const [total, setTotal] = useState(0)
  const [pageNow, setPageNow] = useState(1)
  const selectedRowKeys: any[] = useSelector(selectFileSelectedRowKeys)
  const [isMoveOpen, setMoveOpen] = useState(false)
  const [isCopyOpen, setCopyOpen] = useState(false)
  const [isResolveSameModalOpen, setIsResolveSameModalOpen] = useState(false)
  const [newFolder, setNewFolder] = useState([])
  const [oldFolder, setOldFolder] = useState([])
  const [targetId, setTargetId] = useState('')

  useEffect(() => {
    updateData()
  }, [pageNow])

  useEffect(() => {
    setPageNow(1)
    updateData()
  }, [category, path])

  const updateData = useCallback(() => {
    if (category === '0') {
      getFileData(path as string, pageNow)
    } else {
      searchFileDataType(category, pageNow)
    }
    dispatch(setFileSelectedRowKeys([]))
  }, [category, path, pageNow])

  async function getFileData(parentDataId: string, pageNow: number) {
    setLoading(true)
    const { data, code } = await getFileDataApi(parentDataId, pageNow)
    setLoading(false)
    if (code !== 200) return
    setFileData(data.list.map((item: IFile) => ({ ...item, key: item.id })))
    setTotal(data.total)
  }

  async function searchFileDataType(type: string, pageNow: number) {
    setLoading(true)
    const { data, code } = await searchFileDataTypeApi(type, pageNow)
    setLoading(false)
    if (code !== 200) return
    setFileData(data.list.map((item: IFile) => ({ ...item, key: item.id })))
    setTotal(data.total)
  }

  // 移动文件
  async function onMoveFile(targetId: string) {
    const { data: pathList } = await getDataPathApi(targetId)
    console.log(selectedRowKeys.some((item) => pathList.includes(item)))
    if (selectedRowKeys.some((item) => pathList.includes(item))) {
      return message.warning('不能移动到自身及子文件夹下')
    }
    const { data, code } = await shearToNewFolderApi(selectedRowKeys, targetId)
    console.log(code)
    setMoveOpen(false)
    if (code === 200) {
      message.success('移动成功')
      updateData()
    }
    if (code === 12007) message.warning('不能移动到自身及子文件夹下')
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

    if (selectedRowKeys.some((item) => pathList.includes(item))) {
      return message.warning('不能复制到自身及子文件夹下')
    }

    const { data, code } = await copyToNewFolderApi(selectedRowKeys, targetId)
    setCopyOpen(false)
    if (code === 200) {
      message.success('复制成功')
      updateData()
    }
    if (code === 12007) message.warning('不能复制到自身及子文件夹下')
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

  function onPageNowChange(page: number) {
    setPageNow(page)
  }

  return (
    <>
      <MoveOrCopyModal
        title="移动"
        visible={isMoveOpen}
        onCancel={() => setMoveOpen(false)}
        onOk={onMoveFile}
      />
      <MoveOrCopyModal
        title="复制"
        visible={isCopyOpen}
        onCancel={() => setCopyOpen(false)}
        onOk={onCopyFile}
      />
      <ResolveSameModal
        visible={isResolveSameModalOpen}
        newFolder={newFolder}
        oldFolder={oldFolder}
        onOk={onResolveSame}
        onCancel={() => setIsResolveSameModalOpen(false)}
      />
      <div style={{ height: '100%' }}>
        <Space>
          {selectedRowKeys.length === 0 ? (
            <>
              <Button type="primary" icon={<UploadOutlined />}>
                上传
              </Button>
              <NewFolderModal path={path} updateData={updateData} />
            </>
          ) : (
            <>
              <Button type="primary" icon={<UploadOutlined />}>
                分享
              </Button>
              <DeleteAllModal updateData={updateData} />
              <Button
                type="primary"
                icon={<DragOutlined />}
                onClick={() => setMoveOpen(true)}
              >
                移动
              </Button>
              <Button
                type="primary"
                icon={<CopyOutlined />}
                onClick={() => setCopyOpen(true)}
              >
                复制
              </Button>
            </>
          )}
        </Space>
        <div>
          {category === '0' && (
            <DataPath
              path={path}
              onClick={(id) => navigate(`/index?category=0&path=${id}`)}
            />
          )}
        </div>
        <div className={styles.tableContainer}>
          <FileTable
            loading={loading}
            data={fileData}
            total={total}
            pageNow={pageNow}
            onPageNowChange={onPageNowChange}
            updateData={updateData}
          />
        </div>
      </div>
    </>
  )
}

export default Home
