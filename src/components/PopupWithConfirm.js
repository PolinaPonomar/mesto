import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
    constructor (popupSelector, handlerFormSubmit) {
        super(popupSelector); // наследуем конструктор от родительского класса
        this._handlerFormSubmit = handlerFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    _submit (evt) { // функция: описываем отправку формы
        evt.preventDefault();
        this._handlerFormSubmit(this._card,this._cardId);
    }

    open (card, cardId) {
        super.open(); // наследуем функцию от родительского класса
        this._card = card;
        this._cardId = cardId;
    }

    setEventListeners () { // Полиморфизм. Расширяем функциональность функции навешивания обработчиков: добавляем обработчик отправки формы 
        super.setEventListeners(); // наследуем функцию от родительского класса
        this._form.addEventListener('submit', this._submit.bind(this));
    }
}
