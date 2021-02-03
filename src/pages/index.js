import './index.css';

import {initialCards} from '../utils/initial-сards.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {validationConfig, FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// pop-up для редактирования профиля
const profilePopup= document.querySelector('.popup_profile')
const popupInputName = profilePopup.querySelector('.popup__form-item_value_name');
const popupInputDescription = profilePopup.querySelector('.popup__form-item_value_description');
const popupProfileForm = profilePopup.querySelector('.popup__form_type_profile');
// pop-up для добавления карточки
const popupCardsForm = document.querySelector('.popup_cards').querySelector('.popup__form_type_cards');


function handleCardClick (link, alt, text) { // функция, передающаяся в класс Card: открывает поп-ап при нажатии на карточку. 
    const popupWithImage = new PopupWithImage('.popup_image');
    popupWithImage.open(link, alt, text);
    popupWithImage.setEventListeners();
}

function cardsRenderer (item) { // функция, передающаяся в класс Section в качестве фукнкции для отрисовки: отрисовывает карточки с фото.
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
}

// Добавление 6-ти стартовых карточек:
const cardsList = new Section({
    items: initialCards,
    renderer: cardsRenderer
    },
    '.cards'
);
// отрисовка карточек
cardsList.renderItems();


function handleProfileFormSubmit (inputs) { // функция: отправить форму поп-апа редактирования профиля
    userInfo.setUserInfo(inputs.name,inputs.description);
    popupProfile.close();
}

function handleCardsFormSubmit (inputs) { // функция: отправить форму поп-апа добавления новой карточки
    const name = inputs.title;
    const link = inputs.link;
    const alt = 'Фотография с подписью: ' + inputs.title;
    const data = [{name, link, alt}];
    // создание карточки
    const card = new Section({
        items: data,
        renderer: cardsRenderer
        },
        '.cards'
    );
      // отрисовка карточки
    card.renderItems();
    popupCards.close();
}

// Информация о пользователе
const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description'});

//Создадим поп-апы с формами:
const popupProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();
const popupCards = new PopupWithForm('.popup_cards', handleCardsFormSubmit);
popupCards.setEventListeners();

// Подключим валидацию всем формам поп-апов
const profileFormValidator = new FormValidator(validationConfig, popupProfileForm); 
profileFormValidator.enableValidation();
const cardsFormValidator = new FormValidator(validationConfig, popupCardsForm);
cardsFormValidator.enableValidation();

// Слушатели поп-апа для редактирования профиля
editButton.addEventListener('click', function () {
    popupProfile.open();
    popupInputName.value = userInfo.getUserInfo().name; // getUserInfo - метод класса UserInfo
    popupInputDescription.value = userInfo.getUserInfo().description;
    profileFormValidator.doStartValidity(); // метод класса FormValidator
});

// Слушатели поп-апа для добавления карточки
addButton.addEventListener('click', function () {
    popupCards.open();
    cardsFormValidator.doStartValidity(); // метод класса FormValidator
});
