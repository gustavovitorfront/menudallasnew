import { categoriesConstants } from '../constants';
import { categoriesService } from '../services';

export const categoriesActions = {
    getAll,
};

function getAll(userId) {

    return dispatch => {
        dispatch(request());

        categoriesService.getAll({ userId })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoriesConstants.GETALL_REQUEST } }
    function success(data) { return { type: categoriesConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: categoriesConstants.GETALL_FAILURE, error } }
}