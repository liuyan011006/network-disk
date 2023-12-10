import { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFileSelectedRowKeys } from '@/store/file/selector'
import { setFileSelectedRowKeys } from '@/store/file'
import { Button, message } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { deleteDataAllApi } from '@/api/recycleApi'
import CommonModal from '@/components/CommonModal'

interface IDeleteAllModalProps {
  updateData: () => void
}
const DeleteAllModal: FC<IDeleteAllModalProps> = ({ updateData }) => {
  const dispatch = useDispatch()
  const selectedRowKeys = useSelector(selectFileSelectedRowKeys)
  const [visible, setVisible] = useState(false)
  async function onAllDeleteFile() {
    if (selectedRowKeys.length === 0) return message.warning('请选择文件')
    const { code } = await deleteDataAllApi(selectedRowKeys as string[])
    setVisible(false)
    if (code !== 200) return message.error('删除失败')
    message.success('删除成功')
    dispatch(setFileSelectedRowKeys([]))
    updateData()
  }
  return (
    <CommonModal
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={onAllDeleteFile}
      content={
        <p>确定删除所选的文件吗？删除的文件可在 10天 内通过回收站还原</p>
      }
    >
      <Button
        type="primary"
        icon={<DeleteFilled />}
        onClick={() => setVisible(true)}
      >
        删除
      </Button>
    </CommonModal>
  )
}

export default DeleteAllModal
