# Migrate To Vite 8 TODO

## 先说结论

这个仓库当前不是“普通 React 项目 + 旧打包器”，而是一个深度依赖 Umi Max / Ant Design Pro 的应用壳。

当前构建入口和运行时能力分散在这些位置：

- `package.json`
- `config/config.ts`
- `config/routes.ts`
- `src/app.tsx`
- `src/global.tsx`
- `src/access.ts`
- `src/requestErrorConfig.ts`
- `src/services/**`
- `jest.config.ts`

所以这次迁移的本质不是把 `max build` 改成 `vite build`，而是把下面这些能力从 Umi 体系里拆出来，再落到 Vite 8 + 明确的应用结构里：

- 路由
- 登录态初始化
- 页面权限
- 全局布局
- 国际化
- 请求封装
- Mock
- OpenAPI 生成
- 测试基建

## 推荐迁移策略

推荐方案：`先做减法，再迁移，再收尾`

不推荐方案：`直接原地把脚本从 max 改成 vite，然后边报错边补洞`

更具体地说：

- 推荐先确认哪些 Ant Design Pro 示例页面根本不需要保留。
- 推荐先把“将来不会继续用的页面和能力”从迁移范围里排除。
- 推荐新建一套 Vite 8 入口和骨架，再把真正需要保留的业务页面一批批搬过去。
- 不建议为了“少改文件”继续强绑 Umi 运行时能力，因为那样最后既不像 Umi，也不像 Vite，维护成本最高。

## 官方约束和迁移前提

- [ ] 确认 Node 版本满足 Vite 8 要求。
  - Vite 8 官方要求 Node `20.19+` 或 `22.12+`
  - 当前仓库 `package.json` 里写的是 `>=20.0.0`，需要收紧
- [ ] 确认团队接受 Vite 8 已经切到新的底层实现。
  - Vite 8 默认基于 Rolldown / Oxc
  - 一些旧配置虽然有兼容层，但不应该指望“照搬旧构建配置”
- [ ] 明确浏览器兼容目标。
  - Vite 8 默认目标比旧版本更现代
  - 如果后台要兼容更老的企业浏览器，要单独补策略

## 完成标准

迁移完成不等于“能跑起来”，而是至少满足下面这些条件：

- [ ] 本地开发可以用 Vite 正常启动
- [ ] 登录页、首页、至少 2 个真实业务页可正常访问
- [ ] 路由跳转、重定向、404、鉴权都正常
- [ ] 全局布局和菜单正常
- [ ] API 请求、错误提示、拦截逻辑正常
- [ ] 代理可用
- [ ] 现有必须保留的国际化正常
- [ ] 构建成功，产物可部署
- [ ] 旧的 Umi 专属依赖和配置已清理到可接受范围
- [ ] 测试至少恢复到迁移前的最低可用水平

## Phase 0: 冻结现状，先把基线拿稳

- [ ] 新开迁移分支，不在混杂业务改动的分支上硬做。
- [ ] 记录当前可工作的命令。
  - `pnpm start:dev`
  - `pnpm build`
  - `pnpm test`
  - `pnpm lint`
- [ ] 记录当前页面清单和真实保留范围。
  - `config/routes.ts` 里现在挂了大量 Ant Design Pro 示例页
  - 不要默认这些都要迁
- [ ] 记录当前环境变量用法。
  - `REACT_APP_ENV`
  - `MOCK`
  - `UMI_ENV`
  - `process.env.CI`
- [ ] 保存当前构建产物和关键页面截图，后面用于对比。
- [ ] 确认 `dist/` 是否还要保持同样的目录结构和部署方式。
- [ ] 确认是否还需要 `gh-pages` 这条发布链路。

## Phase 1: 先减迁移范围，不要把样板代码全搬走

这一阶段非常关键。这个仓库里目前保留了很多 Ant Design Pro 默认页面。如果未来后台不会继续用它们，先删范围比先迁范围更省。

- [ ] 逐页标记以下模块是否真的保留：
  - `src/pages/dashboard/**`
  - `src/pages/form/**`
  - `src/pages/list/**`
  - `src/pages/profile/**`
  - `src/pages/result/**`
  - `src/pages/exception/**`
  - `src/pages/account/**`
  - `src/pages/user/**`
  - `src/pages/table-list/**`
- [ ] 标记每一页属于哪一类：
  - 必须保留
  - 可以晚点再迁
  - 直接淘汰
