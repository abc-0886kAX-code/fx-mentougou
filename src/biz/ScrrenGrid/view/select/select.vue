<!--
 * @Author: maggot-code
 * @Date: 2022-05-19 14:39:23
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-14 15:36:55
 * @Description: trigger="hover" trigger="click"
-->
<template>
    <el-popover popper-class="screen-grid-select-popover" v-model="visable" :disabled="usePopover" :width="width" placement="right" trigger="click">
        <div slot="reference" class="screen-grid-select">
            <span class="screen-grid-select-icon">
                <i :class="icon"></i>
            </span>
            <p class="screen-grid-select-label">
                {{ label }}
            </p>
            <span v-if="!usePopover" class="screen-grid-select-more">更多</span>
        </div>

        <div class="screen-grid-popup">
            <template v-for="item in menuRaw">
                <screen-grid-select-node :key="item.id" :active="activeNode" :cell="item" :children="item.children" @toEvent="useSelectEvent">
                    <template #default="{ cell }">
                        <slot :cell="cell" :activeNode="activeNode"></slot>
                    </template>
                </screen-grid-select-node>
            </template>
        </div>
    </el-popover>
</template>

<script>
import { useUserStore } from "@/store/useUser";
import { isNil, isArray, isBoolean } from "lodash-es";
import { useLabel } from "@/biz/ScrrenGrid/usecase/useLabel";

import ScreenGridSelectNode from "./select-node.vue";

const transformMenu = (parent) => (item) => {
    const { children, disabled, id, dialog, component, render, fragment } = item;
    const hasParent = !isNil(parent);
    const parentId = hasParent ? parent.id : 0;
    const path = hasParent ? [...parent.path, id] : [id];
    const isDisabled = isBoolean(disabled) ? disabled : false;
    const isRender = isBoolean(render) ? render : true;
    const isFragment = isBoolean(fragment) ? fragment : false;
    const revert = !isFragment;
    const raw = Object.assign({}, item, {
        parent: parentId,
        path,
        level: path.length,
        disabled: isDisabled || (isNil(dialog) && isNil(component)),
        render: isRender,
        fragment: isFragment,
        revert,
    });

    if (isRender && isArray(children) && children.length > 0) raw.children = children.map(transformMenu(raw)).filter((item) => !isNil(item));

    return isRender ? raw : null;
};

function findActive(menu, { id }) {
    let stark = [];
    stark = stark.concat(menu);

    while (stark.length) {
        let temp = stark.shift();
        if (temp.children) {
            stark = stark.concat(temp.children);
        }
        if (temp.id === id) {
            return temp;
        }
    }
}

export default {
    name: "screen-grid-select",
    mixins: [],
    components: {
        ScreenGridSelectNode,
    },
    props: {
        menu: {
            type: Array,
            default: () => [],
        },
        active: {
            type: [String, Number],
            required: true,
        },
        icon: {
            type: String,
            default: "el-icon-platform-eleme",
        },
        width: {
            type: Number,
            default: 280,
        },
    },
    emit: ["update:active", "toDialog", "toComponent"],
    setup(props, context) {
        const visable = ref(false);
        const menuToPower = computed(() => {
            const user = useUserStore();
            const cachePower = user.userpower;
            return props.menu.filter((item) => {
                const { power } = item;
                if (isNil(power)) return true;
                const userPower = isNil(cachePower) ? 0 : +cachePower;
                return power.includes(userPower);
            });
        });
        const usePopover = computed(() => {
            const menuLen = unref(menuToPower).length;

            if (menuLen <= 0) return true;

            const [first] = unref(menuToPower);
            const { children } = first;
            const childLen = children?.length ?? 0;

            return childLen + menuLen <= 1;
        });
        const menuRaw = computed(() =>
            unref(menuToPower)
                .map(transformMenu())
                .filter((item) => !isNil(item))
        );

        const activeFragment = computed(() => unref(menuToPower)[0]);
        const activeNode = computed({
            get: () => {
                const activeRaw = findActive(unref(menuRaw), {
                    id: props.active,
                });
                context.emit("toComponent", activeRaw ?? unref(activeFragment));
                return activeRaw ?? unref(activeFragment);
            },
            set: (val) => {
                const { id } = findActive(unref(menuRaw), val);
                context.emit("update:active", id ?? unref(activeFragment).id);
            },
        });

        const useDialog = (active) => {
            visable.value = false;

            context.emit("toDialog", active);
        };

        const useComponent = (active) => {
            visable.value = false;
            activeNode.value = active;
        };

        const useSelectEvent = (cell) => {
            const { dialog, component } = cell ?? unref(activeFragment);

            if (dialog) return useDialog(cell);

            if (component) return useComponent(cell);
        };

        return {
            visable,
            menuRaw,
            usePopover,
            activeNode,
            ...useLabel(activeNode),
            useSelectEvent,
        };
    },
};
</script>
<style lang="scss" scoped>
@import "./select.scss";
</style>
