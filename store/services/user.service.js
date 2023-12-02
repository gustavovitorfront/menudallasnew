import api_next from "../../api_next";

export const userService = {
    update,
    getById
};

function update(data) {
    return api_next.put(`/user`, data).then(handleResponse);
}

function getById() {
    return api_next.get(`/user`).then(handleResponse)
}

function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
