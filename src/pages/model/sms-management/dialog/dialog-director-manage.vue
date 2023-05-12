<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\dialog\dialog-director-manage.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:31:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-12 17:42:43
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { Modify_Server, Modify_Obtain } from "../server/director-manage/modify";
import { Notification } from "element-ui";
const props = defineProps({
    popupKeyword: String,
});
const { loading } = Modify_Server.server;
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const ModifyForm = ref();
const form = ref({
    username: "",
    company: "",
    telephone: "",
    dutytype: "",
    id: "",
});

const rules = {
    username: [
        {
            required: true,
            message: "负责人姓名不可为空",
            trigger: "blur",
        },
    ],
    telephone: [
        {
            required: true,
            message: "负责人手机号不可为空",
            trigger: "blur",
        },
    ],
    company: [
        {
            required: true,
            message: "单位不可为空",
            trigger: "blur",
        },
    ],
    dutytype: [
        {
            required: true,
            message: "负责类型不可为空",
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
    <el-form class="dialog-director-manage" ref="ModifyForm" :model="form" :rules="rules" size="mini" label-position="top">
        <el-form-item prop="username" label="负责人姓名">
            <el-input type="text" prefix-icon="el-icon-remove-outline" placeholder="请输入负责人姓名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="telephone" label="负责人手机号">
            <el-input class="numrule" type="number" prefix-icon="el-icon-phone-outline" placeholder="请输入负责人手机号" v-model.number="form.telephone" :max="11"></el-input>
        </el-form-item>
        <el-form-item prop="company" label="单位">
            <el-input type="text" prefix-icon="el-icon-office-building" placeholder="请输入单位" v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item prop="dutytype" label="负责类型">
            <el-input type="text" prefix-icon="el-icon-connection" placeholder="请输入负责类型" v-model="form.dutytype"></el-input>
        </el-form-item>
        <el-form-item class="dialog-director-manage-console">
            <el-button class="dialog-director-manage-console-button" type="primary" size="mini" :loading="loading" @click="onModify">保存 </el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.dialog-director-manage {
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
.numrule {
    :deep(input::-webkit-outer-spin-button) {
        -webkit-appearance: none !important;
    }
    :deep(input::-webkit-inner-spin-button) {
        -webkit-appearance: none !important;
    }
    :deep(input[type="number"]) {
        -moz-appearance: textfield;
    }
}
</style>
