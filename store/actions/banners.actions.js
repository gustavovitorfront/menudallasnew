import { bannersConstants } from "../constants";
import { bannersService } from "../services";

export const bannersActions = {
  getAll,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    bannersService.getAll().then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: bannersConstants.GETALL_REQUEST };
  }
  function success(data) {
    return { type: bannersConstants.GETALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: bannersConstants.GETALL_FAILURE, error };
  }
}
