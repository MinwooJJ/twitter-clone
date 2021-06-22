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
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from '../actions';

export const initialState = {
  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

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

  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  followBtnId: '',

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
export function followRequestAction(data) {
  return {
    type: FOLLOW_REQUEST,
    data,
  };
}

export function loadMyInfoRequestAction() {
  return {
    type: LOAD_MY_INFO_REQUEST,
  };
}

export function unfollowRequestAction(data) {
  return {
    type: UNFOLLOW_REQUEST,
    data,
  };
}

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
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        draft.followBtnId = action.data;
        break;

      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        break;

      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        draft.followBtnId = action.data;
        break;

      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data
        );
        break;

      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      case SIGN_IN_REQUEST:
        draft.signInLoading = true;
        draft.signInDone = false;
        draft.signInError = null;
        break;

      case SIGN_IN_SUCCESS:
        draft.signInLoading = false;
        draft.signInDone = true;
        draft.me = action.data;
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
        draft.me = null;
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

      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
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
