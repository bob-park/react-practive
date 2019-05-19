import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Card, Avatar, Button } from 'antd';
import { logoutRequestAction } from '../reducers/user';


const UserProfile = () => {
  const { me, isLoggingOut } = useSelector(state => state.user, []);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction);
  });

  return (
    <Card
      style={{ padding: '10px' }}
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key="twit">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="twit">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={isLoggingOut}>{ isLoggingOut ? '로그아웃 중' : '로그아웃' }</Button>
    </Card>
  );
};

export default UserProfile;
