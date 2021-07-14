import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from './UserProfile';
import SigninForm from './SigninForm';
import useInput from '../hooks/useInput';

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
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);

  // Enter 클릭 시 onSearch 실행
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu
        mode="horizontal"
        style={{ position: 'fixed', width: '100%', zIndex: 1000 }}
      >
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
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Item>
      </Menu>
      <Row gutter={8} style={{ paddingTop: '46px' }}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <SigninForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.linkedin.com/in/minwoo-jung-9857331b8/"
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
