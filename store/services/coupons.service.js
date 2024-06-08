import api from "../../api";

export const couponsService = {
  getAll,
  validarCupom,
};

function getAll(params) {
  return api.get(params.userId + "/cupomdesconto").then(handleResponse);
}

function validarCupom(params) {
  return api
    .get(
      params.userId +
        "/validacupom/?cupom=" +
        params.cupom +
        "&valorcompra=" +
        params.valorcompra
    )
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
