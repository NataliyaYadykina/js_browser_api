/**
 * Задание 3 (тайминг 50 минут)
1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и
текста. Вам необходимо использовать Bootstrap для стилизации элементов.
2. Используйте Bootstrap, чтобы стилизовать элементы:
a. Заголовок статьи (<h2>)
b. Текст статьи (<p>)
c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте
JSON-данные для определения заголовков и текстов статей.
4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна
появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая
статья должна быть удалена из списка.
6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать"
пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте
всплывающее окно или prompt для ввода новых данных.
7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное
хранилище браузера, чтобы они сохранялись после перезагрузки страницы.
*/

// JSON-данные со списком статей
const articleData = [
    {
        title: 'Заголовок 1',
        content: 'Текст 1'
    },
    {
        title: 'Заголовок 2',
        content: 'Текст 2'
    }
];

articleData.forEach(element => {
    const articleItem = createArticle(element.title, element.content);
    articleList.append(articleItem);
});

function createArticle(title, content) {
    const articleItem = document.createElement('li');
    articleItem.classList.add('list-group-item');

    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('mb-3');
    articleTitle.textContent = title;

    const articleContent = document.createElement('p');
    // articleContent.classList.add('mb-3');
    articleContent.textContent = content;

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.textContent = 'Редактировать';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    articleItem.append(articleTitle, articleContent, editButton, deleteButton);

    return articleItem;

}

addArticleButton.addEventListener('click', function (e) {
    const newArticle = {
        title: 'Новая статья',
        content: 'Введите содержание статьи...'
    }

    const articleItem = createArticle(newArticle.title, newArticle.content);
    articleList.append(articleItem);
});

articleList.addEventListener('click', function (e) {
    if (e.target.textContent == 'Удалить') {
        const articleItem = e.target.closest('li');
        articleItem.remove();
    }

    if (e.target.textContent == 'Редактировать') {
        const articleItem = e.target.closest('li');
        const articleTitle = articleItem.querySelector('h3');
        const articleContent = articleItem.querySelector('p');

        const newTitle = prompt('Введите новый заголовок', articleTitle.textContent);
        const newContent = prompt('Введите новый текст', articleContent.textContent);

        if (newTitle !== null && newContent !== null) {
            articleTitle.textContent = newTitle;
            articleContent.textContent = newContent;
        }
    }
});
