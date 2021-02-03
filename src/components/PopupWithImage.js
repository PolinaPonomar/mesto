import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector); // наследуем конструктор от родительского класса
        this._popupPhoto = this._popup.querySelector('.popup__photo');
        this._popupPhotoName = this._popup.querySelector('.popup__photo-name');
    }

    open (link, alt, textContent) { // Полиморфизм. Расширяем функциональность функции открытия поп-апа: наполняем поп-ап нужными данными 
        this._popupPhoto.src = link;
        this._popupPhoto.alt = alt;
        this._popupPhotoName.textContent = textContent;
        super.open(); // наследуем функцию от родительского класса
    }
}
