export const initialState = {
  isSignedIn: false,
  me: null,
  signUpdata: {},
  signinData: {},
};

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

// action creator
export function signinAction(data) {
  return {
    type: SIGN_IN,
    data,
  };
}

export function signoutAction() {
  return {
    type: SIGN_OUT,
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        me: action.data,
      };

    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        me: null,
      };

    default:
      return state;
  }
}

export default reducer;
