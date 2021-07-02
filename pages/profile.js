import Router from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';
import { loadMyInfoRequestAction } from '../reducers/user';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((response) => response.data);

function Profile() {
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const { me } = useSelector((state) => state.user);
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followingsLimit}`,
    fetcher
  );

  useEffect(() => {
    if (!me?.id) {
      Router.push('/');
    }
  }, [me?.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return <div>Loading my information</div>;
  }

  if (followerError || followingError) {
    console.error(followingError || followingError);
    return <div>Error occurred while loading follow and following data</div>;
  }

  return (
    <>
      <Head>
        <title>My profile | Tweeter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="Following List"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header="Follower List"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
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
