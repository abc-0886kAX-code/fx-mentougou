/*
 * @FilePath: \fx-mentougou\src\biz\LayerLegend\store\useLayerLegend.js
 * @Author: zhangxin
 * @Date: 2023-04-14 16:35:53
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 16:39:28
 * @Description:
 */
import { defineStore } from "pinia";

export const Namespace = "useLayerLegend";

export const useLayerLegend = defineStore(Namespace, {
    state: () => ({
        checkList: [],
    }),

    getters: {
        isHasLayer() {
            return this.checkList.length > 0;
        },
    },

    actions: {
        setCheckList(layer) {
            this.checkList = layer;
        },
        clearCheckList() {
            this.checkList = [];
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
