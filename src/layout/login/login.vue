<!--
 * @FilePath: \fx-mentougou\src\layout\login\login.vue
 * @Author: zhangxin
 * @Date: 2023-04-12 13:33:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 10:50:18
 * @Description:
-->
<script setup>
import { uuid } from "@/shared/uuid.js";
import { Notification } from "element-ui";
import { useUserStore } from "@/store/useUser";
import { LOGIN_Server, LOGIN_Obtain } from "./server";

const user = useUserStore();
const { proxy } = getCurrentInstance();
const loginForm = ref(null);
const { loading } = LOGIN_Server.server;
const form = ref({
    username: "",
    userpwd: "",
});
const rules = {
    username: [
        {
            required: true,
            message: "账号不可为空",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "密码不可为空",
            trigger: "blur",
        },
    ],
};

function onSubmit() {
    unref(loginForm).validate(async (valid) => {
        if (!valid) return;
        const data = await LOGIN_Obtain(unref(form));
        if (data.code === 200) {
            user.setupToken(data.data.token);
            user.setupTruename(data.data.truename);
            Notification.success({
                title: "成功!",
                message: "登录成功!",
            });
            proxy.$router.push({ name: "home" });
        } else {
            Notification.error({
                title: "错误!",
                message: data.msg,
            });
        }
    });
}
</script>

<template>
    <div class="ytxd-login">
        <video id="v1" autoplay loop muted>
            <source src="/mp4/login-video.mp4" type="video/mp4" />
        </video>

        <div class="login-head">
            <h1>门头沟区下凹式立交桥积水点智能警示系统</h1>
        </div>

        <div class="login-body">
            <h3>应用平台登录</h3>
            <el-form ref="loginForm" :model="form" :rules="rules" class="login-box" @submit.native.prevent>
                <el-form-item prop="username">
                    <el-input class="login-input" type="text" prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username" @keyup.enter.native="onSubmit('loginForm')"></el-input>
                </el-form-item>
                <el-form-item prop="userpwd">
                    <el-input class="login-input" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.userpwd" @keyup.enter.native="onSubmit('loginForm')"></el-input>
                </el-form-item>

                <el-button class="login-button" type="primary" :loading="loading" @click="onSubmit('loginForm')">登录 </el-button>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "./login.scss";
</style>
