import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { changeNicknameRequestAction } from '../reducers/user';

const { Search } = Input;

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

function NicknameEditForm() {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || ''); // 페이지 접근시 input에 현재 닉네임 띄우기 위함
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequestAction(nickname));
  }, [nickname]);

  return (
    <FormWrapper>
      <Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="Nickname"
        enterButton="Edit"
        onSearch={onSubmit}
      />
    </FormWrapper>
  );
}

export default NicknameEditForm;
