import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constant";

const initialState = {
  userInfo: "",
  loading: false,
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
        userInfo: "",
      };

    default:
      return state;
  }
};


export default loginReducer;