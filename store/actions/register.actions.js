import { registerConstants } from '../constants';
import { registerService } from '../services';

export const registerActions = {
    create,
};

function create(data) {
    return dispatch => {
        dispatch(request(data));

        registerService.create(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error?.response?.data?.message));
                }
            );
    };

    function request(data) { return { type: registerConstants.CREATE_REQUEST, data } }
    function success(data) { return { type: registerConstants.CREATE_SUCCESS, data } }
    function failure(error) { return { type: registerConstants.CREATE_FAILURE, error } }
}