import type {
  ActivitiesType,
  NoticeType,
  RadarDatum,
} from '../types/workplace';

const projectNotice: NoticeType[] = [
  {
    id: 'xxx1',
    title: 'Alipay',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date().toISOString(),
    member: '科学搬砖组',
    href: '/welcome',
    memberLink: '/dashboard/workplace',
  },
  {
    id: 'xxx2',
    title: 'Angular',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24').toISOString(),
    member: '全组都是吴彦祖',
    href: '/migration',
    memberLink: '/dashboard/workplace',
  },
  {
    id: 'xxx3',
    title: 'Ant Design',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date().toISOString(),
    member: '中二少女团',
    href: '/welcome',
    memberLink: '/dashboard/workplace',
  },
  {
    id: 'xxx4',
    title: 'Ant Design Pro',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23').toISOString(),
    member: '程序员日常',
    href: '/migration',
    memberLink: '/dashboard/workplace',
  },
  {
    id: 'xxx5',
    title: 'Bootstrap',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23').toISOString(),
    member: '高逼格设计天团',
    href: '/welcome',
    memberLink: '/dashboard/workplace',
  },
  {
    id: 'xxx6',
    title: 'React',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23').toISOString(),
    member: '骗你来学计算机',
    href: '/migration',
    memberLink: '/dashboard/workplace',
  },
];

const activities: ActivitiesType[] = [
  {
    id: 'trend-1',
    updatedAt: new Date().toISOString(),
    user: {
      name: '曲丽丽',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
    group: {
      name: '高逼格设计天团',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    project: {
      name: '六月迭代',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date().toISOString(),
    user: {
      name: '付小小',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    },
    group: {
      name: '高逼格设计天团',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    project: {
      name: '六月迭代',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date().toISOString(),
    user: {
      name: '林东东',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
    },
    group: {
      name: '中二少女团',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    project: {
      name: '六月迭代',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date().toISOString(),
    user: {
      name: '周星星',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
    },
    group: {
      name: '产品工程组',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    project: {
      name: '5 月日常迭代',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date().toISOString(),
    user: {
      name: '朱偏右',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
    },
    group: {
      name: '工程效率组',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    project: {
      name: '工程效能',
      link: 'https://github.com/ant-design/ant-design-pro',
    },
    template: '在 @{group} 发布了 @{project}',
  },
];

const radarData: RadarDatum[] = [
  { name: '个人', label: '引用', value: 10 },
  { name: '个人', label: '口碑', value: 8 },
  { name: '个人', label: '产量', value: 4 },
  { name: '个人', label: '贡献', value: 5 },
  { name: '个人', label: '热度', value: 7 },
  { name: '团队', label: '引用', value: 3 },
  { name: '团队', label: '口碑', value: 9 },
  { name: '团队', label: '产量', value: 6 },
  { name: '团队', label: '贡献', value: 3 },
  { name: '团队', label: '热度', value: 1 },
  { name: '部门', label: '引用', value: 4 },
  { name: '部门', label: '口碑', value: 1 },
  { name: '部门', label: '产量', value: 6 },
  { name: '部门', label: '贡献', value: 5 },
  { name: '部门', label: '热度', value: 7 },
];

const wait = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const fetchWorkplaceData = async () => {
  await wait(120);

  return {
    projectNotice,
    activities,
    radarData,
  };
};
