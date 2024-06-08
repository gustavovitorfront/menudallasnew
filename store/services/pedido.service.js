import api from "../../api";

export const pedidoService = {
  create,
};

function create(params) {
  return api.post(`${params?.user_id}/pedido`, params).then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (!data || data.length === 0) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
