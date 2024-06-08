import { segmentosConstants } from "../constants";
import { segmentosService } from "../services";

export const segmentosActions = {
  getAll,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    segmentosService.getAll().then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: segmentosConstants.GETALL_REQUEST };
  }
  function success(data) {
    return { type: segmentosConstants.GETALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: segmentosConstants.GETALL_FAILURE, error };
  }
}