- [ ] 同步精简 `config/routes.ts`，先得到一份“真实路由清单”。
- [ ] 把迁移范围收缩到最小闭环。
  - 建议最小闭环：登录页 + 主布局 + 首页 + 1 到 2 个真实业务页 + 404

## Phase 2: 定目标结构，先约束新世界长什么样

- [ ] 先确定目标目录结构，不要边迁边想。
- [ ] 建议的目标骨架：
  - `index.html`
  - `vite.config.ts`
  - `src/main.tsx`
  - `src/App.tsx`
  - `src/router/**`
  - `src/layouts/**`
  - `src/providers/**`
  - `src/lib/request.ts`
  - `src/auth/**`
  - `src/i18n/**`
- [ ] 明确每一块由谁替代 Umi：
  - 路由：显式路由库
  - 登录态初始化：应用级 provider
  - 权限：路由守卫或页面守卫
  - 布局：显式 layout 组件
  - 国际化：显式 i18n provider
  - 请求：本地封装的 request 客户端
- [ ] 决定是否保留 Ant Design Pro Layout 风格。
  - 如果保留，只保留视觉层和必要组件，不继续依赖 Umi 运行时注入
  - 如果不保留，就借这次迁移把外壳简化

## Phase 3: 建 Vite 8 骨架，但先不搬全部页面

- [ ] 新增 `vite.config.ts`
- [ ] 新增 `index.html`
- [ ] 新增 `src/main.tsx`
- [ ] 新增新的应用入口组件
- [ ] 先让最小页面能用 Vite 启动
- [ ] 先只做这几件事：
  - React 正常挂载
  - `global.less` 能加载
  - 静态资源能访问
  - 开发服务能跑
  - 构建能出包

### 这一阶段的依赖调整

- [ ] 新增 Vite 8 本身
- [ ] 新增 React 对应的 Vite 插件
- [ ] 决定路径别名方案
  - 优先用 Vite 8 内建的 tsconfig paths 支持，或显式配置 alias
- [ ] 暂时不要一次性删除所有 Umi 依赖
  - 先让新骨架立起来
  - 再逐步拆旧依赖

### 这一阶段的脚本调整

- [ ] 规划新脚本：
  - `dev`
  - `build`
  - `preview`
- [ ] 明确旧脚本如何退场：
  - `start`
  - `start:dev`
  - `start:test`
  - `start:pre`
  - `start:no-mock`
  - `analyze`
  - `record`
- [ ] 为新环境变量命名定规则。
  - 现在是 `REACT_APP_ENV`
  - 迁移后建议统一成 Vite 习惯的前缀

## Phase 4: 先迁“应用骨架能力”，不要先迁页面细节

### 4.1 路由

- [ ] 把 `config/routes.ts` 转成显式路由定义
- [ ] 处理这些 Umi 路由特性对应关系：
  - `redirect`
  - 嵌套路由
  - `layout: false`
  - 404 兜底
  - `Outlet`
- [ ] 把菜单元信息从 Umi 路由配置中抽出来
- [ ] 确保登录页和主应用壳是两套不同布局

### 4.2 登录态和全局初始化

- [ ] 把 `src/app.tsx` 里的 `getInitialState` 逻辑迁出
- [ ] 新建显式的登录态初始化层
- [ ] 明确页面首次进入时要做什么：
  - 取当前用户
  - 失败时跳登录
  - 初始化全局设置
- [ ] 不再依赖 `useModel('@@initialState')`
- [ ] 把 `history.push` 之类的用法改成新路由方案

### 4.3 权限

- [ ] 把 `src/access.ts` 的能力改成显式权限判断
- [ ] 明确最小权限模型：
  - 未登录
  - 已登录普通用户
  - 管理员
- [ ] 补一层通用页面守卫
- [ ] 让菜单显隐和页面访问规则使用同一份权限来源

### 4.4 全局布局

- [ ] 把 `src/app.tsx` 里的布局逻辑从 Umi runtime config 改成普通 React 组件
- [ ] 迁出这些能力：
  - 顶部操作区
  - 用户头像下拉
  - 页脚
  - 水印
  - 开发态设置抽屉
  - 背景图装饰
- [ ] 明确哪些是“上线要留”的，哪些只是样板功能

## Phase 5: 请求层先做兼容层，再改业务代码

当前最大改动面之一是 `src/services/**`，它们普遍直接从 `@umijs/max` 引用 `request`。

