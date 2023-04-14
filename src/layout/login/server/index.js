/*
 * @FilePath: \防汛水量演算\src\layout\login\server\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-12 16:41:40
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    const data = get(response, "data", {});
    return data;
}

export const LOGIN_Server = service.define({
    url: Address,
    method: Method,
});

export function LOGIN_Obtain(props) {
    LOGIN_Server.server.config.bind("data", transFormData(props));
    return LOGIN_Server.obtain({ transResponse });
}

export default LOGIN_Server;
