/*
 * @FilePath: \fx-mentougou\src\middleware\token.request.js
 * @Author: maggot-code
 * @Date: 2022-11-01 10:42:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 17:39:21
 * @Description:
 */
import { uuid } from "@/shared/uuid.js";
import { useRouter } from "@/router/useRouter";
import { useUserStore } from "@/store/useUser";
import { MessageBox, Message } from "element-ui";
const user = useUserStore();
const router = useRouter();

function normal(config) {
    if (user.tokenUnusable) return config;

    config.headers["Authorization"] = `Bearer ${uuid()}`;
    config.headers["token"] = user.token;

    return config;
}

function response(response) {
    const res = response.data;
    if (res.code != 200) {
        if (res.code == 401) {
            Message({
                message: res.msg || "登录过期,请重新登录!",
                type: "error",
                duration: 1500,
                onClose: () => {
                    user.emptyUserInfo();
                    setTimeout(() => {
                        router.push("/login");
                    }, 1000);
                },
            });
        } else {
            Message({
                message: res.msg || "请求出错，请重试",
                type: "error",
                duration: 1500,
                onClose: () => { },
            });
        }
        return Promise.reject(new Error(res.msg || "Error"));
    } else {
        return response;
    }
}

export function useTokenMiddleware(define) {
    define.interceptors.request.use(normal);
    define.interceptors.response.use(response);

    return define;
}

export default useTokenMiddleware;
