import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import { terser } from 'rollup-plugin-terser';

export default ({ name }: { name: string }): InlineConfig => {
  return {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      brotliSize: false,
      rollupOptions: {
        external: ['vue', '@geelato/web-vue', '@geelato/web-vue/es/icon'],
        output: [
          {
            format: 'umd',
            entryFileNames: `index.js`,
            sourcemap: true,
            globals: {
              'vue': 'Vue',
              '@geelato/web-vue': 'GeelatoVue',
              '@geelato/web-vue/es/icon': 'GeelatoVueIcon',
            },
          },
          {
            format: 'umd',
            entryFileNames: `index.min.js`,
            sourcemap: true,
            globals: {
              'vue': 'Vue',
              '@geelato/web-vue': 'GeelatoVue',
              '@geelato/web-vue/es/icon': 'GeelatoVueIcon',
            },
            // @ts-ignore
            plugins: [terser()],
          },
        ],
      },
      // 开启lib模式
      lib: {
        entry: 'components/components.ts',
        formats: ['umd'],
        name,
      },
    },
    // @ts-ignore vite内部类型错误
    plugins: [vue(), vueJsx(), svgLoader()],
  };
};
