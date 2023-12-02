import { bairrosConstants } from '../constants';
import { bairrosService } from '../services';

export const bairrosActions = {
    getAll,
};

function getAll(subdomain) {

    return dispatch => {
        dispatch(request());

        bairrosService.getAll({ subdomain })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: bairrosConstants.GETALL_REQUEST } }
    function success(data) { return { type: bairrosConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: bairrosConstants.GETALL_FAILURE, error } }
}