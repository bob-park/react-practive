import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_HASHTAG_POSTS_REQUEST, LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector(state => state.post, []);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1].id,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

// next 에서 제공
// LifeCycle의 일종으로 next에서 추가된 것
// express 서버에서 받은 param을 받는 메소드
Hashtag.getInitialProps = async context => {
  const { tag } = context.query;

  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });

  return { tag };
};

export default Hashtag;
