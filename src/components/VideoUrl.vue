<!--
 * @FilePath: \明湖数字大厅\src\components\VideoUrl.vue
 * @Author: zhangyang
 * @Date: 2023-02-02 16:11:21
 * @LastEditors: zhangyang
 * @LastEditTime: 2023-03-09 21:50:41
 * @Description:
-->
<script setup>
import { useElementRefs } from "@/hooks/useElement";

const emits = defineEmits(["onError"]);
const { refs, ready } = useElementRefs();
const props = defineProps({
    url: {
        type: String,
        default: "",
    },
    fit: {
        type: String,
        default: "contain",
    },
});
const flvPlayer = ref(null);
const loading = ref(true);
const videoStyle = computed(() => {
    return {
        "object-fit": unref(props).fit,
    };
});
async function defineVideo() {
    loading.value = true;
    flvPlayer.value = window.flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false,
        url: props.url,
    });
    flvPlayer.value.attachMediaElement(unref(refs));
    flvPlayer.value.load();
    flvPlayer.value.play();
    flvPlayer.value.on(window.flvjs.Events.ERROR, (error) => {
        emits("onError", error);
        loading.value = false;
    });
    loading.value = false;
}

watch(ready, (state) => {
    if (state && window.flvjs.isSupported() && isNil(unref(flvPlayer)))
        defineVideo();
});
onMounted(() => {
    loading.value = true;
});
onUnmounted(() => {
    if (isNil(unref(flvPlayer))) return;

    unref(flvPlayer).pause();
    unref(flvPlayer).unload();
    // unref(flvPlayer).detachMediaElement();
    unref(flvPlayer).destroy();

    loading.value = false;
    flvPlayer.value = null;
});
</script>

<template>
    <div class="video-url" v-loading="loading">
        <video class="video-url-main" :style="videoStyle" ref="refs" muted="muted" autoplay="autoplay" loop="loop"
            controls></video>
        <div class="video-url-slot">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.video-url {
    width: 100%;
    height: 100%;
    // background-color: #ddd;
    overflow: hidden;

    &-slot {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &-main {
        width: 100%;
        height: 100%;
        // pointer-events: none;
        overflow: hidden;
    }
}
</style>
