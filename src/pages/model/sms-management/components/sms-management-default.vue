<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\sms-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:54:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-26 11:30:18
 * @Description:
-->
<script setup>
import { isEmptyObject } from "~/shared/is";
const active = ref({});
const menus = ref([
    {
        keyword: "sms-manage",
        label: "短信管理",
        children: [
            {
                keyword: "sms-template",
                label: "短信模板",
            },
            {
                keyword: "director-manage",
                label: "负责人管理",
            },
        ],
    },
    {
        keyword: "LED-manage",
        label: "LED管理",
        children: [
            {
                keyword: "current-state",
                label: "当前状态",
            },
            {
                keyword: "info-template",
                label: "信息模板",
            },
        ],
    },
]);

function getMenuLabel(defaultLabel) {
    return isEmptyObject(unref(active)) ? defaultLabel : unref(active).label;
}

function handleCommand(command) {
    active.value = command;
}
</script>

<template>
    <div class="sms-management-default">
        <div class="sms-management-default-head">
            <el-dropdown size="mini" v-for="menu in menus" :key="menu.keyword" @command="handleCommand">
                <el-button size="mini" type="primary"> {{ getMenuLabel(menu.label) }}<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                <el-dropdown-menu slot="dropdown">
                    <template v-for="child in menu.children">
                        <el-dropdown-item :command="child" :key="child.keyword">{{ child.label }}</el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="sms-management-default-body">
            <!-- <components :key="active" :is="component"></components> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/home-tabs.scss";
.sms-management-default {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-head {
        height: 60px;
        width: 100%;
    }
    &-body {
        height: calc(100% - 60px - 12px);
        width: 100%;
    }
}
</style>
