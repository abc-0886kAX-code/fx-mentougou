/*
 * @FilePath: \3D防汛作战\src\biz\User\usecase\useUserHomeModule.js
 * @Author: zhangyang
 * @Date: 2022-07-15 09:59:01
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-15 11:27:42
 * @Description:
 */
import { chunk } from "lodash-es";
import { getUserIdentity } from "../entity/Identity";
import { UserIdentityModules } from "../share/context";

export const filterPowerToModule = (identity) => (item) => {
    const mapping = item?.power ?? [];
    return mapping.includes(identity);
};

export const sortPowerToModule = (prev, next) => {
    const prevValue = prev?.sort ?? 0;
    const nextValue = next?.sort ?? 0;
    return prevValue - nextValue;
};

export function setupModulesPosition(index) {
    return index % 2 <= 0 ? "right" : "left";
}

export default function useUserHomeModule(moduleGather) {
    const Identity = getUserIdentity();
    const { identityToNumber } = Identity;
    const modules = computed(() => {
        const data = moduleGather.filter(filterPowerToModule(identityToNumber())).sort(sortPowerToModule);
        return chunk(data, 3).reverse();
    });
    const moduleContainerNumber = computed(() => unref(modules).length);

    provide(UserIdentityModules, {
        modules,
        moduleContainerNumber,
    });

    return {
        modules,
        moduleContainerNumber,
        setupModulesPosition,
    };
}
