/*
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\server\info.js
 * @Author: zhangxin
 * @Date: 2023-05-31 15:07:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-31 15:13:33
 * @Description:
 */
import { InfoAddress, InfoMethod } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);

    return { data };
}

export const SiteInfo_Server = service.define({
    url: InfoAddress,
    method: InfoMethod,
});

export function SiteInfo_Obtain(props) {
    SiteInfo_Server.server.config.bind("data", transFormData(props));
    return SiteInfo_Server.obtain({ transResponse });
}

export default SiteInfo_Server;
