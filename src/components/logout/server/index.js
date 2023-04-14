/*
 * @FilePath: \防汛水量演算\src\components\logout\server\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-12 17:12:43
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

export const LOGOUT_Server = service.define({
    url: Address,
    method: Method,
});

export function LOGOUT_Obtain(props) {
    LOGOUT_Server.server.config.bind("data", transFormData(props));
    return LOGOUT_Server.obtain({ transResponse });
}

export default LOGOUT_Server;
