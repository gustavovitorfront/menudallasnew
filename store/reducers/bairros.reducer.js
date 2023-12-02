import { bairrosConstants } from '../constants';

export function bairros(state = {}, action) {
  switch (action.type) {
    case bairrosConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case bairrosConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case bairrosConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}