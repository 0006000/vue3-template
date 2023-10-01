import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import vuejsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import px2vw from 'postcss-px-to-viewport'
import { visualizer } from 'rollup-plugin-visualizer'

// 设计稿750
const ui_px2vw = px2vw({
  viewportWidth: 750,
  viewportUnit: 'vw',
  exclude: [/node_modules\/vant/i],
})
// vant设计宽度375
const vant_px2vw = px2vw({
  viewportWidth: 375,
  viewportUnit: 'vw',
  include: [/node_modules\/vant/i],
})

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  plugins: [
    vue(),
    vuejsx(),
    legacy({
      targets: ['defaults', '> 1%', 'not dead'],
      renderLegacyChunks: true,
    }),
    AutoImport({
      imports: [
        {
          vue: [
            'ref',
            'reactive',
            'computed',
            'watch',
            'watchEffect',
            'nextTick',
            'onActivated',
            'onBeforeMount',
            'onBeforeUnmount',
            'onMounted',
            'onUnmounted',
            'shallowRef',
          ],
          'vue-router': ['useRoute', 'useRouter', 'onBeforeRouteLeave', 'onBeforeRouteUpdate'],
          pinia: ['createPinia', 'defineStore', 'storeToRefs'],
        },
        'vue-i18n',
      ],
      dts: 'src/auto-import.d.ts',
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'jsx'],
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: '[name]',
    }),
    visualizer({
      open: true,
      gzipSize: true,
    }),
  ],
  css: {
    // postcss: {
    //   plugins: [ui_px2vw, vant_px2vw],
    // },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks: {
          common: ['vue', 'pinia', 'vue-router'],
          elementPlus: ['element-plus'],
          elementIcons: ['@element-plus/icons-vue'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
})
