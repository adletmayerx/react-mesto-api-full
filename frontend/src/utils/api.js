class Api {
  constructor( {url, headers} ) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {
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

  editProfile(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name, about})
    })
      .then(this.checkResult);
  }

  addCard(title, link) {
    console.log(title, link);
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name: title, link: link})
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
      body: JSON.stringify({avatar})
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
  url: 'https://api.artursadrtdinov.nomoredomains.rocks',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
