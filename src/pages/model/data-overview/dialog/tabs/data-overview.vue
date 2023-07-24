<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-overview.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 14:59:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-24 14:09:48
 * @Description:
-->
<script setup>
import VideoUrl from "@/components/VideoUrl.vue";
import EmptyView from "@/components/EmptyView.vue";

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
        width: `calc(100% + ${unref(source).showmsg?.length * 46 ?? 0 * 46}px)`,
        color: unref(source).color ?? 'rgba(255, 0, 0, 1)'
    };
});
const videoContentStyle = computed(() => {
    if (unref(source).videoinfo.length > 2) {
        return {
            overflowY: 'auto'
        }
    }
    return {}
})
function videoItemStyle(index) {
    const length = unref(source).videoinfo?.length ?? 0;
    if (length === 1 || (index === length - 1 && length % 2 !== 0)) {
        return {
            width: "100%",
        }
    }
    return {
        width: "48%",
    }
}

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
            <div class="data-overview-info-label">信息展示区域</div>
            <div class="data-overview-info-content">
                <div class="data-overview-info-content-info">
                    <div class="data-overview-info-content-info-item">
                        <div class="data-overview-info-content-info-item-label">
                            积水数据
                        </div>
                        <div class="data-overview-info-content-info-item-text">
                            当前积水水位 - {{ source.z ?? "暂无数据" }}
                        </div>
                    </div>
                    <div class="data-overview-info-content-info-item">
                        <div class="data-overview-info-content-info-item-label">
                            雨量数据
                        </div>
                        <div class="data-overview-info-content-info-item-text">
                            {{ source.rainname ?? '未知站点' }} - {{ source.r ?? "暂无数据" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="data-overview-led">
            <div class="data-overview-led-label">LED展示区域</div>
            <div class="data-overview-led-content">
                <div class="data-overview-led-content-led">
                    <div class="data-overview-led-content-led-animation" :style="LEDStyle">{{ source.showmsg ?? "暂无信息"
                    }}
                    </div>
                </div>
            </div>
        </div>
        <div class="data-overview-video">
            <div class="data-overview-video-label">
                视频监控展示区域
            </div>
            <div class="data-overview-video-content" :style="videoContentStyle" v-if="source.videoinfo.length > 0">
                <template v-for="(item, index) in source.videoinfo">
                    <el-card class="data-overview-video-content-item" :style="videoItemStyle(index)" :key="index"
                        :body-style="{ padding: '0px' }" shadow="always">
                        <div class="data-overview-video-content-item-video">
                            <VideoUrl fit="unset" :url="item.videopath"> </VideoUrl>
                        </div>
                        <div class="data-overview-video-content-item-text">
                            <span>摄像头说明</span>
                            <div class="data-overview-video-item-text-details">{{ item.introduce }}</div>
                        </div>
                    </el-card>
                </template>
            </div>
            <EmptyView class="data-overview-video-content" v-else></EmptyView>

        </div>
    </div>
</template>

<style scoped lang="scss">
.data-overview {
    width: 100%;
    height: 100%;
    // background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    &-info,
    &-led {
        width: calc(50% - 10px);
        height: calc(40% - 10px);
        background-color: transparent;
        border: 2px solid rgba(92, 255, 255, .1);
        background:
            linear-gradient(to bottom, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left top no-repeat,
            linear-gradient(to right, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left top no-repeat,
            linear-gradient(to bottom, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right top no-repeat,
            linear-gradient(to left, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right top no-repeat,
            linear-gradient(to top, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left bottom no-repeat,
            linear-gradient(to right, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left bottom no-repeat,
            linear-gradient(to top, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right bottom no-repeat,
            linear-gradient(to left, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right bottom no-repeat;
        background-size: 1.5px 1.5rem;
        padding: 2px;
        position: relative;

        &-label {
            font-family: "YunHei";
            position: absolute;
            top: -16px;
            font-size: 24px;
            height: 24px;
            font-weight: bold;
            text-align: center;
            width: 100%;
            letter-spacing: 2px;
            color: #05d4f8;
        }

        &-content {
            padding-top: 24px;
            height: calc(100% - 24px);
            width: 100%;
            color: #fff;
            overflow: hidden;

            &-info {
                width: 100%;
                height: 100%;
                display: flex;
                text-align: center;

                &-item {
                    height: 100%;
                    width: 100%;

                    &-label {
                        font-size: 18px;
                        letter-spacing: 2px;
                        color: #409eff;
                        padding-bottom: 20px;
                    }


                    &-text {
                        font-size: 16px;
                        font-weight: bold;
                        color: #fff;
                    }
                }
            }

            &-led {
                height: calc(100% - 10px);
                text-decoration: none;
                border: 5px ridge #999;
                background-color: #222;
                // padding-top: 8px;
                // padding-right: 10px;
                // padding-left: 5px;

                &-animation {
                    font-weight: bold;
                    font-size: 46px;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    margin-left: 100%;
                    animation: myMove 15s linear infinite;
                    animation-fill-mode: forwards;
                }
            }
        }
    }

    &-video {
        width: 100%;
        height: 55%;
        background-color: transparent;
        border: 2px solid rgba(92, 255, 255, .1);
        background:
            linear-gradient(to bottom, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left top no-repeat,
            linear-gradient(to right, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left top no-repeat,
            linear-gradient(to bottom, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right top no-repeat,
            linear-gradient(to left, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right top no-repeat,
            linear-gradient(to top, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left bottom no-repeat,
            linear-gradient(to right, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) left bottom no-repeat,
            linear-gradient(to top, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right bottom no-repeat,
            linear-gradient(to left, #33cdfa 0px, #33cdfa 2px, transparent 3px, transparent 100%) right bottom no-repeat;
        background-size: 1.5px 1.5rem;
        padding: 2px;
        position: relative;

        // background-color: #ccc;
        &-label {
            letter-spacing: 2px;
            color: #05d4f8;
            position: absolute;
            top: -16px;
            font-size: 24px;
            height: 24px;
            font-weight: bold;
            text-align: center;
            width: 100%;
            z-index: 999;
        }

        &-content {
            padding-top: 24px;
            height: calc(100% - 28px);
            width: calc(100% - 4px);
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;

            &-item {
                height: 100%;
                margin-bottom: 10px;

                &-video {
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
