import { ClusterOutlined, ContactsOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { GridContent } from "@ant-design/pro-components";
import type { InputRef } from "antd";
import { Avatar, Card, Col, Divider, Input, List, Row, Tag } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import numeral from "numeral";
import { useEffect, useRef, useState } from "react";
import useStyles from "@/pages/account/center/Center.style";
import useApplicationStyles from "@/pages/account/center/components/Applications/index.style";
import ArticleListContent from "@/pages/account/center/components/ArticleListContent";
import useArticleStyles from "@/pages/account/center/components/Articles/index.style";
import AvatarList from "@/pages/account/center/components/AvatarList";
import useProjectStyles from "@/pages/account/center/components/Projects/index.style";
import type {
  CurrentUser,
  ListItemDataType,
  TagType,
  tabKeyType,
} from "@/pages/account/center/data.d";
import { fetchCenterCurrentUser, fetchCenterList } from "../data/account";

dayjs.extend(relativeTime);

const operationTabList = [
  {
    key: "articles",
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: "applications",
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: "projects",
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const TagList = ({ tags }: { tags: CurrentUser["tags"] }) => {
  const { styles } = useStyles();
  const ref = useRef<InputRef | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={() => {
            let tempTags = [...newTags];
            if (inputValue && tempTags.filter((tag) => tag.label === inputValue).length === 0) {
              tempTags = [...tempTags, { key: `new-${tempTags.length}`, label: inputValue }];
            }
            setNewTags(tempTags);
            setInputVisible(false);
            setInputValue("");
          }}
          onPressEnter={() => {
            let tempTags = [...newTags];
            if (inputValue && tempTags.filter((tag) => tag.label === inputValue).length === 0) {
              tempTags = [...tempTags, { key: `new-${tempTags.length}`, label: inputValue }];
            }
            setNewTags(tempTags);
            setInputVisible(false);
            setInputValue("");
          }}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={() => {
            setInputVisible(true);
            ref.current?.focus();
          }}
          style={{ borderStyle: "dashed" }}
        >
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const AccountCenterPage = () => {
  const { styles } = useStyles();
  const { styles: articleStyles } = useArticleStyles();
  const { styles: applicationStyles } = useApplicationStyles();
  const { styles: projectStyles } = useProjectStyles();
  const [tabKey, setTabKey] = useState<tabKeyType>("articles");
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [listData, setListData] = useState<ListItemDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const [user, list] = await Promise.all([fetchCenterCurrentUser(), fetchCenterList(30)]);
      setCurrentUser(user);
      setListData(list.list);
      setLoading(false);
    })();
  }, []);

  const renderUserInfo = ({ title, group, geographic }: Partial<CurrentUser>) => (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined style={{ marginRight: 8 }} />
        {title}
      </p>
      <p>
        <ClusterOutlined style={{ marginRight: 8 }} />
        {group}
      </p>
      <p>
        <HomeOutlined style={{ marginRight: 8 }} />
        {(geographic || { province: { label: "" } }).province.label}
        {(geographic || { city: { label: "" } }).city.label}
      </p>
    </div>
  );

  const renderArticles = () => (
    <List<ListItemDataType>
      size="large"
      className={articleStyles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={listData}
      style={{ margin: "0 -24px" }}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <span key="star">⭐ {item.star}</span>,
            <span key="like">👍 {item.like}</span>,
            <span key="message">💬 {item.message}</span>,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={articleStyles.listItemMetaTitle} href={item.href}>
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
  );

  const renderApplications = () => (
    <List<ListItemDataType>
      rowKey="id"
      className={applicationStyles.filterCardList}
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card hoverable styles={{ body: { paddingBottom: 20 } }}>
            <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
            <div className={applicationStyles.cardInfo}>
              <div>
                <p>活跃用户</p>
                <p>
                  {item.activeUser > 10000
                    ? `${Math.floor(item.activeUser / 10000)}万`
                    : item.activeUser}
                </p>
              </div>
              <div>
                <p>新增用户</p>
                <p>{numeral(item.newUser).format("0,0")}</p>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const renderProjects = () => (
    <List<ListItemDataType>
      className={projectStyles.coverCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item>
          <Card
            className={projectStyles.card}
            hoverable
            cover={<img alt={item.title} src={item.cover} />}
          >
            <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
            <div className={projectStyles.cardItemContent}>
              <span>{dayjs(item.updatedAt).fromNow()}</span>
              <div className={projectStyles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member) => (
                    <AvatarList.Item
                      key={`${item.id}-avatar-${member.id}`}
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
  );

  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === "projects") return renderProjects();
    if (tabValue === "applications") return renderApplications();
    return renderArticles();
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card variant="borderless" style={{ marginBottom: 24 }} loading={loading}>
            {!loading && currentUser && (
              <>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser.signature}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <TagList tags={currentUser.tags || []} />
                <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {currentUser.notice?.map((item) => (
                      <Col key={item.id} lg={24} xl={12}>
                        <a href={item.href}>
                          <Avatar size="small" src={item.logo} />
                          {item.member}
                        </a>
                      </Col>
                    ))}
                  </Row>
                </div>
              </>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            variant="borderless"
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey) => setTabKey(_tabKey as tabKeyType)}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default AccountCenterPage;
