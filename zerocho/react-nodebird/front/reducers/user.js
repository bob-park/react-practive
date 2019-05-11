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

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCESS = "SIGN_UP_SUCCESS";

export const loginAction = data => {
  return {
    type: LOG_IN,
    data
  };
};

export const logoutAction = {
  type: LOG_OUT
};

export const singUpAction = data => {
  return {
    type: SIGN_UP,
    data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
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

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };

    case SIGN_UP:
      return {
        ...state,
        signUpData: [...state.signUpData, action.data]
      };

    default:
      return state;
  }
};

export default reducer;
