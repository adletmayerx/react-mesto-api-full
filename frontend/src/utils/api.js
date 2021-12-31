class Api {
  constructor( {url, headers} ) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {
    console.log('pytaus user info');
    return fetch(this._url + '/users/me', {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this.checkResult);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this.checkResult);
  }

  editProfile(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(this.checkResult);
  }

  addCard(item) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(item)
    })
      .then(this.checkResult);
  }

  deleteCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this.checkResult);
  }

  addLike(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this.checkResult);
  }

  removeLike(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this.checkResult);
  }

  editAvatar(avatar) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(avatar)
    })
      .then(this.checkResult);
  }

  checkResult = res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}


const api = new Api({
  url: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
