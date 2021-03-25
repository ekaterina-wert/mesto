export class Card {
    constructor({ data, handleCardClick, handleDeleteCard, handleLikeCard }, cardSelector) {
        this.name = data.name;
        this.link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._cardId = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
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

    generateCard(userId) {
        this.element = this._getTemplate();
        this._setEventListeners();

        this.placeImage = this.element.querySelector('.place__image');
        this.placeImage.src = this.link;
        this.placeImage.alt = this.name;
        this.element.querySelector('.place__title').textContent = this.name;

        this._likeCounterDisplay = this.element.querySelector('.place__like-counter');

        //условия для подсчета и отображения лайков
        if (this._likes) {
            this.element.querySelector('.place__like-counter').textContent = this._likes.length;
            if (this._likes.filter(like => like._id === userId).length === 1) {
                this.element.querySelector('.place__like-button').classList.add('place__like-button_active');
            }
        };

        //условие для отображения trash-button
        if (this._owner && this._owner._id !== userId) {
            this.element.querySelector('.place__trash-button').remove();
        }

        this._likeCounterDisplay = this.element.querySelector('.place__like-counter');
        return this.element;
    }

    generateCardWithLike() {
        this.element = this._getTemplate();
        this._setEventListeners();

        this.placeImage = this.element.querySelector('.place__image');
        this.placeImage.src = this.link;
        this.placeImage.alt = this.name;
        this.element.querySelector('.place__title').textContent = this.name;

        this.element.querySelector('.place__like-counter').textContent = this._likeCounter;
        this._likeCounterDisplay = this.element.querySelector('.place__like-counter');
        this.element.querySelector('.place__like-button').classList.add('place__like-button_active');

        return this.element;
    }

    _setEventListeners() {
        this.element.querySelector('.place__like-button').addEventListener('click', () => {
            this.like = this.element.querySelector('.place__like-button');
            this.likeCounterDisplay = this.element.querySelector('.place__like-counter');
            this._handleLikeCard();
        });
        this.element.querySelector('.place__trash-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this.element.querySelector('.place__image-button').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    // _handleLikeCard() {
    //     
    // };

    // _handleDeleteCard() {
    //     
    // }
}