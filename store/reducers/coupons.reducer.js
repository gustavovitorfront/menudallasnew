import { couponsConstants } from '../constants';

export function coupons(state = {}, action) {
  switch (action.type) {
    case couponsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case couponsConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case couponsConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}