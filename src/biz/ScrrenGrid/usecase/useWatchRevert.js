/*
 * @FilePath: \fx-mentougou\src\biz\ScrrenGrid\usecase\useWatchRevert.js
 * @Author: zhangyang
 * @Date: 2022-06-16 11:24:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 15:18:43
 * @Description:
 */
export function useWatchRevert(field, options) {
    const { setupDriver } = options;

    const watchRevert = inject("revertRefs", {
        key: "",
        skip: [],
    });
    const revertKey = computed(() => unref(watchRevert).key);
    const revertMap = computed(() => unref(watchRevert).skip);
    const isRevert = computed(() => !unref(revertMap).includes(field));

    watch(
        () => unref(revertKey),
        () => unref(isRevert) && setupDriver()
    );

    return {};
}
