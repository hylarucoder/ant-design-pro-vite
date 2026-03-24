import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Alert, App, Tabs } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { type LoginMode, type LoginResult, performLogin, requestCaptcha } from "../services/auth";

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
      verticalAlign: "middle",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: "42px",
      position: "fixed",
      right: 16,
      borderRadius: token.borderRadius,
      textAlign: "center",
      ":hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <AlipayCircleOutlined className={styles.action} />
      <TaobaoCircleOutlined className={styles.action} />
      <WeiboCircleOutlined className={styles.action} />
    </>
  );
};

const LoginMessage = ({ content }: { content: string }) => {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
};

const LoginPage = () => {
  const [loginState, setLoginState] = useState<LoginResult | null>(null);
  const [type, setType] = useState<LoginMode>("account");
  const { styles } = useStyles();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = "登录页 - Ant Design Pro";
  }, []);

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const result = await performLogin(values, type);
      if (result.status === "ok") {
        message.success("登录成功");
        const redirect = searchParams.get("redirect") || "/dashboard/workplace";
        navigate(redirect, { replace: true });
        return;
      }

      setLoginState(result);
    } catch {
      message.error("登录失败，请重试");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>中</div>

      <div
        style={{
          flex: "1",
          padding: "32px 0",
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle="Ant Design 是西湖区最具影响力的 Web 设计规范"
          initialValues={{
            autoLogin: true,
          }}
          actions={[<span key="loginWith">其他登录方式 :</span>, <ActionIcons key="icons" />]}
          onFinish={handleSubmit}
        >
          <Tabs
            activeKey={type}
            onChange={(value) => setType(value as LoginMode)}
            centered
            items={[
              {
                key: "account",
                label: "账户密码登录",
              },
              {
                key: "mobile",
                label: "手机号登录",
              },
            ]}
          />

          {loginState?.status === "error" && loginState.type === "account" && (
            <LoginMessage content="错误的用户名和密码(admin/ant.design)" />
          )}

          {type === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                  autoComplete: "username",
                }}
                placeholder="用户名: admin or user"
                rules={[
                  {
                    required: true,
                    message: "用户名是必填项！",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                  autoComplete: "current-password",
                }}
                placeholder="密码: ant.design"
                rules={[
                  {
                    required: true,
                    message: "密码是必填项！",
                  },
                ]}
              />
            </>
          )}

          {loginState?.status === "error" && loginState.type === "mobile" && (
            <LoginMessage content="验证码错误" />
          )}

          {type === "mobile" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined />,
                  autoComplete: "tel",
                }}
                name="mobile"
                placeholder="请输入手机号！"
                rules={[
                  {
                    required: true,
                    message: "手机号是必填项！",
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "不合法的手机号！",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                  autoComplete: "one-time-code",
                }}
                captchaProps={{
                  size: "large",
                }}
                placeholder="请输入验证码！"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} 秒后重新获取`;
                  }
                  return "获取验证码";
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "验证码是必填项！",
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await requestCaptcha(phone);
                  if (result.status !== "ok") {
                    message.error(result.message);
                    return;
                  }

                  message.success(`获取验证码成功！验证码为：${result.code}`);
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
              href="https://pro.ant.design"
              target="_blank"
              rel="noreferrer"
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
