import { pedidoConstants } from '../constants';

export function pedido(state = {}, action) {
  switch (action.type) {
    case pedidoConstants.CREATE_REQUEST:
      return {
        loading: true
      };
    case pedidoConstants.CREATE_SUCCESS:
      return {
        items: action.data
      };
    case pedidoConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}