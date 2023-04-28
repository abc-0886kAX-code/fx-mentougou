<!--
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\components\data-overview-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:45:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 11:24:07
 * @Description:
-->
<script setup>
import { EventType, graphic } from "mars3d";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { useLayerLegend } from "@/biz/LayerLegend/store/useLayerLegend";
import { OverviewSite_Obtain, OverviewSite_Server } from "../server";
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import JISHUIICON from "@/assets/images/points/jishui.png";
import SHIPINGICON from "@/assets/images/points/shiping.png";
import YULIANGICON from "@/assets/images/points/yuliang.png";
const { BillboardEntity } = graphic;
const popup = usePopup();
const popupEntity = popup.define({
    width: "70%",
    template: defineComponent(() => import("../dialog/dialog-data-overview.vue")),
});
const tableColumn = [
    {
        prop: "stnm",
        label: "名称",
        align: "center",
        width: 220,
    },
    {
        prop: "signname",
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

function setupRoundPoint(source) {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id, sign } = source;
    const ICON = {
        "01": JISHUIICON,
        "02": SHIPINGICON,
        "03": YULIANGICON,
    };
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: ICON[sign],
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
    const data = unref(tableData).filter((item) => item.sign === "01");
    return data.map(setupRoundPoint);
});
const { find: pondFind, clear: pondClear } = unref(gather).PondPointLayer;
const pondEntity = pondFind();
const pondPoints = computed(() => {
    const data = unref(tableData).filter((item) => item.sign === "02");
    return data.map(setupRoundPoint);
});
const { find: rainfallFind, clear: rainfallClear } = unref(gather).RainfallPointLayer;
const rainfallEntity = rainfallFind();
const rainfallPoints = computed(() => {
    const data = unref(tableData).filter((item) => item.sign === "03");
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

function handleRow(row) {
    const { stcd, sign } = row;
    const entity = {
        "01": unref(gather).VideoPointLayer,
        "02": unref(gather).PondPointLayer,
        "03": unref(gather).RainfallPointLayer,
    };
    const { lockPosition } = useLocation(entity[sign]);
    lockPosition(stcd);
}

async function executeQuery() {
    videoClear();
    pondClear();
    rainfallClear();
    await OverviewSite_Obtain();
    videoEntity.addGraphic(unref(videoPoints));
    pondEntity.addGraphic(unref(pondPoints));
    rainfallEntity.addGraphic(unref(rainfallPoints));
    legendStore.setCheckList([
        {
            keyword: "video",
            label: "视频站",
            entity: videoEntity,
            size: videoEntity.length,
            show: true,
        },
        {
            keyword: "pond",
            label: "积水点",
            entity: pondEntity,
            size: pondEntity.length,
            show: true,
        },
        {
            keyword: "rainfall",
            label: "雨量站",
            entity: rainfallEntity,
            size: rainfallEntity.length,
            show: true,
        },
    ]);
}

onMounted(() => {
    setupBind(videoLayer);
    setupBind(pondLayer);
    setupBind(rainfallLayer);
    executeQuery();
});
onBeforeUnmount(() => {
    videoLayer.remove();
    pondLayer.remove();
    rainfallLayer.remove();
    legendStore.clearCheckList();
    popup.release(popupEntity);
});
</script>

<template>
    <el-table class="data-overview-default" v-loading="loading" v-bind="loadStyle" size="mini" :data="tableData" @row-click="handleRow" width="100%" height="100%">
        <el-table-column type="index" width="50" align="center"> </el-table-column>
        <template v-for="item in tableColumn">
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align"> </el-table-column>
        </template>
    </el-table>
</template>

<style scoped lang="scss">
.data-overview-default {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
