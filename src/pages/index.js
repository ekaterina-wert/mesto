import './index.css'; // добавьте импорт главного файла стилей

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { initialCards } from "../utils/initial-cards.js";

const cardsContainer = document.querySelector('.places__container');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit-form');
const nameInput = editPopup.querySelector('.popup__text_type_name');
const infoInput = editPopup.querySelector('.popup__text_type_job');

const inputSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__text_type_invalid',
    errorClass: 'popup__input-error_active'
};

//создание попапа с картинкой
const imagePopup = new PopupWithImage(".popup_type_show-image");

//создание попапа с формой редактирования профиля + валидация этой формы
const editProfilePopup = new PopupWithForm('.popup_type_edit-form', () => {
    handleEditFormSubmit();
});
const editProfileFormValidation = new FormValidator(inputSelectors, editProfilePopup._popup);

//создание попапа с формой добавления новой карточки + валидация этой формы
const addNewCardPopup = new PopupWithForm('.popup_type_add-card', (data) => {
    handleAddFormSubmit(data);
});
const addFormValidation = new FormValidator(inputSelectors, addNewCardPopup._popup);

const userInfo = new UserInfo('.profile__name', '.profile__job', nameInput, infoInput);

// создание карточек из initialCards
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = createCard(item);
        cardList.addItem(newCard);
    },
}, '.places__container');


//функции создания и добавления карточек 
function createCard(data) {
    const card = new Card(data, '#card', {
        handleCardClick: (item) => {
            imagePopup.open(card._link, card._name);
        }
    });
    const newCard = card.generateCard();

    return newCard;
}

function addNewCard(newCard) {
    cardsContainer.prepend(newCard);
}

//функция-помощник открытия попапа редактирования профиля
function handleEditFormOpen() {
    const userInfoData = userInfo.getUserInfo();
    nameInput.value = userInfoData.userName;
    infoInput.value = userInfoData.userInfo;
}

//функции обработки форм (сабмит)
function handleAddFormSubmit(data) {
    addNewCardPopup.close();
    addNewCard(createCard(data));
}

function handleEditFormSubmit() {
    userInfo.setUserInfo();
    editProfilePopup.close();
}


// добавление карточек из initialCards в контейнер
cardList.renderItems();

//добавление слушателей попапам
addNewCardPopup.setEventListeners();
editProfilePopup.setEventListeners()
imagePopup.setEventListeners();

// добавление слушателей кнопкам открытия попапов
addButton.addEventListener('click', () => {
    addNewCardPopup.open();

    addFormValidation.enableValidation();
    addFormValidation.resetValidation();
});

editButton.addEventListener('click', () => {
    handleEditFormOpen();
    editProfilePopup.open();

    editProfileFormValidation.enableValidation();
    editProfileFormValidation.resetValidation();
});