import { UploadOutlined } from '@ant-design/icons';
import {
  GridContent,
  ProForm,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { App, Button, Input, Menu, Upload } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';
import BindingView from '@/pages/account/settings/components/binding';
import useBaseComponentStyles from '@/pages/account/settings/components/index.style';
import NotificationView from '@/pages/account/settings/components/notification';
import SecurityView from '@/pages/account/settings/components/security';
import type { CurrentUser } from '@/pages/account/settings/data.d';
import useStyles from '@/pages/account/settings/style.style';
import {
  fetchCityOptions,
  fetchProvinceOptions,
  fetchSettingsCurrentUser,
} from '../data/account';

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';

const validatorPhone = (
  _rule: unknown,
  value: string[],
  callback: (message?: string) => void,
) => {
  if (!value?.[0]) callback('Please input your area code!');
  if (!value?.[1]) callback('Please input your phone number!');
  callback();
};

const BaseSettingsView = ({ currentUser }: { currentUser?: CurrentUser }) => {
  const { styles } = useBaseComponentStyles();
  const { message } = App.useApp();

  return (
    <div className={styles.baseView}>
      {!currentUser ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={async () => {
                message.success('更新基本信息成功');
              }}
              submitter={{
                searchConfig: { submitText: '更新基本信息' },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser.phone.split('-'),
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[{ required: true, message: '请输入您的邮箱!' }]}
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[{ required: true, message: '请输入您的昵称!' }]}
              />
              <ProFormTextArea
                name="profile"
                label="个人简介"
                rules={[{ required: true, message: '请输入个人简介!' }]}
                placeholder="个人简介"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[{ required: true, message: '请输入您的国家或地区!' }]}
                options={[{ label: '中国', value: 'China' }]}
              />
              <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  rules={[{ required: true, message: '请输入您的所在省!' }]}
                  width="sm"
                  fieldProps={{ labelInValue: true }}
                  name="province"
                  request={async () => {
                    const data = await fetchProvinceOptions();
                    return data.map((item) => ({
                      label: item.name,
                      value: item.id,
                      key: item.id,
                    }));
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => (
                    <ProFormSelect
                      params={{ key: province?.value }}
                      name="city"
                      width="sm"
                      rules={[
                        { required: true, message: '请输入您的所在城市!' },
                      ]}
                      disabled={!province}
                      request={async () => {
                        if (!province?.value) return [];
                        const data = await fetchCityOptions(province.value);
                        return data.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }));
                      }}
                    />
                  )}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[{ required: true, message: '请输入您的街道地址!' }]}
              />
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  { required: true, message: '请输入您的联系电话!' },
                  { validator: validatorPhone },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <div className={styles.avatar_title}>头像</div>
            <div className={styles.avatar}>
              <img src={currentUser.avatar} alt="avatar" />
            </div>
            <Upload showUploadList={false}>
              <div className={styles.button_view}>
                <Button>
                  <UploadOutlined />
                  更换头像
                </Button>
              </div>
            </Upload>
          </div>
        </>
      )}
    </div>
  );
};

const AccountSettingsPage = () => {
  const { styles } = useStyles();
  const [config, setConfig] = useState<{
    mode: 'inline' | 'horizontal';
    selectKey: SettingsStateKeys;
  }>({
    mode: 'inline',
    selectKey: 'base',
  });
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const dom = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    void fetchSettingsCurrentUser().then(setCurrentUser);

    const resize = () => {
      requestAnimationFrame(() => {
        if (!dom.current) return;
        let mode: 'inline' | 'horizontal' = 'inline';
        const { offsetWidth } = dom.current;
        if (dom.current.offsetWidth < 641 && offsetWidth > 400)
          mode = 'horizontal';
        if (window.innerWidth < 768 && offsetWidth > 400) mode = 'horizontal';
        setConfig((state) => ({ ...state, mode }));
      });
    };

    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const menuMap: Record<SettingsStateKeys, React.ReactNode> = {
    base: '基本设置',
    security: '安全设置',
    binding: '账号绑定',
    notification: '新消息通知',
  };

  const renderChildren = () => {
    switch (config.selectKey) {
      case 'base':
        return <BaseSettingsView currentUser={currentUser} />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      case 'notification':
        return <NotificationView />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div className={styles.main} ref={dom}>
        <div className={styles.leftMenu}>
          <Menu
            mode={config.mode}
            selectedKeys={[config.selectKey]}
            onClick={({ key }) =>
              setConfig((state) => ({
                ...state,
                selectKey: key as SettingsStateKeys,
              }))
            }
            items={Object.keys(menuMap).map((item) => ({
              key: item,
              label: menuMap[item as SettingsStateKeys],
            }))}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[config.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};

export default AccountSettingsPage;
