import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { LOG_IN_REQUEST } from '../reducers/user';

import { useInput } from '../pages/signup';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const { isLoggingIn } = useSelector(state => state.user, []);

  const dispatch = useDispatch();
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          id, password,
        },
      });
    },
    [id, password],
  );

  return (
    <Form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">패스워드</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          { isLoggingIn ? '로그인 중' : '로그인'}
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
