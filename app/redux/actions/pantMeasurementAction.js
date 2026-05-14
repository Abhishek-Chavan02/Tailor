import { api } from "../../utils/api";
import {
  PANT_MEASUREMENT_GET_BY_DATE_FAIL,
  PANT_MEASUREMENT_GET_BY_DATE_REQUEST,
  PANT_MEASUREMENT_GET_BY_DATE_SUCCESS,
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

  export const getPantMeasurementsByDate =()=> async(dispatch)=>{
    try{
      dispatch({
        type:PANT_MEASUREMENT_GET_BY_DATE_REQUEST
      })

    const payload = { action: "getPantByDate" };
    const data = await api.post(`/api/pant-measurements`, payload);
    console.log('data: ', data);
    dispatch({
      type:PANT_MEASUREMENT_GET_BY_DATE_SUCCESS,
     payload:data
    })
    }catch(err){
      dispatch({
        type:PANT_MEASUREMENT_GET_BY_DATE_FAIL,
        payload:err.message
      })
    }
  }
