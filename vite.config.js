/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';
import viteImagemin from 'vite-plugin-imagemin';
import size from 'rollup-plugin-size';
import sizes from 'rollup-plugin-sizes';
import { uglify } from 'rollup-plugin-uglify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
    {
      ...viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          optimizationLevel: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      apply: 'build',
    },
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    https: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'static',
    rollupOptions: {
      plugins: [uglify(), size(), sizes()],
      output: {
        chunkFileNames: 'static/js/[name].js',
        entryFileNames: 'static/js/[name].js',
        assetFileNames: 'static/assets/[ext]/[name][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // 代码分割为第三方包
          }
          if (id.includes('src')) {
            return 'blog'; // 代码分割为业务视图
          }
        },
      },
    },
  },
});
