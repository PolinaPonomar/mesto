// const profileName = document.querySelector('.profile__name');
// const profilDescription = document.querySelector('.profile__description'); 
// const profileAvatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector('.profile__avatar-wrapper');
const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// pop-up для редактирования профиля
const profilePopup= document.querySelector('.popup_profile')
const popupInputName = profilePopup.querySelector('.popup__form-item_value_name');
const popupInputDescription = profilePopup.querySelector('.popup__form-item_value_description');
const popupProfileForm = profilePopup.querySelector('.popup__form_type_profile');
// pop-up для добавления карточки
const popupCardsForm = document.querySelector('.popup_cards').querySelector('.popup__form_type_cards');
// pop-up для изменения аватара
const popupAvatarForm = document.querySelector('.popup_avatar').querySelector('.popup__form_type_avatar');

export {editAvatarButton, editProfileButton, addButton, popupInputName, popupInputDescription, popupProfileForm, popupAvatarForm, popupCardsForm}
