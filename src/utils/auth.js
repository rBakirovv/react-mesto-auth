export const BASE_URL = 'https://auth.nomoreparties.co';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...HEADERS,
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse)
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  };
};