- [ ] 新建本地 `request` 兼容层
- [ ] 先让业务侧尽量少改调用方式
- [ ] 把下面这些能力迁进去：
  - 基础地址
  - 请求拦截
  - 响应拦截
  - 错误提示
  - `skipErrorHandler` 一类的开关
- [ ] 迁移 `src/requestErrorConfig.ts` 的行为，不只是迁文件名
- [ ] 批量替换以下目录中的 `request` 来源：
  - `src/services/ant-design-pro/**`
  - `src/services/swagger/**`
  - `src/pages/**/service.ts`
- [ ] 检查返回值格式有没有偷偷依赖 Umi 的实现细节
- [ ] 跑一遍登录、列表、详情、提交、登出

## Phase 6: 国际化从隐式注入改成显式接线

当前项目依赖的不是“翻译文件”，而是 Umi 提供的国际化运行时。

- [ ] 盘点以下用法：
  - `useIntl`
  - `FormattedMessage`
  - `SelectLang`
- [ ] 复用现有翻译资源：
  - `src/locales/**`
- [ ] 建新的国际化 provider
- [ ] 把语言切换器单独做出来
- [ ] 确保以下页面先恢复正常：
  - 登录页
  - 404
  - 至少一个主业务页
- [ ] 如果最终后台只需要中文，明确是否顺手砍掉多语言复杂度

## Phase 7: 页面标题、全局脚本、静态资源

- [ ] 把 Umi 的 `Helmet` 相关能力替换成显式方案
- [ ] 迁移登录页标题设置
- [ ] 把 `headScripts` 里的 `public/scripts/loading.js` 接到新的入口
- [ ] 校验这些静态资源路径在 Vite 下是否保持可用：
  - `public/logo.svg`
  - `public/pro_icon.svg`
  - `public/favicon.ico`
  - `public/icons/**`
- [ ] 确认 `PUBLIC_PATH` / `publicPath` 的需求如何映射到 Vite 的 `base`

## Phase 8: Mock、代理、环境变量

### 8.1 代理

- [ ] 把 `config/proxy.ts` 迁到 Vite 开发代理配置
- [ ] 保留当前环境区分逻辑：
  - `dev`
  - `test`
  - `pre`
- [ ] 明确哪些环境只是本地代理，哪些是构建时变量

### 8.2 Mock

- [ ] 盘点当前 Mock 是否真的还在用：
  - `mock/**`
  - `src/pages/**/_mock.ts`
- [ ] 做一个决策：
  - 第一阶段先彻底关闭 Mock
  - 或者单独补一套新 Mock 方案
- [ ] 不建议在迁移主线里同时重做 Mock 和业务页面

### 8.3 环境变量

- [ ] 把这些旧变量迁移或淘汰：
  - `REACT_APP_ENV`
  - `UMI_ENV`
  - `MOCK`
- [ ] 统一新变量命名规则
- [ ] 检查源码里所有 `process.env.*` 用法，避免构建后变成空值

## Phase 9: OpenAPI 生成先止血，再恢复自动化

当前仓库通过 `max openapi` 生成服务代码，这一条会随着 Umi 退出而断掉。

- [ ] 先确认当前真正还在用哪些生成文件：
  - `src/services/ant-design-pro/**`
  - `src/services/swagger/**`
- [ ] 第一阶段先保证“已有生成结果能继续用”
- [ ] 不要把“迁 Vite”和“重选 OpenAPI 方案”绑死在同一天
- [ ] 第二阶段再决定新的 OpenAPI 生成工具和命令
- [ ] 新生成器落地前，先把 `request` 来源替换成本地兼容层

## Phase 10: 测试体系脱离 Umi

当前测试配置直接依赖 `@umijs/max/test`，这意味着迁到 Vite 后测试也必须处理。

- [ ] 先确认哪些测试必须保留
- [ ] 盘点当前测试依赖点：
  - `jest.config.ts`
  - `tests/setupTests.jsx`
  - `src/pages/user/login/login.test.tsx`
- [ ] 第一阶段建议目标：
  - 先继续保留 Jest
  - 但移除对 Umi test helper 的依赖
- [ ] 第二阶段再决定是否切到更贴近 Vite 的测试方案
- [ ] 恢复以下最小测试覆盖：
  - 登录页渲染
  - 登录失败提示
  - 至少一个受保护页面跳转逻辑

## Phase 11: Service Worker / PWA 能力单独处理

`src/global.tsx` 里存在对 `sw.offline` 和 `sw.updated` 事件的处理，这类能力不是 Vite 自动接手的。

