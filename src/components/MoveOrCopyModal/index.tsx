import { FC, useState, useEffect } from 'react'
import CommonModal from '../CommonModal'
import DataPath from '../DataPath'
import styles from './index.module.scss'
import { getDataFolderApi, getDataInfoApi } from '@/api/fileApi'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import IconfontComp from '../IconfontComp'
import { fileType } from '@/constant/FileType'

interface IEmptyProps {
  title: string
  name: string
}

interface IContentProps {
  title: string
  path: string
  onPathChange: (id: string) => void
}

interface IMoveOrCopyModalProps {
  title: string
  visible: boolean
  onOk: (targetId: string) => void
  onCancel?: () => void
  children?: JSX.Element
}

const EmptyData: FC<IEmptyProps> = ({ name, title }) => {
  return (
    <div className={styles.empty}>
      <IconfontComp name={'wenjianjia'} className={styles.emptyImg} />
      <p>
        {title}到 {name} 文件
      </p>
    </div>
  )
}
const Content: FC<IContentProps> = ({ path, title, onPathChange }) => {
  const [loading, setLoading] = useState(false)
  const [fileData, setFileData] = useState<any[]>([])
  const [currentName, setCurrentName] = useState('无')

  useEffect(() => {
    getDataFolder(path)
    getDataInfo(path)
  }, [path])

  async function getDataFolder(folderId: string) {
    setLoading(true)
    const { data, code } = await getDataFolderApi(folderId)
    setLoading(false)
    if (code !== 200) return
    setFileData(data)
  }

  async function getDataInfo(dataId: string) {
    const { data, code } = await getDataInfoApi(dataId)
    if (code !== 200) return
    setCurrentName(data.name)
  }

  return (
    <div>
      <DataPath path={path} onClick={(id) => onPathChange(id)} />
      <div className={styles.fileList}>
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : fileData.length === 0 ? (
          <EmptyData title={title} name={currentName} />
        ) : (
          fileData.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.fileItem}
                onClick={() => onPathChange(item.id)}
              >
                {/* @ts-ignore */}
                <IconfontComp name={fileType[item.type]}className={styles.fileImg}/>
                <p>{item.name}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const MoveOrCopyModal: FC<IMoveOrCopyModalProps> = ({
  title,
  visible,
  children,
  onOk,
  onCancel
}) => {
  const [currentPath, setCurrentPath] = useState('0')

  useEffect(() => {
    setCurrentPath('0')
  }, [visible])

  return (
    <CommonModal
      width={700}
      title={title}
      visible={visible}
      onOk={() => onOk(currentPath)}
      onCancel={onCancel}
      content={
        <Content
          path={currentPath}
          title={title}
          onPathChange={(id) => setCurrentPath(id)}
        />
      }
    >
      {children}
    </CommonModal>
  )
}

export default MoveOrCopyModal
