/**
Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе.
Каждое занятие имеет название, время проведения,
максимальное количество участников и текущее количество записанных участников.

1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

2. Загрузите информацию о занятиях из предоставленных JSON-данных.
Каждое занятие должно отображаться на странице с указанием его названия,
времени проведения, максимального количества участников и текущего количества записанных участников.

3. Пользователь может нажать на кнопку "Записаться" для записи на занятие.
Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

4. После успешной записи пользователя на занятие,
обновите количество записанных участников и состояние кнопки "Записаться".

5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись".
После отмены записи, обновите количество записанных участников и состояние кнопки.

6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

7. При разработке используйте Bootstrap для стилизации элементов.
*/

const trainingData = [
    {
        title: 'Занятие 1',
        datetime: '02-05-2024 14:00 - 15:30',
        maxCountStudent: 15,
        currentCountStudent: 15,
    },
    {
        title: 'Занятие 2',
        datetime: '02-05-2024 15:00 - 16:30',
        maxCountStudent: 10,
        currentCountStudent: 9,
    }
];

trainingData.forEach(element => {
    const trainingItem = createTraining(
        element.title,
        element.datetime,
        element.maxCountStudent,
        element.currentCountStudent
    );
    trainingList.append(trainingItem);
});

function createTraining(title, datetime, maxCountStudent, currentCountStudent) {
    const trainingItem = document.createElement('li');
    trainingItem.classList.add('list-group-item');

    const trainingTitle = document.createElement('h2');
    trainingTitle.classList.add('mb-3');
    trainingTitle.textContent = title;

    const trainingDatetime = document.createElement('p');
    trainingDatetime.textContent = `Время проведения: ${datetime}`;

    const trainingMaxCountStudent = document.createElement('p');
    trainingMaxCountStudent.innerHTML = `Максимальное количество участников: <span class="max_count">${maxCountStudent}</span>`;

    const trainingCurrentCountStudent = document.createElement('p');
    trainingCurrentCountStudent.innerHTML = `Текущее количество участников: <span class="current_count">${currentCountStudent}</span>`;

    const registerButton = document.createElement('button');
    registerButton.textContent = 'Зарегистрироваться';
    registerButton.classList.add('btn', 'btn-primary');
    if (currentCountStudent === maxCountStudent) {
        registerButton.disabled = true;
    }

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.disabled = true;
    deleteButton.textContent = 'Отменить запись';

    trainingItem.append(trainingTitle, trainingDatetime, trainingMaxCountStudent, trainingCurrentCountStudent, trainingCurrentCountStudent, registerButton, deleteButton);

    return trainingItem;
}

trainingList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('btn')) {
        const trainingItem = target.closest('li');
        const trainingTitle = trainingItem.querySelector('h2').textContent;
        const currentCountStudent = trainingItem.querySelector('.current_count');
        const maxCountStudent = trainingItem.querySelector('.max_count');
        const registerButton = trainingItem.querySelector('.btn-primary');
        const cancelButton = trainingItem.querySelector('.btn-danger');
        target.disabled = true;
        if (target.classList.contains('btn-primary')) {
            cancelButton.disabled = false;
            cancelButton.textContent = 'Отменить запись';
            target.textContent = 'Зарегистрировано';
            currentCount = Number(currentCountStudent.textContent) + 1;
            if (currentCount == Number(maxCountStudent.textContent)) {
                registerButton.disabled = true;
            }
        } else if (target.classList.contains('btn-danger')) {
            registerButton.disabled = false;
            registerButton.textContent = 'Зарегистрироваться';
            target.textContent = 'Отменено';
            currentCount = Number(currentCountStudent.textContent) - 1;
            if (currentCount < Number(maxCountStudent.textContent)) {
                registerButton.disabled = false;
            }
        }
        currentCountStudent.textContent = currentCount;

        // Сохраним измененное количество участников в JSON-данные
        trainingData.forEach(element => {
            if (element.title == trainingTitle) {
                element.currentCountStudent = currentCount;
            }
        });
    }
    console.log(trainingData);
});
