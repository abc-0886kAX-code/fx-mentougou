/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\server\current-state\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 13:07:14
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import CurrentState from "@/assets/json/current-state.json";

const service = useService();
function transResponse(response) {
    // const data = get(response, "data", {});
    const data = get(CurrentState, "data", []);
    return { data };
}

export const CurrentState_Server = service.define({
    url: Address,
    method: Method,
});

export function CurrentState_Obtain(props) {
    CurrentState_Server.server.config.bind("data", transFormData(props));
    return CurrentState_Server.obtain({ transResponse });
}

export default CurrentState_Server;
