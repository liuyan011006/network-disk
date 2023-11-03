import instance from "./index";
import { APITYPE } from "@/constant/ApiType";

// 删除文件
export const deleteDataApi = (dataId: string): any =>
    instance.delete(APITYPE.SYSDATA + "/delData/" + dataId);


// 批量删除文件
export const deleteDataAllApi = (ids: string[]): any => {
    return instance({
        method: "DELETE",
        url: APITYPE.SYSDATA + "/batchDelData",
        data: {
            ids
        },
    });
};