/*
 * @FilePath: \fx-mentougou\src\pages\model\device-management\server\device-management\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-12 15:10:42
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import DeviceManage from "@/assets/json/device-manage.json";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    // const data = get(DeviceManage, "data", []);
    return { data };
}

export const DeviceManage_Server = service.define({
    url: Address,
    method: Method,
});

export function DeviceManage_Obtain(props) {
    DeviceManage_Server.server.config.bind("data", transFormData(props));
    return DeviceManage_Server.obtain({ transResponse });
}

export default DeviceManage_Server;
