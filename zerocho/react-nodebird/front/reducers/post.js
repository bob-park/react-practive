import produce from 'immer';

export const initialState = {
  mainPosts: [], // 화면에 보일 포스트들
  loadingMainPosts: false,
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: false, // 포스트 업로드 실패 사유,
  isAddingPost: false, // 포스트 업로드 중,
  postAdded: false, // 포스트가 추가
  isAddingComment: false,
  commentAdded: false,
  addCommentErrorReason: '',
  hasMorePost: false,
};

export const LOAD_MAIN_POSTS_REQUEST = 'POST/LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'POST/LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'POST/LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'POST/LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'POST/LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'POST/LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'POST/LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'POST/LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'POST/LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'POST/UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'POST/UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'POST/UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'POST/REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'POST/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'POST/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'POST/ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'POST/LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'POST/LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'POST/LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'POST/UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'POST/UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'POST/UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'POST/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'POST/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'POST/ADD_COMMENT_FAILURE';

export const LOAD_COMMENT_REQUEST = 'POST/LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS = 'POST/LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE = 'POST/LOAD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'POST/RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'POST/RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'POST/RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'POST/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'POST/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'POST/REMOVE_POST_FAILURE';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.isAddingPost = true;
        draft.postAdded = false;
        draft.addPostErrorReason = '';
        break;

      case ADD_POST_SUCCESS:
        draft.isAddingPost = false;
        draft.mainPosts.unshift(action.data);
        draft.postAdded = true;
        draft.imagePaths = [];
        break;

      case ADD_POST_FAILURE:
        return {
          ...state,
          isAddingPost: false,
          addPostErrorReason: action.error,
        };

      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST:
        draft.mainPosts = action.lastId ? state.mainPosts : [];
        draft.hasMorePost = action.lastId ? state.hasMorePost : true;
        draft.loadingMainPosts = true;

        break;

      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS:
        action.data
          .filter(
            target =>
              draft.mainPosts.findIndex(post => post.id === target.id) < 0,
          )
          .forEach(item => draft.mainPosts.push(item));

        draft.hasMorePost = action.data.length === 10;
        break;

      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE:
        draft.loadingMainPosts = false;
        break;

      case ADD_COMMENT_REQUEST:
        return {
          ...state,
          isAddingComment: true,
          commentAdded: false,
        };
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );

        draft.mainPosts[postIndex].Comments.push(action.data.comment);
        draft.isAddingComment = false;
        draft.commentAdded = true;

        break;
      }

      case ADD_COMMENT_FAILURE:
        return {
          ...state,
          isAddingComment: false,
          addCommentErrorReason: action.error,
        };

      case LOAD_COMMENT_REQUEST:
        break;

      case LOAD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );

        draft.mainPosts[postIndex].Comments = action.data.comments;

        break;
      }

      case LOAD_COMMENT_FAILURE:
        break;

      case UPLOAD_IMAGES_REQUEST:
        break;

      case UPLOAD_IMAGES_SUCCESS:
        action.data.forEach(p => {
          draft.imagePaths.push(p);
        });

        break;

      case UPLOAD_IMAGES_FAILURE:
        break;

      case REMOVE_IMAGE:
        const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        draft.imagePaths.splice(index, 1);
        break;

      case LIKE_POST_REQUEST:
        break;

      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );

        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });

        break;
      }

      case LIKE_POST_FAILURE:
        break;

      case UNLIKE_POST_REQUEST:
        break;

      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId,
        );

        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
          v => v.id === action.data.userId,
        );

        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);

        break;
      }

      case UNLIKE_POST_FAILURE:
        break;

      case RETWEET_REQUEST:
        break;

      case RETWEET_SUCCESS: {
        return {
          ...state,
          mainPosts: [action.data, ...state.mainPosts],
        };
      }

      case RETWEET_FAILURE:
        break;

      case REMOVE_POST_REQUEST:
        break;

      case REMOVE_POST_SUCCESS: {
        return {
          ...state,
          mainPosts: state.mainPosts.filter(v => v.id !== action.data),
        };
      }

      case REMOVE_POST_FAILURE:
        break;

      default:
        break;
    }
  });
};
