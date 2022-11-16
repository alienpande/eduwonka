import Cookies from "js-cookie";

const TokenKey = "User-Token";

const HasuraKey = "Hasura-Token";

const IdKey = "User-Id";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getHasuraToken() {
  return Cookies.get(HasuraKey);
}

export function setHasuraToken(token) {
  return Cookies.set(HasuraKey, token);
}

export function removeHasuraToken() {
  return Cookies.remove(HasuraKey);
}

export function getId() {
  return Cookies.get(IdKey);
}

export function setId(id) {
  return Cookies.set(IdKey, id);
}

export function removeId() {
  return Cookies.remove(IdKey);
}
