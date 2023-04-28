<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\tabs\current-state.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:07:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 10:27:57
 * @Description:
-->
<script setup>
import { transArray } from "~/shared/trans";
import { loadStyle } from "@/biz/share/entify/Load";
import { CurrentState_Server, CurrentState_Obtain } from "../../server/current-state";

const { loading } = CurrentState_Server.server;
const tableData = computed(() => transArray(unref(CurrentState_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "stnm",
        label: "站点",
        align: "center",
    },
    {
        prop: "info",
        label: "LED屏当前信息",
        align: "center",
    },
];
async function executeQuery() {
    await CurrentState_Obtain();
}
onMounted(() => {
    executeQuery();
});
</script>

<template>
    <el-table class="current-state" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" width="100%" height="100%">
        <el-table-column type="index" width="50" align="center"> </el-table-column>
        <template v-for="item in tableColumn">
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
        </template>
    </el-table>
</template>

<style scoped lang="scss">
.current-state {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
