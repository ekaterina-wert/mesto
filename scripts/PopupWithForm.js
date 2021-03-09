//класс-наследник для формы попапа
import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
    }

    //собрать данные всех полей формы
    _getInputValues() {

    }

    //добавить обработчик сабмита формы
    setEventListeners() {

    }

    //добавить сброс формы при закрытии
    close() {

    }

}