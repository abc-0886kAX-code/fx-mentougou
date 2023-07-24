<!--
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\dialog\dialog-real-time-monitor.vue
 * @Author: zhangxin
 * @Date: 2023-07-24 14:02:26
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-24 14:06:21
 * @Description:
-->
<script setup>
import DataOverview from '@/pages/model/data-overview/dialog/tabs/data-overview.vue';
const props = defineProps({
    popupKeyword: String,
});
</script>

<template>
    <div class="dialog-real-time-monitor">
        <DataOverview :popupKeyword="props.popupKeyword"></DataOverview>
    </div>
</template>

<style scoped lang='scss'>
.dialog-real-time-monitor {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
}
</style>
