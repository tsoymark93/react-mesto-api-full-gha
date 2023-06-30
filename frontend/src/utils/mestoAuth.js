const BASE_URL = 'https://api.tsoymark93.nomoreparties.sbs';

const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return checkResponse(response);
};

const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return;
  }

  const err = await response.json();
  return Promise.reject(err);
};

const getContent = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(response);
};

export { register, login, getContent };
