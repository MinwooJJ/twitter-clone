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
          content: 'Wow!',
        },
        {
          User: {
            nickname: 'yessi',
          },
          content: 'Cool!',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
}

export default reducer;
