<!--
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\components\sms-management-default.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 14:54:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-26 17:14:26
 * @Description:
-->
<script setup>
const active = ref({});
const menus = ref([
    {
        keyword: "sms-manage",
        label: "",
        defaultLabel: "短信管理",
        children: [
            {
                keyword: "sms-template",
                label: "短信模板",
                component: () => import("./tabs/sms-template.vue"),
                index: 0,
            },
            {
                keyword: "director-manage",
                label: "负责人管理",
                component: () => import("./tabs/director-manage.vue"),
            },
        ],
    },
    {
        keyword: "LED-manage",
        label: "",
        defaultLabel: "LED管理",
        children: [
            {
                keyword: "current-state",
                label: "当前状态",
                component: () => import("./tabs/current-state.vue"),
            },
            {
                keyword: "info-template",
                label: "信息模板",
                component: () => import("./tabs/info-template.vue"),
            },
        ],
    },
]);

function handleCommand(command) {
    if (command.keyword === unref(active).keyword) return;
    active.value = command;
    handleMenu();
}

function handleMenu() {
    menus.value = unref(menus).map((item, i) => {
        if (i === unref(active).index) {
            item.label = unref(active).label;
        } else {
            item.label = "";
        }
        return item;
    });
}

onMounted(() => {
    handleCommand(unref(menus)[0].children[0]);
});
</script>

<template>
    <div class="sms-management-default">
        <div class="sms-management-default-head">
            <el-dropdown class="sms-management-default-head-item" size="mini" v-for="(menu, index) in menus" :tabindex="index" :key="menu.keyword" @command="handleCommand">
                <el-button size="mini" type="primary"> {{ menu.label || menu.defaultLabel }}<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                <el-dropdown-menu slot="dropdown">
                    <template v-for="child in menu.children">
                        <el-dropdown-item :command="{ ...child, index }" :key="child.keyword">{{ child.label }}</el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="sms-management-default-body">
            <components :key="active.keyword" :is="active.component"></components>
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
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        &-item {
            height: 100%;
        }
    }
    &-body {
        height: calc(100% - 40px);
        width: 100%;
    }
}
</style>
