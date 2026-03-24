import {
  AppstoreOutlined,
  BarsOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FormOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MonitorOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Settings from "../../config/defaultSettings";
import { clearStoredUser, getStoredUser, subscribeAuthChange } from "../services/auth";

const navigationItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    children: [
      {
        key: "/dashboard/analysis",
        icon: <LineChartOutlined />,
        label: "分析页",
      },
      {
        key: "/dashboard/monitor",
        icon: <MonitorOutlined />,
        label: "监控页",
      },
      {
        key: "/dashboard/workplace",
        icon: <DashboardOutlined />,
        label: "工作台",
      },
    ],
  },
  {
    key: "/form",
    icon: <FormOutlined />,
    label: "表单页",
    children: [
      {
        key: "/form/basic-form",
        icon: <FormOutlined />,
        label: "基础表单",
      },
      {
        key: "/form/step-form",
        icon: <FormOutlined />,
        label: "分步表单",
      },
      {
        key: "/form/advanced-form",
        icon: <FormOutlined />,
        label: "高级表单",
      },
    ],
  },
  {
    key: "/list",
    icon: <TableOutlined />,
    label: "列表页",
    children: [
      {
        key: "/list/search",
        icon: <FileSearchOutlined />,
        label: "搜索列表",
        children: [
          {
            key: "/list/search/articles",
            icon: <FileTextOutlined />,
            label: "搜索列表（文章）",
          },
          {
            key: "/list/search/projects",
            icon: <AppstoreOutlined />,
            label: "搜索列表（项目）",
          },
          {
            key: "/list/search/applications",
            icon: <AppstoreOutlined />,
            label: "搜索列表（应用）",
          },
        ],
      },
      {
        key: "/list/table-list",
        icon: <BarsOutlined />,
        label: "查询表格",
      },
      {
        key: "/list/basic-list",
        icon: <UnorderedListOutlined />,
        label: "标准列表",
      },
      {
        key: "/list/card-list",
        icon: <AppstoreOutlined />,
        label: "卡片列表",
      },
    ],
  },
  {
    key: "/profile",
    icon: <FileTextOutlined />,
    label: "详情页",
    children: [
      {
        key: "/profile/basic",
        icon: <FileTextOutlined />,
        label: "基础详情页",
      },
      {
        key: "/profile/advanced",
        icon: <FileTextOutlined />,
        label: "高级详情页",
      },
    ],
  },
  {
    key: "/result",
    icon: <CheckCircleOutlined />,
    label: "结果页",
    children: [
      {
        key: "/result/success",
        icon: <CheckCircleOutlined />,
        label: "成功页",
      },
      {
        key: "/result/fail",
        icon: <CheckCircleOutlined />,
        label: "失败页",
      },
    ],
  },
  {
    key: "/exception",
    icon: <SafetyCertificateOutlined />,
    label: "异常页",
    children: [
      {
        key: "/exception/403",
        icon: <SafetyCertificateOutlined />,
        label: "403",
      },
      {
        key: "/exception/404",
        icon: <SafetyCertificateOutlined />,
        label: "404",
      },
      {
        key: "/exception/500",
        icon: <SafetyCertificateOutlined />,
        label: "500",
      },
    ],
  },
  {
    key: "/account",
    icon: <UserOutlined />,
    label: "个人页",
    children: [
      {
        key: "/account/center",
        icon: <UserOutlined />,
        label: "个人中心",
      },
      {
        key: "/account/settings",
        icon: <UserOutlined />,
        label: "个人设置",
      },
    ],
  },
] satisfies MenuProps["items"];

const flattenNavigationItems = (
  items: typeof navigationItems,
): Array<{ key: string; label: string }> => {
  return items.flatMap((item) => {
    const current =
      typeof item.key === "string" ? [{ key: item.key, label: String(item.label) }] : [];
    if ("children" in item && Array.isArray(item.children)) {
      return [...current, ...flattenNavigationItems(item.children as typeof navigationItems)];
    }
    return current;
  });
};

const matchSelectedKey = (pathname: string) => {
  const matchedItem = flattenNavigationItems(navigationItems)
    .filter((item) => pathname.startsWith(item.key))
    .sort((a, b) => b.key.length - a.key.length)[0];

  return matchedItem?.key ?? "/dashboard/workplace";
};

const AppShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const titleMap: Record<string, string> = {
    "/welcome": "欢迎页 - Ant Design Pro",
    "/migration": "迁移计划 - Ant Design Pro",
    "/dashboard/workplace": "工作台 - Ant Design Pro",
    "/dashboard/analysis": "分析页 - Ant Design Pro",
    "/dashboard/monitor": "监控页 - Ant Design Pro",
    "/form/basic-form": "基础表单 - Ant Design Pro",
    "/form/step-form": "分步表单 - Ant Design Pro",
    "/form/advanced-form": "高级表单 - Ant Design Pro",
    "/list/search/articles": "搜索列表（文章） - Ant Design Pro",
    "/list/search/projects": "搜索列表（项目） - Ant Design Pro",
    "/list/search/applications": "搜索列表（应用） - Ant Design Pro",
    "/list/table-list": "查询表格 - Ant Design Pro",
    "/list/basic-list": "标准列表 - Ant Design Pro",
    "/list/card-list": "卡片列表 - Ant Design Pro",
    "/profile/basic": "基础详情页 - Ant Design Pro",
    "/profile/advanced": "高级详情页 - Ant Design Pro",
    "/result/success": "成功页 - Ant Design Pro",
    "/result/fail": "失败页 - Ant Design Pro",
    "/exception/403": "403 - Ant Design Pro",
    "/exception/404": "404 - Ant Design Pro",
    "/exception/500": "500 - Ant Design Pro",
    "/account/center": "个人中心 - Ant Design Pro",
    "/account/settings": "个人设置 - Ant Design Pro",
  };
  document.title =
    titleMap[location.pathname] ??
    titleMap[matchSelectedKey(location.pathname)] ??
    "Ant Design Pro";

  useEffect(() => {
    return subscribeAuthChange(() => {
      setCurrentUser(getStoredUser());
    });
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    navigate("/user/login?redirect=/dashboard/workplace", { replace: true });
  };

  const menuRoutes = navigationItems.map((item) => ({
    path: item.key as string,
    name: item.label as string,
    icon: item.icon,
    routes:
      "children" in item && Array.isArray(item.children)
        ? item.children.map((child) => ({
            path: child.key as string,
            name: child.label as string,
            icon: child.icon,
            routes:
              "children" in child && Array.isArray(child.children)
                ? child.children.map((grandChild) => ({
                    path: grandChild.key as string,
                    name: grandChild.label as string,
                    icon: grandChild.icon,
                  }))
                : undefined,
          }))
        : undefined,
  }));

  return (
    <ProLayout
      {...Settings}
      title="Ant Design Pro"
      logo={Settings.logo}
      location={{ pathname: location.pathname }}
      route={{ routes: menuRoutes }}
      menuItemRender={(item, dom) => <Link to={item.path || "/welcome"}>{dom}</Link>}
      menuHeaderRender={false}
      actionsRender={() => {
        const actions = [
          <a
            key="doc"
            href="https://pro.ant.design/docs/getting-started"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              padding: 4,
              fontSize: 18,
              color: "inherit",
            }}
          >
            <QuestionCircleOutlined />
          </a>,
        ];

        if (!currentUser) {
          actions.push(
            <Button
              key="login"
              type="link"
              onClick={() => navigate("/user/login?redirect=/dashboard/workplace")}
            >
              登录
            </Button>,
          );
        }

        return actions;
      }}
      avatarProps={
        currentUser
          ? {
              src: currentUser.avatar,
              title: currentUser.name,
              render: (_, dom) => (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "center",
                        icon: <UserOutlined />,
                        label: "个人中心",
                      },
                      {
                        type: "divider",
                      },
                      {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: "退出登录",
                      },
                    ],
                    onClick: ({ key }) => {
                      if (key === "logout") {
                        handleLogout();
                      }
                    },
                  }}
                >
                  <span style={{ cursor: "pointer" }}>
                    {dom ?? <Avatar src={currentUser.avatar} />}
                  </span>
                </Dropdown>
              ),
            }
          : undefined
      }
      footerRender={() => <Footer />}
      bgLayoutImgList={[
        {
          src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
          left: 85,
          bottom: 100,
          height: "303px",
        },
        {
          src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
          bottom: -68,
          right: -45,
          height: "303px",
        },
        {
          src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
          bottom: 0,
          left: 0,
          width: "331px",
        },
      ]}
    >
      <Outlet />
    </ProLayout>
  );
};

export default AppShell;
