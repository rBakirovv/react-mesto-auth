export const BASE_URL = 'https://auth.nomoreparties.co';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/singin`, {
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