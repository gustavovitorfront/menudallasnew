import { categoriesConstants } from '../constants';

export function categories(state = {}, action) {
  switch (action.type) {
    case categoriesConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case categoriesConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case categoriesConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}