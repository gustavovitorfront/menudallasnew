import { userConstants } from '../constants';
import { userService } from '../services';

export const userActions = {
    view,
    update
};

function view(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETVIEW_REQUEST } }
    function success(data) { return { type: userConstants.GETVIEW_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETVIEW_FAILURE, error } }
}

function update(data, id) {
    return dispatch => {
        dispatch(request(data));

        userService.update(data, id)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(data) { return { type: userConstants.UPDATE_REQUEST, data } }
    function success(data) { return { type: userConstants.UPDATE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}