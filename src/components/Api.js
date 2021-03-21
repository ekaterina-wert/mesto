export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        //this._ApiId = ApiId;
    }

    getInitialCards(ApiId) {

        const initialCards = [];
        fetch(`${this._baseUrl}/${ApiId}`, {
                headers: this._headers
            })
            .then(res => res.json())
            .then((result) => {
                //console.log(result)
                result.forEach((item) => {
                    initialCards.push({
                        name: item.name,
                        link: item.link
                    })
                    return initialCards;
                });
                //console.log(initialCards)
                return initialCards
            });
        //console.log(initialCards)
        return initialCards;
        //}
    }


    // другие методы работы с API
}