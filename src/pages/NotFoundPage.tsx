import { Button, Card, Result } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "页面不存在 - Ant Design Pro Vite";
  }, []);

  return (
    <Card variant="borderless">
      <Result
        status="404"
        title="404"
        subTitle="这个页面还没有迁过来，或者地址不存在。"
        extra={
          <Button type="primary" onClick={() => navigate("/welcome")}>
            返回欢迎页
          </Button>
        }
      />
    </Card>
  );
};

export default NotFoundPage;
