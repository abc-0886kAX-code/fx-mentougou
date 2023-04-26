<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\tabs\director-manage.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:07:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-26 17:47:39
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { DirectorManage_Obtain, DirectorManage_Server } from "../../server/director-manage";

const popup = usePopup();
const popupEntity = popup.define({
    width: "70%",
    template: defineComponent(() => import("../../dialog/dialog-director-manage.vue")),
    title: "修改",
});

const { loading } = DirectorManage_Server.server;
const tableData = computed(() => transArray(unref(DirectorManage_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "name",
        label: "负责人姓名",
        align: "center",
    },
    {
        prop: "phone",
        label: "负责人手机号",
        align: "center",
    },
    {
        prop: "company",
        label: "单位",
        align: "center",
    },
    {
        prop: "type",
        label: "负责类型",
        align: "center",
    },
];

function handleEdit(rows) {
    popupEntity.show(rows);
}
function handleSelectionChange(val) {
    console.log(val);
}

async function executeQuery() {
    await DirectorManage_Obtain();
}
onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="director-manage" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50" align="center"> </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
            </template>
        </el-table-column>
        <template v-for="item in tableColumn">
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
        </template>
    </el-table>
</template>

<style scoped lang="scss">
.director-manage {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
