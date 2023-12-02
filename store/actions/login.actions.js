import { loginConstants } from '../constants';
import { loginService } from '../services';

export const loginActions = {
    create,
};

function create(data) {
    return dispatch => {
        dispatch(request(data));

        loginService.create(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error?.response?.data?.message));
                }
            );
    };

    function request(data) { return { type: loginConstants.CREATE_REQUEST, data } }
    function success(data) { return { type: loginConstants.CREATE_SUCCESS, data } }
    function failure(error) { return { type: loginConstants.CREATE_FAILURE, error } }
}