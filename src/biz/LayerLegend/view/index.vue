<!--
 * @FilePath: \fx-mentougou\src\biz\LayerLegend\view\index.vue
 * @Author: zhangxin
 * @Date: 2023-04-14 16:10:57
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 16:43:44
 * @Description:
-->
<script setup>
import { useLayerLegend } from "../store/useLayerLegend";
import { storeToRefs } from "pinia";
const legendStore = useLayerLegend();
const { checkList, isHasLayer } = storeToRefs(legendStore);
function handlerChange() {}
</script>

<template>
    <div class="layer-legend" v-if="isHasLayer">
        <div class="layer-legend-head">
            <div class="layer-legend-head-label">
                <p>图例</p>
                <p>描述</p>
                <p>数量</p>
            </div>
        </div>
        <el-checkbox-group class="layer-legend-body" v-model="checkList" @change="handlerChange">
            <template v-for="item in group">
                <el-checkbox class="layer-legend-body-item" :key="item.keyword" :label="item.keyword">
                    <div class="layer-legend-body-item-label">
                        <img :src="setupIcon(item)" :alt="item.label" />
                        <p>{{ item.label }}</p>
                        <p style="transition: all 0.3s">{{ item.size }}</p>
                    </div>
                </el-checkbox>
            </template>
        </el-checkbox-group>
    </div>
</template>

<style scoped lang="scss">
.layer-legend {
    display: flex;
    flex-direction: column;
    min-width: 260px;
    padding: 6px 12px;
    background: url("@/assets/images/home/box-banner.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;

    &-head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border: 1px solid;
        border-left: none;
        border-right: none;
        border-top: none;
        border-image: linear-gradient(-270deg, rgba(#4fd6e8, 0) 0%, rgba(#4fd6e8, 1) 50%, rgba(#4fd6e8, 0) 100%) 1 1 1 1;
        box-sizing: border-box;

        &-label {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            color: #1ad3c3;
            padding-left: 10px;
            box-sizing: border-box;

            & p {
                flex: 1;
                text-align: center;
                text-shadow: 0 0 1px #1ad3c3;
            }
        }

        &::before {
            content: "";
            display: block;
            // 对齐 el-checkbox 的选择按钮
            width: 14px;
        }
    }

    &-body {
        width: 100%;
        display: flex;
        flex-direction: column;

        &-item {
            display: flex;
            align-items: center;
            width: 100%;
            height: 24px;

            &-label {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 100%;
                line-height: 24px;

                & img,
                & p {
                    flex: 1;
                    text-align: center;
                }

                & p {
                    color: #fff;
                }

                & p:last-child {
                    color: #facc01;
                }

                & img {
                    width: 16px;
                    height: 16px;
                    object-fit: contain;
                    overflow: hidden;
                }
            }
        }
    }
}

:deep(.el-checkbox__label) {
    width: 100%;
}
</style>
