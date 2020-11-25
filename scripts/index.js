let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let popupCloseButton = popup.querySelector('.popup__close-button');
let popupInputName = popup.querySelector('.popup__form-item_value_name');
let popupInputDescription = popup.querySelector('.popup__form-item_value_description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupForm = popup.querySelector('.popup__form'); 


function openPopup() { // что происходит при нажатии кнопки редактирования профиля
    // открыть pop-up:
    popup.classList.add('popup_opened');
    // заполнить соответсвующие графы pop-up значениями имени и описания профиля:
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}

function closePopup() { // что происходит при нажатии на кнопку закрытия pop-up
    // закрыть pop-up:
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { // что происходит при отправке формы pop-up (нажатии на кнопку coхранить или enter)
    // отменить стандартную отправку формы:
    evt.preventDefault(); 
    // присвоить имени и описанию профиля, отображаемым на странице, значения, находящиеся в соответсвтующих графах в pop-up:
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    // закрыть pop-up:
    closePopup();
}

editButton.addEventListener('click',openPopup);
popupCloseButton.addEventListener('click',closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
