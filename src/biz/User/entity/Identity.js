/*
 * @FilePath: \fx-mentougou\src\biz\User\entity\Identity.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:25:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:46:13
 * @Description:
 */
import { isBoolean, isNumber } from "lodash-es";
import { useUserStore } from "@/store/useUser";
import { ADMIN, USER } from "../share/context";

const IdentityType = {
    [ADMIN]: "0",
    [USER]: "1",
};

const UserIdentity = {
    identity: IdentityType.admin,
};

function transformCacheKeyword(value, expect) {
    if (isBoolean(value) && !value) return expect;

    return value;
}

function transformIdentityToNumber(value) {
    if (isNumber(+value)) return +value;

    return 0;
}

export function getUserIdentity() {
    const user = useUserStore();
    const identity = transformCacheKeyword(user.userpower, UserIdentity.identity);

    const identityToNumber = () => transformIdentityToNumber(identity);

    return {
        identity,
        identityToNumber,
    };
}
