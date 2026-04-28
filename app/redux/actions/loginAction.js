import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constant"


export const login = (formdata) =>async(dispatch) =>{

    try{
        dispatch({type: USER_LOGIN_REQUEST});
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:formdata
        });

    }catch(err){
 dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Wrong credentials",
    });
    }
}