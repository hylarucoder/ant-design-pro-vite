import type {
  TableListItem,
  TableListParams,
} from '@/pages/list/table-list/data.d';

const delay = async (ms = 260) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const seedRules = (count: number): TableListItem[] =>
  Array.from({ length: count }).map((_, i) => ({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: 100 + ((i * 37) % 1000),
    status: `${i % 4}`,
    updatedAt: new Date(Date.now() - i * 1000 * 60 * 60),
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
    progress: 10 + ((i * 9) % 90),
  }));

let ruleStore: TableListItem[] = seedRules(100);

export const queryRuleList = async (params: TableListParams = {}) => {
  await delay();

  const current = Number(params.currentPage || 1);
  const pageSize = Number(params.pageSize || 10);
  let data = [...ruleStore];

  if (params.name) {
    data = data.filter((item) => item.name.includes(params.name || ''));
  }

  if (params.sorter && Object.keys(params.sorter).length > 0) {
    data.sort((a, b) => {
      let result = 0;
      Object.entries(params.sorter || {}).forEach(([key, value]) => {
        if (!result) {
          const left = a[key as keyof TableListItem];
          const right = b[key as keyof TableListItem];
          if (left === undefined || right === undefined) {
            return;
          }
          if (left === right) return;
          result = left > right ? 1 : -1;
          if (value === 'descend') {
            result *= -1;
          }
        }
      });
      return result;
    });
  }

  if (params.filter && Object.keys(params.filter).length > 0) {
    data = data.filter((item) =>
      Object.entries(params.filter || {}).every(([key, values]) => {
        if (!values?.length) return true;
        return values.includes(String(item[key as keyof TableListItem]));
      }),
    );
  }

  const start = (current - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);

  return {
    data: pageData,
    total: data.length,
    success: true,
    pageSize,
    current,
  };
};

export const addRuleItem = async (data: Partial<TableListItem>) => {
  await delay();
  const nextItem: TableListItem = {
    key: Date.now(),
    href: 'https://ant.design',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    name: data.name || '新规则',
    owner: '曲丽丽',
    desc: data.desc || '这是一段描述',
    callNo: 100 + (ruleStore.length % 50) * 13,
    status: '1',
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: 40,
  };

  ruleStore = [nextItem, ...ruleStore];
  return nextItem;
};

export const updateRuleItem = async (data: Partial<TableListItem>) => {
  await delay();
  ruleStore = ruleStore.map((item) =>
    item.key === data.key
      ? {
          ...item,
          ...data,
          updatedAt: new Date(),
        }
      : item,
  );

  return ruleStore.find((item) => item.key === data.key);
};

export const removeRuleItems = async (keys: number[]) => {
  await delay();
  ruleStore = ruleStore.filter((item) => !keys.includes(item.key));
  return true;
};
