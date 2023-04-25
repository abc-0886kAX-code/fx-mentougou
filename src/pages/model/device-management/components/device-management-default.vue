<!--
 * @FilePath: \fx-mentougou\src\pages\model\device-management\components\device-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:55:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-25 17:47:10
 * @Description:
-->
<script setup>
import EmptyView from "@/components/EmptyView.vue";
</script>

<template>
    <div class="device-management-default">
        <EmptyView class="device-management-default-empty" desc="开发中..."></EmptyView>
    </div>
</template>

<style scoped lang="scss">
.device-management-default {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-empty {
        width: 100%;
        height: 100%;
        scale: 90%;
    }
}
</style>
