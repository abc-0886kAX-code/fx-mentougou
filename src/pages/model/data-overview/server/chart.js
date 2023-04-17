/*
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\server\chart.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-17 17:27:33
 * @Description:
 */
import { ChartAddress, CGartMethod } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SITE from "@/assets/json/site.json";

const service = useService();
function transResponse(response) {
    // const data = get(response, "data", {});
    const data = get(SITE, "data", []);
    return { data };
}

export const ChartData_Server = service.define({
    url: ChartAddress,
    method: CGartMethod,
});

export function ChartData_Obtain(props) {
    ChartData_Server.abort();
    ChartData_Server.server.config.bind("data", transFormData(props));
    return ChartData_Server.obtain({ transResponse });
}

export default ChartData_Server;
