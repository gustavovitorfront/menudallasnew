import { homeConstants } from '../constants';
import { homeService } from '../services';

export const homeActions = {
    getAll,
};

function getAll(subdomain) {

    return dispatch => {
        dispatch(request());

        homeService.getAll({ subdomain })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: homeConstants.GETALL_REQUEST } }
    function success(data) { return { type: homeConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: homeConstants.GETALL_FAILURE, error } }
}