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
const inputErrors = document.querySelectorAll('.popup__text');
const errors = document.querySelectorAll('.popup__input-error');
const imagePopupCaption = document.querySelector('.popup__caption');
const imagePopupPicture = document.querySelector('.popup__image');
const inputSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__text_type_invalid',
    errorClass: 'popup__input-error_active'
};
const formList = Array.from(document.querySelectorAll(inputSelectors.formSelector));

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

function addNewCard(newCard) {
    cardsContainer.prepend(newCard);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopupOnEsc);
    popup.removeEventListener('click', handleClosePopup);
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

//здесь вызов метода класса FormValidator
function clearErrors() {
    formList.forEach((formElement) => {
        const resetFormValidation = new FormValidator(inputSelectors, formElement);
        resetFormValidation.resetValidation();
    })
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
    const inputData = {
        name: addPopup.querySelector('.popup__text_type_place').value,
        link: addPopup.querySelector('.popup__text_type_place-url').value
    }
    addNewCard(createCard(inputData));

    closePopup(addPopup);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(editPopup);
}

initialCards.forEach((item) => {
    addNewCard(createCard(item));
})

function handleCardClick(cardName, cardLink) {
    imagePopupPicture.src = cardLink;
    imagePopupPicture.alt = cardName;
    imagePopupCaption.textContent = cardName;

    openPopup(imagePopup);
}

function createCard(data) {
    const card = new Card(data, '#card', handleCardClick);
    const newCard = card.generateCard();
    return newCard;
}


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