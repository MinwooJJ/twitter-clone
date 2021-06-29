import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { loadUserRequestAction } from '../reducers/user';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>Minwoo | Tweeter</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              Posts
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="Tweeter Hero"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(loadUserRequestAction(2));
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Profile;
