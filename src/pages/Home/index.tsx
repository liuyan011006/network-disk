import { FC, useMemo, useRef } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Button, Space, message } from 'antd'
import { useLocation } from 'react-router'
import { parseSearch } from '@/utils/path'
import { uploadDataApi } from '@/api/fileApi'

import DataPath from '@/components/DataPath'
import FileTable from '@/components/FileTable'
import NewFolderModal from '@/components/NewFolderModal'

const Home: FC = () => {
  const { search } = useLocation()
  const { category, path }: any = useMemo(() => parseSearch(search), [search])
  const inputFile = useRef<any>(null)

  // 上传有问题。。。。。
  async function uploadFile(e: any) {
    const files = e.target.files
    const formdata = new FormData()
    for (let i = 0; i < files.length; i++) {
      formdata.append('files', files[i])
    }
    formdata.append('parentDataId', path)
    const { data, code } = await uploadDataApi(formdata)
    if (code !== 200) return message.error('上传失败!')
    message.success('上传成功')
    console.log(data)
  }

  return (
    <div style={{ height: '100%' }}>
      <Space>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => inputFile.current?.click()}
        >
          上传
          <input
            ref={inputFile}
            type="file"
            multiple
            onChange={(e) => uploadFile(e)}
            style={{ display: 'none' }}
          />
        </Button>
        <NewFolderModal path={path} />
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
