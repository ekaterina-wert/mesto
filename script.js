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

const cards = document.querySelector('.places__container');

initialCards.forEach(renderCard);

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

    cards.append(card);
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('place__like-button_active');
};

function handleDeleteCard(evt) {
    evt.target.closest('.place').remove();
}


const imagePopup = document.querySelector('.image-popup');


function handleOpenImage(evt) {
    const fullImageCaption = document.querySelector('.image-popup__caption');

    document.querySelector('.image-popup__image').src = evt.target.closest('.place__image').src;
    fullImageCaption.textContent = evt.target.closest('.place__image').alt;
    fullImageCaption.alt = evt.target.closest('.place__image').alt;

    imagePopup.classList.add('image-popup_opened');
};


// imageForFullButtons.forEach(function(imageForFullButton) {
//     imageForFullButton.addEventListener('click', function() {
//         fullImage.src = imageForFullButton.firstElementChild.src;;
//         fullImageCaption.textContent = imageForFullButton.firstElementChild.alt;
//         fullImageCaption.alt = imageForFullButton.firstElementChild.alt;
//         imagePopup.classList.add('image-popup_opened');
//     });
// })

const closeImagePopup = imagePopup.querySelector('.image-popup__close-button');

function imagePopupClosure() {
    imagePopup.classList.remove('image-popup_opened');
}
closeImagePopup.addEventListener('click', imagePopupClosure);



let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let userName = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_job');
let formPopup = popup.querySelector('.popup__form');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.add-popup');
const closeAddPopup = addPopup.querySelector('.add-popup__close-button');

function addFormOpener() {
    addPopup.classList.add('add-popup_opened');
}
addButton.addEventListener('click', addFormOpener);

function addFormClosure() {
    addPopup.classList.remove('add-popup_opened');
}
closeAddPopup.addEventListener('click', addFormClosure);


function editFormOpener() {
    nameInput.value = userName.textContent;
    jobInput.value = job.textContent;
    popup.classList.add('popup_opened');
}

function editFormClosure() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    editFormClosure();
}

editButton.addEventListener('click', editFormOpener);
closeButton.addEventListener('click', editFormClosure);
formPopup.addEventListener('submit', handleFormSubmit);