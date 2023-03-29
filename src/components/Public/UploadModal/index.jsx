/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Upload, notification, Tag, Table
} from 'antd';

import { API_BASE_URL } from '@/config';
import { InboxOutlined } from '@/utils/icons';
import { getToken } from '@/utils';
import { postArticleCheckExist, uploadArticle } from '@/apis/article';
import { useListener } from '@/hooks/useBus';
import useBoolean from '@/hooks/useBoolean';
import styles from './index.module.less';

const UploadModal = () => {
  const authorId = useSelector((state) => state.user.userId);
  const timer = useRef(null);

  const confirmLoading = useBoolean(false);
  const { value: visible, setTrue, setFalse } = useBoolean(false);
  const [fileList, setFileList] = useState([]);
  const [parsedList, setParsedList] = useState([]);

  const getParsed = (fileName) =>
    parsedList.find((d) => d.fileName === fileName) || {};

  const columns = [
    {
      dataIndex: 'name',
      title: '文件名',
    },
    {
      dataIndex: 'title',
      title: '标题',
      render: (text, record) => getParsed(record.name).title,
    },
    {
      dataIndex: 'exist',
      title: '动作',
      render: (text, record) => {
        if (record.status === 'error') return <Tag color='red'>上传失败</Tag>;
        return getParsed(record.name).exist ? (
          <Tag color='gold'>更新</Tag>
        ) : (
          <Tag color='green'>插入</Tag>
        );
      },
    },
    {
      dataIndex: 'uid',
      title: '操作',
      render: (uid) => (
        <a
          className={styles.deleteText}
          onClick={() => {
            const index = fileList.findIndex((file) => file.uid === uid);
            fileList.splice(index, 1);
            setFileList([...fileList]);
          }}
        >
          删除
        </a>
      ),
    },
  ];

  useListener('openUploadModal', () => {
    setFileList([]);
    setTrue();
  });

  const handleFileChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const fileNameList = fileList.map((item) => item.name);
        postArticleCheckExist({ fileNameList }).then((list) => {
          setParsedList(list);
        });
      }, 500);
    }
    setFileList(fileList);
  };

  const handleSubmit = () => {
    const uploadList = fileList.reduce((list, file) => {
      if (file.status === 'done') {
        const result = parsedList.find((d) => file.name === d.fileName);
        list.push(result);
      }
      return list;
    }, []);
    confirmLoading.setTrue();
    uploadArticle({ authorId, uploadList })
      .then((response) => {
        confirmLoading.setFalse();
        setFalse();
        notification.success({
          message: 'upload article success',
          description: `insert ${response.insertList.length} article and update ${response.updateList.length} article`,
        });
      })
      .catch((error) => {
        console.log('error: ', error);
        confirmLoading.setFalse();
      });
  };

  return (
    <Modal
      width={760}
      visible={visible}
      title='导入文章'
      onOk={handleSubmit}
      onCancel={setFalse}
      maskClosable={false}
      okButtonProps={{
        loading: confirmLoading.value,
        disabled: fileList.length === 0,
      }}
      destroyOnClose
    >
      <Upload.Dragger
        name='file'
        multiple
        showUploadList={false}
        action={`${API_BASE_URL}/article/upload`}
        onChange={handleFileChange}
        headers={{ Authorization: getToken() }}
        accept='text/markdown'
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Upload.Dragger>

      {fileList.length > 0 && (
        <Table
          dataSource={fileList}
          columns={columns}
          rowKey='uid'
          pagination={false}
          size='small'
          style={{ marginTop: 15 }}
        />
      )}
    </Modal>
  );
};

export default UploadModal;