- [ ] 先确认后台是否真的需要 PWA
- [ ] 如果不需要：
  - 迁移时直接去掉这套复杂度
- [ ] 如果需要：
  - 单独补新的 service worker 方案
  - 重新验证离线提示、更新提示、缓存清理
- [ ] 不要默认指望旧事件机制还能继续工作

## Phase 12: 样式和资源兼容性核对

- [ ] 验证 `.less` 是否全部正常工作
- [ ] 重点检查这些位置：
  - `src/global.less`
  - `src/pages/dashboard/**/style.less`
  - `src/pages/form/**/style.less`
- [ ] 检查按需样式引入是否还符合预期
- [ ] 检查 CSS 变量、主题 token、字体设置是否保真
- [ ] 检查图片路径、字体路径、背景图路径

## Phase 13: 构建和部署收口

- [ ] 对齐新的开发命令、构建命令、预览命令
- [ ] 确认构建输出目录仍然是 `dist`
- [ ] 确认部署系统是否依赖旧产物结构
- [ ] 如果有非根路径部署，验证 `base` 配置
- [ ] 重新验证静态文件缓存策略
- [ ] 重新验证构建后直接访问深链接页面不会 404

## Phase 14: 清理旧世界

- [ ] 删除不再使用的 Umi 配置
  - `config/config.ts`
  - `config/routes.ts`
  - `config/proxy.ts`
  - `config/oneapi.json` 是否保留要单独判定
- [ ] 删除不再使用的 Umi 运行时文件
  - `src/app.tsx`
  - `src/access.ts`
  - `src/global.tsx`
  - `src/requestErrorConfig.ts` 如果已被新实现替代
- [ ] 删除 Umi 相关脚本
- [ ] 删除 Umi 相关依赖
- [ ] 清理 `tsconfig.json` 里只服务 Umi 的路径别名
  - `@@/*`
  - `@@test/*`
- [ ] 清理 README 里的旧启动说明

## 逐项核对清单

### 启动

- [ ] `pnpm dev` 能启动
- [ ] 首页无白屏
- [ ] 控制台无明显报错

### 登录

- [ ] 登录页正常显示
- [ ] 登录成功后跳转正常
- [ ] 未登录访问受保护页会被拦回登录页
- [ ] 登出后会回到登录页

### 导航

- [ ] 菜单正常显示
- [ ] 重定向正常
- [ ] 404 正常
- [ ] 刷新深链接页面正常

### 请求

- [ ] 代理正常
- [ ] 请求头和参数正常
- [ ] 错误提示正常
- [ ] 接口失败时不会静默坏掉

### 构建

- [ ] `pnpm build` 成功
- [ ] 产物可本地预览
- [ ] 静态资源路径正确

### 回归

- [ ] 至少核对一遍登录页视觉
- [ ] 至少核对一遍主布局视觉
- [ ] 至少核对一遍一个表格页或列表页行为

## 风险清单

- [ ] 风险 1：页面看起来很多，实际大部分是样板页，误迁会浪费大量时间
- [ ] 风险 2：`@umijs/max` 不只是构建工具，拆不干净会出现“到处都少一点”的问题
- [ ] 风险 3：`request` 层如果不先做兼容层，业务代码改动面会爆炸
- [ ] 风险 4：国际化和语言切换看似小，实际上分散在很多页面里
- [ ] 风险 5：测试和 OpenAPI 生成都绑着 Umi，容易被漏掉
- [ ] 风险 6：Service Worker 逻辑如果不明确处理，迁移后会出现难查的缓存问题

## 建议的实际执行顺序

- [ ] 第 1 天：确认保留页面范围，删掉不迁的样板路由
- [ ] 第 2 天：立起 Vite 8 骨架，跑通最小页面
- [ ] 第 3 天：迁路由、登录态、权限、布局骨架
- [ ] 第 4 天：迁请求层兼容层，跑通登录和至少一个真实页面
- [ ] 第 5 天：迁国际化、标题、静态资源、代理
- [ ] 第 6 天：恢复测试、清理旧依赖、回归验证

## 这个仓库最值得先做的两个决定

- [ ] 决定 1：哪些 Ant Design Pro 默认页面根本不保留
- [ ] 决定 2：登录态、权限、菜单这套壳子是继续保留复杂度，还是借迁移顺手简化

如果这两个决定不先做，后面的待办会越写越细，但实际工作量会持续失真。

## 参考

- Vite 8 发布说明: https://vite.dev/blog/announcing-vite8
- Vite 迁移指南: https://vite.dev/guide/migration.html
