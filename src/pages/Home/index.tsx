import { FC } from 'react'
import { Button, Space } from 'antd'

const Home: FC = () => {
  return (
    <div>
      <Space>
        <Button>上传</Button>
        <Button>新建文件夹</Button>
      </Space>
    </div>
  )
}

export default Home
