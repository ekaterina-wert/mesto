const cardsContainer = document.querySelector('.places__container');
export const imagePopup = document.querySelector('.popup_type_show-image');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__job');
const editPopup = document.querySelector('.popup_type_edit-form');
const nameInput = editPopup.querySelector('.popup__text_type_name');
const jobInput = editPopup.querySelector('.popup__text_type_job');
const editFormPopup = editPopup.querySelector('.popup__form_type_edit-form');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add-card');
const addFormPopup = addPopup.querySelector('.popup__form_type_add-card');
const placeInput = addPopup.querySelector('.popup__text_type_place');
const placeUrlInput = addPopup.querySelector('.popup__text_type_place-url');
const inputErrors = document.querySelectorAll('.popup__text');
const errors = document.querySelectorAll('.popup__input-error');
const inputSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__text_type_invalid',
    errorClass: 'popup__input-error_active'
};

import { Card } from './Card.js';
import { FormValidator } from './validate.js';

function addNewCard(newCard) {
    cardsContainer.prepend(newCard);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopupOnEsc);
}

function handleClosePopup(evt) {
    if ((evt.target === evt.target.closest('.popup')) || (evt.target === evt.target.closest('.popup__close-button'))) {
        closePopup(evt.target.closest('.popup'));
    }
}

function handleClosePopupOnEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'));
    }
}

function listenForClosing(popup) {
    popup.addEventListener('click', handleClosePopup);
    document.addEventListener('keydown', handleClosePopupOnEsc);
};

function clearErrors() {
    inputErrors.forEach(function(inputError) {
        inputError.classList.remove('popup__text_type_invalid');
    });
    errors.forEach(function(error) {
        error.classList.remove('popup__input-error_active')
    });
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    listenForClosing(popup);
}

function handleAddFormOpener() {
    addFormPopup.reset();
    openPopup(addPopup);
    clearErrors();
}

function handleEditFormOpener() {
    nameInput.value = userName.textContent;
    jobInput.value = job.textContent;
    openPopup(editPopup);
    clearErrors();
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const card = new Card(placeInput.value, placeUrlInput.value);
    addNewCard(card.generateCard());

    closePopup(addPopup);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(editPopup);
}

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);

    addNewCard(card.generateCard());
})

const formList = Array.from(document.querySelectorAll(inputSelectors.formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
    });
    const formValidate = new FormValidator(inputSelectors, formElement);
    formValidate.enableValidation();
});

addButton.addEventListener('click', handleAddFormOpener);
editButton.addEventListener('click', handleEditFormOpener);

editFormPopup.addEventListener('submit', handleEditFormSubmit);
addFormPopup.addEventListener('submit', handleAddFormSubmit);