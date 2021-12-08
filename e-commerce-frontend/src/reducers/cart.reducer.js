import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {},
  updatingCart: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,

        updatingCart: false,
        cartItems: action.payload.error,
      };
      break;

    case cartConstants.RESET_CART:
      state = {
        ...initState,
      };
  }
  return state;
};
