import { FC, useState, useEffect, useMemo } from 'react'
import { Space, Breadcrumb } from 'antd'
import { getDataPathApi } from '@/api/fileApi'
import { Link } from 'react-router-dom'

interface IDataPathProps {
  path: string
}
const DataPath: FC<IDataPathProps> = ({ path }) => {
  const [dataPath, setDataPath] = useState<IPathItem[]>([])

  useEffect(() => {
    getDataPath(path)
  }, [path])

  const dataPathElement = useMemo(() => {
    return dataPath.map((item) => ({
      title: (
        <Link to={`/index?category=0&path=${item.id}`}>
          {item.folderName === '/' ? '全部' : item.folderName}
        </Link>
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
            <Link
              to={`/index?category=0&path=${dataPath[dataPath.length - 2].id}`}
              style={{ lineHeight: '32px' }}
            >
              返回上一级
            </Link>
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
