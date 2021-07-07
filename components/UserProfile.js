import { Card, Avatar, Button } from 'antd';
import React, { useCallback } from 'react';
import Link from 'next/link';
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
          <Link href={`/user/${me.id}`}>
            <a>Posts</a>
          </Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key="following">
          <Link href="/profile">
            <a>Following</a>
          </Link>
          <br />
          {me.Followings.length}
        </div>,
        <div key="follower">
          <Link href="/profile">
            <a>Follower</a>
          </Link>
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Meta
        title={me.nickname}
        avatar={
          <Link href={`/user/${me.id}`} prefetch={false}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
      />
      <Button onClick={onSignout} loading={signOutLoading}>
        SignOut
      </Button>
    </Card>
  );
}

export default UserProfile;
