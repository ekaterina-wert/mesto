let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_job');
let formPopup = popup.querySelector('.popup__form');

function editFormOpener() {
    nameInput.value = name.textContent;
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
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    editFormClosure();
}

editButton.addEventListener('click', editFormOpener);
closeButton.addEventListener('click', editFormClosure);
formPopup.addEventListener('submit', handleFormSubmit);