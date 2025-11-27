import { defineConfig } from 'vite';
import {createVuePlugin} from 'vite-plugin-vue2';
import postcssMobileForever from "postcss-mobile-forever";
import { resolve } from 'path';
export default defineConfig({
    base:'ndx100',
    plugins: [createVuePlugin()],
    css:{
        postcss:{
            plugins: [
                postcssMobileForever({
                    viewportWidth: 1920,
                    appSelector: "#app",
                    maxDisplayWidth:2000,
                    experimental:{
                        minDisplayWidth:1366
                    }
                }),
            ],
        }
    },
    // build: {
    //     // 指定输出目录
    //     outDir: 'dist',
    //     // 生成静态资源到指定目录，默认是相对路径
    //     assetsDir: 'assets',
    //     // 关闭 source map（可选，减少文件体积）
    //     sourcemap: false,
    //     // 确保打包为单文件或静态可打开的模式
    //     rollupOptions: {
    //         input: resolve(__dirname, 'index.html'), // 明确指定入口 HTML 文件
    //         output: {
    //             // 自定义输出文件名（可选）
    //             entryFileNames: 'assets/[name].js',
    //             chunkFileNames: 'assets/[name].js',
    //             assetFileNames: 'assets/[name].[ext]',
    //         },
    //     },
    // },
});
