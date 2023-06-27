const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = async (res) => {
    if (res.ok) {
        return await res.json();
    }
    const err = await res.json();
    return Promise.reject(err);
};

const register = async (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
};

const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return;
    }
    const err = await res.json();
    return Promise.reject(err);
};

const getContent = async (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(checkResponse);
};

export { register, login, getContent };
