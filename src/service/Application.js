/*
 * @FilePath: \fx-mentougou\src\service\Application.js
 * @Author: maggot-code
 * @Date: 2022-11-24 10:05:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-11 16:56:34
 * @Description:
 */
import axios from "axios";
import { defineService } from "~/service";
import { useTokenMiddleware } from "@/middleware/token.request";
const { VITE_BASE_PREFIX } = import.meta.env;

const define = axios.create({
    baseURL: VITE_BASE_PREFIX,
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
