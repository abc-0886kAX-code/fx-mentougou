<!--
 * @Author: maggot-code
 * @Date: 2022-05-19 17:18:41
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:32:15
 * @Description: file content
-->
<template>
    <div class="screen-grid-select-node" v-if="nodePower">
        <div class="screen-grid-select-node-alone" @click="handlerEvent(cell)" :style="style">
            <slot :cell="cell">
                <h1>{{ cell.label }}</h1>
            </slot>
        </div>

        <template v-if="hasChild">
            <template v-for="node in children">
                <screen-grid-select-node :key="node.id" :active="active" :cell="node" :children="node.children" @toEvent="handlerEvent">
                    <template #default="{ cell }">
                        <slot :cell="cell" :activeNode="active"></slot>
                    </template>
                </screen-grid-select-node>
            </template>
        </template>
    </div>
</template>

<script>
import { isNil } from "lodash-es";
import { useNodeStyle } from "@/biz/ScrrenGrid/usecase/useStyle";
import { useUserStore } from "@/store/useUser";
export default {
    name: "screen-grid-select-node",
    mixins: [],
    components: {},
    props: {
        active: Object,
        cell: Object,
        children: {
            type: Array,
            default: () => [],
        },
    },
    emit: ["toEvent"],
    setup(props, context) {
        // 权限
        const user = useUserStore();
        const nodePower = computed(() => {
            const { power } = props.cell;
            if (isNil(power)) return true;
            const cachePower = user.userpower;
            const userPower = isNil(cachePower) ? 0 : +cachePower;

            return power.includes(userPower);
        });
        const { setupStyle } = useNodeStyle();
        const style = computed(() => setupStyle(props.cell, props.active));
        const hasChild = computed(() => props.children.length > 0);

        const handlerEvent = (cell) => {
            const { disabled } = cell;

            if (disabled) return;

            context.emit("toEvent", cell);
        };

        return {
            nodePower,
            style,
            hasChild,
            handlerEvent,
        };
    },
};
</script>
<style lang="scss" scoped>
.screen-grid-select-node {
    &-alone {
        user-select: none;
    }
}
</style>
