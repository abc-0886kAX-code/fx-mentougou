<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\components\data-overview-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:45:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 13:17:47
 * @Description:
-->
<script setup>
import { EventType, graphic, Cesium } from "mars3d";
import * as mars3d from "mars3d";
import "@/shared/shp2JsonLayer";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { useLayerLegend } from "@/biz/LayerLegend/store/useLayerLegend";
import { OverviewSite_Obtain, OverviewSite_Server } from "../server";
import { Select_Obtain, Select_Server } from "../server/select";
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import JISHUIICON from "@/assets/images/points/jishui.png";
import SHIPINGICON from "@/assets/images/points/shiping.png";
import YULIANGICON from "@/assets/images/points/yuliang.png";
import LISHIJSICON from "@/assets/images/points/l-jishui.png";
const { BillboardEntity } = graphic;
const popup = usePopup();
const popupEntity = popup.define({
    width: "70%",
    template: defineComponent(() => import("../dialog/dialog-data-overview.vue")),
});
const popupSHPEntity = popup.define({
    width: "70%",
    template: defineComponent(() => import("../dialog/dialog-shp.vue")),
});
const tableColumn = [
    {
        prop: "stnm",
        label: "名称",
        align: "center",
        width: 220,
    },
    {
        prop: "sttpname",
        label: "站点类型",
        align: "center",
        width: 150,
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
const setupSHPFloat = (target) => {
    const { attr } = target.graphic;
    // const keysColumn = Object.keys(attr);

    return [
        {
            label: "历史积水点",
            field: attr["积水点"],
            text: attr["积水点"] ?? "--",
        },
    ];
};

function setupRoundPoint(source) {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id, sttp } = source;
    const ICON = {
        WP: JISHUIICON,
        VD: SHIPINGICON,
        PP: YULIANGICON,
    };
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: ICON[sttp],
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

const { loading } = OverviewSite_Server.server;
const tableData = computed(() => transArray(unref(OverviewSite_Server.server.result.source).data, []));
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

const { find: videoFind, clear: videoClear } = unref(gather).VideoPointLayer;
const videoEntity = videoFind();
const videoPoints = computed(() => {
    const data = unref(tableData).filter((item) => item.sttp === "VD");
    return data.map(setupRoundPoint);
});
const { find: pondFind, clear: pondClear } = unref(gather).PondPointLayer;
const pondEntity = pondFind();
const pondPoints = computed(() => {
    const data = unref(tableData).filter((item) => item.sttp === "WP");
    return data.map(setupRoundPoint);
});
const { find: rainfallFind, clear: rainfallClear } = unref(gather).RainfallPointLayer;
const rainfallEntity = rainfallFind();
const rainfallPoints = computed(() => {
    const data = unref(tableData).filter((item) => item.sttp === "PP");
    return data.map(setupRoundPoint);
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

// 处理SHP图层
const handlerSHPClick = (target) => {
    const { graphic } = target;
    const { attr } = graphic;
    popupSHPEntity.show(attr);
    popupSHPEntity.setupTitle(attr["积水点"]);
    setupFloatHide();
    // 弹框
};
const handlerSHPOver = (target) => {
    const { graphic, startPosition } = target;
    setupFloatWindow({
        content: setupSHPFloat(target),
        ...startPosition,
    });
};
const { setupBind: setupSHPBind } = useMars3dEvent({
    [EventType.click]: handlerSHPClick,
    [EventType.mouseOver]: handlerSHPOver,
    [EventType.mouseOut]: setupFloatHide,
});

function handleRow(row) {
    const { stcd, sttp } = row;
    const entity = {
        VD: unref(gather).VideoPointLayer,
        WP: unref(gather).PondPointLayer,
        PP: unref(gather).RainfallPointLayer,
    };
    if (!entity[sttp]) {
        console.warn("未找到该类型图层", sttp);
        return false;
    }
    const { lockPosition, layer } = useLocation(entity[sttp]);
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

function renderSHPLayer() {
    const historyLayer = unref(mapview).getLayer("历史积水点", "name");
    if (historyLayer) {
        unref(mapview).removeLayer(historyLayer, true);
    }
    const layer = new mars3d.layer.Shp2JsonLayer({
        // url: "http://data.mars3d.cn/file/shp/yuexi_point.zip",
        name: "历史积水点",
        url: "https://mhsw.ytxd.com.cn:8081/mh/file/historical.zip",
        symbol: {
            type: "billboard",
            merge: true,
            styleOptions: setupBillboardShape({ longitude: 0, latitude: 0, image: LISHIJSICON }).style,
        },
    });
    unref(mapview).addLayer(layer);
    setupSHPBind(layer);
    return layer;
}

async function executeQuery(params) {
    videoClear();
    pondClear();
    rainfallClear();
    await OverviewSite_Obtain(params);
    videoEntity.addGraphic(unref(videoPoints));
    pondEntity.addGraphic(unref(pondPoints));
    rainfallEntity.addGraphic(unref(rainfallPoints));
    const SHPEntity = renderSHPLayer();
    legendStore.setCheckList([
        {
            keyword: "video",
            label: "视频站",
            entity: videoEntity,
            size: videoEntity.length,
            show: true,
            icon: SHIPINGICON,
        },
        {
            keyword: "pond",
            label: "积水检测",
            entity: pondEntity,
            size: pondEntity.length,
            show: true,
            icon: JISHUIICON,
        },
        {
            keyword: "rainfall",
            label: "雨量站",
            entity: rainfallEntity,
            size: rainfallEntity.length,
            show: true,
            icon: YULIANGICON,
        },
        {
            keyword: "history",
            label: "历史积水点",
            entity: SHPEntity,
            size: "-",
            show: true,
            icon: LISHIJSICON,
        },
    ]);
}

const selectValue = ref([]);
const selcetOptions = computed(() => transArray(unref(Select_Server.server.result.source).data, []));
function selectChange(value) {
    executeQuery({ sttp: value.join(",") });
}

onMounted(async () => {
    setupBind(videoLayer);
    setupBind(pondLayer);
    setupBind(rainfallLayer);
    await Select_Obtain({ codeid: "GB", code: "WP,VD" });
    executeQuery();
});
onBeforeUnmount(() => {
    videoLayer.remove();
    pondLayer.remove();
    rainfallLayer.remove();
    legendStore.clearCheckList();
    popup.release(popupEntity);
    popup.release(popupSHPEntity);
});
</script>

<template>
    <div class="data-overview-default">
        <div class="data-overview-default-select">
            <div class="data-overview-default-select-label">站点类型:</div>
            <div class="data-overview-default-select-form">
                <el-select v-model="selectValue" size="mini" multiple collapse-tags placeholder="请选择"
                    @change="selectChange">
                    <el-option v-for="item in selcetOptions" :key="item.orderid" :label="item.description"
                        :value="item.code"> </el-option>
                </el-select>
            </div>
        </div>
        <el-table class="data-overview-default-table" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData"
            width="100%" height="100%">
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
                        <el-link type="primary" @click="handleRow(scope.row)">{{ scope.row.stnm }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :align="item.align"> </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
.data-overview-default {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    // overflow-y: auto;
    &-select {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-evenly;
        align-items: baseline;

        &-label {
            text-align: center;
            width: 20%;
            height: 100%;
        }

        &-form {
            width: 60%;
            height: 100%;
        }
    }

    &-table {
        width: 100%;
        height: 80%;
        overflow: hidden;
    }
}
</style>
