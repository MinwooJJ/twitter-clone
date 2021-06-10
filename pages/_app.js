import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
function Tweeter({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Tweeter</title>
      </Head>
      <Component />
    </>
  );
}

Tweeter.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Tweeter);
