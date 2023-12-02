import { productDetailConstants } from '../constants';

export function productDetail(state = {}, action) {
  switch (action.type) {
    case productDetailConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case productDetailConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case productDetailConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}