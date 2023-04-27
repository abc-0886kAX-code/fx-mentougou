/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\server\director-manage\select.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 11:18:52
 * @Description:
 */
import { SelectAddress, SelectMethod } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    const data = get(response, "data", {});
    return data;
}

export const Select_Server = service.define({
    url: SelectAddress,
    method: SelectMethod,
});

export function Select_Obtain(props) {
    Select_Server.server.config.bind("data", transFormData(props));
    return Select_Server.obtain({ transResponse });
}

export default Select_Server;
