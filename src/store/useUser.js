/*
 * @FilePath: \fx-mentougou\src\store\useUser.js
 * @Author: zhangyang
 * @Date: 2023-02-07 15:09:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 10:53:13
 * @Description:
 */
import { defineStore } from "pinia";
import { isEmptyString } from "~/shared/is";

const paths = ["token"];

export const Namespace = "useUser";

export const useUser = defineStore(Namespace, {
    state: () => ({
        token: "",
        truename: "",
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
        emptyUserInfo() {
            this.token = "";
            this.truename = "";
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
