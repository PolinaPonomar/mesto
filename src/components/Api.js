const onError = (res)=>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

export class Api {
    constructor(config) {
        this._url = config.url;
        this.headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(onError)
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(onError)
    }

    renewUserInfo(inputs) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: inputs.name,
                about: inputs.description
            })
        })
        .then(onError)
    }

    postNewCard(cardData) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
                alt: cardData.alt
            })
        })
        .then(onError)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(onError)
    }

    putLike (cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(onError)
    }

    deleteLike (cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(onError)
    }

    changeAvatar (inputAvatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: inputAvatar
            })
        })
        .then(onError)
    }
}
