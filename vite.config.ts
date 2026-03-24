import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://proapi.azurewebsites.net',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 8000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('react-dom')) {
            return 'react-dom';
          }

          if (
            id.includes('react-router-dom') ||
            id.includes('@remix-run/router')
          ) {
            return 'router';
          }

          if (
            id.includes('@ant-design/pro-components') ||
            id.includes('@ant-design/pro-form')
          ) {
            return 'pro-components';
          }

          if (id.includes('@ant-design/plots') || id.includes('@antv')) {
            return 'charts';
          }

          if (
            id.includes('antd') ||
            id.includes('@ant-design/icons') ||
            id.includes('rc-')
          ) {
            return 'antd-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
});
