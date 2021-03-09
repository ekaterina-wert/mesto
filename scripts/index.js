//const cardsContainer = document.querySelector('.places__container');
const imagePopup = document.querySelector('.popup_type_show-image');
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

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

const editProfileFormValidation = new FormValidator(inputSelectors, editFormPopup);
const addFormValidation = new FormValidator(inputSelectors, addFormPopup);

//функции создания и управления карточками
// function createCard(data) {
//     const card = new Card(data, '#card', handleCardClick);
//     const newCard = card.generateCard();
//     return newCard;
// }

// function addNewCard(newCard) {
//     cardsContainer.prepend(newCard);
// }

//функции закрытия попапа
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

//функции открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    listenForClosing(popup);
}

function handleCardClick(cardLink, cardName) {
    imagePopupPicture.src = cardLink;
    imagePopupPicture.alt = cardName;
    imagePopupCaption.textContent = cardName;

    openPopup(imagePopup);
}

function handleAddFormOpener() {
    addFormPopup.reset();
    openPopup(addPopup);
    addFormValidation.resetValidation();;
}

function handleEditFormOpener() {
    nameInput.value = userName.textContent;
    jobInput.value = job.textContent;
    openPopup(editPopup);
    editProfileFormValidation.resetValidation();
}

// функции отправки форм
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

// initialCards.forEach((item) => {
//     addNewCard(createCard(item));
// })

// создание карточек из initialCards
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card', handleCardClick);
        const newCard = card.generateCard();
        cardList.addItem(newCard);
    },
}, '.places__container');

cardList.renderItems();


editProfileFormValidation.enableValidation();
addFormValidation.enableValidation();

addButton.addEventListener('click', handleAddFormOpener);
editButton.addEventListener('click', handleEditFormOpener);

editFormPopup.addEventListener('submit', handleEditFormSubmit);
addFormPopup.addEventListener('submit', handleAddFormSubmit);