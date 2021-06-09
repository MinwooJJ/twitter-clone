import { Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Search } = Input;

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

function NicknameEditForm() {
  return (
    <FormWrapper>
      <Search addonBefore="Nickname" enterButton="Edit" />
    </FormWrapper>
  );
}

export default NicknameEditForm;
