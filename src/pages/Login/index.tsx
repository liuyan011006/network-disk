import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, Input, Button, message, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import styles from './login.module.scss'

//引入验证码图片
// import { toPloginApi, toCloginApi, sendCodeApi } from '@/request/loginApi'
import SendCodeBtn from '@/components/SendCodeBtn'
import useInput from '@/hooks/useInput'

const View = () => {
  const navigateTo = useNavigate()
  //定义一个变量
  const username = useInput()
  const password = useInput()
  const codeNumber = useInput()
  // 判断是账号登录 还是 手机登录
  const [isAccountOrPhone, setIsAccountOrPhone] = useState(true)
  const handleLoginStatus = (e: RadioChangeEvent) => {
    setIsAccountOrPhone(e.target.value == 'account' ? true : false)
  }
  //账号密码登录
  const toPlogin = async () => {
    if (username.value.trim() === '' || password.value.trim() === '') {
      return message.warning('请完整输入信息！')
    }
    // //发起登录请求
    // const { code, data } = await toPloginApi({
    //   username: username.value,
    //   password: password.value
    // })
    // console.log(code, data)
    // if (code !== 200) return message.error('登录失败!')
    // message.success('登录成功！')
    // localStorage.setItem('future-network-token', data.token)
    navigateTo('/')
  }
  // 手机登录
  const toClogin = async () => {
    if (username.value.trim() === '' || codeNumber.value.trim() === '') {
      return message.warning('请完整输入信息！')
    }
    // const { code, data } = await toCloginApi({
    //   username: username.value,
    //   code: codeNumber.value
    // })
    // if (code !== 200) return message.error('登录失败!')
    // message.success('登录成功！')
    // localStorage.setItem('future-network-token', data.token)
    // navigateTo('/home')
  }

  //发送验证码
  const sendCode = async (callback: Function) => {
    if (username.value.trim().length !== 11) {
      return message.warning('请输入正确手机号！')
    }

    // const { code, data } = await sendCodeApi({ username: username.value })
    // if (code !== 200) return message.error('发送验证码失败!')
    // message.success('发送验证码成功!')
    callback()
  }

  return (
    <div className={styles.loginPage}>
      <canvas id="canvas" style={{ display: 'block' }}></canvas>
      <div className={styles.loginBox}>
        <div className={styles.title}>
          <h1>前端&nbsp;&nbsp;通用后台系统</h1>
          <p> strive everyday </p>
        </div>
        <div>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Radio.Group
              defaultValue="account"
              size="large"
              onChange={handleLoginStatus}
              style={{ width: '100%' }}
            >
              <Radio.Button value="account" className={styles.radioState}>
                账号登录
              </Radio.Button>
              <Radio.Button value="phone" className={styles.radioState}>
                手机验证
              </Radio.Button>
            </Radio.Group>
            <Input placeholder="手机号" {...username} />
            {isAccountOrPhone ? (
              <Input.Password placeholder="密码" {...password} />
            ) : (
              <div className={styles.captchaBox}>
                <Input placeholder="验证码" {...codeNumber} />
                <SendCodeBtn
                  style={{ height: '38px', marginLeft: '10px' }}
                  onClick={sendCode}
                />
              </div>
            )}
            {isAccountOrPhone ? (
              <Button type="primary" block onClick={toPlogin}>
                账号登录
              </Button>
            ) : (
              <Button type="primary" block onClick={toClogin}>
                手机登录
              </Button>
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default View
