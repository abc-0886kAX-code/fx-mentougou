<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\dialog-data-overview.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 14:31:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-17 15:53:52
 * @Description:
-->
<script setup>
import { useTabs } from "@/biz/Tabs";

const props = defineProps({
    popupKeyword: String,
});

const { active, component, dataset, update } = useTabs({
    data: [
        {
            keyword: "data-overview",
            label: "数据总览",
            template: () => import("./tabs/data-overview.vue"),
        },
        {
            keyword: "data-chart",
            label: "数据图表",
            template: () => import("./tabs/data-chart.vue"),
        },
        {
            keyword: "data-table",
            label: "数据表格",
            template: () => import("./tabs/data-table.vue"),
        },
        {
            keyword: "data-info",
            label: "站点信息",
            template: () => import("./tabs/data-info.vue"),
        },
    ],
});

function tabClick(entity) {
    update({ keyword: entity.name });
}
</script>

<template>
    <div class="dialog-data-overview">
        <div class="dialog-data-overview-head">
            <el-tabs :value="active" type="card" @tab-click="tabClick">
                <template v-for="entity in dataset">
                    <el-tab-pane :key="entity.keyword" :label="entity.label" :name="entity.keyword"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div class="dialog-data-overview-body">
            <components :key="active" :is="component" :popupKeyword="props.popupKeyword"></components>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/dialog-tabs.scss";
.dialog-data-overview {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-head {
        height: 60px;
        width: 100%;
    }
    &-body {
        height: calc(100% - 60px - 12px);
        width: 100%;
    }
}
</style>
