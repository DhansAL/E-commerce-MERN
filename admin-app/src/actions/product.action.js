import axiosInstance from "../helpers/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axiosInstance.post("product/create", form);
    console.log(res);
  };
};
