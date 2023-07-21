/*
 * @FilePath: \fx-mentougou\src\biz\LayerLegend\store\useLayerLegend.js
 * @Author: zhangxin
 * @Date: 2023-04-14 16:35:53
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 14:42:57
 * @Description:
 */
import { defineStore } from "pinia";

export const Namespace = "useLayerLegend";

export const useLayerLegend = defineStore(Namespace, {
    state: () => ({
        checkList: [],
        group: [],
    }),

    getters: {
        isHasLayer() {
            return this.group.length > 0;
        },
    },

    actions: {
        setCheckList(layer) {
            this.group = [...this.group, ...layer];
        },
        clearCheckList() {
            this.group = [];
        },
    },
});

export function useLayerLegendStore() {
    return useLayerLegend();
}

export default {
    namespace: Namespace,
    store: useLayerLegend,
};
