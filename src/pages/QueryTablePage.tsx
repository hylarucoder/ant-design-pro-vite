import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import { App, Button, Drawer, Input, Modal } from 'antd';
import { cloneElement, useCallback, useRef, useState } from 'react';
import type {
  TableListItem,
  TableListParams,
} from '@/pages/list/table-list/data.d';
import {
  addRuleItem,
  queryRuleList,
  removeRuleItems,
  updateRuleItem,
} from '../data/ruleTable';

type UpdateFormProps = {
  trigger?: React.ReactElement;
  onOk?: () => void;
  values: Partial<TableListItem>;
};

const RuleUpdateForm = ({ trigger, onOk, values }: UpdateFormProps) => {
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  return (
    <>
      {trigger
        ? cloneElement(
            trigger as React.ReactElement<{ onClick?: () => void }>,
            {
              onClick: () => {
                setOpen(true);
              },
            },
          )
        : null}
      {open ? (
        <StepsForm
          stepsProps={{ size: 'small' }}
          onFinish={async (formValues) => {
            await updateRuleItem({ ...values, ...formValues });
            message.success('配置成功');
            setOpen(false);
            onOk?.();
          }}
          stepsFormRender={(dom, submitter) => (
            <Modal
              width={640}
              destroyOnClose
              title="规则配置"
              open={open}
              footer={submitter}
              onCancel={() => setOpen(false)}
            >
              {dom}
            </Modal>
          )}
        >
          <StepsForm.StepForm initialValues={values} title="基本信息">
            <ProFormText
              name="name"
              label="规则名称"
              width="md"
              rules={[{ required: true, message: '请输入规则名称！' }]}
            />
            <ProFormTextArea
              name="desc"
              width="md"
              label="规则描述"
              placeholder="请输入至少五个字符"
              rules={[
                {
                  required: true,
                  message: '请输入至少五个字符的规则描述！',
                  min: 5,
                },
              ]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            initialValues={{ target: '0', template: '0' }}
            title="配置规则属性"
          >
            <ProFormSelect
              name="target"
              width="md"
              label="监控对象"
              valueEnum={{ 0: '表一', 1: '表二' }}
            />
            <ProFormSelect
              name="template"
              width="md"
              label="规则模板"
              valueEnum={{ 0: '规则模板一', 1: '规则模板二' }}
            />
            <ProFormRadio.Group
              name="type"
              label="规则类型"
              options={[
                { value: '0', label: '强' },
                { value: '1', label: '弱' },
              ]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            initialValues={{ type: '1', frequency: 'month' }}
            title="设定调度周期"
          >
            <ProFormDateTimePicker
              name="time"
              width="md"
              label="开始时间"
              rules={[{ required: true, message: '请选择开始时间！' }]}
            />
            <ProFormSelect
              name="frequency"
              label="监控周期"
              width="md"
              valueEnum={{ month: '月', week: '周' }}
            />
          </StepsForm.StepForm>
        </StepsForm>
      ) : null}
    </>
  );
};

const RuleCreateForm = ({ reload }: { reload?: ActionType['reload'] }) => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        新建
      </Button>
      {open ? (
        <ModalForm
          title="新建规则"
          open={open}
          width="400px"
          modalProps={{
            destroyOnClose: true,
            onCancel: () => setOpen(false),
          }}
          onOpenChange={setOpen}
          onFinish={async (value) => {
            await addRuleItem(value as Partial<TableListItem>);
            message.success('新增成功');
            reload?.();
            setOpen(false);
            return true;
          }}
        >
          <ProFormText
            width="md"
            name="name"
            rules={[{ required: true, message: '请输入规则名称' }]}
          />
          <ProFormTextArea width="md" name="desc" />
        </ModalForm>
      ) : null}
    </>
  );
};

const QueryTablePage = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const { message } = App.useApp();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      render: (dom, entity) => (
        <a
          onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}
        >
          {dom}
        </a>
      ),
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} 万 `,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '上次调度时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <RuleUpdateForm
          trigger={<a>配置</a>}
          key="config"
          onOk={actionRef.current?.reload}
          values={record}
        />,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];

  const handleRemove = useCallback(
    async (selectedRows: TableListItem[]) => {
      if (!selectedRows?.length) {
        message.warning('请选择删除项');
        return;
      }

      await removeRuleItems(selectedRows.map((row) => row.key));
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      message.success('删除成功');
    },
    [message],
  );

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <RuleCreateForm key="create" reload={actionRef.current?.reload} />,
        ]}
        request={queryRuleList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
              <span>
                {' '}
                总服务调用次数{' '}
                {selectedRowsState.reduce(
                  (pre, item) => pre + (item.callNo ?? 0),
                  0,
                )}{' '}
                万
              </span>
            </div>
          }
        >
          <Button
            onClick={() => {
              void handleRemove(selectedRowsState);
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow.name}
            request={async () => ({ data: currentRow })}
            params={{ id: currentRow.name }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default QueryTablePage;
