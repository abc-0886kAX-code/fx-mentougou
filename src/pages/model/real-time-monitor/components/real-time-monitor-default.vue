<!--
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\components\real-time-monitor-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:46:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 17:40:34
 * @Description:
-->
<script setup>
import { transArray } from "~/shared/trans";
import { loadStyle } from "@/biz/share/entify/Load";
import { OverviewSite_Obtain, OverviewSite_Server } from "../server";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { usePopup } from "@/biz/Popup/usecase/usePopup";

const popup = usePopup();
const popupEntity = popup.define({
    width: "60%",
    title: "数据总览",
    template: defineComponent(() => import("../dialog/dialog-real-time-monitor.vue")),
});

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
const { mapview } = useMars3d();

const { loading } = OverviewSite_Server.server;
const tableData = computed(() => transArray(unref(OverviewSite_Server.server.result.source).data, []));

function handleRow(row) {
    const { lttd, lgtd } = row;
    unref(mapview).flyToPoint(
        {
            lng: lgtd,
            lat: lttd,
        },
        {
            radius: 3000,
        }
    );
}

function handleClick(row) {
    popupEntity.show(row);
}

async function executeQuery() {
    await OverviewSite_Obtain();
}

onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <div class="real-time-monitor-default">
        <div class="real-time-monitor-default-stat">
            <div class="real-time-monitor-default-stat-total">监控总数 4</div>
            <div class="real-time-monitor-default-stat-state">在线 4 - 离线 0</div>
        </div>
        <el-table class="real-time-monitor-default-table" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" @row-click="handleRow">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
            <template v-for="item in tableColumn">
                <el-table-column v-if="item.prop === 'stnm'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align">
                    <template slot-scope="scope">
                        <el-link type="primary" @click.stop="handleClick(scope.row)">{{ scope.row.stnm }}</el-link>
                    </template>
                </el-table-column>

                <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
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
