<!--
 * @FilePath: \fx-mentougou\src\pages\Debug\debug.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 10:21:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 13:55:17
 * @Description:
-->
<script setup>
import { toGeoJSON } from "shp-geojson";

toGeoJSON("https://mhsw.ytxd.com.cn:8081/mh/file/historical.zip").then((geojson) => {
    console.log(geojson);
});
</script>

<template>
    <div class="debug"></div>
</template>

<style scoped lang="scss">
.debug {
    width: 100%;
    height: 100%;
}
</style>
