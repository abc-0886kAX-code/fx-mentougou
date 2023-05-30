/*
 * @FilePath: \fx-mentougou\src\pages\model\system-management\server\device-management\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 17:58:05
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SystemManage from "@/assets/json/system-manage.json";
const sexMap = {
    "01": "男",
    "02": "女",
};

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    const handleData = data.map((item) => {
        item["sexCopy"] = sexMap[item["sex"]] ?? null;
        return item;
    });
    return { data: handleData };
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
