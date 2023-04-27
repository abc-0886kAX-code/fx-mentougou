/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\server\sms-template\modify.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 10:28:02
 * @Description:
 */
import { ModifyAddress, ModifyMethod } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";

const service = useService();
function transResponse(response) {
    const data = get(response, "data", {});
    return data;
}

export const Modify_Server = service.define({
    url: ModifyAddress,
    method: ModifyMethod,
});

export function Modify_Obtain(props) {
    Modify_Server.server.config.bind("data", transFormData(props));
    return Modify_Server.obtain({ transResponse });
}

export default Modify_Server;
