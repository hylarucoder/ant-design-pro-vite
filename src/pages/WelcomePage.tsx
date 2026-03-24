import { PageContainer } from '@ant-design/pro-components';
import { Card, theme } from 'antd';
import { useEffect } from 'react';

const InfoCard = ({
  title,
  index,
  desc,
  href,
}: {
  title: string;
  index: number;
  desc: string;
  href: string;
}) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const WelcomePage = () => {
  const { token } = theme.useToken();

  useEffect(() => {
    document.title = '欢迎页 - Ant Design Pro';
  }, []);

  return (
    <PageContainer>
      <Card
        style={{ borderRadius: 8 }}
        styles={{
          body: {
            backgroundImage: 'linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 Ant Design Pro Vite
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            这是基于 Ant Design Pro 视觉风格迁到 Vite
            的版本。页面外观尽量保持原样， 运行方式逐步从 Umi/Max
            脱离出来，方便后续继续迁真实业务页。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://vite.dev"
              title="了解 Vite"
              desc="Vite 是新的开发和构建入口，这个仓库现在默认通过它来启动、预览和打包。"
            />
            <InfoCard
              index={2}
              title="了解 Ant Design"
              href="https://ant.design"
              desc="界面样式继续沿用 Ant Design 和 Ant Design Pro 的既有视觉体系，不走重新设计路线。"
            />
            <InfoCard
              index={3}
              title="了解 Pro Components"
              href="https://procomponents.ant.design"
              desc="页面容器、布局能力和中后台常用组件仍然基于 Pro Components 来保持原有观感。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default WelcomePage;
