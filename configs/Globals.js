class Globals {
    /* НЕ изменяемые переменные, НЕ задавать значения, они нужны для правильной работы программы */
    static CURRENT_INDEX;
    static CURRENT_INDEX_STATE = 0;
    static HIGHLIGHT_SOURCE;
    static SOURCE_STATE;
    static DIFFERENCE;
    static FENWIK;

    // Задаёт начальную длину массива, при загрузки или перезагрузки страницы
    static globalFenwikLength = Math.round(window.innerWidth * 0.6 / 42);

    // Задаёт максимальную длину массива для поля ввода "Длина массива" во вкладке "Построение Дерева"
    // Убедитесь, что это значение >= значению переменной globalFenwikLength
    static maxFenwikLength = Math.round(window.innerWidth * 0.6 / 42) + 1;


    /* Изменяемые переменные: можно задать другие значения по вашему усмотрению (конфиг) */

    // Задаёт максимальное число для генератора случайных чисел, так как
    // Исходный массив генерируется автоматически
    static maxRandomNumber = 50;

    // Задаёт минимальное число для генератора случайных чисел, так как
    // Исходный массив генерируется автоматически
    static minRandomNumber = -50;

    // Задаёт максимальное значение времени в милисекундах за одни шаг для поля ввода "Милисекунд за один шаг",
    // находящееся перед кнопкой "Проиграть анимацию"
    static maxTimeInput = 100000;
}

export default Globals