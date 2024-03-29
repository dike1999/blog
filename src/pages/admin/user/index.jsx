/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import {
  Form,
  Table,
  Input,
  Tag,
  Switch,
  Button,
  Popconfirm,
  Select,
} from 'antd';

import { deleteUserById, putUserAuthority } from '@/apis/user';
import dayjs from '@/utils/dayjs';
import DatePicker from '@/components/DatePicker/index';
import useAntdTable from '@/hooks/useAntdTable';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import styles from './index.module.less';

const typeMapList = [
  { value: 1, label: 'github 用户' },
  { value: 2, label: '站内用户' },
];

const AdminUser = () => {
  const [form] = Form.useForm();
  useBreadcrumb(['用户管理']);
  const [queryParams, setQueryParams] = useState({});
  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/user/list',
    queryParams,
    columns: [
      { title: '用户名', dataIndex: 'username' },
      { title: '邮箱', dataIndex: 'email' },
      {
        title: '邮件通知',
        dataIndex: 'notice',
        render: (text, record) => (
          <Switch
            defaultChecked={text}
            onChange={(checked) =>
              updateList(() => putUserAuthority(record.id, { notice: checked }))}
          />
        ),
      },
      {
        title: '禁言',
        dataIndex: 'disabledDiscuss',
        render: (text, record) => (
          <Switch
            defaultChecked={text}
            onChange={(checked) =>
              updateList(() =>
                putUserAuthority(record.id, { disabledDiscuss: checked }))}
          />
        ),
      },
      {
        title: '用户类型',
        dataIndex: 'type',
        render: (text, record) =>
          record.github ? (
            <Tag color='#1890ff'>github 用户</Tag>
          ) : (
            <Tag color='magenta'>站内用户</Tag>
          ),
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt',
        sorter: (a, b) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1),
      },
      {
        dataIndex: 'id',
        title: '操作',
        render: (userId) => (
          <Popconfirm
            title='Are you sure?'
            onConfirm={() => updateList(() => deleteUserById(userId))}
          >
            <a className={styles.deleteText}>Delete</a>
          </Popconfirm>
        ),
      },
    ],
  });

  const onFinish = (values) => {
    if (Array.isArray(values.rangeDate)) {
      values.rangeDate = values.rangeDate.map((m) => m.format('YYYY-MM-DD'));
    }
    setQueryParams({ ...queryParams, ...values });
    onSearch({ ...queryParams, ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {/* 检索 */}
      <Form
        form={form}
        layout='inline'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginBottom: 20 }}
      >
        <Form.Item label='姓名' name='username'>
          <Input placeholder='请输入姓名' allowClear />
        </Form.Item>

        <Form.Item label='用户类型' name='type'>
          <Select style={{ width: 200 }} allowClear>
            {typeMapList.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='创建日期' name='rangeDate'>
          <DatePicker.RangePicker />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>
            检索
          </Button>
        </Form.Item>
      </Form>

      <Table {...tableProps} />
    </>
  );
};

export default AdminUser;
