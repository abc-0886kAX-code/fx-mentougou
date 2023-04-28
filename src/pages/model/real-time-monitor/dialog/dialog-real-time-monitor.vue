<!--
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\dialog\dialog-real-time-monitor.vue
 * @Author: zhangxin
 * @Date: 2023-04-27 17:40:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 11:22:09
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const z = 14.1;
</script>

<template>
    <div class="dialog-real-time-monitor">
        <div class="dialog-real-time-monitor-info">
            <div class="dialog-real-time-monitor-info-pond">当前积水水位:{{ z }}米</div>
            <div class="dialog-real-time-monitor-info-led">LED屏当前内容:前方积水{{ z }}米,注意安全</div>
        </div>
        <div class="dialog-real-time-monitor-video">
            <video class="dialog-real-time-monitor-video-item" src="/mp4/login-video.mp4" type="video/mp4" controls autoplay loop muted />
            <video class="dialog-real-time-monitor-video-item" src="/mp4/header-video.mp4" type="video/mp4" controls autoplay loop muted />
            <video class="dialog-real-time-monitor-video-item" src="/mp4/header-video.mp4" type="video/mp4" controls autoplay loop muted />
            <video class="dialog-real-time-monitor-video-item" src="/mp4/login-video.mp4" type="video/mp4" controls autoplay loop muted />
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog-real-time-monitor {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    &-info,
    &-video {
        height: 100%;
        width: 47%;
    }
    &-info {
        display: flex;
        flex-direction: column;
        align-items: self-end;
        justify-content: center;
        font-size: 18px;
        &-pond,
        &-led {
            width: 100%;
            height: 47%;
            color: #fff;
        }
    }
    &-video {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        &-item {
            width: 48%;
            height: 48%;
        }
    }
}
video {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>
