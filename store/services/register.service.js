import api_next from "../../api_next";

export const registerService = {
    create,
};

function create(data) {
    return api_next.post('/register', data).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
