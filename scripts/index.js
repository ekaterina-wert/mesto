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
const closeButtons = document.querySelectorAll('.popup__close-button');
const cardTemplate = document.querySelector('#card').content;
const fullImageCaption = document.querySelector('.popup__caption');
const fullImage = document.querySelector('.popup__image');


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

function openPopup(openingButton) {
    openingButton.classList.add('popup_opened');
}

function handleFullImageOpener(evt) {
    fullImage.src = evt.target.closest('.place__image').src;
    fullImageCaption.textContent = evt.target.closest('.place__image').alt;
    fullImageCaption.alt = evt.target.closest('.place__image').alt;

    openPopup(imagePopup);
};

function handleAddFormOpener() {
    placeInput.value = '';
    placeUrlInput.value = '';
    openPopup(addPopup);
}

function handleEditFormOpener() {
    nameInput.value = userName.textContent;
    jobInput.value = job.textContent;
    openPopup(editPopup);
}

function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}

function listenForClosing(closingButton) {
    closingButton.addEventListener('click', closePopup);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    addNewCard(createCard({
        name: placeInput.value,
        link: placeUrlInput.value
    }));

    closePopup(evt);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(evt);
}

function hideBrokenImage() {
    document.querySelector('.place__image').src = 'https://dummyimage.com/282x282.png/746C70/E2DED0&text=Oh+no!';
}


initialCards.map(createCard).forEach(addNewCard);

addButton.addEventListener('click', handleAddFormOpener);
editButton.addEventListener('click', handleEditFormOpener);

editFormPopup.addEventListener('submit', handleEditFormSubmit);
addFormPopup.addEventListener('submit', handleAddFormSubmit);

closeButtons.forEach(listenForClosing);