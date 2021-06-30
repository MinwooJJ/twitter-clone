import Router from 'next/router';
import React, { useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';
import {
  loadFollowersRequestAction,
  loadFollowingsRequestAction,
  loadMyInfoRequestAction,
} from '../reducers/user';

function Profile() {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFollowersRequestAction());
    dispatch(loadFollowingsRequestAction());
  }, []);

  useEffect(() => {
    if (!me?.id) {
      Router.push('/');
    }
  }, [me?.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My profile | Tweeter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following List" data={me.Followings} />
        <FollowList header="Follower List" data={me.Followers} />
      </AppLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      console.log('getServerSideProps start');
      const cookie = req?.headers.cookie;
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch(loadMyInfoRequestAction());
      store.dispatch(END);
      console.log('getServerSideProps end');
      await store.sagaTask.toPromise();
    }
);

export default Profile;
