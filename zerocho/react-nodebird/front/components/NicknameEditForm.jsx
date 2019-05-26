import React, { useState, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const [editedName, setEditedName] = useState('');

  const { me } = useSelector(state => state.user, []);

  const dispatch = useDispatch();

  const onChangeNickname = useCallback(
    e => {
      e.preventDefault();
      setEditedName(e.target.value);
    },
    [editedName],
  );

  const onEditNickname = useCallback(
    e => {
      e.preventDefault();

      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: editedName,
      });
    },
    [editedName],
  );

  return (
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d0d0d0',
        padding: '20px',
      }}
      onSubmit={onEditNickname}
    >
      <Input
        addonBefore="닉네임"
        onChange={onChangeNickname}
        value={editedName || (me && me.nickname)}
      />
      <Button type="primary" htmlType="submit">
        수정
      </Button>
    </Form>
  );
};

export default NicknameEditForm;
