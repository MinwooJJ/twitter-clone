import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input } from 'antd';

const ErrorMessage = styled.div`
  color: red;
`;

function Signup() {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [term, setTerm] = useState('');

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

    console.log(id, nickname, password);
  }, [password, passwordCheck, term, id, nickname]);

  return (
    <>
      <AppLayout>
        <Head>
          <title>Signup | Tweeter</title>
        </Head>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-id">ID</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
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
            >{`I won't curse`}</Checkbox>
            {termError && <ErrorMessage>Required Field</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
}

export default Signup;
