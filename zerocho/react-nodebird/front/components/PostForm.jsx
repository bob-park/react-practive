import React, { useState, useCallback, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Form, Button, Input } from 'antd';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';

const PostForm = () => {
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');

  const imageInput = useRef();

  const { me } = useSelector(state => state.user, []);
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.post,
    [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setText('');
  }, [postAdded === true]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.');
      }

      const formData = new FormData();

      imagePaths.forEach(image => {
        formData.append('image', image);
      });

      formData.append('content', text);

      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [text, imagePaths],
  );

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onChangeImagePath = useCallback(e => {
    console.log(e.target.files);

    const imageFormData = new FormData();

    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index,
      });
    },
    [],
  );

  return (
    <Form
      encType="multipart/form-data"
      style={{ margin: '10px 0 20px' }}
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        onChange={onChangeText}
        value={text}
      />
      <div>
        <input
          type="file"
          multiple
          hidden
          onChange={onChangeImagePath}
          value={imagePath}
          ref={imageInput}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={isAddingPost}
        >
          {isAddingPost ? '게시 중' : '게시'}
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
