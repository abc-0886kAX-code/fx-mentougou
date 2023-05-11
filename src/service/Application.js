/*
 * @FilePath: \fx-mentougou\src\service\Application.js
 * @Author: maggot-code
 * @Date: 2022-11-24 10:05:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-11 11:13:06
 * @Description:
 */
import axios from "axios";
import { defineService } from "~/service";
import { useTokenMiddleware } from "@/middleware/token.request";

const define = axios.create({
    baseURL: "/Mentougou",
    timeout: import.meta.env.DEV ? 0 : 30000,
});

function transResponse(response) {
    return get(response, "data.data", {});
}

const service = defineService(define, { transResponse });

useTokenMiddleware(define);

export function useService() {
    return defineService(define, { transResponse });
}

export default service;
