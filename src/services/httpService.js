import axios from "axios";
import logger from "./logService";

import auth, { logout } from "./authService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }
  if (error.response && error.response.status === 401) {
    auth.logout();
  }

  return Promise.reject(error);
});

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function setJwt(jwt) {
  axios.defaults.headers.common["x-access-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
