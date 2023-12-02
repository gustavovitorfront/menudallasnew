import api from "../../api";

export const productsService = {
    getAll
};

function getAll(params) {
    let stgQuery = '';
    if(localStorage.getItem('@menu-digital:term') != null){
        stgQuery += '&termo='+localStorage.getItem('@menu-digital:term');
    }
    return api.get('/produtos?empresa=' + params.subdomain+stgQuery).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;
    if (!data || data.length === 0) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}