import { FC, useState, useEffect, useCallback } from 'react'
import { DeleteFilled, RedoOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setRecycleSelectedRowKeys } from '@/store/file'
import styles from './index.module.scss'
import { Button, Space, message, Input } from 'antd'
import { useSelector } from 'react-redux'
import { selectRecycleSelectedRowKeys } from '@/store/file/selector'
import { selectUserInfo } from '@/store/user/selector'
import {
  getDelFileDataApi,
  restoreDataApi,
  batchFinalDelDataApi,
  sendFinalDelCodeApi
} from '@/api/recycleApi'
import DelTable from '@/components/DelTable'
import CommonModal from '@/components/CommonModal'
import SendCodeBtn from '@/components/SendCodeBtn'

const RecycleFile: FC = () => {
  const dispacth = useDispatch()
  const [loading, setLoading] = useState(false)
  const [fileData, setFileData] = useState([])
  const [total, setTotal] = useState(0)
  const [pageNow, setPageNow] = useState(1)
  const selectedRowKeys: any[] = useSelector(selectRecycleSelectedRowKeys)
  const userInfo = useSelector(selectUserInfo)
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isRestoreOpen, setIsRestoreOpen] = useState(false)
  const [isSafeOpen, setIsSafeOpen] = useState(false)
  const [delCode, setDelCode] = useState('')

  useEffect(() => {
    updateData()
  }, [pageNow])

  const updateData = useCallback(() => {
    getFileData(pageNow)
    dispacth(setRecycleSelectedRowKeys([]))
  }, [pageNow])

  async function getFileData(pageNow: number) {
    setLoading(true)
    const { data, code } = await getDelFileDataApi(pageNow)
    setLoading(false)
    if (code !== 200) return
    setFileData(data.list.map((item: IFile) => ({ ...item, key: item.id })))
    setTotal(data.total)
  }

  // 还原文件
  async function onReductionFile() {
    const { code } = await restoreDataApi(selectedRowKeys)
    setIsRestoreOpen(false)
    if (code !== 200) return message.error('还原失败')
    message.success('还原成功')
    updateData()
  }
  // 全部删除
  async function onDeleteAllFile() {
    const { code } = await batchFinalDelDataApi(
      fileData.map((item: any) => item.id)
    )
    if (code === 10004) setIsSafeOpen(true)
    if (code === 200) {
      message.success('删除成功')
      updateData()
    }
    setIsDeleteAllOpen(false)
  }
  // 删除文件
  async function onDeleteFile() {
    const { code } = await batchFinalDelDataApi(selectedRowKeys)
    if (code === 10004) setIsSafeOpen(true)
    if (code === 200) {
      message.success('删除成功')
      updateData()
    }
    setIsDeleteOpen(false)
  }
  // 安全验证
  async function onSafe() {
    const { code } = await batchFinalDelDataApi(selectedRowKeys, delCode)
    if (code !== 200) return message.error('删除失败')
    message.success('删除成功')
    setIsSafeOpen(false)
    updateData()
  }
  // 获取回收站验证码
  async function toSendCode(callback: Function) {
    const { code } = await sendFinalDelCodeApi(userInfo.username)
    if (code !== 200) return message.error('发送验证码失败!')
    message.success('发送验证码成功!')
    callback()
  }

  function onPageNowChange(page: number) {
    setPageNow(page)
  }

  return (
    <>
      <CommonModal
        title="还原"
        visible={isRestoreOpen}
        onCancel={() => setIsRestoreOpen(false)}
        onOk={onReductionFile}
        content={<p>确定还原选中的文件?</p>}
      />
      <CommonModal
        title="全部删除"
        visible={isDeleteAllOpen}
        onCancel={() => setIsDeleteAllOpen(false)}
        onOk={onDeleteAllFile}
        content={<p>确定永久删除所有的文件吗？</p>}
      />
      <CommonModal
        title="删除"
        visible={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onOk={onDeleteFile}
        content={<p>确定永久删除所选的文件吗？</p>}
      />
      <CommonModal
        title="安全验证"
        visible={isSafeOpen}
        onCancel={() => setIsSafeOpen(false)}
        onOk={onSafe}
        content={
          <>
            <p>
              您的账号可能存在安全风险，为了确保为您本人操作，请先进行安全验证。
            </p>
            <p>验证方式</p>
            <div>
              <Input readOnly value={userInfo.username} />
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <Input
                value={delCode}
                placeholder="输入验证码"
                onChange={(e) => setDelCode(e.target.value)}
              />
              <SendCodeBtn onClick={toSendCode} />
            </div>
            <br />
          </>
        }
      />
      <div style={{ height: '100%' }}>
        <Space>
          {selectedRowKeys.length === 0 ? (
            <>
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                onClick={() => setIsDeleteAllOpen(true)}
              >
                一键删除
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={() => setIsRestoreOpen(true)}
              >
                还原
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                onClick={() => setIsDeleteOpen(true)}
              >
                删除
              </Button>
            </>
          )}
        </Space>
        <br />
        <div className={styles.tableContainer}>
          <DelTable
            loading={loading}
            data={fileData}
            total={total}
            pageNow={pageNow}
            onPageNowChange={onPageNowChange}
            updateData={updateData}
          />
        </div>
      </div>
    </>
  )
}

export default RecycleFile
