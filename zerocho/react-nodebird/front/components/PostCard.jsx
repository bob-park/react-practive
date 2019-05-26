import React, { useState, useCallback, useEffect } from 'react';

import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  Icon,
  Form,
  Comment,
  List,
  Input,
  Popover,
} from 'antd';
import {
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  LOAD_COMMENT_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../reducers/post';

import PostImages from './PostImages';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { me } = useSelector(state => state.user, []);

  const { commentAdded, isAddingComment } = useSelector(
    state => state.post,
    [],
  );

  const dispatch = useDispatch();

  const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);

    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: {
          postId: post.id,
        },
      });
    }
  }, []);

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();

      if (!me) {
        // eslint-disable-next-line no-alert
        return alert('로그인이 필요합니다.');
      }

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText,
        },
      });
    },
    [me && me.id, commentText],
  );

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }

    if (liked) {
      // 좋아요 누른상태
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else {
      // 좋아요 누르지 않은 상태
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [me && me.id, post && post.id, liked]);

  return (
    <div>
      <Card
        key={+post.createAt}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon
            type="heart"
            key="heart"
            onClick={onToggleLike}
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {me && me.id === post.UserId ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <>
                    <Button>신고</Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={
            <Link
              href={{ pathname: '/user', query: { id: post.User.id } }}
              as={`/user/${post.User.id}`}
            >
              <a>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={post.User.nickname}
          description={
            <div>
              {post.content.split(/(#[^\s]+)/g).map(tag => {
                if (tag.match(/#[^\s]+/)) {
                  return (
                    <Link
                      href={{
                        pathname: '/hashtag',
                        query: { tag: tag.slice(1) },
                      }}
                      as={`/hashtag/${tag.slice(1)}`}
                      key={tag}
                    >
                      <a>{tag}</a>
                    </Link>
                  );
                }
                return tag;
              })}
            </div>
          }
        />
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={isAddingComment}
              >
                {isAddingComment ? '댓글 추가중' : '댓글 달기'}
              </Button>
            </Form.Item>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: '/user', query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.propsTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};

export default PostCard;
