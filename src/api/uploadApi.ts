import instance from './index'
import { APITYPE } from '@/constant/ApiType'

// 上传
export const uploadDataApi = (formdata: any): any =>
  instance({
    method: 'POST',
    url: APITYPE.SYSVISITOR + '/uploadData',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })

//分片上传
export const multipartCreateApi = (data: any): any =>
  instance({
    method: 'POST',
    url: APITYPE.SYSVISITOR + '/multipart/create',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })

//合并上传
export const multipartCompleteApi = (data: any): any =>
  instance({
    method: 'POST',
    url: APITYPE.SYSVISITOR + '/multipart/complete',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })

//   每一片进行上传

export const multipartUploadApi = (url: string, data: any): any =>
  instance({
    method: 'PUT',
    url: url,
    data: data
  })
