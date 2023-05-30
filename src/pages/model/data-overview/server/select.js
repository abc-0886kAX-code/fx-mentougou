/*
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\server\select.js
 * @Author: zhangxin
 * @Date: 2023-05-30 14:58:51
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 14:59:51
 * @Description:
 */
import { SelectAddress, SelectMethod } from "./config";
import { useService } from "@/service/Application";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    return { data };
}

export const Select_Server = service.define({
    url: SelectAddress,
    method: SelectMethod,
});

export function Select_Obtain(props) {
    Select_Server.server.config.bind("params", props);
    return Select_Server.obtain({ transResponse });
}

export default Select_Server;
