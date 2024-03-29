/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Comment, Button, Tooltip, Input, Popconfirm, message
} from 'antd';

import { DeleteOutlined } from '@/utils/icons';
import { postDiscuss, deleteDiscuss } from '@/apis/discuss';
import { translateMarkdown } from '@/utils';
import dayjs from '@/utils/dayjs';
import AppAvatar from '@/components/Avatar';

const { TextArea } = Input;

const CommentItem = ({
  children,
  item,
  userInfo,
  articleId,
  commentId,
  replyId,
  replyVisible,
  onReply,
  commentList,
  setCommentList,
}) => {
  const { user } = item;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (replyVisible) setValue('');
  }, [replyVisible]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    if (!userInfo.userId) return message.warn('您未登陆，请登录后再试。');
    postDiscuss({
      userId: userInfo.userId,
      articleId,
      content: value.trim(),
      commentId,
    }).then((res) => {
      onReply({ commentId: 0, replyId: 0 });
      setCommentList(res.rows);
    });
  };

  const handleKeyUp = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      onSubmit();
    }
  };

  // delete discuss
  const onDelete = () => {
    if (replyId) {
      deleteDiscuss(`/discuss/reply/${replyId}`).then(() => {
        const commentListBackup = [...commentList];
        const tagetComment = commentListBackup.find((c) => c.id === commentId);
        tagetComment.replies = tagetComment.replies.filter(
          (r) => r.id !== replyId
        );
        setCommentList(commentListBackup);
      });
    } else {
      deleteDiscuss(`/discuss/comment/${commentId}`).then(() => {
        let commentListBackup = [...commentList];
        commentListBackup = commentListBackup.filter((c) => c.id !== commentId);
        setCommentList(commentListBackup);
      });
    }
  };

  const handleReply = () => {
    onReply({ commentId, replyId });
  };

  return (
    <Comment
      actions={[
        <span onClick={handleReply}>Reply to</span>,
        <>
          {userInfo.role === 1 && (
            <Popconfirm
              title='是否删除该留言?'
              cancelText='取消'
              okText='确认'
              onConfirm={onDelete}
            >
              <DeleteOutlined className='icon-delete' />
            </Popconfirm>
          )}
        </>,
      ]}
      author={<span>{user && user.username}</span>}
      avatar={<AppAvatar userInfo={user} />}
      content={(
        <div
          className='article-detail'
          dangerouslySetInnerHTML={{
            __html: translateMarkdown(item.content, true),
          }}
        />
      )}
      datetime={(
        <Tooltip title={item.createdAt}>
          <span>{dayjs(item.createdAt).fromNow()}</span>
        </Tooltip>
      )}
    >
      {replyVisible && (
        <div className='reply-form'>
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className='reply-form-controls'>
            <span className='tip'>Ctrl or ⌘ + Enter</span>
            <Button
              htmlType='submit'
              type='primary'
              disabled={!value.trim()}
              onClick={onSubmit}
            >
              回复
            </Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  );
};

const CommentList = ({ commentList, articleId, setCommentList }) => {
  const userInfo = useSelector((state) => state.user);
  const [replyTarget, setReplyTarget] = useState({ commentId: 0, replyId: 0 });

  return (
    <div>
      {commentList.map((comment) => (
        <CommentItem
          item={comment}
          key={comment.id}
          articleId={articleId}
          userInfo={userInfo}
          commentId={comment.id}
          setCommentList={setCommentList}
          commentList={commentList}
          onReply={setReplyTarget}
          replyVisible={
            replyTarget.commentId === comment.id && !replyTarget.replyId
          }
        >
          {comment.replies.map((reply) => (
            <CommentItem
              item={reply}
              key={reply.id}
              articleId={articleId}
              userInfo={userInfo}
              commentId={comment.id}
              replyId={reply.id}
              setCommentList={setCommentList}
              commentList={commentList}
              onReply={setReplyTarget}
              replyVisible={
                replyTarget.commentId === comment.id
                && replyTarget.replyId === reply.id
              }
            />
          ))}
        </CommentItem>
      ))}
    </div>
  );
};

export default CommentList;
