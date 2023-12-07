import { FC, useMemo, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { UploadOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Space } from 'antd'
import { useSelector } from 'react-redux'
import { selectSelectedRowKeys } from '@/store/file/selector'
import { useLocation } from 'react-router'
import { parseSearch } from '@/utils/path'
import { getFileDataApi, searchFileDataTypeApi } from '@/api/fileApi'
import DataPath from '@/components/DataPath'
import FileTable from '@/components/FileTable'
import NewFolderModal from '@/components/NewFolderModal'
import DeleteAllModal from '@/components/DeleteAllModal'

const Home: FC = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { category, path }: any = useMemo(() => parseSearch(search), [search])
  const [loading, setLoading] = useState(false)
  const [fileData, setFileData] = useState([])
  const [total, setTotal] = useState(0)
  const [pageNow, setPageNow] = useState(1)
  const selectedRowKeys = useSelector(selectSelectedRowKeys)

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

  function onPageNowChange(page: number) {
    setPageNow(page)
  }

  return (
    <>
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
