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
    popupCardsForm,
    container } from '../utils/constants.js';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '4ea02280-fa61-4e20-88ce-aa4e93f95126',
        'Content-Type': 'application/json'
    }
})

//Загрузка информации о пользователе с сервера
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

function cardsRenderer (item, section) { // функция, передающаяся в класс Section в качестве фукнкции для отрисовки: отрисовывает карточки с фото.
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    section.addItem(cardElement);
}

// Добавление существующих на сервере карточек:
api
    .getInitialCards()
    .then((data) =>{
        const initialCards = data.map(item => {
            return {name: item.name, link: item.link, alt: 'Фотография с подписью: ' + item.name}
        });
        //создание контейнера с карточками
        const cardsList = new Section({
            items: initialCards, // массив данных карточек с сервера
            renderer: (item) => { 
                cardsRenderer(item, cardsList); 
            }
            },
            '.cards'
        );
        // отрисовка карточек
        cardsList.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });

// // Загрузка данных существующих на сервере карточек:
// const initialCards = api
//     .getInitialCards()
//     .then((data) =>{
//         const initialCards = data.map(item => {
//             return {name: item.name, link: item.link, alt: 'Фотография с подписью: ' + item.name}
//         });
//         console.log(initialCards);
//         return initialCards
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// console.log(initialCards);

// // Добавление 6-ти стартовых карточек:
// const cardsList = new Section({
//     items: initialCards,
//     renderer: cardsRenderer
//     },
//     '.cards'
// );
// // отрисовка карточек
// cardsList.renderItems();


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
            // создание карточки
            const card = new Card(data, '#card-template', handleCardClick);
            const cardElement = card.generateCard();
            container.prepend(cardElement); //ПЛОХО: секшон уже создан!
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
