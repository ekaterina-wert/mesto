//класс-наследник для формы попапа с подтверждением
import Popup from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this.card = 0;
        this.cardId = 0;
    }

    //добавить обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
    }

    //добавить переопределение функции удаления
    deleteCard() {
        this.card.remove(this.card);
    }
}