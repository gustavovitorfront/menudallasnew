import { couponsConstants } from "../constants";
import { couponsService } from "../services";

export const couponsActions = {
  getAll,
  validarCupom
};

function getAll(userId) {
  return (dispatch) => {
    dispatch(request());

    couponsService.getAll({ userId }).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: couponsConstants.GETALL_REQUEST };
  }
  function success(data) {
    return { type: couponsConstants.GETALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: couponsConstants.GETALL_FAILURE, error };
  }
}


function validarCupom(data) {
  return (dispatch) => {
    dispatch(request());

    couponsService.validarCupom(data).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: couponsConstants.VALIDAR_REQUEST };
  }
  function success(data) {
    return { type: couponsConstants.VALIDAR_SUCCESS, data };
  }
  function failure(error) {
    return { type: couponsConstants.VALIDAR_FAILURE, error };
  }
}
