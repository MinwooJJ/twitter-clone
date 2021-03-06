import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

import {
  removePostRequestAction,
  likePostRequestAction,
  unlikePostRequestAction,
  retweetRequestAction,
  updatePostRequestAction,
} from '../reducers/post';

const { Meta } = Card;
const { Group } = Button;

moment.locale();
function PostCard({ post }) {
  // dummy data
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = me?.id;
  const liked = post.Likers.find((v) => v.id === id);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdatePost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText) => () => {
      dispatch(
        updatePostRequestAction({
          PostId: post.id,
          content: editText,
        })
      );
    },
    [post]
  );

  const onLike = useCallback(() => {
    if (!id) {
      return alert('Signin is required');
    }

    return dispatch(likePostRequestAction(post.id));
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('Signin is required');
    }

    return dispatch(unlikePostRequestAction(post.id));
  }, [id]);

  const onToggleComment = useCallback(() => {
    if (!id) {
      return alert('Signin is required');
    }

    return setCommentFormOpened((prev) => !prev);
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('Signin is required');
    }

    return dispatch(removePostRequestAction(post.id));
  }, [post.id, id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('Signin is required');
    }

    return dispatch(retweetRequestAction(post.id));
  }, [id]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="red" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && (
                      <Button onClick={onClickUpdate}>Edit</Button>
                    )}
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button>Report</Button>
                )}
              </Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname} retweeted it` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('MM.DD.YYYY')}
            </div>
            <Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                  onCancelUpdatePost={onCancelUpdatePost}
                  onChangePost={onChangePost}
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('MM.DD.YYYY')}
            </div>
            <Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  postData={post.content}
                  onCancelUpdatePost={onCancelUpdatePost}
                  onChangePost={onChangePost}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} with comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
