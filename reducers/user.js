import shortId from 'shortid';
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
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
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

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  me: null,
  signUpdata: {},
  signInData: {},
};

const dummyUser = (data) => ({
  ...data,
  id: 1,
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

export function changeNicknameRequestAction(data) {
  return {
    type: CHANGE_NICKNAME_REQUEST,
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

    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };

    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };

    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };

    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };

    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };

    default:
      return state;
  }
}

export default reducer;
