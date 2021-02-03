const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// pop-up для редактирования профиля
const profilePopup= document.querySelector('.popup_profile')
const popupInputName = profilePopup.querySelector('.popup__form-item_value_name');
const popupInputDescription = profilePopup.querySelector('.popup__form-item_value_description');
const popupProfileForm = profilePopup.querySelector('.popup__form_type_profile');
// pop-up для добавления карточки
const popupCardsForm = document.querySelector('.popup_cards').querySelector('.popup__form_type_cards');

export { editButton, addButton, popupInputName, popupInputDescription, popupProfileForm, popupCardsForm }
