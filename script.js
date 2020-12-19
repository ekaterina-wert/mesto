let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');
let nameInput = popup.querySelector('.popup__text_name');
let jobInput = popup.querySelector('.popup__text_job');

nameInput.value = name.textContent;
jobInput.value = job.textContent;

function editFormOpener() {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', editFormOpener);

function editFormClosure() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', editFormClosure);

let formPopup = popup.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit);