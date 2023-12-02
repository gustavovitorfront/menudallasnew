import { saboresConstants } from '../constants';

export function sabores(state = {}, action) {
  switch (action.type) {
    case saboresConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case saboresConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case saboresConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}