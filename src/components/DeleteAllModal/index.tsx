import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedRowKeys } from '@/store/file/selector'
import { Button, message } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import DeleteModal from '../DeleteModal'
import { deleteDataAllApi } from '@/api/recycleApi'

interface IDeleteAllModalProps {
  updateData: () => void
}
const DeleteAllModal: FC<IDeleteAllModalProps> = ({ updateData }) => {
  const selectedRowKeys = useSelector(selectSelectedRowKeys)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  async function onAllDeleteFile() {
    if (selectedRowKeys.length === 0) return message.warning('请选择文件')
    const { code } = await deleteDataAllApi(selectedRowKeys as string[])
    setIsDeleteOpen(false)
    if (code !== 200) return message.error('删除失败')
    message.success('删除成功')
    updateData()
  }
  return (
    <>
      <DeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onOk={onAllDeleteFile}
      />
      <Button
        type="primary"
        danger
        icon={<DeleteFilled />}
        onClick={() => setIsDeleteOpen(true)}
      >
        多选删除
      </Button>
    </>
  )
}

export default DeleteAllModal
