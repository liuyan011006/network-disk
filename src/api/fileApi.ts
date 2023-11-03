import instance from "./index";
import { APITYPE } from "@/constant/ApiType";

// 遍历文件 
export const getFileDataApi = (parentDataId: string): any =>
    instance.get(APITYPE.SYSDATA + `/infoData/${parentDataId}`);


// 根据文件类型查找
export const searchFileDataTypeApi = (type: string): any =>
    instance.get(APITYPE.SYSDATA + `/traverseDataByType/${type}`);


// 获取路径
export const getDataPathApi = (dataId: string): any =>
    instance.get(APITYPE.SYSDATA + `/getDataPath/${dataId}`);

// 上传 有问题。。。
export const uploadDataApi = (formdata: any): any =>
    instance({
        method: "POST",
        url: APITYPE.SYSDATA + "/uploadData",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: formdata,
    });

// 新建文件夹
export const newFolderApi = (parentDataId: string, name: string): any =>
    instance.post(APITYPE.SYSDATA + "/createFolder", { parentDataId, name });