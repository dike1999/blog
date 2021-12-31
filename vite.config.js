/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import styleImport, { AntdResolve } from 'vite-plugin-style-import';
import viteImagemin from 'vite-plugin-imagemin';
import size from 'rollup-plugin-size';
import { uglify } from 'rollup-plugin-uglify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    styleImport({
      resolves: [AntdResolve()],
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
    viteImagemin({
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
  build: {
    outDir: 'build',
    rollupOptions: {
      plugins: [uglify(), size()],
      output: {
        chunkFileNames: 'js/[name]-[format].js',
        entryFileNames: 'js/[name].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
