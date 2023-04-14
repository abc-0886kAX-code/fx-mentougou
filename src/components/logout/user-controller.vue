<template>
    <div class="ytxd-user-controller">
        <div class="time-display">
            <p class="boxDay">{{ dateDay }}</p>
            <div class="time-disply-ri">
                <p class="boxWeek">{{ dateYear }} {{ dateWeek }}</p>
                <p class="boxNl">农历{{ getLunarDay.dateStr }}</p>
            </div>
            <!-- <p>生肖年{{ getLunarDay.lunarYear }}{{ getLunarDay.zodiac }}</p> -->
        </div>
        <el-dropdown class="user-handler" size="small" split-button type="primary" @command="handleCommand" @click="handleUser">
            {{ userName }}
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userLogout">注销登录</el-dropdown-item>
                <el-dropdown-item command="clearCache" divided>清理缓存</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="user-icon">
            <img :src="userIcon" />
        </div>
    </div>
</template>

<script>
import DefUserIcon from "@/assets/images/def-user-icon.png";
import { isFunction } from "lodash-es";
import { LOGOUT_Obtain } from "./server";
import { useUserStore } from "@/store/useUser";
// 引入农历插件
import { getLunar } from "chinese-lunar-calendar";
// 引入时间插件
import dayjs from "dayjs";

export default {
    name: "ytxd-user-controller",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            userIcon: DefUserIcon,
            userName: useUserStore().truename || "管理员",

            // 农历
            getLunarDay: "",
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),

            // 时间
            dateDay: null,
            dateYear: null,
            dateWeek: null,
            weekday: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            timer: null,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleUser() {},
        handleCommand(command) {
            const func = this[command];
            isFunction(func) && func();
        },
        userLogout() {
            LOGOUT_Obtain()
                .then(this.clearCache)
                .catch((error) => {
                    console.log(error);
                });
        },
        clearCache() {
            useUserStore().emptyUserInfo();
            this.$router.push({ name: "login" });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // 农历
        this.getLunarDay = getLunar(this.year, this.month, this.date);
        // 时间
        this.timer = setInterval(() => {
            const date = dayjs(new Date());
            this.dateDay = date.format("HH:mm:ss");
            this.dateYear = date.format("YYYY-MM-DD");
            this.dateWeek = date.format(this.weekday[date.day()]);
        }, 1000);
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
@import "./user-controller.scss";
</style>
