const lakeImage = new URL('../images/magic_lake.jpg', import.meta.url);
const sunsetImage = new URL('../images/sunset.jpg', import.meta.url);
const walkImage = new URL('../images/pink_walk.png', import.meta.url);
const castleImage = new URL('../images/house-ghost.jpg', import.meta.url);
const flowersImage = new URL('../images/flower_field.jpg', import.meta.url);
const сhristmasImage = new URL('../images/new_Year.jpg', import.meta.url);

// import lakeImage from './images/magic_lake.jpg';
// import sunsetImage from './images/sunset.jpg';
// import walkImage from './images/pink_walk.png';
// import castleImage from './images/house-ghost.jpg';
// import flowersImage from './images/flower_field.jpg';
// import сhristmasImage from './images/new_Year.jpg';

export const initialCards = [
    {
        name: 'Волшебное озеро',
        link: lakeImage,
        alt: 'Рисунок озера в тумане под светом луны'
    },
    {
        name: 'Склон на закате',
        link: sunsetImage,
        alt: 'Рисунок малинового заката'
    },
    {
        name: 'Розовая прогулка',
        link: walkImage,
        alt: 'Рисунок прогулки людей в поле в окружении розовых фей'
    },
    {
        name: 'Дом-приведение',
        link: castleImage,
        alt: 'Рисунок темного дома на холме, освещенного луной'
    },
    {
        name: 'Поляна цветов',
        link: flowersImage,
        alt: 'Фотография поляны желтых цветов под ясным небом'
    },
    {
        name: 'Рождественская ярмарка',
        link: сhristmasImage,
        alt: 'Фотография новогодней ярмарки в огоньках'
    }
];
