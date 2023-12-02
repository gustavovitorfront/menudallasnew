import { productDetailConstants } from '../constants';
import { productDetailService } from '../services';

export const productDetailActions = {
    getAll,
};

function getAll(subdomain, id_grupo, id_produto) {

    return dispatch => {
        dispatch(request());

        productDetailService.getAll({ subdomain, id_grupo, id_produto })
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productDetailConstants.GETALL_REQUEST } }
    function success(data) { return { type: productDetailConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: productDetailConstants.GETALL_FAILURE, error } }
}