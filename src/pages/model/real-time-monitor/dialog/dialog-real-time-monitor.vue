<script setup>
import { useDialog } from "@/biz/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: String,
});
const dialog = useDialog(props.popupKeyword);
const config = computed(() => unref(dialog.config));
</script>

<template>
    <div class="dialog-real-time-monitor">{{ config }}</div>
</template>

<style scoped lang="scss">
.dialog-real-time-monitor {
    width: 100%;
    height: 100%;
}
</style>
