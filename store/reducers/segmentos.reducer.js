import { segmentosConstants } from '../constants';

export function segmentos(state = {}, action) {
  switch (action.type) {
    case segmentosConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case segmentosConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case segmentosConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}