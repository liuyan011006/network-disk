import { FC, useState, useEffect, useMemo } from 'react'
import { Space, Breadcrumb } from 'antd'
import { getDataPathApi } from '@/api/fileApi'

interface IDataPathProps {
  path: string
  onClick: (id: string) => void
}
const DataPath: FC<IDataPathProps> = ({ path, onClick }) => {
  const [dataPath, setDataPath] = useState<IPathItem[]>([])

  useEffect(() => {
    getDataPath(path)
  }, [path])

  const dataPathElement = useMemo(() => {
    return dataPath.map((item) => ({
      title: (
        <a onClick={() => onClick(item.id + '')}>
          {item.folderName === '/' ? '全部' : item.folderName}
        </a>
      )
    }))
  }, [dataPath])

  async function getDataPath(path: string) {
    const { data, code } = await getDataPathApi(path)
    if (code !== 200) return
    setDataPath(data)
  }

  return (
    <>
      {path === '0' ? (
        <p>全部文件</p>
      ) : (
        <Space>
          {dataPath.length >= 2 && (
            <a
              onClick={() => onClick(dataPath[dataPath.length - 2].id + '')}
              style={{ lineHeight: '32px' }}
            >
              返回上一级
            </a>
          )}
          <Breadcrumb
            style={{ lineHeight: '32px' }}
            items={dataPathElement}
            separator=">"
          />
        </Space>
      )}
    </>
  )
}

export default DataPath
