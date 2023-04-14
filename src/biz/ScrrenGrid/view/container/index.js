/*
 * @Author: maggot-code
 * @Date: 2022-05-19 14:26:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-19 14:30:49
 * @Description: file content
 */
import ScreenGridContainer from './container.vue';

/* istanbul ignore next */
ScreenGridContainer.install = function (Vue) {
    Vue.component(ScreenGridContainer.name, ScreenGridContainer);
};

export default ScreenGridContainer;