import { Button, Card, Result } from "antd";
import { Link } from "react-router-dom";

const Exception500Page = () => (
  <Card variant="borderless">
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/welcome">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  </Card>
);

export default Exception500Page;
