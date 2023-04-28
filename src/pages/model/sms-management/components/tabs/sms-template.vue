<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\tabs\sms-template.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:07:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 10:27:23
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { SMS_Obtain, SMS_Server } from "../../server/sms-template";

const popup = usePopup();
const popupEntity = popup.define({
    width: "40%",
    height: "40vh",
    template: defineComponent(() => import("../../dialog/dialog-sms-template.vue")),
    title: "修改",
    afterClose: executeQuery,
});

const { loading } = SMS_Server.server;
const tableData = computed(() => transArray(unref(SMS_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "gate",
        label: "闸值",
        align: "center",
        width: 60,
    },
    {
        prop: "content",
        label: "短信内容",
        align: "center",
    },
];

function handleEdit(rows) {
    popupEntity.show(rows);
}

async function executeQuery() {
    await SMS_Obtain();
}
onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="sms-template" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" width="100%" height="100%">
        <el-table-column type="index" width="50" align="center"> </el-table-column>
        <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
                <el-link type="warning" @click="handleEdit(scope.row)">修改</el-link>
            </template>
        </el-table-column>
        <template v-for="item in tableColumn">
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
        </template>
    </el-table>
</template>

<style scoped lang="scss">
.sms-template {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
