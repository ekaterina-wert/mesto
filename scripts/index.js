const cardsContainer = document.querySelector('.places__container');
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
const placeInput = addPopup.querySelector('.popup__text_type_place');
const placeUrlInput = addPopup.querySelector('.popup__text_type_place-url');
const cardTemplate = document.querySelector('#card').content;
const fullImageCaption = document.querySelector('.popup__caption');
const fullImage = document.querySelector('.popup__image');
const inputErrors = document.querySelectorAll('.popup__text');
const errors = document.querySelectorAll('.popup__input-error');


function createCard(element) {
    const card = cardTemplate.cloneNode(true);
    const placeImage = card.querySelector('.place__image');

    placeImage.src = element.link;
    placeImage.alt = element.name;
    card.querySelector('.place__title').textContent = element.name;

    card.querySelector('.place__like-button').addEventListener('click', handleLikeCard);
    card.querySelector('.place__trash-button').addEventListener('click', handleDeleteCard);
    card.querySelector('.place__image-button').addEventListener('click', handleFullImageOpener);

    return card;
}

function addNewCard(newCard) {
    cardsContainer.prepend(newCard);
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('place__like-button_active');
};

function handleDeleteCard(evt) {
    evt.target.closest('.place').remove();
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
    })
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    listenForClosing(popup);
}

function handleFullImageOpener(evt) {
    fullImage.src = evt.target.closest('.place__image').src;
    fullImageCaption.textContent = evt.target.closest('.place__image').alt;
    fullImageCaption.alt = evt.target.closest('.place__image').alt;
    openPopup(imagePopup);
};

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
    addNewCard(createCard({
        name: placeInput.value,
        link: placeUrlInput.value
    }));

    closePopup(addPopup);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(editPopup);
}

function hideBrokenImage() {
    document.querySelector('.place__image').src = 'https://dummyimage.com/282x282.png/746C70/E2DED0&text=Oh+no!';
}


initialCards.map(createCard).forEach(addNewCard);

addButton.addEventListener('click', handleAddFormOpener);
editButton.addEventListener('click', handleEditFormOpener);

editFormPopup.addEventListener('submit', handleEditFormSubmit);
addFormPopup.addEventListener('submit', handleAddFormSubmit);