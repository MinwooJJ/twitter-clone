import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

function Home() {
  return (
    <>
      <Head>
        <title>Tweeter</title>
      </Head>
      <AppLayout>
        <div>Hi! Tweeter</div>
      </AppLayout>
    </>
  );
}

export default Home;
