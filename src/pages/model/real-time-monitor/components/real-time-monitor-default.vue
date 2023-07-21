<!--
 * @FilePath: \fx-mentougou\src\pages\model\real-time-monitor\components\real-time-monitor-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:46:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 17:09:58
 * @Description:
-->
<script setup>

import { EventType, graphic, Cesium } from "mars3d";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import SHIPINGICON from "@/assets/images/points/shiping.png";
import { useLayerLegend } from "@/biz/LayerLegend/store/useLayerLegend";

import { transArray } from "~/shared/trans";
import { loadStyle } from "@/biz/share/entify/Load";
import { Monitor_Obtain, Monitor_Server } from "../server";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
const { BillboardEntity } = graphic;
const legendStore = useLayerLegend();
const popup = usePopup();
const popupEntity = popup.define({
    width: "60%",
    title: "实时监控",
    template: defineComponent(() => import("@/pages/model/data-overview/dialog/tabs/data-overview.vue")),
});

const tableColumn = [
    {
        prop: "stnm",
        label: "名称",
        align: "center",
    },
    {
        prop: "state",
        label: "状态",
        align: "center",
    },
];
const setupFloat = (target) => {
    const { attr } = target.graphic;
    return tableColumn.map((item) => {
        const { label, prop } = item;
        return {
            label,
            field: prop,
            text: attr[prop] ?? "--",
        };
    });
};
function setupRoundPoint(source) {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id, sttp } = source;


    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: SHIPINGICON,
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-real-time-reservoir-hydrological",
            setupFloat,
        },
        ...shape,
    });
}

const { mapview } = useMars3d();
const { gather, setupLayer } = useLayer(mapview);
const videoLayer = setupLayer({
    type: "graphic",
    name: "VideoPointLayer",
    zIndex: 101,
});
const { find: videoFind, clear: videoClear } = unref(gather).VideoPointLayer;
const videoEntity = videoFind();
const videoPoints = computed(() => {
    return unref(tableData).map(setupRoundPoint);
});


const { setupFloatHide, setupFloatWindow } = inject("Mars3dFloat");
const handlerClick = (target) => {
    const { graphic } = target;
    const { attr, name } = graphic;

    popupEntity.show(attr);
    popupEntity.setupTitle(name);
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

const { loading } = Monitor_Server.server;
const tableData = computed(() => transArray(unref(Monitor_Server.server.result.source).data, []));
const tableInfo = computed(() => {
    const online = unref(tableData).filter((item) => item.state === "在线").length;
    const offline = unref(tableData).filter((item) => item.state === "离线").length;
    return {
        total: unref(tableData).length,
        online,
        offline,
    };
});

function handleRow(row) {
    const { stcd, sttp } = row;
    const { lockPosition, layer } = useLocation(unref(gather).VideoPointLayer);
    lockPosition(stcd);
    layer.getGraphicById(stcd).startFlicker({
        time: 20, // 闪烁时长（秒）
        maxAlpha: 0.6,
        color: Cesium.Color.WHITE,
        onEnd: function () {
            // 结束后回调
        },
    });
}

function handleClick(row) {
    popupEntity.show(row);
}

async function executeQuery() {
    videoClear();
    await Monitor_Obtain();
    videoEntity.addGraphic(unref(videoPoints));

    legendStore.setCheckList([
        {
            keyword: "video",
            label: "视频站",
            entity: videoEntity,
            size: videoEntity.length,
            show: true,
            icon: SHIPINGICON,
        },
    ]);
}

onMounted(() => {
    setupBind(videoLayer);
    executeQuery();
});

onBeforeUnmount(() => {
    videoLayer.remove();
    popup.release(popupEntity);
});
</script>

<template>
    <div class="real-time-monitor-default">
        <div class="real-time-monitor-default-stat">
            <div class="real-time-monitor-default-stat-total">监控总数 {{ tableInfo.total }}</div>
            <div class="real-time-monitor-default-stat-state">在线 {{ tableInfo.online }} - 离线 {{ tableInfo.offline }}</div>
        </div>
        <el-table class="real-time-monitor-default-table" v-loading="loading" v-bind="loadStyle" size="mini"
            :data="tableData" @row-click="handleRow" width="100%" height="100%">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-link type="success"
                        @click="handlerClick({ graphic: { attr: scope.row, name: scope.row.stnm } })">查看</el-link>
                </template>
            </el-table-column>
            <template v-for="item in tableColumn">
                <el-table-column v-if="item.prop === 'stnm'" :key="item.prop" :prop="item.prop" :label="item.label"
                    :width="item.width" :align="item.align">
                    <template slot-scope="scope">
                        <el-link type="primary" @click.stop="handleRow(scope.row)">{{ scope.row.stnm }}</el-link>
                    </template>
                </el-table-column>

                <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :align="item.align"> </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/home-table.scss";

.real-time-monitor-default {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-stat {
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #fff;
    }

    &-table {
        height: calc(100% - 30px);
        width: 100%;
        overflow-y: auto;
    }
}
</style>
