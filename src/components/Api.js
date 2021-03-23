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

    //изменить данные пользователя (PATCH)

    //изменить аватар (PATCH)

    //поставить лайк карточке (PUT)
    likeCard(card) {
        return fetch(`${this._baseUrl}/cards/${card.id}`, {
                method: 'PUT',
                headers: this._headers,
                body: card.likes += 1
            })
            .then(res => this._checkApiRespond(res))
            .catch(err => Promise.reject(err))
    }

    //убрать лайк карточки (DELETE)
}