import { formasPgConstants } from '../constants';

export function formasPg(state = {}, action) {
  switch (action.type) {
    case formasPgConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case formasPgConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case formasPgConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}