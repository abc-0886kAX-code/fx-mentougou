<!--
 * @FilePath: \fx-mentougou\src\pages\model\device-management\components\device-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:55:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 14:22:54
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { Notification } from "element-ui";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { DeviceManage_Obtain, DeviceManage_Server } from "../server/device-management";
import { Del_Server, Del_Obtain } from "../server/device-management/del";

const popup = usePopup();
const popupEntity = popup.define({
    width: "60%",
    height: "80vh",
    template: defineComponent(() => import("../dialog/dialog-device-management.vue")),
    afterClose: executeQuery,
});

const { loading } = DeviceManage_Server.server;
const tableData = computed(() => transArray(unref(DeviceManage_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "id",
        label: "设备编号",
        align: "center",
    },
    {
        prop: "name",
        label: "设备名称",
        align: "center",
    },
    {
        prop: "type",
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

    // 删除操作
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
    <div class="device-management-default">
        <div class="device-management-default-head">
            <el-button class="device-management-default-head-item" size="mini" plain icon="" type="primary" @click="handleAdd">新增设备</el-button>
        </div>
        <el-table class="device-management-default-body" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
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
    </div>
</template>

<style scoped lang="scss">
.device-management-default {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-head {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        &-item {
            width: 200px;
            height: 30px;
        }
    }
    &-body {
        height: calc(100% - 40px);
        width: 100%;
        overflow-y: auto;
    }
}
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    width: 6px;
    background: rgba(#98d9ff, 0.1);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(#98d9ff, 0.5);
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(#98d9ff, 1);
}
</style>
