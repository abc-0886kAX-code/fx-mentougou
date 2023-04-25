<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { loadStyle } from "@/biz/share/entify/Load";
import { ChartData_Server, ChartData_Obtain } from "@/pages/model/statistical-analysis/server/chart";
import { transObject } from "~/shared/trans";
const { loading } = ChartData_Server.server;
const source = computed(() =>
    transObject(unref(ChartData_Server.server.result.source).data, {
        tableColumn: [],
        tableRows: [],
    })
);

const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

async function executeQuery() {
    console.log(unref(config));
    await ChartData_Obtain();
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-table">
        <div class="data-table-console">
            <el-button type="primary" size="mini">导出<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <el-table class="data-table-body" v-loading="loading" v-bind="loadStyle" size="mini" :data="source.tableRows">
            <el-table-column width="150" prop="tm" align="center"> </el-table-column>
            <template v-for="(item, index) in source.tableColumn">
                <el-table-column :key="index" :label="item.label" align="center">
                    <template v-slot="scope">{{ scope.row[item.filed] }}</template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/scrollbar.scss";
.data-table {
    width: 100%;
    height: 100%;
    &-console {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: end;
        align-items: center;
    }
    &-body {
        height: 90%;
        width: 100%;
        overflow-y: auto;
    }
}
</style>
