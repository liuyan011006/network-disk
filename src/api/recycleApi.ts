import instance from './index'
import { APITYPE } from '@/constant/ApiType'

// 删除文件
export const deleteDataApi = (dataId: string): any =>
  instance.delete(APITYPE.SYSDATA + '/delData/' + dataId)

// 批量删除文件
export const deleteDataAllApi = (ids: string[]): any => {
  return instance({
    method: 'DELETE',
    url: APITYPE.SYSDATA + '/batchDelData',
    data: {
      ids
    }
  })
}

// 遍历文件
export const getDelFileDataApi = (
  pageNow: number,
  pageSize: number = 500
): any =>
  instance.get(
    APITYPE.SYSDATA + `/infoDataDel?pageSize=${pageSize}&pageNow=${pageNow}`
  )

// 还原文件
export const restoreDataApi = (ids: string[]): any => {
  return instance({
    method: 'POST',
    url: APITYPE.SYSDATA + '/restoreData',
    data: {
      ids
    }
  })
}

// 回收站删除文件
export const finalDelDataApi = (dataId: string, code?: string): any =>
  instance.delete(APITYPE.SYSDATA + '/finalDelData/' + dataId + '?code=' + code)

// 获取回收站验证码
export const sendFinalDelCodeApi = (phoneNumber: string): any =>
  instance.get(
    APITYPE.SYSVISITOR + `/sendFinalDelCode?phoneNumber=${phoneNumber}`
  )

// 回收站删除文件
export const batchFinalDelDataApi = (ids: string[], code?: string): any => {
  return instance({
    method: 'DELETE',
    url: APITYPE.SYSDATA + '/batchFinalDelData',
    data: {
      ids,
      code
    }
  })
}
