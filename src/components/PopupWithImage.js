//класс-наследник для открытия попапа с изображением
import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this.popup.querySelector('.popup__image');
        this._popupCaption = this.popup.querySelector('.popup__caption');
    }

    open(cardLink, cardName) {
        this._popupImage.src = cardLink;
        this._popupImage.alt = cardName;
        this._popupCaption.textContent = cardName;

        super.open();
    }
}