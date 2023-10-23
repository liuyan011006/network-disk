import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let env = import.meta.env;
let baseURL =
    env.MODE === "development"
        ? env.VITE_APP_BASE_URL + "/api"
        : env.VITE_APP_BASE_URL;
// 创建axios实例
const instance = axios.create({
    // 基本请求路径的抽取
    baseURL,
    // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
    // timeout: 20000,
});
// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        if ((config.url as string).indexOf("sysVisitor") == -1) {
            config.headers["token"] =
                localStorage.getItem("future-network-token") || "";
        }
        NProgress.start();
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (res) => {
        NProgress.done();
        return res.data;
    },
    (err) => {
        NProgress.done();
        return Promise.reject(err);
    }
);

export default instance;
