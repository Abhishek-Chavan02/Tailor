import { api } from "../../utils/api";
import {
  PANT_MEASUREMENT_GET_FAIL,
  PANT_MEASUREMENT_GET_REQUEST,
  PANT_MEASUREMENT_GET_SUCCESS,
} from "../constant";

export const getPantMeasurementsCustomerId =
  (customerId) => async (dispatch) => {
    try {
      dispatch({
        type: PANT_MEASUREMENT_GET_REQUEST,
      });

      const payload = { action: "getByCustomerId", customerId };
      const data = await api.post(`/api/pant-measurements`, payload);
      dispatch({
        type: PANT_MEASUREMENT_GET_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PANT_MEASUREMENT_GET_FAIL,
        payload: err.message,
      });
    }
  };
