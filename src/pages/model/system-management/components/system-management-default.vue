<!--
 * @FilePath: \fx-mentougou\src\pages\model\system-management\components\system-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:56:23
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-25 17:48:12
 * @Description:
-->
<script setup>
import EmptyView from "@/components/EmptyView.vue";
</script>

<template>
    <div class="system-management-default">
        <EmptyView class="system-management-default-empty" desc="开发中..."></EmptyView>
    </div>
</template>

<style scoped lang="scss">
.system-management-default {
    width: 100%;
    height: 100%;
    &-empty {
        width: 100%;
        height: 100%;
        scale: 90%;
    }
}
</style>
