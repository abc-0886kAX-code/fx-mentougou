/*
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\server\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-31 15:34:30
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    const handleData = data.map((item) => {
        item["state"] = item.isonline === "01" ? "在线" : "离线";
        return item;
    });
    return { data: handleData };
}

export const Monitor_Server = service.define({
    url: Address,
    method: Method,
});

export function Monitor_Obtain(props) {
    Monitor_Server.server.config.bind("data", transFormData(props));
    return Monitor_Server.obtain({ transResponse });
}

export default Monitor_Server;
