import { Card, Avatar, Button } from 'antd';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const { Meta } = Card;

function UserProfile({ setIsSignedIn }) {
  const onSignout = useCallback(() => {
    setIsSignedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="posts">
          Posts
          <br />0
        </div>,
        <div key="following">
          Following
          <br />0
        </div>,
        <div key="follower">
          Follower
          <br />0
        </div>,
      ]}
    >
      <Meta title="Minwoo" avatar={<Avatar>MW</Avatar>} />
      <Button onClick={onSignout}>Signout</Button>
    </Card>
  );
}

UserProfile.propTypes = {
  setIsSignedIn: PropTypes.func.isRequired,
};

export default UserProfile;
