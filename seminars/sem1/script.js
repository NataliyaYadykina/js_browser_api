/**
 * Задание 1. Работа с BOM
 */

/**
 * 1. Определение текущего размера окна браузера:
 * а. Напишите функцию, которая будет выводить текущую ширину и высоту окна браузера при его изменении.
 */

const updateWindowSize = () => {
    const widthEl = window.innerWidth;
    const heightEl = window.innerHeight;

    width.textContent = widthEl;
    height.textContent = heightEl;
}

window.addEventListener('load', updateWindowSize);
window.addEventListener('resize', updateWindowSize);

/**
 * 2. Подтверждение закрытия страницы:
 * а. Создайте всплывающее окно или диалоговое окно,
 * которое появляется при попытке закрыть вкладку браузера
 * и спрашивает пользователя, уверен ли он
 * в своем решении закрыть страницу.
 */

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = 'Text';
});

/**
 * 3. Управление историей переходов:
 * а. Используйте объект history
 * для управления историей переходов на веб-странице.
 * Создайте кнопки "Назад" и "Вперед" для перемещения по истории.
 */

goBack.addEventListener('load', function (e) {
    window.history.back();
});

goForward.addEventListener('load', function (e) {
    window.history.forward();
});
