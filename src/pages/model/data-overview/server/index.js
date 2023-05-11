/*
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\server\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-11 14:08:59
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SITE from "@/assets/json/site.json";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    // const data = get(SITE, "data", []);
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
