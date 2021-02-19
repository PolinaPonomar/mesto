export class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        // ищем контейнер, оборачивающий все, кроме фона поп-апа
        this._popupContainer = this._popup.querySelector('.popup__container');
        // присваиваем константе функцию, чтобы потом передавать ее в коллбэк addEventListener и removeEventListener,
        // т.к. константа будет давать ссылку на одну и ту же функцию
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open () {
        this._popup.classList.add('popup_opened');
        //добавим возможность закрыть по-ап, нажав Esc
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_opened');
        //удалим возможность закрыть по-ап, нажав Esc
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose (evt) { // функция: возможность закрывать поп-ап нажав на Esc
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners () { // функция: добавить слушатели поп-апу
        this._closeButton.addEventListener( 'click', this.close.bind(this) );
        this._popup.addEventListener('click', (evt) => { 
            // если нижним DOM-элементом, на котором сработало событие оказался поп-ап или контейнер (так захвачен весь оверлей), закрываем
            if (evt.target === this._popup || evt.target === this._popupContainer) { 
                this.close();
            }
        });
    }
}
