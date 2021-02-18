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
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

}
