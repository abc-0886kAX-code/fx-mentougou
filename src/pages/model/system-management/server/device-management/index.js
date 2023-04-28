/*
 * @FilePath: \fx-mentougou\src\pages\model\system-management\server\device-management\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 09:54:22
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SystemManage from "@/assets/json/system-manage.json";

const service = useService();
function transResponse(response) {
    // const data = get(response, "data", {});
    const data = get(SystemManage, "data", []);
    return { data };
}

export const SystemManage_Server = service.define({
    url: Address,
    method: Method,
});

export function SystemManage_Obtain(props) {
    SystemManage_Server.server.config.bind("data", transFormData(props));
    return SystemManage_Server.obtain({ transResponse });
}

export default SystemManage_Server;
