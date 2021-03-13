//класс-наследник для формы попапа
import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputTextList = Array.from(this._popup.querySelectorAll('.popup__text'));
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    open() {
        super.open();
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
        this._popup.addEventListener('submit', (evt) => this._handleExtraOne(evt));
    }

    _handleExtraOne(evt) {
        evt.preventDefault();

        this._handleFormSubmit(this._getInputValues());
    }


    //добавить сброс формы при закрытии
    close() {
        super.close();
        this._popup.removeEventListener('submit', this._handleExtraOne);
        this._popupForm.reset();
    }

}