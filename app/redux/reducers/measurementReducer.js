import {
    MEASUREMENT_CREATE_FAIL,
    MEASUREMENT_CREATE_REQUEST,
    MEASUREMENT_CREATE_SUCCESS,
    MEASUREMENT_GET_BY_DATE_FAIL,
    MEASUREMENT_GET_BY_DATE_REQUEST,
    MEASUREMENT_GET_BY_DATE_SUCCESS,
    SHIRT_MEASUREMENT_GET_FAIL,
    SHIRT_MEASUREMENT_GET_REQUEST,
    SHIRT_MEASUREMENT_GET_SUCCESS,
} from "../constant";

const initialState = {
    loading: false,
    error: null,
    userMeasurementinfo: null,
    measurementsByDate: null
};

const measurementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHIRT_MEASUREMENT_GET_REQUEST:
            return { loading: true };
        case SHIRT_MEASUREMENT_GET_SUCCESS:
            return { loading: false, userMeasurementinfo: action.payload };
        case SHIRT_MEASUREMENT_GET_FAIL:
            return { loading: false, error: action.payload };
        case MEASUREMENT_CREATE_REQUEST:
            return { loading: true };
        case MEASUREMENT_CREATE_SUCCESS:
            return { loading: false, success: true };
        case MEASUREMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case MEASUREMENT_GET_BY_DATE_REQUEST:
            return { loading: true };
        case MEASUREMENT_GET_BY_DATE_SUCCESS:
            return { loading: false, measurementsByDate: action.payload };
        case MEASUREMENT_GET_BY_DATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export default measurementReducer;