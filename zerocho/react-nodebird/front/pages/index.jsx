import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "../reducers/user";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "현우박"
      },
      content: "첫번째 게시글",
      img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    }
  ]
};

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user, []);


  useEffect(() => {
    dispatch(loginAction);
  }, []);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      {dummy.mainPosts.map(c => {
        return <PostCard key={+c.createdAt} post={c} />;
      })}
    </div>
  );
};
export default Home;
