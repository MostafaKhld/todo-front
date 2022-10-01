import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth/";
const tokenKey = "token";

http.setJwt(getJwt());

export async function signIn(username, password) {
  const { data } = await http.post(apiEndpoint + "signin/", {
    username,
    password,
  });
  localStorage.setItem(tokenKey, data.accessToken);
}

export function signInWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);

    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function signUp(data) {
  await http.post(apiEndpoint + "signUp/", data);
}
export async function verifyUser(code) {
  await http.get(apiEndpoint + "confirm/" + code);
}

export default {
  signUp,
  signIn,
  signInWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  verifyUser,
};
