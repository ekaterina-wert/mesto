const initialCards = [{
        name: 'Челябинск',
        link: './images/chelyabinsk.jpg'
    },
    {
        name: 'Иваново',
        link: './images/ivanovo.jpg'
    },
    {
        name: 'Самара',
        link: './images/samara.jpg'
    },
    {
        name: 'Москва',
        link: './images/moscow.jpg'
    },
    {
        name: 'Казань',
        link: './images/kazan.jpg'
    },
    {
        name: 'Владивосток',
        link: './images/vladivostok.jpg'
    }
];

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const userName = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__job');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput = popup.querySelector('.popup__text_type_job');
const formPopup = popup.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.add-popup');
const closeAddPopup = addPopup.querySelector('.add-popup__close-button');
const cards = document.querySelector('.places__container');
const imagePopup = document.querySelector('.image-popup');
const closeImagePopup = imagePopup.querySelector('.image-popup__close-button');
const submitAddPopup = addPopup.querySelector('.add-popup__form');
const placeInput = addPopup.querySelector('.add-popup__text_type_place');
const placeUrlInput = addPopup.querySelector('.add-popup__text_type_place-url');


function renderCard(element) {
    const cardTemplate = document.querySelector('#card').content;
    const card = cardTemplate.cloneNode(true);
    const image = card.querySelector('.place__image');

    image.src = element.link;
    image.alt = element.name;
    card.querySelector('.place__title').textContent = element.name;

    card.querySelector('.place__like-button').addEventListener('click', handleLikeCard);
    card.querySelector('.place__trash-button').addEventListener('click', handleDeleteCard);
    card.querySelector('.place__image-button').addEventListener('click', handleOpenImage);

    addNewCard(card);
}

function addNewCard(newCard) {
    cards.prepend(newCard);
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('place__like-button_active');
};

function handleDeleteCard(evt) {
    evt.target.closest('.place').remove();
}

function handleOpenImage(evt) {
    const fullImageCaption = document.querySelector('.image-popup__caption');

    document.querySelector('.image-popup__image').src = evt.target.closest('.place__image').src;
    fullImageCaption.textContent = evt.target.closest('.place__image').alt;
    fullImageCaption.alt = evt.target.closest('.place__image').alt;

    imagePopup.classList.add('image-popup_opened');
};

function handleImagePopupClosure() {
    imagePopup.classList.remove('image-popup_opened');
}

function handleAddFormOpener() {
    addPopup.classList.add('add-popup_opened');
}

function handleAddFormClosure() {
    addPopup.classList.remove('add-popup_opened');
    placeInput.value = '';
    placeUrlInput.value = '';
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    renderCard({
        name: placeInput.value,
        link: placeUrlInput.value
    })
    handleAddFormClosure();
}

function handleEditFormOpener() {
    nameInput.value = userName.textContent;
    jobInput.value = job.textContent;
    popup.classList.add('popup_opened');
}

function handleEditFormClosure() {
    popup.classList.remove('popup_opened');
}

function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    handleEditFormClosure();
}

initialCards.forEach(renderCard);
addButton.addEventListener('click', handleAddFormOpener);
closeAddPopup.addEventListener('click', handleAddFormClosure);
editButton.addEventListener('click', handleEditFormOpener);
closeButton.addEventListener('click', handleEditFormClosure);
formPopup.addEventListener('submit', handleEditFormSubmit);
submitAddPopup.addEventListener('submit', handleAddFormSubmit);
closeImagePopup.addEventListener('click', handleImagePopupClosure);