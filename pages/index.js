import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadPostsRequestAction } from '../reducers/post';
import { loadMyInfoRequestAction } from '../reducers/user';
import wrapper from '../store/configureStore';

function Home() {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id; // 마지막 게시글 id
          dispatch(loadPostsRequestAction(lastId));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('Home: getServerSideProps start');
    // *** 중요 ***
    const cookie = context.req?.headers.cookie;
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    // 새로고침시 로그인 유지를 위한 dispatch
    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(loadPostsRequestAction());

    context.store.dispatch(END);
    console.log('Home: getServerSideProps end');
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
