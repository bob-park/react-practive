const dummyUser = {
  nickname: "현우 박",
  Post: [],
  Followings: [],
  Followers: []
};

export const initialState = {
  isLoggedInPending: false,
  isLoggedIn: false,
  user: null,
  signUpData: []
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const loginAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data
  };
};

export const logoutAction = {
  type: LOG_OUT_REQUEST
};

export const singUpAction = data => {
  return {
    type: SIGN_UP_REQUEST,
    data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggedInPending: true
      };

    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggedInPending: false,
        isLoggedIn: true,
        user: dummyUser
      };

    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedInPending: false,
        isLoggedIn: false
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpData: [...state.signUpData, action.data]
      };

    default:
      return state;
  }
};

export default reducer;
