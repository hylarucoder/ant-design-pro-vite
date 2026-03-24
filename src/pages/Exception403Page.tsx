import { Button, Card, Result } from "antd";
import { Link } from "react-router-dom";

const Exception403Page = () => (
  <Card variant="borderless">
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to="/welcome">
          <Button type="primary">Back to home</Button>
        </Link>
      }
    />
  </Card>
);

export default Exception403Page;
