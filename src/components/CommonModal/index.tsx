import { FC } from 'react'
import { Modal } from 'antd'

interface ICommonModalProps {
  visible: boolean
  title?: string
  onOk?: () => void
  onCancel?: () => void
  children?: JSX.Element
  content: JSX.Element
}

const CommonModal: FC<ICommonModalProps> = ({
  visible,
  title = '弹窗',
  onOk,
  onCancel,
  children,
  content
}) => {
  return (
    <>
      {children}
      <Modal
        title={title}
        cancelText="取消"
        okText="确定"
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {content}
      </Modal>
    </>
  )
}

export default CommonModal
