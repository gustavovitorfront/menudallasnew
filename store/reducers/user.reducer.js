import { userConstants } from '../constants';

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      localStorage.setItem('@menu-digital:profile', JSON.stringify(action.data));
      return {
        saved: true
      };
    case userConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETVIEW_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETVIEW_SUCCESS:
      return {
        item: action.data
      };
    case userConstants.GETVIEW_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}