export class Section {
    constructor ({renderer}, containerSelector) {
        this._renderer = renderer; // функция с инструкцией, что отрисовывать
        this._container = document.querySelector(containerSelector);
    }

    renderItems (items) { // функция: отрисовать каждый элемент с помощью переданной в конструктор функции
        items.forEach( item => this._renderer(item) );
    }

    addItem (element) { // функция: добавить элемент в контейнер
        this._container.prepend(element); // добавить DOM-элемент в начало контейнера
    }
}
