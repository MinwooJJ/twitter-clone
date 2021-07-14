import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { signUpRequestAction, loadMyInfoRequestAction } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

function Signup() {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [term, setTerm] = useState('');

  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );

  // replace는 페이지가 기록에서 사라져버림
  useEffect(() => {
    if (me?.id) {
      Router.replace('/');
    }
  }, [me?.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    dispatch(signUpRequestAction({ email, password, nickname }));
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>SignUp | Tweeter</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">E-mail</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nickname">Nickname</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">Password Check</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage style={{ color: 'red' }}>
              Password does not match
            </ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox
            name="user-term"
            checked={term}
            onChange={onChangeTerm}
            // eslint-disable-next-line react/no-unescaped-entities
          >
            I won't curse
          </Checkbox>
          {termError && <ErrorMessage>Required Field</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            SignUp
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('Signup: getServerSideProps start');
    const cookie = context.req?.headers.cookie;
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(END);
    console.log('Signup: getServerSideProps end');
    await context.store.sagaTask.toPromise();
  }
);

export default Signup;
