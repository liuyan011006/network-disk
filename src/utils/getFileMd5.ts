import SparkMD5 from 'spark-md5'

export const getFileMD5 = (file: File) => {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      spark.append(e.target.result)
      resolve(spark.end())
    }
    fileReader.onerror = () => {
      reject('')
    }
    fileReader.readAsArrayBuffer(file)
  })
}
