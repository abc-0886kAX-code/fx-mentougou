/*
 * @Author: zhangyang
 * @Date: 2022-04-24 12:15:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-24 14:26:24
 * @Description: mars3d.config.Dev
 */

import { CRS } from "mars3d";
import black_basemap from "@/assets/images/icon/black_basemap.png";
import blue_basemap from "@/assets/images/icon/blue_basemap.png";
import darkcolor_basemap from "@/assets/images/icon/darkcolor_basemap.png";
import electronics_basemap from "@/assets/images/icon/electronics_basemap.png";
import image_basemap from "@/assets/images/icon/image_basemap.png";
import solidcolor_basemap from "@/assets/images/icon/solidcolor_basemap.png";
const { VITE_CESIUMTOKEN, VITE_TIANMAPKEY, VITE_ROOT_LAYERID, VITE_OFFLINEMAP_URL, VITE_OFFLINEMAP_LEVEL } = import.meta.env;
export default (mode = 3) => {
    const config = {
        scene: {
            center: {
                lng: 115.80146,
                lat: 40.14048,
                alt: 209882,
            },
            globe: {
                show: true,
                baseColor: "#333333",
                depthTestAgainstTerrain: false,
                showGroundAtmosphere: true,
                enableLighting: false,
                tileCacheSize: 512,
                terrainExaggeration: 1.0,
                terrainExaggerationRelativeHeight: 0.0,
            },
            cameraController: {
                zoomFactor: 3.0,
                constrainedAxis: true,
                minimumZoomDistance: 1.0,
                maximumZoomDistance: 50000000.0,
                minimumCollisionTerrainHeight: 80000,
                enableRotate: true,
                enableTranslate: true,
                enableTilt: true,
                enableZoom: true,
                enableCollisionDetection: true,
            },
            removeDblClick: true,
            ionToken: VITE_CESIUMTOKEN,
            resolutionScale: 1.0,
            showSun: false,
            showMoon: false,
            showSkyBox: true,
            showSkyAtmosphere: false,
            fog: false,
            fxaa: false,
            highDynamicRange: false,
            backgroundColor: "#333333",
            sceneMode: mode,
            scene3DOnly: false,
            shouldAnimate: true,
            shadows: false,
            useDefaultRenderLoop: true,
            targetFrameRate: 60,
            useBrowserRecommendedResolution: true,
            automaticallyTrackDataSourceClocks: true,
            orderIndependentTranslucency: true,
            requestRenderMode: true,
        },
        mouseOptionsmap: {
            enabledMoveTarget: true,
            moveDelay: 0,
        },
        control: {
            locationBar: {
                fps: true,
                crs: "CGCS2000_GK_Zone_3",
                crsDecimal: 0,
                template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div class='hide1000'>横{crsx}  纵{crsy}</div> <div>海拔：{alt}米</div> <div class='hide700'>层级：{level}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div><div class='hide700'>视高：{cameraHeight}米</div>",
            },
            // compass: { top: "0", right: "330px" }, 导航球
            distanceLegend: { bottom: "30px", left: "0px" },
            zoom: {
                insertIndex: 1,
            },
            contextmenu: {
                hasDefault: true,
            },
            mouseDownView: true,
            infoBox: false,
            selectionIndicator: false, // 选择实体的时候是否显示标记框
            animation: false,
            timeline: false,
            baseLayerPicker: true,
            fullscreenButton: true,
            vrButton: false,
            geocoder: true,
            geocoderConfig: { key: ["66f2edf04639c811fc275fe300a25b49"] }, //POI查询按钮参数配置
            // 张鑫高德创建的key
            // http://mars3d.cn/editor-vue.html?id=control/other/display&code=1 从官方中发送一个请求 查看key
            homeButton: true,
            // sceneModePicker: mode === 3,
            sceneModePicker: false,
            projectionPicker: false,
            navigationHelpButton: true,
            navigationInstructionsInitiallyVisible: false,
            showRenderLoopErrors: true,
        },
        // 地形服务配置
        terrain: {
            url: "http://data.mars3d.cn/terrain",
            requestWaterMask: false,
            requestVertexNormals: false,
            show: false,
        },
        // 底图图层配置
        basemaps: [
            {
                type: "group",
                id: 10,
                name: "功能图层",
            },
            {
                show: true,
                type: "group",
                pid: 10,
                id: 11,
                name: "影像底图",
                icon: image_basemap,
                layers: [
                    {
                        type: "tdt",
                        pid: 11,
                        id: 12,
                        name: "天地图-影像图",
                        layer: "img_d",
                        key: [VITE_TIANMAPKEY],
                    },
                    {
                        type: "tdt",
                        pid: 11,
                        id: 13,
                        name: "天地图-影像图标注",
                        layer: "img_z",
                        key: [VITE_TIANMAPKEY],
                    },
                ],
            },
            {
                type: "group",
                pid: 10,
                id: 14,
                name: "电子底图",
                icon: electronics_basemap,
                layers: [
                    {
                        type: "tdt",
                        pid: 14,
                        id: 15,
                        name: "天地图-电子图",
                        layer: "vec_d",
                        key: [VITE_TIANMAPKEY],
                    },
                    {
                        type: "tdt",
                        pid: 14,
                        id: 16,
                        name: "天地图-电子图标注",
                        layer: "vec_z",
                        key: [VITE_TIANMAPKEY],
                    },
                ],
            },
            {
                type: "gaode",
                id: 17,
                pid: 10,
                name: "暗色底图",
                icon: darkcolor_basemap,
                layer: "vec",
                invertColor: true,
                filterColor: "#4e70a6",
                brightness: 0.6,
                contrast: 1.8,
                gamma: 0.3,
                hue: 1,
                saturation: 0,
            },
            {
                type: "xyz",
                id: 18,
                pid: 10,
                name: "蓝色底图",
                icon: blue_basemap,
                url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                chinaCRS: "GCJ02",
                enablePickFeatures: false,
            },
            {
                type: "tencent",
                id: 19,
                pid: 10,
                name: "黑色底图",
                icon: black_basemap,
                layer: "custom",
                style: "4",
            },
            {
                name: "纯色底图",
                icon: solidcolor_basemap,
                type: "gaode",
                layer: "vec",
                invertColor: true, // 反向颜色 color.r = 1.0 - color.r
                filterColor: "#000000", // 滤镜颜色  color.r = color.r * filterColor.r
                brightness: 0.6,
                contrast: 1.8,
                gamma: 0.3,
                hue: 1,
                saturation: 0,
            },
        ],
        layers: [
            {
                type: "group",
                id: 100,
                name: "SupportLayerGroup",
            },
            // {
            //     show: true,
            //     type: 'xyz',
            //     pid: 100,
            //     id: 101,
            //     name: 'DistrictBorderLayer',
            //     url: `https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=${VUE_APP_TIANMAPKEY}`,
            //     subdomains: '01234567',
            //     maximumLevel: 10,
            // },
            {
                type: "group",
                id: +VITE_ROOT_LAYERID,
                name: "BusinessLayerGroup",
            },
        ],
    };

    return config;
};
