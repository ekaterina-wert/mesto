export class Api {
    constructor({ baseUrl, headers }) {
            this._baseUrl = baseUrl;
            this._headers = headers;
        }
        //проверка ответа сервера
    _checkApiRespond(respond) {
        if (respond.ok) {
            return respond.json()
        }
        return Promise.reject(new Error(`Ошибка! Статус-код:${respond.status}`));
    }

    //получить массив исходных карточек (GET)
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    };

    getLikesNumber(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                headers: this._headers,
                //body: card.likes.length
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    };

    //добавить совственную карточку (POST)
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    }

    //удалить карточку (DELETE)
    deleteMyCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    }

    //получить данные пользователя (GET)
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    }

    //изменить данные пользователя (PATCH)
    editUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name.value,
                about: data.about.value
            })
        });
    }

    //изменить аватар (PATCH)

    //поставить лайк карточке (PUT)
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers,
                body: card.likes
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    }

    //убрать лайк карточки (DELETE)
    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
                //body: card.likes
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    }

    getAllData() {
        return Promise.all([this.getUserData(), this.getInitialCards()])
    }
}