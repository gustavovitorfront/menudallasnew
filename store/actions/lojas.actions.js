import { lojasConstants } from "../constants";
import { lojasService } from "../services";

export const lojasActions = {
  getAll,
};

function getAll(params) {
  return (dispatch) => {
    dispatch(request());

    lojasService.getAll(params).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: lojasConstants.GETALL_REQUEST };
  }
  function success(data) {
    return { type: lojasConstants.GETALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: lojasConstants.GETALL_FAILURE, error };
  }
}
