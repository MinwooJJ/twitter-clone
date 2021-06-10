import { Card, Avatar, Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signoutAction } from '../reducers/user';

const { Meta } = Card;

function UserProfile() {
  const dispatch = useDispatch();

  const onSignout = useCallback(() => {
    dispatch(signoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="posts">
          Posts
          <br />0
        </div>,
        <div key="following">
          Following
          <br />0
        </div>,
        <div key="follower">
          Follower
          <br />0
        </div>,
      ]}
    >
      <Meta title="Minwoo" avatar={<Avatar>MW</Avatar>} />
      <Button onClick={onSignout}>Signout</Button>
    </Card>
  );
}

export default UserProfile;
