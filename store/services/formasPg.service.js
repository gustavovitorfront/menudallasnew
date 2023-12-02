import api from "../../api";

export const formasPgService = {
    getAll
};

function getAll(params) {
    return api.get('/formapagamento?empresa='+params.subdomain).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}