<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\dialog\dialog-info-template.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:31:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 16:51:16
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { Modify_Server, Modify_Obtain } from "../server/info-template/modify";
import { Notification } from "element-ui";
const props = defineProps({
    popupKeyword: String,
});
const { loading } = Modify_Server.server;
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const ModifyForm = ref();
const form = ref({
    threshold: "",
    waringinfo: "",
    color: "",
    id: "",
});

const rules = {
    threshold: [
        {
            required: true,
            message: "阈值不可为空",
            trigger: "blur",
        },
    ],
    waringinfo: [
        {
            required: true,
            validator: checkWarnInfo,
            message: "警示信息不可为空且不能超过12个全角字符",
            trigger: "change",
        },
    ],
    color: [
        {
            required: true,
            message: "颜色不可为空",
            trigger: "blur",
        },
    ],
};

function checkWarnInfo(rule, value, callback) {
    const reg = /[^\u4e00-\u9fa5]/g;
    if (value && value.length === value.replace(reg, "").length) {
        return callback();
    } else {
        callback(new Error("警示信息不可为空且不能超过12个全角字符"));
    }
}

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

onMounted(() => {
    form.value = unref(config);
});
</script>

<template>
    <el-form class="dialog-info-template" ref="ModifyForm" :model="form" :rules="rules" size="mini" label-position="top">
        <el-form-item prop="threshold" label="阈值">
            <el-input type="text" prefix-icon="el-icon-remove-outline" placeholder="请输入阈值" v-model="form.threshold"></el-input>
        </el-form-item>
        <el-form-item prop="color" label="颜色">
            <el-input type="text" prefix-icon="el-icon-s-operation" placeholder="请输入颜色" v-model="form.color"></el-input>
        </el-form-item>
        <el-form-item prop="waringinfo" label="警示信息">
            <el-input type="text" prefix-icon="el-icon-reading" placeholder="请输入警示信息" maxlength="12" v-model="form.waringinfo"></el-input>
        </el-form-item>
        <el-form-item class="dialog-info-template-console">
            <el-button class="dialog-info-template-console-button" type="primary" size="mini" :loading="loading" @click="onModify">保存 </el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.dialog-info-template {
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
