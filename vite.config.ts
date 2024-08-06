import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-multi-dialog',
      formats: ['es', 'umd', 'iife'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        extend: true,
      },
    },
  },
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
});
