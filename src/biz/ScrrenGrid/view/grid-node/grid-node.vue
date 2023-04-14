<!--
 * @Author: maggot-code
 * @Date: 2022-05-19 20:09:58
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:30:11
 * @Description: file content
-->
<template>
    <h3 class="screen-grid-node" :style="style">{{ label }}</h3>
</template>

<script>
import { useLabel } from "@/biz/ScrrenGrid/usecase/useLabel";
import { useNodeStyle } from "@/biz/ScrrenGrid/usecase/useStyle";

export default {
    name: "screen-grid-node",
    mixins: [],
    components: {},
    props: {
        node: Object,
    },
    setup(props) {
        const { setupStyle } = useNodeStyle({
            activeColor: "#E6A23C",
        });
        const style = computed(() => {
            const style = setupStyle(props.node.cell, props.node.activeNode);
            return Object.assign({}, { paddingLeft: (props.node.cell.level - 1) * 10 + "px" }, style);
        });

        return {
            style,
            ...useLabel(props.node.cell),
        };
    },
};
</script>
<style lang="scss" scoped>
@import "./grid-node.scss";
</style>
