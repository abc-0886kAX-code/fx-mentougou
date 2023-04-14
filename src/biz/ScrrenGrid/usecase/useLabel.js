/*
 * @Author: maggot-code
 * @Date: 2022-05-19 20:14:33
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:32:49
 * @Description: file content
 */

export function useLabel(node) {
    const label = computed(() => {
        return unref(node)?.label ?? `节点${unref(node).id}`;
    });

    return {
        label,
    };
}
