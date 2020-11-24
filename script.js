let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let popupCloseButton = popup.querySelector('.popup__close-button');
let popupInputItems = popup.querySelectorAll('.popup__form-item');
let popupInputName = popupInputItems[0];
let popupInputDescription = popupInputItems[1];

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupForm = popup.querySelector('.popup__form');
let popupSaveButton = popup.querySelector('.popup__save-button'); 


function openPopup() {
    popup.classList.add('popup_opened');
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
}

editButton.addEventListener('click',openPopup);
popupCloseButton.addEventListener('click',closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
popupSaveButton.addEventListener('click',closePopup);
