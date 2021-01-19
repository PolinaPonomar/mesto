import {openPopup, closePopup} from './utils.js';

//pop-up для открытия фото
const popupImage = document.querySelector('.popup_image');
const closeButtonImage = popupImage.querySelector('.popup__close-button');
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupPhotoName = popupImage.querySelector('.popup__photo-name');

export class Card {
    constructor (data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._alt = data.alt;
        this._cardSelector = cardSelector;

        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._photo = this._element.querySelector('.card__photo');
        this._photoText = this._element.querySelector('.card__text');
    }

    _getTemplate () { // функция: вернуть темплейт карточки
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .cloneNode(true);
        return cardElement;
    }
      
    _handleLikeClick () { // функция: поставить/убрать лайк
        this._likeButton.classList.toggle('card__like-button_active');
    }

    _handleDeleteClick () { // функция: удалить карточку
        this._deleteButton.closest('.card').remove();
    }

    _handleOpenPopup () { // функция: открыть поп-ап с фото
        popupPhoto.src = this._link;
        popupPhoto.alt = this._alt;
        popupPhotoName.textContent = this._photoText.textContent;
        openPopup(popupImage); 
    }
      
    _handleClosePopup () { // функция: закрыть поп-ап с фото
        popupPhoto.src = '';
        popupPhoto.alt = '';
        popupPhotoName.textContent = '';
        closePopup(popupImage);
    }

    _setEventListeners () { // функция: добавить слушатели карточке
        //слушатель лайка
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });

        //слушатель удаления
        this._deleteButton.addEventListener('click', () =>{
            this._handleDeleteClick();
        });

        //слушатель клика по фото
        this._photo.addEventListener('click', () => {
            this._handleOpenPopup();
        });

         //слушатель клика по кнопке закрытия поп-апа с фото
         closeButtonImage.addEventListener('click', () => {
            this._handleClosePopup();
        });
    }

    createCard () { //функция: создать карточку
        this._photoText.textContent = this._name;
        this._photo.src = this._link;
        this._photo.alt = this._alt;

        this._setEventListeners();
        
        return this._element;
    }
}
