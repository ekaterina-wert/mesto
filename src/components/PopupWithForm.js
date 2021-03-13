//класс-наследник для формы попапа
import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputTextList = Array.from(this.popup.querySelectorAll('.popup__text'));
        this._popupForm = this.popup.querySelector('.popup__form');
    }

    //собрать данные всех полей формы в объект
    _getInputValues() {
        const inputValues = {};
        this._inputTextList.forEach((inputText) => {
            inputValues[inputText.name] = inputText.value;
        })
        return inputValues;
    }

    //добавить обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt) => this._handleExtraOne(evt));
    }

    _handleExtraOne(evt) {
        evt.preventDefault();

        this._handleFormSubmit(this._getInputValues());
    }


    //добавить сброс формы при закрытии
    close() {
        super.close();
        this._popupForm.reset();
    }

}