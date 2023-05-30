<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\dialog-shp.vue
 * @Author: zhangxin
 * @Date: 2023-05-30 14:24:33
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 14:36:10
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));
const caption = computed(() => {
    return Object.keys(unref(config)).map((item) => {
        return {
            field: item,
            label: item,
            value: unref(config)[item],
        };
    });
});

onMounted(() => {});
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
