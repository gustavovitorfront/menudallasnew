import { avaliacoesConstants } from '../constants';
import { avaliacoesService } from '../services';

export const avaliacoesActions = {
    create,
    getAll
};

function getAll(subdomain) {
    return dispatch => {
        dispatch(request());

        avaliacoesService.getAll({ subdomain })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: avaliacoesConstants.GETALL_REQUEST } }
    function success(data) { return { type: avaliacoesConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: avaliacoesConstants.GETALL_FAILURE, error } }
}

function create(data) {
    return dispatch => {
        dispatch(request(data));

        avaliacoesService.create(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error?.response?.data?.message));
                }
            );
    };

    function request(data) { return { type: avaliacoesConstants.CREATE_REQUEST, data } }
    function success(data) { return { type: avaliacoesConstants.CREATE_SUCCESS, data } }
    function failure(error) { return { type: avaliacoesConstants.CREATE_FAILURE, error } }
}