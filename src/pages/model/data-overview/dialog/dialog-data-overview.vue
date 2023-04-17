<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\dialog-data-overview.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 14:31:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-17 14:45:04
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));
</script>

<template>
    <div>{{ config }}</div>
</template>

<style scoped lang="scss">
.dialog-data-overview {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
