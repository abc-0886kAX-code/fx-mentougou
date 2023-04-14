/*
 * @Author: maggot-code
 * @Date: 2022-05-19 20:11:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-19 20:11:48
 * @Description: file content
 */
import ScreenGridNode from './grid-node.vue';

/* istanbul ignore next */
ScreenGridNode.install = function (Vue) {
    Vue.component(ScreenGridNode.name, ScreenGridNode);
};

export default ScreenGridNode;