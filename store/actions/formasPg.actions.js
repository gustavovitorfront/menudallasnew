import { formasPgConstants } from '../constants';
import { formasPgService } from '../services';

export const formasPgActions = {
    getAll,
};

function getAll(subdomain) {

    return dispatch => {
        dispatch(request());

        formasPgService.getAll({ subdomain })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: formasPgConstants.GETALL_REQUEST } }
    function success(data) { return { type: formasPgConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: formasPgConstants.GETALL_FAILURE, error } }
}