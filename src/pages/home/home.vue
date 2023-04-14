<!--
 * @FilePath: \fx-mentougou\src\pages\home\home.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 10:58:06
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 11:04:52
 * @Description:
-->
<script setup>
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
const layers = [];
const config = setupMars3DConfig(3);
function handlerMapReady(mapview) {}
</script>

<template>
    <mars3d-container class="home" :config="config" :layers="layers" @onReady="handlerMapReady"> </mars3d-container>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
