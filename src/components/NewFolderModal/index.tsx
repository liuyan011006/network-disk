import { FC, useState } from 'react'
import { Input, message, Button } from 'antd'
import { newFolderApi } from '@/api/fileApi'
import { FolderAddFilled } from '@ant-design/icons'
import CommonModal from '../CommonModal'

interface INewFolderProps {
  path: string
  updateData: () => void
}

const NewFolderModal: FC<INewFolderProps> = ({ path, updateData }) => {
  const [visible, setVisible] = useState(false)
  const [inputVal, setInputVal] = useState('')

  async function onOk() {
    if (inputVal.trim() === '') return message.warning('不能输入空白名')
    const { code } = await newFolderApi(path, inputVal)
    onCancel()
    if (code !== 200) return message.error('新建失败')
    message.success('新建成功')
    updateData()
  }

  function onCancel() {
    setVisible(false)
    setInputVal('')
  }

  return (
    <CommonModal
      title="新建文件夹"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      content={
        <Input
          placeholder="新建文件夹"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      }
    >
      <Button icon={<FolderAddFilled />} onClick={() => setVisible(true)}>
        新建文件夹
      </Button>
    </CommonModal>
  )
}

export default NewFolderModal
