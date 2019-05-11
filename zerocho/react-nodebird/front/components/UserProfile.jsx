import React, { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { logoutAction } from "../reducers/user";

import { Card, Avatar, Button } from "antd";

const UserProfile = () => {
  const { user } = useSelector(state => state.user, []);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  });

  return (
    <Card
      style={{ padding: "10px" }}
      actions={[
        <div key="twit">
          짹짹 <br /> {user.Post.length}
        </div>,
        <div key="twit">
          팔로잉 <br /> {user.Followings.length}
        </div>,
        <div key="twit">
          팔로워 <br /> {user.Followers.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
