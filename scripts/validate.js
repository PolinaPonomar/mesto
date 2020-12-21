// объект настроек cо всеми нужными классами и селекторами элементов
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__form-item_type_error',
}; 

function showError (input, form, config) { // функция: показать ошибку
    // ищем элемент, в котором будет содержаться ошибка
    const error = form.querySelector(` #${input.id}-error`);
    // подсветить поле с ошибкой
    input.classList.add(config.inputErrorClass);
    // показать текст ошибки
    error.textContent = input.validationMessage;
}

function hideError (input, form, config) { // функция: убрать ошибку
    // ищем элемент, в котором содержится ошибка
    const error = form.querySelector(` #${input.id}-error`);
    // перестать подсвечивать поле
    input.classList.remove(config.inputErrorClass);
    // обнулить текст ошибки
    error.textContent = "";
}

function checkInputValidity (input, form, config) { // функция: провалидировать поле ввода
    if (!input.validity.valid) {
        // если не валидно - показать ошибку
        showError(input, form, config);
    } else {
        // если валидно - скрыть ошибку
        hideError(input, form, config);
    }
}

function toggleButtonState (isFormValid, button, config) { // функция: включить/выключить кнопку
    if(isFormValid) { // если форма валидна
        // сделать кнопку яркой
        button.classList.remove(config.inactiveButtonClass);
        // включить кнопку
        button.disabled = false;
    } else {
        // сделать кнопку серой
        button.classList.add(config.inactiveButtonClass);
        // выключить кнопку
        button.disabled = true;
    }
}

function setEventListeners (form, config) { // функция: повесить слушатели на поля формы
    // ищем все поля формы
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    // ищем кнопку отправки формы
    const button = form.querySelector(config.submitButtonSelector);
    inputList.forEach(input => { // каждому полю формы
        input.addEventListener('input', () => { // прописываем реакцию на ввод текста
            // валидируем текст
            checkInputValidity(input, form, config);
            // валидируем кнопку
            toggleButtonState(form.checkValidity(), button, config);
        });
    });
}

function enableValidation (config) { // функция: провалидировать все формы
    // ищем все формы
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((form) => { // каждой форме
        form.addEventListener('submit', function (evt) { // отменяем стандартную отправку
            evt.preventDefault();
        });
        // добавляем слушателей на все ее поля ввода
        setEventListeners (form, config);
    }); 
}

function doStartValidity (form, config) { // функция: провалидировать только что открытую форму 
    // (поля не валидируем при открытии, чтобы не пугать пользователя)
    // ищем кнопку отправки формы
    const button = form.querySelector(config.submitButtonSelector);
    // валидируем кнопку
    toggleButtonState (form.checkValidity(), button, config);
}

function resetPassedValidation (form, config) { // функция: сбросить результаты валидации
    // ищем все поля формы
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach(input => { // каждому полю формы
         // уберем ошибку
        hideError(input, form, config);
    });
}
