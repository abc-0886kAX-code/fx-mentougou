/*
 * @Author: zhangyang
 * @Date: 2022-04-12 17:44:43
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-12 17:44:43
 * @Description: file content
 */
import ContainerLayout from './container-layout.vue';

/* istanbul ignore next */
ContainerLayout.install = function (Vue) {
    Vue.component(ContainerLayout.name, ContainerLayout);
};

export default ContainerLayout;