import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, List, Row, Select, Tag } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { useEffect, useMemo, useState } from "react";
import { categoryOptions } from "@/pages/list/mock";
import ArticleListContent from "@/pages/list/search/articles/components/ArticleListContent";
import StandardFormRow from "@/pages/list/search/articles/components/StandardFormRow";
import TagSelect from "@/pages/list/search/articles/components/TagSelect";
import type { ListItemDataType } from "@/pages/list/search/articles/data.d";
import useStyles from "@/pages/list/search/articles/style.style";
import { loadSearchItems } from "../data/demoList";

const FormItem = Form.Item;
const pageSize = 5;

const SearchArticlesPage = () => {
  const [form] = Form.useForm();
  const { styles } = useStyles();
  const [list, setList] = useState<ListItemDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const reload = async () => {
    setLoading(true);
    const result = await loadSearchItems(pageSize, "article-search");
    setList(result.list);
    setLoading(false);
  };

  useEffect(() => {
    void reload();
  }, []);

  const owners = [
    { id: "wzj", name: "我自己" },
    { id: "wjh", name: "吴家豪" },
    { id: "zxx", name: "周星星" },
    { id: "zly", name: "赵丽颖" },
    { id: "ym", name: "姚明" },
  ];

  const ownerOptions = useMemo<DefaultOptionType[]>(
    () => owners.map((item) => ({ label: item.name, value: item.id })),
    [],
  );

  const loadMore = async () => {
    setLoadingMore(true);
    const result = await loadSearchItems(pageSize, `article-search-more-${list.length}`);
    setList((current) => [...current, ...result.list]);
    setLoadingMore(false);
  };

  const setOwner = () => {
    form.setFieldsValue({ owner: ["wzj"] });
  };

  const IconText = ({ type, text }: { type: string; text: React.ReactNode }) => {
    switch (type) {
      case "star-o":
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case "like-o":
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case "message":
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const loadMoreDom = list.length > 0 && (
    <div style={{ textAlign: "center", marginTop: 16 }}>
      <Button onClick={() => void loadMore()} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          "加载更多"
        )}
      </Button>
    </div>
  );

  return (
    <>
      <Card variant="borderless">
        <Form
          layout="inline"
          form={form}
          initialValues={{ owner: ["wjh", "zxx"] }}
          onValuesChange={() => {
            void reload();
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                {categoryOptions
                  .filter(
                    (category): category is { value: string | number; label: string } =>
                      category.value !== undefined && category.value !== null,
                  )
                  .map((category) => (
                    <TagSelect.Option value={category.value} key={category.value}>
                      {category.label}
                    </TagSelect.Option>
                  ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select
                mode="multiple"
                placeholder="选择 owner"
                style={{ minWidth: "6rem" }}
                options={ownerOptions}
              />
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem
                  wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 24 },
                    md: { span: 12 },
                  }}
                  label="活跃用户"
                  name="user"
                >
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: "100%" }}
                    options={[{ label: "李三", value: "lisa" }]}
                  />
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem
                  wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 24 },
                    md: { span: 12 },
                  }}
                  label="好评度"
                  name="rate"
                >
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: "100%" }}
                    options={[{ label: "优秀", value: "good" }]}
                  />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 24 }}
        variant="borderless"
        styles={{ body: { padding: "8px 32px 32px 32px" } }}
      >
        <List<ListItemDataType>
          size="large"
          loading={loading}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMoreDom}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.star} />,
                <IconText key="like" type="like-o" text={item.like} />,
                <IconText key="message" type="message" text={item.message} />,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={item.href}>
                    {item.title}
                  </a>
                }
                description={
                  <span>
                    <Tag>Ant Design</Tag>
                    <Tag>设计语言</Tag>
                    <Tag>蚂蚁金服</Tag>
                  </span>
                }
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default SearchArticlesPage;
