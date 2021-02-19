export class Card {
    constructor (data, accountId, cardSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
        this._link = data.link;
        this._name = data.name;
        this._alt = data.alt;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._likesNumber = data.likes.length;
        this._likedUsers = data.likes.map(item =>{ return item._id});

        this._accountId = accountId;
        this._cardSelector = cardSelector;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;

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
        // если карточка не принадлежит владельцу аккаунта - убираем иконку удаления
        if (this._ownerId !== this._accountId) {
            cardElement.querySelector('.card__delete-button').remove();
        }
        return cardElement;
    }
      
    _setEventListeners () { // функция: добавить слушатели карточке
        // слушатель лайка
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._cardId, this._likeButton, this._likeСounter);
        });
        // слушатель удаления 
        if (this._ownerId == this._accountId) { // вешается только на карточки владельца аккаунта
            this._deleteButton.addEventListener('click', () =>{
                this._handleDeleteClick(this._element,this._cardId);
            });
        }
        // слушатель клика по фото
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._link, this._alt, this._name);
        });
    }

    generateCard () { //функция: создать карточку
        this._photoText.textContent = this._name;
        this._photo.src = this._link;
        this._photo.alt = this._alt;
        this._likeСounter.textContent = this._likesNumber;
        // отобразить на карточке лайк владельца аккаунта, если он есть
        if (this._likedUsers.some(item => {return item == this._accountId})) {
            this._likeButton.classList.add('card__like-button_active');
        }
        this._setEventListeners();
        return this._element;
    }
}
