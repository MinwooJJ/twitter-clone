import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { followRequestAction, unfollowRequestAction } from '../reducers/user';

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading, followBtnId } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const isClickedBtn = post.User.id === followBtnId;

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction(post.User.id));
    } else {
      dispatch(followRequestAction(post.User.id));
    }
  }, [isFollowing]);
  return (
    <Button
      loading={isClickedBtn && (followLoading || unfollowLoading)}
      onClick={onClickButton}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}

FollowButton.propTypes = {
  // 추 후 shape로
  post: PropTypes.object.isRequired,
};

export default FollowButton;
