import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, Input, Button, message, Radio } from 'antd'
import styles from './index.module.scss'
import { toPloginApi, toCloginApi, sendCodeApi } from '@/api/loginApi'
import SendCodeBtn from '@/components/SendCodeBtn'
import useInput from '@/hooks/useInput'

const View = () => {
  const navigateTo = useNavigate()
  const username = useInput()
  const password = useInput()
  const codeNumber = useInput()
  const [isAccountOrPhone, setIsAccountOrPhone] = useState(true)

  async function toPlogin() {
    if (username.value.trim() === '' || password.value.trim() === '') {
      return message.warning('请完整输入信息！')
    }
    const { code, data } = await toPloginApi(username.value, password.value)
    if (code !== 200) return message.error('登录失败!')
    message.success('登录成功！')
    localStorage.setItem('wl-network-token', data.token)
    navigateTo('/')
  }

  async function toClogin() {
    if (username.value.trim() === '' || codeNumber.value.trim() === '') {
      return message.warning('请完整输入信息！')
    }
    const { code, data } = await toCloginApi(username.value, codeNumber.value)
    if (code !== 200) return message.error('登录失败!')
    message.success('登录成功！')
    localStorage.setItem('wl-network-token', data.token)
    navigateTo('/')
  }

  async function toSendCode(callback: Function) {
    if (username.value.trim().length !== 11) {
      return message.warning('请输入正确手机号！')
    }
    const { code } = await sendCodeApi(username.value)
    if (code !== 200) return message.error('发送验证码失败!')
    message.success('发送验证码成功!')
    callback()
  }

  return (
    <div className={styles.loginPage}>
      <canvas id="canvas" style={{ display: 'block' }}></canvas>
      <div className={styles.loginBox}>
        <div className={styles.title}>
          <h1>网盘 · 系统</h1>
          <p>network disk system</p>
        </div>
        <div>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Radio.Group
              defaultValue="0"
              onChange={(e) => setIsAccountOrPhone(e.target.value === '0')}
              style={{ width: '100%' }}
            >
              <Radio.Button value="0" className={styles.radioState}>
                账号登录
              </Radio.Button>
              <Radio.Button value="1" className={styles.radioState}>
                手机验证
              </Radio.Button>
            </Radio.Group>
            <Input placeholder="手机号" {...username} />
            {isAccountOrPhone ? (
              <>
                <Input.Password placeholder="密码" {...password} />
                <Button type="primary" block onClick={toPlogin}>
                  账号登录
                </Button>
              </>
            ) : (
              <>
                <div className={styles.captchaBox}>
                  <Input placeholder="验证码" {...codeNumber} />
                  <SendCodeBtn
                    style={{ height: '38px', marginLeft: '10px' }}
                    onClick={toSendCode}
                  />
                </div>
                <Button type="primary" block onClick={toClogin}>
                  手机登录
                </Button>
              </>
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default View
