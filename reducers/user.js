import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../actions';

export const initialState = {
  signInLoading: false,
  signInDone: false,
  signInError: null,

  signOutLoading: false,
  signOutDone: false,
  signOutError: null,

  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpdata: {},
  signInData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'minwoo',
  Posts: [],
  Followings: [],
  Followers: [],
});

// action creator
export function signInRequestAction(data) {
  return {
    type: SIGN_IN_REQUEST,
    data,
  };
}

export function signOutRequestAction() {
  return {
    type: SIGN_OUT_REQUEST,
  };
}

export function signUpRequestAction(data) {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        signInLoading: true,
        signInDone: false,
        signInError: null,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signInLoading: false,
        signInDone: true,
        // Temporary nickname dummy data
        me: dummyUser(action.data),
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        signInLoading: false,
        signInError: action.error,
      };

    case SIGN_OUT_REQUEST:
      return {
        ...state,
        signOutLoading: true,
        signOutDone: false,
        signOutError: null,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        signOutLoading: false,
        signOutDone: true,
      };

    case SIGN_OUT_FAILURE:
      return {
        ...state,
        signOutLoading: false,
        signOutError: action.error,
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };

    default:
      return state;
  }
}

export default reducer;
