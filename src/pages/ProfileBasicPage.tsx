import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Badge, Card, Descriptions, Divider } from 'antd';
import type { BasicGood, BasicProgress } from '@/pages/profile/basic/data.d';
import useStyles from '@/pages/profile/basic/style.style';
import { fetchBasicProfile } from '../data/account';
import { useAsyncData } from '../hooks/useAsyncData';

const progressColumns: ProColumns<BasicProgress>[] = [
  { title: '时间', dataIndex: 'time', key: 'time' },
  { title: '当前进度', dataIndex: 'rate', key: 'rate' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: React.ReactNode) =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  { title: '操作员ID', dataIndex: 'operator', key: 'operator' },
  { title: '耗时', dataIndex: 'cost', key: 'cost' },
];

const ProfileBasicPage = () => {
  const { styles } = useStyles();
  const { data, loading } = useAsyncData(fetchBasicProfile, []);
  const basicGoods = data?.basicGoods || [];
  const basicProgress = data?.basicProgress || [];
  let goodsData: typeof basicGoods = [];

  if (basicGoods.length) {
    let num = 0;
    let amount = 0;
    basicGoods.forEach((item) => {
      num += Number(item.num);
      amount += Number(item.amount);
    });
    goodsData = basicGoods.concat({ id: '总计', num, amount });
  }

  const renderContent = (value: React.ReactNode, _: unknown, index: number) => {
    const obj: { children: React.ReactNode; props: { colSpan?: number } } = {
      children: value,
      props: {},
    };
    if (index === basicGoods.length) obj.props.colSpan = 0;
    return obj;
  };

  const goodsColumns: ProColumns<BasicGood>[] = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: React.ReactNode, _: unknown, index: number) =>
        index < basicGoods.length ? (
          <span>{text}</span>
        ) : (
          {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: { colSpan: 4 },
          }
        ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    },
    {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: renderContent,
    },
    {
      title: '数量（件）',
      dataIndex: 'num',
      key: 'num',
      align: 'right',
      render: (text: React.ReactNode, _: unknown, index: number) =>
        index < basicGoods.length ? (
          text
        ) : (
          <span style={{ fontWeight: 600 }}>{text}</span>
        ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (text: React.ReactNode, _: unknown, index: number) =>
        index < basicGoods.length ? (
          text
        ) : (
          <span style={{ fontWeight: 600 }}>{text}</span>
        ),
    },
  ];

  return (
    <PageContainer>
      <Card variant="borderless">
        <Descriptions title="退款申请" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
          <Descriptions.Item label="状态">已取货</Descriptions.Item>
          <Descriptions.Item label="销售单号">1234123421</Descriptions.Item>
          <Descriptions.Item label="子订单">3214321432</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="用户信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
          <Descriptions.Item label="联系电话">18100000000</Descriptions.Item>
          <Descriptions.Item label="常用快递">菜鸟仓储</Descriptions.Item>
          <Descriptions.Item label="取货地址">
            浙江省杭州市西湖区万塘路18号
          </Descriptions.Item>
          <Descriptions.Item label="备注">无</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>退货商品</div>
        <ProTable
          style={{ marginBottom: 24 }}
          pagination={false}
          search={false}
          loading={loading}
          options={false}
          toolBarRender={false}
          dataSource={goodsData}
          columns={goodsColumns}
          rowKey="id"
        />
        <div className={styles.title}>退货进度</div>
        <ProTable
          style={{ marginBottom: 16 }}
          pagination={false}
          loading={loading}
          search={false}
          options={false}
          toolBarRender={false}
          dataSource={basicProgress}
          columns={progressColumns}
        />
      </Card>
    </PageContainer>
  );
};

export default ProfileBasicPage;
