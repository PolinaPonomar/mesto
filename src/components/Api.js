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

}
