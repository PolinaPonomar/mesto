import {initialCards} from '../utils/initial-сards.js';
import {openPopup, closePopup, closePopupByOverlay} from '../components/utils.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {validationConfig, FormValidator} from '../components/FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const cardsSectionSelector = '.cards';




function handleCardClick (link, alt, text) { // функция, передающаяся в класс Card: открывает поп-ап при нажатии на карточку. 
    const popupWithImage = new PopupWithImage('.popup_image');
    popupWithImage.open(link, alt, text);
    popupWithImage.setEventListeners();
}

function cardsRenderer(item) { // функция, передающаяся в класс Section в качестве фукнкции для отрисовки: отрисовывает карточки с фото.
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
}

function handleProfileFormSubmit (inputs) { // функция: отправить форму поп-апа редактирования профиля
    profileName.textContent = inputs.name;
    profileDescription.textContent = inputs.description;
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
        cardsSectionSelector
    );
      // отрисовка карточки
    card.renderItems();

    popupCards.close();
}


//Создадим поп-апы:
const popupProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();
const popupCards = new PopupWithForm('.popup_cards', handleCardsFormSubmit);
popupCards.setEventListeners();

// pop-up для редактирования профиля
const popupInputName = document.querySelector('.popup_profile').querySelector('.popup__form-item_value_name');
const popupInputDescription = document.querySelector('.popup_profile').querySelector('.popup__form-item_value_description');
const popupProfileForm = document.querySelector('.popup_profile').querySelector('.popup__form_type_profile');

// pop-up для добавления карточки
const popupCardsForm = document.querySelector('.popup_cards').querySelector('.popup__form_type_cards');

// Подключим валидацию всем формам поп-апов (описание класса FormValidator и его методов лежит в FormValidator.js)
const profileFormValidator = new FormValidator(validationConfig, popupProfileForm); 
profileFormValidator.enableValidation();
const cardsFormValidator = new FormValidator(validationConfig, popupCardsForm);
cardsFormValidator.enableValidation();

// Слушатели поп-апа для редактирования профиля
editButton.addEventListener('click', function () {
    popupProfile.open();

    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;

    profileFormValidator.doStartValidity(); // метод класса FormValidator, лежащего в FormValidator.js
});

// Слушатели поп-апа для добавления карточки
addButton.addEventListener('click', function () {
    popupCards.open();
    cardsFormValidator.doStartValidity(); // метод класса FormValidator, лежащего в FormValidator.js
});

// Добавление 6-ти стартовых карточек:
const cardsList = new Section({
    items: initialCards,
    renderer: cardsRenderer
    },
    cardsSectionSelector
);
  // отрисовка карточек
cardsList.renderItems();
