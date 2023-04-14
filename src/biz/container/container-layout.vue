<!--
 * @Author: zhangyang
 * @Date: 2022-04-12 17:44:28
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-21 14:52:56
 * @Description: file content
-->
<template>
    <div class="container-layout" :style="layoutStyle">
        <i :class="switchClassName" :style="switchStyle" @click="handlerSwitch"></i>

        <div class="container-layout-body" ref="containerBody">
            <slot>
                <ytxd-empty text="还没有增加内容" color="#F7EED6"></ytxd-empty>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "container-layout",
    mixins: [],
    components: {},
    props: {
        position: {
            type: String,
            default: "right",
        },
        width: {
            type: String,
            default: "300px",
        },
        height: {
            type: String,
            default: "auto",
        },
    },
    data() {
        //这里存放数据
        return {
            // open true close false
            switch: true,
            bodyWidth: 0,
            bodyHeight: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {
        isRight() {
            return this.position === "right";
        },
        isLeft() {
            return this.position === "left";
        },
        pos() {
            if (this.isRight) return "right";
            if (this.isLeft) return "left";
            return "right";
        },
        backPos() {
            if (this.isRight) return "left";
            if (this.isLeft) return "right";
            return "right";
        },
        switchClassName() {
            let stateClassName;
            if (this.pos === "left") {
                stateClassName = this.switch
                    ? "container-layout-switch-right container-layout-switch-open el-icon-caret-left"
                    : "container-layout-switch-right container-layout-switch-close  el-icon-caret-right";
            } else {
                stateClassName = this.switch
                    ? "container-layout-switch container-layout-switch-open el-icon-caret-right"
                    : "container-layout-switch container-layout-switch-close  el-icon-caret-left";
            }

            return stateClassName;
        },
        switchStyle() {
            return {
                [this.backPos]: "-25px",
            };
        },
        layoutBodyPosition() {
            const offset = this.switch ? `10px` : `-${this.bodyWidth}px`;
            return offset;
        },
        layoutStyle() {
            return {
                width: this.width,
                height: this.height,
                [this.pos]: this.layoutBodyPosition,
            };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handlerSwitch() {
            this.switch = !this.switch;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            const { clientWidth, clientHeight } = this.$refs.containerBody;
            this.bodyWidth = clientWidth;
            this.bodyHeight = clientHeight;
            this.$emit("bodySize", {
                width: clientWidth,
                height: clientHeight,
            });
        });
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./container-layout.scss";
</style>
