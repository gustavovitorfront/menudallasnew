import { loginConstants } from '../constants';

export function login(state = {}, action) {
  switch (action.type) {
    case loginConstants.CREATE_REQUEST:
      return {
        loading: true
      };
    case loginConstants.CREATE_SUCCESS:
      return {
        items: action.data
      };
    case loginConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}