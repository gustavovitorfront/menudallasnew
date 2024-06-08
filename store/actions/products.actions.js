import { productsConstants } from "../constants";
import { productsService } from "../services";

export const productsActions = {
  getAll,
};

function getAll(userId) {
  return (dispatch) => {
    dispatch(request());

    productsService.getAll({ userId }).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productsConstants.GETALL_REQUEST };
  }
  function success(data) {
    return { type: productsConstants.GETALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: productsConstants.GETALL_FAILURE, error };
  }
}
