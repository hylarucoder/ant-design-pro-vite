export type LoginMode = 'account' | 'mobile';

export type LoginFormValues = {
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  autoLogin?: boolean;
};

export type LoginResult = {
  status: 'ok' | 'error';
  type: LoginMode;
  currentAuthority?: 'admin' | 'user';
};

export type AuthUser = {
  name: string;
  avatar: string;
  role: 'admin' | 'user';
  email: string;
};

const AUTH_STORAGE_KEY = 'ant-design-pro-vite.auth-user';
const AUTH_CHANGE_EVENT = 'ant-design-pro-vite.auth-change';

const wait = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const createUser = (role: 'admin' | 'user'): AuthUser => {
  return {
    name: role === 'admin' ? '管理员' : '普通用户',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    role,
    email: role === 'admin' ? 'admin@ant.design' : 'user@ant.design',
  };
};

export const getStoredUser = (): AuthUser | null => {
  const value = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const clearStoredUser = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const subscribeAuthChange = (listener: () => void) => {
  window.addEventListener(AUTH_CHANGE_EVENT, listener);
  window.addEventListener('storage', listener);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
};

export const requestCaptcha = async (phone: string) => {
  await wait(500);

  if (!/^1\d{10}$/.test(phone)) {
    return {
      status: 'error' as const,
      message: '手机号格式不对',
    };
  }

  return {
    status: 'ok' as const,
    code: '1234',
  };
};

export const performLogin = async (
  values: LoginFormValues,
  type: LoginMode,
): Promise<LoginResult> => {
  await wait(700);

  if (type === 'account') {
    const validUser = values.username === 'admin' || values.username === 'user';
    const validPassword = values.password === 'ant.design';

    if (!validUser || !validPassword) {
      return {
        status: 'error',
        type,
      };
    }

    const role = values.username === 'admin' ? 'admin' : 'user';
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(createUser(role)));
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

    return {
      status: 'ok',
      type,
      currentAuthority: role,
    };
  }

  const validPhone = /^1\d{10}$/.test(values.mobile ?? '');
  const validCaptcha = values.captcha === '1234';

  if (!validPhone || !validCaptcha) {
    return {
      status: 'error',
      type,
    };
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(createUser('user')));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  return {
    status: 'ok',
    type,
    currentAuthority: 'user',
  };
};
