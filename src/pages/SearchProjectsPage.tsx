import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { categoryOptions } from '@/pages/list/mock';
import AvatarList from '@/pages/list/search/projects/components/AvatarList';
import StandardFormRow from '@/pages/list/search/projects/components/StandardFormRow';
import TagSelect from '@/pages/list/search/projects/components/TagSelect';
import type { ListItemDataType } from '@/pages/list/search/projects/data.d';
import useStyles from '@/pages/list/search/projects/style.style';
import { loadSearchItems } from '../data/demoList';

dayjs.extend(relativeTime);

const FormItem = Form.Item;
const { Paragraph } = Typography;

const SearchProjectsPage = () => {
  const { styles } = useStyles();
  const [list, setList] = useState<ListItemDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const result = await loadSearchItems(8, 'project-search');
    setList(result.list);
    setLoading(false);
  };

  useEffect(() => {
    void reload();
  }, []);

  return (
    <div className={styles.coverCardList}>
      <Card variant="borderless">
        <Form
          layout="inline"
          onValuesChange={() => {
            void reload();
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                {categoryOptions
                  .filter(
                    (
                      category,
                    ): category is { value: string | number; label: string } =>
                      category.value !== undefined && category.value !== null,
                  )
                  .map((category) => (
                    <TagSelect.Option
                      value={category.value}
                      key={category.value}
                    >
                      {category.label}
                    </TagSelect.Option>
                  ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem
                  wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                  label="作者"
                  name="author"
                >
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[{ label: '王昭君', value: 'lisa' }]}
                  />
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem
                  wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                  label="好评度"
                  name="rate"
                >
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      { label: '优秀', value: 'good' },
                      { label: '普通', value: 'normal' },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>
        <List<ListItemDataType>
          rowKey="id"
          loading={loading}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Card
                className={styles.card}
                hoverable
                cover={<img alt={item.title} src={item.cover} />}
              >
                <Card.Meta
                  title={<a>{item.title}</a>}
                  description={
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {item.subDescription}
                    </Paragraph>
                  }
                />
                <div className={styles.cardItemContent}>
                  <span>{dayjs(item.updatedAt).fromNow()}</span>
                  <div className={styles.avatarList}>
                    <AvatarList size="small">
                      {item.members.map((member) => (
                        <AvatarList.Item
                          key={member.id}
                          src={member.avatar}
                          tips={member.name}
                        />
                      ))}
                    </AvatarList>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SearchProjectsPage;
