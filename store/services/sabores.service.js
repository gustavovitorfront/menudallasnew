import api from "../../api";

export const saboresService = {
    getAll
};

function getAll(params) {
    return api.get('/sabores?empresa=' + params.subdomain + '&tamanho=' + params.tamanho + '&idgrupoproduto=' + params.idgrupoproduto).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}