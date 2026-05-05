import { api } from '../../utils/api';
import { 
  USER_GET_ALL_REQUEST, 
  USER_GET_ALL_SUCCESS, 
  USER_GET_ALL_FAIL, 
  USER_UPDATE_REQUEST, 
  USER_UPDATE_SUCCESS, 
  USER_UPDATE_FAIL, 
  USER_DELETE_REQUEST, 
  USER_DELETE_SUCCESS, 
  USER_DELETE_FAIL 
} from '../constant';

export const getAllUsers = (formdata) => async (dispatch) => {
    try {
        dispatch({type: USER_GET_ALL_REQUEST});
         const payload = { action: "getAllUsers", ...formdata };
        const data = await api.post('/api/users', payload);
        dispatch({
            type: USER_GET_ALL_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: USER_GET_ALL_FAIL,
            payload: err.message
        });
    }
}

export const updateUser = (formdata) => async (dispatch) => {
    try {
        dispatch({type: USER_UPDATE_REQUEST});
         const payload = { action: "update", ...formdata };
        const data = await api.post('/api/users', payload);
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: err.message
        });
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DELETE_REQUEST});
        const payload = { action: "delete", id };
        const data = await api.post('/api/users', payload);
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err.message
        });
    }
}

