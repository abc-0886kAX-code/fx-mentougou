/*
 * @FilePath: \fx-mentougou\src\store\useUser.js
 * @Author: zhangyang
 * @Date: 2023-02-07 15:09:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 15:56:42
 * @Description:
 */
import { defineStore } from "pinia";
import { isEmptyString } from "~/shared/is";

const paths = ["token", "truename", "userpower"];

export const Namespace = "useUser";

export const useUser = defineStore(Namespace, {
    state: () => ({
        token: "",
        truename: "",
        userpower: "",
    }),

    getters: {
        tokenUnusable() {
            return isEmptyString(this.token);
        },
        tokenUsable() {
            return !this.tokenUnusable;
        },
    },

    actions: {
        setupToken(token) {
            this.token = token;
        },
        setupTruename(truename) {
            this.truename = truename;
        },
        setupUserPower(power) {
            this.userpower = power;
        },
        emptyUserInfo() {
            this.token = "";
            this.truename = "";
            this.userpower = "";
        },
    },

    persist: {
        key: Namespace,
        paths,
    },
});

export function useUserStore() {
    return useUser();
}

export default {
    namespace: Namespace,
    store: useUser,
};
