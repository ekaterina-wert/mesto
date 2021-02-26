export class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    };

    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = "";
        inputElement.classList.remove(this._inputErrorClass);
    };

    // метод для очистки ошибок и управления кнопкой
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });

        this._toggleButtonState(this._inputList);
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._toggleButtonState(this._inputList);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList);
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}