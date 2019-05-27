import React from 'react';

import { useSelector } from 'react-redux';

import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { me } = useSelector(state => state.user, []);
  const { mainPosts } = useSelector(state => state.post, []);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts && mainPosts.map(c => <PostCard key={+c.id} post={c} />)}
    </div>
  );
};

Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  })

};

export default Home;
