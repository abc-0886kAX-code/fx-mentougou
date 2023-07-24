/*
 * @FilePath: \fx-mentougou\src\shared\shp2JsonLayer.js
 * @Author: zhangxin
 * @Date: 2023-05-17 14:57:07
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-07-24 14:57:04
 * @Description:
 */
import * as shpUtil from 'shp-geojson'
import * as mars3d from "mars3d";
/**
 * 閫氳繃杞琯eojson鏂瑰紡 鍔犺浇shp鏂囦欢銆�
 * shpUtil 浣跨敤闇€瑕佸紩鍏� ../lib/geojson/shp-geojson.js鏂囦欢
 */
class Shp2JsonLayer extends mars3d.layer.GeoJsonLayer {
    /**
     * 鍔犺浇鏂版暟鎹� 鎴� 鍒锋柊鏁版嵁
     *
     * @param {Object} [newOptions] 鏂拌瀹氱殑鍙傛暟锛屼細涓庣被鐨勬瀯閫犲弬鏁板悎骞躲€�
     * @param {String} [newOptions.url] geojson鏂囦欢鎴栨湇鍔rl鍦板潃
     * @param {Object} [newOptions.data] geojson鏍煎紡瑙勮寖鏁版嵁瀵硅薄锛屼笌url浜岄€変竴鍗冲彲銆�
     * @param {Object} [newOptions.绫诲弬鏁癩 鍖呭惈褰撳墠绫绘敮鎸佺殑鎵€鏈夊弬鏁�
     * @param {BaseGraphicLayer.ConstructorOptions} [newOptions.閫氱敤鍙傛暟] 鍖呭惈鐖剁被鏀寔鐨勬墍鏈夊弬鏁�
     * @return {this} 褰撳墠瀵硅薄鏈韩锛屽彲浠ラ摼寮忚皟鐢�
     */
    load(newOptions) {
        if (newOptions) {
            if (Cesium.defaultValue(newOptions.clear, true)) {
                delete this.options.url;
                delete this.options.data;
            }
            this.clear();

            this.options = {
                ...this.options,
                ...newOptions,
            };
        }

        // url鏄渶瑕佸寘鎷瑂hp銆乨bf銆乸rj绛夋枃浠剁殑zip鍘嬬缉鍖�
        if (this.options.url) {
            shpUtil
                .toGeoJSON(this.options.url, undefined, "gbk")
                .then((data) => {
                    if (this._state === mars3d.State.REMOVED) {
                        return;
                    }
                    this._load_data(data);
                })
                .catch(function (error) {
                    console.error("鏈嶅姟鍑洪敊", error);
                });
        } else {
            if (newOptions) {
                console.warn("Shp2JsonLayer锛氭病鏈変紶鍏� url 鍙傛暟,璇风‘璁ゆ槸鍚︽湁璇€�");
            }
        }
    }
}

mars3d.layer.Shp2JsonLayer = Shp2JsonLayer;

// 娉ㄥ唽涓�
mars3d.LayerUtil.register("kml2json", Shp2JsonLayer);
