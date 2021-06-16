import produce from 'immer';
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
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_IN_REQUEST:
        draft.signInLoading = true;
        draft.signInDone = false;
        draft.signInError = null;
        break;

      case SIGN_IN_SUCCESS:
        draft.signInLoading = false;
        draft.signInDone = true;
        draft.me = dummyUser(action.data);
        break;

      case SIGN_IN_FAILURE:
        draft.signInLoading = false;
        draft.signInError = action.error;
        break;

      case SIGN_OUT_REQUEST:
        draft.signOutLoading = true;
        draft.signOutDone = false;
        draft.signOutError = null;
        break;

      case SIGN_OUT_SUCCESS:
        draft.signOutLoading = false;
        draft.signOutDone = true;
        break;

      case SIGN_OUT_FAILURE:
        draft.signOutLoading = false;
        draft.signOutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;

      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;

      default:
        break;
    }
  });
}

export default reducer;
