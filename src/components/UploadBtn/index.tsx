import { Button, message } from 'antd'
import { FC, useRef } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { chunkSize } from '@/constant/upload'
import {
  uploadDataApi,
  multipartCreateApi,
  multipartUploadApi,
  multipartCompleteApi
} from '@/api/uploadApi'
import { getFileMD5 } from '@/utils/getFileMd5'

interface IUploadBtnProps {
  path: string
}

const UploadBtn: FC<IUploadBtnProps> = ({ path }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function onClick() {
    if (!inputRef.current) return
    inputRef.current.click()
  }

  async function uploadFile(e: any) {
    const file = e.target.files[0]
    const fileSize = file.size
    console.log(fileSize, chunkSize)
    if (fileSize <= chunkSize) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('parentDataId', path)
      const { code } = await uploadDataApi(formData)
      if (code !== 200) return message.error('上传失败')
      message.success('上传成功')
    } else {
      const chunkCount = Math.ceil(fileSize / chunkSize)
      const fileMd5 = await getFileMD5(file)

      const initUploadParams = JSON.stringify({
        chunkSize: chunkCount,
        fileName: file.name,
        fileMd5: fileMd5,
        parentDataId: 0
      })

      const { data, code } = await multipartCreateApi(initUploadParams)
      console.log(data, code)
      if (code === 20001) {
        console.log('秒传')
        return
      }
      if (code === 20002) {
        console.log('所有分片上传完毕,可以合并')
        composeFile(
          data.uploadId,
          file.name,
          chunkCount,
          fileSize,
          file.contentType
        )
      }

      const chunkUploadUrls = data.chunks
      const sfrId = data.sfrId
      const parentDataId = path

      for (const item of chunkUploadUrls) {
        let start = (item.partNumber - 1) * chunkSize
        let end = Math.min(fileSize, start + chunkSize)
        let _chunkFile = file.slice(start, end)
        const { code } = await multipartUploadApi(item.uploadUrl, _chunkFile)
        if (code === 200) {
          console.log('第' + item.partNumber + '个分片上传完成')
        }
      }
      composeFile(
        data.uploadId,
        file.name,
        chunkCount,
        fileSize,
        file.contentType,
        fileMd5,
        sfrId,
        parentDataId
      )
    }
  }

  async function composeFile(
    uploadId: string,
    fileName: string,
    chunkSize: number,
    fileSize: number,
    contentType: string,
    fileMd5?: any,
    sfrId?: string,
    parentDataId?: string
  ) {
    const composeParams = JSON.stringify({
      uploadId: uploadId,
      fileName: fileName,
      chunkSize: chunkSize,
      fileSize: fileSize,
      contentType: contentType,
      expire: 12,
      maxGetCount: 2,
      fileMd5: fileMd5,
      sfrId: sfrId,
      parentDataId: parentDataId
    })

    const { data, code } = await multipartCompleteApi(composeParams)

    console.log('合并文件完成', data, code)
  }

  return (
    <>
      <Button type="primary" icon={<UploadOutlined />} onClick={onClick}>
        上传
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={uploadFile}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default UploadBtn
