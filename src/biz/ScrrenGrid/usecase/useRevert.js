/*
 * @FilePath: \fx-mentougou\src\biz\ScrrenGrid\usecase\useRevert.js
 * @Author: zhangyang
 * @Date: 2022-06-16 11:23:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:32:43
 * @Description:
 */
import { Sign } from "@/biz/share/entify/Sign";

export function useRevert() {
    const { sign, setupSign } = Sign();
    const revertMap = ref([]);
    const revertProps = computed(() => ({
        key: unref(sign),
        skip: unref(revertMap),
    }));

    const useRevertRefs = provide("revertRefs", revertProps);

    function setupRevertMap(map) {
        revertMap.value = map;
        setupSign();
    }

    return {
        useRevertRefs,
        setupRevertMap,
    };
}
