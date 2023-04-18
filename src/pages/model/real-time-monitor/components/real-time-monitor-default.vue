<!--
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\components\real-time-monitor-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:46:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-18 17:57:21
 * @Description:
-->
<script setup>
import { transArray } from "~/shared/trans";
import { loadStyle } from "@/biz/share/entify/Load";
import { OverviewSite_Obtain, OverviewSite_Server } from "../server";
const tableColumn = [
    {
        prop: "stnm",
        label: "名称",
        align: "center",
    },
    {
        prop: "position",
        label: "位置",
        align: "center",
    },
    {
        prop: "visualangle",
        label: "视角",
        align: "center",
    },
    {
        prop: "state",
        label: "状态",
        align: "center",
    },
];
const { loading } = OverviewSite_Server.server;
const tableData = computed(() => transArray(unref(OverviewSite_Server.server.result.source).data, []));

async function executeQuery() {
    await OverviewSite_Obtain();
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="real-time-monitor-default">
        <div class="real-time-monitor-default-stat">
            <div class="real-time-monitor-default-stat-total">监控总数 4</div>
            <div class="real-time-monitor-default-stat-state">在线 4 - 离线 0</div>
        </div>
        <el-table class="real-time-monitor-default-table" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
            <template v-for="item in tableColumn">
                <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/home-table.scss";
.real-time-monitor-default {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-stat {
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #fff;
    }
    &-table {
        height: calc(100% - 30px);
        width: 100%;
        overflow-y: auto;
    }
}
</style>
