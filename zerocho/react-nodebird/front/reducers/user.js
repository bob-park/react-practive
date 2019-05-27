import produce from 'immer';

export const initialState = {
  //isLoggedIn: false, // 로그인 여부
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  logOutErrorReason: '', // 로그 아웃 실패 사유
  signedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보,
  isEdittingNickname: false,
  editNicknameErrorReason: '',
  hasMoreFollower: false,
  hasMoreFollowing: false,
};

export const SIGN_UP_REQUEST = 'USER/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'USER/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'USER/SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'USER/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'USER/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'USER/LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'USER/LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'USER/LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'USER/LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'USER/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'USER/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'USER/LOG_OUT_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'USER/LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'USER/LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'USER/LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'USER/LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'USER/LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'USER/LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_REQUEST = 'USER/FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'USER/FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'USER/FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'USER/UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'USER/UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'USER/UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'USER/REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'USER/REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'USER/REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'USER/ADD_POST_TO_ME';

export const EDIT_NICKNAME_REQUEST = 'USER/EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'USER/EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'USER/EDIT_NICKNAME_FAILURE';

export const REMOVE_POST_OF_ME = 'USER/REMOVE_POST_OF_ME';

export const loginRequestAction = data => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = {
  type: LOG_OUT_REQUEST,
};

export const singUpRequestAction = data => ({
  type: SIGN_UP_REQUEST,
  data,
});

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        return {
          ...state,
          isLoggingIn: true,
        };

      case LOG_IN_SUCCESS:
        return {
          ...state,
          isLoggingIn: false,
          //isLoggedIn: true,
          logInErrorReason: '',
          me: action.data,
        };

      case LOG_IN_FAILURE:
        return {
          ...state,
          isLoggingIn: false,
          //isLoggedIn: false,
          logInErrorReason: '',
          me: null,
        };

      case LOG_OUT_REQUEST:
        return {
          ...state,
          isLoggingOut: true,
        };

      case LOG_OUT_SUCCESS:
        return {
          ...state,
          isLoggingOut: false,
          //isLoggedIn: false,
          logOutErrorReason: '',
          me: null,
        };

      case LOG_OUT_FAILURE:
        return {
          ...state,
          isLoggingOut: false,
          logOutErrorReason: action.error,
        };

      case SIGN_UP_REQUEST:
        return {
          ...state,
          isSigningUp: true,
        };

      case SIGN_UP_SUCCESS:
        return {
          ...state,
          isSigningUp: false,
          signUpErrorReason: '',
        };

      case SIGN_UP_FAILURE:
        return {
          ...state,
          isSigningUp: false,
          signUpErrorReason: action.error,
        };

      case LOAD_USER_REQUEST:
        return {
          ...state,
        };

      case LOAD_USER_SUCCESS:
        if (action.me) {
          return {
            ...state,
            me: action.data,
          };
        }

        return {
          ...state,
          userInfo: action.data,
        };

      case LOAD_USER_FAILURE:
        return {
          ...state,
        };

      case FOLLOW_USER_REQUEST:
        return {
          ...state,
        };

      case FOLLOW_USER_SUCCESS:
        draft.me.Followers.unshift({ id: action.data });

        break;

      case FOLLOW_USER_FAILURE:
        return {
          ...state,
        };

      case UNFOLLOW_USER_REQUEST:
        return {
          ...state,
        };

      case UNFOLLOW_USER_SUCCESS:
        return {
          ...state,
          me: {
            ...state.me,
            Followings: state.me.Followings.filter(v => v.id !== action.data),
          },
          followingList: state.followingList.filter(v => v.id !== action.data),
        };

      case UNFOLLOW_USER_FAILURE:
        return {
          ...state,
        };

      case ADD_POST_TO_ME:
        return {
          ...state,
          me: {
            ...state.me,
            Posts: [{ id: action.data }, ...state.me.Posts],
          },
        };

      case LOAD_FOLLOWINGS_REQUEST:
        return {
          ...state,
          hasMoreFollowing: action.offset ? state.hasMoreFollowing : true,
          followingList: action.offset ? state.followingList : [],
        };

      case LOAD_FOLLOWINGS_SUCCESS:
        return {
          ...state,
          followingList: state.followingList.concat(action.data),
          hasMoreFollowing: action.data.length === 3,
        };

      case LOAD_FOLLOWINGS_FAILURE:
        return {
          ...state,
        };

      case LOAD_FOLLOWERS_REQUEST:
        return {
          ...state,
          hasMoreFollower: action.offset ? state.hasMoreFollower : true,
          followerList: action.offset ? state.followerList : [],
        };

      case LOAD_FOLLOWERS_SUCCESS:
        return {
          ...state,
          followerList: state.followerList.concat(action.data),
          hasMoreFollower: action.data.length === 3,
        };

      case LOAD_FOLLOWERS_FAILURE:
        return {
          ...state,
        };

      case REMOVE_FOLLOWER_REQUEST:
        return {
          ...state,
        };

      case REMOVE_FOLLOWER_SUCCESS:
        return {
          ...state,
          me: {
            ...state.me,
            Followers: state.me.Followers.filter(v => v.id !== action.data),
          },
          followerList: state.followerList.filter(v => v.id !== action.data),
        };

      case REMOVE_FOLLOWER_FAILURE:
        return {
          ...state,
        };

      case EDIT_NICKNAME_REQUEST:
        return {
          ...state,
          isEditingNickname: true,
          editNicknameErrorReason: '',
        };

      case EDIT_NICKNAME_SUCCESS:
        return {
          ...state,
          me: {
            ...state.me,
            nickname: action.data,
          },
          isEditingNickname: false,
          editNicknameErrorReason: '',
        };

      case EDIT_NICKNAME_FAILURE:
        return {
          ...state,
          isEditingNickname: false,
          editNicknameErrorReason: action.error,
        };

      case REMOVE_POST_OF_ME:
        return {
          ...state,
          me: {
            ...state.me,
            Posts: state.me.Posts.filter(v => v.id !== action.data),
          },
        };

      default:
        return state;
    }
  });
};
