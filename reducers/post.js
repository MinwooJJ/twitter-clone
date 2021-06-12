import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from '../actions';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'min',
      },
      content: 'First post #hashtag #express',
      Images: [
        {
          src: 'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
        },
        {
          src: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png',
        },
        {
          src: 'https://blog.kakaocdn.net/dn/x0By5/btqzvqqdDPp/8PZJ4aMKkNgBJAtPySP5Ik/img.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'imme',
          },
          content: 'Wow! You are so hot',
        },
        {
          User: {
            nickname: 'yessi',
          },
          content: 'You are really my type',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const addPostRequest = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: 'dummy data',
  User: {
    id: 1,
    nickname: 'min',
  },
  Images: [],
  Comments: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentLoading: false,
        addCommentDone: true,
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
}

export default reducer;
