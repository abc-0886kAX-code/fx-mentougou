<script setup>
import Menu from "./real-time-monitor-menu.js";
import { useWatchRevert } from "@/biz/ScrrenGrid/usecase/useWatchRevert";
const Name = "real-time-monitor-menu";
const { menu, defaultID } = Menu;
const active = ref(defaultID);
const componentName = ref("");

const setupDefaultActive = () => (active.value = defaultID);
useWatchRevert(Name, {
    setupDriver: setupDefaultActive,
});

const handlerComponent = (cell) => {
    const { component, revert } = cell;
    componentName.value = component;

    revert &&
        context.emit("onResolve", {
            ...cell,
            type: Name,
        });
};

const handlerDialog = (cell) => {};
</script>

<template>
    <screen-grid-container>
        <template v-slot:head>
            <screen-grid-select icon="el-icon-s-help" :active.sync="active" :menu="menu" :width="80" @toComponent="handlerComponent" @toDialog="handlerDialog">
                <template #default="node">
                    <screen-grid-node :node="node"></screen-grid-node>
                </template>
            </screen-grid-select>
        </template>

        <template v-slot:body>
            <component :is="componentName"></component>
        </template>
    </screen-grid-container>
</template>

<style scoped lang="scss"></style>
