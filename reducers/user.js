export const initialState = {
  isSignedIn: false,
  user: null,
  signUpdata: {},
  signinData: {},
};

// action creator
export function signinAction(data) {
  return {
    type: 'SIGN_IN',
    data,
  };
}

export function signoutAction() {
  return {
    type: 'SIGN_OUT',
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
        user: action.data,
      };

    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };

    default:
      return state;
  }
}

export default reducer;
