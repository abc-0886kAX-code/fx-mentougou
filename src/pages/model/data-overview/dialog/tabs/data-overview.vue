<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));
</script>

<template>
    <div class="data-overview">
        <div class="data-overview-info">
            <div class="data-overview-info-pond">当前积水水位:{{ config.z }}米</div>
            <div class="data-overview-info-led">LED屏当前内容:前方积水{{ config.z }}米,注意安全</div>
        </div>
        <div class="data-overview-video">
            <video src="/mp4/header-video.mp4" type="video/mp4" autoplay loop muted />
        </div>
    </div>
</template>

<style scoped lang="scss">
.data-overview {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    &-info,
    &-video {
        height: 100%;
        width: 47%;
    }
    &-info {
        display: flex;
        flex-direction: column;
        align-items: self-end;
        justify-content: center;
        font-size: 18px;
        &-pond,
        &-led {
            width: 100%;
            height: 47%;
            color: #fff;
        }
    }
}
video {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>
