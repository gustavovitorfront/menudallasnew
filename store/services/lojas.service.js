import api from "../../api";

export const lojasService = {
  getAll,
};

function toQueryString(params) {
  console.debug('params', params)

  if(!params){
    return;
  }
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");
}

function getAll(params) {
  return api
    .get(`home/segmento?${toQueryString(params)}`)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (!data || data.length === 0) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
