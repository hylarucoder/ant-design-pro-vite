import { Button, Result } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import useStyles from '@/pages/user/register-result/style.style';

const RegisterResultPage = () => {
  const { styles } = useStyles();
  const [params] = useSearchParams();
  const email = params.get('account') || 'AntDesign@example.com';

  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>你的账户：{email} 注册成功</span>
        </div>
      }
      subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
      extra={
        <div className={styles.actions}>
          <a href="">
            <Button size="large" type="primary">
              <span>查看邮箱</span>
            </Button>
          </a>
          <Link to="/welcome">
            <Button size="large">返回首页</Button>
          </Link>
        </div>
      }
    />
  );
};

export default RegisterResultPage;
