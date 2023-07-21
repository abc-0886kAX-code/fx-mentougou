<!--
 * @FilePath: \fx-mentougou\src\pages\model\device-management\components\device-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:55:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 15:41:13
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { Notification, MessageBox } from "element-ui";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { DeviceManage_Obtain, DeviceManage_Server } from "../server/device-management";
import { Del_Server, Del_Obtain } from "../server/device-management/del";

const popup = usePopup();
const popupEntity = popup.define({
    width: "60%",
    // height: "60",
    template: defineComponent(() => import("../dialog/dialog-device-management.vue")),
    afterClose: executeQuery,
});

const { loading } = DeviceManage_Server.server;
const tableData = computed(() => transArray(unref(DeviceManage_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "devicename",
        label: "设备名称",
        align: "center",
    },
    {
        prop: "devicetype",
        label: "设备类型",
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
    await DeviceManage_Obtain();
}
onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="device-management-default" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData"
        width="100%" height="100%">
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
.device-management-default {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
