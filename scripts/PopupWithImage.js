//класс-наследник для открытия попапа с изображением
import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    open(cardLink, cardName) {
        this._popup.querySelector('.popup__image').src = cardLink;
        this._popup.querySelector('.popup__image').alt = cardName;
        this._popup.querySelector('.popup__caption').textContent = cardName;

        super.open();
    }

}