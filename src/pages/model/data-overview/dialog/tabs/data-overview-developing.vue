<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\dialog\tabs\data-overview.vue
 * @Author: zhangxin
 * @Date: 2023-04-17 14:59:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 16:55:48
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
            <div class="data-overview-info-label">信息展示区域</div>
            <div class="data-overview-info-content">content</div>
        </div>
        <div class="data-overview-led">
            <div class="data-overview-led-label">LED展示区域</div>
            <el-card class="data-overview-led-content" :body-style="{ padding: '0px' }" shadow="always">
                <div class="data-overview-led-content-led">
                    <div class="data-overview-led-content-led-animation" :style="LEDStyle">{{ source.showmsg ?? "暂无信息"
                    }}
                    </div>
                </div>
            </el-card>
        </div>
        <div class="data-overview-video">视频监控展示区域</div>
    </div>
</template>

<style scoped lang="scss">
.data-overview {
    width: 100%;
    height: 100%;
    // background-color: #fff;
    display: flex;
    flex-wrap: wrap;

    &-info,
    &-led {
        width: calc(50% - 10px);
        height: calc(50% - 10px);
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

        &-label {
            font-size: 24px;
            height: 24px;
            font-weight: bold;
            text-align: center;
            width: 100%;
            color: #409eff;
        }

        &-content {
            height: calc(100% - 24px);
            width: 100%;
            color: #fff;

            &-led {
                height: calc(100% - 10px);
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
        }
    }

    &-video {
        width: 100%;
        height: 50%;
        // background-color: #ccc;
    }
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
