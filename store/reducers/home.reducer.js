import { homeConstants } from '../constants';

export function home(state = {}, action) {
  switch (action.type) {
    case homeConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case homeConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case homeConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}