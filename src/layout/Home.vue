<!--
 * @FilePath: \fx-mentougou\src\layout\Home.vue
 * @Author: zhangxin
 * @Date: 2023-04-12 13:14:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 11:14:36
 * @Description:
-->
<script setup>
import Weather from "@/components/weather/weather.vue";
import UserController from "@/components/logout/user-controller.vue";
</script>

<template>
    <el-container class="home">
        <!-- 视频背景 -->
        <video id="v1" autoplay loop muted>
            <source src="/mp4/header-video.mp4" type="video/mp4" />
        </video>
        <el-header class="home-header">
            <div class="home-header-weather">
                <Weather></Weather>
            </div>
            <UserController></UserController>
        </el-header>

        <el-container class="home-main">
            <el-main class="home-main-content">
                <transition name="el-fade-in-linear">
                    <router-view />
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
$bgAlpha: 0.8;
$color: #023e81;
$bg: rgba(2, 62, 129, $alpha: 0.7);
$shadow: rgba(
    $color: $color,
    $alpha: 0.3,
);
.home {
    background-color: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-header {
        display: flex;
        justify-content: space-between;
        z-index: 1;
        background: url("@/assets/images/logo.png") no-repeat;
        background-size: cover;
        &-weather {
            height: 100%;
        }
        img {
            width: 400px;
            height: 30px;
            font-size: 0;
            overflow: hidden;
            margin-top: 15px;
        }
    }
    &-main {
        position: relative;
        z-index: 1;
        width: 100%;
        height: calc(100% - 80px);
        overflow: hidden;
        box-sizing: border-box;
        &-content {
            width: 100%;
            height: 100%;
            padding: 0 !important;
        }
    }
}

video {
    position: fixed;
    right: 0px;
    top: 0px;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
    z-index: 0;
}
</style>
