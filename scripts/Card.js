import { imagePopup, openPopup } from "./index.js"

export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('#card')
            .content
            .querySelector('.place')
            .cloneNode(true);

        return cardElement;
    }

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
            this._handleLikeCard();
        });
        this._element.querySelector('.place__trash-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.place__image-button').addEventListener('click', () => {
            this._handleFullImageOpener()
        });
    }

    _handleLikeCard() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
    };

    _handleDeleteCard() {
        this._element.remove();
    }

    _handleFullImageOpener() {
        this.fullImageCaption = document.querySelector('.popup__caption');

        document.querySelector('.popup__image').src = this._link;
        this.fullImageCaption.textContent = this._element.querySelector('.place__image').alt;
        this.fullImageCaption.alt = this._element.querySelector('.place__image').alt;

        openPopup(imagePopup);
    }
}