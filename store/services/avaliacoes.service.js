import api_next from "../../api_next";

export const avaliacoesService = {
    create,
    getAll
};

function create(params) {
    return api_next.post('/reviews', params).then(handleResponse);
}

function getAll(params) {
    return api_next.get('/reviews?empresa=' + params.subdomain).then(handleResponse);
}


function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
