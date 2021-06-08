import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

function Signup() {
  return (
    <>
      <Head>
        <title>Signup | Tweeter</title>
      </Head>
      <AppLayout>
        <div>Signup</div>
      </AppLayout>
    </>
  );
}

export default Signup;
