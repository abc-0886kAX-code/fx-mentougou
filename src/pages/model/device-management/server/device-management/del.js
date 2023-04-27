/*
 * @FilePath: \fx-mentougou\src\pages\model\device-management\server\device-management\del.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 14:07:34
 * @Description:
 */
import { DelAddress, DelMethod } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    const data = get(response, "data", {});
    return data;
}

export const Del_Server = service.define({
    url: DelAddress,
    method: DelMethod,
});

export function Del_Obtain(props) {
    Del_Server.server.config.bind("data", transFormData(props));
    return Del_Server.obtain({ transResponse });
}

export default Del_Server;
