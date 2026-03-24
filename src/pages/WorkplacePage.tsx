import { Radar } from "@ant-design/plots";
import { PageContainer } from "@ant-design/pro-components";
import { Avatar, Card, Col, List, Row, Skeleton, Statistic } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import EditableLinkGroup from "@/pages/dashboard/workplace/components/EditableLinkGroup";
import useStyles from "@/pages/dashboard/workplace/style.style";
import { fetchWorkplaceData } from "../data/workplace";
import { useAsyncData } from "../hooks/useAsyncData";
import type { ActivitiesType } from "../types/workplace";

dayjs.extend(relativeTime);

const links = [
  { title: "操作一", href: "/dashboard/analysis" },
  { title: "操作二", href: "/welcome" },
  { title: "操作三", href: "/migration" },
  { title: "操作四", href: "/dashboard/workplace" },
  { title: "操作五", href: "https://pro.ant.design" },
  { title: "操作六", href: "https://ant.design" },
];

const currentUser = {
  avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  name: "吴彦祖",
  userid: "00000001",
  email: "antdesign@alipay.com",
  signature: "海纳百川，有容乃大",
  title: "交互专家",
  group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
};

const PageHeaderContent = () => {
  const { styles } = useStyles();
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="团队内排名" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="项目访问" value={2223} />
      </div>
    </div>
  );
};

const WorkplacePage = () => {
  const { styles } = useStyles();
  const { data, loading } = useAsyncData(fetchWorkplaceData, []);
  const projectNotice = data?.projectNotice ?? [];
  const activities = data?.activities ?? [];
  const radarData = data?.radarData ?? [];

  const renderActivityText = (item: ActivitiesType) => {
    const segmentCount = new Map<string, number>();

    return item.template.split(/@\{([^{}]*)\}/gi).map((segment) => {
      const nextCount = (segmentCount.get(segment) ?? 0) + 1;
      segmentCount.set(segment, nextCount);

      if (segment === "group" && item.group) {
        return (
          <a
            href={item.group.link}
            key={`${item.id}-group-${nextCount}`}
            target="_blank"
            rel="noreferrer"
          >
            {item.group.name}
          </a>
        );
      }

      if (segment === "project" && item.project) {
        return (
          <a
            href={item.project.link}
            key={`${item.id}-project-${nextCount}`}
            target="_blank"
            rel="noreferrer"
          >
            {item.project.name}
          </a>
        );
      }

      return <span key={`${item.id}-text-${segment}-${nextCount}`}>{segment}</span>;
    });
  };

  return (
    <PageContainer content={<PageHeaderContent />} extraContent={<ExtraContent />}>
      <Row gutter={[24, 24]}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            title="进行中的项目"
            variant="borderless"
            style={{ marginBottom: 24 }}
            extra={<Link to="/dashboard/analysis">全部项目</Link>}
            loading={loading}
          >
            {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card.Meta
                  title={
                    <div className={styles.cardTitle}>
                      <Avatar size="small" src={item.logo} />
                      <Link to={item.href}>{item.title}</Link>
                    </div>
                  }
                  description={item.description}
                  style={{
                    width: "100%",
                  }}
                />
                <div className={styles.projectItemContent}>
                  <Link to={item.memberLink}>{item.member}</Link>
                  <span className={styles.datetime} title={item.updatedAt}>
                    {dayjs(item.updatedAt).fromNow()}
                  </span>
                </div>
              </Card.Grid>
            ))}
          </Card>

          <Card
            styles={{
              body: {
                padding: loading ? 16 : 0,
              },
            }}
            variant="borderless"
            className={styles.activeCard}
            title="动态"
            loading={loading}
          >
            <List
              loading={loading}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.user.avatar} />}
                    title={
                      <span>
                        <span className={styles.username}>{item.user.name}</span>{" "}
                        <span className={styles.event}>{renderActivityText(item)}</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={item.updatedAt}>
                        {dayjs(item.updatedAt).fromNow()}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card style={{ marginBottom: 24 }} title="快速开始 / 便捷导航" variant="borderless">
            <EditableLinkGroup onAdd={() => {}} links={links} linkElement="a" />
          </Card>

          <Card
            style={{ marginBottom: 24 }}
            variant="borderless"
            title="XX 指数"
            loading={radarData.length === 0}
          >
            <Radar
              height={343}
              data={radarData}
              xField="label"
              colorField="name"
              yField="value"
              shapeField="smooth"
              area={{
                style: {
                  fillOpacity: 0.4,
                },
              }}
              axis={{
                y: {
                  gridStrokeOpacity: 0.5,
                },
              }}
              legend={{
                color: {
                  position: "bottom",
                  layout: { justifyContent: "center" },
                },
              }}
            />
          </Card>

          <Card
            styles={{
              body: {
                paddingTop: 12,
                paddingBottom: 12,
              },
            }}
            variant="borderless"
            title="团队"
            loading={loading}
          >
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item) => (
                  <Col span={12} key={`members-item-${item.id}`}>
                    <a
                      href="https://github.com/ant-design/ant-design-pro"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Avatar src={item.logo} size="small" />
                      <span className={styles.member}>{item.member.substring(0, 3)}</span>
                    </a>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default WorkplacePage;
