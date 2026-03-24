# Ant Design Pro Vite

这是一个基于 Vite 深度优化的 [Ant Design Pro](https://pro.ant.design) 适配版本。

## 🚀 项目定位

本项目在原版 Ant Design Pro 的基础上进行了精简与重构，旨在提供一个**更轻量、响应更快、更适合 AI 辅助编程**的现代化中后台前端工程底座。

### 核心特性

- ⚡ **极致性能**：全面采用 [Vite](https://vitejs.dev/) 作为构建工具，享受秒级的热更新体验。
- 🎨 **最新技术栈**：
  - 升级至 **Ant Design v6**，带来更现代的视觉与交互体验。
  - 使用 **React 19**，紧跟前端最新趋势。
- 🤖 **AI 友好设计**：
  - 裁剪了大量冗余的配置与过渡封装，代码结构清晰、逻辑直观。
  - 非常适合使用 AI 工具（如 Cursor, Gemini, Claude）进行快速的代码生成、重构与功能扩展。
- 🛠️ **高性能工具链**：
  - 使用 [oxlint](https://github.com/oxc-project/oxc) 与 [oxfmt](https://github.com/oxc-project/oxfmt) 替代传统的 ESLint/Prettier，代码检查与格式化速度提升数个数量级。
  - 使用 [Vitest](https://vitest.dev/) 进行单元测试，与 Vite 共享配置，极速反馈。

---

## 🛠️ 常用脚本

项目中预设了一些常用的 pnpm 脚本，方便你快速开始：

### 启动开发环境

```bash
pnpm start
# 或者使用 pnpm dev
```

### 项目构建

```bash
pnpm build
```

### 代码检查与格式化

项目集成了高性能的 oxc 工具链：

```bash
# 运行完整检查 (lint + format check + typecheck)
pnpm lint

# 自动修复 lint 错误与格式化代码
pnpm lint:fix

# 仅运行格式化
pnpm format
```

### 单元测试

```bash
# 运行所有测试
pnpm test

# 查看测试覆盖率
pnpm test:coverage
```

### 类型检查

```bash
pnpm typecheck
```

---

## 📦 环境准备

- **Node.js**: >= 20.0.0
- **Package Manager**: [pnpm](https://pnpm.io/) (建议版本 >= 9)

---

## 🔗 相关资源

- [Ant Design 官方文档](https://ant.design)
- [Vite 官方文档](https://vitejs.dev/)
- [Pro Components 官方文档](https://procomponents.ant.design/)

---

## ⚖️ License

本项目基于 Ant Design Pro 修改，保留原项目的 MIT 开源协议。
