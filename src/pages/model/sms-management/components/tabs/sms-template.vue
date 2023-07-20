<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\tabs\sms-template.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:07:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-20 11:05:34
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { Notification, MessageBox } from "element-ui";
import { SMS_Obtain, SMS_Server } from "../../server/sms-template";
import { Del_Server, Del_Obtain } from "../../server/sms-template/del";

const popup = usePopup();
const popupEntity = popup.define({
    width: "40%",
    height: "40vh",
    template: defineComponent(() => import("../../dialog/dialog-sms-template.vue")),
    afterClose: executeQuery,
});

const { loading } = SMS_Server.server;
const tableData = computed(() => transArray(unref(SMS_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "minthreshold",
        label: "最小阈值",
        align: "center",
        width: 70,
    },
    {
        prop: "maxthreshold",
        label: "最大阈值",
        align: "center",
        width: 70,
    },
    {
        prop: "content",
        label: "短信内容",
        align: "center",
    },
];

function handleAdd() {
    popupEntity.setupTitle("新增");
    popupEntity.show({});
}
function handleEdit(rows) {
    popupEntity.setupTitle("修改");
    popupEntity.show(rows);
}

async function handleDel({ tempid }) {
    if (!tempid) return;
    const message = await MessageBox.confirm("操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).catch((err) => err);

    if ("confirm" === message) {
        const data = await Del_Obtain({ tempid });
        if (data.code === 200) {
            Notification.success({
                title: "成功!",
                message: "删除成功!",
            });
            executeQuery();
        } else {
            Notification.error({
                title: "错误!",
                message: data.msg,
            });
        }
    }
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
    <el-table class="sms-template" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" width="100%"
        height="100%">
        <el-table-column type="index" width="60" align="center">
            <template slot="header" slot-scope="scope">
                <el-link type="success" @click="handleAdd">新增</el-link>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
                <el-link type="warning" @click="handleEdit(scope.row)">修改</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="danger" @click="handleDel(scope.row)">删除</el-link>
            </template>
        </el-table-column>
        <template v-for="item in tableColumn">
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align">
            </el-table-column>
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
