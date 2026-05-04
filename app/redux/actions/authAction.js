import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../constant"
import { api } from "../../utils/api"


export const login = (formdata) =>async(dispatch) =>{

    try{
        dispatch({type: USER_LOGIN_REQUEST});
        const data = await api.post('/api/auth/login', formdata);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
        }
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
        const payload = { action: "create", ...formdata };
        const data = await api.post('/api/users', payload);
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

export const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    
    try {
        // Clear localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        
        dispatch({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
        console.error('Logout error:', error);
        dispatch({ type: USER_LOGOUT_SUCCESS }); // Still clear state on error
    }
};