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