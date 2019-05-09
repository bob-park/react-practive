import React, { useCallback } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

import { useInput } from "../pages/signup";

const LoginForm = () => {
  const [userId, onChangeId] = useInput("");
  const [userPassword, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      // eslint-disable-next-line no-console
      console.log({
        userId,
        userPassword
      });
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
      <div style={{marginTop : "10px"}}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
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
