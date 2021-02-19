# Mesto

## Описание проекта:
Cервис Mesto - интерактивная страница для создания альбома фотографий. Фотографии можно добавлять, удалять и ставить им лайки. Создан в рамках выполнения задания курса по веб-разработке от Яндекс.Практикума.

### Функциональность:
Сайт адаптивен и интерактивен. На сайте можно:
1) Ввести и изменять информацию о владельце фотографий. Cделать это можно путем заполнения данных в соответствующем диалоговом окне (pop-up), возникающем при нажатии кнопки редактирования.
3) Изменять аватар пользователя, добавив ссылку на картинку в соответсвующий поп-ап.
4) Добавлять фотографии, вводя ссылку на фотографию и подпись к ней в соответствующее диалоговое окно, появляющееся при нажатии на кнопку добавления.
5) Лайкать и удалять фотографии. При удалении фотографий возникает предупреждающий поп-ап.
6) Увеличивать фотографии нажатием на них.
Кнопки, расположенные на сайте, подсвечиваются при наведении на них. Все поп-апы плавно открываются и закрываются.
7) Закрывать поп-апы несколькими способами: кликнув на крестик, кликнув на оверлей, нажав кнопку Esc.

### Какие технологии используются?
Сайт написан с импользованием HTML5, CSS3 и JavaScript. Код оформлен по методологии БЭМ, организация файловой структуры - Nested. Для создания сеток использовался flex и grid-layout. Все свойства элементов прописывались с учетом адаптивности сайта.
Для реализации увеличения фотографии с карточки делался поп-ап. Для интерактивности всех поп-апов применялся JavaScript.
Для вставки на сайт первоначальных 6 карточек использовался template-элемент.
Плавное открытие и закрытие поп-апов реализовано с помощью css-свойств.
Для онлайн-валидации форм применется встроенная браузерная валидация (немного) и валидация с помощью JS (в основном).
Код объектно-ориентирован. Для описания взаимодействия между классами используется слабое связывание (внутри классов напрямую не создаются экземпляры других классов).
Осуществлена сборка с помощью Webpack.
Проект подключен к серверу, реализовано взаимодействие с API, учтена ассинхронность.

Для проекта использовались изображения со свободной лицензией с сайта [Pixabay](https://pixabay.com/)

Получившийся проект можно посмотреть по ссылке:

* [Ссылка на проект](https://polinaponomar.github.io/mesto/)
