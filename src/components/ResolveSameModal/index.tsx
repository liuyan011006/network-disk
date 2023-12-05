import { FC, useState } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import CommonModal from '../CommonModal'
import './index.scss'

interface IResolveSameModalProps {
  visible: boolean
  newFolder: IFile[]
  oldFolder: IFile[]
  onOk: (type: number) => void
  onCancel?: () => void
}

const ResolveSameModal: FC<IResolveSameModalProps> = ({
  visible,
  newFolder,
  oldFolder,
  onOk,
  onCancel
}) => {
  const [radioVal, setRadioVal] = useState(0)
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setRadioVal(value)
  }

  return (
    <CommonModal
      title="重复文件提示"
      visible={visible}
      width={700}
      onOk={() => onOk(radioVal)}
      onCancel={onCancel}
      content={
        <>
          <p>
            如选择生成副本，将以文件名称加上序数的方式保存；未选择处理方式的文件，将自动被跳过。
          </p>
          <div className="sameNameFile-title">
            <h3>已有的文件</h3>
            <h3>正在复制文件</h3>
          </div>

          <>
            <div className="sameNameFile-container">
              <div className="sameNameFile-top">
                <div className="sameFile-list">
                  {oldFolder.map((item) => {
                    return (
                      <div className="item" key={item.id}>
                        <div className="icon">1</div>
                        <div className="context">
                          <div className="name">{item.name}</div>
                          <div className="otherInfo">{item.createTime}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="originalFile-list">
                  {newFolder.map((item) => {
                    return (
                      <div className="item" key={item.id}>
                        <div className="icon">1</div>
                        <div className="context">
                          <div className="name">{item.name}</div>
                          <div className="otherInfo">{item.createTime}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Radio.Group
                onChange={onChange}
                value={radioVal}
                className="sameNameFile-bottom"
              >
                <Radio value={0}>跳过本组</Radio>
                <Radio value={1}>覆盖文件</Radio>
                <Radio value={2}>生成副本</Radio>
              </Radio.Group>
            </div>
          </>
        </>
      }
    />
  )
}

export default ResolveSameModal
