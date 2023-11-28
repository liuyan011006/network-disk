import { FC, useMemo, useState, useEffect, useCallback } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

import { Button, Space } from 'antd'
import { useLocation } from 'react-router'
import { parseSearch } from '@/utils/path'
import { getFileDataApi, searchFileDataTypeApi } from '@/api/fileApi'
import DataPath from '@/components/DataPath'
import FileTable from '@/components/FileTable'
import NewFolderModal from '@/components/NewFolderModal'
import DeleteAllModal from '@/components/DeleteAllModal'

const Home: FC = () => {
  const { search } = useLocation()
  const { category, path }: any = useMemo(() => parseSearch(search), [search])
  const [fileData, setFileData] = useState([])
  useEffect(() => {
    updateData()
  }, [category, path])

  const updateData = useCallback(() => {
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
    setFileData(data.map((item: IFile) => ({ ...item, key: item.id })))
  }

  return (
    <div style={{ height: '100%' }}>
      <Space>
        <Button type="primary" icon={<UploadOutlined />}>
          上传
        </Button>
        <NewFolderModal path={path} updateData={updateData} />
        <DeleteAllModal updateData={updateData} />
      </Space>
      <div>{category === '0' && <DataPath path={path} />}</div>
      <div className={styles.tableContainer}>
        <FileTable data={fileData} updateData={updateData} />
      </div>
    </div>
  )
}

export default Home
