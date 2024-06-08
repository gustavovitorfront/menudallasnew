import api from "../../api";

export const bannersService = {
  getAll,
};

function getAll(params) {
  return api.get("home/banner").then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (!data || data.length === 0) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
