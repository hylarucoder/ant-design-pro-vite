import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@ant-design/pro-card": path.resolve(__dirname, "src/pro-components/card/es"),
      "@ant-design/pro-components": path.resolve(__dirname, "src/pro-components"),
      "@ant-design/pro-descriptions": path.resolve(__dirname, "src/pro-components/descriptions"),
      "@ant-design/pro-field": path.resolve(__dirname, "src/pro-components/field/es"),
      "@ant-design/pro-form": path.resolve(__dirname, "src/pro-components/form/es"),
      "@ant-design/pro-layout": path.resolve(__dirname, "src/pro-components/layout"),
      "@ant-design/pro-provider": path.resolve(__dirname, "src/pro-components/provider/es"),
      "@ant-design/pro-skeleton": path.resolve(__dirname, "src/pro-components/skeleton/es"),
      "@ant-design/pro-table": path.resolve(__dirname, "src/pro-components/table"),
      "@ant-design/pro-utils": path.resolve(__dirname, "src/pro-components/utils/es"),
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
    host: "0.0.0.0",
    port: 8000,
    proxy: {
      "/api": {
        target: "https://proapi.azurewebsites.net",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 8000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("react-dom")) {
            return "react-dom";
          }

          if (id.includes("react-router-dom") || id.includes("@remix-run/router")) {
            return "router";
          }

          if (
            id.includes("src/pro-components") ||
            id.includes("@ant-design/pro-form") ||
            id.includes("@ant-design/pro-layout") ||
            id.includes("@ant-design/pro-table") ||
            id.includes("@ant-design/pro-descriptions")
          ) {
            return "pro-components";
          }

          if (id.includes("@ant-design/plots") || id.includes("@antv")) {
            return "charts";
          }

          if (id.includes("antd") || id.includes("@ant-design/icons") || id.includes("rc-")) {
            return "antd-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
