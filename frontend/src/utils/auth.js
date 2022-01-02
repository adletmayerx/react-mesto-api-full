class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json();
  }

  authorise(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((result) => this._getResponseData(result));
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      }),
    }).then((result) => this._getResponseData(result));
  }

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    }).then((result) => this._getResponseData(result));
  }

  signOut = () => {
    return fetch(`${this._url}/signout`, {
      method: "DELETE",
      credentials: "include",
    }).then((result) => {
      this._getResponseData(result)
    });
  };
}

const auth = new Auth({
  url: 'https://api.artursadrtdinov.nomoredomains.rocks',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default auth;