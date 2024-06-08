import api from "../../api";

export const segmentosService = {
  getAll,
};

function getAll() {
  return api.get("home/categoria").then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (!data || data.length === 0) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
