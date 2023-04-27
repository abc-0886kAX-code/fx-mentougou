<!--
 * @FilePath: \fx-mentougou\src\pages\model\device-management\dialog\dialog-device-management.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:31:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 14:23:43
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
const form = ref({
    name: "",
    type: "",
    id: "",
});

const rules = {
    id: [
        {
            required: true,
            message: "设备编码不可为空",
            trigger: "blur",
        },
    ],
    name: [
        {
            required: true,
            message: "设备名称不可为空",
            trigger: "blur",
        },
    ],
    type: [
        {
            required: true,
            message: "设备类型不可为空",
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

onMounted(() => {
    if (isEmptyObject(unref(config))) return;
    form.value = unref(config);
});
</script>

<template>
    <el-form class="dialog-device-management" ref="ModifyForm" :model="form" :rules="rules" size="mini" label-position="left">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="name" label="设备编码"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备编码" v-model="form.id"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item prop="name" label="设备编码"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备编码" v-model="form.id"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="name" label="设备名称"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备名称" v-model="form.name"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item class="dialog-device-management-console">
            <el-button class="dialog-device-management-console-button" type="primary" size="mini" :loading="loading" @click="onModify">保存信息</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.dialog-device-management {
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
