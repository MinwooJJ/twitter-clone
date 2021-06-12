export const initialState = {
  isSignedIn: false,
  isSigningIn: false,
  isSigningOut: false,
  me: null,
  signUpdata: {},
  signInData: {},
};

const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

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

function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isSigningIn: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: true,
        // Temporary nickname dummy data
        me: { ...action.data, nickname: 'minwoo' },
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: false,
      };

    case SIGN_OUT_REQUEST:
      return {
        ...state,
        isSigningOut: true,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isSigningOut: false,
        isSignedIn: false,
        me: null,
      };

    case SIGN_OUT_FAILURE:
      return {
        ...state,
        isSigningOut: false,
      };

    default:
      return state;
  }
}

export default reducer;
