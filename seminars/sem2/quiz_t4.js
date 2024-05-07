/**
 * Задание 4 (тайминг 20 минут)
Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям
отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность
для этого опросника, используя HTML, CSS и JavaScript.
1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен
иметь несколько вариантов ответов.
2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все
вопросы, и отобразить выбранные им варианты ответов.
5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить
на все вопросы перед завершением опроса.
6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего
пользовательского опыта.
 */

const submitButton = document.getElementById("submit");
const resultContainer = document.querySelector('.result');
const resultQ1 = document.getElementById("result_q1").querySelector("span");
const resultQ2 = document.getElementById("result_q2").querySelector("span");

submitButton.addEventListener('click', function (e) {

    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answer = document.querySelector('input[name="q2"]:checked');

    if (q1Answer && q2Answer) {
        resultQ1.textContent = q1Answer.value;
        resultQ2.textContent = q2Answer.value;

        resultContainer.style.display = "block";
    } else {
        alert("Вы не ответили на все вопросы!");
    }

});
