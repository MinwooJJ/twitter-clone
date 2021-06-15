import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { signUpRequestAction } from '../reducers/user';

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
  const { signUpLoading } = useSelector((state) => state.user);

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
    <>
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
    </>
  );
}

export default Signup;
