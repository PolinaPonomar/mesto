const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupInputName = popup.querySelector('.popup__form-item_value_name');
const popupInputDescription = popup.querySelector('.popup__form-item_value_description');
const popupForm = popup.querySelector('.popup__form');
const popupHeader = popup.querySelector('.popup__header');
const popupSaveButton = popup.querySelector('.popup__save-button');

const cardsPlace = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;
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
        name: 'Монстр',
        link: './blocks/card/__photo/monster.png',
        alt: 'Рисунок милого оранжевого монстра с клычками'
    },
    {
        name: 'Поляна цветов',
        link: './blocks/card/__photo/flower_field.jpg',
        alt: 'Фотография поляны желтых цветов под ясным небом'
    },
    {
        name: 'Розовая прогулка',
        link: './blocks/card/__photo/pink_walk.png',
        alt: 'Рисунок прогулки людей в поле в окружении розовых фей'
    },
    {
        name: 'Новый год',
        link: './blocks/card/__photo/new_Year.jpg',
        alt: 'Фотография новогодней ярмарки в огоньках'
    }
];

function createPopupProfile() {
    popupCloseButton.classList.toggle('popup__close-button_type_profile');
    popupForm.classList.toggle('popup__form_type_profile');
    popupHeader.classList.toggle('popup__header_type_profile');
    popupInputName.classList.toggle('popup__form-item_type_profile');
    popupInputDescription.classList.toggle('popup__form-item_type_profile');
    popupSaveButton.classList.toggle('popup__save-button_type_profile');
}

function createPopupCards() {
    popupCloseButton.classList.toggle('popup__close-button_type_cards');
    popupForm.classList.toggle('popup__form_type_cards');
    popupHeader.classList.toggle('popup__header_type_cards');
    popupInputName.classList.toggle('popup__form-item_type_cards');
    popupInputDescription.classList.toggle('popup__form-item_type_cards');
    popupSaveButton.classList.toggle('popup__save-button_type_cards');
}

function openPopup (evt) { // что происходит при нажатии кнопки редактирования профиля
    // открыть pop-up:
    popup.classList.add('popup_opened');
    if ( evt.target === editButton ) {
        createPopupProfile();
        // заполнить соответсвующие графы pop-up значениями имени и описания профиля:
        popupInputName.value = profileName.textContent;
        popupInputDescription.value = profileDescription.textContent;
    } else if( evt.target === addButton ) {
        createPopupCards();
    }
    
    
}

function closePopup (evt) { // что происходит при нажатии на кнопку закрытия pop-up
    if ( evt.target === editButton ) {
        createPopupProfile();
    } else if ( evt.target === addButton ) {
        createPopupCards();
    }
    // закрыть pop-up:
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { // что происходит при отправке формы pop-up (нажатии на кнопку coхранить или enter)
    // отменить стандартную отправку формы:
    evt.preventDefault(); 
    // присвоить имени и описанию профиля, отображаемым на странице, значения, находящиеся в соответсвтующих графах в pop-up:
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    // закрыть pop-up:
    closePopup();
}

editButton.addEventListener('click',openPopup); // подслушать и среагировать на нажатие кнопки редактировать профиль
addButton.addEventListener('click',openPopup); // подслушать и среагировать на нажатие кнопки добавить фотографии
popupCloseButton.addEventListener('click',closePopup); // подслушать и среагировать на нажатие кнопки закрыть pop-up
popupForm.addEventListener('submit', formSubmitHandler); // подслушать и среагировать на нажатие кнопки coхранить или enter


// Добавление 6-ти стартовых карточек:

initialCards.forEach(function (item) { // проходимся по каждому элементу массива с данными для конкретных карточек
    // клонируем содержимое тега template
    const card = cardTemplate.cloneNode(true);
    // заполняем содержимое уникальными данными конкретной карточки
    card.querySelector('.card__text').textContent = item.name;
    card.querySelector('.card__photo').src = item.link;
    card.querySelector('.card__photo').alt = item.alt;
    // добавляем получившуюся карточку 
    cardsPlace.append(card);
});
