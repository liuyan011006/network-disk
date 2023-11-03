import { FC, useMemo } from 'react'
import { UploadOutlined, FolderAddFilled } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Space } from 'antd'
import { useLocation } from 'react-router'
import { parseSearch } from '@/utils/path'

import DataPath from '@/components/DataPath'
import FileTable from '@/components/FileTable'

const Home: FC = () => {
  const { search } = useLocation()
  const { category, path }: any = useMemo(() => parseSearch(search), [search])

  return (
    <div style={{ height: '100%' }}>
      <Space>
        <Button type="primary" icon={<UploadOutlined />}>
          上传
        </Button>
        <Button icon={<FolderAddFilled />}>新建文件夹</Button>
      </Space>
      <div>
        <DataPath category={category} path={path} />
      </div>
      <div className={styles.tableContainer}>
        <FileTable category={category} path={path} />
      </div>
    </div>
  )
}

export default Home
