import { api } from "../../utils/api";
import {
  MEASUREMENT_CREATE_FAIL,
  MEASUREMENT_CREATE_REQUEST,
  MEASUREMENT_CREATE_SUCCESS,
  MEASUREMENT_GET_BY_DATE_FAIL,
  MEASUREMENT_GET_BY_DATE_REQUEST,
  MEASUREMENT_GET_BY_DATE_SUCCESS,
  MEASUREMENT_LIST_FAIL,
  MEASUREMENT_LIST_REQUEST,
  MEASUREMENT_LIST_SUCCESS,
  SHIRT_MEASUREMENT_GET_FAIL,
  SHIRT_MEASUREMENT_GET_REQUEST,
  SHIRT_MEASUREMENT_GET_SUCCESS,
} from "../constant";

export const createMeasurement = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: MEASUREMENT_CREATE_REQUEST });
    const payload = { action: "create", ...formdata };
    const data = await api.post("/api/measurements", payload);
    dispatch({
      type: MEASUREMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MEASUREMENT_CREATE_FAIL,
      payload: err.message,
    });
  }
};

export const getShirtMeasurementsCustomerId =
  (customerId) => async (dispatch) => {
    try {
      dispatch({ type: SHIRT_MEASUREMENT_GET_REQUEST });
      const payload = { action: "getByCustomerId", customerId };
      const data = await api.post(`/api/shirt-measurements`, payload);
      dispatch({
        type: SHIRT_MEASUREMENT_GET_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: SHIRT_MEASUREMENT_GET_FAIL,
        payload: err.message,
      });
    }
  };


export const getMeasurementsByDate = () => async (dispatch) => {
  try {
    dispatch({ type: MEASUREMENT_GET_BY_DATE_REQUEST });
    const payload = { action: "getShirtByDate" };
    const data = await api.post(`/api/shirt-measurements`, payload);
    dispatch({
      type: MEASUREMENT_GET_BY_DATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MEASUREMENT_GET_BY_DATE_FAIL,
      payload: err.message,
    });
  }
};

const DEFAULT_LIST_PAGE_SIZE = 12;

export const getMeasurementList =
  ({ tab = "all", page = 1, limit = DEFAULT_LIST_PAGE_SIZE } = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: MEASUREMENT_LIST_REQUEST });
      const data = await api.post("/api/measurement-list", {
        tab,
        page,
        limit,
      });
      if (!data.success) {
        dispatch({
          type: MEASUREMENT_LIST_FAIL,
          payload: data.message || "Failed to load list",
        });
        return;
      }
      dispatch({
        type: MEASUREMENT_LIST_SUCCESS,
        payload: {
          measurements: data.measurements,
          pagination: data.pagination,
        },
      });
    } catch (err) {
      dispatch({
        type: MEASUREMENT_LIST_FAIL,
        payload: err.message,
      });
    }
  };
