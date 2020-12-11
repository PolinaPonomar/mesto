const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');

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

//pop-up для открытия фото
const popupImage = document.querySelector('.popup_image');
const closeButtonImage = popupImage.querySelector('.popup__close-button');
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupPhotoName = popupImage.querySelector('.popup__photo-name');

const cardsPlace = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {
        name: 'Волшебное озеро',
        link: './blocks/card/__photo/magic_lake.jpg',
        alt: 'Рисунок озера в тумане под светом луны'
    },
    {
        name: 'Склон на закате',
        link: './blocks/card/__photo/sunset.jpg',
        alt: 'Рисунок малинового заката'
    },
    {
        name: 'Розовая прогулка',
        link: './blocks/card/__photo/pink_walk.png',
        alt: 'Рисунок прогулки людей в поле в окружении розовых фей'
    },
    {
        name: 'Дом-приведение',
        link: './blocks/card/__photo/house-ghost.jpg',
        alt: 'Рисунок темного дома на холме, освещенного луной'
    },
    {
        name: 'Поляна цветов',
        link: './blocks/card/__photo/flower_field.jpg',
        alt: 'Фотография поляны желтых цветов под ясным небом'
    },
    {
        name: 'Рождественская ярмарка',
        link: './blocks/card/__photo/new_Year.jpg',
        alt: 'Фотография новогодней ярмарки в огоньках'
    }
];

function openPopup (popup) { // функция: открыть pop-up
    popup.classList.add('popup_opened');
}

function closePopup (popup) { // функция: закрыть pop-up
    popup.classList.remove('popup_opened');
}


function likeCard (cardElement) { // функция: добавить карточке возможность поставить лайк или убрать его
    // ищем кнопку для лайка
    const likeButton = cardElement.querySelector('.card__like-button');

    // если на нее нажали -> сделать активной/неактивной
    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_active');
    });
}

function deleteCard (cardElement) { // функция: добавить карточке возможность удаления
    // ищем кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // если на нее нажали -> удалить карточку
    deleteButton.addEventListener('click', function(evt) {
        evt.target.closest('.card').remove();
    }); 
}

 function createCardPopup (cardElement) { // функция: добавить карточке возможность открытия фото в pop-up
    // найти фото с карточки
    const photo = cardElement.querySelector('.card__photo');

    // найти подпись с карточки
    const photoText = cardElement.querySelector('.card__text');

    // если нажали на фото карточки -> в поп-ап для открытия фото добавить фото, текст и открыть этот поп-ап
    photo.addEventListener('click', function (evt) {
        popupPhoto.src = evt.target.src;
        popupPhoto.alt = evt.target.alt;
        popupPhotoName.textContent = photoText.textContent;
        openPopup(popupImage);
    });
}

function createCard (name, link, alt) { //функция: создать карточку
    // клонируем содержимое тега template
    const cardElement = cardTemplate.cloneNode(true);

    // находим картинку и подпись карточки
    const cardElementText = cardElement.querySelector('.card__text');
    const cardElementImage = cardElement.querySelector('.card__photo');

    // заполняем содержимое уникальными данными конкретной карточки
    cardElementText.textContent = name;
    cardElementImage.src = link;
    cardElementImage.alt = alt;

    // добавляем карточке возможности лайка, удаления и открытия фото в поп-апе
    likeCard (cardElement);
    deleteCard (cardElement);
    createCardPopup(cardElement); 

    // возвращаем получившуюся карточку 
    return cardElement;
}

function profileFormSubmitHandler (evt) { // функция: отправить форму поп-апа редактирования профиля
    // отменить стандартную отправку формы:
    evt.preventDefault(); 

    // присвоить имени и описанию профиля, отображаемым на странице, значения, находящиеся в соответсвтующих графах в pop-up:
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    // закрыть pop-up:
    closePopup(popupProfile);
}

function addCard (card) { //функция: добавить карточку в начало контейнера с карточками
    cardsPlace.prepend(card);
}


function cardsFormSubmitHandler (evt) { // функция: отправить форму поп-апа добавления новой карточки
    // отменить стандартную отправку формы:
    evt.preventDefault(); 

    // создаем константы для краткого обозначения введенных пользователем данных
    const name = popupInputPlaceName.value;
    const link = popupInputLink.value;
    const alt = 'Фотография с подписью: ' + popupInputPlaceName.value;

    //создаем новую карточку на основании введенных пользователем данных
    const card = createCard(name, link, alt);

    // добавляем получившуюся карточку 
    addCard(card);

    // очищаем форму
    popupCardsForm.reset();

    // закрыть pop-up:
    closePopup(popupCards);
}


// если юзер нажал на кнопку редактировать профиль -> открыть соответсвующий pop-up редактирования профиля
editButton.addEventListener('click',function () {
    // открыть pop-up
    openPopup(popupProfile);
    //заполнить соответсвующие графы pop-up значениями имени и описания профиля
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
});

// если юзер нажал на enter или кнопку Сохранить-> отправить форму
popupProfileForm.addEventListener('submit', profileFormSubmitHandler);

// если юзер нажал на кнопку закрыть pop-up редактирования профиля-> закрыть его
closeButtonPopupProfile.addEventListener('click', function () { closePopup(popupProfile) });



// если юзер нажал на кнопку добавить фото -> открыть соответсвующий pop-up для добавления карточки
addButton.addEventListener('click',function () { openPopup(popupCards) });

// если юзер нажал на enter или кнопку Создать-> отправить форму
popupCardsForm.addEventListener('submit', cardsFormSubmitHandler);

// если юзер нажал на кнопку закрыть pop-up для добавления карточки -> закрыть его
closeButtonPopupCards.addEventListener('click', function () { closePopup(popupCards) });



// если юзер нажал на кнопку закрыть поп-ап для открытия фото -> закрыть его
closeButtonImage.addEventListener('click', function () { closePopup(popupImage) });


// Добавление 6-ти стартовых карточек:

initialCards.forEach(function (item) { // проходимся по каждому элементу массива с данными для конкретных карточек
    //создаем новую карточку на основании данных карточки
    const card = createCard(item.name, item.link, item.alt);

    // добавляем получившуюся карточку 
    addCard(card);
});
