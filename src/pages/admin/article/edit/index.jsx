/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, Modal, message } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { updateActicle, createArticle, getArticleById } from '@/apis/article';
import { FileSyncOutlined, PlusOutlined } from '@/utils/icons';
import { translateMarkdown } from '@/utils';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import List from './Tag';
import styles from './index.module.less';

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const store = useSelector((state) => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList,
    authorId: state.user.userId,
  }));

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagSelectedList, setTagSelectedList] = useState([]);
  const [cateSelectedList, setCateSelectedList] = useState([]);

  const editId = parseInt(params.id, 10);

  useBreadcrumb([
    { link: '/admin/article/manager', name: '文章管理' },
    editId ? '编辑文章' : '新增文章',
  ]);

  useEffect(() => {
    // mounted
    if (!editId) {
      const tags = store.tagList.map((d) => d.name).slice(0, 10);
      const cates = store.categoryList.map((d) => d.name).slice(0, 10);
      setTagList(tags);
      setCategoryList(cates);
      if (tags[0]) setTagSelectedList([tags[0]]);
      if (cates[0]) setCateSelectedList([cates[0]]);
    }
  }, [store.tagList, store.categoryList]);

  const fetchArticle = (id) => {
    getArticleById({ articleId: id, type: 0 }).then((res) => {
      setTitle(res.title);
      setContent(res.content);
      const tags = res.tags.map((d) => d.name);
      const categories = res.categories.map((d) => d.name);
      setTagList(tags);
      setCategoryList(categories);
      setTagSelectedList(tags);
      setCateSelectedList(categories);
    });
  };

  useEffect(() => {
    // did mounted
    if (editId) {
      fetchArticle(editId);
    }
  }, [params]);

  // eslint-disable-next-line consistent-return
  const add = () => {
    if (!title) return message.warning('标题不能为空!');
    createArticle({
      title,
      content,
      tagList: tagSelectedList,
      categoryList: cateSelectedList,
      authorId: store.authorId,
    }).then((res) => {
      Modal.confirm({
        title: '文章创建成功! 是否立即查看?',
        onOk: () => navigate(`/article/${res.id}`),
      });
    });
  };

  const update = () => {
    updateActicle(editId, {
      title,
      content,
      tags: tagSelectedList,
      categories: cateSelectedList,
    }).then(() => {
      message.success('更新成功');
    });
  };

  return (
    <div className={styles.adminEditArticle}>
      <ul className={styles.formList}>
        <li>
          <span className={styles.label}>标题: </span>
          <span style={{ flex: 1 }}>
            <Input
              placeholder='请输入文章标题'
              name='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </span>
        </li>
        <li>
          <span className={styles.label}>标签: </span>
          <span>
            <List
              list={tagList}
              setList={setTagList}
              selectedList={tagSelectedList}
              setSelectedList={setTagSelectedList}
            />
          </span>
        </li>
        <li>
          <span className={styles.label}>分类: </span>
          <span>
            <List
              list={categoryList}
              setList={setCategoryList}
              selectedList={cateSelectedList}
              setSelectedList={setCateSelectedList}
            />
          </span>
        </li>
      </ul>

      <SimpleMDE
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        options={{ autofocus: true, previewRender: translateMarkdown }}
      />

      <Button
        type='primary'
        shape='circle'
        size='large'
        disabled={!title}
        className={styles.actionIcon}
        title={editId ? '更新' : '新增'}
        icon={editId ? <FileSyncOutlined /> : <PlusOutlined />}
        onClick={() => {
          // eslint-disable-next-line no-unused-expressions
          editId ? update() : add();
        }}
      />
    </div>
  );
};

export default Edit;
