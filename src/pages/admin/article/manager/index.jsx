/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Form,
  Table,
  Tag,
  Switch,
  Input,
  Button,
  Popconfirm,
  Select,
} from 'antd';

import axios from '@/utils/axios';
import dayjs from '@/utils/dayjs';
import download from '@/utils/download';
import useAntdTable from '@/hooks/useAntdTable';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import './index.less';

const ArticleManager = () => {
  const [form] = Form.useForm();
  useBreadcrumb(['文章管理']);

  const { tagList, categoryList } = useSelector((state) => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList,
  }));
  const [queryParams, setQueryParams] = useState({});
  const [batch, setBatch] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const renderColor = (name, list) => {
    const target = list.find((l) => l.name === name);
    return target && target.color;
  };

  const output = (articleId) => {
    download(`/article/output/${articleId}`);
  };

  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/article/list',
    queryParams,
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        render: (text) => text.map((d) => (
          <Tag color={renderColor(d.name, tagList)} key={d.name}>
            <Link to={`/tags/${d.name}`}>{d.name}</Link>
          </Tag>
        )),
      },
      {
        title: '分类',
        dataIndex: 'categories',
        render: (text) => text.map((d) => (
          <Tag color='#2db7f5' key={d.name}>
            <Link to={`/categories/${d.name}`}>{d.name}</Link>
          </Tag>
        )),
      },
      {
        title: '浏览数',
        dataIndex: 'viewCount',
        sorter: (a, b) => b.viewCount - a.viewCount,
      },
      {
        title: '发布时间',
        dataIndex: 'createdAt',
        sorter: (a, b) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1),
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',
        sorter: (a, b) => (dayjs(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1),
      },
      {
        dataIndex: 'id',
        title: '操作',
        render: (articleId, record) => (
          <ul className='action-list'>
            <li>
              <Link to={`/article/${articleId}`}>查看</Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/admin/article/edit/${record.id}`,
                  state: { articleId },
                }}
              >
                编辑
              </Link>
            </li>
            <li>
              <a onClick={() => output(record.id, record.title)}>导出</a>
            </li>
            <li>
              <Popconfirm
                title='Are you sure?'
                cancelText='No'
                onConfirm={() => updateList(() => axios.delete(`/article/${articleId}`))}
              >
                <a className='delete-text'>删除</a>
              </Popconfirm>
            </li>
          </ul>
        ),
      },
    ],
  });

  const outputSelected = () => {
    download(`/article/output/list/${selectedRowKeys}`);
  };

  const outputAll = () => {
    download('/article/output/all');
  };

  const delList = () => {
    axios.delete(`/article/list/${selectedRowKeys}`).then(() => {
      onSearch();
      setSelectedRowKeys([]);
    });
  };

  const rowSelection = batch
    ? {
      selectedRowKeys,
      onChange: (selectList) => setSelectedRowKeys(selectList),
    }
    : null;

  const onFinsh = (values) => {
    setQueryParams({ ...queryParams, ...values });
    onSearch({ ...queryParams, ...values });
  };

  return (
    <div className='admin-article-manager'>
      {/* 检索 */}
      <Form
        form={form}
        layout='inline'
        onFinish={onFinsh}
        style={{ marginBottom: 20 }}
      >
        <Form.Item label='关键词' name='keyword'>
          <Input placeholder='请输入文章关键词' allowClear />
        </Form.Item>
        <Form.Item label='标签' name='tag'>
          <Select style={{ width: 200 }} allowClear>
            {tagList.map((item) => (
              <Select.Option key={item.name} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='分类' name='category'>
          <Select style={{ width: 200 }} allowClear>
            {categoryList.map((item) => (
              <Select.Option key={item.name} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>
            检索
          </Button>
          <Button type='primary' onClick={outputAll} style={{ marginRight: 8 }}>
            导出全部文章
          </Button>
        </Form.Item>
      </Form>

      <Table
        {...tableProps}
        rowSelection={rowSelection}
        footer={() => (
          <>
            批量操作
            <Switch
              checked={batch}
              onChange={() => setBatch((prev) => !prev)}
              style={{ marginRight: 8 }}
            />
            {batch && (
              <>
                <Button
                  type='primary'
                  size='small'
                  style={{ marginRight: 8 }}
                  disabled={selectedRowKeys.length === 0}
                  onClick={outputSelected}
                >
                  导出选中项
                </Button>
                <Popconfirm
                  title='Are you sure delete the articles?'
                  onConfirm={delList}
                  // onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button
                    type='danger'
                    size='small'
                    disabled={selectedRowKeys.length === 0}
                  >
                    批量删除
                  </Button>
                </Popconfirm>
              </>
            )}
          </>
        )}
      />
    </div>
  );
};

export default ArticleManager;
