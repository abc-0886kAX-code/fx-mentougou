/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\server\director-manage\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-12 17:33:32
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import director from "@/assets/json/director.json";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    // const data = get(director, "data", []);
    return { data };
}

export const DirectorManage_Server = service.define({
    url: Address,
    method: Method,
});

export function DirectorManage_Obtain(props) {
    DirectorManage_Server.server.config.bind("data", transFormData(props));
    return DirectorManage_Server.obtain({ transResponse });
}

export default DirectorManage_Server;
