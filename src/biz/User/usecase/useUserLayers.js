/*
 * @FilePath: \3D防汛作战\src\biz\User\usecase\useUserLayers.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:23:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 16:58:44
 * @Description: 
 */
import { computed } from "@vue/composition-api";
import { getIdentityType, getUserIdentity } from "../entity/Identity";
import {
    accordModuleSplitLayerGroup,
    findLayerService
} from "../entity/Lyaer";
import {
    AllCityIdentitySymbolKey, BasinModuleSymbolKey, BeiyunBasinSymbolKey, ChaobaiBasinSymbolKey, DaqingBasinSymbolKey, HomeBoundarySymbolKey, JiyunBasinSymbolKey, MapContainerModuleSymbolKey, YongdingBasinSymbolKey
} from "../share/context";

const BasinWhiteList = [
    getIdentityType(AllCityIdentitySymbolKey)
];

function setupBoundaryLayerConfig(Identity, service) {
    const { identity } = Identity;
    return {
        type: "arcgis",
        name: HomeBoundarySymbolKey,
        enablePickFeatures: false,
        url: service,
        layers: identity,
        zIndex: 101,
    }
}

function setupArcGISLayerConfig(name, service) {
    return {
        type: "arcgis",
        name: name,
        enablePickFeatures: false,
        url: service,
        zIndex: 101,
    }
}

export default function useUserLayers() {
    const Identity = getUserIdentity();
    const requiredUserBasin = computed(() => {
        const { identity } = Identity;

        return BasinWhiteList.includes(identity);
    });
    const layersGroup = accordModuleSplitLayerGroup(Identity);

    const findMapContainerService = findLayerService(layersGroup, MapContainerModuleSymbolKey);
    const boundaryLayer = setupBoundaryLayerConfig(Identity, findMapContainerService(HomeBoundarySymbolKey));

    const findChaobaiBaseService = findLayerService(layersGroup, BasinModuleSymbolKey);
    const chaobaiBasinLayer = setupArcGISLayerConfig(ChaobaiBasinSymbolKey, findChaobaiBaseService(ChaobaiBasinSymbolKey));


    const findJiyunBaseService = findLayerService(layersGroup, BasinModuleSymbolKey);
    const jiyunBasinLayer = setupArcGISLayerConfig(JiyunBasinSymbolKey, findJiyunBaseService(JiyunBasinSymbolKey));

    const findBeiyunBaseService = findLayerService(layersGroup, BasinModuleSymbolKey);
    const beiyunBasinLayer = setupArcGISLayerConfig(BeiyunBasinSymbolKey, findBeiyunBaseService(BeiyunBasinSymbolKey));

    const findYongdingBaseService = findLayerService(layersGroup, BasinModuleSymbolKey);
    const yongdingBasinLayer = setupArcGISLayerConfig(YongdingBasinSymbolKey, findYongdingBaseService(YongdingBasinSymbolKey));

    const findDaqingBaseService = findLayerService(layersGroup, BasinModuleSymbolKey);
    const daqingBasinLayer = setupArcGISLayerConfig(DaqingBasinSymbolKey, findDaqingBaseService(DaqingBasinSymbolKey));


    return {
        ...layersGroup,
        requiredUserBasin,

        boundaryLayer,
        chaobaiBasinLayer,
        jiyunBasinLayer,
        beiyunBasinLayer,
        yongdingBasinLayer,
        daqingBasinLayer
    }
}
