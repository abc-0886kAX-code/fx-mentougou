<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-overview.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 14:59:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-17 13:28:18
 * @Description:
-->
<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const LEDLabel = "前方积水200米,注意安全!";
const LEDStyle = computed(() => {
    return {
        width: `calc(100% + ${LEDLabel.length * 41}px)`,
    };
});
</script>

<template>
    <div class="data-overview">
        <div class="data-overview-info">
            <el-descriptions title="信息展示" :column="1" border class="data-overview-info-pond">
                <el-descriptions-item label="当前积水水位" :labelStyle="{ background: '#FDE2E2', color: '#000' }" :contentStyle="{ 'text-align': 'center' }">{{ config.z }}米</el-descriptions-item>
                <el-descriptions-item label="雨量数据" :labelStyle="{ background: '#FDE2E2', color: '#000' }" :contentStyle="{ 'text-align': 'center' }">XXX雨量站 12mm</el-descriptions-item>
            </el-descriptions>

            <el-card class="data-overview-info-led" :body-style="{ padding: '0px' }" shadow="always">
                <div class="data-overview-info-led-content">
                    <div class="data-overview-info-led-content-animation" :style="LEDStyle">{{ LEDLabel }}</div>
                </div>
                <div class="data-overview-info-led-text">
                    <span>{{ LEDLabel }}</span>
                </div>
            </el-card>
        </div>
        <div class="data-overview-video">
            <el-card class="data-overview-video-item" :body-style="{ padding: '0px' }" shadow="always">
                <div class="data-overview-video-item-content">
                    <video src="/mp4/login-video.mp4" type="video/mp4" controls autoplay loop muted />
                </div>
                <div class="data-overview-video-item-text">
                    <span>摄像头说明</span>
                    <div class="data-overview-video-item-text-details">东向西</div>
                </div>
            </el-card>
            <el-card class="data-overview-video-item" :body-style="{ padding: '0px' }" shadow="always">
                <div class="data-overview-video-item-content">
                    <video src="/mp4/header-video.mp4" type="video/mp4" controls autoplay loop muted />
                </div>

                <div class="data-overview-video-item-text">
                    <span>摄像头说明</span>
                    <div class="data-overview-video-item-text-details">南向北</div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.data-overview {
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
        align-items: center;
        justify-content: space-evenly;
        font-size: 18px;
        &-pond,
        &-led {
            width: 100%;
            height: 47%;
            color: #fff;
            &-content {
                height: calc(80% - 10px);
                color: #ff0000;
                text-decoration: none;
                border: 5px ridge #999;
                background-color: #222;
                padding-top: 8px;
                padding-right: 5px;
                padding-left: 5px;
                &-animation {
                    font-weight: bold;
                    font-size: 40px;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    margin-left: 100%;
                    animation: myMove 15s linear infinite;
                    animation-fill-mode: forwards;
                }
            }
            &-text {
                color: #000;
                height: 20%;
                padding: 12px;
                box-sizing: border-box;
            }
        }
    }
    &-video {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        &-item {
            width: 100%;
            height: 47%;
            &-content {
                height: 80%;
            }
            &-text {
                height: 20%;
                padding: 6px;
                box-sizing: border-box;
                &-details {
                    padding: 6px;
                    box-sizing: border-box;
                    font-size: 13px;
                    color: #999;
                }
            }
        }
    }
}
video {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
:deep(.el-card__body) {
    height: 100%;
}
:deep(.el-descriptions__header) {
    width: 100%;
    height: 20%;
    margin-bottom: 0px;
}
:deep(.el-descriptions__body) {
    width: 100%;
    height: 80%;
}

@keyframes myMove {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
