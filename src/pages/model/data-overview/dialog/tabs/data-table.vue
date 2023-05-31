<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-table.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 15:00:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-31 17:56:38
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { loadStyle } from "@/biz/share/entify/Load";
import { useDateWater } from "@/hooks/useDate.js";
import { ChartData_Server, ChartData_Obtain } from "@/pages/model/data-overview/server/chart";
const tableColumn = [
    {
        prop: "tm",
        label: "时间",
        align: "center",
    },
    {
        prop: "z",
        label: "水位",
        align: "center",
    },
];

const { loading } = ChartData_Server.server;
const source = computed(() => unref(ChartData_Server.server.result.source).data);

const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const dateVal = useDateWater();

const params = computed(() => {
    return {
        starttime: unref(dateVal)[0],
        endtime: unref(dateVal)[1],
        stcd: unref(config).stcd,
    };
});

async function executeQuery() {
    await ChartData_Obtain(unref(params));
}

async function executeReset() {
    dateVal.value = useDateWater();
    executeQuery();
}
function executeExport() {
    console.log(unref(params));
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-table" v-loading="loading" v-bind="loadStyle">
        <div class="data-table-form">
            <el-date-picker v-model="dateVal" size="mini" type="datetimerange" start-placeholder="开始日期"
                end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
            <div>
                <el-button size="mini" type="primary" @click="executeQuery"><i
                        class="el-icon-search el-icon--left"></i>查询</el-button>
                <el-button size="mini" type="danger" @click="executeReset"><i
                        class="el-icon-refresh el-icon--left"></i>重置</el-button>
                <el-button size="mini" type="warning" @click="executeExport"><i
                        class="el-icon-upload el-icon--left"></i>导出</el-button>
            </div>
        </div>
        <el-table class="data-table-body" size="mini" :data="source" width="100%" height="100%">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
            <template v-for="item in tableColumn">
                <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :align="item.align"> </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/scrollbar.scss";

.data-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    &-form {
        height: 15%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }

    &-body {
        height: 85%;
        width: 100%;
        overflow-y: auto;
    }
}

:deep(.el-table th.gutter) {
    width: 6px !important;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar) {
    width: 6px;
    height: 6px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
    width: 6px;
    background: rgba(#98d9ff, 0.1);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
    background-color: rgba(#98d9ff, 0.5);
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb:hover) {
    background-color: rgba(#98d9ff, 1);
}</style>
