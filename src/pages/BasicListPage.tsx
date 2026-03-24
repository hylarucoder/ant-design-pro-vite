import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Modal,
  Progress,
  Row,
  Segmented,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import OperationModal from '@/pages/list/basic-list/components/OperationModal';
import type { BasicListItemDataType } from '@/pages/list/basic-list/data.d';
import useStyles from '@/pages/list/basic-list/style.style';
import { loadBasicList, mutateBasicList } from '../data/demoList';

const { Search } = Input;

const Info = ({
  title,
  value,
  bordered,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}) => {
  const { styles } = useStyles();
  return (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );
};

const ListContent = ({
  data: { owner, createdAt, percent, status },
}: {
  data: BasicListItemDataType;
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.listContentItem}>
        <span>Owner</span>
        <p>{owner}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>开始时间</span>
        <p>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div className={styles.listContentItem}>
        <Progress percent={percent} status={status} size={[180, 6]} />
      </div>
    </div>
  );
};

const BasicListPage = () => {
  const { styles } = useStyles();
  const [done, setDone] = useState(false);
  const [open, setVisible] = useState(false);
  const [current, setCurrent] = useState<
    Partial<BasicListItemDataType> | undefined
  >(undefined);
  const [list, setList] = useState<BasicListItemDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const result = await loadBasicList();
    setList(result.list);
    setLoading(false);
  };

  useEffect(() => {
    void reload();
  }, []);

  const postRun = async (
    method: 'add' | 'update' | 'remove',
    params: Partial<BasicListItemDataType>,
  ) => {
    const result = await mutateBasicList(method, params);
    setList(result.list);
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = async (id: string) => {
    await postRun('remove', { id });
  };

  const editAndDelete = (
    key: string | number,
    currentItem: BasicListItemDataType,
  ) => {
    if (key === 'edit') {
      showEditModal(currentItem);
      return;
    }
    if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => deleteItem(currentItem.id),
      });
    }
  };

  const MoreBtn = ({ item }: { item: BasicListItemDataType }) => (
    <Dropdown
      menu={{
        onClick: ({ key }) => {
          editAndDelete(key, item);
        },
        items: [
          { key: 'edit', label: '编辑' },
          { key: 'delete', label: '删除' },
        ],
      }}
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  const handleSubmit = async (values: BasicListItemDataType) => {
    setDone(true);
    await postRun(values?.id ? 'update' : 'add', values);
  };

  const extraContent = (
    <div>
      <Segmented
        defaultValue="all"
        options={[
          { label: '全部', value: 'all' },
          { label: '进行中', value: 'progress' },
          { label: '等待中', value: 'waiting' },
        ]}
      />
      <Search
        className={styles.extraContentSearch}
        placeholder="请输入"
        onSearch={() => ({})}
        variant="filled"
      />
    </div>
  );

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card variant="borderless">
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>
          <Card
            className={styles.listCard}
            variant="borderless"
            title="基本列表"
            style={{ marginTop: 24 }}
            styles={{ body: { padding: '0 32px 40px 32px' } }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(event) => {
                        event.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.logo} shape="square" size="large" />
                    }
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <PlusOutlined />
        添加
      </Button>
      <OperationModal
        done={done}
        open={open}
        current={current}
        onDone={handleDone}
        onSubmit={(values) => {
          void handleSubmit(values);
        }}
      />
    </div>
  );
};

export default BasicListPage;
