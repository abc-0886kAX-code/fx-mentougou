/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\server\sms-template\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-12 16:52:18
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SMS from "@/assets/json/sms.json";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", []);
    // const data = get(SMS, "data", []);
    return { data };
}

export const SMS_Server = service.define({
    url: Address,
    method: Method,
});

export function SMS_Obtain(props) {
    SMS_Server.server.config.bind("data", transFormData(props));
    return SMS_Server.obtain({ transResponse });
}

export default SMS_Server;
