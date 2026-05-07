import { api } from "../../utils/api";
import {
    MEASUREMENT_CREATE_FAIL,
    MEASUREMENT_CREATE_REQUEST,
    MEASUREMENT_CREATE_SUCCESS,
    MEASUREMENT_GET_BY_DATE_FAIL,
    MEASUREMENT_GET_BY_DATE_REQUEST,
    MEASUREMENT_GET_BY_DATE_SUCCESS,
    MEASUREMENT_GET_FAIL,
    MEASUREMENT_GET_REQUEST,
    MEASUREMENT_GET_SUCCESS,
} from "../constant";

export const createMeasurement = (formdata) => async (dispatch) => {
    try {
        dispatch({type: MEASUREMENT_CREATE_REQUEST});
         const payload = { action: "create", ...formdata };
        const data = await api.post('/api/measurements', payload);
        dispatch({
            type: MEASUREMENT_CREATE_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: MEASUREMENT_CREATE_FAIL,
            payload: err.message
        });
    }
}

export const getMeasurementsCustomerId = (customerId) => async (dispatch) => {
    try {
        dispatch({type: MEASUREMENT_GET_REQUEST});
         const payload = { action: "getByCustomerId", customerId };
         console.log("payload", payload);
        const data = await api.post(`/api/shirt-measurements`, payload);
        dispatch({
            type: MEASUREMENT_GET_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: MEASUREMENT_GET_FAIL,
            payload: err.message
        });
    }
}

export const getMeasurementsByDate = () => async (dispatch) => {
    try {
        dispatch({type: MEASUREMENT_GET_BY_DATE_REQUEST});
        const payload = { action: "getShirtByDate" };
        const data = await api.post(`/api/shirt-measurements`, payload);
        dispatch({
            type: MEASUREMENT_GET_BY_DATE_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: MEASUREMENT_GET_BY_DATE_FAIL,
            payload: err.message
        });
    }
}

