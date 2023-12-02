import { productsConstants } from '../constants';

export function products(state = {}, action) {
  switch (action.type) {
    case productsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case productsConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case productsConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}