import { PageContainer } from "@ant-design/pro-components";
import { Input } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabList = [
  { key: "articles", tab: "文章" },
  { key: "projects", tab: "项目" },
  { key: "applications", tab: "应用" },
];

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    navigate(`/list/search/${key}`);
  };

  const getTabKey = () => {
    const tabKey = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    return tabKey && tabKey !== "/" ? tabKey : "articles";
  };

  return (
    <PageContainer
      content={
        <div style={{ textAlign: "center" }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={() => {}}
            style={{ maxWidth: 522, width: "100%" }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      <Outlet />
    </PageContainer>
  );
};

export default SearchPage;
