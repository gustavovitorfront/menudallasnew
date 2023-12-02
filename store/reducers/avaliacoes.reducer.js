import { avaliacoesConstants } from '../constants';

export function avaliacoes(state = {}, action) {
  switch (action.type) {
    case avaliacoesConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case avaliacoesConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case avaliacoesConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case avaliacoesConstants.CREATE_REQUEST:
      return {
        loading: true
      };
    case avaliacoesConstants.CREATE_SUCCESS:
      return {
        items: action.data
      };
    case avaliacoesConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}