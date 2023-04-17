<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { loadStyle } from "@/biz/share/entify/Load";
import { useDateWater } from "@/hooks/useDate.js";
import { ChartData_Server, ChartData_Obtain } from "@/pages/model/data-overview/server/chart";
const tableColumn = [
    {
        prop: "stnm",
        label: "名称",
        align: "center",
    },
    {
        prop: "signname",
        label: "站点类型",
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

async function executeQuery() {
    await ChartData_Obtain();
}

async function executeReset() {
    dateVal.value = useDateWater();
    await ChartData_Obtain();
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-table">
        <div class="data-table-form">
            <el-date-picker v-model="dateVal" size="mini" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
            <div>
                <el-button size="mini" type="primary" @click="executeQuery">查询</el-button>
                <el-button size="mini" type="danger" @click="executeReset">重置</el-button>
            </div>
        </div>
        <el-table class="data-table-body" v-loading="loading" v-bind="loadStyle" size="mini" :data="source">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
            <template v-for="item in tableColumn">
                <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
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
</style>
