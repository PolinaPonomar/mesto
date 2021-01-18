import {validationConfig, enableValidation, doStartValidity} from './validate.js';
import {initialCards} from './initial-сards.js';
import {Card} from './Card.js';

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const cardsPlace = document.querySelector('.cards');

//pop-up для редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
const closeButtonPopupProfile = popupProfile.querySelector('.popup__close-button_type_profile');
const popupInputName = popupProfile.querySelector('.popup__form-item_value_name');
const popupInputDescription = popupProfile.querySelector('.popup__form-item_value_description');
const popupProfileForm = popupProfile.querySelector('.popup__form_type_profile');

//pop-up для добавления карточки
const popupCards = document.querySelector('.popup_cards');
const closeButtonPopupCards = popupCards.querySelector('.popup__close-button_type_cards');
const popupInputPlaceName = popupCards.querySelector('.popup__form-item_value_place-name');
const popupInputLink = popupCards.querySelector('.popup__form-item_value_link');
const popupCardsForm = popupCards.querySelector('.popup__form_type_cards');


function openPopup (popup) { // функция: открыть pop-up
    popup.classList.add('popup_opened');
    //добавим возможность закрыть по-ап, нажав Esc
    document.addEventListener('keydown',closePopupByEsc);
}

function closePopup (popup) { // функция: закрыть pop-up
    popup.classList.remove('popup_opened');
    //удалим возможность закрыть по-ап, нажав Esc
    document.removeEventListener('keydown',closePopupByEsc);
}

const closePopupByEsc = function (evt) { // функция: возможность закрывать поп-ап нажав на Esc
    if (evt.key === 'Escape') { 
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
};

function closePopupByOverlay (popup) { // функция: возможность закрывать поп-ап кликом на оверлей
    // ищем контейнер, оборачивающий все, кроме фона поп-апа
    const popupContainer = popup.querySelector('.popup__container');
    popup.addEventListener('click', (evt) => { 
        // если нижним DOM-элементом, на котором сработало событие оказался поп-ап или контейнер (так захвачен весь оверлей), закрываем
        if (evt.target === popup || evt.target === popupContainer) { 
            closePopup(popup);
        }
    });
}

function addCard (card) { //функция: добавить карточку в начало контейнера с карточками
    cardsPlace.prepend(card);
}

function handleProfileFormSubmit (evt) { // функция: отправить форму поп-апа редактирования профиля
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(popupProfile);
}

function handleCardsFormSubmit (evt) { // функция: отправить форму поп-апа добавления новой карточки
    evt.preventDefault(); 
    const name = popupInputPlaceName.value;
    const link = popupInputLink.value;
    const alt = 'Фотография с подписью: ' + popupInputPlaceName.value;
    const item = {name, link, alt};
    const card = new Card(item, '#card-template', openPopup, closePopup);
    const cardElement = card.createCard();
    addCard(cardElement);
    popupCardsForm.reset();
    closePopup(popupCards);
}

// Подключим валидацию всем формам поп-апов (описание в validate.js)
enableValidation(validationConfig);

// Слушатели поп-апа для редактирования профиля
editButton.addEventListener('click',function () {
    openPopup(popupProfile);
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
    doStartValidity(popupProfileForm,validationConfig); //(описание в validate.js)
});
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
closeButtonPopupProfile.addEventListener('click', function () { 
    closePopup(popupProfile);
});

// Слушатели поп-апа для добавления карточки
addButton.addEventListener('click',function () { 
    openPopup(popupCards);
    doStartValidity(popupCardsForm, validationConfig); //(описание в validate.js)
});
popupCardsForm.addEventListener('submit', handleCardsFormSubmit);
closeButtonPopupCards.addEventListener('click', function () { 
    closePopup(popupCards);
 });

//Добавляем возможность любому поп-апу закрыться по клику по оверлею
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(popup => {
    closePopupByOverlay(popup);
});

// Добавление 6-ти стартовых карточек:  В ОСНОВНОЙ КОД
initialCards.forEach(function (item) { //(initialCards лежит в initial-сards.js)
    const card = new Card(item, '#card-template', openPopup, closePopup);
    const cardElement = card.createCard();
    addCard(cardElement);
});
