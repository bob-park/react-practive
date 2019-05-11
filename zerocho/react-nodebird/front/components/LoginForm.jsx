import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../reducers/user";

import { Button, Form, Input } from "antd";
import Link from "next/link";

import { useInput } from "../pages/signup";

const LoginForm = () => {
  const [userId, onChangeId] = useInput("");
  const [userPassword, onChangePassword] = useInput("");

  const { isLoggedInPending } = useSelector(state => state.user, []);

  const dispatch = useDispatch();
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      dispatch(
        loginAction({
          userId,
          userPassword
        })
      );
    },
    [userId, userPassword]
  );

  return (
    <Form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={userId} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">패스워드</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={userPassword}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" htmlType="submit" loading={isLoggedInPending}>
            { isLoggedInPending ? "로그인 중" : "로그인"}
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
