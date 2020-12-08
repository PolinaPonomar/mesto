const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const closeButtonPopupProfile = popupProfile.querySelector('.popup__close-button_type_profile');
const popupInputName = popupProfile.querySelector('.popup__form-item_value_name');
const popupInputDescription = popupProfile.querySelector('.popup__form-item_value_description');
const popupProfileForm = popupProfile.querySelector('.popup__form_type_profile');

const popupCards = document.querySelector('.popup_cards');
const closeButtonPopupCards = popupCards.querySelector('.popup__close-button_type_cards');
const popupInputPlaceName = popupCards.querySelector('.popup__form-item_value_place-name');
const popupInputLink = popupCards.querySelector('.popup__form-item_value_link');
const popupCardsForm = popupCards.querySelector('.popup__form_type_cards');

const cardsPlace = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {
        name: 'Волшебное озеро',
        link: './blocks/card/__photo/magic_lake.jpg',
        alt: 'Рисунок озера в тумане под светом луны'
    },
    {
        name: 'Закат',
        link: './blocks/card/__photo/sunset.jpg',
        alt: 'Рисунок малинового заката'
    },
    {
        name: 'Розовая прогулка',
        link: './blocks/card/__photo/pink_walk.png',
        alt: 'Рисунок прогулки людей в поле в окружении розовых фей'
    },
    // {
    //     name: 'Монстр',
    //     link: './blocks/card/__photo/monster.png',
    //     alt: 'Рисунок милого оранжевого монстра с клычками'
    // },
    // {
    //     name: 'Дом приведений',
    //     link: './blocks/card/__photo/monster-house.jpg',
    //     alt: 'Рисунок темного высокого дома под огромным месяцем'
    // },
    {
        name: 'Дом-приведение',
        link: './blocks/card/__photo/house-ghost1.jpg',
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
    // {
    //     name: 'Рождественская ярмарка',
    //     link: './blocks/card/__photo/snowman.jpg',
    //     alt: 'Фотография новогодней ярмарки в огоньках'
    // }
];

function openPopup (popup) { // что происходит при нажатии кнопки редактирования профиля
    // открыть pop-up:
    popup.classList.add('popup_opened');
    if ( popup === popupProfile) {
        // заполнить соответсвующие графы pop-up значениями имени и описания профиля:
        popupInputName.value = profileName.textContent;
        popupInputDescription.value = profileDescription.textContent;
    }
}

function closePopup (popup) { // что происходит при нажатии на кнопку закрытия pop-up
    // закрыть pop-up:
    popup.classList.remove('popup_opened');
}

function likeCard (evt) { // функция для того чтобы поставить или убрать лайк
    evt.target.classList.toggle('card__like-button_active');
}

function deleteCard (evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

function formSubmitHandler (evt) { // что происходит при отправке формы pop-up (нажатии на кнопку coхранить или enter)
    // отменить стандартную отправку формы:
    evt.preventDefault(); 
    if ( evt.target === popupProfileForm ) {
        // присвоить имени и описанию профиля, отображаемым на странице, значения, находящиеся в соответсвтующих графах в pop-up:
        profileName.textContent = popupInputName.value;
        profileDescription.textContent = popupInputDescription.value;
        // закрыть pop-up:
        closePopup(popupProfile);
    } else if ( evt.target === popupCardsForm ) { //ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
        // клонируем содержимое тега template
        const cardElement = cardTemplate.cloneNode(true);
        // заполняем содержимое уникальными данными конкретной карточки
        cardElement.querySelector('.card__text').textContent = popupInputPlaceName.value;
        cardElement.querySelector('.card__photo').src = popupInputLink.value;
        cardElement.querySelector('.card__photo').alt = 'Фотография с подписью: ' + popupInputPlaceName.value;
        // добавляем возможность лайкать карточку:
        const likeButton = cardElement.querySelector('.card__like-button');
        likeButton.addEventListener('click',likeCard);
        // добавляем возможность удалить карточку:
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', deleteCard);
        // добавляем получившуюся карточку 
        cardsPlace.prepend(cardElement);
        // очищаем форму:
        popupInputPlaceName.value = '';
        popupInputLink.value = '';
        // закрыть pop-up:
        closePopup(popupCards);
    }
     
}

editButton.addEventListener('click',function () { openPopup(popupProfile) }); // подслушать и среагировать на нажатие кнопки редактировать профиль
addButton.addEventListener('click',function () { openPopup(popupCards) }); // подслушать и среагировать на нажатие кнопки добавить фотографии
closeButtonPopupProfile.addEventListener('click', function () { closePopup(popupProfile) }); // подслушать и среагировать на нажатие кнопки закрыть pop-up для редактирования профиля
closeButtonPopupCards.addEventListener('click', function () { closePopup(popupCards) }); // подслушать и среагировать на нажатие кнопки закрыть pop-up для добавления фотографии
popupProfileForm.addEventListener('submit', formSubmitHandler); // подслушать и среагировать на нажатие кнопки coхранить или enter
popupCardsForm.addEventListener('submit', formSubmitHandler);

// Добавление 6-ти стартовых карточек:

initialCards.forEach(function (item) { // проходимся по каждому элементу массива с данными для конкретных карточек
    // клонируем содержимое тега template
    const cardElement = cardTemplate.cloneNode(true);
    // заполняем содержимое уникальными данными конкретной карточки
    cardElement.querySelector('.card__text').textContent = item.name;
    cardElement.querySelector('.card__photo').src = item.link;
    cardElement.querySelector('.card__photo').alt = item.alt;
    // добавляем возможность лайкать карточку:
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    // добавляем возможность удалить карточку:
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    // добавляем получившуюся карточку 
    cardsPlace.prepend(cardElement);
    
});
