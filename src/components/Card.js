export class Card {
    constructor({ data, handleCardClick, handleDeleteCard, handleLikeCard }, cardSelector, api) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this._api = api;
        this.id = data._id;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return cardElement;
    }

    // generateCard(data) {
    //     this._element = this._getTemplate();
    //     this._setEventListeners();

    //     this.placeImage = this._element.querySelector('.place__image');
    //     this.placeImage.src = data._link;
    //     this.placeImage.alt = data._name;
    //     this._element.querySelector('.place__title').textContent = this._name;

    //     return this._element;
    // }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this.placeImage = this._element.querySelector('.place__image');
        this.placeImage.src = this._link;
        this.placeImage.alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
            this.like = this._element.querySelector('.place__like-button');
            this._handleLikeCard();
        });
        this._element.querySelector('.place__trash-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.place__image-button').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    // _handleLikeCard() {
    //     this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
    // };

    // _handleDeleteCard() {
    //     this._element.remove();
    // }
}