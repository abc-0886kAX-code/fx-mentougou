<!--
 * @FilePath: \fx-mentougou\src\pages\model\system-management\components\system-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:55:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 10:07:45
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { Notification, MessageBox } from "element-ui";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { SystemManage_Obtain, SystemManage_Server } from "../server/device-management";
import { Del_Server, Del_Obtain } from "../server/device-management/del";

const popup = usePopup();
const popupEntity = popup.define({
    width: "40%",
    height: "30vh",
    template: defineComponent(() => import("../dialog/dialog-system-management.vue")),
    afterClose: executeQuery,
});

const { loading } = SystemManage_Server.server;
const tableData = computed(() => transArray(unref(SystemManage_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "name",
        label: "人员姓名",
        align: "center",
    },
    {
        prop: "username",
        label: "登录账号",
        align: "center",
    },
    {
        prop: "role",
        label: "角色",
        align: "center",
    },
    {
        prop: "remark",
        label: "备注",
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
async function handleDel({ id }) {
    if (!id) return;
    const message = await MessageBox.confirm("操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).catch((err) => err);

    if ("confirm" === message) {
        const data = await Del_Obtain({ id });
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
    await SystemManage_Obtain();
}
onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="system-management-default" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData">
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
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
        </template>
    </el-table>
</template>

<style scoped lang="scss">
.system-management-default {
    width: 100%;
    height: 100%;
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
}
</style>
