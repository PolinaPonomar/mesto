import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handlerFormSubmit) {
        super(popupSelector); // наследуем конструктор от родительского класса
        this._handlerFormSubmit = handlerFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__form-item');
    }

    _getInputValues() { // функция: возвращаем объект с названиями строк ввода формы и их содержанием
        const data = {};
        this._inputList.forEach(input => {
            data[input.name] = (input.value);
        });
        return data
    }

    _submit(evt) { // функция: описываем отправку формы
        evt.preventDefault(); 
        this._handlerFormSubmit(this._getInputValues());
    }

    setEventListeners () { // Полиморфизм. Расширяем функциональность функции навешивания обработчиков: добавляем обработчик отправки формы 
        super.setEventListeners(); // наследуем функцию от родительского класса
        this._form.addEventListener('submit', this._submit.bind(this));
    }

    close() { // Полиморфизм. Расширяем функциональность функции закрытия поп-апа: очищаем форму
        super.close(); // наследуем функцию от родительского класса
        this._form.reset();
    }
}
