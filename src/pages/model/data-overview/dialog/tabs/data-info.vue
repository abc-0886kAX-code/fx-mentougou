<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-info.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 15:00:46
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-11 14:26:26
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { Details_Server, Details_Obtain } from "../../server/details";
import { transObject } from "~/shared/trans";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const { loading } = Details_Server.server;
const Info = computed(() => transObject(unref(Details_Server.server.result.source).data, {}));

const caption = ref([
    {
        field: "stcd",
        label: "编码",
        value: "",
    },
    {
        field: "stnm",
        label: "名字",
        value: "",
    },
    {
        field: "lgtd",
        label: "经度",
        value: "",
    },
    {
        field: "lttd",
        label: "纬度",
        value: "",
    },
    {
        field: "addvcdname",
        label: "行政区",
        value: "",
    },
    {
        field: "sttpname",
        label: "站点类型",
        value: "",
    },
]);
async function executeQuery() {
    await Details_Obtain({ stcd: unref(config).stcd });
    caption.value.forEach((item) => {
        item.handler ? (item.value = item.handler(unref(Info)[item.field])) : (item.value = unref(Info)[item.field]);

        return item;
    });
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-info biz-info" v-loading="loading">
        <div class="introduce-box" v-for="(item, index) in caption" :key="index">
            <h4>{{ item.label }}</h4>
            <p>{{ item.value }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/dialog-info.scss";
.data-info {
    width: 100%;
    height: 100%;
}
</style>
