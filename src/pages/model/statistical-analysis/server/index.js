/*
 * @FilePath: \fx-mentougou\src\pages\model\statistical-analysis\server\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-25 16:18:10
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SITE from "@/assets/json/site.json";

const service = useService();
function transResponse(response) {
    // const data = get(response, "data", {});
    const data = get(SITE, "data", []);
    return { data };
}

export const SelectSite_Server = service.define({
    url: Address,
    method: Method,
});

export function SelectSite_Obtain(props) {
    SelectSite_Server.server.config.bind("data", transFormData(props));
    return SelectSite_Server.obtain({ transResponse });
}

export default SelectSite_Server;
