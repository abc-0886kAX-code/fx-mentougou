<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\sms-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:54:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-25 17:44:26
 * @Description:
-->
<script setup>
import EmptyView from "@/components/EmptyView.vue";
</script>

<template>
    <div class="sms-management-default">
        <EmptyView class="sms-management-default-empty" desc="开发中..."></EmptyView>
    </div>
</template>

<style scoped lang="scss">
.sms-management-default {
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
