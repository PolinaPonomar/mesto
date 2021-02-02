export class Section {
    constructor ({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer; // функция с инструкцией, что отрисовывать
        this._container = document.querySelector(containerSelector);
    }

    renderItems() { // функция: отрисовать каждый элемент с помощью переданной в конструктор функции
        this._renderedItems.forEach( item => this._renderer(item) );
    }

    addItem(element) { // функция: добавить элемент в контейнер
        this._container.prepend(element); // добавить DOM-элемент в начало контейнера
    }
}
