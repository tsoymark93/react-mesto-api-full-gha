
class Api {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    }

  setUser({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then(this._checkResponse);
    }

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    }

  createCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then(this._checkResponse);
    }

  removeCard(idCard) {
  return fetch(`${this._baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  }).then(this._checkResponse);
}

  changeLikeCardStatus(idCard, like) {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
          method: like ? 'PUT' : 'DELETE',
          headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
      }).then(this._checkResponse);
  }

  updateAvatar({ avatar }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
          body: JSON.stringify({
              avatar: avatar,
          }),
      }).then(this._checkResponse);
  }
}
let token = localStorage.getItem("jwt");
export const api = new Api({
  baseUrl: 'http://api.tsoymark93.nomoreparties.sbs',
  headers: {
      authorization: `Berear ${token}`,
      'Content-Type': 'application/json',
  }});
