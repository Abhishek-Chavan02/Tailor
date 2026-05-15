import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../constant"
import { api } from "../../utils/api"
import Swal from "sweetalert2";


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

          Swal.fire({
              title: "Success!",
              text: "Login successfully",
              icon: "success",
              confirmButtonText: "OK",
            });

    }catch(err){
           const errorMessage =
      err.message?.split(" - ")[1] || err.message || "Signup failed";
         dispatch({
      type: USER_LOGIN_FAIL,
      payload: "errorMessage",
    });
      Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
    }
}


export const signup = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const payload = { action: "create", ...formdata };
    const data = await api.post("/api/users", payload);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: formdata,
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Signup successful",
    });

  } catch (err) {
    const errorMessage =
      err.message?.split(" - ")[1] || err.message || "Signup failed";

    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: errorMessage,
    });

    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  }
};

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
        
        dispatch({ type: USER_LOGOUT_SUCCESS }); // Still clear state on error
    }
};