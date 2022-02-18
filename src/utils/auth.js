export const BASE_URL = 'https://api.nomoreparties.co';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/singup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password })
  })
    .then(errorHandler)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password })
  })
  .then(errorHandler)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      HEADERS,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(errorHandler)
};

const errorHandler = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  };
};