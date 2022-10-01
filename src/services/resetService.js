import http from "./httpService";

const apiEndpoint = "/password-reset/";

export function ResetRequest(data) {
  return http.post(apiEndpoint, data);
}

export function ResetConfirm(data) {
  let body = { ...data };
  delete body.userId;
  delete body.token;
  return http.post(apiEndpoint + data.userId + "/" + data.token + "/", body);
}
