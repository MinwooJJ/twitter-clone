import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  unfollowRequestAction,
  removeFollowerRequestAction,
} from '../reducers/user';

const { Item } = List;
const { Meta } = Card;

function FollowList({ header, data }) {
  const dispatch = useDispatch();
  const onClick = useCallback(
    (id) => () => {
      if (header === 'Following List') {
        dispatch(unfollowRequestAction(id));
      } else {
        dispatch(removeFollowerRequestAction(id));
      }
    },
    []
  );

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>Load More</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onClick(item.id)} />]}
          >
            <Meta description={item.nickname} />
          </Card>
        </Item>
      )}
    />
  );
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
