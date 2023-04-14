<!--
 * @FilePath: \fx-mentougou\src\pages\home\home.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 10:58:06
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 16:21:17
 * @Description:
-->
<script setup>
import { Cesium } from "mars3d";
import ContainerLayout from "@/biz/container/container-layout.vue";
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
import useUserHomeModule from "@/biz/User/usecase/useUserHomeModule";
import BusinessModules from "./business-module.js";
import { LayerLegend } from "@/biz/LayerLegend";
const { ArcType } = Cesium;
const layers = [
    {
        type: "geojson",
        name: "MTG_AREA_LAYER",
        show: true,
        zIndex: 101,
        url: "https://data.mars3d.cn/file/geojson/areas/110109.json",
        symbol: {
            styleOptions: {
                fill: true,
                color: "rgb(255,255,255)",
                opacity: 0.0,
                outline: true,
                outlineColor: "#d90000",
                outlineWidth: 2,
                outlineOpacity: 1.0,
                arcType: ArcType.GEODESIC,
                clampToGround: true,
            },
        },
        flyTo: true,
    },
];
const config = setupMars3DConfig(3);
function handlerMapReady(mapview) {}

const { modules, setupModulesPosition } = useUserHomeModule(BusinessModules);

function handlerResolve(params) {
    console.log(params);
}
</script>

<template>
    <mars3d-container class="home" :config="config" :layers="layers" @onReady="handlerMapReady">
        <LayerLegend class="layer-legend"></LayerLegend>
        <template v-for="(item, index) in modules">
            <ContainerLayout v-if="item.length > 0" :position="setupModulesPosition(index)" :key="index" width="380px">
                <template v-for="mode in item">
                    <component :key="mode.name" :is="mode.component" :class="mode.className" @onResolve="handlerResolve"></component>
                </template>
            </ContainerLayout>
        </template>
    </mars3d-container>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    position: relative;
    .layer-legend {
        width: 200px;
        background-image: linear-gradient(to bottom right, #0b133b, #1b2b9b, #4e5dc0);
        position: fixed;
        bottom: 15px;
        right: 470px;
        z-index: 201;
        // transform: translateX(-50%);
        font-size: 14px !important;
        height: auto;
        padding: 10px;
        border-radius: 10px;
        opacity: 0.9;
    }

    & .data-overview {
        width: 100%;
        height: 29vh;
        z-index: 102;
        overflow: hidden;
        color: #fff;
    }

    & .real-time-monitor {
        width: 100%;
        height: 29vh;
        z-index: 102;
        overflow: hidden;
        color: #fff;
    }

    & .statistical-analysis {
        width: 100%;
        height: 29vh;
        z-index: 102;
        overflow: hidden;
        color: #fff;
    }

    & .sms-management {
        width: 100%;
        height: 29vh;
        z-index: 102;
        overflow: hidden;
        color: #fff;
    }

    & .device-management {
        width: 100%;
        height: 29vh;
        z-index: 102;
        overflow: hidden;
        color: #fff;
    }

    & .system-management {
        width: 100%;
        height: 29vh;
        z-index: 102;
        overflow: hidden;
        color: #fff;
    }
}
</style>
