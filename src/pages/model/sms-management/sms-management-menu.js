/*
 * @FilePath: \fx-mentougou\src\pages\model\sms-management\sms-management-menu.js
 * @Author: zhangxin
 * @Date: 2023-04-14 14:54:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-17 16:00:29
 * @Description:
 */
import SmsManagementDefault from "./components/sms-management-default.vue";
export default {
    defaultID: "e7c011a06efa4db7b8514198dcbafcee",
    menu: [
        {
            id: "e7c011a06efa4db7b8514198dcbafcee",
            label: "警示信息",
            component: SmsManagementDefault,
            render: false,
            fragment: true,
        },
    ],
};
