import './index.css';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { validationConfig, FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
// import { initialCards } from '../utils/initial-сards.js'; // удалить файл initialCards
import { profileName, 
    profilDescription, 
    profileAvatar,
    editButton,
    addButton,
    popupInputName,
    popupInputDescription,
    popupProfileForm,
    popupCardsForm } from '../utils/constants.js';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '4ea02280-fa61-4e20-88ce-aa4e93f95126',
        'Content-Type': 'application/json'
    }
});

// Загрузка информации о пользователе с сервера
api
    .getUserInfo()
    .then((data) => {
        profileName.textContent = data.name;
        profilDescription.textContent = data.about;
        profileAvatar.src = data.avatar;
    })
    .catch((err) => {
        console.log(err);
    });

// Текущая информация о пользователе
const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description'});

function handleCardClick (link, alt, text) { // функция, передающаяся в класс Card: открывает поп-ап при нажатии на карточку. 
    const popupWithImage = new PopupWithImage('.popup_image');
    popupWithImage.open(link, alt, text);
    popupWithImage.setEventListeners();
}

function cardsRenderer (item) { // функция, передающаяся в класс Section в качестве фукнкции для отрисовки: отрисовывает карточки с фото.
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement); // добавляем созданную карточку в контейнер
}

// Cоздание контейнера для карточек
const cardsList = new Section({
    renderer: cardsRenderer
    },
    '.cards'
);

// Добавление существующих на сервере карточек:
api
    .getInitialCards()
    .then((data) =>{ 
        //данные приходят сортированными от самого позднего поста, до самого раннего => 
        //переворачиваю массив (от раннего до позднего), преобразую
        //и с начала до конца каждую карточку добавляю в начало контейнера (это происходит при отрисовке карточек ниже (addItem класса Section))
        const initialCards = data.reverse().map(item => { 
            return {name: item.name, link: item.link, alt: 'Фотография с подписью: ' + item.name, likes: item.likes}
        });
        // Отрисовка карточек по полученным данным в ранее созданный контейнер
        cardsList.renderItems(initialCards); // 
    })
    .catch((err) => {
        console.log(err);
    });

function handleProfileFormSubmit (inputs) { // функция: отправить форму поп-апа редактирования профиля
    api
        .renewUserInfo(inputs)
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about);
        })
        .catch((err) => {
            console.log(err);
        });
    popupProfile.close();
}

function handleCardsFormSubmit (inputs) { // функция: отправить форму поп-апа добавления новой карточки
    const name = inputs.title;
    const link = inputs.link;
    const alt = 'Фотография с подписью: ' + inputs.title;
    const cardData = {name, link, alt};
    api
        .postNewCard(cardData)
        .then((data) => {
            console.log(data);
            // Отрисовка карточки по полученным данным в ранее созданный контейнер
            cardsList.renderItems([data]);
        })
        .catch((err) => {
            console.log(err);
        });
    popupCards.close();
}

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
