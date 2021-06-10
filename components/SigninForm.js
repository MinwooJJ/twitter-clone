import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { signinAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const SigninWrapper = styled(Form)`
  padding: 10px;
`;

function SigninForm() {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(signinAction({ id, password }));
  }, [id, password]);

  return (
    <SigninWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          Signin
        </Button>
        <Link href="/signup">
          <a>
            <Button>Signup</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </SigninWrapper>
  );
}

export default SigninForm;
