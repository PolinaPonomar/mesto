export class Api {
    constructor(config) {
        this._url = config.url;
        this.headers = config.headers;
    }
    
    _onError (res) {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo () {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._onError)
    }

    getInitialCards () {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._onError)
    }

    renewUserInfo (inputs) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: inputs.name,
                about: inputs.description
            })
        })
        .then(this._onError)
    }

    postNewCard (cardData) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
                alt: cardData.alt
            })
        })
        .then(this._onError)
    }

    deleteCard (cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._onError)
    }

    putLike (cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(this._onError)
    }

    deleteLike (cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._onError)
    }

    changeAvatar (inputAvatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: inputAvatar
            })
        })
        .then(this._onError)
    }
}
