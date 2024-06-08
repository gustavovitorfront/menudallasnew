import { couponsConstants } from '../constants';

export function couponsValidar(state = {}, action) {
  switch (action.type) {
    case couponsConstants.VALIDAR_REQUEST:
      return {
        loading: true
      };
    case couponsConstants.VALIDAR_SUCCESS:
      return {
        items: action.data
      };
    case couponsConstants.VALIDAR_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}