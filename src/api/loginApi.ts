import instance from "./index";
import { APITYPE } from "@/constant/ApiType";

// 登录 - 账号密码登录
export const toPloginApi = (username: string, password: string): any =>
    instance.post(APITYPE.SYSVISITOR + "/plogin", { username, password });

// 登录 - 手机验证码注册登录
export const toCloginApi = (username: string, code: string): any =>
    instance.post(APITYPE.SYSVISITOR + "/clogin", { username, code })

// 发送登录注册验证码
export const sendCodeApi = (username: string): any =>
    instance.get(APITYPE.SYSVISITOR + "/sendCode?username=" + username)


