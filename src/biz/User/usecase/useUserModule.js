/*
 * @FilePath: \3D防汛作战\src\biz\User\usecase\useUserModule.js
 * @Author: zhangyang
 * @Date: 2022-07-15 11:15:24
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-15 11:17:06
 * @Description:
 */
import { inject } from "@vue/composition-api";
import { UserIdentityModules } from "../share/context";

export default function useUserHomeModule() {
    const modules = inject(UserIdentityModules, {
        modules: [],
        moduleContainerNumber: 0,
    });

    return modules;
}
