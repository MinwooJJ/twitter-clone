import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Group } = Button;
function PostCardContent({
  postData,
  editMode,
  onChangePost,
  onCancelUpdatePost,
}) {
  const [editText, setEditText] = useState(postData);
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    console.log('PostCardContent Rendering!!');
    if (updatePostDone) {
      onCancelUpdatePost();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Group>
            <Button
              loading={updatePostLoading}
              onClick={onChangePost(editText)}
            >
              Edit
            </Button>
            <Button type="danger" onClick={onCancelUpdatePost}>
              Cancel
            </Button>
          </Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  onCancelUpdatePost: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
