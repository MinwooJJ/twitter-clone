import { Card, Avatar, Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutRequestAction } from '../reducers/user';

const { Meta } = Card;

function UserProfile() {
  const dispatch = useDispatch();
  const { me, signOutLoading } = useSelector((state) => state.user);

  const onSignout = useCallback(() => {
    dispatch(signOutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="posts">
          Posts
          <br />
          {me.Posts.length}
        </div>,
        <div key="following">
          Following
          <br />
          {me.Followings.length}
        </div>,
        <div key="follower">
          Follower
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Meta title={me.nickname} avatar={<Avatar>{me.nickname[0]}</Avatar>} />
      <Button onClick={onSignout} loading={signOutLoading}>
        SignOut
      </Button>
    </Card>
  );
}

export default UserProfile;
