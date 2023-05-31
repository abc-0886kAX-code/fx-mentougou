/*
 * @FilePath: \fx-mentougou\src\pages\model\data-overview\server\config.js
 * @Author: zhangxin
 * @Date: 2023-04-17 09:26:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-31 15:46:53
 * @Description:
 */
// 数据总览列表
export const Address = "/SiteInfo/getSiteInfoList";
export const Method = "POST";

// 数据总览站点类型下拉列表
export const SelectAddress = "/common/getSmCodeItemList";
export const SelectMethod = "GET";

// 数据总览数据图表、表格
export const ChartAddress = "/RealData/Ponding/getPondingDatalist";
export const CGartMethod = "POST";

// 数据总览详情
export const DetailsAddress = "/SiteInfo/getSiteInfoListByID";
export const DetailsMethod = "GET";

// 数据总览信息展示
export const InfoAddress = "/RealData/LEDInfo/getSiteShowInfoList";
export const InfoMethod = "POST";
