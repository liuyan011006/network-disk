import { FC, useState } from 'react'
import { Modal, Input, message, Button } from 'antd'
import { newFolderApi } from '@/api/fileApi'
import { FolderAddFilled } from '@ant-design/icons'

interface INewFolderProps {
  path: string
  updateData: () => void
}

const NewFolderModal: FC<INewFolderProps> = ({ path, updateData }) => {
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
    setInputVal('')
  }

  return (
    <>
      <Button icon={<FolderAddFilled />} onClick={() => setIsOpen(true)}>
        新建文件夹
      </Button>
      <Modal
        title="新建文件夹"
        cancelText="取消"
        okText="确定"
        open={isOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Input
          placeholder="新建文件夹"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </Modal>
    </>
  )
}

export default NewFolderModal
