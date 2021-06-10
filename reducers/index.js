const initialState = {
  user: {
    isSignedIn: false,
    user: null,
    signUpdata: {},
    signinData: {},
  },
  post: {
    mainPosts: [],
  },
};

// action creator
export const signinAction = (data) => {
  return {
    type: 'SIGN_IN',
    data,
  };
};

export const signoutAction = () => {
  return {
    type: 'SIGN_OUT',
  };
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isSignedIn: true,
          user: action.data,
        },
      };

    case 'SIGN_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isSignedIn: false,
          user: null,
        },
      };

    default:
      return state;
  }
}

export default rootReducer;
