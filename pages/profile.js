import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

function Profile() {
  const followingList = [
    { nickname: 'min' },
    { nickname: 'imme' },
    { nickname: 'yessi' },
  ];
  const followerList = [
    { nickname: 'min' },
    { nickname: 'imme' },
    { nickname: 'yessi' },
  ];

  return (
    <>
      <Head>
        <title>My profile | Tweeter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following List" data={followingList} />
        <FollowList header="Follower List" data={followerList} />
      </AppLayout>
    </>
  );
}

export default Profile;
