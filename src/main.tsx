import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import "./global.less";
import "./styles.css";
import { App as AntApp, ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 12,
          fontFamily: "AlibabaSans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }}
    >
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>,
);
