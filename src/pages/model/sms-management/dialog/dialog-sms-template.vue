<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\dialog\dialog-sms-template.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:31:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 10:33:19
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { Modify_Server, Modify_Obtain } from "../server/sms-template/modify";
import { Notification } from "element-ui";
const props = defineProps({
    popupKeyword: String,
});
const { loading } = Modify_Server.server;
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const ModifyForm = ref();
const form = ref({
    gate: "",
    content: "",
    tempid: "",
});

const rules = {
    gate: [
        {
            required: true,
            message: "阈值不可为空",
            trigger: "blur",
        },
    ],
    content: [
        {
            required: true,
            message: "短信内容不可为空",
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
                message: "修改成功!",
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

onMounted(() => {
    form.value = unref(config);
});
</script>

<template>
    <el-form class="dialog-sms-template" ref="ModifyForm" :model="form" :rules="rules" size="mini" label-position="top">
        <el-form-item prop="gate" label="阈值">
            <el-input type="text" prefix-icon="el-icon-remove-outline" placeholder="请输入阈值" v-model="form.gate"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="短信内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" prefix-icon="el-icon-reading" placeholder="请输入短信内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item class="dialog-sms-template-console">
            <el-button class="dialog-sms-template-console-button" type="primary" size="mini" :loading="loading" @click="onModify">修改 </el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.dialog-sms-template {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &-console {
        margin: 20px auto;
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
