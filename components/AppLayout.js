import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import UserProfile from '../components/UserProfile';
import SigninForm from '../components/SigninForm';

const Global = createGlobalStyle`
  .ant-row {
    margin-right : 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const { Item } = Menu;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function AppLayout({ children }) {
  const { isSignedIn } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
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
          <SearchInput />
        </Item>
        <Item key="signup">
          <Link href="/signup">
            <a>SignUp</a>
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
