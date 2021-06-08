import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

function Profile() {
  return (
    <>
      <Head>
        <title>My profile | Tweeter</title>
      </Head>
      <AppLayout>
        <div>My profile</div>
      </AppLayout>
    </>
  );
}

export default Profile;
