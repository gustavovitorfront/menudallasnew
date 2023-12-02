import { registerConstants } from '../constants';

export function register(state = {}, action) {
  switch (action.type) {
    case registerConstants.CREATE_REQUEST:
      return {
        loading: true
      };
    case registerConstants.CREATE_SUCCESS:
      return {
        items: action.data
      };
    case registerConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}