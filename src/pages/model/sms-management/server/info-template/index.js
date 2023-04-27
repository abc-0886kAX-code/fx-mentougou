/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\server\info-template\index.js
 * @Author: zhangyang
 * @Date: 2023-02-03 14:27:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 13:14:17
 * @Description:
 */
import { Address, Method } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import InfoTemplate from "@/assets/json/info-template.json";

const service = useService();
function transResponse(response) {
    // const data = get(response, "data", {});
    const data = get(InfoTemplate, "data", []);
    return { data };
}

export const InfoTemplate_Server = service.define({
    url: Address,
    method: Method,
});

export function InfoTemplate_Obtain(props) {
    InfoTemplate_Server.server.config.bind("data", transFormData(props));
    return InfoTemplate_Server.obtain({ transResponse });
}

export default InfoTemplate_Server;
