 // объект настроек формы cо всеми нужными классами и селекторами элементов
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__form-item_type_error',
};

class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;

        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }

    _showError (input) { // функция: показать ошибку
        // ищем элемент, в котором будет содержаться ошибка
        const error = this._form.querySelector(` #${input.id}-error`);
        // подсветить поле с ошибкой
        input.classList.add(this._inputErrorClass);
        // показать текст ошибки
        error.textContent = input.validationMessage;
    }

    _hideError (input) { // функция: убрать ошибку
        // ищем элемент, в котором содержится ошибка
        const error = this._form.querySelector(` #${input.id}-error`);
        // перестать подсвечивать поле
        input.classList.remove(this._inputErrorClass);
        // обнулить текст ошибки
        error.textContent = "";
    }

    _checkInputValidity (input) { // функция: провалидировать поле ввода
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _toggleButtonState () { // функция: включить/выключить кнопку
        if(this._form.checkValidity()) {
            // сделать кнопку яркой
            this._button.classList.remove(this._inactiveButtonClass);
            // включить кнопку
            this._button.disabled = false;
        } else {
            // сделать кнопку серой
            this._button.classList.add(this._inactiveButtonClass);
            // выключить кнопку
            this._button.disabled = true;
        }
    }

    _setEventListeners () { // функция: повесить слушатели на поля формы
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                // валидируем текст
                this._checkInputValidity(input);
                // валидируем кнопку
                this._toggleButtonState();
            });
        });
    }

    enableValidation () { // функция: провалидировать форму
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();   
    }

    _resetPassedValidation () { // функция: сбросить результаты валидации
        this._inputList.forEach(input => {
            this._hideError(input);
        });
    }

    doStartValidity () { // функция: провалидировать только что открытую форму 
        // (поля не валидируем при открытии, чтобы не пугать пользователя)
        // валидируем кнопку
        this._toggleButtonState();
        // //сбрасываем ошибки предыдущей валидации
        this._resetPassedValidation();
    } 
}

export {validationConfig, FormValidator};
