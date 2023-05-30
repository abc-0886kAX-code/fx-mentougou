/*
 * @FilePath: \fx-mentougou\src\router\useRouter.js
 * @Author: zhangxin
 * @Date: 2022-11-30 10:18:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 16:11:21
 * @Description:
 */

import { defineRouter } from "./defineRouter";
import { defineMeta } from "@/router/meta";

const routes = [
    {
        name: "login",
        path: "/login",
        meta: defineMeta(),
        component: () => import("@/layout/login/login.vue"),
    },
    {
        name: "singleLogin",
        path: "/singleLogin",
        meta: defineMeta(),
        component: () => import("@/layout/loginsso/loginsso.vue"),
    },
    {
        name: "debug",
        path: "/debug",
        meta: defineMeta(),
        component: () => import("@/pages/Debug/debug.vue"),
    },
    {
        name: "layout",
        path: "/",
        redirect: "/home",
        meta: defineMeta({ level: 0 }),
        component: () => import("@/layout/Home.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: "首页",
                    power: true,
                    isMenu: true,
                },
                component: () => import("@/pages/home/home.vue"),
            },
        ],
    },
    {
        name: "404",
        path: "/404",
        meta: defineMeta(),
        component: () => import("@/pages/NotPage/404.vue"),
    },
    {
        name: "*",
        path: "*",
        redirect: "/404",
    },
];
const router = defineRouter(routes);

export function useRouter() {
    return router.core;
}

export function useRoute() {
    return router.core.currentRoute;
}

export const resetRoute = router.reset;

export default router;
