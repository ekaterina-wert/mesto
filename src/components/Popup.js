import { ESC } from "../utils/constants.js";

export default class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === ESC) {
            this.close();
        }
    }

    _handleClosePopup(evt) {
        if ((evt.target === this.popup) || (evt.target === this.popup.querySelector('.popup__close-button'))) {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener('click', (evt) => this._handleClosePopup(evt));
    }

}