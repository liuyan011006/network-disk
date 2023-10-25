import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { APITYPE } from '@/constant/ApiType'

let env = import.meta.env;
let baseURL =
    env.MODE === "development"
        ? env.VITE_APP_BASE_URL + "/api"
        : env.VITE_APP_BASE_URL;

const instance = axios.create({ baseURL, timeout: 20000 });

instance.interceptors.request.use(
    (config) => {
        if ((config.url as string).indexOf(APITYPE.SYSVISITOR) == -1) {
            config.headers["token"] =
                localStorage.getItem("wl-network-token") || "";
        }
        NProgress.start();
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

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
