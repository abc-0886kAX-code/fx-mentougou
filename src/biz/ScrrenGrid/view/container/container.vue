<!--
 * @Author: maggot-code
 * @Date: 2022-05-19 14:26:29
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:29:56
 * @Description: file content
-->
<template>
    <section class="screen-grid-container">
        <div class="screen-grid-container-head" v-if="hasHead">
            <slot name="head"></slot>
        </div>

        <div class="screen-grid-container-body" :class="bodyClassName">
            <slot name="body"></slot>
        </div>
    </section>
</template>

<script>
import { isNil } from "lodash-es";
export default {
    name: "screen-grid-container",
    mixins: [],
    components: {},
    props: {},
    setup(props, context) {
        const hasHead = computed(() => !isNil(context.slots.head));

        const bodyClassName = computed(() => {
            const headBody = unref(hasHead) ? "screen-grid-container-has-head-body" : "screen-grid-container-not-head-body";

            return [headBody];
        });

        return {
            hasHead,
            bodyClassName,
        };
    },
};
</script>
<style lang="scss" scoped>
@import "./container.scss";
</style>
