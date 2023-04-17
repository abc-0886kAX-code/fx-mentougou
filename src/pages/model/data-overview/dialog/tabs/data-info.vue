<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-info.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 15:00:46
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-17 17:41:11
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

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
        field: "stlc",
        label: "地址",
        value: "",
    },
    {
        field: "tm",
        label: "时间",
        value: "",
    },
]);
function executeQuery() {
    caption.value.forEach((item) => {
        item.handler ? (item.value = item.handler(unref(config)[item.field])) : (item.value = unref(config)[item.field]);

        return item;
    });
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-info biz-info">
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
