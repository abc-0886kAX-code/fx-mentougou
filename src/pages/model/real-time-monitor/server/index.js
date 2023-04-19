/*
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\server\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-18 17:57:29
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    // const data = get(response, "data", {});
    const data = [
        {
            stnm: "监控点1",
            position: "门头沟",
            visualangle: "南向北",
            state: "在线",
        },
        {
            stnm: "监控点2",
            position: "门头沟",
            visualangle: "东向西",
            state: "在线",
        },
    ];
    return { data };
}

export const OverviewSite_Server = service.define({
    url: Address,
    method: Method,
});

export function OverviewSite_Obtain(props) {
    OverviewSite_Server.server.config.bind("data", transFormData(props));
    return OverviewSite_Server.obtain({ transResponse });
}

export default OverviewSite_Server;