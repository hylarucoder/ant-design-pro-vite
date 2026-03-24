import type { BasicListItemDataType } from '@/pages/list/basic-list/data.d';
import type { CardListItemDataType } from '@/pages/list/card-list/data.d';
import type { ListItemDataType } from '@/pages/list/search/articles/data.d';

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];

const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

const descriptions = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const users = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

type DemoItem = BasicListItemDataType & CardListItemDataType & ListItemDataType;

const delay = async (ms = 240) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const buildMembers = (seed: number) => [
  {
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
    name: '曲丽丽',
    id: `member-a-${seed}`,
  },
  {
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    name: '王昭君',
    id: `member-b-${seed}`,
  },
  {
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
    name: '董娜娜',
    id: `member-c-${seed}`,
  },
];

export const createDemoItems = (count: number, prefix = 'fake-list') => {
  const list: DemoItem[] = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `${prefix}-${i}`,
      owner: users[i % users.length],
      title: titles[i % titles.length],
      avatar: avatars[i % avatars.length],
      cover:
        Math.floor(i / 4) % 2 === 0
          ? covers[i % covers.length]
          : covers[covers.length - 1 - (i % covers.length)],
      status: ['active', 'exception', 'normal', 'success'][
        i % 4
      ] as DemoItem['status'],
      percent: 50 + ((i * 9) % 50),
      logo: avatars[i % avatars.length],
      href: 'https://ant.design',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: descriptions[i % descriptions.length],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: 100000 + i * 1367,
      newUser: 1000 + i * 23,
      star: 120 + i * 7,
      like: 180 + i * 5,
      message: 18 + (i % 20),
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: buildMembers(i),
    });
  }

  return list;
};

let basicListStore = createDemoItems(50, 'basic-list');

export const loadBasicList = async () => {
  await delay();
  return {
    list: [...basicListStore],
  };
};

export const mutateBasicList = async (
  method: 'add' | 'update' | 'remove',
  payload: Partial<BasicListItemDataType>,
) => {
  await delay();

  if (method === 'remove' && payload.id) {
    basicListStore = basicListStore.filter((item) => item.id !== payload.id);
  }

  if (method === 'update' && payload.id) {
    basicListStore = basicListStore.map((item) =>
      item.id === payload.id ? ({ ...item, ...payload } as DemoItem) : item,
    );
  }

  if (method === 'add') {
    const createdAtValue =
      typeof payload.createdAt === 'number'
        ? payload.createdAt
        : payload.createdAt &&
            typeof (payload.createdAt as { valueOf: () => number }).valueOf ===
              'function'
          ? (payload.createdAt as { valueOf: () => number }).valueOf()
          : Date.now();
    const nextItem: DemoItem = {
      ...createDemoItems(1, `basic-list-new-${Date.now()}`)[0],
      ...payload,
      id: `basic-list-${Date.now()}`,
      createdAt: createdAtValue,
      updatedAt: Date.now(),
      owner: payload.owner || '付小小',
      title: payload.title || '新任务',
      subDescription: payload.subDescription || '新建任务说明',
    };
    basicListStore = [nextItem, ...basicListStore];
  }

  return {
    list: [...basicListStore],
  };
};

export const loadCardList = async (count = 8) => {
  await delay();
  return {
    list: createDemoItems(count, 'card-list'),
  };
};

export const loadSearchItems = async (count = 8, prefix = 'search-list') => {
  await delay();
  return {
    list: createDemoItems(count, prefix),
  };
};
