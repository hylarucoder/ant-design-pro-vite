import {
  App,
  Button,
  Col,
  Form,
  Input,
  Popover,
  Progress,
  Row,
  Select,
  Space,
} from 'antd';
import type { Store } from 'antd/es/form/interface';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from '@/pages/user/register/styles';
import { performRegister } from '../data/register';

const FormItem = Form.Item;
const { Option } = Select;

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
} as const;

const RegisterPage = () => {
  const { styles } = useStyles();
  const [count, setCount] = useState(0);
  const [open, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { message } = App.useApp();

  useEffect(() => {
    document.title = '注册 - Ant Design Pro';
    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, []);

  const passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <span>强度：强</span>
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <span>强度：中</span>
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <span>强度：太短</span>
      </div>
    ),
  };

  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    intervalRef.current = window.setInterval(() => {
      counts -= 1;
      setCount(counts);
      if (counts === 0) {
        window.clearInterval(intervalRef.current);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) return 'ok';
    if (value && value.length > 5) return 'pass';
    return 'poor';
  };

  const checkConfirm = (_: unknown, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('两次输入的密码不匹配!'));
    }
    return Promise.resolve();
  };

  const checkPassword = (_: unknown, value: string) => {
    if (!value) {
      setVisible(false);
      return Promise.reject(new Error('请输入密码!'));
    }
    if (!open) {
      setVisible(true);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return Promise.reject(new Error(''));
    }
    return Promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value?.length ? (
      <div
        className={styles[`progress-${passwordStatus}` as keyof typeof styles]}
      >
        <Progress
          status={passwordProgressMap[passwordStatus]}
          size={[240, 6]}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const onFinish = async (values: Store) => {
    setSubmitting(true);
    const result = await performRegister();
    setSubmitting(false);
    if (result.status === 'ok') {
      message.success('注册成功！');
      navigate(
        `/user/register-result?account=${encodeURIComponent(String(values.email || 'AntDesign@example.com'))}`,
        {
          replace: true,
        },
      );
    }
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form
        form={form}
        name="UserRegister"
        onFinish={(values) => {
          void onFinish(values);
        }}
      >
        <FormItem
          name="email"
          rules={[
            { required: true, message: '请输入邮箱地址!' },
            { type: 'email', message: '邮箱地址格式错误!' },
          ]}
        >
          <Input size="large" placeholder="邮箱" />
        </FormItem>
        <Popover
          getPopupContainer={(node) =>
            node?.parentNode ? (node.parentNode as HTMLElement) : node
          }
          content={
            open && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          open={open}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[{ validator: checkPassword }]}
          >
            <Input
              size="large"
              type="password"
              placeholder="至少6位密码，区分大小写"
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            { required: true, message: '确认密码' },
            { validator: checkConfirm },
          ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </FormItem>
        <FormItem
          name="mobile"
          rules={[
            { required: true, message: '请输入手机号!' },
            { pattern: /^\d{11}$/, message: '手机号格式错误!' },
          ]}
        >
          <Space.Compact style={{ width: '100%' }}>
            <Select
              size="large"
              value={prefix}
              onChange={setPrefix}
              style={{ width: '30%' }}
            >
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
            <Input size="large" placeholder="手机号" />
          </Space.Compact>
        </FormItem>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Input size="large" placeholder="验证码" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row>
        <FormItem>
          <div className={styles.footer}>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>注册</span>
            </Button>
            <Link to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default RegisterPage;
