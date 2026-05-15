import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constant";

const initialState = {
  userInfo: null,
  loading: false,
  signupInfo:null,
  error:null
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
       error: action.payload,
      };

    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: null,
      };

      case USER_SIGNUP_REQUEST:
        return {
          ...state,
          loading:true
        };

      case USER_SIGNUP_SUCCESS:
        return{
          ...state,
          loading:false,
          signupInfo:action.payload
        };

      case USER_SIGNUP_FAIL :
        return{
          ...state,
          loading:false,
          error: action.payload,
        }

    default:
      return state;
  }
};


export default loginReducer;