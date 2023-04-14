/*
 * @Author: maggot-code
 * @Date: 2022-05-19 20:14:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 14:32:12
 * @Description: file content
 */

const defaultConfig = {
    color: "#FFF",
    activeColor: "#F56C6C",
    disabledColor: "#CCC",
};

const setupCursor = (disabled) => {
    return disabled ? "not-allowed" : "pointer";
};
const setupFontColor = (config, disabled, active) => {
    const { color, activeColor, disabledColor } = config;

    return disabled ? disabledColor : active ? activeColor : color;
};

export function useNodeStyle(options = {}) {
    const config = Object.assign({}, defaultConfig, options);

    const setupStyle = (node, activeNode) => {
        const disabled = unref(node).disabled;
        const active = unref(node).id === unref(activeNode).id;

        return {
            cursor: setupCursor(disabled),
            color: setupFontColor(config, disabled, active),
        };
    };

    return {
        setupStyle,
    };
}
