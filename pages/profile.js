import Router from 'next/router';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

function Profile() {
  const { me } = useSelector((state) => state.user);

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

export default Profile;
