import { Button, Form, Input } from 'antd';
import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPostRequestAction } from '../reducers/post';

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
    dispatch(addPostRequestAction(text));
  }, [text]);

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
        <input type="file" multiple hidden ref={imageInput} />
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
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
