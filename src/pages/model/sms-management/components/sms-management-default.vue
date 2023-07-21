<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\sms-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:54:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 15:35:53
 * @Description:
-->
<script setup>
import { useTabs } from "@/biz/Tabs";

const { active, component, dataset, update } = useTabs({
    data: [
        {
            keyword: "current-state",
            label: "LED屏",
            template: () => import("./tabs/current-state.vue"),
        },
        {
            keyword: "info-template",
            label: "LED屏模板",
            template: () => import("./tabs/info-template.vue"),
        },
        {
            keyword: "sms-template",
            label: "短信模板",
            template: () => import("./tabs/sms-template.vue"),

        },
        {
            keyword: "director-manage",
            label: "站点负责人",
            template: () => import("./tabs/director-manage.vue"),
        },
    ],
});
function tabClick(entity) {
    update({ keyword: entity.name });
}

</script>

<template>
    <div class="sms-management-default">
        <div class="sms-management-default-head">
            <el-tabs :value="active" type="border-card" @tab-click="tabClick">
                <template v-for="entity in dataset">
                    <el-tab-pane :key="entity.keyword" :label="entity.label" :name="entity.keyword"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div class="sms-management-default-body">
            <components :key="active" :is="component"></components>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/home-table.scss";
@import "@/assets/style/home-tabs.scss";

.sms-management-default {
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-head {
        height: 40px;
        width: 100%;
    }

    &-body {
        height: calc(100% - 40px);
        width: 100%;
    }
}
</style>
