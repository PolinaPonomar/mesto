// Вынесем все необходимые элементы формы в константы
const form = document.querySelector('.popup__form');

function showError (input, form) {
    const error = form.querySelector(` #${input.id}-error`);
    input.classList.add('popup__form-item_type_error');
    error.textContent = input.validationMessage;
}

function hideError (input, form) {
    const error = form.querySelector(` #${input.id}-error`);
    input.classList.remove('popup__form-item_type_error');
    error.textContent = "";
}

function checkInputValidity (input, form) {
    if (!input.validity.valid) {
        showError(input, form);
    } else {
        hideError(input, form);
    }

    return input.validity.valid;
}

function toggleButtonState (isFormValid, button) {
    if(isFormValid) {
        button.classList.remove('popup__save-button_invalid');
        button.disabled = false;
    } else {
        button.classList.add('popup__save-button_invalid');
        button.disabled = true;
    }
}


function setEventListeners (form) {
    const inputList = Array.from(form.querySelectorAll('.popup__form-item'));
    const button = form.querySelector('.popup__save-button');

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input,form);
            toggleButtonState(form.checkValidity(), button);
        });
    });
}

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach(form => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        // проверка на исходные данные (не работает)
        const inputList = Array.from(form.querySelectorAll('.popup__form-item'));
        inputList.forEach(input => { 
            console.log(input.textContent);
            if (input.textContent.length > 0) {
                input.validity.valueMissing = false;
            } else {
                input.validity.valueMissing = true;
            }
        });
        const button = form.querySelector('.popup__save-button');
        toggleButtonState(form.checkValidity(), button);
        // проверка на исходные данные (не работает)

        setEventListeners (form);
    })
}

// enableValidation();

