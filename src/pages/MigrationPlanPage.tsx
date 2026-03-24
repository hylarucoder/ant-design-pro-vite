import {
  CheckCircleFilled,
  ClockCircleOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, List, Row, Space, Tag, Typography } from 'antd';
import { useEffect } from 'react';

const phases = [
  {
    title: 'Phase 1: 入口切换',
    status: 'done',
    description: '建立 Vite 配置、HTML 入口、React 启动文件和基础应用壳。',
    tasks: [
      'Vite 配置已添加',
      '默认脚本已切到 Vite',
      '旧的 Umi 启动命令已经移除',
    ],
  },
  {
    title: 'Phase 2: 页面脱钩',
    status: 'active',
    description: '把现有页面从 Umi 的路由、国际化、请求封装里逐步拆出来。',
    tasks: [
      '优先迁移欢迎页、404 和基础布局',
      '逐页替换 Link / history / useRequest',
      '减少对运行时 initialState 的依赖',
    ],
  },
  {
    title: 'Phase 3: 旧栈清理',
    status: 'pending',
    description: '在 Vite 路径稳定后，收尾移除 Umi 专属配置和遗留依赖。',
    tasks: [
      '替换 mock / proxy / 请求层',
      '清理 config/routes.ts 等旧入口',
      '移除旧运行时相关依赖',
    ],
  },
];

const currentFocus = [
  '先把可见页面迁稳，再碰服务层和权限逻辑。',
  '优先补齐 Vite 对应能力，不再继续保留旧的 Umi 启动入口。',
  '每完成一批页面，就用真实构建和启动做验证。',
];

const statusMeta = {
  done: {
    icon: <CheckCircleFilled />,
    color: 'success',
    label: '已完成',
  },
  active: {
    icon: <ToolOutlined />,
    color: 'processing',
    label: '进行中',
  },
  pending: {
    icon: <ClockCircleOutlined />,
    color: 'default',
    label: '待推进',
  },
} as const;

const MigrationPlanPage = () => {
  useEffect(() => {
    document.title = '迁移计划 - Ant Design Pro';
  }, []);

  return (
    <PageContainer>
      <Card variant="borderless" style={{ marginBottom: 24 }}>
        <Typography.Title level={2}>迁移计划</Typography.Title>
        <Typography.Paragraph type="secondary">
          当前策略不是一次性硬切，而是先把 Vite
          应用壳搭起来，再用一批一批页面迁出的方式降低风险。
        </Typography.Paragraph>
        <Divider />
        <List
          dataSource={currentFocus}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>

      <Row gutter={[16, 16]}>
        {phases.map((phase) => {
          const meta = statusMeta[phase.status as keyof typeof statusMeta];
          return (
            <Col xs={24} lg={8} key={phase.title}>
              <Card variant="borderless" className="plan-card">
                <Space align="center" size={10}>
                  {meta.icon}
                  <Typography.Title level={4} className="plan-card__title">
                    {phase.title}
                  </Typography.Title>
                </Space>
                <Tag color={meta.color} className="plan-card__tag">
                  {meta.label}
                </Tag>
                <Typography.Paragraph type="secondary">
                  {phase.description}
                </Typography.Paragraph>
                <List
                  size="small"
                  dataSource={phase.tasks}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContainer>
  );
};

export default MigrationPlanPage;
