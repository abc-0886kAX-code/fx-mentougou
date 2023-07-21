<!--
 * @FilePath: \fx-mentougou\src\pages\model\statistical-analysis\components\statistical-analysis-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:45:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-21 15:40:04
 * @Description:
-->
<script setup>
import * as mars3d from "mars3d";
import "@/shared/shp2JsonLayer";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { loadStyle } from "@/biz/share/entify/Load";
import { transArray } from "~/shared/trans";
import { SiteInfo_Obtain, SiteInfo_Server } from '../server/info';
import { usePopup } from "@/biz/Popup/usecase/usePopup";
const popup = usePopup();
const popupEntity = popup.define({
    width: "70%",
    template: defineComponent(() => import("@/pages/model/data-overview/dialog/dialog-data-overview.vue")),
});
const tableColumn = [
    {
        prop: "stnm",
        label: "名称",
        align: "center",
        width: 215,
    },
    {
        prop: "z",
        label: "积水水深(cm)",
        align: "center",
        width: 60,
    },
];
const handlerClick = (target) => {
    const { graphic } = target;
    const { attr, name } = graphic;

    popupEntity.show(attr);
    popupEntity.setupTitle(name);
};
function handleRow(row) {
    const { position } = row;
    unref(mapview).flyToPoint(position, {
        radius: 3000
    })
}

const { loading } = SiteInfo_Server.server;
const tableData = computed(() => transArray(unref(SiteInfo_Server.server.result.source).data, []));
const { mapview } = useMars3d();

onMounted(async () => {
    await SiteInfo_Obtain({ sttp: "WP" });
});
onBeforeUnmount(() => {
    popup.release(popupEntity);
});
</script>

<template>
    <div class="statistical-analysis-default">
        <el-table class="statistical-analysis-default-table" v-loading="loading" v-bind="loadStyle" size="mini"
            :data="tableData" width="100%" height="100%">
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
@import "@/assets/style/home-table.scss";

.statistical-analysis-default {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-table {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
