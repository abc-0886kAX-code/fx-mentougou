<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\tabs\info-template.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:07:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-20 10:44:30
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { Notification, MessageBox } from "element-ui";
import { InfoTemplate_Obtain, InfoTemplate_Server } from "../../server/info-template";
import { Del_Obtain } from "../../server/info-template/del";

const popup = usePopup();
const popupEntity = popup.define({
    width: "40%",
    height: "50vh",
    template: defineComponent(() => import("../../dialog/dialog-info-template.vue")),
    afterClose: executeQuery,
});

const { loading } = InfoTemplate_Server.server;
const tableData = computed(() => transArray(unref(InfoTemplate_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "minthreshold",
        label: "最小阈值",
        align: "center",
        width: 80,
    },
    {
        prop: "maxthreshold",
        label: "最大阈值",
        align: "center",
        width: 80,
    },
    {
        prop: "color",
        label: "颜色",
        align: "center",
        width: 80
    },
    {
        prop: "waringinfo",
        label: "警示信息",
        align: "center",
        width: 110,
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
    await InfoTemplate_Obtain();
}
onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="info-template" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" width="100%"
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
        <template v-for="item in       tableColumn      ">
            <template v-if="item.prop === 'color'">
                <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :align="item.align">
                    <template slot-scope="scope">
                        <div
                            :style="{ width: '15px', height: '15px', backgroundColor: scope.row.color, textAlign: 'center' }">
                        </div>
                    </template>
                </el-table-column>
            </template>
            <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                :align="item.align"> </el-table-column>
        </template>
    </el-table>
</template>

<style scoped lang="scss">
.info-template {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
