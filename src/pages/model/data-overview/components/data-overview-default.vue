<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\components\data-overview-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:45:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 17:07:29
 * @Description:
-->
<script setup>
import { EventType } from "mars3d";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { useLayerLegend } from "@/biz/LayerLegend/store/useLayerLegend";
const legendStore = useLayerLegend();

const { mapview } = useMars3d();
const { gather, setupLayer } = useLayer(mapview);
const videoLayer = setupLayer({
    type: "graphic",
    name: "VideoPointLayer",
    zIndex: 101,
});
const pondLayer = setupLayer({
    type: "graphic",
    name: "PondPointLayer",
    zIndex: 101,
});
const rainfallLayer = setupLayer({
    type: "graphic",
    name: "RainfallPointLayer",
    zIndex: 101,
});
const videoEnity = unref(gather).VideoPointLayer;
const pondEnity = unref(gather).PondPointLayer;
const rainfallEnity = unref(gather).RainfallPointLayer;
const { setupFloatHide, setupFloatWindow } = inject("Mars3dFloat");
const handlerClick = (target) => {
    setupFloatHide();
    // 弹框
};
const handlerOver = (target) => {
    const { graphic, startPosition } = target;
    setupFloatWindow({
        content: graphic.attr?.setupFloat(target),
        ...startPosition,
    });
};
const { setupBind } = useMars3dEvent({
    [EventType.click]: handlerClick,
    [EventType.mouseOver]: handlerOver,
    [EventType.mouseOut]: setupFloatHide,
});

function executeQuery() {}

onMounted(() => {
    setupBind(videoLayer);
    setupBind(pondLayer);
    setupBind(rainfallLayer);
});
onBeforeUnmount(() => {
    videoLayer.remove();
    pondLayer.remove();
    rainfallLayer.remove();
    legendStore.clearCheckList();
});
</script>

<template>
    <div class="data-overview-default">data-overview-default</div>
</template>

<style scoped lang="scss">
.data-overview-default {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
