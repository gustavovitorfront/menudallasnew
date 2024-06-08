import { bannersConstants } from '../constants';

export function banners(state = {}, action) {
  switch (action.type) {
    case bannersConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case bannersConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case bannersConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}