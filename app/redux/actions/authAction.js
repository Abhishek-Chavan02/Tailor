import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constant"
import { api } from "../../utils/api"


export const login = (formdata) =>async(dispatch) =>{

    try{
        dispatch({type: USER_LOGIN_REQUEST});
        const data = await api.post('/api/auth/login', formdata);
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data.user
        });

    }catch(err){
         dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Wrong credentials",
    });
    }
}

export const signup = (formdata) =>async(dispatch) =>{

    try{
        dispatch({type: USER_SIGNUP_REQUEST});
        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:formdata
        });

    }catch(err){
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: "Signup failed",
    });
    }
}