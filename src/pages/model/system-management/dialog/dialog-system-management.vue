<!--
 * @FilePath: \fx-mentougou\src\pages\model\system-management\dialog\dialog-system-management.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:31:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 10:08:36
 * @Description:
-->
<script setup>
import { isEmptyObject } from "~/shared/is";
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { Modify_Server, Modify_Obtain } from "../server/device-management/modify";
import { Notification } from "element-ui";
const props = defineProps({
    popupKeyword: String,
});
const { loading } = Modify_Server.server;
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const ModifyForm = ref();
const form = reactive({
    name: "",
    username: "",
    id: "",
    role: "",
    remark: "",
});

const rules = {
    name: [
        {
            required: true,
            message: "人员姓名不可为空",
            trigger: "blur",
        },
    ],
    username: [
        {
            required: true,
            message: "登录账号不可为空",
            trigger: "blur",
        },
    ],
    role: [
        {
            required: true,
            message: "角色不可为空",
            trigger: "blur",
        },
    ],
};

function onModify() {
    unref(ModifyForm).validate(async (valid) => {
        if (!valid) return;
        const data = await Modify_Obtain(unref(form));
        if (data.code === 200) {
            Notification.success({
                title: "成功!",
                message: "保存成功!",
            });
            dialog.destroy();
        } else {
            Notification.error({
                title: "错误!",
                message: data.msg,
            });
        }
    });
}

function tomapper(body) {
    form.name = get(body, "name", "");
    form.username = get(body, "username", "");
    form.id = get(body, "id", "");
    form.role = get(body, "role", "");
    form.remark = get(body, "remark", "");
}

onMounted(() => {
    tomapper(unref(config));
});
</script>

<template>
    <el-form class="dialog-system-management" ref="ModifyForm" :model="form" :rules="rules" size="mini" label-position="left" label-width="80px">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="name" label="人员姓名"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入人员姓名" v-model="form.name"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
                ><el-form-item prop="username" label="登录账号"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入登录账号" v-model="form.username"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item prop="role" label="角色"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入角色" v-model="form.role"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" prefix-icon="el-icon-edit" placeholder="请输入备注" v-model="form.remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item class="dialog-system-management-console">
            <el-button class="dialog-system-management-console-button" type="primary" size="mini" :loading="loading" @click="onModify">保存信息</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.dialog-system-management {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &-console {
        margin: 15px auto;
        height: 100%;
        &-button {
            width: 80px;
        }
    }
}
:deep(.el-form-item__label) {
    color: #fff;
}
</style>
