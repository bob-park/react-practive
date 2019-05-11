import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "../reducers/user";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user, []);
  const { mainPosts } = useSelector(state => state.post, []);


  useEffect(() => {
    //dispatch(loginAction);
  }, []);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={+c.createdAt} post={c} />;
      })}
    </div>
  );
};
export default Home;
