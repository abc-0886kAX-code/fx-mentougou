/*
 * @FilePath: \fx-mentougou\src\main.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-24 14:56:49
 * @Description:
 */
import Vue from "vue";
import { extendRouter } from "@/extend/router";
import { extendPinia } from "@/extend/pinia";
import { extendElement } from "@/extend/element";
import { extendScroll } from "@/extend/scroll";
import * as echarts from "echarts";
import "@/assets/font/font.css";
import "./permission";
import "@/shared/shp2JsonLayer";
import App from "@/layout/App.vue";

import "normalize.css";
import "@/assets/style/index.scss";
import "@/assets/style/mars3d.scss";
import Mars3DContainer from "@/biz/Mars3D/view/mars3d-container";
import ScreenGridContainer from "@/biz/ScrrenGrid/view/container";
import ScreenGridNode from "@/biz/ScrrenGrid/view/grid-node";
import ScreenGridSelect from "@/biz/ScrrenGrid/view/select";
Vue.use(Mars3DContainer);
Vue.use(ScreenGridContainer);
Vue.use(ScreenGridNode);
Vue.use(ScreenGridSelect);
Vue.prototype.$echarts = echarts; //挂载到Vue实例上面

const router = extendRouter(Vue);
const pinia = extendPinia(Vue);
extendElement(Vue);
extendScroll(Vue);
const app = new Vue({
    render: (h) => h(App),
    router,
    pinia,
});

app.$mount("#app");

export default app;
