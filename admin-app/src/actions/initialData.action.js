import axiosInstance from "../helpers/axios";
import {
  categoryConstants,
  initialDataConstants,
  productConstants,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/initialdata");
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    }
  };
};
