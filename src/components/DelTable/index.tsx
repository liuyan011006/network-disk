import { FC, useEffect, useState } from 'react'
import { Table, Space, message, Tooltip, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserInfo } from '@/store/user/selector'
import { selectRecycleSelectedRowKeys } from '@/store/file/selector'
import { setRecycleSelectedRowKeys } from '@/store/file'
import type { ColumnsType } from 'antd/es/table'
import { DeleteFilled, RedoOutlined } from '@ant-design/icons'
import {
  restoreDataApi,
  finalDelDataApi,
  sendFinalDelCodeApi
} from '@/api/recycleApi'
import CommonModal from '../CommonModal'
import IconfontComp from '../IconfontComp'
import { fileType } from '@/constant/FileType'
import styles from './index.module.scss'
import SendCodeBtn from '@/components/SendCodeBtn'

interface IFileTableProps {
  loading: boolean
  data: IFile[]
  total: number
  pageNow: number
  onPageNowChange: (page: number) => void
  updateData: () => void
}

const DelTable: FC<IFileTableProps> = ({
  loading,
  data,
  total,
  pageNow,
  onPageNowChange,
  updateData
}) => {
  const dispatch = useDispatch()
  const selectedRowKeys = useSelector(selectRecycleSelectedRowKeys)
  const userInfo = useSelector(selectUserInfo)
  const [selectDataId, setSelectDataId] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isRestoreOpen, setIsRestoreOpen] = useState(false)
  const [isSafeOpen, setIsSafeOpen] = useState(false)
  const [delCode, setDelCode] = useState('')

  useEffect(() => {}, [])

  // 还原文件
  async function onReductionFile() {
    const { code } = await restoreDataApi([selectDataId])
    setIsRestoreOpen(false)
    if (code !== 200) return message.error('还原失败')
    message.success('还原成功')
    updateData()
  }

  // 删除单个文件
  async function onDeleteFile() {
    const { code } = await finalDelDataApi(selectDataId)
    if (code === 10004) setIsSafeOpen(true)
    if (code === 200) {
      message.success('删除成功')
      updateData()
    }
    setIsDeleteOpen(false)
  }
  // 安全验证
  async function onSafe() {
    const { code } = await finalDelDataApi(selectDataId, delCode)
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

  function onPageNow(page: number) {
    onPageNowChange(page)
  }

  const columns: ColumnsType<IFile> = [
    {
      title: '文件名',
      dataIndex: 'name',
      // @ts-ignore
      render: (text: number, data: IFile) => (
        <div className={styles.fileName}>
          {/* @ts-ignore */}
          <IconfontComp name={fileType[data.type]} size="20" />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: '有效时间',
      dataIndex: 'days',
      render: (text: string) => <p>{text || '-'}天</p>
    },
    {
      title: '操作',
      render: (_, data) => {
        return (
          <Space>
            <Tooltip title="还原">
              <RedoOutlined
                onClick={() => {
                  setSelectDataId(data.id)
                  setIsRestoreOpen(true)
                }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <DeleteFilled
                onClick={() => {
                  setSelectDataId(data.id)
                  setIsDeleteOpen(true)
                }}
              />
            </Tooltip>
          </Space>
        )
      }
    }
  ]
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
      <Table
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => dispatch(setRecycleSelectedRowKeys(keys))
        }}
        scroll={{ y: 'calc(100vh - 350px)' }}
        columns={columns}
        dataSource={data}
        pagination={{
          hideOnSinglePage: true,
          total: total,
          current: pageNow,
          defaultPageSize: 500,
          onChange: onPageNow
        }}
      />
    </>
  )
}
export default DelTable
