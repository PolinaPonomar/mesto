function openPopup (popup) { // функция: открыть pop-up
    popup.classList.add('popup_opened');
    //добавим возможность закрыть по-ап, нажав Esc
    document.addEventListener('keydown',closePopupByEsc);
}

function closePopup (popup) { // функция: закрыть pop-up
    popup.classList.remove('popup_opened');
    //удалим возможность закрыть по-ап, нажав Esc
    document.removeEventListener('keydown',closePopupByEsc);
}

const closePopupByEsc = function (evt) { // функция: возможность закрывать поп-ап нажав на Esc
    if (evt.key === 'Escape') { 
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
};

function closePopupByOverlay (popup) { // функция: возможность закрывать поп-ап кликом на оверлей
    // ищем контейнер, оборачивающий все, кроме фона поп-апа
    const popupContainer = popup.querySelector('.popup__container');
    popup.addEventListener('click', (evt) => { 
        // если нижним DOM-элементом, на котором сработало событие оказался поп-ап или контейнер (так захвачен весь оверлей), закрываем
        if (evt.target === popup || evt.target === popupContainer) { 
            closePopup(popup);
        }
    });
}

export{openPopup, closePopup, closePopupByOverlay};
