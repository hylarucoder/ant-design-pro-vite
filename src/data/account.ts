import type { CurrentUser as CenterUser, ListItemDataType } from "@/pages/account/center/data.d";
import type {
  GeographicItemType,
  CurrentUser as SettingsCurrentUser,
} from "@/pages/account/settings/data.d";
import cityData from "@/pages/account/settings/geographic/city.json";
import provinceData from "@/pages/account/settings/geographic/province.json";
import type { AdvancedProfileData } from "@/pages/profile/advanced/data.d";
import type { BasicGood, BasicProgress } from "@/pages/profile/basic/data.d";
import { createDemoItems } from "./demoList";

const delay = async (ms = 220) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const currentUserDetail: CenterUser = {
  name: "Serati Ma",
  avatar: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  userid: "00000001",
  email: "antdesign@alipay.com",
  signature: "海纳百川，有容乃大",
  title: "交互专家",
  group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
  tags: [
    { key: "0", label: "很有想法的" },
    { key: "1", label: "专注设计" },
    { key: "2", label: "辣~" },
    { key: "3", label: "大长腿" },
    { key: "4", label: "川妹子" },
    { key: "5", label: "海纳百川" },
  ],
  notice: [
    {
      id: "xxx1",
      title: "Alipay",
      logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
      description: "那是一种内在的东西，他们到达不了，也无法触及的",
      updatedAt: new Date().toISOString(),
      member: "科学搬砖组",
      href: "https://ant.design",
      memberLink: "https://ant.design",
    },
    {
      id: "xxx2",
      title: "Angular",
      logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
      description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
      updatedAt: new Date("2017-07-24").toISOString(),
      member: "全组都是吴彦祖",
      href: "https://ant.design",
      memberLink: "https://ant.design",
    },
    {
      id: "xxx3",
      title: "Ant Design",
      logo: "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
      description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
      updatedAt: new Date().toISOString(),
      member: "中二少女团",
      href: "https://ant.design",
      memberLink: "https://ant.design",
    },
    {
      id: "xxx4",
      title: "Ant Design Pro",
      logo: "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
      description: "那时候我只会想自己想要什么，从不想自己拥有什么",
      updatedAt: new Date("2017-07-23").toISOString(),
      member: "程序员日常",
      href: "https://ant.design",
      memberLink: "https://ant.design",
    },
    {
      id: "xxx5",
      title: "Bootstrap",
      logo: "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
      description: "凛冬将至",
      updatedAt: new Date("2017-07-23").toISOString(),
      member: "高逼格设计天团",
      href: "https://ant.design",
      memberLink: "https://ant.design",
    },
    {
      id: "xxx6",
      title: "React",
      logo: "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
      description: "生命就像一盒巧克力，结果往往出人意料",
      updatedAt: new Date("2017-07-23").toISOString(),
      member: "骗你来学计算机",
      href: "https://ant.design",
      memberLink: "https://ant.design",
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: "China",
  geographic: {
    province: { label: "浙江省", key: "330000" },
    city: { label: "杭州市", key: "330100" },
  },
  address: "西湖区工专路 77 号",
  phone: "0752-268888888",
};

const basicGoods: BasicGood[] = [
  {
    id: "1234561",
    name: "矿泉水 550ml",
    barcode: "12421432143214321",
    price: "2.00",
    num: "1",
    amount: "2.00",
  },
  {
    id: "1234562",
    name: "凉茶 300ml",
    barcode: "12421432143214322",
    price: "3.00",
    num: "2",
    amount: "6.00",
  },
  {
    id: "1234563",
    name: "好吃的薯片",
    barcode: "12421432143214323",
    price: "7.00",
    num: "4",
    amount: "28.00",
  },
  {
    id: "1234564",
    name: "特别好吃的蛋卷",
    barcode: "12421432143214324",
    price: "8.50",
    num: "3",
    amount: "25.50",
  },
];

const basicProgress: BasicProgress[] = [
  {
    key: "1",
    time: "2017-10-01 14:10",
    rate: "联系客户",
    status: "processing",
    operator: "取货员 ID1234",
    cost: "5mins",
  },
  {
    key: "2",
    time: "2017-10-01 14:05",
    rate: "取货员出发",
    status: "success",
    operator: "取货员 ID1234",
    cost: "1h",
  },
  {
    key: "3",
    time: "2017-10-01 13:05",
    rate: "取货员接单",
    status: "success",
    operator: "取货员 ID1234",
    cost: "5mins",
  },
  {
    key: "4",
    time: "2017-10-01 13:00",
    rate: "申请审批通过",
    status: "success",
    operator: "系统",
    cost: "1h",
  },
  {
    key: "5",
    time: "2017-10-01 12:00",
    rate: "发起退货申请",
    status: "success",
    operator: "用户",
    cost: "5mins",
  },
];

const advancedProfileData: AdvancedProfileData = {
  advancedOperation1: [
    {
      key: "op1",
      type: "订购关系生效",
      name: "曲丽丽",
      status: "agree",
      updatedAt: "2017-10-03  19:23:12",
      memo: "-",
    },
    {
      key: "op2",
      type: "财务复审",
      name: "付小小",
      status: "reject",
      updatedAt: "2017-10-03  19:23:12",
      memo: "不通过原因",
    },
    {
      key: "op3",
      type: "部门初审",
      name: "周毛毛",
      status: "agree",
      updatedAt: "2017-10-03  19:23:12",
      memo: "-",
    },
    {
      key: "op4",
      type: "提交订单",
      name: "林东东",
      status: "agree",
      updatedAt: "2017-10-03  19:23:12",
      memo: "很棒",
    },
    {
      key: "op5",
      type: "创建订单",
      name: "汗牙牙",
      status: "agree",
      updatedAt: "2017-10-03  19:23:12",
      memo: "-",
    },
  ],
  advancedOperation2: [
    {
      key: "op1",
      type: "订购关系生效",
      name: "曲丽丽",
      status: "agree",
      updatedAt: "2017-10-03  19:23:12",
      memo: "-",
    },
  ],
  advancedOperation3: [
    {
      key: "op1",
      type: "创建订单",
      name: "汗牙牙",
      status: "agree",
      updatedAt: "2017-10-03  19:23:12",
      memo: "-",
    },
  ],
};

export const fetchCenterCurrentUser = async () => {
  await delay();
  return currentUserDetail;
};

export const fetchCenterList = async (count = 30): Promise<{ list: ListItemDataType[] }> => {
  await delay();
  return {
    list: createDemoItems(count, "account-center").map((item) => ({
      ...item,
    })) as ListItemDataType[],
  };
};

export const fetchSettingsCurrentUser = async (): Promise<SettingsCurrentUser> => {
  await delay();
  return {
    ...currentUserDetail,
    geographic: {
      province: {
        name: currentUserDetail.geographic.province.label,
        id: currentUserDetail.geographic.province.key,
      },
      city: {
        name: currentUserDetail.geographic.city.label,
        id: currentUserDetail.geographic.city.key,
      },
    },
  };
};

export const fetchProvinceOptions = async (): Promise<GeographicItemType[]> => {
  await delay();
  return provinceData as GeographicItemType[];
};

export const fetchCityOptions = async (province: string): Promise<GeographicItemType[]> => {
  await delay();
  const data = cityData as Record<string, GeographicItemType[]>;
  return data[province] || [];
};

export const fetchBasicProfile = async () => {
  await delay();
  return {
    basicProgress,
    basicGoods,
  };
};

export const fetchAdvancedProfile = async () => {
  await delay();
  return advancedProfileData;
};
