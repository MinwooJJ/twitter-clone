import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { signInRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const SigninWrapper = styled(Form)`
  padding: 10px;
`;

function SigninForm() {
  const dispatch = useDispatch();
  const { signInLoading, signInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (signInError) {
      alert(signInError);
    }
  }, [signInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(signInRequestAction({ email, password }));
  }, [email, password]);

  return (
    <SigninWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">E-mail</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
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
        <Button type="primary" htmlType="submit" loading={signInLoading}>
          SignIn
        </Button>
        <Link href="/signup">
          <a>
            <Button>SignUp</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </SigninWrapper>
  );
}

export default SigninForm;
