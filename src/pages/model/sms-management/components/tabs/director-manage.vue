<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\tabs\director-manage.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:07:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-12 17:38:27
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { Notification, MessageBox } from "element-ui";
import { DirectorManage_Obtain, DirectorManage_Server } from "../../server/director-manage";
import { Select_Obtain, Select_Server } from "../../server/director-manage/select";
import { Del_Server, Del_Obtain } from "../../server/director-manage/del";

const popup = usePopup();
const popupEntity = popup.define({
    width: "40%",
    height: "50vh",
    template: defineComponent(() => import("../../dialog/dialog-director-manage.vue")),
    afterClose: executeQuery,
});

const { loading } = DirectorManage_Server.server;
const table = ref(null);
const tableData = computed(() => transArray(unref(DirectorManage_Server.server.result.source).data, []));
const tableColumn = [
    {
        prop: "username",
        label: "负责人姓名",
        align: "center",
    },
    {
        prop: "telephone",
        label: "负责人手机号",
        align: "center",
    },
    {
        prop: "company",
        label: "单位",
        align: "center",
    },
    {
        prop: "dutytype",
        label: "负责类型",
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
// TODO:选中某行
async function handleSelectionChange(selectRows) {
    const selcetIds = selectRows.map((item) => item.id).join(",");
    const data = await Select_Obtain({ ids: selcetIds });
    if (data.code === 200) {
        Notification.success({
            title: "成功!",
            message: "绑定成功!",
        });
    } else {
        Notification.error({
            title: "错误!",
            message: data.msg,
        });
    }
}
// TODO:控制是否可以勾选
function handleSelectable(row, index) {
    return true;
}

async function executeQuery() {
    await DirectorManage_Obtain();
    // 01 选中 00 未选中
    unref(tableData).map((item) => {
        item.ischeck === "01" ? unref(table).toggleRowSelection(item, true) : unref(table).toggleRowSelection(item, false);
    });
}
onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="director-manage" ref="table" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" width="100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="handleSelectable" width="55"> </el-table-column>
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
.director-manage {
    width: 100%;
    height: 100%;
    // overflow-y: auto;
    overflow: hidden;
}
</style>
