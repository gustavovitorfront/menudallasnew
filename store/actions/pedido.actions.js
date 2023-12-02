import { pedidoConstants } from '../constants';
import { pedidoService } from '../services';

export const pedidoActions = {
    create,
};

function create(data, celularWhats, textoWhats) {
    return dispatch => {
        dispatch(request(data));

        pedidoService.create(data)
            .then(
                data => {
                    dispatch(success(data));

                    if (window.confirm("Deseja confirmar o pedido pelo Whatsapp?")) {
                        if (window.screen.width < 769) {
                            window.open('whatsapp://send/?phone=+55' + celularWhats + '&text=' + encodeURIComponent(textoWhats))
                        } else {
                            window.open('https://api.whatsapp.com/send?phone=+55' + celularWhats + '&text=' + encodeURIComponent(textoWhats), "_blank")
                        }
                    }
                },
                error => {
                    dispatch(failure(error?.response?.data?.message));
                }
            );
    };

    function request(data) { return { type: pedidoConstants.CREATE_REQUEST, data } }
    function success(data) { return { type: pedidoConstants.CREATE_SUCCESS, data } }
    function failure(error) { return { type: pedidoConstants.CREATE_FAILURE, error } }
}