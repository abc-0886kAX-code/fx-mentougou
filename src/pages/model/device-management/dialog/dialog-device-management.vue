<!--
 * @FilePath: \fx-mentougou\src\pages\model\device-management\dialog\dialog-device-management.vue
 * @Author: zhangxin
 * @Date: 2023-04-26 17:31:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-27 15:13:46
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
    type: "",
    id: "",
    model: "",
    specs: "",
    price: 0,
    mill: "",
    supplier: "",
    director: "",
    phone: "",
    buyTime: "",
    activationTime: "",
    service: "",
    scrap: "",
    depreciation: "",
    amount: 0,
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
    activationTime: [
        {
            required: true,
            message: "启用时间不可为空",
            trigger: "change",
        },
    ],
    service: [
        {
            required: true,
            message: "保养周期不可为空",
            trigger: "blur",
        },
    ],
    scrap: [
        {
            required: true,
            message: "报废周期不可为空",
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
    form.type = get(body, "type", "");
    form.id = get(body, "id", "");
    form.model = get(body, "model", "");
    form.specs = get(body, "specs", "");
    form.price = get(body, "price", 0);
    form.mill = get(body, "mill", "");
    form.supplier = get(body, "supplier", "");
    form.director = get(body, "director", "");
    form.phone = get(body, "phone", "");
    form.buyTime = get(body, "buyTime", "");
    form.activationTime = get(body, "activationTime", "");
    form.service = get(body, "service", "");
    form.scrap = get(body, "scrap", "");
    form.depreciation = get(body, "depreciation", "");
    form.amount = get(body, "amount", 0);
}

onMounted(() => {
    tomapper(unref(config));
});
</script>

<template>
    <el-form class="dialog-device-management" ref="ModifyForm" :model="form" :rules="rules" size="mini" label-position="left" label-width="115px">
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
                <el-form-item label="设备型号"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备型号" v-model="form.model"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="type" label="设备类型">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备类型" v-model="form.type"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item label="设备规格"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入设备规格" v-model="form.specs"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="设备单价(元)">
                    <el-input-number v-model.number="form.price" controls-position="right"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item label="生产厂家"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入生产厂家" v-model="form.mill"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="供应商">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入供应商" v-model="form.supplier"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item label="负责人"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入负责人" v-model="form.director"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="联系电话">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入联系电话" v-model="form.phone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="购买时间">
                    <el-date-picker v-model="form.buyTime" type="datetime" placeholder="请选择购买时间"> </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="activationTime" label="启用时间">
                    <el-date-picker v-model="form.activationTime" type="datetime" placeholder="请选择启用时间"> </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item prop="service" label="保养周期(月）"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入保养周期" v-model="form.service"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item prop="scrap" label="报废周期(年)">
                    <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入报废周期" v-model="form.scrap"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                ><el-form-item label="折旧年限(年)"> <el-input type="text" prefix-icon="el-icon-edit" placeholder="请输入折旧年限" v-model="form.depreciation"></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="设备数量">
                    <el-input-number v-model.number="form.amount" controls-position="right"></el-input-number>
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
