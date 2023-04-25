<script setup>
import { useTabs } from "@/biz/Tabs";

const props = defineProps({
    popupKeyword: String,
});

const { active, component, dataset, update } = useTabs({
    data: [
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
    ],
});

function tabClick(entity) {
    update({ keyword: entity.name });
}
</script>

<template>
    <div class="dialog-statistical-analysis">
        <div class="dialog-statistical-analysis-head">
            <el-tabs :value="active" type="card" @tab-click="tabClick">
                <template v-for="entity in dataset">
                    <el-tab-pane :key="entity.keyword" :label="entity.label" :name="entity.keyword"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div class="dialog-statistical-analysis-body">
            <components :key="active" :is="component" :popupKeyword="props.popupKeyword"></components>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/dialog-tabs.scss";
.dialog-statistical-analysis {
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
