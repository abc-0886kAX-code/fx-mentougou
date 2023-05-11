<!--
 * @FilePath: \fx-mentougou\src\pages\model\statistical-analysis\components\statistical-analysis-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:46:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-11 09:44:06
 * @Description:
-->
<script setup>
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { SelectSite_Obtain, SelectSite_Server } from "../server";
import { useDateWater } from "@/hooks/useDate.js";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
const popup = usePopup();
const popupEntity = popup.define({
    width: "70%",
    template: defineComponent(() => import("../dialog/dialog-statistical-analysis.vue")),
    title: "统计分析",
});

const { loading } = SelectSite_Server.server;
const selcetOptions = computed(() => transArray(unref(SelectSite_Server.server.result.source).data, []));

const selectValue = ref([]);
const dateVal = ref(useDateWater());
const params = computed(() => {
    return {
        stcds: unref(selectValue).join(","),
        starttime: unref(dateVal)[0],
        endtime: unref(dateVal)[1],
    };
});

async function executeQuery() {
    await SelectSite_Obtain();
}

function executeReset() {
    dateVal.value = useDateWater();
    selectValue.value = [];
}

function openPopup() {
    popupEntity.show(unref(params));
}

onMounted(() => {
    executeQuery();
});
onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <div class="statistical-analysis-default" v-loading="loading" v-bind="loadStyle">
        <div class="statistical-analysis-default-form">
            <div class="statistical-analysis-default-form-item">
                <div class="statistical-analysis-default-form-item-label">站名:</div>
                <div class="statistical-analysis-default-form-item-plugin">
                    <el-select v-model="selectValue" size="mini" multiple collapse-tags placeholder="请选择">
                        <el-option v-for="item in selcetOptions" :key="item.stcd" :label="item.stnm" :value="item.stcd"> </el-option>
                    </el-select>
                </div>
            </div>
            <div class="statistical-analysis-default-form-item">
                <div class="statistical-analysis-default-form-item-label">时间:</div>
                <div class="statistical-analysis-default-form-item-plugin">
                    <el-date-picker v-model="dateVal" size="mini" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </div>
            </div>
            <div class="statistical-analysis-default-form-item">
                <el-button size="mini" type="primary" @click="openPopup">查询</el-button>
                <el-button size="mini" type="danger" @click="executeReset">重置</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.statistical-analysis-default {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-form {
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        &-item {
            width: 100%;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            &-label {
                width: 20%;
                height: 100%;
                text-align: center;
            }
            &-plugin {
                width: 80%;
                height: 100%;
            }
        }
    }
}
:deep(.el-date-editor) {
    width: 100% !important;
}
</style>
