import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const SigninWrapper = styled(Form)`
  padding: 10px;
`;

function SigninForm({ setIsSignedIn }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsSignedIn(true);
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

SigninForm.propTypes = {
  setIsSignedIn: PropTypes.func.isRequired,
};

export default SigninForm;
