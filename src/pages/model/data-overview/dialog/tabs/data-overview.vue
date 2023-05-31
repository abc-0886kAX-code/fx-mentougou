<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-overview.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 14:59:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-31 17:31:54
 * @Description:
-->
<script setup>
import VideoUrl from "@/components/VideoUrl.vue";

import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { loadStyle } from "@/biz/share/entify/Load";
import { SiteInfo_Obtain, SiteInfo_Server } from "../../server/info";
import { transObject } from "~/shared/trans";
const props = defineProps({
    popupKeyword: String,
});
const { loading } = SiteInfo_Server.server;
const source = computed(() => {
    return transObject(unref(SiteInfo_Server.server.result.source).data, {
        z: "",
        rainname: "",
        r: "",
        showmsg: "",
        videoinfo: [],
        color: "rgba(255, 0, 0, 1)"
    });
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));
const params = computed(() => {
    return {
        stcd: unref(config).stcd,
        stnm: unref(config).stnm,
    };
});
const LEDStyle = computed(() => {
    return {
        width: `calc(100% + ${unref(source).showmsg?.length ?? 0 * 41}px)`,
        color: unref(source).color ?? 'rgba(255, 0, 0, 1)'
    };
});

async function executeQuery() {
    await SiteInfo_Obtain(unref(params));
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-overview" v-loading="loading" v-bind="loadStyle">
        <div class="data-overview-info">
            <el-descriptions title="信息展示" :column="1" border class="data-overview-info-pond">
                <el-descriptions-item label="当前积水水位" :labelStyle="{ background: '#FDE2E2', color: '#000' }"
                    :contentStyle="{ 'text-align': 'center' }">{{ source.z ?? "暂无数据" }}</el-descriptions-item>
                <el-descriptions-item label="雨量数据" :labelStyle="{ background: '#FDE2E2', color: '#000' }"
                    :contentStyle="{ 'text-align': 'center' }">{{ source.rainname }} - {{ source.r ?? "暂无数据"
                    }}</el-descriptions-item>
            </el-descriptions>

            <el-card class="data-overview-info-led" :body-style="{ padding: '0px' }" shadow="always">
                <div class="data-overview-info-led-content">
                    <div class="data-overview-info-led-content-animation" :style="LEDStyle">{{ source.showmsg ?? "暂无信息" }}
                    </div>
                </div>
                <div class="data-overview-info-led-text">
                    <span>{{ source.showmsg ?? "暂无信息" }}</span>
                </div>
            </el-card>
        </div>
        <div class="data-overview-video">
            <template v-for="item in source.videoinfo">
                <el-card class="data-overview-video-item" :key="item.stcd" :body-style="{ padding: '0px' }" shadow="always">
                    <div class="data-overview-video-item-content">
                        <!-- <video :src="item.videopath" type="video/mp4" controls autoplay loop muted /> -->
                        <VideoUrl fit="unset" :url="item.videopath"> </VideoUrl>
                    </div>
                    <div class="data-overview-video-item-text">
                        <span>摄像头说明</span>
                        <div class="data-overview-video-item-text-details">{{ item.introduce }}</div>
                    </div>
                </el-card>
            </template>
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
}</style>
