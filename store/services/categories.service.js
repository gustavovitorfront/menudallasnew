import api from "../../api";

export const categoriesService = {
  getAll,
};

function getAll(params) {
  return api.get(params.userId + "/grupodeproduto").then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (!data || data.length === 0) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
