<script setup>
import { init as initChart, use as useChart } from "echarts/core";
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { ChartData_Server, ChartData_Obtain } from "@/pages/model/data-overview/server/chart";
import { loadStyle } from "@/biz/share/entify/Load";
import { useDateWater } from "@/hooks/useDate.js";
import dayjs from "dayjs";
const { loading } = ChartData_Server.server;
const source = computed(() => unref(ChartData_Server.server.result.source).data);

const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));

const refs = ref(null);
const chart = shallowRef(null);
function releaseChart() {
    chart.value.dispose();
    chart.value = null;
    refs.value = null;
}
function createChart() {
    if (isNil(unref(refs))) return;

    if (!isNil(unref(chart))) return releaseChart();

    chart.value = initChart(unref(refs));

    return chart.value;
}
function setupOptions() {
    if (isNil(unref(chart))) createChart();
    const options = {
        // 积水点、雨量站
        color: ["#07ebfd", "#1571bf"],
        legend: {
            textStyle: {
                color: "#fff",
            },
            bottom: 12,
        },
        grid: {},
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontSize: 14,
                color: "#fff",
            },
            backgroundColor: "rgba(0,0,0,0.3)",
            borderColor: "#02d5f6",
            borderWidth: 1,
        },
        xAxis: {
            type: "category",
            data: unref(source).map((item) => item.tm),
            axisTick: {
                alignWithLabel: true,
            },
            axisLabel: {
                color: "#fff",
                formatter: (value) => {
                    return isNil(value) ? "-" : dayjs(value).format("MM-DD HH:mm");
                },
            },
        },
        yAxis: [
            {
                type: "value",
                name: "水深(cm)",
                alignTicks: true,
                min: 0,
                max: function (value) {
                    return Math.ceil((value.max + 0.3) / 0.5) * 0.5;
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#fff",
                    },
                },
                axisLabel: {
                    color: "#fff",
                },
                nameTextStyle: {
                    color: "#fff",
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        // 历史雨量 历史水位 预报雨量 预报水位
        series: [
            {
                name: "水深(cm)",
                yAxisIndex: 0,
                data: unref(source).map((item) => Math.ceil(Math.random() * 10)),
                type: "line",
                z: 1,
            },
        ],
    };
    chart.value.setOption(options);
}

const dateVal = ref(useDateWater());

const params = computed(() => {
    return {
        starttime: unref(dateVal)[0],
        endtime: unref(dateVal)[1],
        stcd: unref(config).stcd,
    };
});

async function executeQuery() {
    await ChartData_Obtain(unref(params));
    setupOptions();
}

async function executeReset() {
    dateVal.value = useDateWater();
    executeQuery();
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-chart" v-loading="loading" v-bind="loadStyle">
        <div class="data-chart-form">
            <el-date-picker v-model="dateVal" size="mini" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>

            <div>
                <el-button size="mini" type="primary" @click="executeQuery"><i class="el-icon-search el-icon--left"></i>查询</el-button>
                <el-button size="mini" type="danger" @click="executeReset"><i class="el-icon-refresh el-icon--left"></i>重置</el-button>
            </div>
        </div>
        <div class="data-chart-body" ref="refs"></div>
    </div>
</template>

<style scoped lang="scss">
.data-chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    &-form {
        height: 15%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }
    &-body {
        height: 85%;
    }
}
</style>
