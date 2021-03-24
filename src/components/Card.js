export class Card {
    constructor({ data, handleCardClick, handleDeleteCard, handleLikeCard }, cardSelector, api) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;

        this._api = api;
        this.id = data._id;
        this.cardWithLike = 0;
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

        this._likeCounterDisplay = this._element.querySelector('.place__like-counter');

        //условия для подсчета и отображения лайков
        if (this._likes) {
            this._element.querySelector('.place__like-counter').textContent = this._likes.length;
            if (this._likes.filter(like => like._id === "7ea220a2e894ead9312a4304").length === 1) {
                this._element.querySelector('.place__like-button').classList.add('place__like-button_active');
            }
        };

        //условие для отображения trash-button
        if (this._owner && this._owner._id !== "7ea220a2e894ead9312a4304") {
            this._element.querySelector('.place__trash-button').remove();
        }


        //if ()
        this._likeCounterDisplay = this._element.querySelector('.place__like-counter');

        // this._api.getInitialCards().likes
        //     .then(data => console.log(data))

        return this._element;
    }

    generateCardWithLike() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this.placeImage = this._element.querySelector('.place__image');
        this.placeImage.src = this._link;
        this.placeImage.alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;

        this._element.querySelector('.place__like-counter').textContent = this._likeCounter;
        this._likeCounterDisplay = this._element.querySelector('.place__like-counter');
        this._element.querySelector('.place__like-button').classList.add('place__like-button_active');
        // this._api.getInitialCards().likes
        //     .then(data => console.log(data))

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
            this.like = this._element.querySelector('.place__like-button');
            this.likeCounterDisplay = this._element.querySelector('.place__like-counter');
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