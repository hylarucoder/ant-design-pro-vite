import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Dropdown, Form, List, Row, Select, Tooltip } from "antd";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { categoryOptions } from "@/pages/list/mock";
import StandardFormRow from "@/pages/list/search/applications/components/StandardFormRow";
import TagSelect from "@/pages/list/search/applications/components/TagSelect";
import type { ListItemDataType } from "@/pages/list/search/applications/data.d";
import useStyles from "@/pages/list/search/applications/style.style";
import { loadSearchItems } from "../data/demoList";

const CardInfo = ({
  activeUser,
  newUser,
}: {
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}) => {
  const { styles } = useStyles();
  return (
    <div className={styles.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
        <p>{newUser}</p>
      </div>
    </div>
  );
};

const SearchApplicationsPage = () => {
  const { styles } = useStyles();
  const [list, setList] = useState<ListItemDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const result = await loadSearchItems(8, "application-search");
    setList(result.list);
    setLoading(false);
  };

  useEffect(() => {
    void reload();
  }, []);

  return (
    <div className={styles.filterCardList}>
      <Card variant="borderless">
        <Form
          onValuesChange={() => {
            void reload();
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <Form.Item name="category">
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
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item
                  wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                  name="author"
                  label="作者"
                >
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: "100%" }}
                    options={[{ label: "王昭君", value: "lisa" }]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item
                  wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
                  name="rate"
                  label="好评度"
                >
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: "100%" }}
                    options={[
                      { label: "优秀", value: "good" },
                      { label: "普通", value: "normal" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable
              styles={{ body: { paddingBottom: 20 } }}
              actions={[
                <Tooltip key="download" title="下载">
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown
                  key="ellipsis"
                  menu={{
                    items: [
                      { key: "1", label: "操作一" },
                      { key: "2", label: "操作二" },
                    ],
                  }}
                >
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div>
                <CardInfo
                  activeUser={
                    item.activeUser > 10000 ? (
                      <span>
                        {Math.floor(item.activeUser / 10000)}
                        <span
                          style={{
                            position: "relative",
                            top: -2,
                            fontSize: 14,
                            fontStyle: "normal",
                            marginLeft: 2,
                          }}
                        >
                          万
                        </span>
                      </span>
                    ) : (
                      item.activeUser
                    )
                  }
                  newUser={numeral(item.newUser).format("0,0")}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchApplicationsPage;
