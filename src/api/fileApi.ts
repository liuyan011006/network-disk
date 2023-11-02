import instance from "./index";
import { APITYPE } from "@/constant/ApiType";

export const getFileDataApi = (parentDataId: number): any =>
    instance.get(APITYPE.SYSDATA + `/infoData/${parentDataId}`);
