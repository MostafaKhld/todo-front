import http from "./httpService";

const apiEndpoint = "/todo/";

export function getTodo() {
  return http.get(apiEndpoint);
}

export function saveTodo(data) {
  if (data._id) {
    const body = { ...data };
    delete body._id;
    return http.put(apiEndpoint + data._id, body);
  }

  return http.post(apiEndpoint, data);
}

export function deleteTodo(id) {
  return http.delete(apiEndpoint + id);
}
