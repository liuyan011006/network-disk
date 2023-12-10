import instance from './index'
import { APITYPE } from '@/constant/ApiType'

//遍历登录后个人信息
export const infoUserApi = (): any =>
  instance.get(APITYPE.SYSUSER + '/infoUser')
