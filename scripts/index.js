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
//import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';

const editProfileFormValidation = new FormValidator(inputSelectors, editFormPopup);
const addFormValidation = new FormValidator(inputSelectors, addFormPopup);


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

// создание карточек из initialCards
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card', {
            handleCardClick: (item) => {
                const cardClick = new PopupWithImage(".popup_type_show-image");
                cardClick.open(card._link, card._name);
            }
        });
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