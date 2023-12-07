import instance from './index'
import { APITYPE } from '@/constant/ApiType'

// 遍历文件
export const getFileDataApi = (
  parentDataId: string,
  pageNow: number,
  pageSize: number = 500
): any =>
  instance.get(
    APITYPE.SYSDATA +
      `/infoData/${parentDataId}?pageSize=${pageSize}&pageNow=${pageNow}`
  )

// 返回文件目录
export const getDataFolderApi = (folderId: string): any =>
  instance.get(APITYPE.SYSDATA + `/getDataFolder/${folderId}`)

// 获取文件详细信息
export const getDataInfoApi = (dataId: string): any =>
  instance.get(APITYPE.SYSDATA + `/getDataInfo/${dataId}`)

// 根据文件类型查找
export const searchFileDataTypeApi = (
  type: string,
  pageNow: number,
  pageSize: number = 10
): any =>
  instance.get(
    APITYPE.SYSDATA +
      `/traverseDataByType/${type}?pageSize=${pageSize}&pageNow=${pageNow}`
  )

// 获取路径
export const getDataPathApi = (dataId: string): any =>
  instance.get(APITYPE.SYSDATA + `/getDataPath/${dataId}`)

// 上传 有问题。。。
export const uploadDataApi = (formdata: any): any =>
  instance({
    method: 'POST',
    url: APITYPE.SYSDATA + '/uploadData',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })

// 新建文件夹
export const newFolderApi = (parentDataId: string, name: string): any =>
  instance.post(APITYPE.SYSDATA + '/createFolder', { parentDataId, name })

//   重命名
export const updateFolderNameApi = (id: string, name: string): any =>
  instance.put(APITYPE.SYSDATA + '/updateDataName', { id, name })

// 移动文件到另一个文件
export const shearToNewFolderApi = (
  ids: string[],
  targetFolderId: string
): any =>
  instance.post(APITYPE.SYSDATA + '/shearToNewFolder', { ids, targetFolderId })

// 复制文件到另一个文件
export const copyToNewFolderApi = (
  ids: string[],
  targetFolderId: string
): any =>
  instance.post(APITYPE.SYSDATA + '/copyToNewFolder', { ids, targetFolderId })

// 覆盖文件
export const batchOverrideFilesApi = (
  ids: string[],
  sids: string[],
  targetFolderId: string
): any =>
  instance.post(APITYPE.SYSDATA + '/batchOverrideFiles', {
    ids,
    sids,
    targetFolderId
  })

// 生成副本文件
export const batchGenerateDuplicatesApi = (
  ids: string[],
  sids: string[],
  targetFolderId: string
): any =>
  instance.post(APITYPE.SYSDATA + '/batchGenerateDuplicates', {
    ids,
    sids,
    targetFolderId
  })
