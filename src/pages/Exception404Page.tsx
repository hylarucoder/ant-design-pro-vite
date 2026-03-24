import { Button, Card, Result } from 'antd';
import { Link } from 'react-router-dom';

const Exception404Page = () => (
  <Card variant="borderless">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/welcome">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  </Card>
);

export default Exception404Page;
