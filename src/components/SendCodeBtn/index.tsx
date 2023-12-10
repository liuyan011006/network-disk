import { FC, useState, useRef } from 'react'
import { Button } from 'antd'

interface ISendCodeBtnProps {
  onClick: (callback: Function) => void
  style?: any
}

const SendCodeBtn: FC<ISendCodeBtnProps> = ({ onClick, style }) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [sendCodeBtnText, setSendCodeBtnText] = useState('发送验证码')
  const timer = useRef<any>()

  function handleTime() {
    let num = 60
    setIsDisabled(true)
    timer.current = setInterval(() => {
      if (num <= 0) {
        setIsDisabled(false)
        setSendCodeBtnText(`发送验证码`)
        return clearInterval(timer.current)
      }
      setSendCodeBtnText(`还需${num--}秒`)
    }, 1000)
  }

  return (
    <Button
      style={style}
      disabled={isDisabled}
      onClick={() => onClick(handleTime)}
    >
      {sendCodeBtnText}
    </Button>
  )
}

export default SendCodeBtn
