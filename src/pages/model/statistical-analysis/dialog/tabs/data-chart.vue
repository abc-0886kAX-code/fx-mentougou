<script setup>
import { init as initChart, use as useChart } from "echarts/core";
import { useDialog } from "@/biz/Popup/usecase/useDialog";
import { ChartData_Server, ChartData_Obtain } from "@/pages/model/statistical-analysis/server/chart";
import { loadStyle } from "@/biz/share/entify/Load";
import { transObject } from "~/shared/trans";
import dayjs from "dayjs";
const { loading } = ChartData_Server.server;
const source = computed(() =>
    transObject(unref(ChartData_Server.server.result.source).data, {
        tableColumn: [],
        tableRows: [],
    })
);

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
    const data = unref(source).tableColumn.map((item) => {
        return {
            name: item.label,
            yAxisIndex: 0,
            data: unref(source).tableRows.map((cell) => cell[item.filed]),
            type: "line",
            z: 1,
        };
    });

    const options = {
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
            data: unref(source).tableRows.map((item) => item.tm),
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
        series: data,
    };
    chart.value.setOption(options);
}

async function executeQuery() {
    console.log(unref(config));
    await ChartData_Obtain();
    setupOptions();
}

onMounted(() => {
    executeQuery();
});
</script>

<template>
    <div class="data-chart" ref="refs" v-loading="loading" v-bind="loadStyle"></div>
</template>

<style scoped lang="scss">
.data-chart {
    width: 100%;
    height: 100%;
}
</style>
