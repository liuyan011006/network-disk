import { FC } from 'react'
import { Layout } from 'antd'

interface IHeaderComp {
  background: string
}

const HeaderComp: FC<IHeaderComp> = ({ background }) => {
  return <Layout.Header style={{ background }}></Layout.Header>
}

export default HeaderComp
