import api_next from "../../api_next";

export const pedidoUserService = {
    create,
    getAll
};

function create(params) {
    return api_next.post('/order', params).then(handleResponse);
}

function getAll(params) {
    return api_next.get('/order?empresa=' + params.subdomain).then(handleResponse);
}


function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
