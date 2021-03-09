export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleClosePopup);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleClosePopup(evt) {
        if ((evt.target === this._popup) || (evt.target === this._popup.querySelector('.popup__close-button'))) {
            this.close();
        }
    }

    _setEventListeners() {
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._popup.addEventListener('click', (evt) => this._handleClosePopup(evt));
    }

}