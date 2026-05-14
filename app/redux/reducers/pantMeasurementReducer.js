import {
    PANT_MEASUREMENT_GET_FAIL,
    PANT_MEASUREMENT_GET_REQUEST,
    PANT_MEASUREMENT_GET_SUCCESS,
} from "../constant";

const initialState = {
    loading: false,
    error: null,
    userPantMeasurementinfo: null
};

const pantMeasurementReducer = (state = initialState, action) => {
    switch (action.type) {
        case PANT_MEASUREMENT_GET_REQUEST:
            return { loading: true };
        case PANT_MEASUREMENT_GET_SUCCESS:
            return { loading: false, userPantMeasurementinfo: action.payload };
        case PANT_MEASUREMENT_GET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export default pantMeasurementReducer;
