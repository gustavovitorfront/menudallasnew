import { pedidoUserConstants } from '../constants';
import { pedidoUserService } from '../services';

export const pedidoUserActions = {
    create,
    getAll
};

function getAll(subdomain) {

    return dispatch => {
        dispatch(request());

        pedidoUserService.getAll({ subdomain })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: pedidoUserConstants.GETALL_REQUEST } }
    function success(data) { return { type: pedidoUserConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: pedidoUserConstants.GETALL_FAILURE, error } }
}

function create(data) {
    return dispatch => {
        dispatch(request(data));

        pedidoUserService.create(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error?.response?.data?.message));
                }
            );
    };

    function request(data) { return { type: pedidoUserConstants.CREATE_REQUEST, data } }
    function success(data) { return { type: pedidoUserConstants.CREATE_SUCCESS, data } }
    function failure(error) { return { type: pedidoUserConstants.CREATE_FAILURE, error } }
}