import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

import UserProfile from '../components/UserProfile';
import SigninForm from '../components/SigninForm';

const { Search } = Input;
const { Item } = Menu;

function AppLayout({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div>
      <Menu mode="horizontal">
        <Item key="tweeter">
          <Link href="/">
            <a>Tweeter</a>
          </Link>
        </Item>
        <Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Item>
        <Item key="hashtag">
          <Search enterButton style={{ verticalAlign: 'middle' }} />
        </Item>
        <Item key="signup">
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isSignedIn ? <UserProfile /> : <SigninForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://pedantic-payne-51a393.netlify.app/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Hire me
          </a>
        </Col>
      </Row>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
