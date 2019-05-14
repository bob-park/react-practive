import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';


import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user, []);
  const { mainPosts } = useSelector(state => state.post, []);


  useEffect(() => {

  }, []);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      { mainPosts && mainPosts.map(c => <PostCard key={+c.id} post={c} />)}
    </div>
  );
};
export default Home;
