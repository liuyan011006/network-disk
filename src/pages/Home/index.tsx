import { FC, useMemo } from 'react'
import { UploadOutlined, FolderAddFilled } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Space } from 'antd'
import FileTable from '@/components/FileTable'
import { useLocation } from 'react-router'
import { parseSearch } from '@/utils/path'

const Home: FC = () => {
  const { search } = useLocation()
  const searchObj: any = useMemo(() => parseSearch(search), [search])

  return (
    <div style={{ height: '100%' }}>
      <Space>
        <Button type="primary" icon={<UploadOutlined />}>
          上传
        </Button>
        <Button icon={<FolderAddFilled />}>新建文件夹</Button>
      </Space>
      <div>
        <p>全部文件</p>
      </div>
      <div className={styles.tableContainer}>
        <FileTable {...searchObj} />
      </div>
    </div>
  )
}

export default Home
