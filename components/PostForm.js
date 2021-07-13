import { Button, Form, Input } from 'antd';
import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  addPostRequestAction,
  removeImageAction,
  uploadImagesRequestAction,
} from '../reducers/post';
import backUrl from '../config/config';

const TextArea = Input;

function PostForm() {
  const { imagePaths, addPostDone, addPostLoading } = useSelector(
    (state) => state.post
  );
  const [text, onChangeText, setText] = useInput('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('Please write a post');
    }

    // image upload
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    dispatch(addPostRequestAction(formData));
  }, [text, imagePaths]);

  const onChangeImages = useCallback((e) => {
    // multipart로 처리
    const imageFormData = new FormData();
    // 유사객체이기 때문에 forEach를 빌려 쓰는 것
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch(uploadImagesRequestAction(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeImageAction(index));
    },
    []
  );

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder={"What's happening"}
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={addPostLoading}
        >
          Tweet
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
