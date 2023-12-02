import { saboresConstants } from '../constants';
import { saboresService } from '../services';

export const saboresActions = {
    getAll,
};

function getAll(subdomain, tamanho, idgrupoproduto) {

    return dispatch => {
        dispatch(request());

        saboresService.getAll({ subdomain, tamanho, idgrupoproduto })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: saboresConstants.GETALL_REQUEST } }
    function success(data) { return { type: saboresConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: saboresConstants.GETALL_FAILURE, error } }
}