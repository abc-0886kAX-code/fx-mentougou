/*
 * @FilePath: \fx-mentougou\vite.config.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-08-29 10:47:34
 * @Description:
 */
import { defineConfig, splitVendorChunkPlugin, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

import vue from "@vitejs/plugin-vue2";
import mkcert from "vite-plugin-mkcert";
import viteCompression from "vite-plugin-compression";
import autoImport from "unplugin-auto-import/vite";
import vueComponents from "unplugin-vue-components/vite";

import lodashImport from "./plugins/lodash";
import componentImport from "./plugins/component";

import { vitePluginMars3d } from "vite-plugin-mars3d";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { VITE_ASSETS, VITE_BASE_URL } = loadEnv(mode, process.cwd());
    console.log(mode, VITE_ASSETS);
    return {
        base: VITE_ASSETS,
        clearScreen: true,
        server: {
            https: true,
            hmr: {
                overlay: true,
            },
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:8899/",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "/api"),
                },
                "/Mentougou": {
                    target: VITE_BASE_URL,
                    changeOrigin: true,
                },
                "/FXAPI": {
                    target: VITE_BASE_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: "/src",
                },
                {
                    find: "~",
                    replacement: "/src/internal",
                },
            ],
            extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
            dedupe: ["vue"],
            preserveSymlinks: false,
        },
        plugins: [
            vue(),
            splitVendorChunkPlugin(),
            mkcert(),
            autoImport({
                imports: [
                    "vue",
                    "vue-router",
                    "pinia",
                    {
                        "lodash-es": lodashImport,
                    },
                ],
                dts: true,
            }),
            vueComponents({
                version: 2.7,
                dirs: componentImport,
                extensions: ["vue", "jsx", "tsx"],
                transformer: "vue2",
                dts: true,
                deep: true,
            }),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: "gzip",
                ext: ".gz",
                deleteOriginFile: false,
            }),
            visualizer({
                filename: "./node_modules/.cache/visualizer/stats.html",
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
            vitePluginMars3d(),
        ],
        json: {
            namedExports: true,
            stringify: false,
        },
        build: {
            minify: false,
            target: "es2018", // 之前为es2015打包报错,以下为报错信息
            //Transforming async generator functions to the configured target environment ("es2015" + 2 overrides)
            // 解决文档：https://bytemeta.vip/repo/privatenumber/esbuild-loader/issues/259
            sourcemap: mode === "production" ? false : "hidden",
            chunkSizeWarningLimit: 500,
            assetsInlineLimit: 10000,
            modulePreload: true,
            cssCodeSplit: true,
            ssrManifest: false,
            emptyOutDir: true,
            manifest: false,
            write: true,
            brotliSize: false,
            rollupOptions: {
                output: {
                    chunkFileNames: `assets/js/[name]-[hash].js`,
                    entryFileNames: `assets/js/[name]-[hash].js`,
                    assetFileNames: `assets/[name]-[hash].[ext]`,
                    manualChunks: {
                        "element-ui": ["element-ui"],
                    },
                },
            },
        },
    };
});
