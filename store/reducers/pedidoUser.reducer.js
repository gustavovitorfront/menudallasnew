import { pedidoUserConstants } from '../constants';

export function pedidoUser(state = {}, action) {
  switch (action.type) {
    case pedidoUserConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case pedidoUserConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case pedidoUserConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case pedidoUserConstants.CREATE_REQUEST:
      return {
        loading: true
      };
    case pedidoUserConstants.CREATE_SUCCESS:
      return {
        items: action.data
      };
    case pedidoUserConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}