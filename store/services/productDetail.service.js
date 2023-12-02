import api from "../../api";

export const productDetailService = {
    getAll
};

function getAll(params) {
    return api.get('/detalheproduto?empresa=' + params.subdomain + '&id_grupo=' + params.id_grupo + '&id_produto=' + params.id_produto).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}