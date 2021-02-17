export class Card {
    constructor (data, cardSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._alt = data.alt;
        this._likesNumber = data.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;

        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeСounter = this._element.querySelector('.card__likes-number');
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._photo = this._element.querySelector('.card__photo');
        this._photoText = this._element.querySelector('.card__text');
    }

    _getTemplate () { // функция: вернуть темплейт карточки
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.card')
          .cloneNode(true);
        return cardElement;
    }
      
    _handleLikeClick () { // функция: поставить/убрать лайк
        this._likeButton.classList.toggle('card__like-button_active');
    }

    _handleDeleteClick () { // функция: удалить карточку
        this._element.remove();
        // зануляем, чтобы нельзя было сослаться на эту ноду дом дерева
        this._element = null;
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
            this._handleCardClick(this._link, this._alt, this._name); //функция, переданная в конструктор. Открывает поп-ап при нажатии на карточку
        });
    }

    generateCard () { //функция: создать карточку
        this._photoText.textContent = this._name;
        this._photo.src = this._link;
        this._photo.alt = this._alt;
        this._likeСounter.textContent = this._likesNumber;

        this._setEventListeners();
        
        return this._element;
    }
}
