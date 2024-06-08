import { lojasConstants } from '../constants';

export function lojas(state = {}, action) {
  switch (action.type) {
    case lojasConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case lojasConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case lojasConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}