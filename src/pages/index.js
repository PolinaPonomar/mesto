import './index.css';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { validationConfig, FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
// import { initialCards } from '../utils/initial-сards.js'; // удалить файл initialCards
import {
    editAvatarButton,
    editProfileButton,
    addButton,
    popupInputName,
    popupInputDescription,
    popupProfileForm,
    popupAvatarForm,
    popupCardsForm 
} from '../utils/constants.js';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '4ea02280-fa61-4e20-88ce-aa4e93f95126',
        'Content-Type': 'application/json'
    }
});

// Текущая информация о пользователе
const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__avatar'});

// Загрузка информации о пользователе с сервера
api
    .getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data.name,data.about);
        userInfo.setUserAvatar(data.avatar);
        userInfo.setUserId(data._id);
    })
    .catch((err) => {
        console.log(err);
    });


// Cоздание контейнера для карточек
const cardsList = new Section({
    renderer: cardsRenderer
    },
    '.cards'
);

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();
const popupWithConfirm = new PopupWithConfirm('.popup_confirm', handlerConfirmFormSubmit);
popupWithConfirm.setEventListeners();

function cardsRenderer (item) { // функция, передающаяся в класс Section в качестве фукнкции для отрисовки: отрисовывает карточки с фото.
    const card = new Card(
        item,
        userInfo.getUserInfo().id, //id находится, т.к. в очереди на сервер его я получила раньше, чем кардс
        '#card-template',
        {handleCardClick: (link, alt, text) => { //  функция: открывает поп-ап при нажатии на карточку
            popupWithImage.open(link, alt, text);
        },
        handleDeleteClick: (card, cardId) => {
            popupWithConfirm.open(card, cardId);
        },
        handleLikeClick: (cardId, likeButton, likeСounter) => {
            likeButton.classList.toggle('card__like-button_active');
            if ( likeButton.classList.contains('card__like-button_active') ) {
                api
                    .putLike(cardId)
                    .then( (data) => {
                        likeСounter.textContent = data.likes.length;
                    })
            } else {
                api
                    .deleteLike(cardId)
                    .then( (data) => {
                        likeСounter.textContent = data.likes.length;
                    })
            }
        },
        }
    ); 
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement); // добавляем созданную карточку в контейнер
}

function handlerConfirmFormSubmit(card, cardId) { // функция: отправить поп-ап удаления карточки
    api
        .deleteCard(cardId)
        .then( (answer) => {
            console.log(answer); // тут сообщение, что пост удален
            card.remove();
        })
        .catch((err) => {
            console.log(err);
        });
    popupWithConfirm.close();
}

// Добавление существующих на сервере карточек:
api
    .getInitialCards()
    .then((data) =>{
        data.forEach(item => { // добавляю в данные подгруженных карточек alt
            item.alt = 'Фотография с подписью: ' + item.name
        });
        //данные приходят сортированными от самого позднего поста, до самого раннего => переворачиваю массив (от раннего до позднего)
        data.reverse()
        //и с начала до конца каждую карточку добавляю в начало контейнера (=> самая поздняя карточка окажетсяя первой в контейнере):
        // Отрисовка карточек по полученным данным в ранее созданный контейнер
        cardsList.renderItems(data); // 
    })
    .catch((err) => {
        console.log(err);
    });

function handleProfileFormSubmit (inputs) { // функция: отправить форму поп-апа редактирования профиля
    popupProfile.checkloading(true);
    api
        .renewUserInfo(inputs)
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupProfile.checkloading(false);
        });
    popupProfile.close();
}

function handleAvatarFormSubmit (input) { // функция: отправить форму поп-апа редактирования аватара
    popupAvatar.checkloading(true);
    api
        .changeAvatar(input.link)
        .then((data) => {
            userInfo.setUserAvatar(data.avatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAvatar.checkloading(false);
        });
    popupAvatar.close();
}

function handleCardsFormSubmit (inputs) { // функция: отправить форму поп-апа добавления новой карточки
    popupCards.checkloading(true);
    const name = inputs.title;
    const link = inputs.link;
    const alt = 'Фотография с подписью: ' + inputs.title;
    const cardData = {name, link, alt};
    api
        .postNewCard(cardData)
        .then((data) => {
            data.alt = 'Фотография с подписью: ' + data.name;//  на сервере не было альта, теперь есть
            console.log(data);
            // Отрисовка карточки по полученным данным в ранее созданный контейнер
            cardsList.renderItems([data]);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupCards.checkloading(false);
        });
    popupCards.close();
}

//Создадим поп-апы с формами:
const popupProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();
const popupCards = new PopupWithForm('.popup_cards', handleCardsFormSubmit);
popupCards.setEventListeners();
const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarFormSubmit);
popupAvatar.setEventListeners();

// Подключим валидацию всем формам поп-апов
const profileFormValidator = new FormValidator(validationConfig, popupProfileForm); 
profileFormValidator.enableValidation();
const cardsFormValidator = new FormValidator(validationConfig, popupCardsForm);
cardsFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, popupAvatarForm);
avatarFormValidator.enableValidation();

// Слушатель поп-апа для редактирования профиля
editProfileButton.addEventListener('click', function () {
    popupProfile.open();
    popupInputName.value = userInfo.getUserInfo().name; // getUserInfo - метод класса UserInfo
    popupInputDescription.value = userInfo.getUserInfo().description;
    profileFormValidator.doStartValidity(); // метод класса FormValidator
});

// Слушатель поп-апа для добавления карточки
addButton.addEventListener('click', function () {
    popupCards.open();
    cardsFormValidator.doStartValidity(); // метод класса FormValidator
});

// Слушатель поп-апа для редактирования аватара
editAvatarButton.addEventListener('click', function () {
    popupAvatar.open();
    avatarFormValidator.doStartValidity(); // метод класса FormValidator
});
