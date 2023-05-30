<!--
 * @FilePath: \fx-mentougou\src\pages\Debug\debug.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 10:21:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-30 10:25:51
 * @Description:
-->
<script setup>
import { Upload_Obtain, Upload_Server } from "./server";
const fileList = ref([]);
function handlePreview(file) {
    console.log(file);
}
function handleRemove(file, fileList) {
    console.log(file, fileList);
}
function beforeRemove(file, fileList) {
    console.log(file, fileList);
}
function handleExceed(files, fileList) {
    console.log(files, fileList);
}
async function httpRequest(request) {
    const data = { path: request.file };
    await Upload_Obtain(data);
}
</script>

<template>
    <div class="debug">
        <el-upload class="upload-demo" action="" :http-request="httpRequest" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<style scoped lang="scss">
.debug {
    width: 100%;
    height: 100%;
}
</style>
