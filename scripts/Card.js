class Card {
    constructor (data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._alt = data.alt;
        this._cardSelector = cardSelector; //'#card-template'
    }

    _getTemplate() { // функция: вернуть темплейт карточки
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .cloneNode(true);
        return cardElement;
    }

    createCard () { //функция: создать карточку
        this._element = this._getTemplate();
        this._element.querySelector('.card__text').textContent = this._name;
        this._element.querySelector('.card__photo').src = this._link;
        this._element.querySelector('.card__photo').alt = this._alt;

        this._setEventListeners();
        
        return this._element;
    }

    _setEventListeners() { // функция: добавить слушатели карточке
        //слушатель лайка
        const likeButton = this._element.querySelector('.card__like-button');
        likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });

        //слушатель удаления
        const deleteButton = this._element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () =>{
            this._handleDeleteClick();
        });

        //слушатель клика по фото
        const photo = this._element.querySelector('.card__photo');
        photo.addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _handleLikeClick () { // функция: поставить/убрать лайк
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }

    _handleDeleteClick() { // функция: удалить карточку
        // this._element.querySelector('.card__delete-button').closest('.card').remove();
        this._element.remove();
    }

    _handleImageClick() { // функция: открыть поп-ап с фото
        const photoText = this._element.querySelector('.card__text');
        popupPhoto.src = this._link;
        popupPhoto.alt = this._alt;
        popupPhotoName.textContent = photoText.textContent;
        openPopup(popupImage);
    }
}




const popupPhoto = popupImage.querySelector('.popup__photo');
const popupPhotoName = popupImage.querySelector('.popup__photo-name');
const popupImage = document.querySelector('.popup_image');

function openPopup (popup) { // функция: открыть pop-up
    popup.classList.add('popup_opened');
    //добавим возможность закрыть по-ап, нажав Esc
    document.addEventListener('keydown',closePopupByEsc);
}

// const cardTemplate = document.querySelector('#card-template').content;

// function createCard (name, link, alt) { //функция: создать карточку
//     const cardElement = cardTemplate.cloneNode(true);
//     const cardElementText = cardElement.querySelector('.card__text');
//     const cardElementImage = cardElement.querySelector('.card__photo');
//     cardElementText.textContent = name;
//     cardElementImage.src = link;
//     cardElementImage.alt = alt;
//     setLikeHandler(cardElement);
//     setDeleteCardHandler (cardElement);
//     setImageCardHandler(cardElement); 
//     return cardElement;
// }

// function setLikeHandler (cardElement) { // функция: добавить карточке возможность поставить лайк или убрать его
//     const likeButton = cardElement.querySelector('.card__like-button');
//     likeButton.addEventListener('click', function(evt) {
//         evt.target.classList.toggle('card__like-button_active');
//     });
// }

// function setDeleteCardHandler (cardElement) { // функция: добавить карточке возможность удаления
//     const deleteButton = cardElement.querySelector('.card__delete-button');
//     deleteButton.addEventListener('click', function(evt) {
//         evt.target.closest('.card').remove();
//     }); 
// }

// function setImageCardHandler (cardElement) { // функция: добавить карточке возможность открытия фото в pop-up
//     const photo = cardElement.querySelector('.card__photo');
//     const photoText = cardElement.querySelector('.card__text');
//     photo.addEventListener('click', function (evt) {
//         popupPhoto.src = evt.target.src;
//         popupPhoto.alt = evt.target.alt;
//         popupPhotoName.textContent = photoText.textContent;
//         openPopup(popupImage);
//     });
// }




// Добавление 6-ти стартовых карточек:  В ОСНОВНОЙ КОД
initialCards.forEach(function (item) { //(initialCards лежит в initial-сards.js)
    const card = new Card (item, '#card-template');
    addCard(card);
});
