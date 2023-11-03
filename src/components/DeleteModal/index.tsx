import { FC } from 'react'
import { Modal } from 'antd'

interface IDeleteModalProps {
  isOpen: boolean
  onOk?: () => void
  onCancel?: () => void
}

const DeleteModal: FC<IDeleteModalProps> = ({ isOpen, onOk, onCancel }) => {
  return (
    <Modal
      title="删除文件"
      cancelText="取消"
      okText="确定"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>确定删除所选的文件吗？删除的文件可在 10天 内通过回收站还原</p>
    </Modal>
  )
}

export default DeleteModal
